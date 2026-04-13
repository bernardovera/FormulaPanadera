import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Ingrediente = { id: string; name: string; pct: number; cat: string };

const CAT_COLORS: Record<string, string> = {
  harina: '#F2B84B', liquido: '#6EC89A', sal: '#B0A898', levadura: '#E0889A',
  grasa: '#D4A35A', azucar: '#FFD578', huevo: '#E07840', lacteo: '#C8D2F0',
  relleno: '#A082DC', otro: '#969696',
};
const CATEGORIAS = ['harina', 'liquido', 'sal', 'levadura', 'grasa', 'azucar', 'huevo', 'lacteo', 'relleno', 'otro'];
const CAT_LABELS: Record<string, string> = {
  harina: 'Harina', liquido: 'Líquido', sal: 'Sal', levadura: 'Levadura',
  grasa: 'Grasa', azucar: 'Azúcar', huevo: 'Huevo', lacteo: 'Lácteo', relleno: 'Relleno', otro: 'Otro',
};
const genId = () => Math.random().toString(36).slice(2);
const DEFAULT_INGREDIENTS: Ingrediente[] = [
  { id: genId(), name: 'Harina panadera', pct: 100, cat: 'harina' },
  { id: genId(), name: 'Agua', pct: 65, cat: 'liquido' },
  { id: genId(), name: 'Sal', pct: 1.8, cat: 'sal' },
  { id: genId(), name: 'Levadura', pct: 1, cat: 'levadura' },
];

