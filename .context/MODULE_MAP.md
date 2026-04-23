# Mapa de Módulos (MODULE MAP)

Este documento funciona como una guía de navegación técnica del repositorio **FormulaPanadera**, basada en React Native y Expo Router. Su objetivo es asegurar que cualquier desarrollador (humano o IA) entienda la responsabilidad de cada directorio y sepa exactamente dónde ubicar nuevos archivos y lógicas, manteniendo la separación de responsabilidades y la consistencia arquitectónica.

## Estructura de Carpetas

```text
FormulaPanadera/
├── app/                  # Enrutamiento basado en archivos (Expo Router)
│   ├── (tabs)/           # Pantallas de la navegación por pestañas principal
│   └── ...               # Pantallas modales o vistas completas (login, editar-receta)
├── assets/               # Recursos estáticos (imágenes, fuentes)
│   └── images/
├── components/           # Componentes de UI reutilizables
│   └── ui/               # Componentes base del sistema de diseño
├── config/               # Configuraciones de servicios de terceros y globales
├── constants/            # Valores estáticos, tokens de diseño y datos base
├── hooks/                # Hooks personalizados de React
├── scripts/              # Scripts utilitarios del proyecto
├── store/                # Manejo de estado global de la aplicación
└── raíz del proyecto     # Archivos de configuración (app.json, eas.json, package.json)
```

## Diccionario de Módulos / Carpetas

| Ruta de la Carpeta | Responsabilidad Técnica / de Negocio | Clases/Archivos Típicos |
| :--- | :--- | :--- |
| `/app` | Contiene el sistema de enrutamiento. Aquí viven las "Páginas" o "Pantallas" principales de la aplicación. Se agrupan lógicamente usando la convención de Expo Router. | `login.tsx`, `_layout.tsx`, `nueva-receta.tsx` |
| `/app/(tabs)` | Rutas que pertenecen exclusivamente a la barra de navegación inferior (Tab Bar). Representan las vistas de más alto nivel de las funcionalidades clave. | `index.tsx`, `coccion.tsx`, `calculadora.tsx` |
| `/components` | Elementos de interfaz gráfica reutilizables en múltiples pantallas. **No deben contener estado de negocio global**, sólo lógicas visuales o de interacción local. | `themed-text.tsx`, `receta-card.tsx` |
| `/components/ui` | Componentes atómicos puramente presentacionales (botones, inputs, contenedores). | `external-link.tsx` |
| `/config` | Archivos de configuración y adaptadores para servicios externos (BaaS, integraciones). Aquí se inicializan SDKs. | `firebase.ts` |
| `/constants` | Constantes globales, colores, tipografías, y archivos estáticos de datos que no mutan a lo largo del tiempo de ejecución. | `theme.ts`, `recetas.ts` |
| `/hooks` | Abstracciones de lógicas de React (efectos, manipulación de estado local complejo, escuchas a eventos del sistema) encapsuladas para reutilización. | `use-color-scheme.ts` |
| `/store` | Contiene el estado global de la aplicación y la lógica de negocio subyacente. Manejo centralizado de datos compartidos entre pantallas sin necesidad de usar prop-drilling. | `authStore.ts`, `timerStore.ts` |
| `/assets` | Archivos puramente estáticos que se empaquetan con la aplicación. | Imágenes PNG/JPG, Fuentes TTF |
| `/scripts` | Herramientas de automatización para tareas de desarrollo o limpieza del proyecto. | `reset-project.js` |

## Reglas de Ubicación (Dónde colocar qué)

*   **Si vas a crear una nueva pantalla o vista accesible por navegación:**
    Debe ir en `/app` (o en `/app/(tabs)` si es parte del menú principal).
*   **Si vas a crear un elemento visual (ej. un botón personalizado, una tarjeta de receta):**
    Debe ir en `/components` (o `/components/ui` si es un elemento básico e independiente del contexto de negocio).
*   **Si necesitas conectarte a una API externa, Firebase, Supabase, o similares:**
    La configuración del cliente e inicialización debe ir en `/config`.
*   **Si vas a manejar un estado global que afecta a varias pantallas (ej. datos del usuario, recetas guardadas, temporizadores):**
    Debe ir en `/store` utilizando el patrón de estado implementado en el proyecto.
*   **Si tienes una lógica compleja de React (como detectar dimensiones, suscripciones a eventos) que se repite en varias vistas:**
    Extrae la lógica y colócala en `/hooks`.
*   **Si necesitas definir paletas de colores, strings constantes o datos quemados de prueba:**
    Debe ir en `/constants`.

## Recursos y Configuración (Resources)

A diferencia de Java u otros entornos de servidor, en el ecosistema React Native (Expo) la configuración no vive en carpetas `resources`, sino en la raíz del proyecto y en archivos específicos:

*   **`app.json`**: Funciona como el manifiesto central de Expo. Aquí se define el nombre de la app, iconos, splash screen, y configuraciones nativas para iOS y Android (equivalente a properties del sistema o `AndroidManifest`).
*   **`eas.json`**: Configura los perfiles de compilación para la nube (Expo Application Services).
*   **`package.json`**: Define las dependencias del proyecto y los scripts de ejecución (`npm run...`).
*   **`.env`**: (si existe) Contiene las variables de entorno privadas que no se deben subir al repositorio (ej. claves de APIs).
*   **`google-services.json`** / archivos jks: Archivos de configuración para servicios externos como Firebase y firmas para compilación en Android, ubicados en la raíz.
