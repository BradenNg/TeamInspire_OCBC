import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';

type MenuKey = '' | 'BALANCE' | 'HOURS' | 'CARD' | 'CARD_REPLACE' | 'CARD_ACTIVATE';

interface MenuItem {
  prompt: string;
  next: { [key: string]: MenuKey };
}

const IVR_MENU: { [key in MenuKey]: MenuItem } = {
  '': {
    prompt: 'Welcome to OCBC! Press 1 for Account Balance, 2 for Branch Hours, 3 for Card Services.',
    next: { '1': 'BALANCE', '2': 'HOURS', '3': 'CARD' }
  },
  BALANCE: {
    prompt: 'Your account balance is $XXXX.',
    next: {}
  },
  HOURS: {
    prompt: 'Our branches are open Monday–Friday, 9am–5pm.',
    next: {}
  },
  CARD: {
    prompt: 'For Card Replacement, press 1. For Card Activation, press 2.',
    next: { '1': 'CARD_REPLACE', '2': 'CARD_ACTIVATE' }
  },
  CARD_REPLACE: {
    prompt: 'Your card replacement request is being processed.',
    next: {}
  },
  CARD_ACTIVATE: {
    prompt: 'Your card is now activated. Thank you!',
    next: {}
  }
};

function App() {
  const [menuKey, setMenuKey] = useState<MenuKey>('');
  const [history, setHistory] = useState<MenuKey[]>(['']);

  const currentMenu = IVR_MENU[menuKey];

  useEffect(() => {
    Tts.speak(currentMenu.prompt);
  }, [currentMenu.prompt]);

  const handleInput = (num: string) => {
    const nextKey = currentMenu.next[num];
    if (nextKey) {
      setMenuKey(nextKey);
      setHistory([...history, nextKey]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{currentMenu.prompt}</Text>
      <View style={styles.numpad}>
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