export default function CalculadoraScreen() {
  const insets = useSafeAreaInsets();
  const [ingredients, setIngredients] = useState<Ingrediente[]>(DEFAULT_INGREDIENTS);
  const [mode, setMode] = useState<'harina' | 'total'>('harina');
  const [pesoRef, setPesoRef] = useState('1000');
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPct, setNewPct] = useState('');
  const [newCat, setNewCat] = useState('harina');
  const [editId, setEditId] = useState<string | null>(null);

  const totalPct = ingredients.reduce((s, i) => s + i.pct, 0);
  const harinaPct = ingredients.filter(i => i.cat === 'harina').reduce((s, i) => s + i.pct, 0);
  const aguaPct = ingredients.filter(i => i.cat === 'liquido').reduce((s, i) => s + i.pct, 0);
  const hidratacion = harinaPct > 0 ? Math.round((aguaPct / harinaPct) * 100) : 0;
  const pesoRefNum = parseFloat(pesoRef) || 0;

  const calcPeso = (pct: number) => {
    if (pesoRefNum === 0) return 0;
    if (mode === 'harina') return Math.round((pct / 100) * pesoRefNum * 10) / 10;
    return Math.round(pct * (pesoRefNum / totalPct) * 10) / 10;
  };
  const pesoTotal = mode === 'harina' ? Math.round((totalPct / 100) * pesoRefNum * 10) / 10 : pesoRefNum;

  const openAdd = () => { setEditId(null); setNewName(''); setNewPct(''); setNewCat('harina'); setShowForm(true); };
  const openEdit = (ing: Ingrediente) => { setEditId(ing.id); setNewName(ing.name); setNewPct(ing.pct.toString()); setNewCat(ing.cat); setShowForm(true); };
  const saveIngredient = () => {
    if (!newName.trim() || !newPct.trim()) return;
    const pct = parseFloat(newPct);
    if (isNaN(pct) || pct <= 0) return;
    if (editId) setIngredients(prev => prev.map(i => i.id === editId ? { ...i, name: newName.trim(), pct, cat: newCat } : i));
    else setIngredients(prev => [...prev, { id: genId(), name: newName.trim(), pct, cat: newCat }]);
    setShowForm(false);
  };
  const deleteIngredient = (id: string) => {
    Alert.alert('Eliminar', '¿Eliminar este ingrediente?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setIngredients(prev => prev.filter(i => i.id !== id)) },
    ]);
  };
  const reset = () => {
    Alert.alert('Reiniciar', '¿Volver a la fórmula por defecto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: () => setIngredients(DEFAULT_INGREDIENTS) },
    ]);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.modeRow}>
          <TouchableOpacity style={[styles.modeBtn, mode === 'harina' && styles.modeBtnActive]} onPress={() => setMode('harina')}>
            <Text style={[styles.modeBtnText, mode === 'harina' && styles.modeBtnTextActive]}>Por harina</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modeBtn, mode === 'total' && styles.modeBtnActive]} onPress={() => setMode('total')}>
            <Text style={[styles.modeBtnText, mode === 'total' && styles.modeBtnTextActive]}>Por masa total</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pesoRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.fieldLabel}>{mode === 'harina' ? 'Peso de harina (g)' : 'Peso total (g)'}</Text>
            <TextInput style={styles.pesoInput} value={pesoRef} onChangeText={setPesoRef} keyboardType="numeric" placeholder="1000" placeholderTextColor="#8A7F72" />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 16 }}>
            <Text style={styles.fieldLabel}>Hidratación</Text>
            <Text style={styles.hidValue}>{hidratacion}%</Text>
            <View style={styles.hidBar}><View style={[styles.hidFill, { width: `${Math.min(hidratacion, 100)}%` }]} /></View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statTile}><Text style={styles.statLabel}>Total %</Text><Text style={styles.statVal}>{Math.round(totalPct)}%</Text></View>
          <View style={styles.statTile}><Text style={styles.statLabel}>Peso total</Text><Text style={styles.statVal}>{pesoTotal}g</Text></View>
          <View style={styles.statTile}><Text style={styles.statLabel}>Ingredientes</Text><Text style={styles.statVal}>{ingredients.length}</Text></View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.colLabel, { flex: 2 }]}>Ingrediente</Text>
          <Text style={[styles.colLabel, styles.colRight]}>%</Text>
          <Text style={[styles.colLabel, styles.colRight]}>Peso</Text>
          <View style={{ width: 44 }} />
        </View>

        {ingredients.map(ing => (
          <TouchableOpacity key={ing.id} style={styles.ingRow} onPress={() => openEdit(ing)}>
            <View style={[styles.dot, { backgroundColor: CAT_COLORS[ing.cat] || '#969696' }]} />
            <Text style={[styles.ingName, { flex: 2 }]} numberOfLines={1}>{ing.name}</Text>
            <Text style={[styles.ingPct, styles.colRight]}>{ing.pct}%</Text>
            <Text style={[styles.ingPeso, styles.colRight]}>{calcPeso(ing.pct)}g</Text>
            <TouchableOpacity style={styles.delBtn} onPress={() => deleteIngredient(ing.id)}>
              <Text style={styles.delBtnText}>✕</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View style={[styles.ingRow, styles.totalRow]}>
          <View style={[styles.dot, { backgroundColor: '#F2B84B' }]} />
          <Text style={[styles.ingName, { flex: 2, color: '#F2B84B', fontWeight: '700' }]}>TOTAL</Text>
          <Text style={[styles.ingPct, styles.colRight, { color: '#F2B84B' }]}>{Math.round(totalPct)}%</Text>
          <Text style={[styles.ingPeso, styles.colRight, { color: '#F2B84B' }]}>{pesoTotal}g</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btnAdd} onPress={openAdd}>
            <Text style={styles.btnAddText}>+ Agregar ingrediente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnReset} onPress={reset}>
            <Text style={styles.btnResetText}>↺</Text>
          </TouchableOpacity>
        </View>

        {showForm && (
          <View style={styles.form}>
            <Text style={styles.formTitle}>{editId ? 'Editar ingrediente' : 'Nuevo ingrediente'}</Text>
            <Text style={styles.fieldLabel}>Nombre</Text>
            <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder="Ej: Harina integral" placeholderTextColor="#8A7F72" />
            <Text style={styles.fieldLabel}>Porcentaje del panadero (%)</Text>
            <TextInput style={styles.input} value={newPct} onChangeText={setNewPct} keyboardType="numeric" placeholder="Ej: 20" placeholderTextColor="#8A7F72" />
            <Text style={styles.fieldLabel}>Categoría</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {CATEGORIAS.map(cat => (
                <TouchableOpacity key={cat} style={[styles.catChip, newCat === cat && { backgroundColor: CAT_COLORS[cat], borderColor: CAT_COLORS[cat] }]} onPress={() => setNewCat(cat)}>
                  <Text style={[styles.catChipText, newCat === cat && { color: '#000', fontWeight: '700' }]}>{CAT_LABELS[cat]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.formBtns}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setShowForm(false)}><Text style={styles.btnCancelText}>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={saveIngredient}><Text style={styles.btnSaveText}>Guardar</Text></TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16 },
  modeRow: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 50, padding: 4, marginBottom: 16 },
  modeBtn: { flex: 1, paddingVertical: 10, borderRadius: 50, alignItems: 'center' },
  modeBtnActive: { backgroundColor: '#F2B84B' },
  modeBtnText: { color: '#8A7F72', fontSize: 13, fontWeight: '600' },
  modeBtnTextActive: { color: '#000' },
  pesoRow: { flexDirection: 'row', marginBottom: 16 },
  fieldLabel: { fontSize: 11, color: '#8A7F72', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  pesoInput: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, color: '#F0EDE8', fontSize: 24, fontWeight: '700', borderWidth: 1, borderColor: '#2E2A25' },
  hidValue: { fontSize: 28, fontWeight: '700', color: '#6EC89A', marginBottom: 6 },
  hidBar: { height: 6, backgroundColor: '#1A1A1A', borderRadius: 3 },
  hidFill: { height: 6, backgroundColor: '#6EC89A', borderRadius: 3 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statTile: { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 12, padding: 12, alignItems: 'center' },
  statLabel: { fontSize: 10, color: '#8A7F72', textTransform: 'uppercase', marginBottom: 4 },
  statVal: { fontSize: 16, fontWeight: '700', color: '#F0EDE8' },
  tableHeader: { flexDirection: 'row', paddingHorizontal: 4, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1E1C18' },
  colLabel: { fontSize: 11, color: '#8A7F72', textTransform: 'uppercase', letterSpacing: 0.5 },
  colRight: { width: 64, textAlign: 'right' },
  ingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#1A1A1A', gap: 8 },
  totalRow: { borderTopWidth: 1, borderTopColor: '#2E2A25', borderBottomWidth: 0, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  ingName: { color: '#F0EDE8', fontSize: 14 },
  ingPct: { color: '#8A7F72', fontSize: 13, width: 64 },
  ingPeso: { color: '#F2B84B', fontSize: 13, fontWeight: '600', width: 64 },
  delBtn: { width: 44, alignItems: 'flex-end' },
  delBtnText: { color: '#8A7F72', fontSize: 16 },
  btnRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  btnAdd: { flex: 1, backgroundColor: '#F2B84B', borderRadius: 50, paddingVertical: 14, alignItems: 'center' },
  btnAddText: { color: '#000', fontWeight: '700', fontSize: 14 },
  btnReset: { backgroundColor: '#1A1A1A', borderRadius: 50, paddingVertical: 14, paddingHorizontal: 20, borderWidth: 1, borderColor: '#2E2A25' },
  btnResetText: { color: '#8A7F72', fontSize: 18 },
  form: { backgroundColor: '#141414', borderRadius: 16, padding: 16, marginTop: 16, borderWidth: 1, borderColor: '#2E2A25' },
  formTitle: { color: '#F2B84B', fontSize: 16, fontWeight: '700', marginBottom: 16 },
  input: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 12, color: '#F0EDE8', fontSize: 16, marginBottom: 14, borderWidth: 1, borderColor: '#2E2A25' },
  catChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: '#2E2A25', marginRight: 8 },
  catChipText: { color: '#8A7F72', fontSize: 13 },
  formBtns: { flexDirection: 'row', gap: 8 },
  btnCancel: { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 50, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#2E2A25' },
  btnCancelText: { color: '#8A7F72', fontWeight: '600' },
  btnSave: { flex: 1, backgroundColor: '#F2B84B', borderRadius: 50, paddingVertical: 12, alignItems: 'center' },
  btnSaveText: { color: '#000', fontWeight: '700' },
});
