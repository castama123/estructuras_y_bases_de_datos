/* ===================================================== */
/* PARTE 1: CREACIÓN DE TABLAS (las 6, en orden de FK)    */
/* ===================================================== */

CREATE DATABASE IF NOT EXISTS soundflow_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE soundflow_db;

/* CREANDO LA TABLA USUARIOS (Semana 1) */
CREATE TABLE tbl_usuarios (
  idusuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password_hash VARCHAR(256) NOT NULL,
  estado_activo TINYINT NOT NULL DEFAULT '1',
  creado_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (idusuario),
  UNIQUE KEY email_UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* CREANDO LA TABLA PAGOS_SUSCRIPCION (Semana 1) */
CREATE TABLE tbl_pagos_suscripcion (
  id_pagos_suscripcion INT NOT NULL AUTO_INCREMENT,
  monto DECIMAL(10,0) NOT NULL,
  fecha_pago TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_pagos_suscripcion),
  KEY fk_pago_usuario_idx (id_usuario),
  CONSTRAINT fk_pago_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios (idusuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* CREANDO LA TABLA ARTISTAS (Semana 2) */
CREATE TABLE tbl_artistas (
  id_artista INT NOT NULL AUTO_INCREMENT,
  nombre_artista VARCHAR(100) NOT NULL,
  pais VARCHAR(60) DEFAULT NULL,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_artista),
  UNIQUE KEY nombre_artista_UNIQUE (nombre_artista)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* CREANDO LA TABLA ALBUMES (Semana 2) */
CREATE TABLE tbl_albumes (
  id_album INT NOT NULL AUTO_INCREMENT,
  titulo_album VARCHAR(150) NOT NULL,
  anio_lanzamiento YEAR NOT NULL,
  id_artista INT NOT NULL,
  PRIMARY KEY (id_album),
  KEY fk_album_artista_idx (id_artista),
  CONSTRAINT fk_album_artista FOREIGN KEY (id_artista) REFERENCES tbl_artistas (id_artista)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* CREANDO LA TABLA CANCIONES (Semana 2) */
CREATE TABLE tbl_canciones (
  id_cancion INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(150) NOT NULL,
  genero VARCHAR(50) DEFAULT NULL,
  duracion_seg INT DEFAULT NULL,
  reproducciones INT DEFAULT NULL,
  id_album INT NOT NULL,
  PRIMARY KEY (id_cancion),
  KEY fk_cancion_album_idx (id_album),
  CONSTRAINT fk_cancion_album FOREIGN KEY (id_album) REFERENCES tbl_albumes (id_album)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* CREANDO LA TABLA REPRODUCCIONES (conecta Semana 1 con Semana 2) */
CREATE TABLE tbl_reproducciones (
  id_reproduccion INT NOT NULL AUTO_INCREMENT,
  fecha_reproduccion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT NOT NULL,
  id_cancion INT NOT NULL,
  PRIMARY KEY (id_reproduccion),
  KEY fk_reproduccion_usuario_idx (id_usuario),
  KEY fk_reproduccion_cancion_idx (id_cancion),
  CONSTRAINT fk_reproduccion_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios (idusuario),
  CONSTRAINT fk_reproduccion_cancion FOREIGN KEY (id_cancion) REFERENCES tbl_canciones (id_cancion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* ===================================================== */
/* PARTE 2: INSERCIÓN DE DATOS (10 registros por tabla)   */
/* ===================================================== */

/* INGRESANDO 10 USUARIOS Y ENCRIPTANDO LA CLAVE */
INSERT INTO tbl_usuarios (nombre, email, password_hash) VALUES
  ('Lucia Marin', 'lucia@email.com', SHA2('mi_password1234', 256)),
  ('Camilo Restrepo', 'camilo@email.com', SHA2('Rock2026*', 256)),
  ('Santiago Marin', 'santiago@email.com', SHA2('Superpass45!', 256)),
  ('Valentina Gómez', 'valentina@email.com', SHA2('Piano2024#', 256)),
  ('Andrés Torres', 'andres@email.com', SHA2('Clave2023$', 256)),
  ('Mariana Ruiz', 'mariana@email.com', SHA2('Sonido777*', 256)),
  ('Felipe Castro', 'felipe@email.com', SHA2('Melodia99!', 256)),
  ('Daniela Ortiz', 'daniela@email.com', SHA2('Acorde2022#', 256)),
  ('Juan Pablo León', 'juanpablo@email.com', SHA2('Ritmo321*', 256)),
  ('Sofía Herrera', 'sofia@email.com', SHA2('Vinilo88$', 256));

/* INGRESANDO 10 PAGOS DE SUSCRIPCION (uno por usuario) */
INSERT INTO tbl_pagos_suscripcion (monto, id_usuario) VALUES
  (25000, 1),
  (25000, 2),
  (25000, 3),
  (45000, 4),
  (25000, 5),
  (45000, 6),
  (25000, 7),
  (25000, 8),
  (45000, 9),
  (25000, 10);

/* INGRESANDO 10 ARTISTAS */
INSERT INTO tbl_artistas (nombre_artista, pais) VALUES
  ('Gloria Estefan', 'Cuba'),
  ('Celia Cruz', 'Cuba'),
  ('Soda Stereo', 'Argentina'),
  ('Maná', 'México'),
  ('Héroes del Silencio', 'España'),
  ('Shakira', 'Colombia'),
  ('Héctor Lavoe', 'Puerto Rico'),
  ('Caifanes', 'México'),
  ('Thalía', 'México'),
  ('Rubén Blades', 'Panamá');

/* INGRESANDO 10 ALBUMES (uno por artista) */
INSERT INTO tbl_albumes (titulo_album, anio_lanzamiento, id_artista) VALUES
  ('Grandes Éxitos', 2001, 1),
  ('Éxitos Eternos', 1998, 2),
  ('Grandes Éxitos', 1997, 3),
  ('¿Dónde Jugarán los Niños?', 1992, 4),
  ('Avalancha', 1995, 5),
  ('Pies Descalzos', 1995, 6),
  ('La Voz', 1975, 7),
  ('El Nervio del Volcán', 1994, 8),
  ('Amor a la Mexicana', 1997, 9),
  ('Siembra', 1978, 10);

/* INGRESANDO 10 CANCIONES (con id_cancion explícito, para que coincida con las FK de tbl_reproducciones) */
INSERT INTO tbl_canciones (id_cancion, titulo, genero, duracion_seg, reproducciones, id_album) VALUES
  (101, 'Tres Deseos', 'Pop', 210, 15200000, 1),
  (102, 'La Vida Es un Carnaval', 'Salsa', 245, 8900000, 2),
  (103, 'Mi Tierra', 'Salsa', 198, 3200000, 1),
  (104, 'De Música Ligera', 'Rock', 260, 5400000, 3),
  (105, 'Rayando el Sol', 'Rock', 205, 21000000, 4),
  (106, 'La Negra Tiene Tumbao', 'Salsa', 240, 12300000, 2),
  (107, 'Persiana Americana', 'Rock', 190, NULL, 3),
  (108, 'Mi Buen Amor', 'Pop', 205, NULL, 1),
  (109, 'Oye Mi Amor', 'Rock', 215, 980000, 4),
  (110, 'Cuando Pase el Temblor', 'Rock', 230, 4100000, 3);

/* INGRESANDO 10 REPRODUCCIONES (conecta usuarios con canciones) */
INSERT INTO tbl_reproducciones (id_usuario, id_cancion) VALUES
  (1, 101),
  (1, 105),
  (2, 102),
  (3, 104),
  (4, 106),
  (5, 101),
  (6, 107),
  (7, 108),
  (8, 109),
  (9, 110);