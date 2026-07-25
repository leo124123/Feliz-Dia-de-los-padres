import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function GrandFinale({ onReset }) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Celebration Header */}
      <View style={styles.trophyBox}>
        <Text style={styles.trophyEmoji}>🏆</Text>
        <Text style={styles.heartsEmoji}>❤️ 💖 👑 💖 ❤️</Text>
      </View>

      {/* Main Vibrant Celebration Card */}
      <View style={styles.card}>
        <View style={styles.goldBadgeChip}>
          <Text style={styles.goldBadgeText}>✨ RECOMPENSA FINAL DESBLOQUEADA ✨</Text>
        </View>

        <Text style={styles.mainTitle}>¡Papi, Te Amamos! ❤️</Text>
        <Text style={styles.subtitle}>
          ¡Eres el mejor papá del mundo entero! 🌍✨
        </Text>

        <View style={styles.divider} />

        <Text style={styles.messageBody}>
          Has descifrado todas las adivinanzas y leído los mensajes de tu familia.{'\n\n'}
          Queremos que recuerdes hoy y siempre que eres nuestro superhéroe, nuestro apoyo incondicional y el alma de nuestra familia.
        </Text>

        {/* Family Emojis Row */}
        <View style={styles.familyRow}>
          <View style={styles.familyItem}>
            <Text style={styles.familyEmoji}>❤️</Text>
            <Text style={styles.familyRole}>Esposa</Text>
          </View>
          <Text style={styles.plusSymbol}>+</Text>
          <View style={styles.familyItem}>
            <Text style={styles.familyEmoji}>👦</Text>
            <Text style={styles.familyRole}>Hijo</Text>
          </View>
          <Text style={styles.plusSymbol}>+</Text>
          <View style={styles.familyItem}>
            <Text style={styles.familyEmoji}>👧</Text>
            <Text style={styles.familyRole}>Hija</Text>
          </View>
        </View>

        <Text style={styles.foreverText}>¡Juntos por siempre! 👨‍👩‍👧‍👦</Text>

        {/* Replay button */}
        <TouchableOpacity style={styles.resetBtn} onPress={onReset} activeOpacity={0.85}>
          <Text style={styles.resetBtnText}>Ver Cartas Nuevamente 🔄</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: '#0F0C20',
  },
  trophyBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  trophyEmoji: {
    fontSize: 84,
  },
  heartsEmoji: {
    fontSize: 22,
    marginTop: 8,
    letterSpacing: 4,
  },
  card: {
    backgroundColor: '#1F1646',
    borderRadius: 26,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
  },
  goldBadgeChip: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    marginBottom: 12,
  },
  goldBadgeText: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#FDE047',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#F59E0B',
    width: '100%',
    marginVertical: 14,
  },
  messageBody: {
    color: '#E0E7FF',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 20,
  },
  familyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 14,
    backgroundColor: '#120D2B',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  familyItem: {
    alignItems: 'center',
  },
  familyEmoji: {
    fontSize: 28,
  },
  familyRole: {
    color: '#C7D2FE',
    fontSize: 11,
    fontWeight: '900',
    marginTop: 2,
  },
  plusSymbol: {
    color: '#FBBF24',
    fontSize: 20,
    fontWeight: '900',
  },
  foreverText: {
    color: '#FF007F',
    fontSize: 18,
    fontWeight: '900',
    marginVertical: 14,
  },
  resetBtn: {
    backgroundColor: '#2A1B63',
    borderWidth: 1.5,
    borderColor: '#0099FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  resetBtnText: {
    color: '#0099FF',
    fontSize: 15,
    fontWeight: '900',
  },
});
