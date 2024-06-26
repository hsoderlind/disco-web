import { useState, useEffect, useLayoutEffect } from 'react';

export const colorSchemes = {
    light: '(prefers-color-scheme: light)',
    dark: '(prefers-color-scheme: dark)',
} as const;

export type ThemeType = keyof typeof colorSchemes;

export type OnThemeChangeCb = () => void

function onThemeChange(callback: OnThemeChangeCb) {
    return (event: MediaQueryListEvent) => {
        if (!event || !event.matches) {
            return;
        }

        callback();
    };
}

export default function useSystemTheme(initialTheme: ThemeType) {
    const [theme, setTheme] = useState(initialTheme || null);

    useEffect(() => {
        // SSR or matchMedia not supported
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const lightMatch = window.matchMedia(colorSchemes.light);
        const onLightMatches = onThemeChange(() => setTheme('light'));

        lightMatch.addListener(onLightMatches);

        const darkMatch = window.matchMedia(colorSchemes.dark);
        const onDarkMatches = onThemeChange(() => setTheme('dark'));

        darkMatch.addListener(onDarkMatches);

        return () => {
            lightMatch.removeListener(onLightMatches);
            darkMatch.removeListener(onDarkMatches);
        };
    }, []);

    useLayoutEffect(() => {
        // SSR or matchMedia not supported
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        if (window.matchMedia(colorSchemes.dark).matches && theme !== 'dark') {
            setTheme('dark');
        } else if (window.matchMedia(colorSchemes.light).matches && theme !== 'light') {
            setTheme('light');
        }
    }, [theme]);

    return theme;
}
