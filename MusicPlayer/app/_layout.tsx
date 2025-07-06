import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from '../Authentification/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
      <AuthProvider>
        <Stack>
          <Stack.Screen name="login" options={{headerShown: false}}/>
          <Stack.Screen name="register" options={{headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{headerShown: false}}/>
        </Stack>
      </AuthProvider>
  );
}
