import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

function BlinkingCircle({ color, periodMs }: { color: string; periodMs: number }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, duration: periodMs / 2, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: periodMs / 2, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [periodMs, opacity]);

  return <Animated.View style={[styles.circle, { backgroundColor: color, opacity }]} />;
}

export default function PacienteScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.name}>Paciente: Mauricio Velez</Text>
          <Text style={styles.uid}>ID: CR78291</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.block}>
            <BlinkingCircle color="#FF5252" periodMs={93.023255813953} /> 
            <Text style={styles.freq}>10.75 Hz</Text>
            <Text style={styles.freq}>Go</Text>
          </View>
          <View style={styles.block}>
            <BlinkingCircle color="#448AFF" periodMs={85.106382978723} />
            <Text style={styles.freq}>11.75 Hz</Text>
            <Text style={styles.freq}>Stop</Text>
          </View>
          <View style={styles.block}>
            <BlinkingCircle color="#66BB6A" periodMs={72.727272727273} />
            <Text style={styles.freq}>13.75 Hz</Text>
            <Text style={styles.freq}>Atras</Text>
          </View>
          <View style={styles.block}>
            <BlinkingCircle color="#FFA726" periodMs={70.175438596491} />
            <Text style={styles.freq}>14.25 Hz</Text>
            <Text style={styles.freq}>Derecha</Text>
          </View>
          <View style={styles.block}>
            <BlinkingCircle color="#6600A1" periodMs={70.175438596491} />
            <Text style={styles.freq}>14.25 Hz</Text>
            <Text style={styles.freq}>Izquierda</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1, backgroundColor: '#f5f5f5', padding: 20, alignItems: 'center', justifyContent: 'center'
  },
  card: {
    width: '100%', maxWidth: 820, backgroundColor: '#fff', borderRadius: 12, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4,
  },
  name: { fontFamily: 'Lato_700Bold', color: '#2c3e50', fontSize: 22 },
  uid: { fontFamily: 'Lato_400Regular', color: '#7f8c8d' },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 16 },
  block: { alignItems: 'center', margin: 10 },
  circle: {
    width: 120, height: 120, borderRadius: 60,
    shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4,
    marginBottom: 12,
  },
  freq: { fontFamily: 'Lato_700Bold', color: '#2c3e50', fontSize: 16 },
});
