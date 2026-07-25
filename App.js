import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { FAMILY_DATA } from './src/data/familyData';
import MainMenu from './src/components/MainMenu';
import HangmanGame from './src/components/HangmanGame';
import EnvelopeLetter from './src/components/EnvelopeLetter';
import GrandFinale from './src/components/GrandFinale';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('main'); // 'main' | 'hangman' | 'letter' | 'finale'
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);

  // Select a person to start the hangman game
  const handleSelectPerson = (personId) => {
    const person = FAMILY_DATA.find((p) => p.id === personId);
    if (person) {
      setSelectedPerson(person);
      setActiveScreen('hangman');
    }
  };

  // Called when hangman is won
  const handleHangmanWin = () => {
    setActiveScreen('letter');
  };

  // Called when returning to main menu from hangman
  const handleBackToMain = () => {
    setActiveScreen('main');
    setSelectedPerson(null);
  };

  // Called when finishing reading a letter
  const handleCompleteLetter = () => {
    if (selectedPerson && !completedIds.includes(selectedPerson.id)) {
      const updatedCompleted = [...completedIds, selectedPerson.id];
      setCompletedIds(updatedCompleted);

      // Check if all 3 are completed
      if (updatedCompleted.length === FAMILY_DATA.length) {
        setActiveScreen('finale');
        return;
      }
    }

    setActiveScreen('main');
    setSelectedPerson(null);
  };

  // Reset progress to replay
  const handleResetProgress = () => {
    setCompletedIds([]);
    setActiveScreen('main');
    setSelectedPerson(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {activeScreen === 'main' && (
          <MainMenu
            familyData={FAMILY_DATA}
            completedIds={completedIds}
            onSelectPerson={handleSelectPerson}
          />
        )}

        {activeScreen === 'hangman' && selectedPerson && (
          <HangmanGame
            person={selectedPerson}
            onWin={handleHangmanWin}
            onBack={handleBackToMain}
          />
        )}

        {activeScreen === 'letter' && selectedPerson && (
          <EnvelopeLetter
            person={selectedPerson}
            onComplete={handleCompleteLetter}
          />
        )}

        {activeScreen === 'finale' && (
          <GrandFinale onReset={handleResetProgress} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: RNStatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});
