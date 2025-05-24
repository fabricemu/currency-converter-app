import {Image} from 'expo-image';
import {StyleSheet} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: 'rgba(13,40,71,0.5)', dark: '#0D2847'}}
            headerImage={
                <Image
                    source={require('@/assets/images/currency-converter.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Currency Converter</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Overview</ThemedText>
                <ThemedText>
                    A simple currency converter app built with React Native and Expo. It uses the{' '}
                    <ThemedText type="defaultSemiBold">exchangerate.host</ThemedText> API to fetch live exchange rates for over 170 currencies.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Features</ThemedText>
                <ThemedText>
                    - Convert between multiple currencies in real-time.{'\n'}
                    - Fetch live exchange rates and historical data.{'\n'}
                    - Simple and intuitive user interface.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Get Started</ThemedText>
                <ThemedText>
                    Navigate to the Converter tab to start converting currencies.
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 60,
        width: 60,
        position: 'relative',
    },
});
