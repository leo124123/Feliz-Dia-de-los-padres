import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function EnvelopeLetter({ person, onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleOpen = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
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
      {/* Role Title */}
      <Text style={[styles.roleHeader, { color: person.color }]}>
        {person.emoji} Carta de {person.role}
      </Text>

      {!isOpen ? (
        /* CLOSED ENVELOPE CARD */
        <View style={styles.envelopeWrapper}>
          <Text style={styles.instructionText}>
            👇 Toca el centro del sello para abrir tu carta secreta 👇
          </Text>

          <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.envelopeCard]}>
            {/* Flap triangles & design */}
            <View style={styles.envelopeTopFlap}>
              <Text style={styles.envelopeIcon}>{person.avatar}</Text>
            </View>

            <View style={styles.envelopeBody}>
              <Text style={styles.forText}>Para: Papá ❤️</Text>
              <Text style={styles.fromText}>De: {person.sender}</Text>
            </View>

            {/* INTERACTIVE SEAL IN THE MIDDLE */}
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.waxSeal, { backgroundColor: person.color }]} 
              onPress={handleOpen}
            >
              <Text style={styles.waxSealEmoji}>{person.emoji}</Text>
              <Text style={styles.waxSealText}>ABRIR</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ) : (
        /* OPENED LETTER CONTENT */
        <View style={styles.letterWrapper}>
          <View style={styles.letterPaper}>
            {/* Header */}
            <View style={styles.letterHeader}>
              <Text style={styles.letterTitle}>{person.messageTitle}</Text>
              <Text style={styles.letterDate}>Día del Padre 2026</Text>
            </View>

            {/* Divider line */}
            <View style={[styles.divider, { backgroundColor: person.color }]} />

            {/* Body */}
            <Text style={styles.letterBody}>{person.message}</Text>

            {/* Signature */}
            <View style={styles.signatureBox}>
              <Text style={styles.signatureTag}>Con todo mi amor,</Text>
              <Text style={[styles.signatureName, { color: person.color }]}>{person.sender}</Text>
            </View>
          </View>

          {/* Action to complete */}
          <TouchableOpacity 
            style={[styles.finishBtn, { backgroundColor: person.color }]} 
            onPress={onComplete}
            activeOpacity={0.85}
          >
            <Text style={styles.finishBtnText}>Guardar y Volver al Inicio 🏠</Text>
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
  },
  roleHeader: {
    fontSize: 22,
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
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  envelopeCard: {
    width: '100%',
    height: 320,
    backgroundColor: '#FDE68A',
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#F59E0B',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  envelopeTopFlap: {
    position: 'absolute',
    top: 15,
    alignItems: 'center',
  },
  envelopeIcon: {
    fontSize: 32,
  },
  envelopeBody: {
    alignItems: 'center',
    marginTop: 40,
  },
  forText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#78350F',
  },
  fromText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginTop: 6,
  },
  waxSeal: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  waxSealEmoji: {
    fontSize: 28,
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
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FCD34D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  letterHeader: {
    marginBottom: 12,
  },
  letterTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E1B4B',
    marginBottom: 4,
  },
  letterDate: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '600',
  },
  divider: {
    height: 3,
    borderRadius: 2,
    marginVertical: 14,
    width: '100%',
  },
  letterBody: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
    fontWeight: '500',
  },
  signatureBox: {
    marginTop: 24,
    alignItems: 'flex-end',
  },
  signatureTag: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  signatureName: {
    fontSize: 20,
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
    fontWeight: '800',
  },
});
