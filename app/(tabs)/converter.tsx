import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInput, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getSymbols, convertCurrency } from '@/lib/api/exchange';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Image} from "expo-image";

export default function ConverterScreen() {
  const [symbols, setSymbols] = useState<{ [key: string]: { description: string } }>({});
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getSymbols();
      setSymbols(data.symbols);
    })();
  }, []);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const data = await convertCurrency(from, to, parseFloat(amount));
      setResult(data.result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'rgba(58,83,131,0.9)', dark: '#0D2847' }}
      headerImage={
      <Image
                    source={require('@/assets/images/currency-converter.png')}
                    style={styles.reactLogo}
                />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Currency Converter</ThemedText>
        <ThemedText type="subtitle" style={styles.label}>From:</ThemedText>
        <Picker
          selectedValue={from}
          onValueChange={(itemValue) => setFrom(itemValue)}
          style={styles.picker}>
          {Object.keys(symbols).map((key) => (
            <Picker.Item key={key} label={`${key} - ${symbols[key].description}`} value={key} />
          ))}
        </Picker>
        <ThemedText type="subtitle" style={styles.label}>To:</ThemedText>
        <Picker
          selectedValue={to}
          onValueChange={(itemValue) => setTo(itemValue)}
          style={styles.picker}>
          {Object.keys(symbols).map((key) => (
            <Picker.Item key={key} label={`${key} - ${symbols[key].description}`} value={key} />
          ))}
        </Picker>
        <ThemedText type="subtitle" style={styles.label}>Amount:</ThemedText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <ThemedView style={styles.resultContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            result !== null && (
              <ThemedText type="default" style={styles.result}>
                {`Converted: ${result.toFixed(2)} ${to}`}
              </ThemedText>
            )
          )}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginTop: 10 },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: { fontSize: 18 },
});

