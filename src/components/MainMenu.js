import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function MainMenu({ familyData, completedIds, onSelectPerson }) {
  const progressPercent = Math.round((completedIds.length / familyData.length) * 100);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner - INTACT AS REQUESTED */}
      <View style={styles.headerBox}>
        <Text style={styles.badge}>🎉 DÍA DEL PADRE 🎉</Text>
        <Text style={styles.title}>¡Hola Papá! ❤️</Text>
        <Text style={styles.subtitle}>
          Tienes 3 cartas secretas esperando por ti. Selecciona a una persona para superar su reto y abrir su carta especial.
        </Text>
      </View>

      {/* Vibrant Progress Bar Card */}
      <View style={styles.vibrantProgressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>PROGRESO DE CARTAS</Text>
          <Text style={styles.progressPercentText}>{completedIds.length} de {familyData.length} Desbloqueadas</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      {/* Vibrant Person Cards List */}
      <View style={styles.cardsList}>
        {familyData.map((person) => {
          const isCompleted = completedIds.includes(person.id);

          return (
            <TouchableOpacity
              key={person.id}
              activeOpacity={0.8}
              disabled={isCompleted}
              style={[
                styles.vibrantCard,
                { borderLeftColor: person.color },
                isCompleted && styles.cardCompleted
              ]}
              onPress={() => onSelectPerson(person.id)}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.avatarBox, { backgroundColor: person.lightBg }]}>
                  <Text style={styles.avatarEmoji}>{person.emoji}</Text>
                </View>
                <View style={styles.cardTitleBox}>
                  <Text style={styles.roleTitle}>{person.role}</Text>
                  <Text style={styles.cardSubtitle}>{person.subtitle}</Text>
                </View>
                <Text style={styles.badgeEmoji}>{person.avatar}</Text>
              </View>

              <View style={styles.cardFooter}>
                {isCompleted ? (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✓ Carta Leída</Text>
                  </View>
                ) : (
                  <View style={[styles.actionBtn, { backgroundColor: person.color }]}>
                    <Text style={styles.actionBtnText}>Adivinar y Abrir ✉️</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
  /* HEADER BOX - ORIGINAL INTACT */
  headerBox: {
    backgroundColor: '#2A1B63',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badge: {
    color: '#FBBF24',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 20,
  },
  /* VIBRANT PROGRESS CARD */
  vibrantProgressCard: {
    backgroundColor: '#1C143B',
    borderRadius: 18,
    padding: 18,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(124, 58, 237, 0.4)',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    color: '#F472B6',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  progressPercentText: {
    color: '#00FF87',
    fontSize: 12,
    fontWeight: '900',
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#0C081A',
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00FF87',
    borderRadius: 5,
  },
  /* VIBRANT PERSON CARDS */
  cardsList: {
    width: '100%',
    gap: 16,
  },
  vibrantCard: {
    backgroundColor: '#1F1646',
    borderRadius: 22,
    padding: 20,
    borderLeftWidth: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  cardCompleted: {
    opacity: 0.55,
    backgroundColor: '#120D2B',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  cardTitleBox: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#C7D2FE',
    marginTop: 2,
  },
  badgeEmoji: {
    fontSize: 26,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  actionBtn: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  completedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  completedText: {
    color: '#34D399',
    fontWeight: '900',
    fontSize: 13,
  },
});
