import type {PropsWithChildren, ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset,} from 'react-native-reanimated';

import {ThemedView} from '@/components/ThemedView';
import {useBottomTabOverflow} from '@/components/ui/TabBarBackground';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Image} from "expo-image";

const HEADER_HEIGHT = 80;

type HeaderProps = PropsWithChildren<{
    headerTitle: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView(
    {
        children,
        headerBackgroundColor,
        headerTitle,
    }: HeaderProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                scrollIndicatorInsets={{bottom}}
                contentContainerStyle={{paddingBottom: bottom}}>
                <Animated.View
                    style={[
                        styles.header,
                        {backgroundColor: headerBackgroundColor[colorScheme]},
                        headerAnimatedStyle,
                    ]}>
                    {headerTitle}
                    {<Image
                        source={require('@/assets/images/currency-converter.png')}
                        style={styles.reactLogo}
                    />}
                </Animated.View>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: HEADER_HEIGHT,
        overflow: 'hidden',
        paddingHorizontal: 16,   // Add padding for spacing
        marginTop: 20, // Adjust for the header height
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically
        gap: 8, // Add space between title and image
        justifyContent: 'space-between', // Align to the right
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
      reactLogo: {
        height: 110,
        width: 110,
        position: 'relative',
        left: 35,
    },
});
