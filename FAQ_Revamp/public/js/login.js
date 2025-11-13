// Lightweight login that checks Firestore 'Users' collection for a matching Access code and PIN.
// For demo ONLY. In production use Firebase Auth or a secure backend.

import { readUser } from '../../models/loginModel.js';
const form = document.getElementById('loginForm');
const msg = document.getElementById('loginMsg');

function setMsg(text, type='info'){
  msg.textContent = text;
  msg.style.color = type === 'error' ? '#b00020' : '#6b7785';
}

// No Firebase Auth dependency; ensure Firestore rules allow public reads when developing


form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  setMsg('Checking…');
  // Direct Firestore read; make sure your Firestore rules permit read access
  const accessCode = document.getElementById('accessCode').value.trim();
  const pin = document.getElementById('pin').value.trim();

  try{
    const users = await readUser(accessCode);

    if(users.length === 0){
      setMsg('No account found for this access code.', 'error');
      return;
    }

  const user = users[0];
  if(user.pin && user.pin === pin.replace(/\D/g,'')){
      setMsg('Login successful! Redirecting…');
      // Basic demo redirect. Replace with your app route.
      setTimeout(()=>{ window.location.href = './index_ocbc.html'; }, 700);
    } else {
      setMsg('Incorrect PIN. Please try again.', 'error');
    }
  }catch(err){
    console.error('Login check failed:', err);
    setMsg(`Unable to verify (${err?.code || err?.message || 'error'}). Please try again.`, 'error');
  }
});

// Note: addUser utility removed from this module to avoid bundler-only imports.
