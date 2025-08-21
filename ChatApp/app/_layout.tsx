import { AuthProvider } from '@/Authentification/AuthContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/useColorScheme';
import DataProvider from './DataProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name='start' options={{ headerShown: false}} />
            <Stack.Screen name='login' options={{ headerShown: false}} />
            <Stack.Screen name='register' options={{ headerShown: false}} />
            <Stack.Screen name='home' options={{ headerShown: false}} />
            <Stack.Screen name='[id_chat]' options={{ headerShown: false}} />
            <Stack.Screen name='search-page' options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}
