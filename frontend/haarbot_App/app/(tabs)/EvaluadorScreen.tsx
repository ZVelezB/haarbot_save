import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const chartConfigBase = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: () => "#888",
  propsForDots: {
    r: "0",
  },
};

export default function EvaluadorScreen() {
  const [channels, setChannels] = useState<number[][]>([[], [], [], []]);

  useEffect(() => {
    const ws = new WebSocket("ws://0.0.0.0:8765"); // cambia TU_IP_LOCAL

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("DATA LLEGANDO:", msg.raw?.[0]?.slice(0, 5)); // imprime 5 valores
      const ch0 = Array.from({length: 200}, (_, i) => Math.sin(i / 10));
      const ch1 = Array.from({length: 200}, (_, i) => Math.cos(i / 10));
      const ch2 = Array.from({length: 200}, (_, i) => Math.sin(i / 5));
      const ch3 = Array.from({length: 200}, (_, i) => Math.random()*100);
      setChannels([ch0, ch1, ch2, ch3]);
    };

    return () => ws.close();
  }, []);

  const colors = ["#ff69b4", "#4db8ff", "#66bb6a", "#ffa726"];
  const labels = ["Canal 0 (Rosita)", "Canal 1 (Celeste)", "Canal 2 (Verde)", "Canal 3 (Naranja)"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.page}>
        <Text style={styles.title}>Señales EEG (4 canales)</Text>
        {channels.map((signal, idx) => (
          <View key={idx} style={styles.chartWrap}>
            <Text style={[styles.label, { color: colors[idx] }]}>{labels[idx]}</Text>
            {signal.length > 0 && (
              <LineChart
                data={{ labels: [], datasets: [{ data: signal }] }}
                width={Dimensions.get("window").width - 20}
                height={180}
                chartConfig={{
                  ...chartConfigBase,
                  color: () => colors[idx],
                }}
                bezier
                style={{ borderRadius: 8 }}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fffafc" },
  page: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#ff69b4", marginBottom: 16, textAlign: "center" },
  chartWrap: { marginBottom: 24 },
  label: { fontWeight: "bold", marginBottom: 8, fontSize: 14 },
});
