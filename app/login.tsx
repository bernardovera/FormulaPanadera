import { useRouter } from 'expo-router';
import {
    createUserWithEmailAndPassword,
    signInWithCredential,
    signInWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    sendPasswordResetEmail
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

GoogleSignin.configure({
  webClientId: '377601270360-u7e2egdq11ab4ckbp4jrl03aam11bkn9.apps.googleusercontent.com',
});
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setUser, setGuest } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const migrateLocalRecipes = async (uid: string) => {
    try {
      const localData = await AsyncStorage.getItem('recetas_usuario');
      if (localData) {
        const localRecipes = JSON.parse(localData);
        for (const r of localRecipes) {
          await setDoc(doc(db, 'users', uid, 'recipes', r.id), r);
        }
        await AsyncStorage.removeItem('recetas_usuario');
      }
    } catch (e) {
      console.log('Error migrating recipes', e);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Olvidaste tu contraseña', 'Por favor, ingresa tu email arriba para enviarte el enlace de recuperación.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert('Correo enviado', 'Revisa tu bandeja de entrada o spam para restablecer tu contraseña.');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Verifica que el email ingresado sea correcto.');
      } else {
        Alert.alert('Error', 'No se pudo enviar el correo de recuperación.');
      }
    }
  };

  const handleEmailAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Completá todos los campos');
      return;
    }
    if (mode === 'register' && password !== passwordConfirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      let userCredential;
      if (mode === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(userCredential.user, { displayName: nombre.trim() });
      }
      const u = userCredential.user;
      await migrateLocalRecipes(u.uid);
      setUser({ uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL });
      router.replace('/(tabs)');
    } catch (error: any) {
      const msg: Record<string, string> = {
        'auth/user-not-found': 'No existe una cuenta con ese email',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/email-already-in-use': 'Ya existe una cuenta con ese email',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/invalid-email': 'Email inválido',
        'auth/invalid-credential': 'Email o contraseña incorrectos',
      };
      Alert.alert('Error', msg[error.code] || 'Ocurrió un error, intentá de nuevo');
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setLoadingGoogle(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo?.data?.idToken) throw new Error('No se recibió idToken de Google');
      
      const googleCredential = GoogleAuthProvider.credential(userInfo.data.idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      
      const u = userCredential.user;
      await migrateLocalRecipes(u.uid);
      setUser({ uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL });
      router.replace('/(tabs)');
    } catch (error: any) {
      if (error.code === 'SIGN_IN_CANCELLED') {
         // El usuario canceló
      } else {
         Alert.alert('Error con Google', error.message || 'No se pudo iniciar sesión con Google');
      }
    }
    setLoadingGoogle(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>

        {/* Logo */}
        <View style={styles.logoBox}>
          <Text style={styles.logoEmoji}>🌾</Text>
          <Text style={styles.logoTitle}>Fórmula Panadera</Text>
          <Text style={styles.logoSub}>Tu calculadora profesional de panadería</Text>
        </View>

        {/* Mode tabs */}
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'login' && styles.modeBtnActive]}
            onPress={() => setMode('login')}>
            <Text style={[styles.modeBtnText, mode === 'login' && styles.modeBtnTextActive]}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'register' && styles.modeBtnActive]}
            onPress={() => setMode('register')}>
            <Text style={[styles.modeBtnText, mode === 'register' && styles.modeBtnTextActive]}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {mode === 'register' && (
            <>
              <Text style={styles.fieldLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre"
                placeholderTextColor="#8A7F72"
                autoCapitalize="words"
              />
            </>
          )}

          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            placeholderTextColor="#8A7F72"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.fieldLabel}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#8A7F72"
            secureTextEntry
          />

          {mode === 'login' && (
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotBtn}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          )}

          {mode === 'register' && (
            <>
              <Text style={styles.fieldLabel}>Repetir Contraseña</Text>
              <TextInput
                style={styles.input}
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                placeholder="Repetir contraseña"
                placeholderTextColor="#8A7F72"
                secureTextEntry
              />
            </>
          )}

          <TouchableOpacity
            style={[styles.btnPrimary, loading && styles.btnDisabled]}
            onPress={handleEmailAuth}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.btnPrimaryText}>
                {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>o continuá con</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <TouchableOpacity style={[styles.btnGoogle, loadingGoogle && styles.btnDisabled]} onPress={handleGoogleAuth} disabled={loadingGoogle}>
          {loadingGoogle ? (
              <ActivityIndicator color="#F0EDE8" />
          ) : (
             <Text style={styles.btnGoogleText}>🔵 Continuar con Google</Text>
          )}
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity style={styles.btnApple}>
          <Text style={styles.btnAppleText}> Continuar con Apple</Text>
          <Text style={styles.btnAppleSub}>Próximamente</Text>
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity style={styles.skipBtn} onPress={() => { setGuest(true); router.replace('/(tabs)'); }}>
          <Text style={styles.skipText}>Continuar sin cuenta →</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Sin cuenta, tus recetas se guardan solo en este dispositivo.
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 24 },

  logoBox: { alignItems: 'center', marginBottom: 40 },
  logoEmoji: { fontSize: 64, marginBottom: 12 },
  logoTitle: { fontSize: 28, fontWeight: '700', color: '#F2B84B', marginBottom: 8 },
  logoSub: { fontSize: 14, color: '#8A7F72', textAlign: 'center' },

  modeRow: {
    flexDirection: 'row', backgroundColor: '#1A1A1A',
    borderRadius: 50, padding: 4, marginBottom: 24,
  },
  modeBtn: { flex: 1, paddingVertical: 10, borderRadius: 50, alignItems: 'center' },
  modeBtnActive: { backgroundColor: '#F2B84B' },
  modeBtnText: { color: '#8A7F72', fontSize: 14, fontWeight: '600' },
  modeBtnTextActive: { color: '#000' },

  form: { marginBottom: 24 },
  fieldLabel: { color: '#8A7F72', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  input: {
    backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14,
    color: '#F0EDE8', fontSize: 15, marginBottom: 16,
    borderWidth: 1, borderColor: '#2E2A25',
  },
  forgotBtn: { alignItems: 'flex-end', marginBottom: 16, marginTop: -4 },
  forgotText: { color: '#F2B84B', fontSize: 13, fontWeight: '500' },
  btnPrimary: {
    backgroundColor: '#F2B84B', borderRadius: 50,
    paddingVertical: 16, alignItems: 'center', marginTop: 4,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: { color: '#000', fontWeight: '700', fontSize: 16 },

  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#2E2A25' },
  dividerText: { color: '#8A7F72', fontSize: 12, marginHorizontal: 12 },

  btnGoogle: {
    backgroundColor: '#1A1A1A', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: '#2E2A25', flexDirection: 'row', justifyContent: 'center', gap: 8,
  },
  btnGoogleText: { color: '#F0EDE8', fontWeight: '600', fontSize: 15 },
  btnGoogleSub: { color: '#8A7F72', fontSize: 11 },

  btnApple: {
    backgroundColor: '#1A1A1A', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginBottom: 24,
    borderWidth: 1, borderColor: '#2E2A25', flexDirection: 'row', justifyContent: 'center', gap: 8,
  },
  btnAppleText: { color: '#F0EDE8', fontWeight: '600', fontSize: 15 },
  btnAppleSub: { color: '#8A7F72', fontSize: 11 },

  skipBtn: { alignItems: 'center', marginBottom: 12 },
  skipText: { color: '#F2B84B', fontSize: 14, fontWeight: '600' },
  disclaimer: { color: '#8A7F72', fontSize: 12, textAlign: 'center', lineHeight: 18 },
});