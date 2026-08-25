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
    resumen: "DISTINCT, ORDER BY, operadores, LIKE, IN, BETWEEN, LIMIT y funciones de agregación; normalización y estructuras no lineales.",
    objetivos: "Refinar consultas SQL con filtros, patrones y funciones de agregación, como base para normalización y modelado con grafos.",
    embed: "",
    descarga: "presentaciones/semana-02.pdf",
    disponible: true
  },
  {
    n: 3,
    titulo: "Normalización y modelado de grafos",
    resumen: "1FN, 2FN, 3FN y modelado de relaciones, alineado con Habeas Data.",
    objetivos: "Aplicar las tres formas normales y diseñar un esquema seguro y sin redundancia.",
    embed: "",
    descarga: "presentaciones/semana-03.pdf",
    disponible: false
  },
  {
    n: 4,
    titulo: "Persistencia políglota: NoSQL",
    resumen: "MongoDB/Redis y estructuras jerárquicas como árboles y listas enlazadas.",
    objetivos: "Comparar modelos relacionales y NoSQL, e identificar cuándo usar cada uno.",
    embed: "",
    descarga: "presentaciones/semana-04.pdf",
    disponible: false
  },
  {
    n: 5,
    titulo: "Índices, ORMs y migraciones",
    resumen: "B-Trees y B+ Trees para índices, ORMs y migraciones controladas.",
    objetivos: "Optimizar consultas con índices y gestionar la evolución del esquema con migraciones.",
    embed: "",
    descarga: "presentaciones/semana-05.pdf",
    disponible: false
  },
  {
    n: 6,
    titulo: "Bases de datos vectoriales y embeddings",
    resumen: "La estructura detrás de la IA moderna y los sistemas de recomendación.",
    objetivos: "Comprender embeddings y su uso en búsquedas semánticas y RAG.",
    embed: "",
    descarga: "presentaciones/semana-06.pdf",
    disponible: false
  },
  {
    n: 7,
    titulo: "Transacciones ACID, seguridad y despliegue en la nube",
    resumen: "Concurrencia con colas y pilas, prevención de ataques y DBaaS.",
    objetivos: "Garantizar integridad transaccional y desplegar de forma segura en la nube.",
    embed: "",
    descarga: "presentaciones/semana-07.pdf",
    disponible: false
  },
  {
    n: 8,
    titulo: "Proyecto final: consolidación",
    resumen: "Sustentación del sistema integrando estructuras, bases de datos y seguridad.",
    objetivos: "Presentar y defender la arquitectura de datos elegida para el proyecto de aplicación.",
    embed: "",
    descarga: "presentaciones/semana-08.pdf",
    disponible: false
  }
];
