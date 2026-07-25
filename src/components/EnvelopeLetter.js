import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';

export default function EnvelopeLetter({ person, onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleOpen = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.93,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.05,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(true);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Role Title Header */}
      <Text style={[styles.roleHeader, { color: person?.color || '#FF007F' }]}>
        {person?.emoji} Carta de {person?.role}
      </Text>

      {!isOpen ? (
        /* VIBRANT CLOSED ENVELOPE CARD */
        <View style={styles.envelopeWrapper}>
          <Text style={styles.instructionText}>
            👇 Toca el centro del sello para abrir tu carta secreta 👇
          </Text>

          <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.envelopeCard]}>
            {/* Top Flap Icon */}
            <View style={styles.envelopeTopFlap}>
              <Text style={styles.envelopeIcon}>{person?.avatar || '✉️'}</Text>
            </View>

            <View style={styles.envelopeBody}>
              <Text style={styles.forText}>Para: Papá ❤️</Text>
              <Text style={styles.fromText}>De: {person?.sender}</Text>
            </View>

            {/* INTERACTIVE WAX SEAL IN THE CENTER */}
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.waxSeal, { backgroundColor: person?.color || '#FF007F', shadowColor: person?.color || '#FF007F' }]} 
              onPress={handleOpen}
            >
              <Text style={styles.waxSealEmoji}>{person?.emoji}</Text>
              <Text style={styles.waxSealText}>ABRIR</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ) : (
        /* OPENED VIBRANT ELEGANT LETTER CONTENT */
        <View style={styles.letterWrapper}>
          <View style={[styles.letterPaper, { borderColor: person?.color || '#FF007F' }]}>
            {/* Header */}
            <View style={styles.letterHeader}>
              <Text style={styles.letterTitle}>{person?.messageTitle}</Text>
              <Text style={styles.letterDate}>Día del Padre • 2026</Text>
            </View>

            {/* Glowing Divider line */}
            <View style={[styles.divider, { backgroundColor: person?.color || '#FF007F' }]} />

            {/* Body */}
            <Text style={styles.letterBody}>{person?.message}</Text>

            {/* Signature */}
            <View style={styles.signatureBox}>
              <Text style={styles.signatureTag}>Con todo mi amor,</Text>
              <Text style={[styles.signatureName, { color: person?.color || '#FF007F' }]}>{person?.sender}</Text>
            </View>
          </View>

          {/* Action to complete */}
          <TouchableOpacity 
            style={[styles.finishBtn, { backgroundColor: person?.color || '#00FF87' }]} 
            onPress={onComplete}
            activeOpacity={0.85}
          >
            <Text style={styles.finishBtnText}>Guardar Recuerdo y Volver al Inicio 🏠</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: '#0F0C20',
  },
  roleHeader: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  envelopeWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  instructionText: {
    color: '#FBBF24',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  envelopeCard: {
    width: '100%',
    height: 330,
    backgroundColor: '#FDE68A',
    borderRadius: 26,
    borderWidth: 3.5,
    borderColor: '#F59E0B',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
  envelopeTopFlap: {
    position: 'absolute',
    top: 18,
    alignItems: 'center',
  },
  envelopeIcon: {
    fontSize: 34,
  },
  envelopeBody: {
    alignItems: 'center',
    marginTop: 40,
  },
  forText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#78350F',
  },
  fromText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#92400E',
    marginTop: 6,
  },
  waxSeal: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  waxSealEmoji: {
    fontSize: 32,
  },
  waxSealText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 2,
  },
  letterWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  letterPaper: {
    backgroundColor: '#1F1646',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    marginBottom: 20,
  },
  letterHeader: {
    marginBottom: 12,
  },
  letterTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  letterDate: {
    fontSize: 12,
    color: '#FBBF24',
    fontWeight: '800',
  },
  divider: {
    height: 3,
    borderRadius: 2,
    marginVertical: 14,
    width: '100%',
  },
  letterBody: {
    fontSize: 16,
    color: '#E0E7FF',
    lineHeight: 26,
    fontWeight: '500',
  },
  signatureBox: {
    marginTop: 24,
    alignItems: 'flex-end',
  },
  signatureTag: {
    fontSize: 14,
    color: '#C7D2FE',
    fontStyle: 'italic',
  },
  signatureName: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  finishBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  finishBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});
