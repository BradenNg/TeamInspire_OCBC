import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IVR_MENU = {
  '': {
    prompt: 'Welcome to OCBC! Press 1 for Account Balance, 2 for Branch Hours, 3 for Card Services.',
    next: { '1': 'BALANCE', '2': 'HOURS', '3': 'CARD' }
  },
  'BALANCE': {
    prompt: 'Your account balance is $XXXX.',
    next: {}
  },
  'HOURS': {
    prompt: 'Our branches are open Monday–Friday, 9am–5pm.',
    next: {}
  },
  'CARD': {
    prompt: 'For Card Replacement, press 1. For Card Activation, press 2.',
    next: { '1': 'CARD_REPLACE', '2': 'CARD_ACTIVATE' }
  },
  'CARD_REPLACE': {
    prompt: 'Your card replacement request is being processed.',
    next: {}
  },
  'CARD_ACTIVATE': {
    prompt: 'Your card is now activated. Thank you!',
    next: {}
  }
};

function App() {
  const [menuKey, setMenuKey] = useState('');
  const [history, setHistory] = useState(['']);
  
  const handleInput = (num) => {
    const current = IVR_MENU[menuKey];
    const nextKey = current.next[num];
    if (nextKey) {
      setMenuKey(nextKey);
      setHistory([...history, nextKey]);
    }
  };
  
  const currentMenu = IVR_MENU[menuKey];

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{currentMenu.prompt}</Text>
      <View style={styles.numpad}>
        {/* Render buttons dynamically based on current menu's next options */}
        {Object.keys(currentMenu.next).map(key => (
          <Button key={key} title={key} onPress={() => handleInput(key)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  prompt: { fontSize: 18, marginBottom: 20 },
  numpad: { flexDirection: 'row', justifyContent: 'center' }
});

export default App;
