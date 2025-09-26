import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={{ uri: 'https://raw.githubusercontent.com/placeholder/haarbot-assets/main/silla.jpg' }}
      resizeMode="cover"
      style={styles.bg}
    >
      <View style={styles.overlay} />
      <View style={styles.center}>
        <Text style={styles.h1}>HAARBOT</Text>
        <Text style={styles.h2}>
          Human Automated Assistant Robot for Brain - Operated Transport
        </Text>
        <Pressable style={styles.cta} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.ctaText}>INICIA SESIÓN</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  center: { paddingHorizontal: 24, alignItems: 'center' },
  h1: { color: '#fff', fontFamily: 'Lato_700Bold', fontSize: 36, letterSpacing: 1, marginBottom: 6, textAlign: 'center' },
  h2: { color: '#fff', fontFamily: 'Lato_400Regular', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  cta: { backgroundColor: colors.primary, paddingVertical: 14, paddingHorizontal: 22, borderRadius: 12 },
  ctaText: { color: '#fff', fontFamily: 'Lato_700Bold', fontSize: 16 },
});
