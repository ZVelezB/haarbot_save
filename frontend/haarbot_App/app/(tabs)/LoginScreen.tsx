import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import SegmentedControl from '../../components/SegmentedControl';
import { colors } from '../../theme/colors';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const [userType, setUserType] = useState<'paciente' | 'evaluador'>('paciente');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!username || !password) {
      setErrorMsg('Por favor, complete todos los campos.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    // Simular login como en login-script.js (1.5 s)
    setTimeout(() => {
      setLoading(false);
      if (userType === 'paciente') {
        navigation.replace('Paciente');
      } else {
        navigation.replace('Evaluador');
      }
    }, 1500);
  };

  const signInWithGoogle = async () => {
    // Minimal placeholder with AuthSession (configure clientId in real app)
    Alert.alert('Google', 'Configura expo-auth-session con tu clientId de Google.');
  };

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Text style={styles.brand}>HAARBOT</Text>
          <Text style={styles.subtitle}>
            {userType === 'paciente' ? 'Acceso para Pacientes' : 'Acceso para Evaluadores'}
          </Text>
        </View>

        <SegmentedControl value={userType} onChange={setUserType} />

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            placeholder="Usuario"
            value={username}
            onChangeText={(t) => { setUsername(t); setErrorMsg(null); }}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={(t) => { setPassword(t); setErrorMsg(null); }}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <Pressable disabled={loading} onPress={onSubmit} style={{ borderRadius: 12, overflow: 'hidden', marginTop: 8 }}>
          <LinearGradient colors={[colors.primary, colors.primaryDark]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.loginBtn}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="person-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.loginText}>Iniciar Sesión</Text>
              </>
            )}
          </LinearGradient>
        </Pressable>

        <View style={styles.dividerWrap}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>o continuar con</Text>
          <View style={styles.divider} />
        </View>

        <Pressable onPress={signInWithGoogle} style={styles.googleBtn}>
          <Ionicons name="logo-google" size={18} color="#757575" style={{ marginRight: 8 }} />
          <Text style={styles.googleText}>Iniciar Sesión con Google</Text>
        </Pressable>

        <Pressable onPress={() => Alert.alert('Recuperación', 'Implementa tu flujo de “Olvidaste tu contraseña”')}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Home')} style={{ marginTop: 12 }}>
          <Text style={styles.backLink}>← Volver al inicio</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  brand: { fontFamily: 'Lato_700Bold', fontSize: 28, color: colors.text },
  subtitle: { fontFamily: 'Lato_400Regular', color: '#6c757d' },
  formGroup: { marginTop: 12 },
  label: { fontFamily: 'Lato_700Bold', color: '#6c757d', marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#dee2e6', borderRadius: 10, paddingHorizontal: 12, height: 48,
    backgroundColor: '#fff', fontFamily: 'Lato_400Regular',
  },
  loginBtn: { height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  loginText: { color: '#fff', fontFamily: 'Lato_700Bold', fontSize: 16 },
  dividerWrap: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  divider: { flex: 1, height: 1, backgroundColor: '#dee2e6' },
  dividerText: { marginHorizontal: 10, color: '#6c757d', fontFamily: 'Lato_400Regular' },
  googleBtn: {
    height: 48, backgroundColor: '#fff', borderRadius: 10,
    borderWidth: 1, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
  },
  googleText: { color: '#757575', fontFamily: 'Lato_700Bold' },
  link: { marginTop: 12, textAlign: 'center', color: colors.primary, fontFamily: 'Lato_400Regular' },
  backLink: { textAlign: 'center', color: '#333', fontFamily: 'Lato_400Regular' },
  error: { backgroundColor: '#f8d7da', color: '#842029', padding: 8, borderRadius: 8, marginBottom: 8, textAlign: 'center' },
});
