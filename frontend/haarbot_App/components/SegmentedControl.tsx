import React, { useEffect, useRef } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  value: 'paciente' | 'evaluador';
  onChange: (next: 'paciente' | 'evaluador') => void;
};

export default function SegmentedControl({ value, onChange }: Props) {
  const translate = useRef(new Animated.Value(0)).current;
  const widthRef = useRef(0);

  useEffect(() => {
    const toX = value === 'paciente' ? 0 : widthRef.current / 2;
    Animated.timing(translate, { toValue: toX, duration: 200, useNativeDriver: true }).start();
  }, [value, translate]);

  const onLayout = (e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
  };

  return (
    <View style={styles.wrap} onLayout={onLayout}>
      <Animated.View style={[styles.slider, { transform: [{ translateX: translate }] }]} />
      <Pressable style={styles.item} onPress={() => onChange('paciente')}>
        <Text style={[styles.label, value === 'paciente' && styles.active]}>Paciente</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={() => onChange('evaluador')}>
        <Text style={[styles.label, value === 'evaluador' && styles.active]}>Evaluador</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 999,
    padding: 4,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 16,
  },
  item: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  label: { fontFamily: 'Lato_700Bold', color: '#333' },
  active: { color: '#fff' },
  slider: {
    position: 'absolute',
    top: 4, bottom: 4, left: 4,
    width: '50%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});
