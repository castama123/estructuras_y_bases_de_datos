// Datos de las 8 semanas del núcleo "Estructuras y Bases de Datos"
// Para agregar la presentación de la semana:
// 1) Sube el .pptx/.pdf a la carpeta /presentaciones (ej: semana-01.pdf)
//    y ajusta el campo "descarga" con esa ruta, O
// 2) Publica la presentación en Google Slides / Canva ("Compartir" > "Insertar")
//    y pega el link de embed en el campo "embed".
const WEEKS = [
  {
    n: 1,
    titulo: "Repaso de SQL y persistencia básica",
    resumen: "Conectamos las estructuras lineales (arrays/diccionarios) con las tablas relacionales.",
    objetivos: "Repasar sentencias SQL básicas (SELECT, INSERT, UPDATE, DELETE) y su relación con estructuras de datos lineales.",
    embed: "",
    descarga: "presentaciones/semana-01.pdf"
  },
  {
    n: 2,
    titulo: "Consultas complejas y algoritmos de búsqueda",
    resumen: "Consultas SQL avanzadas y cómo la búsqueda binaria/lineal afecta el rendimiento.",
    objetivos: "Construir consultas complejas (JOINs, subconsultas) y analizar su relación con algoritmos de búsqueda.",
    embed: "",
    descarga: "presentaciones/semana-02.pdf"
  },
  {
    n: 3,
    titulo: "Normalización y modelado de grafos",
    resumen: "1FN, 2FN, 3FN y modelado de relaciones, alineado con Habeas Data.",
    objetivos: "Aplicar las tres formas normales y diseñar un esquema seguro y sin redundancia.",
    embed: "",
    descarga: "presentaciones/semana-03.pdf"
  },
  {
    n: 4,
    titulo: "Persistencia políglota: NoSQL",
    resumen: "MongoDB/Redis y estructuras jerárquicas como árboles y listas enlazadas.",
    objetivos: "Comparar modelos relacionales y NoSQL, e identificar cuándo usar cada uno.",
    embed: "",
    descarga: "presentaciones/semana-04.pdf"
  },
  {
    n: 5,
    titulo: "Índices, ORMs y migraciones",
    resumen: "B-Trees y B+ Trees para índices, ORMs y migraciones controladas.",
    objetivos: "Optimizar consultas con índices y gestionar la evolución del esquema con migraciones.",
    embed: "",
    descarga: "presentaciones/semana-05.pdf"
  },
  {
    n: 6,
    titulo: "Bases de datos vectoriales y embeddings",
    resumen: "La estructura detrás de la IA moderna y los sistemas de recomendación.",
    objetivos: "Comprender embeddings y su uso en búsquedas semánticas y RAG.",
    embed: "",
    descarga: "presentaciones/semana-06.pdf"
  },
  {
    n: 7,
    titulo: "Transacciones ACID, seguridad y despliegue en la nube",
    resumen: "Concurrencia con colas y pilas, prevención de ataques y DBaaS.",
    objetivos: "Garantizar integridad transaccional y desplegar de forma segura en la nube.",
    embed: "",
    descarga: "presentaciones/semana-07.pdf"
  },
  {
    n: 8,
    titulo: "Proyecto final: consolidación",
    resumen: "Sustentación del sistema integrando estructuras, bases de datos y seguridad.",
    objetivos: "Presentar y defender la arquitectura de datos elegida para el proyecto de aplicación.",
    embed: "",
    descarga: "presentaciones/semana-08.pdf"
  }
];
