import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F2B84B',
        tabBarInactiveTintColor: '#8A7F72',
        tabBarStyle: {
          backgroundColor: '#0D0D0D',
          borderTopColor: '#1E1E1E',
        },
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#F2B84B',
        headerTitleStyle: { fontWeight: '700' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recetas',
          tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={24} color={color} />,
          headerTitle: '🌾 Fórmula Panadera',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/nueva-receta')}
              style={{ marginRight: 16 }}>
              <Ionicons name="add-circle-outline" size={28} color="#F2B84B" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="calculadora"
        options={{
          title: 'Calculadora',
          tabBarIcon: ({ color }) => <Ionicons name="calculator-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="levado"
        options={{
          title: 'Levado',
          tabBarIcon: ({ color }) => <Ionicons name="timer-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="coccion"
        options={{
          title: 'Cocción',
          tabBarIcon: ({ color }) => <Ionicons name="flame-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}