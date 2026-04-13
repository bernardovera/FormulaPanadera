import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Ingrediente = { id: string; name: string; pct: number; cat: string };
type EtapaLevado = { id: string; nombre: string; horas: number; mins: number; temp: number; tipo: string };

const CAT_COLORS: Record<string, string> = {
  harina: '#F2B84B', liquido: '#6EC89A', sal: '#B0A898', levadura: '#E0889A',
  grasa: '#D4A35A', azucar: '#FFD578', huevo: '#E07840', lacteo: '#C8D2F0',
  relleno: '#A082DC', otro: '#969696',
};
const CAT_ING = ['harina', 'liquido', 'sal', 'levadura', 'grasa', 'azucar', 'huevo', 'lacteo', 'relleno', 'otro'];
const CAT_ING_LABELS: Record<string, string> = {
  harina: 'Harina', liquido: 'Líquido', sal: 'Sal', levadura: 'Levadura',
  grasa: 'Grasa', azucar: 'Azúcar', huevo: 'Huevo', lacteo: 'Lácteo', relleno: 'Relleno', otro: 'Otro',
};
const TIPOS_LEVADO = ['Fermentación en bloque', 'Pre-forma', 'Forma final', 'Retardo (nevera)', 'Autólisis', 'Poolish', 'Biga', 'Pie francés'];
const TIPOS_HORNO = ['Estático', 'Convección', 'Leña', 'Combi'];
const CATEGORIAS_RECETA = [
  'Pan venezolano', 'Pan dulce venezolano', 'Pan andino venezolano', 'Pan venezolano especial',
  'Pan europeo', 'Pan francés', 'Pan francés rústico', 'Pan francés de campo', 'Pan francés provenzal',
  'Pan italiano', 'Pan judío', 'Pan de molde', 'Pan integral', 'Pan enriquecido',
  'Pan dulce', 'Pan dulce especial', 'Pan festivo italiano', 'Pan festivo alemán',
  'Pan relleno', 'Pan relleno venezolano', 'Pan plano', 'Pan de centeno', 'Pan especial',
];
const genId = () => Math.random().toString(36).slice(2);

