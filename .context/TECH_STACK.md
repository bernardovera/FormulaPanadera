# Tech Stack (TECH STACK)

Este documento detalla todas las tecnologías, versiones y herramientas detectadas en el repositorio de **FormulaPanadera**. Su propósito es asegurar que el entorno de desarrollo y ejecución sea 100% reproducible y evitar discrepancias entre desarrolladores o inteligencias artificiales en el futuro.

## Lenguaje y Runtime

*   **Lenguaje Base:** TypeScript `~5.9.2` (Configurado estricto según tsconfig).
*   **Runtime JS:** Node.js (requerido para npm/expo cli) y Hermes (motor JS nativo por defecto en las nuevas versiones de Expo/React Native).
*   **Nueva Arquitectura:** Habilitada (`newArchEnabled: true` detectado en `app.json`).

## Frameworks Principales

*   **Core UI:** React `19.1.0` y React Native `0.81.5`.
*   **Framework de Aplicación:** Expo SDK `~54.0.33`.
*   **Enrutamiento y Navegación:** Expo Router `~6.0.23` (Basado en `@react-navigation/native ^7.1.8`).

## Gestión de Dependencias y Build Tools

*   **Gestor de Paquetes:** `npm` (Manejo a través de `package.json` y `package-lock.json`).
*   **Compilador React:** React Compiler Experimental habilitado (`reactCompiler: true` en `app.json`).
*   **CLI de Construcción Local:** Expo CLI (vía comandos como `expo start`, `expo run:android`).

## Dependencias Críticas (Clasificadas)

### Almacenamiento, Persistencia y Datos
*   **Cloud Database / BaaS:** Firebase `^12.12.0` (Específicamente Firestore).
*   **Persistencia Local (Offline):** `@react-native-async-storage/async-storage` `2.2.0` (Usado como caché o fallback para usuarios invitados y para persistencia de la sesión de Firebase Auth).

### Gestión de Estado
*   **State Manager:** Zustand `^5.0.12` (Elegido sobre Redux o Context API para manejar variables globales como el Temporizador y el Usuario autenticado).

### Seguridad y Autenticación
*   **Proveedor de Identidad Principal:** Firebase Auth.
*   **Single Sign-On (SSO):** `@react-native-google-signin/google-signin` `^16.1.2` (Integración nativa con Google Services `google-services.json`).

### UI, Utilidades y Funciones Nativas del Dispositivo
*   **Notificaciones:** `expo-notifications` `~0.32.16` (Para los temporizadores en segundo plano).
*   **Iconografía:** `@expo/vector-icons` `^15.0.3`.
*   **Responsive / Adaptabilidad:** `react-native-safe-area-context` `~5.6.0`.
*   **Feedback Táctil:** `expo-haptics` `~15.0.8`.

## Herramientas de Calidad (Linting & Testing)

*   **Linter:** ESLint `^9.25.0` con la configuración `eslint-config-expo` `~10.0.0`.
*   *(No se han detectado frameworks de testing unitario como Jest o React Native Testing Library en las dependencias actuales del package.json).*

## DevOps e Infraestructura de Compilación

*   **Plataforma de CI/CD Cloud:** EAS (Expo Application Services).
    *   **CLI Requerida:** `eas-cli >= 14.7.0`
    *   **Project ID:** `93d74bd6-5b18-4277-9e3f-f50ab354d436`
*   **Perfiles de Compilación (`eas.json`):**
    *   `development`: Compila un APK interno (`developmentClient: true`) para pruebas con Dev Client.
    *   `preview`: Compila un APK interno (`distribution: internal`) para pruebas pre-producción.
    *   `production`: Compila el `app-bundle` (AAB) nativo preparado para la Google Play Store.
