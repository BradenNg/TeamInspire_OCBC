import { db } from '../public/js/firebase.js';
import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

function normalizePin(v){
  return String(v ?? '').replace(/\D/g, '');
}

function normalizeUser(doc){
  const data = doc.data ? doc.data() : doc;
  const accessCode = data['AccessCode'] ?? data['Access Code'];
  const pin = data['PIN'] ?? data['Pin'];
  return {
    id: doc.id ?? null,
    accessCode,
    pin: normalizePin(pin),
    raw: data,
  };
}

// Try a set of queries on a collection and return the first non-empty result
async function tryVariants(collRef, accessCode){
  const variants = [ ['AccessCode', accessCode], ['Access Code', accessCode] ];
  for (const [field, value] of variants){
    const snap = await getDocs(query(collRef, where(field, '==', value)));
    if(!snap.empty){
      return snap.docs.map(d => normalizeUser(d));
    }
  }
  return [];
}

// Public API: Read user by access code
export async function readUser(accessCode){
  // 1) Top-level Users
  const usersColl = collection(db, 'Users');
  let results = await tryVariants(usersColl, accessCode);
  if(results.length) return results;

  // 2) Flat OCBC collection
  const ocbcFlat = collection(db, 'OCBC');
  results = await tryVariants(ocbcFlat, accessCode);
  if(results.length) return results;

  // 3) Nested OCBC / OCBC_Databse / Users (per your screenshots)
  try{
    const nested = collection(db, 'OCBC', 'OCBC_Databse', 'Users');
    results = await tryVariants(nested, accessCode);
    if(results.length) return results;
  }catch(_){ /* ignore if path doesn't exist */ }

  // 4) Alternative nested name (in case of typo correction)
  try{
    const nested2 = collection(db, 'OCBC', 'OCBC_Database', 'Users');
    results = await tryVariants(nested2, accessCode);
    if(results.length) return results;
  }catch(_){ }

  return [];
}