export default function NuevaRecetaScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isGuest } = useAuthStore();

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Pan venezolano');
  const [poston, setPoston] = useState('');
  const [amasado, setAmasado] = useState('');
  const [tempMasa, setTempMasa] = useState('25');
  const [ingredients, setIngredients] = useState<Ingrediente[]>([{ id: genId(), name: 'Harina panadera', pct: 100, cat: 'harina' }]);
  const [showIngForm, setShowIngForm] = useState(false);
  const [ingName, setIngName] = useState('');
  const [ingPct, setIngPct] = useState('');
  const [ingCat, setIngCat] = useState('harina');
  const [editIngId, setEditIngId] = useState<string | null>(null);
  const [levado, setLevado] = useState<EtapaLevado[]>([]);
  const [showLevForm, setShowLevForm] = useState(false);
  const [levNombre, setLevNombre] = useState('');
  const [levHoras, setLevHoras] = useState('0');
  const [levMins, setLevMins] = useState('0');
  const [levTemp, setLevTemp] = useState('25');
  const [levTipo, setLevTipo] = useState('Fermentación en bloque');
  const [cocTemp, setCocTemp] = useState('220');
  const [cocTiempo, setCocTiempo] = useState('30');
  const [cocTempInterna, setCocTempInterna] = useState('93');
  const [cocHorno, setCocHorno] = useState('Estático');
  const [cocVapor, setCocVapor] = useState(false);
  const [cocNotas, setCocNotas] = useState('');
  const [section, setSection] = useState<'info' | 'ingredientes' | 'levado' | 'coccion'>('info');

  const openAddIng = () => { setEditIngId(null); setIngName(''); setIngPct(''); setIngCat('harina'); setShowIngForm(true); };
  const openEditIng = (ing: Ingrediente) => { setEditIngId(ing.id); setIngName(ing.name); setIngPct(ing.pct.toString()); setIngCat(ing.cat); setShowIngForm(true); };
  const saveIng = () => {
    if (!ingName.trim() || !ingPct.trim()) return;
    const pct = parseFloat(ingPct);
    if (isNaN(pct) || pct <= 0) return;
    if (editIngId) setIngredients(prev => prev.map(i => i.id === editIngId ? { ...i, name: ingName.trim(), pct, cat: ingCat } : i));
    else setIngredients(prev => [...prev, { id: genId(), name: ingName.trim(), pct, cat: ingCat }]);
    setShowIngForm(false);
  };
  const deleteIng = (id: string) => setIngredients(prev => prev.filter(i => i.id !== id));
  const openAddLev = () => { setLevNombre(''); setLevHoras('0'); setLevMins('0'); setLevTemp('25'); setLevTipo('Fermentación en bloque'); setShowLevForm(true); };
  const saveLev = () => {
    if (!levNombre.trim()) return;
    setLevado(prev => [...prev, { id: genId(), nombre: levNombre.trim(), horas: parseInt(levHoras) || 0, mins: parseInt(levMins) || 0, temp: parseInt(levTemp) || 25, tipo: levTipo }]);
    setShowLevForm(false);
  };
  const deleteLev = (id: string) => setLevado(prev => prev.filter(e => e.id !== id));

  const guardar = async () => {
    if (!nombre.trim()) { Alert.alert('Error', 'El nombre es obligatorio'); return; }
    const receta = {
      id: `u_${genId()}`, name: nombre.trim(), category: categoria,
      poston: parseInt(poston) || 0, preset: false,
      ingredients,
      proceso: { amasado: amasado.trim() || '5/3', tempMasa: parseInt(tempMasa) || 25 },
      levado,
      coccion: { temp: parseInt(cocTemp) || 220, tiempo: parseInt(cocTiempo) || 30, tempInterna: parseInt(cocTempInterna) || 93, ovenType: cocHorno, vapor: cocVapor, notas: cocNotas.trim() },
    };
    try {
      if (user && !isGuest) {
        await setDoc(doc(db, 'users', user.uid, 'recipes', receta.id), receta);
      } else {
        const data = await AsyncStorage.getItem('recetas_usuario');
        const lista = data ? JSON.parse(data) : [];
        lista.push(receta);
        await AsyncStorage.setItem('recetas_usuario', JSON.stringify(lista));
      }
      Alert.alert('Éxito', 'Receta guardada con éxito', [
        { text: 'OK', onPress: () => router.push('/(tabs)') }
      ]);
    } catch { Alert.alert('Error', 'No se pudo guardar'); }
  };

  const tabs = [{ key: 'info', label: 'Info' }, { key: 'ingredientes', label: 'Ingredientes' }, { key: 'levado', label: 'Levado' }, { key: 'coccion', label: 'Cocción' }] as const;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nueva Receta</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={guardar}>
          <Text style={styles.saveBtnText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabRow}>
        {tabs.map(t => (
          <TouchableOpacity key={t.key} style={[styles.tab, section === t.key && styles.tabActive]} onPress={() => setSection(t.key)}>
            <Text style={[styles.tabText, section === t.key && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
        {section === 'info' && (
          <View>
            <Text style={styles.fieldLabel}>Nombre *</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Mi Pan Campesino" placeholderTextColor="#8A7F72" />
            <Text style={styles.fieldLabel}>Categoría</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {CATEGORIAS_RECETA.map(cat => (
                <TouchableOpacity key={cat} style={[styles.chip, categoria === cat && styles.chipActive]} onPress={() => setCategoria(cat)}>
                  <Text style={[styles.chipText, categoria === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.fieldLabel}>Peso del pastón (g)</Text>
            <TextInput style={styles.input} value={poston} onChangeText={setPoston} keyboardType="numeric" placeholder="Ej: 500" placeholderTextColor="#8A7F72" />
            <Text style={styles.fieldLabel}>Ciclo de amasado</Text>
            <TextInput style={styles.input} value={amasado} onChangeText={setAmasado} placeholder="Ej: 5/3" placeholderTextColor="#8A7F72" />
            <Text style={styles.fieldLabel}>Temperatura de masa (°C)</Text>
            <TextInput style={styles.input} value={tempMasa} onChangeText={setTempMasa} keyboardType="numeric" placeholder="25" placeholderTextColor="#8A7F72" />
          </View>
        )}

        {section === 'ingredientes' && (
          <View>
            {ingredients.map(ing => (
              <View key={ing.id} style={styles.listRow}>
                <View style={[styles.dot, { backgroundColor: CAT_COLORS[ing.cat] || '#969696' }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.listName}>{ing.name}</Text>
                  <Text style={styles.listSub}>{CAT_ING_LABELS[ing.cat]} · {ing.pct}%</Text>
                </View>
                <TouchableOpacity style={styles.editBtn} onPress={() => openEditIng(ing)}><Text style={styles.editBtnText}>✎</Text></TouchableOpacity>
                <TouchableOpacity style={styles.delBtn} onPress={() => deleteIng(ing.id)}><Text style={styles.delBtnText}>✕</Text></TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addBtn} onPress={openAddIng}><Text style={styles.addBtnText}>+ Agregar ingrediente</Text></TouchableOpacity>
            {showIngForm && (
              <View style={styles.form}>
                <Text style={styles.formTitle}>{editIngId ? 'Editar' : 'Nuevo'} ingrediente</Text>
                <Text style={styles.fieldLabel}>Nombre</Text>
                <TextInput style={styles.input} value={ingName} onChangeText={setIngName} placeholder="Ej: Harina integral" placeholderTextColor="#8A7F72" />
                <Text style={styles.fieldLabel}>Porcentaje (%)</Text>
                <TextInput style={styles.input} value={ingPct} onChangeText={setIngPct} keyboardType="numeric" placeholder="Ej: 20" placeholderTextColor="#8A7F72" />
                <Text style={styles.fieldLabel}>Categoría</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                  {CAT_ING.map(cat => (
                    <TouchableOpacity key={cat} style={[styles.chip, ingCat === cat && { backgroundColor: CAT_COLORS[cat], borderColor: CAT_COLORS[cat] }]} onPress={() => setIngCat(cat)}>
                      <Text style={[styles.chipText, ingCat === cat && { color: '#000', fontWeight: '700' }]}>{CAT_ING_LABELS[cat]}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.formBtns}>
                  <TouchableOpacity style={styles.btnCancel} onPress={() => setShowIngForm(false)}><Text style={styles.btnCancelText}>Cancelar</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.btnSave} onPress={saveIng}><Text style={styles.btnSaveText}>Guardar</Text></TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {section === 'levado' && (
          <View>
            {levado.map(e => (
              <View key={e.id} style={styles.listRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listName}>{e.nombre}</Text>
                  <Text style={styles.listSub}>{e.tipo} · {e.temp}°C · {e.horas}h {e.mins}m</Text>
                </View>
                <TouchableOpacity style={styles.delBtn} onPress={() => deleteLev(e.id)}><Text style={styles.delBtnText}>✕</Text></TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addBtn} onPress={openAddLev}><Text style={styles.addBtnText}>+ Agregar etapa</Text></TouchableOpacity>
            {showLevForm && (
              <View style={styles.form}>
                <Text style={styles.formTitle}>Nueva etapa</Text>
                <Text style={styles.fieldLabel}>Nombre</Text>
                <TextInput style={styles.input} value={levNombre} onChangeText={setLevNombre} placeholder="Ej: Fermentación inicial" placeholderTextColor="#8A7F72" />
                <View style={styles.rowFields}>
                  <View style={{ flex: 1 }}><Text style={styles.fieldLabel}>Horas</Text><TextInput style={styles.input} value={levHoras} onChangeText={setLevHoras} keyboardType="numeric" placeholder="0" placeholderTextColor="#8A7F72" /></View>
                  <View style={{ flex: 1, marginLeft: 8 }}><Text style={styles.fieldLabel}>Minutos</Text><TextInput style={styles.input} value={levMins} onChangeText={setLevMins} keyboardType="numeric" placeholder="0" placeholderTextColor="#8A7F72" /></View>
                  <View style={{ flex: 1, marginLeft: 8 }}><Text style={styles.fieldLabel}>Temp °C</Text><TextInput style={styles.input} value={levTemp} onChangeText={setLevTemp} keyboardType="numeric" placeholder="25" placeholderTextColor="#8A7F72" /></View>
                </View>
                <Text style={styles.fieldLabel}>Tipo</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                  {TIPOS_LEVADO.map(tipo => (
                    <TouchableOpacity key={tipo} style={[styles.chip, levTipo === tipo && styles.chipActive]} onPress={() => setLevTipo(tipo)}>
                      <Text style={[styles.chipText, levTipo === tipo && styles.chipTextActive]}>{tipo}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.formBtns}>
                  <TouchableOpacity style={styles.btnCancel} onPress={() => setShowLevForm(false)}><Text style={styles.btnCancelText}>Cancelar</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.btnSave} onPress={saveLev}><Text style={styles.btnSaveText}>Guardar</Text></TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {section === 'coccion' && (
          <View>
            <View style={styles.rowFields}>
              <View style={{ flex: 1 }}><Text style={styles.fieldLabel}>Temp. horno (°C)</Text><TextInput style={styles.input} value={cocTemp} onChangeText={setCocTemp} keyboardType="numeric" placeholder="220" placeholderTextColor="#8A7F72" /></View>
              <View style={{ flex: 1, marginLeft: 8 }}><Text style={styles.fieldLabel}>Tiempo (min)</Text><TextInput style={styles.input} value={cocTiempo} onChangeText={setCocTiempo} keyboardType="numeric" placeholder="30" placeholderTextColor="#8A7F72" /></View>
            </View>
            <Text style={styles.fieldLabel}>Temp. interna (°C)</Text>
            <TextInput style={styles.input} value={cocTempInterna} onChangeText={setCocTempInterna} keyboardType="numeric" placeholder="93" placeholderTextColor="#8A7F72" />
            <Text style={styles.fieldLabel}>Tipo de horno</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {TIPOS_HORNO.map(tipo => (
                <TouchableOpacity key={tipo} style={[styles.chip, cocHorno === tipo && styles.chipActive]} onPress={() => setCocHorno(tipo)}>
                  <Text style={[styles.chipText, cocHorno === tipo && styles.chipTextActive]}>{tipo}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.fieldLabel}>Vapor</Text>
            <View style={styles.vaporRow}>
              <TouchableOpacity style={[styles.chip, !cocVapor && styles.chipActive]} onPress={() => setCocVapor(false)}><Text style={[styles.chipText, !cocVapor && styles.chipTextActive]}>Sin vapor</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.chip, cocVapor && styles.chipActive]} onPress={() => setCocVapor(true)}><Text style={[styles.chipText, cocVapor && styles.chipTextActive]}>Con vapor</Text></TouchableOpacity>
            </View>
            <Text style={styles.fieldLabel}>Notas de cocción</Text>
            <TextInput style={[styles.input, styles.inputMulti]} value={cocNotas} onChangeText={setCocNotas} placeholder="Ej: 4 incisiones diagonales" placeholderTextColor="#8A7F72" multiline numberOfLines={3} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1E1C18', gap: 10 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: '#F2B84B', fontSize: 18 },
  headerTitle: { flex: 1, color: '#F0EDE8', fontSize: 17, fontWeight: '700' },
  saveBtn: { backgroundColor: '#F2B84B', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 8 },
  saveBtnText: { color: '#000', fontWeight: '700', fontSize: 14 },
  tabRow: { flexDirection: 'row', backgroundColor: '#0D0D0D', borderBottomWidth: 1, borderBottomColor: '#1E1C18' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#F2B84B' },
  tabText: { color: '#8A7F72', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#F2B84B' },
  content: { padding: 16 },
  fieldLabel: { color: '#8A7F72', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, marginTop: 4 },
  input: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 12, color: '#F0EDE8', fontSize: 15, marginBottom: 14, borderWidth: 1, borderColor: '#2E2A25' },
  inputMulti: { height: 80, textAlignVertical: 'top' },
  rowFields: { flexDirection: 'row', marginBottom: 0 },
  chipScroll: { marginBottom: 14 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: '#2E2A25', marginRight: 8 },
  chipActive: { backgroundColor: '#F2B84B', borderColor: '#F2B84B' },
  chipText: { color: '#8A7F72', fontSize: 13 },
  chipTextActive: { color: '#000', fontWeight: '700' },
  listRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#141414', borderRadius: 12, padding: 12, marginBottom: 8, gap: 10, borderWidth: 1, borderColor: '#1E1C18' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  listName: { color: '#F0EDE8', fontSize: 14, fontWeight: '600' },
  listSub: { color: '#8A7F72', fontSize: 12, marginTop: 2 },
  editBtn: { padding: 4 },
  editBtnText: { color: '#F2B84B', fontSize: 16 },
  delBtn: { padding: 4 },
  delBtnText: { color: '#8A7F72', fontSize: 16 },
  addBtn: { backgroundColor: '#F2B84B', borderRadius: 50, paddingVertical: 14, alignItems: 'center', marginBottom: 16 },
  addBtnText: { color: '#000', fontWeight: '700', fontSize: 14 },
  form: { backgroundColor: '#141414', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2E2A25', marginBottom: 16 },
  formTitle: { color: '#F2B84B', fontSize: 15, fontWeight: '700', marginBottom: 14 },
  formBtns: { flexDirection: 'row', gap: 8, marginTop: 4 },
  btnCancel: { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 50, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#2E2A25' },
  btnCancelText: { color: '#8A7F72', fontWeight: '600' },
  btnSave: { flex: 1, backgroundColor: '#F2B84B', borderRadius: 50, paddingVertical: 12, alignItems: 'center' },
  btnSaveText: { color: '#000', fontWeight: '700' },
  vaporRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
});
