import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { convertCurrency, getCurrencyList } from '@/lib/api/exchange';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Flag from 'react-world-flags';
import { currencyToCountry } from '@/utils/currencyCountryMap'; // import map

export default function ConverterScreen() {
  const [currencies, setCurrencies] = useState<{ [key: string]: { description: string } }>({});
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getCurrencyList();
      setCurrencies(data.currencies);

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

  const renderPickerItem = (key: string) => {
    const countryCode = currencyToCountry[key];
    return (
      <Picker.Item
        key={key}
        label={`${currencies[key]?.description || key}`}
        value={key}
        color="black"
      />
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'rgba(58,83,131,0.9)', dark: '#0D2847' }}
      headerTitle={
        <ThemedText type="subtitle" darkColor="#ffffff" lightColor="#004074">
          Currency Converter
        </ThemedText>
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Currency Converter</ThemedText>

        <ThemedText type="subtitle" style={styles.label}>From:</ThemedText>
        <View style={styles.pickerWrapper}>
          <Flag isoCode={currencyToCountry[from] || 'EU'} style={styles.flag} />
          <Picker
            selectedValue={from}
            onValueChange={setFrom}
            style={[
              styles.picker,
              { color: 'black' }, // Default light mode
              { color: 'white' }, // Dark mode
            ]}
          >
            {Object.keys(currencies).map(renderPickerItem)}
          </Picker>
        </View>

        <ThemedText type="subtitle" style={styles.label}>To:</ThemedText>
        <View style={styles.pickerWrapper}>
          <Flag isoCode={currencyToCountry[to] || 'EU'} style={styles.flag} />
          <Picker
            selectedValue={to}
            onValueChange={setTo}
            style={[
              styles.picker,
              { color: 'black' }, // Default light mode
              { color: 'white' }, // Dark mode
            ]}
          >
            {Object.keys(currencies).map(renderPickerItem)}
          </Picker>
        </View>

        <ThemedText type="subtitle" style={styles.label}>Amount:</ThemedText>
        <TextInput
          style={[
            styles.input,
            { color: 'black', backgroundColor: 'white' }, // Default light mode
            { color: 'white', backgroundColor: '#333' }, // Dark mode
          ]}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity
          onPress={handleConvert}
          disabled={loading}
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Converting...' : 'Convert'}
          </Text>
        </TouchableOpacity>

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
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  flag: {
    width: 32,
    height: 24,
    marginRight: 10,
    borderRadius: 4,
  },
  picker: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  button: {
    inlineFlex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    transition: 'all 0.2s',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: { fontSize: 18 },
});
