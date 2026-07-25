import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function MainMenu({ familyData, completedIds, onSelectPerson }) {
  const allCompleted = completedIds.length === familyData.length;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View className="header" style={styles.headerBox}>
        <Text style={styles.badge}>🎉 DÍA DEL PADRE 🎉</Text>
        <Text style={styles.title}>¡Hola Papá! ❤️</Text>
        <Text style={styles.subtitle}>
          Tienes 3 cartas secretas esperando por ti. Selecciona a una persona para superar su reto y abrir su carta especial.
        </Text>
      </View>

      {/* Progress counter */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progreso: {completedIds.length} / {familyData.length} Cartas Desbloqueadas
        </Text>
        <View style={styles.progressBarTrack}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${(completedIds.length / familyData.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Person Selection Cards */}
      <View style={styles.cardsList}>
        {familyData.map((person) => {
          const isCompleted = completedIds.includes(person.id);

          return (
            <TouchableOpacity
              key={person.id}
              activeOpacity={0.85}
              disabled={isCompleted}
              style={[
                styles.card,
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
  },
  headerBox: {
    backgroundColor: '#1E1B4B',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
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
    color: '#C7D2FE',
    textAlign: 'center',
    lineHeight: 20,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressText: {
    color: '#E0E7FF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#312E81',
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 5,
  },
  cardsList: {
    width: '100%',
    gap: 16,
  },
  card: {
    backgroundColor: '#2E2A62',
    borderRadius: 20,
    padding: 18,
    borderLeftWidth: 6,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardCompleted: {
    opacity: 0.6,
    backgroundColor: '#1F1C40',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  cardTitleBox: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#A5B4FC',
    marginTop: 2,
  },
  badgeEmoji: {
    fontSize: 24,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  completedBadge: {
    backgroundColor: '#065F46',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  completedText: {
    color: '#A7F3D0',
    fontWeight: '700',
    fontSize: 13,
  },
});
