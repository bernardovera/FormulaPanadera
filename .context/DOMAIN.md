# Dominio de Negocio (DOMAIN MAP)

Este documento actúa como la **Única Fuente de Verdad** sobre la lógica de negocio del proyecto **FormulaPanadera**. Traduce las estructuras de datos, tipos y almacenes de estado de React Native (TypeScript) a conceptos de negocio claros (Domain-Driven Design), definiendo sus reglas, relaciones y lenguaje ubicuo.

## Entidades Principales

A continuación se detallan los objetos de negocio centrales que dictan el comportamiento de la aplicación:

*   **`Receta` (Recipe):** Es la entidad raíz del dominio (Aggregate Root). Representa una fórmula panadera completa.
    *   `id`: Identificador único de la receta.
    *   `name`: Nombre comercial o descriptivo del pan.
    *   `category`: Clasificación (ej. "Pan dulce", "Pan europeo", "Pan plano").
    *   `poston`: Peso en gramos de la masa (total o por unidad) a dividir o procesar.
    *   `preset`: Indica si es una receta pre-cargada por el sistema (`true`) o creada por el usuario (`false`).
    *   `ingredients`: Lista de ingredientes que componen la receta.
    *   `proceso`: Definición de la temperatura objetivo y la técnica de amasado.
    *   `levado`: Lista secuencial de las etapas de fermentación y reposo.
    *   `coccion`: Parámetros finales para el horneado.

*   **`Ingrediente`:** Representa un componente individual dentro de una fórmula panadera.
    *   `name`: Nombre del ingrediente.
    *   `pct`: Porcentaje panadero (baker's percentage).
    *   `cat`: Categoría del ingrediente (harina, líquido, levadura, sal, azúcar, grasa, huevo, relleno, lácteo, otro).

*   **`EtapaLevado`:** Una fase de reposo, prefermento o fermentación.
    *   `nombre`: Nombre de la etapa (ej. "Fermentación inicial", "Forma final").
    *   `horas` y `mins`: Tiempo exacto de duración.
    *   `temp`: Temperatura ambiente o de control objetivo para la etapa.
    *   `tipo`: Clasificación técnica (ej. "Fermentación en bloque", "Poolish", "Biga", "Retardo (nevera)", "Autólisis").

*   **`Coccion`:** Parámetros térmicos de horneado.
    *   `temp`: Temperatura del horno en °C.
    *   `tiempo`: Duración del horneado en minutos.
    *   `tempInterna`: Temperatura corazón (interna) que debe alcanzar el pan para considerarse cocido (usualmente 90-95°C).
    *   `ovenType`: Tipo de horno requerido ("Estático", "Convección").
    *   `vapor`: Booleano que indica si se requiere inyección de vapor en la fase inicial del horneado.
    *   `notas`: Instrucciones adicionales de formado, cortes o acabados post-horneado.

*   **`User` (Usuario):** Entidad de control de acceso e identidad.
    *   `uid`: Identificador único provisto por Firebase Authentication.
    *   `isGuest`: Booleano que indica si el usuario está navegando en modo offline/invitado sin cuenta persistente.

## Glosario de Términos (Lenguaje Ubicuo)

*   **Porcentaje Panadero (pct):** Sistema matemático donde el peso total de la harina representa siempre el 100%. Todos los demás ingredientes se expresan como un porcentaje relativo a ese peso de harina.
*   **Pastón:** Porción de masa ya pesada y lista para darle pre-forma o forma final. En la receta se representa como el peso objetivo a conseguir.
*   **Amasado (Notación string):** Nomenclatura utilizada en el objeto `proceso` (ej. `'0/2-5/4-1/0'`) que representa los ciclos y velocidades de la amasadora (ej. velocidad/tiempo).
*   **Prefermento:** Masas previas (Biga, Poolish, Masa Madre/MMNL, Esponja) preparadas con antelación e incluidas como un paso de "Levado" previo al amasado principal.
*   **Temperatura de Masa (tempMasa):** La temperatura exacta a la que debe salir la masa de la amasadora para garantizar una correcta fermentación posterior (fricción calculada).

## Mapa de Relaciones

*   **1** `Receta` contiene **1..*** `Ingredientes` (Composición).
*   **1** `Receta` contiene **1** `Proceso` (Relación 1 a 1).
*   **1** `Receta` contiene **1..*** `Etapas de Levado` (Secuencia de tiempo).
*   **1** `Receta` contiene **1** `Coccion` (Relación 1 a 1).
*   **1** `User` "posee" **0..*** `Recetas` (Si el `preset` es `false`, la receta pertenece a un usuario en la base de datos).

## Lógica de Estados y Temporizadores

*   **Flujo de Temporizadores (TimerStore):** El sistema mantiene un estado activo para `levadoEtapa` y `coccionData`.
    *   Una etapa de levado o cocción pasa de **INACTIVA** a **ACTIVA** cuando el usuario inicia el temporizador en la aplicación.
    *   Mientras está en estado **ACTIVO**, el sistema puede emitir notificaciones push locales basadas en la cuenta regresiva.
*   **Autenticación (AuthStore):**
    *   `loading`: Estado inicial mientras se verifica la sesión en Firebase.
    *   `isGuest`: Si el usuario salta el login, navega en estado *Guest*, donde no hay persistencia en la nube (Firestore), operando únicamente con almacenamiento local o recetas en memoria (`RECETAS` estáticas).

## Restricciones de Datos e Invariantes

*   **El total de las harinas siempre es 100%:** Para que los cálculos del porcentaje panadero funcionen, la suma de los ingredientes con categoría "harina" (en la masa final, sin contar prefermentos) es la base del 100%.
*   **Inmutabilidad de Recetas Preset:** Las recetas que tienen `preset: true` actúan como datos semilla (Seed Data) y son de solo lectura; los usuarios no deben poder modificarlas en la base de datos central, solo visualizar y calcular sobre ellas.
*   **Tipos de Horno Estrictos:** El `ovenType` está restringido funcionalmente a valores conocidos como "Estático" y "Convección", impactando las instrucciones de temperatura para el usuario.
