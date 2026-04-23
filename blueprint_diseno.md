# Blueprint de Diseño y Arquitectura (Fórmula Panadera ➡️ App de Helados)

Este documento es una plantilla de la arquitectura corporativa, diseño y tecnologías empleadas en la aplicación original ("Fórmula Panadera"). Ha sido extraído para que la IA (Gemini/Antigravity) pueda replicar con un 100% de exactitud el "Look & Feel" y la escalabilidad técnica estructurada en futuros proyectos.

> [!TIP]
> **Instrucciones para la IA en el nuevo proyecto:**  
> Cuando se inicie el nuevo entorno de trabajo con la app, el usuario referenciará este archivo. Debes aplicar inmediatamente esta paleta de colores, la misma estructura de carpetas de Expo Router y replicar los flujos de "estado global" usando Zustand y Firebase.

---

## 🏗️ 1. Stack Tecnológico Base

*   **Framework:** React Native + Expo (SDK 54+, React 19)
*   **Enrutamiento:** Expo Router v6 (Manejo de rutas basadas en archivos con sistema de `(tabs)`).
*   **Gestión del Estado Global:** `zustand` (Fácil, ligero, ideal para persistir el usuario en la sesión actual).
*   **Backend y Autenticación:** Firebase v12 (Auth, Firestore). `@react-native-google-signin/google-signin` integrado de forma nativa.
*   **Almacenamiento Local (Guest):** `@react-native-async-storage/async-storage`
*   **Íconos:** `@expo/vector-icons/Ionicons`
*   **Notificaciones Locales (Timers):** `expo-notifications` para los temporizadores en segundo plano.

---

## 🎨 2. Sistema de Diseño (Design System)

La aplicación utiliza un esquema **"Deep Dark"** que evoca sensación premium e interfaz que no lastima los ojos en la cocina:

### Paleta de Colores
*   **Fondos principales:** `#000000` (Fondo general de contenedores)
*   **Fondo secundario / TabBar / Headers:** `#0D0D0D`
*   **Fondo de Tarjetas (Cards) / Inputs:** `#141414` a `#1A1A1A`
*   **Bordes / Líneas divisorias:** `#1E1E1E` y `#1E1C18`
*   **Acento Principal (Dorado/Pan/Vainilla):** `#F2B84B` (Botones de acción, íconos activos en TabBar, textos de estado primario).
*   **Acento Secundario (Mentol/Frutal):** `#6EC89A` (Utilizado para diferenciar entidades "Del Usuario" vs "Por defecto").
*   **Texto Principal:** `#F0EDE8` (Casi blanco, excelente contraste sobre oscuros).
*   **Texto Secundario / Placeholders / Íconos Inactivos:** `#8A7F72`

### Tipografía y Espaciado
*   **Fuentes:** Uso de las fuentes por defecto del sistema móvil nativo (`fontWeight: '700'` para títulos, `'600'` en tarjetas, y `'500'` en chips/botones).
*   **Radios de borde (Border Radius):**
    *   Botones circulares, chips de filtros y barras de búsqueda: `borderRadius: 50` (Formato 'Pill').
    *   Tarjetas (Cards) y Modales: `borderRadius: 16`.
*   **Layout base:** Uso extensivo del sistema Flexbox (`gap: 12`, `flexDirection: 'row'`, `justifyContent: 'space-between'`).

---

## 📁 3. Estructura de Directorios (Expo Router)

```tree
📦 App
 ┣ 📂 app
 ┃ ┣ 📂 (tabs)               <-- Navegación principal persistente
 ┃ ┃ ┣ 📜 _layout.tsx        <-- Configuraciones estéticas del TabBar y colores del header
 ┃ ┃ ┣ 📜 index.tsx          <-- Listado de recetas / Fórmulas (Feed principal con chips de filtrado)
 ┃ ┃ ┣ 📜 calculadora.tsx    <-- Lógica matemática (Panadero / Porcentaje Heladero)
 ┃ ┃ ┣ 📜 temporizadores.tsx <-- Reemplazo de Levado/Cocción (Gestión del tiempo en frío / pasteurización)
 ┃ ┃ ┗ 📜 perfil.tsx         <-- Settings, Log out y estado de cuenta
 ┃ ┣ 📜 _layout.tsx          <-- Configuración Root: DarkTheme Provider, StatusBar oscuro, Listener Auth.
 ┃ ┣ 📜 login.tsx            <-- Pantalla de autenticación (Google / Invitado)
 ┃ ┣ 📜 nueva-receta.tsx     <-- Modal en pantalla completa para ingesta de datos
 ┃ ┗ 📜 receta-modal.tsx     <-- Modal "Presentation" para vista detallada de la receta calculada
 ┣ 📂 config
 ┃ ┗ 📜 firebase.ts          <-- Inicialización del SDK web de Firebase (getAuth, getFirestore)
 ┣ 📂 constants
 ┃ ┗ 📜 data.ts              <-- Datos "semilla" (Recetas/Fórmulas preintegradas y categorías)
 ┣ 📂 store
 ┃ ┣ 📜 authStore.ts         <-- Zustand (maneja { user, loading, isGuest })
 ┃ ┣ 📜 formulaStore.ts      <-- Zustand (Manejo de la canasta de compras / receta en curso)
 ┃ ┗ 📜 timerStore.ts        <-- Zustand (Manejo global de temporizadores en segundo plano)
```

---

## 💡 4. Patrones de Lógica Clave a Replicar en "Helados"

1.  **Doble Flujo de Usuario:**
    El sistema soporta usuarios Invitados (`isGuest`) que guardan sus fórmulas en local con `AsyncStorage`, y usuarios Autenticados que sincornizan con Firestore (`collection(db, 'users', uid, 'recipes')`).

2.  **Sistema de Chips Filtrantes (ScrollHorizontal):**
    Ambas apps deben tener un buscador (`searchBar`) estilizado tipo "píldora" con input negro, acompañado de un `ScrollView horizontal` lleno de "Chips" (Todas, Lacteado, Frutal, Agua, etc).

3.  **Matemática de Porcentajes Relativos:**
    *   *En Panadería:* Todo se calcula relativo a la "Harina Total" (100%).
    *   *En Heladería:* Todo se calcula respecto al "Mix Total de Sólidos y Líquidos", pero puede configurarse para tener una base maestra (Ej. 100% Leche), y el PAC (Poder Anticongelante) y POD (Poder Endulzante) se deducen dinámicamente de cada ingrediente.

4.  **Seguridad y Despliegue en la Nube (EAS):**
    *   Toda clave sensible (Firebase keys, etc.) debe abstraerse en un archivo `.env` usando variables `EXPO_PUBLIC_...` e ignorarse en `.gitignore`.
    *   Para compilar con Expo Application Services (EAS Build), siempre debe emplearse un `.easignore` que actúe igual que el `.gitignore` pero **permita** la lectura del `.env` y el `google-services.json` por los servidores de Expo en la compilación.

---
*Este documento fue auto-generado por el asistente en base al análisis del proyecto actual. Cópialo al nuevo directorio.*
