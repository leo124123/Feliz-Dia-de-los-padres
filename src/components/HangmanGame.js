import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const MAX_LIVES = 6;

export default function HangmanGame({ person, onWin, onBack }) {
  const targetWord = (person?.word || '').toUpperCase();
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  const isLetterGuessed = (letter) => guessedLetters.includes(letter);
  const isWon = targetWord.length > 0 && targetWord.split('').every((char) => char === ' ' || isLetterGuessed(char));
  const isLost = mistakes >= MAX_LIVES;

  const handleGuess = (letter) => {
    if (isWon || isLost || isLetterGuessed(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!targetWord.includes(letter)) {
      setMistakes((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setGuessedLetters([]);
    setMistakes(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
        <View style={[styles.roleTag, { borderColor: person?.color || '#FF007F', backgroundColor: '#1F1646' }]}>
          <Text style={[styles.headerRole, { color: person?.color || '#FF007F' }]}>
            {person?.emoji} Desafío de {person?.role}
          </Text>
        </View>
      </View>

      {/* Main Challenge Card */}
      <View style={[styles.gameCard, { borderColor: person?.color || '#FF007F' }]}>
        <Text style={styles.gameTitle}>Adivina la Palabra Secreta 🔍</Text>
        <Text style={styles.hintText}>{person?.hint}</Text>

        {/* Lives Counter */}
        <View style={styles.livesContainer}>
          <Text style={styles.livesLabel}>Vidas:</Text>
          <Text style={styles.livesHearts}>
            {'❤️'.repeat(Math.max(0, MAX_LIVES - mistakes))}
            {'🖤'.repeat(Math.min(MAX_LIVES, mistakes))}
          </Text>
        </View>

        {/* Word Display Slots */}
        <View style={styles.wordContainer}>
          {targetWord.split('').map((letter, index) => {
            if (letter === ' ') {
              return <View key={index} style={styles.spaceTile} />;
            }
            const revealed = isLetterGuessed(letter) || isLost;
            return (
              <View 
                key={index} 
                style={[
                  styles.letterTile,
                  revealed && { borderColor: person?.color || '#FF007F', backgroundColor: '#130E2A' },
                  isWon && { borderColor: '#00FF87', backgroundColor: '#064E3B' }
                ]}
              >
                <Text style={[styles.letterText, isWon && { color: '#00FF87' }]}>
                  {revealed ? letter : '?'}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Status Messages */}
        {isWon && (
          <View style={styles.winBanner}>
            <Text style={styles.winTitle}>¡CORRECTO! 🎉</Text>
            <Text style={styles.winSubtitle}>Has desbloqueado la carta secreta.</Text>
            <TouchableOpacity 
              style={[styles.continueBtn, { backgroundColor: person?.color || '#FF007F' }]} 
              onPress={onWin}
              activeOpacity={0.85}
            >
              <Text style={styles.continueBtnText}>Abrir la Carta ✉️</Text>
            </TouchableOpacity>
          </View>
        )}

        {isLost && (
          <View style={styles.loseBanner}>
            <Text style={styles.loseTitle}>¡Vidas agotadas! 😅</Text>
            <Text style={styles.loseSubtitle}>La palabra era: {targetWord}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={handleReset}>
              <Text style={styles.retryBtnText}>Intentar de Nuevo 🔄</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Keyboard Grid */}
      {!isWon && !isLost && (
        <View style={styles.keyboardContainer}>
          {ALPHABET.map((letter) => {
            const used = isLetterGuessed(letter);
            const isCorrect = used && targetWord.includes(letter);
            const isWrong = used && !targetWord.includes(letter);

            return (
              <TouchableOpacity
                key={letter}
                disabled={used}
                style={[
                  styles.keyButton,
                  isCorrect && styles.keyCorrect,
                  isWrong && styles.keyWrong,
                ]}
                onPress={() => handleGuess(letter)}
              >
                <Text style={[styles.keyText, used && styles.keyTextDisabled]}>
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#0F0C20',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: '#2A1B63',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backBtnText: {
    color: '#E0E7FF',
    fontWeight: '900',
    fontSize: 14,
  },
  roleTag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  headerRole: {
    fontSize: 15,
    fontWeight: '900',
  },
  gameCard: {
    backgroundColor: '#1F1646',
    borderRadius: 24,
    padding: 22,
    width: '100%',
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  gameTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  hintText: {
    color: '#FBBF24',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#120D2B',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  livesLabel: {
    color: '#E0E7FF',
    fontWeight: '900',
    marginRight: 8,
    fontSize: 14,
  },
  livesHearts: {
    fontSize: 16,
    letterSpacing: 2,
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 14,
  },
  letterTile: {
    width: 44,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#120D2B',
    borderWidth: 2,
    borderColor: '#3B2B7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceTile: {
    width: 18,
  },
  letterText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  winBanner: {
    marginTop: 18,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 135, 0.15)',
    padding: 18,
    borderRadius: 18,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#00FF87',
  },
  winTitle: {
    color: '#00FF87',
    fontSize: 22,
    fontWeight: '900',
  },
  winSubtitle: {
    color: '#A7F3D0',
    fontSize: 14,
    marginVertical: 6,
  },
  continueBtn: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  loseBanner: {
    marginTop: 18,
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    padding: 18,
    borderRadius: 18,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#EF4444',
  },
  loseTitle: {
    color: '#F87171',
    fontSize: 20,
    fontWeight: '900',
  },
  loseSubtitle: {
    color: '#FCA5A5',
    fontSize: 14,
    marginVertical: 6,
  },
  retryBtn: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 8,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
  },
  keyButton: {
    width: 38,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#2A1B63',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  keyCorrect: {
    backgroundColor: '#059669',
    borderColor: '#00FF87',
  },
  keyWrong: {
    backgroundColor: '#120D2B',
    borderColor: '#2A1B63',
    opacity: 0.3,
  },
  keyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  keyTextDisabled: {
    color: '#64748B',
  },
});
