import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const { setUser, setLoading, user, loading, isGuest } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (loading) return;
    const inAuth = segments[0] === 'login';
    if (!user && !isGuest && !inAuth) router.replace('/login');
    if (user && inAuth) router.replace('/(tabs)');
  }, [user, isGuest, loading, segments]);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="receta-modal" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="nueva-receta" options={{ headerShown: false }} />
          <Stack.Screen name="editar-receta" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" backgroundColor="#000000" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}