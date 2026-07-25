import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function GrandFinale({ onReset }) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Celebration Header */}
      <View style={styles.trophyBox}>
        <Text style={styles.trophyEmoji}>🏆</Text>
        <Text style={styles.heartsEmoji}>❤️ 💖 👑 💖 ❤️</Text>
      </View>

      {/* Main Announcement */}
      <View style={styles.card}>
        <Text style={styles.goldBadge}>¡RECOMPENSA FINAL DESBLOQUEADA!</Text>
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
  },
  trophyBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  trophyEmoji: {
    fontSize: 80,
  },
  heartsEmoji: {
    fontSize: 22,
    marginTop: 8,
    letterSpacing: 4,
  },
  card: {
    backgroundColor: '#1E1B4B',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  goldBadge: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
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
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
    marginVertical: 12,
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    width: '100%',
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
    fontWeight: '700',
    marginTop: 2,
  },
  plusSymbol: {
    color: '#FBBF24',
    fontSize: 20,
    fontWeight: '900',
  },
  foreverText: {
    color: '#F472B6',
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 14,
  },
  resetBtn: {
    backgroundColor: '#312E81',
    borderWidth: 1,
    borderColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
