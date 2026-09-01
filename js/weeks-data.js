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
    // Cámbialo a true cuando esté lista para publicarse a los estudiantes.
    disponibleClase2: false
  },
  {
    n: 4,
    titulo: "",
    resumen: "",
    objetivos: "",
    embed: "",
    descarga: "presentaciones/semana-04.pdf",
    disponible: false
  },
  {
    n: 5,
    titulo: "",
    resumen: "",
    objetivos: "",
    embed: "",
    descarga: "presentaciones/semana-05.pdf",
    disponible: false
  },
  {
    n: 6,
    titulo: "",
    resumen: "",
    objetivos: "",
    embed: "",
    descarga: "presentaciones/semana-06.pdf",
    disponible: false
  },
  {
    n: 7,
    titulo: "",
    resumen: "",
    objetivos: "",
    embed: "",
    descarga: "presentaciones/semana-07.pdf",
    disponible: false
  },
  {
    n: 8,
    titulo: "",
    resumen: "",
    objetivos: "",
    embed: "",
    descarga: "presentaciones/semana-08.pdf",
    disponible: false
  }
];
