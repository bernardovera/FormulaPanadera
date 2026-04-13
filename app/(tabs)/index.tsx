import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORIAS, RECETAS } from '../../constants/recetas';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../config/firebase';

export default function RecetasScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [recetasUsuario, setRecetasUsuario] = useState<any[]>([]);
  const { user, isGuest } = useAuthStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      const cargar = async () => {
        try {
          if (user && !isGuest) {
            const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'recipes'));
            const recetasNube = querySnapshot.docs.map(doc => doc.data());
            setRecetasUsuario(recetasNube);
          } else {
            const data = await AsyncStorage.getItem('recetas_usuario');
            if (data) setRecetasUsuario(JSON.parse(data));
            else setRecetasUsuario([]);
          }
        } catch (error) {
          console.error("Error cargando recetas:", error);
        }
      };
      cargar();
    }, [user, isGuest])
  );

  const todasLasRecetas = [...RECETAS, ...recetasUsuario];
  const categoriasUsuario = recetasUsuario.map(r => r.category);
  const todasLasCategorias = ['Todas', ...Array.from(new Set([...CATEGORIAS.slice(1), ...categoriasUsuario]))];

  const filtered = todasLasRecetas.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'Todas' || r.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar receta..."
          placeholderTextColor="#8A7F72"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {todasLasCategorias.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, activeFilter === item && styles.chipActive]}
              onPress={() => setActiveFilter(item)}>
              <Text style={[styles.chipText, activeFilter === item && styles.chipTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={r => r.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/receta-modal', params: { id: item.id } })}>
            <View style={styles.cardTop}>
              <Text style={styles.cardName}>{item.name}</Text>
              <View style={[styles.badge, !item.preset && styles.badgeUsuario]}>
                <Text style={[styles.badgeText, !item.preset && styles.badgeTextUsuario]}>
                  {item.preset ? 'INTEGRADA' : 'MÍA'}
                </Text>
              </View>
            </View>
            <View style={styles.cardMeta}>
              <Text style={styles.metaText}>📂 {item.category}</Text>
              {item.poston > 0 && <Text style={styles.metaText}>⚖️ {item.poston}g</Text>}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No se encontraron recetas</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A1A1A', borderRadius: 50,
    margin: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: '#2E2A25',
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#F0EDE8', fontSize: 14 },
  clearBtn: { color: '#8A7F72', fontSize: 16, paddingLeft: 8 },
  filterWrapper: { height: 52, marginBottom: 8 },
  filterContent: { paddingHorizontal: 12, paddingVertical: 6, alignItems: 'center' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: '#2E2A25', marginRight: 8 },
  chipActive: { backgroundColor: '#F2B84B', borderColor: '#F2B84B' },
  chipText: { color: '#8A7F72', fontSize: 13, fontWeight: '500' },
  chipTextActive: { color: '#000', fontWeight: '700' },
  list: { paddingHorizontal: 12, paddingBottom: 20 },
  card: { backgroundColor: '#141414', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#1E1C18' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardName: { flex: 1, color: '#F0EDE8', fontSize: 16, fontWeight: '600', marginRight: 8 },
  badge: { backgroundColor: 'rgba(242,184,75,0.15)', borderRadius: 50, paddingHorizontal: 8, paddingVertical: 3 },
  badgeUsuario: { backgroundColor: 'rgba(110,200,154,0.15)' },
  badgeText: { color: '#F2B84B', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  badgeTextUsuario: { color: '#6EC89A' },
  cardMeta: { flexDirection: 'row', gap: 12 },
  metaText: { color: '#8A7F72', fontSize: 12 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: '#8A7F72', fontSize: 14 },
});
