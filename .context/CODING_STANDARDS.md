# Estándares de Codificación (CODING STANDARDS)

Este documento establece las convenciones explícitas e implícitas extraídas de la base de código actual de **FormulaPanadera**. Todo código generado en el futuro (por humanos o IAs) debe adherirse a estas reglas para mantener la coherencia estilística, arquitectónica y de calidad, indistinguible del código original.

## 1. Principios Generales

*   **Tipado Estricto (TypeScript):** Se prioriza el uso de TypeScript sobre JavaScript puro. Todo estado global y constante de dominio debe estar fuertemente tipado.
*   **Componentes Funcionales:** Solo se utilizan Componentes Funcionales de React (Functional Components) junto con Hooks. No se usan Clases de React.
*   **UX/UI Defensiva:** Antes de ejecutar llamadas asíncronas, se bloquea la UI (mediante estados `loading`) y se validan las entradas localmente para evitar peticiones inútiles a Firebase.
*   **Manejo de Errores Amigable:** Los errores técnicos (ej. códigos de Firebase como `auth/user-not-found`) nunca se muestran crudos al usuario; se mapean a mensajes amigables en español.

## 2. Convenciones de Nomenclatura (Naming)

*   **Archivos de Pantallas/Rutas (Expo Router):** Utilizan `kebab-case`. Ejemplos: `nueva-receta.tsx`, `editar-receta.tsx`.
*   **Componentes React:** Utilizan `PascalCase`. El nombre de la función exportada por defecto suele llevar el sufijo `Screen` si es una página completa. Ejemplo: `export default function PerfilScreen()`.
*   **Funciones y Variables Locales:** Utilizan `camelCase`. 
    *   Los manejadores de eventos (handlers) deben comenzar con el prefijo `handle`. Ejemplo: `handleUpdateName`, `handleEmailAuth`.
*   **Tipos e Interfaces (Dominio):** Utilizan `PascalCase` sin prefijos arcaicos (No usar `IRecipe`, usar `Receta`).
*   **Constantes Globales:** Utilizan `UPPER_SNAKE_CASE`. Ejemplo: `RECETAS`, `CATEGORIAS`.
*   **Hooks Personalizados / Stores:** Deben comenzar con el prefijo `use`. Ejemplo: `useAuthStore`, `useTimerStore`.

## 3. Patrones de Implementación

### Gestión de Estado e "Inyección de Dependencias"
En lugar de inyección por constructores (como en Java/Spring), en este proyecto las "dependencias" de estado global se inyectan a través de Hooks de Zustand:
```typescript
// ✅ CORRECTO: Desestructuración del store
const { user, isGuest, setUser } = useAuthStore();
```

### Validación de Datos
La validación se realiza de forma imperativa manual antes de la ejecución de la lógica asíncrona, utilizando `Alert.alert` para el feedback al usuario en caso de error. No se usan librerías pesadas de validación de esquemas (como Zod/Yup) para formularios simples.
```typescript
// ✅ CORRECTO: Validación manual estilo "Early Return"
if (!nombre.trim()) {
  Alert.alert('Error', 'El nombre no puede estar vacío');
  return;
}
```

### Manejo de Errores Asíncronos
Toda llamada a una API externa (Firebase, AsyncStorage) debe estar envuelta en un bloque `try/catch`. En el catch, se deben proveer diccionarios u opciones condicionales para traducir los errores.
```typescript
// ✅ CORRECTO: Mapeo de errores conocidos
try {
  await signInWithEmailAndPassword(auth, email, password);
} catch (error: any) {
  if (error.code === 'auth/wrong-password') {
    Alert.alert('Error', 'Contraseña incorrecta');
  } else {
    Alert.alert('Error', 'Ocurrió un error inesperado');
  }
}
```

### Uso de JavaScript / TypeScript Moderno
Se exige el uso activo de características modernas de ES6+:
*   **Optional Chaining y Nullish Coalescing:** `user?.displayName || ''`
*   **Non-null assertion operator:** `user!` (solo cuando el contexto previo garantiza su existencia, como después de `if(!auth.currentUser) return;`).
*   **Desestructuración:** Ampliamente utilizada en props, estados y arrays.

## 4. Estilo de Interfaz y UI

*   **Estilos Locales:** No se usa Tailwind CSS ni Styled Components. Todos los estilos se definen al final del archivo mediante `StyleSheet.create`.
*   **Paleta de Colores (Dark Theme):** El sistema utiliza "Hardcoded tokens" en formato Hexadecimal integrados en los StyleSheet. 
    *   Fondos primarios: `#000000`, `#141414`, `#1A1A1A`.
    *   Acentos/Textos: `#F2B84B` (Amarillo Fórmulas), `#8A7F72` (Textos secundarios).
*   **SafeAreaView:** Se utiliza el hook `useSafeAreaInsets()` de `react-native-safe-area-context` para inyectar dinámicamente el `paddingTop` o `paddingBottom` en lugar de usar componentes wrapper `<SafeAreaView>`, permitiendo fondos que lleguen al borde de la pantalla (Edge-to-Edge).

## 5. Boilerplate y Optimización

*   No hay dependencias de utilidades tipo Lodash de manera generalizada; se prefieren las funciones nativas de Array de JS (`.map`, `.filter`, `.reduce`).
*   **Evitar Re-renders innecesarios:** Si un objeto de Zustand no se utiliza para renderizar (por ejemplo, funciones set), es aceptable traerlo sin selectores finos debido a que la app es pequeña, pero se prioriza la desestructuración clara.
