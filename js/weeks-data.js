// Datos de las 8 semanas del núcleo "Estructuras y Bases de Datos"
// Para agregar la presentación de la semana:
// 1) Sube el .pptx/.pdf a la carpeta /presentaciones (ej: semana-01.pdf)
//    y ajusta el campo "descarga" con esa ruta, O
// 2) Publica la presentación en Google Slides / Canva ("Compartir" > "Insertar")
//    y pega el link de embed en el campo "embed".
// El campo "disponible" controla si la semana ya se muestra en el sitio (índice,
// navbar). Cámbialo a true a medida que vayamos llegando a cada semana.
const WEEKS = [
  {
    n: 1,
    titulo: "Repaso de SQL y persistencia básica",
    resumen: "Conectamos las estructuras lineales (arrays/diccionarios) con las tablas relacionales.",
    objetivos: "Repasar sentencias SQL básicas (SELECT, INSERT, UPDATE, DELETE) y su relación con estructuras de datos lineales.",
    embed: "",
    descarga: "presentaciones/semana-01.pdf",
    disponible: true
  },
  {
    n: 2,
    titulo: "Consultas SQL avanzadas y normalización",
    tituloClase1: "Consultas SQL avanzadas y normalización",
    tituloClase2: "Estructuras de datos lineales y no lineales",
    resumen: "DISTINCT, ORDER BY, operadores, LIKE, IN, BETWEEN, LIMIT y funciones de agregación; normalización y estructuras no lineales.",
    objetivos: "Refinar consultas SQL con filtros, patrones y funciones de agregación, como base para normalización y modelado con grafos.",
    embed: "",
    descarga: "presentaciones/semana-02.pdf",
    disponible: true
  },
  {
    n: 3,
    titulo: "Joins, vistas, procedimientos, triggers, transacciones y despliegue",
    tituloClase1: "Joins, UNION, subconsultas, índices, vistas, procedimientos y triggers",
    tituloClase2: "Conexión segura, SQL injection, transacciones y despliegue",
    resumen: "INNER, LEFT, RIGHT, FULL OUTER, CROSS y SELF JOIN, UNION, subconsultas, índices, vistas, procedimientos y triggers; luego conexión desde Python, SQL injection, transacciones, despliegue y diseño de BD.",
    objetivos: "Combinar múltiples tablas con distintos tipos de JOIN y UNION, usar subconsultas e índices, empaquetar lógica con vistas, procedimientos y triggers, y llevar una aplicación a producción de forma segura.",
    embed: "",
    descarga: "presentaciones/semana-03.pdf",
    disponible: true,
    // Bloquea la Clase 2 en el sitio (pestaña oculta) mientras se termina de revisar.
    // Cámbialo a false para volver a ocultarla.
    disponibleClase2: true
  },
  {
    n: 4,
    titulo: "Bases de datos NoSQL: MongoDB y Redis",
    tituloClase1: "Introducción a NoSQL, MongoDB y Compass",
    tituloClase2: "Bases de datos clave-valor con Redis",
    resumen: "Qué son las bases de datos NoSQL y por qué existen, los distintos modelos (documentos, grafos, clave-valor, columnas), MongoDB con Compass, documentos y colecciones, CRUD, agregación e índices; luego el modelo clave-valor con Redis, sus estructuras de datos, CRUD, y casos de uso como rankings y contadores en tiempo real.",
    objetivos: "Entender por qué surgen las bases de datos NoSQL y en qué se diferencian de las relacionales, instalar y conectar MongoDB con Compass y Redis con Docker y RedisInsight, modelar documentos flexibles y estructuras clave-valor, y aplicar CRUD en ambos motores para casos reales de SoundFlow.",
    embed: "",
    descarga: "presentaciones/semana-04.pdf",
    disponible: true,
    disponibleClase2: true
  },
  {
    n: 5,
    titulo: "Índices B-Tree/B+Tree y uso de ORMs",
    tituloClase1: "Índices B-Tree vs. B+Tree",
    tituloClase2: "Uso de ORMs y prevención del problema N+1",
    resumen: "Desde cero: qué es un árbol (raíz, padre, hijo, hoja, grado, altura) y cómo se recorre; luego el árbol binario y sus recorridos (preorden, inorden, postorden) con inserción y eliminación; y de ahí a los árboles que realmente usan las bases de datos, B-Tree y B+Tree, con inserción por división, eliminación por fusión, el rol de las hojas encadenadas en consultas de rango, y cómo MySQL (InnoDB) y MongoDB (WiredTiger) usan variantes de B+Tree por debajo de sus índices. Luego, qué es un ORM (SQLAlchemy) y el problema N+1: por qué es un \"asesino silencioso\" del rendimiento, cómo se ve en los logs, y cómo evitarlo con joinedload/selectinload, aplicado a una playlist de SoundFlow y al perfil de artistas similares.",
    objetivos: "Manejar con dominio el vocabulario de árboles (grado, altura, padre, hijo, hoja) y sus recorridos, distinguir un árbol binario de un B-Tree y de un B+Tree según dónde viven los datos y cuántos hijos permite cada nodo, explicar cómo inserción/eliminación mantienen el árbol balanceado (división y fusión), y reconocer estas estructuras en los motores ya usados en el curso (MySQL, MongoDB). Además, entender qué resuelve un ORM, identificar el problema N+1 (incluyendo su forma anidada N×M+1) en escenarios reales de SoundFlow, y aplicar estrategias de carga (joinedload, selectinload) para prevenirlo.",
    embed: "",
    descarga: "presentaciones/semana-05.pdf",
    disponible: true,
    disponibleClase2: true
  },
  {
    n: 6,
    titulo: "Bases de datos vectoriales: Supabase y Embeddings",
    tituloClase1: "SoundFlow-AI: Buscando por significado y no por palabras",
    tituloClase2: "El laboratorio de sensibilidad IA: calibrando SoundFlow-Pro",
    resumen: "Construcción paso a paso de SoundFlow-AI: configurar un proyecto en Supabase y un entorno virtual de Python, conectar ambos con database.py, crear una tabla con una columna VECTOR usando la extensión pgvector, generar embeddings de las descripciones de canciones con sentence-transformers, y construir una función de búsqueda semántica en SQL (similitud de coseno con el operador <=>) invocada desde Python con RPC (Remote Procedure Call), para encontrar canciones por significado y no solo por palabras clave. Luego, calibración del buscador: pruebas de sensibilidad con consultas literales, con sinónimos y abstractas, ajuste del match_threshold para encontrar el punto de equilibrio, y optimización de descripciones con score bajo.",
    objetivos: "Configurar un proyecto real en Supabase con entorno virtual y variables de entorno, entender qué es un embedding y generarlo con un modelo de sentence-transformers, crear y usar una columna vectorial con pgvector, construir una función SQL que mida similitud de coseno entre vectores, conectar todo desde Python para implementar una búsqueda semántica funcional en SoundFlow, y calibrar esa búsqueda evaluando su sensibilidad a distintos tipos de consulta y ajustando el umbral de similitud.",
    embed: "",
    descarga: "presentaciones/semana-06.pdf",
    disponible: true,
    disponibleClase2: true
  },
  {
    n: 7,
    titulo: "Transacciones ACID, DBaaS (Cloud) y prevención de SQL Injection",
    tituloClase1: "SoundFlow-AI a prueba de fallos: Transacciones ACID, RLS y SQL Injection",
    resumen: "Cómo llevar SoundFlow-AI a un estándar de grado industrial: qué es una transacción y las cuatro propiedades ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad), construidas con una función SQL en Supabase que usa BEGIN...EXCEPTION para hacer ROLLBACK automático si un pago falla a mitad de camino. Luego, blindaje de seguridad: cómo prevenir SQL Injection con consultas parametrizadas en vez de f-strings, y cómo activar Row-Level Security (RLS) para que un usuario nunca pueda ver ni modificar los datos de otro. Cierra con gestión de infraestructura en la nube (DBaaS): usar los API Logs y el Health Check de Supabase para detectar y confirmar un intento de acceso bloqueado.",
    objetivos: "Entender qué es una transacción y explicar las cuatro propiedades ACID con ejemplos reales, construir una función SQL en Supabase que garantice atomicidad entre dos tablas relacionadas (perfiles e historial_pagos) usando BEGIN/EXCEPTION/ROLLBACK, identificar y corregir código vulnerable a SQL Injection reemplazando concatenación de strings por consultas parametrizadas, activar y configurar políticas de Row-Level Security tipo Owner Only, y usar el Dashboard de Supabase (API Logs, Health Check) para verificar que un intento de acceso no autorizado fue detectado y bloqueado.",
    embed: "",
    descarga: "presentaciones/semana-07.pdf",
    disponible: true,
    disponibleClase2: false
  },
  {
    n: 8,
    titulo: "Estación del Éxito: sustentación final",
    tituloClase1: "The SoundFlow Chaos Challenge",
    resumen: "Sustentación final grupal, con demo en vivo sobre la propia base de datos y código de cada equipo, sometida a fallos controlados en 4 Cámaras de Prueba: Vacío Atómico (ROLLBACK con ACID), Intento de Infiltración (RLS y SQL Injection), Oráculo Semántico (búsqueda por embeddings) y Prueba de Fuego de Conocimiento (preguntas que conectan varias semanas). Incluye el horario de sustentaciones (martes, 6:15 p.m. a 9:40 p.m., con margen de 5 min por equipo) y una ruleta interactiva para sortear el orden de cada equipo.",
    objetivos: "Demostrar en vivo, sobre la aplicación real de cada equipo, que las transacciones ACID revierten un fallo a mitad de camino, que RLS y las consultas parametrizadas bloquean intentos de acceso no autorizado o de SQL Injection, y que la búsqueda semántica con embeddings encuentra resultados por significado; además, argumentar con rigor técnico el flujo completo de la aplicación conectando al menos tres semanas del curso, como conclusión del Journey Map del núcleo.",
    embed: "",
    descarga: "presentaciones/semana-08.pdf",
    disponible: true
  }
];
