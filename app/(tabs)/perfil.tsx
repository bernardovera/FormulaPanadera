import { useRouter } from 'expo-router';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth } from '../../config/firebase';
import { useAuthStore } from '../../store/authStore';

export default function PerfilScreen() {
  const { user, isGuest, setGuest, setUser } = useAuthStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [nombre, setNombre] = useState(user?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [loadingName, setLoadingName] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);

  const handleUpdateName = async () => {
    if (!auth.currentUser) return;
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    setLoadingName(true);
    try {
      await updateProfile(auth.currentUser, { displayName: nombre.trim() });
      setUser({ ...user!, displayName: nombre.trim() });
      Alert.alert('Éxito', 'Nombre actualizado correctamente');
    } catch (e: any) {
      Alert.alert('Error', 'No se pudo actualizar el nombre');
    }
    setLoadingName(false);
  };

  const handleUpdatePassword = async () => {
    if (!auth.currentUser || !user?.email) return;
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      Alert.alert('Error', 'Completá todos los campos de contraseña');
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoadingPass(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'La contraseña actual es incorrecta');
      } else {
        Alert.alert('Error', 'Ocurrió un error al actualizar la contraseña');
      }
    }
    setLoadingPass(false);
  };

  const handleLogOut = async () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que querés cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: async () => {
          setGuest(false);
          await auth.signOut();
      }}
    ]);
  };

  if (isGuest) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.guestBox}>
          <Text style={styles.guestIcon}>👀</Text>
          <Text style={styles.guestTitle}>Modo Invitado</Text>
          <Text style={styles.guestText}>Estás usando la app sin una cuenta. Tus recetas solo se guardan en este dispositivo.</Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => { setGuest(false); router.replace('/login'); }}>
            <Text style={styles.btnPrimaryText}>Iniciar sesión / Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos Personales</Text>
          <Text style={styles.fieldLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Tu nombre"
            placeholderTextColor="#8A7F72"
          />
          <TouchableOpacity style={[styles.btnAction, loadingName && styles.btnDisabled]} onPress={handleUpdateName} disabled={loadingName}>
            <Text style={styles.btnActionText}>{loadingName ? 'Guardando...' : 'Actualizar Nombre'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
          <Text style={styles.fieldLabel}>Contraseña Actual</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            placeholder="********"
            placeholderTextColor="#8A7F72"
          />
          <Text style={styles.fieldLabel}>Nueva Contraseña</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#8A7F72"
          />
          <Text style={styles.fieldLabel}>Repetir Nueva Contraseña</Text>
          <TextInput
            style={styles.input}
            value={newPasswordConfirm}
            onChangeText={setNewPasswordConfirm}
            secureTextEntry
            placeholder="Repite tu nueva contraseña"
            placeholderTextColor="#8A7F72"
          />
          <TouchableOpacity style={[styles.btnAction, loadingPass && styles.btnDisabled]} onPress={handleUpdatePassword} disabled={loadingPass}>
            <Text style={styles.btnActionText}>{loadingPass ? 'Guardando...' : 'Actualizar Contraseña'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnLogout} onPress={handleLogOut}>
          <Text style={styles.btnLogoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16 },
  header: { marginBottom: 24, alignItems: 'center' },
  headerTitle: { color: '#F2B84B', fontSize: 24, fontWeight: '700', marginBottom: 4 },
  emailText: { color: '#8A7F72', fontSize: 14 },
  section: { backgroundColor: '#141414', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#1E1C18' },
  sectionTitle: { color: '#F0EDE8', fontSize: 16, fontWeight: '600', marginBottom: 16 },
  fieldLabel: { color: '#8A7F72', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  input: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 12, color: '#F0EDE8', fontSize: 15, marginBottom: 14, borderWidth: 1, borderColor: '#2E2A25' },
  btnAction: { backgroundColor: '#1A1A1A', borderRadius: 50, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F2B84B', marginTop: 4 },
  btnActionText: { color: '#F2B84B', fontWeight: '600', fontSize: 14 },
  btnDisabled: { opacity: 0.6 },
  btnLogout: { backgroundColor: 'rgba(224, 120, 64, 0.1)', borderRadius: 50, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#E07840', marginTop: 10 },
  btnLogoutText: { color: '#E07840', fontWeight: '700', fontSize: 15 },
  guestBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  guestIcon: { fontSize: 64, marginBottom: 16 },
  guestTitle: { color: '#F2B84B', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  guestText: { color: '#8A7F72', fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  btnPrimary: { backgroundColor: '#F2B84B', borderRadius: 50, paddingVertical: 16, paddingHorizontal: 24, alignItems: 'center', width: '100%' },
  btnPrimaryText: { color: '#000', fontWeight: '700', fontSize: 16 },
});
