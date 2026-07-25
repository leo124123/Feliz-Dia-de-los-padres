import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const MAX_LIVES = 6;

export default function HangmanGame({ person, onWin, onBack }) {
  const targetWord = person.word.toUpperCase();
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  // Normalize string for checking (accent-insensitive if needed)
  const isLetterGuessed = (letter) => guessedLetters.includes(letter);

  // Check if word is completely guessed
  const isWon = targetWord.split('').every((char) => char === ' ' || isLetterGuessed(char));
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
        <Text style={[styles.headerRole, { color: person.color }]}>
          {person.emoji} Desafío de {person.role}
        </Text>
      </View>

      {/* Main Challenge Card */}
      <View style={styles.gameCard}>
        <Text style={styles.gameTitle}>Adivina la Palabra Secreta 🔍</Text>
        <Text style={styles.hintText}>{person.hint}</Text>

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
                  revealed && styles.letterTileRevealed,
                  isWon && { borderColor: '#10B981', backgroundColor: '#064E3B' }
                ]}
              >
                <Text style={styles.letterText}>
                  {revealed ? letter : ''}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Status Message */}
        {isWon && (
          <View style={styles.winBanner}>
            <Text style={styles.winTitle}>¡CORRECTO! 🎉</Text>
            <Text style={styles.winSubtitle}>Has desbloqueado la carta secreta.</Text>
            <TouchableOpacity 
              style={[styles.continueBtn, { backgroundColor: person.color }]} 
              onPress={onWin}
              activeOpacity={0.8}
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
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: '#312E81',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  backBtnText: {
    color: '#C7D2FE',
    fontWeight: '700',
    fontSize: 14,
  },
  headerRole: {
    fontSize: 18,
    fontWeight: '900',
  },
  gameCard: {
    backgroundColor: '#1E1B4B',
    borderRadius: 24,
    padding: 22,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gameTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
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
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  livesLabel: {
    color: '#E0E7FF',
    fontWeight: '700',
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
    borderRadius: 10,
    backgroundColor: '#312E81',
    borderWidth: 2,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterTileRevealed: {
    backgroundColor: '#4338CA',
    borderColor: '#A5B4FC',
  },
  spaceTile: {
    width: 20,
  },
  letterText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  winBanner: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  winTitle: {
    color: '#34D399',
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
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  loseBanner: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
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
    marginTop: 10,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
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
    borderRadius: 8,
    backgroundColor: '#3730A3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  keyCorrect: {
    backgroundColor: '#059669',
    borderColor: '#10B981',
  },
  keyWrong: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    opacity: 0.4,
  },
  keyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  keyTextDisabled: {
    color: '#9CA3AF',
  },
});
