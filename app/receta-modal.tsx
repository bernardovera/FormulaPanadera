import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECETAS } from '../constants/recetas';
import { useTimerStore } from '../store/timerStore';

const CAT_COLORS: Record<string, string> = {
  harina: '#F2B84B', liquido: '#6EC89A', sal: '#B0A898',
  levadura: '#E0889A', grasa: '#D4A35A', azucar: '#FFD578',
  huevo: '#E07840', lacteo: '#C8D2F0', relleno: '#A082DC', otro: '#969696',
};

const LEV_ICONS: Record<string, string> = {
  'Fermentación en bloque': '🫙', 'Pre-forma': '🤲', 'Forma final': '🥖',
  'Retardo (nevera)': '❄️', 'Autólisis': '⏳', 'Poolish': '🧫',
  'Biga': '🧫', 'Pie francés': '🥐',
};

export default function RecetaModal() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setLevadoEtapa, setCoccionData } = useTimerStore();

  const [recetaUsuario, setRecetaUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [mode, setMode] = useState<'harina' | 'total'>('harina');
  const [pesoRef, setPesoRef] = useState('1000');

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await AsyncStorage.getItem('recetas_usuario');
        if (data) {
          const lista = JSON.parse(data);
          const encontrada = lista.find((r: any) => r.id === id);
          if (encontrada) setRecetaUsuario(encontrada);
        }
      } catch {}
      setCargando(false);
    };
    cargar();
  }, [id]);

  const receta = RECETAS.find(r => r.id === id) || recetaUsuario;

  useEffect(() => {
    if (receta?.poston > 0) setPesoRef(receta.poston.toString());
  }, [receta]);

  if (cargando) return <View style={styles.container}><Text style={styles.errorText}>Cargando...</Text></View>;
  if (!receta) return <View style={styles.container}><Text style={styles.errorText}>Receta no encontrada</Text></View>;

  const totalPct = receta.ingredients.reduce((s: number, i: any) => s + i.pct, 0);
  const harinaPct = receta.ingredients.filter((i: any) => i.cat === 'harina').reduce((s: number, i: any) => s + i.pct, 0);
  const aguaPct = receta.ingredients.filter((i: any) => i.cat === 'liquido').reduce((s: number, i: any) => s + i.pct, 0);
  const hidratacion = harinaPct > 0 ? Math.round((aguaPct / harinaPct) * 100) : 0;
  const pesoRefNum = parseFloat(pesoRef) || 0;

  const calcPeso = (pct: number) => {
    if (pesoRefNum === 0) return '—';
    if (mode === 'harina') return `${Math.round((pct / 100) * pesoRefNum * 10) / 10}g`;
    return `${Math.round(pct * (pesoRefNum / totalPct) * 10) / 10}g`;
  };

  const pesoTotal = mode === 'harina'
    ? Math.round((totalPct / 100) * pesoRefNum * 10) / 10
    : pesoRefNum;

  const handleCargarLevado = (etapa: any) => {
    setLevadoEtapa(etapa);
    router.push('/(tabs)/levado');
  };

  const handleCargarCoccion = () => {
    setCoccionData({ ...receta.coccion, nombre: receta.name });
    router.push('/(tabs)/coccion');
  };

  const handleEliminar = () => {
    Alert.alert('Eliminar receta', `¿Eliminar "${receta.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive', onPress: async () => {
          try {
            const data = await AsyncStorage.getItem('recetas_usuario');
            if (data) {
              const lista = JSON.parse(data);
              const nueva = lista.filter((r: any) => r.id !== receta.id);
              await AsyncStorage.setItem('recetas_usuario', JSON.stringify(nueva));
            }
            router.back();
          } catch {}
        }
      },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{receta.name}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => { router.push('/editar-receta?id=' + receta.id as any); }}>
            <Text style={styles.actionBtnText}>✎</Text>
          </TouchableOpacity>
          {!receta.preset && (
            <TouchableOpacity style={styles.actionBtnDel} onPress={handleEliminar}>
              <Text style={styles.actionBtnDelText}>🗑</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoGrid}>
          <View style={styles.infoTile}>
            <Text style={styles.tileLabel}>Amasado</Text>
            <Text style={styles.tileVal}>{receta.proceso.amasado}</Text>
          </View>
          <View style={styles.infoTile}>
            <Text style={styles.tileLabel}>Temp. masa</Text>
            <Text style={styles.tileVal}>{receta.proceso.tempMasa}°C</Text>
          </View>
          <View style={styles.infoTile}>
            <Text style={styles.tileLabel}>Pastón</Text>
            <Text style={styles.tileVal}>{receta.poston > 0 ? `${receta.poston}g` : '—'}</Text>
          </View>
          <View style={styles.infoTile}>
            <Text style={styles.tileLabel}>Hidratación</Text>
            <Text style={styles.tileVal}>{hidratacion}%</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Calculadora</Text>
        <View style={styles.calcBox}>
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
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
              <Text style={styles.fieldLabel}>Hidratación</Text>
              <Text style={styles.hidValue}>{hidratacion}%</Text>
              <View style={styles.hidBar}>
                <View style={[styles.hidFill, { width: `${Math.min(hidratacion, 100)}%` }]} />
              </View>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.colLabel, { flex: 2 }]}>Ingrediente</Text>
            <Text style={[styles.colLabel, styles.colRight]}>%</Text>
            <Text style={[styles.colLabel, styles.colRight]}>Peso</Text>
          </View>

          {receta.ingredients.map((ing: any, i: number) => (
            <View key={i} style={[styles.ingRow, i > 0 && styles.ingRowBorder]}>
              <View style={[styles.dot, { backgroundColor: CAT_COLORS[ing.cat] || '#969696' }]} />
              <Text style={[styles.ingName, { flex: 2 }]} numberOfLines={1}>{ing.name}</Text>
              <Text style={[styles.ingPct, styles.colRight]}>{ing.pct}%</Text>
              <Text style={[styles.ingPeso, styles.colRight]}>{calcPeso(ing.pct)}</Text>
            </View>
          ))}

          <View style={[styles.ingRow, styles.totalRow]}>
            <View style={[styles.dot, { backgroundColor: '#F2B84B' }]} />
            <Text style={[styles.ingName, { flex: 2, color: '#F2B84B', fontWeight: '700' }]}>TOTAL</Text>
            <Text style={[styles.ingPct, styles.colRight, { color: '#F2B84B' }]}>{Math.round(totalPct)}%</Text>
            <Text style={[styles.ingPeso, styles.colRight, { color: '#F2B84B' }]}>{pesoTotal}g</Text>
          </View>
        </View>

        {receta.levado && receta.levado.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Tiempos de levado</Text>
            {receta.levado.map((s: any, i: number) => (
              <View key={i} style={styles.levadoRow}>
                <View style={styles.levadoLine}>
                  <View style={styles.levadoDot} />
                  {i < receta.levado.length - 1 && <View style={styles.levadoConnector} />}
                </View>
                <View style={styles.levadoCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.levadoName}>{LEV_ICONS[s.tipo] || '⏱'} {s.nombre}</Text>
                    <Text style={styles.levadoSub}>{s.tipo} · {s.temp}°C</Text>
                    <Text style={styles.levadoTime}>
                      {s.horas > 0 ? `${s.horas}h ` : ''}{s.mins > 0 ? `${s.mins}m` : s.horas === 0 ? '—' : ''}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.loadBtn} onPress={() => handleCargarLevado(s)}>
                    <Text style={styles.loadBtnText}>▶ Timer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {receta.coccion && (
          <>
            <Text style={styles.sectionLabel}>Cocción</Text>
            <View style={styles.cocBox}>
              <View style={styles.cocGrid}>
                <View style={styles.cocTile}>
                  <Text style={styles.cocIcon}>🌡️</Text>
                  <Text style={styles.cocVal}>{receta.coccion.temp}°C</Text>
                  <Text style={styles.cocLabel}>Horno</Text>
                </View>
                <View style={styles.cocTile}>
                  <Text style={styles.cocIcon}>⏱</Text>
                  <Text style={styles.cocVal}>{receta.coccion.tiempo} min</Text>
                  <Text style={styles.cocLabel}>Tiempo</Text>
                </View>
                <View style={styles.cocTile}>
                  <Text style={styles.cocIcon}>🥖</Text>
                  <Text style={styles.cocVal}>{receta.coccion.tempInterna}°C</Text>
                  <Text style={styles.cocLabel}>T° interna</Text>
                </View>
                <View style={styles.cocTile}>
                  <Text style={styles.cocIcon}>💧</Text>
                  <Text style={styles.cocVal}>{receta.coccion.vapor ? 'Sí' : 'No'}</Text>
                  <Text style={styles.cocLabel}>Vapor</Text>
                </View>
              </View>
              <View style={styles.cocTileWide}>
                <Text style={styles.cocIcon}>🔥</Text>
                <Text style={styles.cocVal}>{receta.coccion.ovenType}</Text>
                <Text style={styles.cocLabel}>Tipo de horno</Text>
              </View>
              {receta.coccion.notas ? (
                <View style={styles.notasBox}>
                  <Text style={styles.notasText}>{receta.coccion.notas}</Text>
                </View>
              ) : null}
              <TouchableOpacity style={styles.loadBtnFull} onPress={handleCargarCoccion}>
                <Text style={styles.loadBtnFullText}>🔥 Cargar en Cocción + Timer</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  errorText: { color: '#8A7F72', textAlign: 'center', marginTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1E1C18', gap: 10 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: '#F2B84B', fontSize: 18 },
  headerTitle: { flex: 1, color: '#F0EDE8', fontSize: 17, fontWeight: '700' },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  actionBtnText: { color: '#F2B84B', fontSize: 16 },
  actionBtnDel: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  actionBtnDelText: { fontSize: 16 },
  content: { padding: 16 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  infoTile: { flex: 1, minWidth: '45%', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 12 },
  tileLabel: { fontSize: 10, color: '#8A7F72', textTransform: 'uppercase', letterSpacing: 0.5 },
  tileVal: { fontSize: 16, fontWeight: '700', color: '#F0EDE8', marginTop: 4 },
  sectionLabel: { fontSize: 11, fontWeight: '600', color: '#8A7F72', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10, marginTop: 4 },
  calcBox: { backgroundColor: '#141414', borderRadius: 16, borderWidth: 1, borderColor: '#1E1C18', padding: 12, marginBottom: 20 },
  modeRow: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 50, padding: 3, marginBottom: 12 },
  modeBtn: { flex: 1, paddingVertical: 8, borderRadius: 50, alignItems: 'center' },
  modeBtnActive: { backgroundColor: '#F2B84B' },
  modeBtnText: { color: '#8A7F72', fontSize: 12, fontWeight: '600' },
  modeBtnTextActive: { color: '#000' },
  pesoRow: { flexDirection: 'row', marginBottom: 12 },
  fieldLabel: { fontSize: 10, color: '#8A7F72', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  pesoInput: { backgroundColor: '#1A1A1A', borderRadius: 10, padding: 10, color: '#F0EDE8', fontSize: 22, fontWeight: '700', borderWidth: 1, borderColor: '#2E2A25' },
  hidValue: { fontSize: 24, fontWeight: '700', color: '#6EC89A', marginBottom: 4 },
  hidBar: { height: 5, backgroundColor: '#1A1A1A', borderRadius: 3 },
  hidFill: { height: 5, backgroundColor: '#6EC89A', borderRadius: 3 },
  tableHeader: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#2E2A25' },
  colLabel: { fontSize: 10, color: '#8A7F72', textTransform: 'uppercase', letterSpacing: 0.5 },
  colRight: { width: 60, textAlign: 'right' },
  ingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 8 },
  ingRowBorder: { borderTopWidth: 1, borderTopColor: '#1E1C18' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#2E2A25', marginTop: 4 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  ingName: { color: '#F0EDE8', fontSize: 13 },
  ingPct: { color: '#8A7F72', fontSize: 12, width: 60 },
  ingPeso: { color: '#F2B84B', fontSize: 12, fontWeight: '600', width: 60 },
  levadoRow: { flexDirection: 'row', marginBottom: 0 },
  levadoLine: { width: 20, alignItems: 'center' },
  levadoDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#F2B84B', marginTop: 14 },
  levadoConnector: { width: 2, flex: 1, backgroundColor: '#1E1C18', marginVertical: 2 },
  levadoCard: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 12, marginLeft: 8, marginBottom: 8 },
  levadoName: { color: '#F0EDE8', fontSize: 13, fontWeight: '600' },
  levadoSub: { color: '#8A7F72', fontSize: 11, marginTop: 2 },
  levadoTime: { color: '#F2B84B', fontSize: 16, fontWeight: '700', marginTop: 4 },
  loadBtn: { backgroundColor: 'rgba(242,184,75,0.15)', borderRadius: 50, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(242,184,75,0.3)' },
  loadBtnText: { color: '#F2B84B', fontSize: 12, fontWeight: '600' },
  cocBox: { backgroundColor: '#141414', borderRadius: 16, borderWidth: 1, borderColor: '#1E1C18', padding: 12, marginBottom: 20 },
  cocGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  cocTile: { flex: 1, minWidth: '45%', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, alignItems: 'center' },
  cocTileWide: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 12 },
  cocIcon: { fontSize: 20, marginBottom: 4 },
  cocVal: { color: '#F2B84B', fontSize: 18, fontWeight: '700' },
  cocLabel: { color: '#8A7F72', fontSize: 10, textTransform: 'uppercase', marginTop: 2 },
  notasBox: { borderLeftWidth: 3, borderLeftColor: '#F2B84B', paddingLeft: 12, paddingVertical: 8, backgroundColor: 'rgba(242,184,75,0.05)', borderRadius: 4, marginBottom: 12 },
  notasText: { color: '#8A7F72', fontSize: 12, lineHeight: 18 },
  loadBtnFull: { backgroundColor: '#F2B84B', borderRadius: 50, paddingVertical: 12, alignItems: 'center' },
  loadBtnFullText: { color: '#000', fontWeight: '700', fontSize: 14 },
});
