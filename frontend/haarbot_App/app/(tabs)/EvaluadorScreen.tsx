import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function EvaluadorScreen() {
  const [rawData, setRawData] = useState<number[][]>([]);
  const [prediction, setPrediction] = useState<string>("Esperando datos...");

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.10:8765"); // Cambia a la IP de tu server

    ws.onopen = () => {
      console.log("Conectado al servidor BrainFlow");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setRawData(msg.raw.slice(0, 5)); // solo los primeros 5 canales
      setPrediction(msg.prediction);
    };

    ws.onerror = (err) => {
      console.error("Error en WebSocket:", err);
    };

    ws.onclose = () => {
      console.log("Conexión cerrada");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Evaluador - BrainFlow</Text>
      <Text style={styles.pred}>Predicción: {prediction}</Text>

      <Text style={styles.subtitle}>Datos crudos (primeros canales):</Text>
      <FlatList
        data={rawData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.row}>
            Canal {index + 1}: {item.slice(0, 5).map(v => v.toFixed(2)).join(", ")}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  subtitle: { fontSize: 16, marginTop: 20, marginBottom: 6 },
  pred: { fontSize: 18, color: 'blue', fontWeight: '600' },
  row: { fontSize: 14, color: '#333', marginBottom: 4 },
});
