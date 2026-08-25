window.WEEK_CONTENT_2_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow: refinando consultas SQL</h2>

  <!-- ===================== 0. CREACIÓN DE LAS TABLAS DE LA ACTIVIDAD ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>Antes de empezar: creamos las tablas de la actividad</h3>
    </div>
    <p>
      La actividad de esta semana necesita cuatro tablas nuevas: <code>tbl_artistas</code>,
      <code>tbl_albumes</code>, <code>tbl_canciones</code> y <code>tbl_reproducciones</code>. Las creamos
      <strong>antes</strong> de ver DISTINCT, ORDER BY y el resto de cláusulas, para que desde el primer
      momento trabajes sobre un esquema bien normalizado, igual de bien construido que
      <code>tbl_usuarios</code> y <code>tbl_pagos_suscripcion</code> de la Semana 1. Aquí abajo tienes el
      modelo entidad-relación y el script completo de las <strong>seis tablas</strong> de
      <code>soundflow_db</code> hasta ahora.
    </p>

    <div class="content-box">
      <p style="margin:0;">
        Un artista tiene muchos álbumes, y un álbum tiene muchas canciones: dos relaciones 1:N
        encadenadas, igual que 1 <code>usuario</code> tiene muchos <code>pagos_suscripcion</code>. Además,
        un usuario puede reproducir muchas canciones, y una canción puede ser reproducida por muchos
        usuarios: es una relación N:M, así que necesita una tabla puente,
        <code>tbl_reproducciones</code>, con una FK hacia <code>tbl_usuarios</code> y otra hacia
        <code>tbl_canciones</code>. Esa es la tabla que finalmente conecta los dos grupos.
      </p>
      <svg viewBox="0 0 760 580" xmlns="http://www.w3.org/2000/svg" style="max-width:760px; width:100%; height:auto; display:block; margin:1rem auto 0;">
        <!-- tbl_usuarios (6 campos) -->
        <rect x="20" y="10" width="220" height="180" rx="8" fill="#ffffff" stroke="#5b7c99" stroke-width="1.5"/>
        <rect x="20" y="10" width="220" height="34" rx="8" fill="#5b7c99"/>
        <rect x="20" y="34" width="220" height="10" fill="#5b7c99"/>
        <text x="30" y="32" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700">tbl_usuarios</text>
        <text x="30" y="64" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="64" font-family="Consolas, monospace" font-size="10.5" fill="#a83a3a" font-weight="700">PK  idusuario</text>
        <text x="30" y="84" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">nombre</text>
        <text x="30" y="104" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">email</text>
        <text x="30" y="124" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">password_hash</text>
        <text x="30" y="144" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">estado_activo</text>
        <text x="30" y="164" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">creado_at</text>

        <!-- tbl_pagos_suscripcion (4 campos) -->
        <rect x="380" y="10" width="260" height="140" rx="8" fill="#ffffff" stroke="#c99a4e" stroke-width="1.5"/>
        <rect x="380" y="10" width="260" height="34" rx="8" fill="#c99a4e"/>
        <rect x="380" y="34" width="260" height="10" fill="#c99a4e"/>
        <text x="390" y="32" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_pagos_suscripcion</text>
        <text x="390" y="64" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="406" y="64" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_pagos_suscripcion</text>
        <text x="390" y="84" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">monto</text>
        <text x="390" y="104" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">fecha_pago</text>
        <text x="390" y="124" font-family="Consolas, monospace" font-size="10.5" fill="#5b7c99" font-weight="700">FK  id_usuario</text>

        <line x1="240" y1="64" x2="380" y2="124" stroke="#5b7c99" stroke-width="2"/>
        <circle cx="240" cy="64" r="4" fill="#5b7c99"/>
        <circle cx="380" cy="124" r="4" fill="#5b7c99"/>
        <text x="253" y="60" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">1</text>
        <text x="358" y="118" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">N</text>

        <!-- tbl_reproducciones (4 campos), tabla puente entre usuarios y canciones -->
        <rect x="270" y="210" width="220" height="140" rx="8" fill="#ffffff" stroke="#a86fa8" stroke-width="1.5"/>
        <rect x="270" y="210" width="220" height="34" rx="8" fill="#a86fa8"/>
        <rect x="270" y="234" width="220" height="10" fill="#a86fa8"/>
        <text x="280" y="232" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700">tbl_reproducciones</text>
        <text x="280" y="264" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="296" y="264" font-family="Consolas, monospace" font-size="10.5" fill="#a83a3a" font-weight="700">PK  id_reproduccion</text>
        <text x="280" y="284" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">fecha_reproduccion</text>
        <text x="280" y="304" font-family="Consolas, monospace" font-size="10.5" fill="#5b7c99" font-weight="700">FK  id_usuario</text>
        <text x="280" y="324" font-family="Consolas, monospace" font-size="10.5" fill="#5b9aa0" font-weight="700">FK  id_cancion</text>

        <line x1="130" y1="190" x2="270" y2="304" stroke="#5b7c99" stroke-width="2"/>
        <circle cx="130" cy="190" r="4" fill="#5b7c99"/>
        <circle cx="270" cy="304" r="4" fill="#5b7c99"/>
        <text x="140" y="212" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">1</text>
        <text x="240" y="300" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">N</text>

        <text x="380" y="378" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">tabla puente: resuelve la relación N:M entre usuarios y canciones</text>

        <!-- tbl_artistas (4 campos) -->
        <rect x="10" y="400" width="200" height="140" rx="8" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.5"/>
        <rect x="10" y="400" width="200" height="34" rx="8" fill="#8b7fb8"/>
        <rect x="10" y="424" width="200" height="10" fill="#8b7fb8"/>
        <text x="20" y="422" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700">tbl_artistas</text>
        <text x="20" y="454" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="36" y="454" font-family="Consolas, monospace" font-size="10.5" fill="#a83a3a" font-weight="700">PK  id_artista</text>
        <text x="20" y="474" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">nombre_artista</text>
        <text x="20" y="494" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">pais</text>
        <text x="20" y="514" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">fecha_registro</text>

        <!-- tbl_albumes (4 campos) -->
        <rect x="270" y="400" width="210" height="140" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
        <rect x="270" y="400" width="210" height="34" rx="8" fill="#7fa5a3"/>
        <rect x="270" y="424" width="210" height="10" fill="#7fa5a3"/>
        <text x="280" y="422" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700">tbl_albumes</text>
        <text x="280" y="454" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="296" y="454" font-family="Consolas, monospace" font-size="10.5" fill="#a83a3a" font-weight="700">PK  id_album</text>
        <text x="280" y="474" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">titulo_album</text>
        <text x="280" y="494" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">anio_lanzamiento</text>
        <text x="280" y="514" font-family="Consolas, monospace" font-size="10.5" fill="#8b7fb8" font-weight="700">FK  id_artista</text>

        <!-- tbl_canciones (6 campos) -->
        <rect x="540" y="400" width="210" height="180" rx="8" fill="#ffffff" stroke="#5b9aa0" stroke-width="1.5"/>
        <rect x="540" y="400" width="210" height="34" rx="8" fill="#5b9aa0"/>
        <rect x="540" y="424" width="210" height="10" fill="#5b9aa0"/>
        <text x="550" y="422" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700">tbl_canciones</text>
        <text x="550" y="454" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="566" y="454" font-family="Consolas, monospace" font-size="10.5" fill="#a83a3a" font-weight="700">PK  id_cancion</text>
        <text x="550" y="474" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">titulo</text>
        <text x="550" y="494" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">genero</text>
        <text x="550" y="514" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">duracion_seg</text>
        <text x="550" y="534" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">reproducciones</text>
        <text x="550" y="554" font-family="Consolas, monospace" font-size="10.5" fill="#7fa5a3" font-weight="700">FK  id_album</text>

        <line x1="490" y1="304" x2="540" y2="454" stroke="#5b9aa0" stroke-width="2"/>
        <circle cx="490" cy="304" r="4" fill="#5b9aa0"/>
        <circle cx="540" cy="454" r="4" fill="#5b9aa0"/>
        <text x="498" y="322" font-family="Consolas, monospace" font-size="12" fill="#5b9aa0" font-weight="700">N</text>
        <text x="510" y="450" font-family="Consolas, monospace" font-size="12" fill="#5b9aa0" font-weight="700">1</text>

        <line x1="210" y1="454" x2="270" y2="514" stroke="#8b7fb8" stroke-width="2"/>
        <circle cx="210" cy="454" r="4" fill="#8b7fb8"/>
        <circle cx="270" cy="514" r="4" fill="#8b7fb8"/>
        <text x="220" y="450" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">1</text>
        <text x="250" y="510" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">N</text>

        <line x1="480" y1="454" x2="540" y2="554" stroke="#7fa5a3" stroke-width="2"/>
        <circle cx="480" cy="454" r="4" fill="#7fa5a3"/>
        <circle cx="540" cy="554" r="4" fill="#7fa5a3"/>
        <text x="490" y="450" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">1</text>
        <text x="518" y="550" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">N</text>
      </svg>
    </div>

    <p style="margin-top:1rem;">
      Copia este script completo y llévalo directo a tu DBMS, incluye las dos tablas de la Semana 1 y
      las cuatro nuevas de esta semana, listo para correr de una sola vez en una base nueva:
    </p>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">00_script_completo_6_tablas.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>/* ===================================================== */
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
  (9, 110);</code></pre>
    </div>

    <p style="margin-top:1rem;">
      Así quedan los datos. <code>tbl_canciones</code> solo usa los álbumes 1 a 4 en esta muestra, los
      artistas y álbumes 5 a 10 son catálogo adicional, sin canciones asociadas todavía:
    </p>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-family:Consolas, monospace; font-size:0.78rem;">
        <thead>
          <tr>
            <th colspan="3" style="padding:0.5rem 0.7rem; background:#8b7fb8; color:#fff; text-align:left;">tbl_artistas</th>
          </tr>
          <tr>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_artista</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">nombre_artista</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">pais</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.35rem 0.7rem;">1</td><td style="padding:0.35rem 0.7rem;">Gloria Estefan</td><td style="padding:0.35rem 0.7rem;">Cuba</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">2</td><td style="padding:0.35rem 0.7rem;">Celia Cruz</td><td style="padding:0.35rem 0.7rem;">Cuba</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">3</td><td style="padding:0.35rem 0.7rem;">Soda Stereo</td><td style="padding:0.35rem 0.7rem;">Argentina</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">4</td><td style="padding:0.35rem 0.7rem;">Maná</td><td style="padding:0.35rem 0.7rem;">México</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">5</td><td style="padding:0.35rem 0.7rem;">Héroes del Silencio</td><td style="padding:0.35rem 0.7rem;">España</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">6</td><td style="padding:0.35rem 0.7rem;">Shakira</td><td style="padding:0.35rem 0.7rem;">Colombia</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">7</td><td style="padding:0.35rem 0.7rem;">Héctor Lavoe</td><td style="padding:0.35rem 0.7rem;">Puerto Rico</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">8</td><td style="padding:0.35rem 0.7rem;">Caifanes</td><td style="padding:0.35rem 0.7rem;">México</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">9</td><td style="padding:0.35rem 0.7rem;">Thalía</td><td style="padding:0.35rem 0.7rem;">México</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">10</td><td style="padding:0.35rem 0.7rem;">Rubén Blades</td><td style="padding:0.35rem 0.7rem;">Panamá</td></tr>
        </tbody>
      </table>
    </div>
    <div style="overflow-x:auto; margin-top:1rem;">
      <table style="border-collapse:collapse; width:100%; font-family:Consolas, monospace; font-size:0.78rem;">
        <thead>
          <tr>
            <th colspan="3" style="padding:0.5rem 0.7rem; background:#7fa5a3; color:#fff; text-align:left;">tbl_albumes</th>
          </tr>
          <tr>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_album</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">titulo_album</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_artista</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.35rem 0.7rem;">1</td><td style="padding:0.35rem 0.7rem;">Grandes Éxitos</td><td style="padding:0.35rem 0.7rem;">1 (Gloria Estefan)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">2</td><td style="padding:0.35rem 0.7rem;">Éxitos Eternos</td><td style="padding:0.35rem 0.7rem;">2 (Celia Cruz)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">3</td><td style="padding:0.35rem 0.7rem;">Grandes Éxitos</td><td style="padding:0.35rem 0.7rem;">3 (Soda Stereo)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">4</td><td style="padding:0.35rem 0.7rem;">¿Dónde Jugarán los Niños?</td><td style="padding:0.35rem 0.7rem;">4 (Maná)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">5</td><td style="padding:0.35rem 0.7rem;">Avalancha</td><td style="padding:0.35rem 0.7rem;">5 (Héroes del Silencio)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">6</td><td style="padding:0.35rem 0.7rem;">Pies Descalzos</td><td style="padding:0.35rem 0.7rem;">6 (Shakira)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">7</td><td style="padding:0.35rem 0.7rem;">La Voz</td><td style="padding:0.35rem 0.7rem;">7 (Héctor Lavoe)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">8</td><td style="padding:0.35rem 0.7rem;">El Nervio del Volcán</td><td style="padding:0.35rem 0.7rem;">8 (Caifanes)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">9</td><td style="padding:0.35rem 0.7rem;">Amor a la Mexicana</td><td style="padding:0.35rem 0.7rem;">9 (Thalía)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">10</td><td style="padding:0.35rem 0.7rem;">Siembra</td><td style="padding:0.35rem 0.7rem;">10 (Rubén Blades)</td></tr>
        </tbody>
      </table>
    </div>
    <div style="overflow-x:auto; margin-top:1rem;">
      <table id="tblCanciones" style="border-collapse:collapse; width:100%; font-family:Consolas, monospace; font-size:0.78rem;">
        <thead>
          <tr>
            <th colspan="6" style="padding:0.5rem 0.7rem; background:var(--accent); color:#fff; text-align:left;">tbl_canciones</th>
          </tr>
          <tr>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_cancion</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">titulo</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">genero</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">duracion_seg</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">reproducciones</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_album</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.35rem 0.7rem;">101</td><td style="padding:0.35rem 0.7rem;">Tres Deseos</td><td style="padding:0.35rem 0.7rem;">Pop</td><td style="padding:0.35rem 0.7rem;">210</td><td style="padding:0.35rem 0.7rem;">15200000</td><td style="padding:0.35rem 0.7rem;">1</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">102</td><td style="padding:0.35rem 0.7rem;">La Vida Es un Carnaval</td><td style="padding:0.35rem 0.7rem;">Salsa</td><td style="padding:0.35rem 0.7rem;">245</td><td style="padding:0.35rem 0.7rem;">8900000</td><td style="padding:0.35rem 0.7rem;">2</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">103</td><td style="padding:0.35rem 0.7rem;">Mi Tierra</td><td style="padding:0.35rem 0.7rem;">Salsa</td><td style="padding:0.35rem 0.7rem;">198</td><td style="padding:0.35rem 0.7rem;">3200000</td><td style="padding:0.35rem 0.7rem;">1</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">104</td><td style="padding:0.35rem 0.7rem;">De Música Ligera</td><td style="padding:0.35rem 0.7rem;">Rock</td><td style="padding:0.35rem 0.7rem;">260</td><td style="padding:0.35rem 0.7rem;">5400000</td><td style="padding:0.35rem 0.7rem;">3</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">105</td><td style="padding:0.35rem 0.7rem;">Rayando el Sol</td><td style="padding:0.35rem 0.7rem;">Rock</td><td style="padding:0.35rem 0.7rem;">205</td><td style="padding:0.35rem 0.7rem;">21000000</td><td style="padding:0.35rem 0.7rem;">4</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">106</td><td style="padding:0.35rem 0.7rem;">La Negra Tiene Tumbao</td><td style="padding:0.35rem 0.7rem;">Salsa</td><td style="padding:0.35rem 0.7rem;">240</td><td style="padding:0.35rem 0.7rem;">12300000</td><td style="padding:0.35rem 0.7rem;">2</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">107</td><td style="padding:0.35rem 0.7rem;">Persiana Americana</td><td style="padding:0.35rem 0.7rem;">Rock</td><td style="padding:0.35rem 0.7rem;">190</td><td style="padding:0.35rem 0.7rem; color:var(--text-dim); font-style:italic;">NULL</td><td style="padding:0.35rem 0.7rem;">3</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">108</td><td style="padding:0.35rem 0.7rem;">Mi Buen Amor</td><td style="padding:0.35rem 0.7rem;">Pop</td><td style="padding:0.35rem 0.7rem;">205</td><td style="padding:0.35rem 0.7rem; color:var(--text-dim); font-style:italic;">NULL</td><td style="padding:0.35rem 0.7rem;">1</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">109</td><td style="padding:0.35rem 0.7rem;">Oye Mi Amor</td><td style="padding:0.35rem 0.7rem;">Rock</td><td style="padding:0.35rem 0.7rem;">215</td><td style="padding:0.35rem 0.7rem;">980000</td><td style="padding:0.35rem 0.7rem;">4</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">110</td><td style="padding:0.35rem 0.7rem;">Cuando Pase el Temblor</td><td style="padding:0.35rem 0.7rem;">Rock</td><td style="padding:0.35rem 0.7rem;">230</td><td style="padding:0.35rem 0.7rem;">4100000</td><td style="padding:0.35rem 0.7rem;">3</td></tr>
        </tbody>
      </table>
    </div>
    <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.5rem;">
      "Persiana Americana" y "Mi Buen Amor" se acaban de agregar al catálogo de SoundFlow: todavía no
      tienen dato de reproducciones. Los vamos a usar más abajo.
    </p>
    <p style="margin-top:1rem;">
      Y así queda <code>tbl_reproducciones</code>, la tabla puente que conecta <code>tbl_usuarios</code>
      (Semana 1) con <code>tbl_canciones</code> (Semana 2):
    </p>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-family:Consolas, monospace; font-size:0.78rem;">
        <thead>
          <tr>
            <th colspan="3" style="padding:0.5rem 0.7rem; background:#a86fa8; color:#fff; text-align:left;">tbl_reproducciones</th>
          </tr>
          <tr>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_reproduccion</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_usuario</th>
            <th style="padding:0.4rem 0.7rem; border-bottom:2px solid var(--border); text-align:left;">id_cancion</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.35rem 0.7rem;">1</td><td style="padding:0.35rem 0.7rem;">1 (Lucia Marin)</td><td style="padding:0.35rem 0.7rem;">101 (Tres Deseos)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">2</td><td style="padding:0.35rem 0.7rem;">1 (Lucia Marin)</td><td style="padding:0.35rem 0.7rem;">105 (Rayando el Sol)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">3</td><td style="padding:0.35rem 0.7rem;">2 (Camilo Restrepo)</td><td style="padding:0.35rem 0.7rem;">102 (La Vida Es un Carnaval)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">4</td><td style="padding:0.35rem 0.7rem;">3 (Santiago Marin)</td><td style="padding:0.35rem 0.7rem;">104 (De Música Ligera)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">5</td><td style="padding:0.35rem 0.7rem;">4 (Valentina Gómez)</td><td style="padding:0.35rem 0.7rem;">106 (La Negra Tiene Tumbao)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">6</td><td style="padding:0.35rem 0.7rem;">5 (Andrés Torres)</td><td style="padding:0.35rem 0.7rem;">101 (Tres Deseos)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">7</td><td style="padding:0.35rem 0.7rem;">6 (Mariana Ruiz)</td><td style="padding:0.35rem 0.7rem;">107 (Persiana Americana)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">8</td><td style="padding:0.35rem 0.7rem;">7 (Felipe Castro)</td><td style="padding:0.35rem 0.7rem;">108 (Mi Buen Amor)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">9</td><td style="padding:0.35rem 0.7rem;">8 (Daniela Ortiz)</td><td style="padding:0.35rem 0.7rem;">109 (Oye Mi Amor)</td></tr>
          <tr><td style="padding:0.35rem 0.7rem;">10</td><td style="padding:0.35rem 0.7rem;">9 (Juan Pablo León)</td><td style="padding:0.35rem 0.7rem;">110 (Cuando Pase el Temblor)</td></tr>
        </tbody>
      </table>
    </div>
    <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.5rem;">
      El usuario 1 (Lucia Marin) aparece dos veces: reprodujo dos canciones distintas. La canción 101
      (Tres Deseos) también aparece dos veces: la reprodujeron dos usuarios distintos. Esa es la relación
      N:M en acción.
    </p>
  </div>

  <!-- ===================== 1. SELECT DISTINCT ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>1. SELECT DISTINCT: quitar duplicados</h3>
    </div>
    <p>
      Si le pides a SQL la columna <code>genero</code> de las 10 canciones, te va a repetir "Pop" cada vez
      que aparezca, "Rock" cada vez que aparezca, etc., una fila por cada canción, con el género repetido.
      <code>DISTINCT</code> le dice a SQL: "de todos esos valores, dame cada uno <strong>una sola vez</strong>".
    </p>

    <div class="numbered-grid numbered-grid-2col" style="margin-top:0.8rem;">
      <div class="numbered-card">
        <div class="num" style="color:#c44444;">Sin DISTINCT</div>
        <p><code>SELECT genero FROM tbl_canciones;</code> devuelve 10 filas: Pop, Salsa, Salsa, Rock, Rock, Salsa, Rock, Pop, Rock, Rock.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#6f9d7c;">Con DISTINCT</div>
        <p><code>SELECT DISTINCT genero FROM tbl_canciones;</code> devuelve solo 3 filas: Pop, Salsa, Rock.</p>
      </div>
    </div>

    <div class="code-block" style="margin-top:1rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">01_distinct.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- ¿Cuántos géneros distintos maneja SoundFlow en esta muestra?
SELECT DISTINCT genero FROM tbl_canciones;

-- DISTINCT sobre varias columnas: combinaciones únicas, no cada una por separado
SELECT DISTINCT id_album, genero FROM tbl_canciones WHERE id_album = 1;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: SELECT DISTINCT genero</div>
        <table><thead><tr><th>genero</th></tr></thead><tbody>
          <tr><td>Pop</td></tr>
          <tr><td>Salsa</td></tr>
          <tr><td>Rock</td></tr>
        </tbody></table>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: SELECT DISTINCT id_album, genero WHERE id_album = 1</div>
        <table><thead><tr><th>id_album</th><th>genero</th></tr></thead><tbody>
          <tr><td>1</td><td>Pop</td></tr>
          <tr><td>1</td><td>Salsa</td></tr>
        </tbody></table>
      </div>
    </div>
  </div>

  <!-- ===================== 2. ORDER BY ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. ORDER BY: ordenar resultados</h3>
    </div>
    <p>
      Por defecto, SQL no garantiza en qué orden te devuelve las filas. <code>ORDER BY</code> te deja
      decidir según qué columna se ordena, y en qué sentido: <code>ASC</code> (ascendente, de menor a
      mayor, es el valor por defecto) o <code>DESC</code> (descendente, de mayor a menor).
    </p>

    <div class="sql-console" style="margin-top:0.8rem;">
      <pre><code><span class="sql-kw">SELECT</span> titulo, reproducciones <span class="sql-kw">FROM</span> <span class="sql-ident">tbl_canciones</span>
<span class="sql-kw">ORDER BY</span> <span class="sql-ident">reproducciones</span> <span class="sql-kw">DESC</span>;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado</div>
        <table><thead><tr><th>titulo</th><th>reproducciones</th></tr></thead><tbody>
          <tr><td>Rayando el Sol</td><td>21000000</td></tr>
          <tr><td>Tres Deseos</td><td>15200000</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>12300000</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>8900000</td></tr>
          <tr><td>De Música Ligera</td><td>5400000</td></tr>
          <tr><td>Cuando Pase el Temblor</td><td>4100000</td></tr>
          <tr><td>Mi Tierra</td><td>3200000</td></tr>
          <tr><td>Oye Mi Amor</td><td>980000</td></tr>
          <tr><td>Persiana Americana</td><td class="rnull">NULL</td></tr>
          <tr><td>Mi Buen Amor</td><td class="rnull">NULL</td></tr>
        </tbody></table>
      </div>
    </div>
    <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.5rem;">
      Esto trae primero "Rayando el Sol" (21.000.000), luego "Tres Deseos" (15.200.000), y así
      sucesivamente de mayor a menor. Los dos <code>NULL</code> quedan al final porque, en
      <code>DESC</code>, MySQL los trata como "los más pequeños".
    </p>

    <div class="numbered-grid" style="margin-top:0.8rem;">
      <div class="numbered-card">
        <div class="num" style="color:var(--accent);">Ordenar por varias columnas</div>
        <p><code>ORDER BY genero ASC, reproducciones DESC</code> agrupa primero por género (alfabético), y dentro de cada género, de la más escuchada a la menos escuchada.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#8b7fb8;">¿Y los NULL?</div>
        <p>En MySQL, los valores <code>NULL</code> se consideran "los más pequeños": con <code>ORDER BY reproducciones ASC</code>, "Persiana Americana" y "Mi Buen Amor" (sin dato) aparecen de primeras.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 3. OPERADORES Y NULL ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Operadores y valores NULL</h3>
    </div>
    <p>
      Todo lo que filtras con <code>WHERE</code> se apoya en operadores. Ya usaste <code>=</code> la semana
      pasada; hoy vemos la familia completa.
    </p>

    <div class="numbered-grid" style="margin-top:0.8rem;">
      <div class="numbered-card">
        <div class="num" style="color:var(--accent);">Comparación</div>
        <p><code>=</code> igual, <code>&lt;&gt;</code> o <code>!=</code> distinto, <code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code> mayor/menor (o igual).</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#7fa5a3;">Lógicos</div>
        <p><code>AND</code> (ambas condiciones), <code>OR</code> (al menos una), <code>NOT</code> (niega la condición).</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#8b7fb8;">NULL: caso especial</div>
        <p><code>NULL</code> significa "sin dato", no "cero" ni "vacío". Por eso <strong>no</strong> se compara con <code>=</code>: se usa <code>IS NULL</code> / <code>IS NOT NULL</code>.</p>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Por qué no <code>= NULL</code>?</strong> Para SQL, <code>NULL</code> es "un valor
        desconocido". Preguntar "¿es el valor desconocido igual a NULL?" tampoco tiene una respuesta
        clara, SQL responde ni verdadero ni falso, así que esa fila nunca aparece en el resultado, aunque
        sí tenga <code>NULL</code>. La única forma correcta de preguntar es con <code>IS NULL</code>.
      </p>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">02_operadores_null.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Canciones de Pop con más de 10 millones de reproducciones
SELECT titulo FROM tbl_canciones
WHERE genero = 'Pop' AND reproducciones > 10000000;

-- Lanzamientos que todavía no tienen dato de reproducciones
SELECT titulo, genero FROM tbl_canciones
WHERE reproducciones IS NULL;

-- Lo contrario: solo las que sí tienen dato
SELECT titulo FROM tbl_canciones
WHERE reproducciones IS NOT NULL;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: Pop con más de 10 millones</div>
        <table><thead><tr><th>titulo</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td></tr>
        </tbody></table>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: reproducciones IS NULL</div>
        <table><thead><tr><th>titulo</th><th>genero</th></tr></thead><tbody>
          <tr><td>Persiana Americana</td><td>Rock</td></tr>
          <tr><td>Mi Buen Amor</td><td>Pop</td></tr>
        </tbody></table>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: reproducciones IS NOT NULL</div>
        <table><thead><tr><th>titulo</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td></tr>
          <tr><td>La Vida Es un Carnaval</td></tr>
          <tr><td>Mi Tierra</td></tr>
          <tr><td>De Música Ligera</td></tr>
          <tr><td>Rayando el Sol</td></tr>
          <tr><td>La Negra Tiene Tumbao</td></tr>
          <tr><td>Oye Mi Amor</td></tr>
          <tr><td>Cuando Pase el Temblor</td></tr>
        </tbody></table>
      </div>
    </div>
  </div>

  <!-- ===================== 4. LIKE, WILDCARDS, IN, BETWEEN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. Filtrando con LIKE, wildcards, IN y BETWEEN</h3>
    </div>
    <p>
      Cuatro formas de filtrar que van más allá de "es igual a": buscar por patrón de texto, por lista de
      valores, o por rango.
    </p>

    <div class="numbered-grid" style="grid-template-columns: 1fr; margin-top:0.8rem;">
      <div class="numbered-card">
        <div class="num" style="color:var(--accent);">LIKE + wildcards</div>
        <p>
          <code>LIKE</code> busca un patrón de texto, usando dos comodines: <code><strong>%</strong></code> (cualquier
          cantidad de caracteres, incluso ninguno) y <code><strong>_</strong></code> (exactamente un carácter).
        </p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#7fa5a3;">IN</div>
        <p>
          <code>IN (valor1, valor2, ...)</code> reemplaza una cadena larga de <code>OR</code>: en vez de
          <code>genero = 'Pop' OR genero = 'Rock'</code>, escribes <code>genero IN ('Pop', 'Rock')</code>.
        </p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#8b7fb8;">BETWEEN</div>
        <p>
          <code>BETWEEN valor1 AND valor2</code> filtra un rango, <strong>incluyendo ambos extremos</strong>.
          Funciona con números, fechas y hasta texto.
        </p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#c99a4e;">Wildcards en detalle</div>
        <p>
          <code>'P<strong>%</strong>'</code> = empieza con P. <code>'<strong>%</strong>r'</code> = termina en r. <code>'<strong>%</strong>Amor<strong>%</strong>'</code> =
          contiene "Amor" en cualquier parte. <code>'<strong>_</strong>a<strong>%</strong>'</code> = segunda letra "a", el resto lo que sea.
        </p>
      </div>
    </div>

    <div class="code-block" style="margin-top:1rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">03_like_in_between.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- LIKE: títulos que empiezan con "P"
SELECT titulo FROM tbl_canciones WHERE titulo LIKE 'P%';
-- → Persiana Americana

-- LIKE: títulos que contienen "Amor"
SELECT titulo FROM tbl_canciones WHERE titulo LIKE '%Amor%';
-- → Mi Buen Amor, Oye Mi Amor

-- LIKE con "_": la segunda letra es exactamente "a", el resto lo que sea
SELECT titulo FROM tbl_canciones WHERE titulo LIKE '_a%';
-- → La Vida Es un Carnaval, Rayando el Sol, La Negra Tiene Tumbao

-- IN: solo estos tres géneros
SELECT titulo, genero FROM tbl_canciones
WHERE genero IN ('Pop', 'Rock', 'Salsa');

-- Lo mismo con OR, para comparar (mismo resultado, más largo de escribir)
SELECT titulo, genero FROM tbl_canciones
WHERE genero = 'Pop' OR genero = 'Rock' OR genero = 'Salsa';

-- BETWEEN: canciones de duración media (entre 200 y 230 segundos, incluidos)
SELECT titulo, duracion_seg FROM tbl_canciones
WHERE duracion_seg BETWEEN 200 AND 230;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: IN ('Pop', 'Rock', 'Salsa') (igual con OR)</div>
        <table><thead><tr><th>titulo</th><th>genero</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td><td>Pop</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>Salsa</td></tr>
          <tr><td>Mi Tierra</td><td>Salsa</td></tr>
          <tr><td>De Música Ligera</td><td>Rock</td></tr>
          <tr><td>Rayando el Sol</td><td>Rock</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>Salsa</td></tr>
          <tr><td>Persiana Americana</td><td>Rock</td></tr>
          <tr><td>Mi Buen Amor</td><td>Pop</td></tr>
          <tr><td>Oye Mi Amor</td><td>Rock</td></tr>
          <tr><td>Cuando Pase el Temblor</td><td>Rock</td></tr>
        </tbody></table>
        <p class="query-result-note">Trae las 10 filas porque en esta muestra no hay géneros fuera de Pop, Rock y Salsa.</p>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: BETWEEN 200 AND 230</div>
        <table><thead><tr><th>titulo</th><th>duracion_seg</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td><td>210</td></tr>
          <tr><td>Rayando el Sol</td><td>205</td></tr>
          <tr><td>Mi Buen Amor</td><td>205</td></tr>
          <tr><td>Oye Mi Amor</td><td>215</td></tr>
          <tr><td>Cuando Pase el Temblor</td><td>230</td></tr>
        </tbody></table>
      </div>
    </div>
  </div>

  <!-- ===================== 5. LIMIT ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. Limitar resultados con LIMIT</h3>
    </div>
    <p>
      Cuando solo quieres las primeras N filas de un resultado (como "el top 3 de canciones más
      escuchadas"), necesitas limitar cuántas filas se devuelven. En MySQL eso se hace con
      <code>LIMIT n</code>, y se escribe <strong>al final</strong> de la consulta, después de
      <code>ORDER BY</code>.
    </p>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">04_limit.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- El top 3 de canciones más escuchadas
SELECT titulo, reproducciones FROM tbl_canciones
ORDER BY reproducciones DESC
LIMIT 3;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado</div>
        <table><thead><tr><th>titulo</th><th>reproducciones</th></tr></thead><tbody>
          <tr><td>Rayando el Sol</td><td>21000000</td></tr>
          <tr><td>Tres Deseos</td><td>15200000</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>12300000</td></tr>
        </tbody></table>
      </div>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem;">LIMIT con offset: paginar resultados</h4>
    <p>
      <code>LIMIT</code> acepta un segundo número opcional: el <strong>offset</strong>, que le dice a SQL
      cuántas filas saltarse desde el principio antes de empezar a contar. <code>LIMIT 3, 3</code> se lee
      "sáltate las primeras 3, y de ahí tráeme las siguientes 3".
    </p>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Ordenando por <code>reproducciones DESC</code>, las primeras 3 son "Rayando el Sol" (21M),
        "Tres Deseos" (15.2M) y "La Negra Tiene Tumbao" (12.3M). <code>LIMIT 3, 3</code> se las salta y
        trae las <strong>siguientes</strong> 3: "La Vida Es un Carnaval" (8.9M), "De Música Ligera"
        (5.4M) y "Cuando Pase el Temblor" (4.1M).
      </p>
    </div>
    <p style="margin-top:0.8rem;">
      Así es como funciona la paginación en cualquier app: si SoundFlow muestra 10 canciones por página,
      la página 1 es <code>LIMIT 0, 10</code> (sin saltar nada), la página 2 es <code>LIMIT 10, 10</code>
      (salta las primeras 10), la página 3 es <code>LIMIT 20, 10</code>, y así sucesivamente.
    </p>
    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05_limit_offset.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Salta las primeras 3 filas y trae las siguientes 3
SELECT titulo, reproducciones FROM tbl_canciones
ORDER BY reproducciones DESC
LIMIT 3, 3;

-- Mismo resultado, con la sintaxis alternativa "LIMIT count OFFSET offset"
-- (más explícita sobre cuál número es cuál)
SELECT titulo, reproducciones FROM tbl_canciones
ORDER BY reproducciones DESC
LIMIT 3 OFFSET 3;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: LIMIT 3, 3 (igual con LIMIT 3 OFFSET 3)</div>
        <table><thead><tr><th>titulo</th><th>reproducciones</th></tr></thead><tbody>
          <tr><td>La Vida Es un Carnaval</td><td>8900000</td></tr>
          <tr><td>De Música Ligera</td><td>5400000</td></tr>
          <tr><td>Cuando Pase el Temblor</td><td>4100000</td></tr>
        </tbody></table>
      </div>
    </div>
  </div>

  <!-- ===================== 6. FUNCIONES DE AGREGACIÓN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. Funciones de agregación</h3>
    </div>
    <p>
      Hasta ahora cada consulta devuelve una fila por cada fila de la tabla. Las funciones de agregación
      hacen lo contrario: toman muchas filas y las <strong>resumen en un solo valor</strong>.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); margin-top:0.8rem;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">COUNT()</h4>
        <p style="font-size:0.85rem;">Cuenta filas. <code>COUNT(*)</code> cuenta todas; <code>COUNT(columna)</code> ignora los <code>NULL</code> de esa columna.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7fa5a3;">SUM()</h4>
        <p style="font-size:0.85rem;">Suma los valores numéricos de una columna.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">AVG()</h4>
        <p style="font-size:0.85rem;">Calcula el promedio. También ignora los <code>NULL</code> al calcular.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">MIN() / MAX()</h4>
        <p style="font-size:0.85rem;">El valor más pequeño y el más grande de la columna.</p>
      </div>
    </div>

    <div class="code-block" style="margin-top:1rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05_agregacion.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- ¿Cuántas canciones hay en total?
SELECT COUNT(*) FROM tbl_canciones;                    -- 10

-- ¿Cuántas YA tienen dato de reproducciones?
SELECT COUNT(reproducciones) FROM tbl_canciones;        -- 8 (ignora los 2 NULL)

-- ¿Cuántos álbumes distintos están representados? (COUNT + DISTINCT juntos)
SELECT COUNT(DISTINCT id_album) FROM tbl_canciones;     -- 4

-- Total y promedio de reproducciones
SELECT SUM(reproducciones), AVG(reproducciones) FROM tbl_canciones;

-- La más y la menos escuchada
SELECT MIN(reproducciones), MAX(reproducciones) FROM tbl_canciones;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: COUNT(*)</div>
        <div class="single-value">10</div>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: COUNT(reproducciones)</div>
        <div class="single-value">8</div>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: COUNT(DISTINCT id_album)</div>
        <div class="single-value">4</div>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: SUM() y AVG()</div>
        <table><thead><tr><th>SUM(reproducciones)</th><th>AVG(reproducciones)</th></tr></thead><tbody>
          <tr><td>71080000</td><td>8885000</td></tr>
        </tbody></table>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: MIN() y MAX()</div>
        <table><thead><tr><th>MIN(reproducciones)</th><th>MAX(reproducciones)</th></tr></thead><tbody>
          <tr><td>980000</td><td>21000000</td></tr>
        </tbody></table>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Importante: agrupar con GROUP BY:</strong> las funciones de agregación se vuelven aún más
        útiles combinadas con <code>GROUP BY</code>, que arma un grupo por cada valor distinto de una
        columna y calcula la función <em>dentro</em> de cada grupo:
      </p>
      <div class="sql-console" style="margin-top:0.6rem;">
        <pre><code><span class="sql-kw">SELECT</span> genero, <span class="sql-kw">COUNT</span>(*) <span class="sql-kw">AS</span> total
<span class="sql-kw">FROM</span> <span class="sql-ident">tbl_canciones</span>
<span class="sql-kw">GROUP BY</span> <span class="sql-ident">genero</span>;</code></pre>
      </div>
      <div class="query-result-block" style="margin-top:0.6rem;">
        <div class="query-result-item">
          <div class="query-result-caption">Resultado</div>
          <table><thead><tr><th>genero</th><th>total</th></tr></thead><tbody>
            <tr><td>Pop</td><td>2</td></tr>
            <tr><td>Salsa</td><td>3</td></tr>
            <tr><td>Rock</td><td>5</td></tr>
          </tbody></table>
        </div>
      </div>
      <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.5rem;">
        Esto devuelve una fila por género con su conteo: Pop 2, Salsa 3, Rock 5.
        Lo vamos a retomar con más profundidad cuando lleguemos a JOINs, para agrupar por artista o por
        álbum de verdad.
      </p>
    </div>
  </div>

  <!-- ===================== 7. ALIAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>7. Alias: renombrar con AS</h3>
    </div>
    <p>
      <code>AS</code> le pone un nombre distinto a una columna (o a una tabla) solo <strong>en el
      resultado</strong>, sin cambiar nada en la base de datos real. Sirve para que las columnas calculadas
      tengan un nombre legible, o para acortar nombres largos de tablas.
    </p>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">06_alias.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Alias de columna: le da un nombre más claro al resultado
SELECT titulo AS cancion, reproducciones AS total_reproducciones
FROM tbl_canciones;

-- Alias sobre una función de agregación (sin esto, la columna se llamaría "COUNT(*)")
SELECT genero, COUNT(*) AS cantidad
FROM tbl_canciones
GROUP BY genero;

-- Alias de tabla: acorta el nombre para escribir menos
SELECT c.titulo, c.genero
FROM tbl_canciones AS c
WHERE c.genero = 'Pop';</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: alias de columna</div>
        <table><thead><tr><th>cancion</th><th>total_reproducciones</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td><td>15200000</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>8900000</td></tr>
          <tr><td>Mi Tierra</td><td>3200000</td></tr>
          <tr><td>De Música Ligera</td><td>5400000</td></tr>
          <tr><td>Rayando el Sol</td><td>21000000</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>12300000</td></tr>
          <tr><td>Persiana Americana</td><td class="rnull">NULL</td></tr>
          <tr><td>Mi Buen Amor</td><td class="rnull">NULL</td></tr>
          <tr><td>Oye Mi Amor</td><td>980000</td></tr>
          <tr><td>Cuando Pase el Temblor</td><td>4100000</td></tr>
        </tbody></table>
        <p class="query-result-note">Las columnas ya no se llaman "titulo" y "reproducciones": se llaman "cancion" y "total_reproducciones".</p>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: alias sobre COUNT(*)</div>
        <table><thead><tr><th>genero</th><th>cantidad</th></tr></thead><tbody>
          <tr><td>Pop</td><td>2</td></tr>
          <tr><td>Salsa</td><td>3</td></tr>
          <tr><td>Rock</td><td>5</td></tr>
        </tbody></table>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: alias de tabla (c.titulo, c.genero)</div>
        <table><thead><tr><th>titulo</th><th>genero</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td><td>Pop</td></tr>
          <tr><td>Mi Buen Amor</td><td>Pop</td></tr>
        </tbody></table>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        El alias de tabla (<code>tbl_canciones AS c</code>) no parece necesario todavía porque solo hay
        una tabla en la consulta, pero en la próxima clase, cuando combinemos <code>tbl_artistas</code>,
        <code>tbl_albumes</code> y <code>tbl_canciones</code> con <code>JOIN</code>, es lo que evita
        escribir el nombre completo de cada tabla en cada columna.
      </p>
    </div>
  </div>

  <!-- ===================== 8. CONCAT ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>8. Concatenar texto con CONCAT</h3>
    </div>
    <p>
      <code>CONCAT()</code> une varios valores (columnas, texto fijo, o ambos) en un solo resultado de
      texto. Sirve para armar una sola columna legible a partir de varias columnas separadas.
    </p>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">07_concat.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Sin alias, la columna resultante se llamaría "CONCAT(titulo, ' - ', genero)"
SELECT CONCAT(titulo, ' - ', genero) AS cancion_genero
FROM tbl_canciones;

-- Combinando varias columnas y texto fijo
SELECT CONCAT(titulo, ' (', genero, ', ', duracion_seg, ' seg)') AS ficha
FROM tbl_canciones;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: cancion_genero</div>
        <table><thead><tr><th>cancion_genero</th></tr></thead><tbody>
          <tr><td>Tres Deseos - Pop</td></tr>
          <tr><td>La Vida Es un Carnaval - Salsa</td></tr>
          <tr><td>Mi Tierra - Salsa</td></tr>
          <tr><td>De Música Ligera - Rock</td></tr>
          <tr><td>Rayando el Sol - Rock</td></tr>
          <tr><td>La Negra Tiene Tumbao - Salsa</td></tr>
          <tr><td>Persiana Americana - Rock</td></tr>
          <tr><td>Mi Buen Amor - Pop</td></tr>
          <tr><td>Oye Mi Amor - Rock</td></tr>
          <tr><td>Cuando Pase el Temblor - Rock</td></tr>
        </tbody></table>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: ficha</div>
        <table><thead><tr><th>ficha</th></tr></thead><tbody>
          <tr><td>Tres Deseos (Pop, 210 seg)</td></tr>
          <tr><td>La Vida Es un Carnaval (Salsa, 245 seg)</td></tr>
          <tr><td>Mi Tierra (Salsa, 198 seg)</td></tr>
          <tr><td>De Música Ligera (Rock, 260 seg)</td></tr>
          <tr><td>Rayando el Sol (Rock, 205 seg)</td></tr>
          <tr><td>La Negra Tiene Tumbao (Salsa, 240 seg)</td></tr>
          <tr><td>Persiana Americana (Rock, 190 seg)</td></tr>
          <tr><td>Mi Buen Amor (Pop, 205 seg)</td></tr>
          <tr><td>Oye Mi Amor (Rock, 215 seg)</td></tr>
          <tr><td>Cuando Pase el Temblor (Rock, 230 seg)</td></tr>
        </tbody></table>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code>CONCAT()</code> es una función, igual que <code>COUNT()</code> o <code>AVG()</code>, así que el
        resultado necesita un alias con <code>AS</code> para tener un nombre de columna legible. Sin el
        alias, MySQL nombra la columna con el texto completo de la función, incómodo de leer.
      </p>
    </div>
  </div>

  <!-- ===================== 9. HAVING ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>9. HAVING: filtrar grupos</h3>
    </div>
    <p>
      <code>WHERE</code> filtra filas <strong>antes</strong> de agrupar, así que no puede usar funciones de
      agregación como <code>COUNT()</code> o <code>AVG()</code>. <code>HAVING</code> filtra
      <strong>después</strong> de que <code>GROUP BY</code> arma los grupos, así que sí puede usar esas
      funciones en su condición.
    </p>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">08_having.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Géneros con 3 o más canciones
SELECT genero, COUNT(*) AS total
FROM tbl_canciones
GROUP BY genero
HAVING COUNT(*) >= 3;

-- Álbumes cuyo promedio de reproducciones supera los 10 millones
SELECT id_album, COUNT(*) AS total_canciones, AVG(reproducciones) AS promedio_reproducciones
FROM tbl_canciones
GROUP BY id_album
HAVING AVG(reproducciones) > 10000000;</code></pre>
    </div>

    <div class="query-result-block">
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: géneros con 3 o más canciones</div>
        <table><thead><tr><th>genero</th><th>total</th></tr></thead><tbody>
          <tr><td>Salsa</td><td>3</td></tr>
          <tr><td>Rock</td><td>5</td></tr>
        </tbody></table>
      </div>
      <div class="query-result-item">
        <div class="query-result-caption">Resultado: álbumes con promedio mayor a 10 millones</div>
        <table><thead><tr><th>id_album</th><th>total_canciones</th><th>promedio_reproducciones</th></tr></thead><tbody>
          <tr><td>2</td><td>2</td><td>10600000</td></tr>
          <tr><td>4</td><td>2</td><td>10990000</td></tr>
        </tbody></table>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Paso a paso de la primera consulta:</strong></p>
      <ol style="margin:0 0 0.8rem; padding-left:1.2rem; color:var(--text);">
        <li><code>FROM tbl_canciones</code>: SQL parte de las 10 filas de la tabla completa.</li>
        <li><code>GROUP BY genero</code>: SQL junta esas 10 filas en 3 grupos según el valor de <code>genero</code>:
          un grupo "Pop" (2 filas), un grupo "Salsa" (3 filas), un grupo "Rock" (5 filas).</li>
        <li><code>COUNT(*) AS total</code>: dentro de cada grupo, SQL cuenta cuántas filas quedaron.
          Resultado por grupo: Pop = 2, Salsa = 3, Rock = 5.</li>
        <li><code>HAVING COUNT(*) >= 3</code>: con cada grupo ya contado, SQL revisa ese conteo y descarta
          los grupos que no cumplan la condición. Pop (2) no pasa, se elimina. Salsa (3) y Rock (5) sí pasan.</li>
      </ol>
      <p style="margin:0;">
        Resultado final: solo 2 filas, Salsa (3) y Rock (5). La segunda consulta funciona igual pero agrupando
        por álbum: el álbum 2 (10.6M de promedio) y el álbum 4 (10.99M) pasan el filtro, mientras que el
        álbum 1 (9.2M) y el álbum 3 (4.75M) quedan fuera por no superar los 10 millones.
      </p>
    </div>
  </div>

  <!-- ===================== 10. NORMALIZACIÓN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>10. Normalización: 1FN, 2FN y 3FN</h3>
    </div>
    <p>
      <strong>Normalizar</strong> es el proceso de organizar las tablas de una base de datos para que cada
      dato viva en un solo lugar, sin repetirse ni contradecirse entre filas. No es una preferencia de
      estilo: una base de datos mal normalizada desperdicia espacio guardando lo mismo una y otra vez, se
      vuelve fácil de corromper (si el mismo dato vive en varias filas, alguna se actualiza y otra se
      queda desactualizada, y ya no coinciden), y complica hasta las consultas más simples. Por eso existen
      reglas concretas y verificables, no solo "buenas intenciones": se llaman <strong>formas
      normales</strong>.
    </p>

    <div class="content-box">
      <p style="margin:0 0 0.8rem; text-align:center;"><strong>Así se ve el problema, y así se ve la solución:</strong></p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center;">
        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#c44444; text-align:center;">✗ Sin normalizar</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.72rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.5rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">tbl_canciones</th></tr>
              <tr>
                <th style="padding:0.3rem 0.5rem; background:#c44444; color:#fff; text-align:left;">titulo</th>
                <th style="padding:0.3rem 0.5rem; background:#c44444; color:#fff; text-align:left;">artista</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Tres Deseos</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Gloria Estefan</td></tr>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Mi Tierra</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Gloria Estefan</td></tr>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Mi Buen Amor</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Gloria Stefan</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.72rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
            Mismo artista, escrito distinto. ¿Cuál es el correcto?
          </p>
        </div>

        <div style="font-size:1.6rem; color:var(--text-dim); flex-shrink:0;">&rarr;</div>

        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#6f9d7c; text-align:center;">✓ Normalizado</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.72rem; width:100%; margin-bottom:0.5rem;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.5rem; background:#8b7fb8; color:#fff; text-align:left;">tbl_artistas</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border); color:#6f9d7c; font-weight:700;">Gloria Estefan</td></tr>
            </tbody>
          </table>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.72rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.5rem; background:#4a7a63; color:#fff; text-align:left; font-size:0.68rem;">tbl_canciones</th></tr>
              <tr><th style="padding:0.3rem 0.5rem; background:var(--accent); color:#fff; text-align:left;">titulo</th><th style="padding:0.3rem 0.5rem; background:var(--accent); color:#fff; text-align:left;">id_artista</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Tres Deseos</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">1</td></tr>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Mi Tierra</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">1</td></tr>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Mi Buen Amor</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">1</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.72rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
            El nombre vive una sola vez. Imposible que se contradiga.
          </p>
        </div>
      </div>
    </div>

    <div class="content-box" style="border-left:4px solid #5b7c99; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#5b7c99;">Primera Forma Normal (1FN): Valores atómicos</h4>
      <ul style="margin:0 0 0.8rem; padding-left:1.2rem; color:var(--text);">
        <li>Cada celda debe tener un solo valor (atómico).</li>
        <li>No se permiten listas ni valores repetidos dentro de una misma columna.</li>
        <li>Cada fila debe poder identificarse con una llave primaria única.</li>
      </ul>
    </div>

    <div class="content-box" style="border-left:4px solid #5b7c99; margin-top:1rem;">
      <p style="margin:0 0 0.8rem; text-align:center;"><strong style="color:#5b7c99;">Ejemplo de 1FN: sin normalizar &rarr; normalizado</strong></p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center;">
        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#c44444; text-align:center;">✗ Sin normalizar</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.72rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.5rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">tbl_canciones</th></tr>
              <tr>
                <th style="padding:0.3rem 0.5rem; background:#c44444; color:#fff; text-align:left;">titulo</th>
                <th style="padding:0.3rem 0.5rem; background:#c44444; color:#fff; text-align:left;">generos</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Mi Tierra</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border); color:#c44444; font-weight:700;">'Salsa, Pop'</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            Dos géneros metidos en una sola celda: rompe el <strong>primer paso</strong> (no es un valor
            atómico) y el <strong>segundo</strong> (es una lista dentro de una columna).
          </p>
        </div>

        <div style="font-size:1.6rem; color:var(--text-dim); flex-shrink:0;">&rarr;</div>

        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#5b7c99; text-align:center;">✓ Normalizado</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.72rem; width:100%; margin-bottom:0.5rem;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.5rem; background:var(--accent); color:#fff; text-align:left;">tbl_canciones</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">id_cancion</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">titulo</td></tr>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Mi Tierra</td></tr>
            </tbody>
          </table>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.72rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.5rem; background:#3d5a70; color:#fff; text-align:left; font-size:0.68rem;">cancion_genero</th></tr>
              <tr><th style="padding:0.3rem 0.5rem; background:#5b7c99; color:#fff; text-align:left;">id_cancion (FK)</th><th style="padding:0.3rem 0.5rem; background:#5b7c99; color:#fff; text-align:left;">genero</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Salsa</td></tr>
              <tr><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.5rem; border:1px solid var(--border);">Pop</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            Un género por fila: cumple el <strong>primer y segundo paso</strong> (valor atómico, sin
            listas). <code>cancion_genero</code> conecta con <code>tbl_canciones</code> mediante
            <code>id_cancion</code> como llave foránea (FK).
          </p>
        </div>
      </div>
    </div>

    <div class="numbered-grid" style="grid-template-columns: 1fr; max-width:460px; margin:1rem auto 0;">
      <div class="flip-card" style="min-height:300px;">
        <div class="flip-card-inner" style="min-height:300px;">
          <div class="flip-card-front numbered-card">
            <p style="margin:0 0 0.5rem; font-weight:700; color:#c44444; font-size:0.85rem;">✗ Esto viola 1FN</p>
            <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.72rem; width:100%;">
              <thead>
                <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">tbl_canciones</th></tr>
                <tr>
                  <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">titulo</th>
                  <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">generos</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Mi Tierra</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">'Salsa, Pop'</td></tr>
              </tbody>
            </table>
            <span class="flip-hint">Toca para ver cómo se soluciona &rarr;</span>
          </div>
          <div class="flip-card-back">
            <p style="font-weight:700; margin-bottom:0.5rem;">✓ Solución</p>
            <p>Se crea una tabla puente <code>cancion_genero</code> con una fila por cada combinación
            canción + género (una para "Mi Tierra" + "Salsa", otra para "Mi Tierra" + "Pop"). Su columna
            <code>id_cancion</code> es una llave foránea hacia <code>tbl_canciones.id_cancion</code>, esa FK
            es la que conecta ambas tablas.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box" style="border-left:4px solid #7fa5a3; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#5f8582;">Segunda Forma Normal (2FN): Dependencia completa de la llave</h4>
      <ul style="margin:0 0 0.8rem; padding-left:1.2rem; color:var(--text);">
        <li>Debe cumplir primero con 1FN.</li>
        <li>Todos los campos que no son clave deben depender por completo de la clave principal.</li>
        <li>Se deben quitar las dependencias parciales.</li>
      </ul>
    </div>

    <div class="content-box" style="border-left:4px solid #7fa5a3; margin-top:1rem;">
      <p style="margin:0 0 0.8rem; text-align:center;"><strong style="color:#5f8582;">Ejemplo de 2FN: sin normalizar &rarr; normalizado</strong></p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center;">
        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#c44444; text-align:center;">✗ Sin normalizar</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="3" style="padding:0.3rem 0.4rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">cancion_genero</th></tr>
              <tr>
                <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_cancion</th>
                <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">genero</th>
                <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">titulo</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Salsa</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Mi Tierra</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Pop</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Mi Tierra</td></tr>
            </tbody>
          </table>
          <ol style="margin:0.4rem 0 0; padding-left:1.1rem; font-size:0.72rem; color:var(--text-dim); text-align:left;">
            <li>Cumple 1FN: cada celda es atómica (un solo valor), sin listas.</li>
            <li>Cumple el paso 2: <code>id_cancion</code> y <code>genero</code> son la llave compuesta; ninguna de las dos "depende" de la otra, juntas identifican la fila.</li>
            <li>Rompe el paso 3: ¿<code>titulo</code> depende por completo de la pareja <code>(id_cancion, genero)</code>? No, "Mi Tierra" se repite igual sin importar el género, solo depende de <code>id_cancion</code>.</li>
          </ol>
        </div>

        <div style="font-size:1.6rem; color:var(--text-dim); flex-shrink:0;">&rarr;</div>

        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#5f8582; text-align:center;">✓ Normalizado</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%; margin-bottom:0.5rem;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:var(--accent); color:#fff; text-align:left;">tbl_canciones</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">id_cancion</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">titulo</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#5f8582; font-weight:700;">Mi Tierra</td></tr>
            </tbody>
          </table>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:#5f8582; color:#fff; text-align:left; font-size:0.68rem;">cancion_genero</th></tr>
              <tr>
                <th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">id_cancion</th>
                <th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">genero</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Salsa</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Pop</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            El título vive una sola vez: cumple el <strong>tercer paso</strong>, porque cada columna de
            <code>cancion_genero</code> (<code>id_cancion</code>, <code>genero</code>) depende de la llave
            completa.
          </p>
        </div>
      </div>
    </div>

    <div class="numbered-grid" style="grid-template-columns: 1fr; max-width:460px; margin:1rem auto 0;">
      <div class="flip-card" style="min-height:300px;">
        <div class="flip-card-inner" style="min-height:300px;">
          <div class="flip-card-front numbered-card">
            <p style="margin:0 0 0.5rem; font-weight:700; color:#c44444; font-size:0.85rem;">✗ Esto viola 2FN</p>
            <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.68rem; width:100%;">
              <thead>
                <tr><th colspan="3" style="padding:0.3rem 0.35rem; background:#8a3030; color:#fff; text-align:left; font-size:0.62rem;">cancion_genero</th></tr>
                <tr>
                  <th style="padding:0.3rem 0.35rem; background:#c44444; color:#fff; text-align:left;">id_cancion</th>
                  <th style="padding:0.3rem 0.35rem; background:#c44444; color:#fff; text-align:left;">genero</th>
                  <th style="padding:0.3rem 0.35rem; background:#c44444; color:#fff; text-align:left;">titulo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="padding:0.3rem 0.35rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.35rem; border:1px solid var(--border);">Salsa</td><td style="padding:0.3rem 0.35rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Mi Tierra</td></tr>
              </tbody>
            </table>
            <span class="flip-hint">Toca para ver cómo se soluciona &rarr;</span>
          </div>
          <div class="flip-card-back">
            <p style="font-weight:700; margin-bottom:0.5rem;">✓ Solución</p>
            <p><code>titulo</code> se quita de <code>cancion_genero</code> por completo: solo vive en
            <code>tbl_canciones</code>. Si necesitas el título junto con el género, lo consultas con un
            <code>JOIN</code> entre las dos tablas, tema de la próxima clase.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box" style="border-left:4px solid #8b7fb8; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#8b7fb8;">Tercera Forma Normal (3FN): Sin dependencias transitivas</h4>
      <ul style="margin:0 0 0.8rem; padding-left:1.2rem; color:var(--text);">
        <li>Debe cumplir primero con 2FN.</li>
        <li>Ninguna columna que no sea llave puede depender de otra columna que tampoco sea llave.</li>
        <li>Toda columna no clave debe depender únicamente de la llave primaria, sin intermediarios.</li>
      </ul>
    </div>

    <div class="content-box" style="border-left:4px solid #8b7fb8; margin-top:1rem;">
      <p style="margin:0 0 0.8rem; text-align:center;"><strong style="color:#8b7fb8;">Ejemplo de 3FN: sin normalizar &rarr; normalizado</strong></p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center;">
        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#c44444; text-align:center;">✗ Sin normalizar</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="4" style="padding:0.3rem 0.4rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">tbl_albumes</th></tr>
              <tr>
                <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_album</th>
                <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">titulo_album</th>
                <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_artista (FK)</th>
                <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">pais_artista</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Abriendo Puertas</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">3</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Cuba</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">2</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Alma Caribeña</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">3</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Cuba</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            "Cuba" repetido: rompe el <strong>segundo paso</strong>, porque <code>pais_artista</code>
            depende de <code>id_artista</code> (otra columna no clave), no directamente de
            <code>id_album</code>. Es una dependencia "transitiva".
          </p>
        </div>

        <div style="font-size:1.6rem; color:var(--text-dim); flex-shrink:0;">&rarr;</div>

        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#8b7fb8; text-align:center;">✓ Normalizado</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%; margin-bottom:0.5rem;">
            <thead>
              <tr><th colspan="3" style="padding:0.3rem 0.4rem; background:#6b5f96; color:#fff; text-align:left; font-size:0.68rem;">tbl_albumes</th></tr>
              <tr>
                <th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">id_album</th>
                <th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">titulo_album</th>
                <th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">id_artista (FK)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Abriendo Puertas</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">3</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">2</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Alma Caribeña</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">3</td></tr>
            </tbody>
          </table>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:var(--accent); color:#fff; text-align:left;">tbl_artistas</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">id_artista</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">pais</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">3</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#8b7fb8; font-weight:700;">Cuba</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            El país vive una sola vez, junto al artista: cumple el <strong>segundo y tercer paso</strong>,
            porque <code>pais</code> depende directamente de <code>id_artista</code>, su llave primaria.
          </p>
        </div>
      </div>
    </div>

    <div class="numbered-grid" style="grid-template-columns: 1fr; max-width:460px; margin:1rem auto 0;">
      <div class="flip-card" style="min-height:300px;">
        <div class="flip-card-inner" style="min-height:300px;">
          <div class="flip-card-front numbered-card">
            <p style="margin:0 0 0.5rem; font-weight:700; color:#c44444; font-size:0.85rem;">✗ Esto viola 3FN</p>
            <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
              <thead>
                <tr><th colspan="4" style="padding:0.3rem 0.4rem; background:#8a3030; color:#fff; text-align:left; font-size:0.65rem;">tbl_albumes</th></tr>
                <tr>
                  <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_album</th>
                  <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">titulo_album</th>
                  <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_artista (FK)</th>
                  <th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">pais_artista</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Abriendo Puertas</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">3</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Cuba</td></tr>
              </tbody>
            </table>
            <span class="flip-hint">Toca para ver cómo se soluciona &rarr;</span>
          </div>
          <div class="flip-card-back">
            <p style="font-weight:700; margin-bottom:0.5rem;">✓ Solución</p>
            <p><code>pais_artista</code> se quita de <code>tbl_albumes</code>: el país ya vive en
            <code>tbl_artistas.pais</code>, porque depende del artista, no del álbum. Para consultarlo
            junto con el álbum, se usa un <code>JOIN</code> hasta <code>tbl_artistas</code>.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        Las tres reglas juntas dicen lo mismo desde ángulos distintos: <strong>cada dato debe vivir en un
        solo lugar, y ese lugar debe ser el correcto según de qué depende realmente ese dato.</strong>
        <code>tbl_artistas</code>, <code>tbl_albumes</code> y <code>tbl_canciones</code> cumplen las tres a
        la vez.
      </p>
    </div>
  </div>

  <!-- ===================== QUIZ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Quiz rápido de autoevaluación</h3>
    </div>
    <div class="quiz-box">
      <div class="quiz-question">
        <p>1. ¿Qué hace <code>SELECT DISTINCT genero FROM tbl_canciones;</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Cuenta cuántas canciones hay por género</button>
          <button type="button" class="quiz-option" data-correct="true">Devuelve cada género una sola vez, sin repetir</button>
          <button type="button" class="quiz-option" data-correct="false">Ordena las canciones por género</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Por qué no se debe filtrar con <code>WHERE reproducciones = NULL</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Es un error de sintaxis y no corre</button>
          <button type="button" class="quiz-option" data-correct="true">NULL es "desconocido", por lo que la comparación nunca es verdadera; hay que usar IS NULL</button>
          <button type="button" class="quiz-option" data-correct="false">Sí se debe usar, es la forma correcta</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Cómo limitas un resultado a solo 3 filas en MySQL?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false"><code>SELECT TOP 3 ...</code></button>
          <button type="button" class="quiz-option" data-correct="true"><code>... ORDER BY columna DESC LIMIT 3</code></button>
          <button type="button" class="quiz-option" data-correct="false"><code>SELECT FIRST 3 ...</code></button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Qué patrón usarías con <code>LIKE</code> para buscar títulos que contengan la palabra "Amor" en cualquier parte?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false"><code>'Amor%'</code></button>
          <button type="button" class="quiz-option" data-correct="false"><code>'_Amor_'</code></button>
          <button type="button" class="quiz-option" data-correct="true"><code>'%Amor%'</code></button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué hace <code>COUNT(reproducciones)</code> distinto de <code>COUNT(*)</code> en nuestra tabla?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Da exactamente el mismo resultado</button>
          <button type="button" class="quiz-option" data-correct="true">Cuenta solo las filas donde reproducciones NO es NULL (8, no 10)</button>
          <button type="button" class="quiz-option" data-correct="false">Suma el total de reproducciones</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. ¿Qué hace <code>AS</code> en una consulta SQL?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Cambia el nombre real de la columna en la tabla</button>
          <button type="button" class="quiz-option" data-correct="true">Le pone un alias a una columna o tabla, solo para el resultado</button>
          <button type="button" class="quiz-option" data-correct="false">Ordena los resultados alfabéticamente</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué habría pasado si hubiéramos guardado el nombre del artista como texto libre directamente en <code>tbl_canciones</code>, en vez de crear <code>tbl_artistas</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Nada, es exactamente igual de correcto</button>
          <button type="button" class="quiz-option" data-correct="true">El nombre quedaría repetido en cada canción, con riesgo de escribirse distinto (typos) en cada fila</button>
          <button type="button" class="quiz-option" data-correct="false">MySQL no permitiría guardar texto repetido</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. Una tabla <code>canciones</code> tiene una columna <code>generos</code> con el valor <code>'Salsa, Pop'</code> en una sola celda. ¿Qué regla de normalización viola?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">1FN, porque la columna no guarda un valor atómico</button>
          <button type="button" class="quiz-option" data-correct="false">2FN, porque la llave primaria no es compuesta</button>
          <button type="button" class="quiz-option" data-correct="false">Ninguna, es una forma válida de guardar varios géneros</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. En <code>cancion_genero</code> (PK compuesta: id_cancion + genero), ¿por qué agregar una columna <code>titulo</code> violaría 2FN?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque los títulos no se pueden repetir en SQL</button>
          <button type="button" class="quiz-option" data-correct="true">Porque titulo depende solo de id_cancion, no de la llave completa (id_cancion + genero)</button>
          <button type="button" class="quiz-option" data-correct="false">Porque esa tabla no puede tener más de dos columnas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. Si <code>tbl_albumes</code> tuviera una columna <code>pais_artista</code>, ¿qué regla violaría y por qué?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">1FN, porque pais_artista no es un valor atómico</button>
          <button type="button" class="quiz-option" data-correct="true">3FN, porque pais_artista depende de id_artista (otra columna no clave), no de id_album</button>
          <button type="button" class="quiz-option" data-correct="false">No viola ninguna regla, es información útil de tener ahí</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>
    </div>
  </div>

  <!-- ===================== PRÁCTICA GUIADA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Práctica: escribe tus propias consultas</h3>
    </div>
    <p>
      Con lo visto en esta clase, escribe el <code>SELECT</code> que resuelva cada uno de estos casos sobre
      <code>tbl_canciones</code>. No se incluyen las respuestas: la idea es que practiques y las corras tú
      mismo en tu DBMS.
    </p>

    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#6f9d7c;">Fáciles</h4>
      <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Muestra el título y el género de todas las canciones, ordenadas alfabéticamente por título.</li>
        <li>¿Cuáles son los géneros distintos que maneja SoundFlow en esta muestra?</li>
        <li>Muestra las canciones que todavía no tienen dato de reproducciones.</li>
        <li>¿Cuántas canciones hay en total en <code>tbl_canciones</code>?</li>
        <li>Muestra las 5 canciones más escuchadas, de mayor a menor número de reproducciones.</li>
      </ol>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">Mediana complejidad</h4>
      <ol start="6" style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Muestra el título y el género de las canciones cuyo título contenga la palabra "Amor".</li>
        <li>Arma una sola columna llamada <code>ficha</code> que junte el título y el género de cada
          canción, separados por un guion.</li>
        <li>Muestra cuántas canciones hay por género, pero solo de los géneros con más de 2 canciones.</li>
        <li>Muestra el promedio de reproducciones por álbum, solo para los álbumes cuyo promedio supere
          los 8 millones.</li>
        <li>Muestra el título, el género y la duración de las canciones de género "Pop" o "Rock" que duren
          entre 200 y 250 segundos, ordenadas de mayor a menor duración.</li>
        <li>Muestra el top 3 de canciones de género "Pop" o "Salsa", con al menos 5 millones de
          reproducciones, ordenadas de la más a la menos escuchada, con nombres de columna legibles
          (la canción como "cancion" y las reproducciones como "total_reproducciones").</li>
        <li>¿Cuántas canciones tiene cada álbum, y cuál es su promedio de reproducciones?</li>
      </ol>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="font-size:0.85rem; color:var(--text-dim);">
      · MySQL 8.0 Reference Manual, Aggregate Function Descriptions. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, Pattern Matching (LIKE). dev.mysql.com
    </p>
  </div>

`;

window.WEEK_CONTENT_2_2 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">¿Qué es una estructura de datos?</h2>

  <!-- ===================== 0. ¿QUÉ ES UNA ESTRUCTURA DE DATOS? ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <p>
      Una <strong>estructura de datos</strong> es una forma de organizar y guardar datos en la memoria de
      una computadora, para poder usarlos de manera eficiente. No basta con "guardar" la información:
      <strong>cómo</strong> la guardas determina qué tan rápido puedes buscarla, agregar algo nuevo,
      eliminar algo, o recorrerla completa.
    </p>
    <p>
      Piénsalo como organizar un clóset: puedes tirar toda la ropa en un montón (funciona, pero buscar algo
      es lento), o puedes colgarla por tipo y color (toma más trabajo organizarla, pero encontrar lo que
      necesitas es inmediato). Las estructuras de datos son justamente eso: distintas formas de "acomodar
      el clóset" según qué necesites hacer con la información después.
    </p>

    <svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <rect x="10" y="10" width="320" height="320" rx="12" fill="none" stroke="#c44444" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="170" y="40" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="15" font-weight="700" fill="#c44444">Montón desordenado</text>

      <rect x="60" y="65" width="50" height="35" rx="6" fill="#c99a4e" transform="rotate(15 85 82)"/>
      <rect x="150" y="55" width="45" height="40" rx="6" fill="#5b7c99" transform="rotate(-20 172 75)"/>
      <rect x="220" y="85" width="55" height="30" rx="6" fill="#7fa5a3" transform="rotate(10 247 100)"/>
      <rect x="90" y="125" width="48" height="38" rx="6" fill="#8b7fb8" transform="rotate(-8 114 144)"/>
      <rect x="180" y="135" width="50" height="35" rx="6" fill="#c44444" transform="rotate(25 205 152)"/>
      <rect x="50" y="185" width="45" height="40" rx="6" fill="#5b9aa0" transform="rotate(-15 72 205)"/>
      <rect x="140" y="195" width="55" height="30" rx="6" fill="#c99a4e" transform="rotate(18 167 210)"/>
      <rect x="220" y="175" width="48" height="38" rx="6" fill="#5b7c99" transform="rotate(-12 244 194)"/>
      <rect x="80" y="245" width="50" height="35" rx="6" fill="#8b7fb8" transform="rotate(8 105 262)"/>
      <rect x="180" y="250" width="45" height="40" rx="6" fill="#7fa5a3" transform="rotate(-22 202 270)"/>
      <text x="170" y="320" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-style="italic" fill="var(--text-dim)">buscar algo aquí: lento</text>

      <text x="350" y="180" text-anchor="middle" font-size="26" fill="var(--text-dim)">&rarr;</text>

      <rect x="370" y="10" width="320" height="320" rx="12" fill="none" stroke="#6f9d7c" stroke-width="2"/>
      <text x="530" y="40" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="15" font-weight="700" fill="#6f9d7c">Organizado por tipo y color</text>

      <rect x="395" y="65" width="40" height="30" rx="6" fill="#5b7c99"/>
      <rect x="445" y="65" width="40" height="30" rx="6" fill="#5b7c99"/>
      <rect x="495" y="65" width="40" height="30" rx="6" fill="#5b7c99"/>
      <rect x="545" y="65" width="40" height="30" rx="6" fill="#5b7c99"/>
      <rect x="595" y="65" width="40" height="30" rx="6" fill="#5b7c99"/>

      <rect x="395" y="110" width="40" height="30" rx="6" fill="#7fa5a3"/>
      <rect x="445" y="110" width="40" height="30" rx="6" fill="#7fa5a3"/>
      <rect x="495" y="110" width="40" height="30" rx="6" fill="#7fa5a3"/>
      <rect x="545" y="110" width="40" height="30" rx="6" fill="#7fa5a3"/>

      <rect x="395" y="155" width="40" height="30" rx="6" fill="#8b7fb8"/>
      <rect x="445" y="155" width="40" height="30" rx="6" fill="#8b7fb8"/>
      <rect x="495" y="155" width="40" height="30" rx="6" fill="#8b7fb8"/>

      <rect x="395" y="200" width="40" height="30" rx="6" fill="#c99a4e"/>
      <rect x="445" y="200" width="40" height="30" rx="6" fill="#c99a4e"/>
      <rect x="495" y="200" width="40" height="30" rx="6" fill="#c99a4e"/>
      <rect x="545" y="200" width="40" height="30" rx="6" fill="#c99a4e"/>

      <rect x="395" y="245" width="40" height="30" rx="6" fill="#c44444"/>
      <rect x="445" y="245" width="40" height="30" rx="6" fill="#c44444"/>

      <text x="530" y="320" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-style="italic" fill="var(--text-dim)">buscar algo aquí: inmediato</text>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Ya usaste estructuras de datos sin llamarlas así: un <code>arreglo</code> o una <code>lista</code>
        (las filas de una tabla SQL, por ejemplo) es una estructura de datos <strong>lineal</strong>. Hoy
        vamos a profundizar en varias estructuras lineales, arreglos, listas enlazadas, pilas y colas, y a
        conocer una <strong>no lineal</strong>: los grafos.
      </p>
    </div>
  </div>

  <!-- ===================== 0.1 INTRO LINEALES VS NO LINEALES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Lineales vs. no lineales</h3>
    </div>
    <p>
      Hasta ahora hemos trabajado con datos que se acomodan bien en filas: una tabla es, en el fondo, una
      lista de registros, uno detrás de otro. Esas son <strong>estructuras lineales</strong>: cada elemento
      tiene un elemento anterior y uno siguiente, en un solo orden posible.
    </p>

    <svg viewBox="0 0 700 170" xmlns="http://www.w3.org/2000/svg" style="max-width:620px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <defs>
        <marker id="flecha1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)"/>
        </marker>
      </defs>

      <rect x="10" y="55" width="100" height="60" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="60" y="90" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">Fila 1</text>

      <rect x="150" y="55" width="100" height="60" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="200" y="90" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">Fila 2</text>

      <rect x="290" y="55" width="100" height="60" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="340" y="90" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">Fila 3</text>

      <rect x="430" y="55" width="100" height="60" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="480" y="90" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">Fila 4</text>

      <rect x="570" y="55" width="100" height="60" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="620" y="90" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">Fila 5</text>

      <line x1="112" y1="85" x2="148" y2="85" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flecha1)"/>
      <line x1="252" y1="85" x2="288" y2="85" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flecha1)"/>
      <line x1="392" y1="85" x2="428" y2="85" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flecha1)"/>
      <line x1="532" y1="85" x2="568" y2="85" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flecha1)"/>

      <line x1="290" y1="35" x2="390" y2="35" stroke="#6f9d7c" stroke-width="1.5" marker-end="url(#flecha1)"/>
      <text x="340" y="25" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#6f9d7c">siguiente</text>

      <line x1="390" y1="140" x2="290" y2="140" stroke="#c99a4e" stroke-width="1.5" marker-end="url(#flecha1)"/>
      <text x="340" y="158" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#c99a4e">anterior</text>
    </svg>
    <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
      Un solo orden posible: de la Fila 1 a la Fila 5, cada una sabe cuál es la anterior y cuál es la
      siguiente.
    </p>

    <p>
      Pero no toda la información de SoundFlow se comporta así. ¿Qué usuario escuchó qué canción? Esa
      pregunta no tiene una sola "fila siguiente": tiene <strong>relaciones</strong> que se ramifican y se
      cruzan entre usuarios y canciones. Para eso existen las <strong>estructuras no lineales</strong>,
      empezando por los grafos.
    </p>
  </div>

  <!-- ===================== 1. TEORÍA DE GRAFOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>1. Teoría de grafos: nodos y aristas</h3>
    </div>
    <p>
      Un <strong>grafo</strong> es un conjunto de <strong>nodos</strong> (también llamados vértices)
      conectados entre sí por <strong>aristas</strong> (también llamadas conexiones o enlaces). Un nodo
      representa una entidad: un usuario, una canción, un artista. Una arista representa una
      <strong>relación</strong> entre dos nodos: quién reprodujo qué, quién sigue a quién, qué canciones
      pertenecen al mismo álbum.
    </p>

    <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" style="max-width:420px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <line x1="250" y1="60" x2="120" y2="150" stroke="var(--text-dim)" stroke-width="2"/>
      <line x1="250" y1="60" x2="380" y2="150" stroke="var(--text-dim)" stroke-width="2"/>
      <line x1="120" y1="150" x2="250" y2="210" stroke="var(--text-dim)" stroke-width="2"/>
      <line x1="380" y1="150" x2="250" y2="210" stroke="var(--text-dim)" stroke-width="2"/>
      <line x1="120" y1="150" x2="380" y2="150" stroke="var(--text-dim)" stroke-width="2"/>

      <text x="185" y="98" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#6f9d7c" font-weight="700">arista</text>

      <circle cx="250" cy="60" r="26" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <text x="250" y="65" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">A</text>

      <circle cx="120" cy="150" r="26" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <text x="120" y="155" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">B</text>

      <circle cx="380" cy="150" r="26" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <text x="380" y="155" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">C</text>

      <circle cx="250" cy="210" r="26" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <text x="250" y="215" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text)">D</text>

      <text x="250" y="30" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="var(--accent)" font-weight="700">nodo</text>
    </svg>
    <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
      4 nodos (A, B, C, D) conectados por 5 aristas. Cada círculo es una entidad; cada línea, una relación
      entre dos entidades.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); margin-top:0.8rem;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Nodo (vértice)</h4>
        <p style="font-size:0.85rem;">La entidad en sí: un usuario, una canción, un artista. Es el "qué".</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7fa5a3;">Arista (conexión)</h4>
        <p style="font-size:0.85rem;">La relación entre dos nodos: quién reprodujo qué. Es el "cómo se conectan".</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Grado</h4>
        <p style="font-size:0.85rem;">Cuántas aristas tocan a un nodo. Un nodo con grado 0 está aislado, sin conexiones.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Camino</h4>
        <p style="font-size:0.85rem;">Una secuencia de aristas que conecta un nodo con otro, pasando por nodos intermedios.</p>
      </div>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        <strong>El dato importante:</strong> ya construiste un grafo sin saberlo. <code>tbl_reproducciones</code>
        (la tabla puente de la Semana 2, Clase 1) conecta <code>tbl_usuarios</code> con <code>tbl_canciones</code>.
        En términos de grafos: los <strong>nodos</strong> son los usuarios y las canciones, y cada fila de
        <code>tbl_reproducciones</code> es una <strong>arista</strong> que dice "este usuario reprodujo esta
        canción".
      </p>
    </div>

    <div class="code-block" style="margin-top:1rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">grafo_reproducciones.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span style="color:var(--text-dim);">-- Las 10 filas de tbl_reproducciones, vistas como aristas de un grafo</span>
<span style="color:#c44444; font-weight:700;">U1 (Lucia)</span>     <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#8b7fb8; font-weight:700;">C101 (Tres Deseos)</span> <span style="color:var(--text-dim);">-- U1 (Lucia) tiene grado 2</span>
<span style="color:#c44444; font-weight:700;">U1 (Lucia)</span>     <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C105 (Rayando el Sol)</span>
<span style="color:#5b7c99; font-weight:700;">U2 (Camilo)</span>    <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C102 (La Vida Es un Carnaval)</span>
<span style="color:#5b7c99; font-weight:700;">U3 (Santiago)</span>  <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C104 (De Música Ligera)</span>
<span style="color:#5b7c99; font-weight:700;">U4 (Valentina)</span> <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C106 (La Negra Tiene Tumbao)</span>
<span style="color:#5b7c99; font-weight:700;">U5 (Andrés)</span>    <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#8b7fb8; font-weight:700;">C101 (Tres Deseos)</span> <span style="color:var(--text-dim);">-- C101 (Tres Deseos) tiene grado 2</span>
<span style="color:#5b7c99; font-weight:700;">U6 (Mariana)</span>   <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C107 (Persiana Americana)</span>
<span style="color:#5b7c99; font-weight:700;">U7 (Felipe)</span>    <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C108 (Mi Buen Amor)</span>
<span style="color:#5b7c99; font-weight:700;">U8 (Daniela)</span>   <span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C109 (Oye Mi Amor)</span>
<span style="color:#5b7c99; font-weight:700;">U9 (Juan Pablo)</span><span style="color:var(--text-dim);">---- reprodujo ----></span> <span style="color:#5b9aa0; font-weight:700;">C110 (Cuando Pase el Temblor)</span>

<span style="color:var(--text-dim);">-- Nodos aislados: existen en la base de datos, pero no tienen ninguna arista</span>
<span style="color:#c99a4e; font-weight:700;">U10 (Sofía)</span>      <span style="color:var(--text-dim);">-- grado 0, no ha reproducido nada</span>
<span style="color:#c99a4e; font-weight:700;">C103 (Mi Tierra)</span> <span style="color:var(--text-dim);">-- grado 0, nadie la ha reproducido</span></code></pre>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Fíjate en los grados: <strong>U1 (Lucia)</strong> tiene grado 2, porque reprodujo dos canciones.
        <strong>C101 (Tres Deseos)</strong> también tiene grado 2, porque dos usuarios distintos la
        reprodujeron (U1 y U5). En cambio, <strong>U10 (Sofía)</strong> y <strong>C103 (Mi Tierra)</strong>
        tienen grado 0: ningún usuario ha reproducido "Mi Tierra" todavía, y Sofía no ha reproducido nada.
        Son nodos aislados dentro de este grafo.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>El grafo completo y su lista de adyacencia, lado a lado:</strong> los 10 usuarios a la
        izquierda, las 10 canciones a la derecha, y una línea por cada arista (cada fila de
        <code>tbl_reproducciones</code>). A la derecha, la misma información escrita como lista de vecinos
        por nodo.
      </p>
      <div style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:flex-start; margin-top:0.6rem;">
      <div style="flex:2 1 380px; min-width:300px;">
      <svg viewBox="0 -25 600 585" xmlns="http://www.w3.org/2000/svg" style="max-width:480px; width:100%; height:auto; display:block; margin:0 auto;">
        <line x1="90" y1="34"  x2="510" y2="34"  stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="34"  x2="510" y2="250" stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="88"  x2="510" y2="88"  stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="142" x2="510" y2="196" stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="196" x2="510" y2="304" stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="250" x2="510" y2="34"  stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="304" x2="510" y2="358" stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="358" x2="510" y2="412" stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="412" x2="510" y2="466" stroke="var(--text-dim)" stroke-width="1.5"/>
        <line x1="90" y1="466" x2="510" y2="520" stroke="var(--text-dim)" stroke-width="1.5"/>

        <circle cx="90" cy="34"  r="25" fill="none" stroke="#c44444" stroke-width="3"/>
        <text x="90" y="39"  text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U1</text>
        <circle cx="90" cy="88"  r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="93"  text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U2</text>
        <circle cx="90" cy="142" r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="147" text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U3</text>
        <circle cx="90" cy="196" r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="201" text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U4</text>
        <circle cx="90" cy="250" r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="255" text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U5</text>
        <circle cx="90" cy="304" r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="309" text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U6</text>
        <circle cx="90" cy="358" r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="363" text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U7</text>
        <circle cx="90" cy="412" r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="417" text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U8</text>
        <circle cx="90" cy="466" r="25" fill="none" stroke="#5b7c99" stroke-width="3"/>
        <text x="90" y="471" text-anchor="middle" font-family="Consolas, monospace" font-size="13.5" fill="var(--text)">U9</text>
        <circle cx="90" cy="520" r="25" fill="none" stroke="#c99a4e" stroke-width="3"/>
        <text x="90" y="525" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">U10</text>

        <circle cx="510" cy="34"  r="25" fill="none" stroke="#8b7fb8" stroke-width="3"/>
        <text x="510" y="39"  text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C101</text>
        <circle cx="510" cy="88"  r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="93"  text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C102</text>
        <circle cx="510" cy="142" r="25" fill="none" stroke="#c99a4e" stroke-width="3"/>
        <text x="510" y="147" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C103</text>
        <circle cx="510" cy="196" r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="201" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C104</text>
        <circle cx="510" cy="250" r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="255" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C105</text>
        <circle cx="510" cy="304" r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="309" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C106</text>
        <circle cx="510" cy="358" r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="363" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C107</text>
        <circle cx="510" cy="412" r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="417" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C108</text>
        <circle cx="510" cy="466" r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="471" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C109</text>
        <circle cx="510" cy="520" r="25" fill="none" stroke="#5b9aa0" stroke-width="3"/>
        <text x="510" y="525" text-anchor="middle" font-family="Consolas, monospace" font-size="12.5" fill="var(--text)">C110</text>

        <text x="90" y="-8" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" fill="var(--text-dim)" font-weight="700">Usuarios</text>
        <text x="510" y="-8" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" fill="var(--text-dim)" font-weight="700">Canciones</text>
      </svg>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
        Rojo y morado: U1 y C101, los de grado 2. Dorado: U10 y C103, aislados, sin ninguna línea que
        llegue a ellos. Los demás, grado 1: una sola línea.
      </p>
      </div>

      <div style="flex:1 1 260px; min-width:260px;">
      <div class="code-block">
        <div class="code-block-header">
          <span class="code-dot" style="background:#ff5f56"></span>
          <span class="code-dot" style="background:#ffbd2e"></span>
          <span class="code-dot" style="background:#27c93f"></span>
          <span class="code-filename">lista_adyacencia.txt</span>
          <button class="code-copy-btn" type="button">Copiar</button>
        </div>
        <pre style="line-height:1;"><code style="font-size:0.72rem; line-height:1;">U1:  [C101, C105]
U2:  [C102]
U3:  [C104]
U4:  [C106]
U5:  [C101]
U6:  [C107]
U7:  [C108]
U8:  [C109]
U9:  [C110]
U10: []

C101: [U1, U5]
C102: [U2]
C103: []
C104: [U3]
C105: [U1]
C106: [U4]
C107: [U6]
C108: [U7]
C109: [U8]
C110: [U9]</code></pre>
      </div>
      <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.5rem;">
        U1 y C101 son los únicos con más de un vecino en su lista (grado 2), y U10 y C103 quedan con la
        lista vacía, coherente con que son los nodos aislados de grado 0.
      </p>
      </div>
      </div>
    </div>

  </div>

  <!-- ===================== 2. RECORRIDOS DE GRAFOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. Recorridos de grafos: BFS y DFS</h3>
    </div>
    <p>
      Recorrer un grafo significa visitar sus nodos siguiendo las aristas, para responder preguntas como
      "¿a quién puedo llegar desde aquí?". Los dos recorridos más comunes son <strong>BFS</strong>
      (Breadth-First Search, por niveles) y <strong>DFS</strong> (Depth-First Search, por profundidad).
    </p>

    <svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" style="max-width:460px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <defs>
        <marker id="flechaBFS" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)"/>
        </marker>
      </defs>

      <text x="20" y="65" font-family="Segoe UI, sans-serif" font-size="12" fill="var(--text-dim)">Nivel 0</text>
      <text x="20" y="175" font-family="Segoe UI, sans-serif" font-size="12" fill="var(--text-dim)">Nivel 1</text>
      <text x="20" y="285" font-family="Segoe UI, sans-serif" font-size="12" fill="var(--text-dim)">Nivel 2</text>

      <line x1="280" y1="90" x2="180" y2="145" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaBFS)"/>
      <line x1="280" y1="90" x2="380" y2="145" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaBFS)"/>
      <line x1="160" y1="200" x2="160" y2="250" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaBFS)"/>

      <circle cx="280" cy="60" r="30" fill="none" stroke="#c44444" stroke-width="2.5"/>
      <text x="280" y="65" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">U1</text>
      <circle cx="255" cy="30" r="11" fill="#c44444"/>
      <text x="255" y="34" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">1</text>

      <circle cx="160" cy="170" r="30" fill="none" stroke="#8b7fb8" stroke-width="2.5"/>
      <text x="160" y="175" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">C101</text>
      <circle cx="135" cy="140" r="11" fill="#8b7fb8"/>
      <text x="135" y="144" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">2</text>

      <circle cx="400" cy="170" r="30" fill="none" stroke="#5b9aa0" stroke-width="2.5"/>
      <text x="400" y="175" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">C105</text>
      <circle cx="425" cy="140" r="11" fill="#5b9aa0"/>
      <text x="425" y="144" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">3</text>

      <circle cx="160" cy="280" r="30" fill="none" stroke="#5b7c99" stroke-width="2.5"/>
      <text x="160" y="285" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">U5</text>
      <circle cx="135" cy="250" r="11" fill="#5b7c99"/>
      <text x="135" y="254" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">4</text>
    </svg>
    <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
      El número dentro del círculo pequeño indica el orden de visita: 1 (U1), 2 (C101), 3 (C105), 4 (U5).
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Aplicado a SoundFlow:</strong> para este recorrido tratamos las aristas como si se pudieran
        recorrer en ambos sentidos (no solo usuario &rarr; canción, también canción &rarr; usuario). Así se
        ve el BFS paso a paso, empezando desde <strong>U1 (Lucia)</strong>:
      </p>
      <ol style="margin:0.6rem 0 0; padding-left:1.2rem; color:var(--text);">
        <li><strong>Nivel 0:</strong> el punto de partida, U1 (Lucia).</li>
        <li><strong>Nivel 1:</strong> las canciones que Lucia reprodujo directamente, C101 (Tres Deseos) y
          C105 (Rayando el Sol).</li>
        <li><strong>Nivel 2:</strong> los usuarios que también reprodujeron esas mismas canciones. Aquí
          aparece U5 (Andrés), porque también escuchó "Tres Deseos" (C101).</li>
      </ol>
      <p style="margin-top:0.6rem;">
        BFS acaba de encontrar, en dos saltos, a alguien con gustos parecidos a los de Lucia. Así es como
        funcionan por debajo muchos sistemas de recomendación: "usuarios que escucharon esto también
        escucharon...".
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>El mismo grafo, con DFS:</strong> en vez de ir nivel por nivel, DFS se mete a fondo por una
        rama completa antes de devolverse (backtrack) a explorar la siguiente. Desde <strong>U1 (Lucia)</strong>:
      </p>

      <svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" style="max-width:460px; width:100%; height:auto; display:block; margin:1rem auto 0;">
        <defs>
          <marker id="flechaDFS" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)"/>
          </marker>
        </defs>

        <line x1="280" y1="90" x2="180" y2="145" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaDFS)"/>
        <line x1="280" y1="90" x2="380" y2="145" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaDFS)"/>
        <line x1="160" y1="200" x2="160" y2="250" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaDFS)"/>

        <circle cx="280" cy="60" r="30" fill="none" stroke="#c44444" stroke-width="2.5"/>
        <text x="280" y="65" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">U1</text>
        <circle cx="255" cy="30" r="11" fill="#c44444"/>
        <text x="255" y="34" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">1</text>

        <circle cx="160" cy="170" r="30" fill="none" stroke="#8b7fb8" stroke-width="2.5"/>
        <text x="160" y="175" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">C101</text>
        <circle cx="135" cy="140" r="11" fill="#8b7fb8"/>
        <text x="135" y="144" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">2</text>

        <circle cx="400" cy="170" r="30" fill="none" stroke="#5b9aa0" stroke-width="2.5"/>
        <text x="400" y="175" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">C105</text>
        <circle cx="425" cy="140" r="11" fill="#5b9aa0"/>
        <text x="425" y="144" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">4</text>

        <circle cx="160" cy="280" r="30" fill="none" stroke="#5b7c99" stroke-width="2.5"/>
        <text x="160" y="285" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">U5</text>
        <circle cx="135" cy="250" r="11" fill="#5b7c99"/>
        <text x="135" y="254" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#fff">3</text>
      </svg>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
        Mismo grafo, otro orden: 1 (U1), 2 (C101), 3 (U5), 4 (C105). Se mete por la rama de C101 hasta el
        final antes de pasar a C105.
      </p>

      <ol style="margin:0.6rem 0 0; padding-left:1.2rem; color:var(--text);">
        <li>Visita <strong>U1</strong>, y elige un vecino, por ejemplo <strong>C101</strong> (Tres Deseos).</li>
        <li>En vez de volver por la otra canción de U1, sigue profundizando desde C101 y llega a
          <strong>U5</strong> (Andrés).</li>
        <li>U5 ya no tiene vecinos nuevos, así que se devuelve hasta C101, y de ahí hasta U1.</li>
        <li>Solo entonces visita la canción que faltaba, <strong>C105</strong> (Rayando el Sol).</li>
      </ol>
      <p style="margin-top:0.6rem;">
        Orden de visita con DFS: <strong>U1 &rarr; C101 &rarr; U5 &rarr; C105</strong>. Compáralo con el
        orden de BFS: <strong>U1 &rarr; C101 &rarr; C105 &rarr; U5</strong>. BFS visita primero todo lo que
        está a un salto de distancia; DFS se compromete con una rama completa antes de volver.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Analogía:</strong> buscar en una fiesta a alguien que le guste la misma música que a ti.
      </p>
      <ul style="margin:0.6rem 0 0; padding-left:1.2rem; color:var(--text);">
        <li><strong>BFS:</strong> le preguntas primero a tus amigos más cercanos (nivel 1). Si ninguno
          coincide, le preguntas a los amigos de tus amigos (nivel 2), y así vas ampliando el círculo poco
          a poco. Nunca te alejas más de lo necesario, por eso siempre encuentra el camino más corto.</li>
        <li><strong>DFS:</strong> agarras a un solo amigo y le sigues la cadena completa, te lleva donde su
          amigo, ese te lleva donde el amigo de su amigo, y sigues por esa cadena hasta el final o hasta un
          callejón sin salida. Solo entonces te devuelves y pruebas por otro amigo tuyo.</li>
      </ul>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Casos reales, fuera de SoundFlow:</strong></p>
      <div style="overflow-x:auto;">
        <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
          <thead>
            <tr style="background:#232830;">
              <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Situación</th>
              <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">¿BFS o DFS?</th>
              <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Por qué</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Ruta más corta en un GPS</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); color:#5b7c99; font-weight:700;">BFS</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Necesitas la distancia mínima</td></tr>
            <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">"Amigos en común" en una red social</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); color:#5b7c99; font-weight:700;">BFS</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Te importa qué tan cerca están dos personas</td></tr>
            <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Recorrer carpetas y subcarpetas de un disco</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); color:#c44444; font-weight:700;">DFS</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Hay que agotar cada rama (subcarpeta) antes de pasar a la siguiente</td></tr>
            <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>ON DELETE CASCADE</code> en una base de datos</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); color:#c44444; font-weight:700;">DFS</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Sigue la cadena de FK hasta el final antes de terminar el borrado</td></tr>
            <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Resolver un laberinto o un sudoku</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); color:#c44444; font-weight:700;">DFS</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Prueba un camino a fondo, y se devuelve si no funciona</td></tr>
            <tr><td style="padding:0.4rem 0.7rem;">Detectar una referencia circular entre tablas</td><td style="padding:0.4rem 0.7rem; color:#c44444; font-weight:700;">DFS</td><td style="padding:0.4rem 0.7rem;">Hay que recorrer toda la cadena para toparse con el ciclo</td></tr>
          </tbody>
        </table>
      </div>
      <p style="margin-top:0.8rem; margin-bottom:0;">
        <strong>Truco rápido para decidir:</strong> si la pregunta tiene las palabras "corto", "cercano" o
        "mínimo", piensa en BFS. Si tiene "todos los caminos", "existe algún camino" o "resolver por
        partes", piensa en DFS.
      </p>
    </div>
  </div>

  <!-- ===================== 3. ARREGLOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Arreglos: acceso directo por posición</h3>
    </div>
    <p>
      Un <strong>arreglo</strong> (array) guarda sus elementos en posiciones consecutivas, cada una
      identificada por un <strong>índice</strong> numérico que empieza en 0. Su gran ventaja es el acceso
      directo: si sabes la posición, llegas al valor de inmediato, sin recorrer nada.
    </p>

    <svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" style="max-width:440px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <defs>
        <marker id="flechaArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#6f9d7c"/>
        </marker>
      </defs>

      <text x="20" y="30" font-family="Consolas, monospace" font-size="11" fill="#6f9d7c">cancionesAlbum1[0]</text>
      <line x1="55" y1="35" x2="90" y2="65" stroke="#6f9d7c" stroke-width="1.5" marker-end="url(#flechaArr)"/>

      <text x="460" y="30" text-anchor="end" font-family="Consolas, monospace" font-size="11" fill="#6f9d7c">cancionesAlbum1[2]</text>
      <line x1="410" y1="35" x2="390" y2="65" stroke="#6f9d7c" stroke-width="1.5" marker-end="url(#flechaArr)"/>

      <rect x="20" y="70" width="140" height="60" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="90" y="105" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Tres Deseos</text>

      <rect x="170" y="70" width="140" height="60" rx="6" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
      <text x="240" y="105" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Mi Tierra</text>

      <rect x="320" y="70" width="140" height="60" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="390" y="105" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Mi Buen Amor</text>

      <text x="90" y="155" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text-dim)">0</text>
      <text x="240" y="155" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text-dim)">1</text>
      <text x="390" y="155" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text-dim)">2</text>
      <text x="240" y="180" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text-dim)">índice</text>
    </svg>
    <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
      El arreglo <code>cancionesAlbum1</code>, con sus 3 posiciones (índices 0, 1 y 2).
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>La ventaja:</strong> acceder a <code>cancionesAlbum1[2]</code> toma el mismo tiempo sin
        importar si el arreglo tiene 3 o 3 millones de elementos. <strong>La desventaja:</strong> insertar
        una canción al principio significa correr todas las demás una posición hacia la derecha, y en
        muchos lenguajes el tamaño del arreglo es fijo desde que se crea.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Costo de cada operación</strong> (dónde se nota realmente la
        ventaja y la desventaja):</p>
      <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
        <div class="concept-card">
          <h4 style="color:#6f9d7c;">Acceder por índice</h4>
          <p style="font-size:0.85rem;">Inmediato, sin importar el tamaño del arreglo.</p>
        </div>
        <div class="concept-card">
          <h4 style="color:#c99a4e;">Buscar sin saber la posición</h4>
          <p style="font-size:0.85rem;">Hay que recorrer, en el peor caso, todo el arreglo.</p>
        </div>
        <div class="concept-card">
          <h4 style="color:#c44444;">Insertar o eliminar al inicio</h4>
          <p style="font-size:0.85rem;">Caro: hay que correr todos los elementos siguientes una posición.</p>
        </div>
      </div>
      <p style="margin-top:0.6rem; margin-bottom:0;">
        Otra limitación práctica: en varios lenguajes (como Java o C) el arreglo nace con un tamaño fijo. Si
        se llena, hay que crear uno nuevo más grande y copiar todo. Los "arreglos dinámicos" (como las
        listas de Python o los <code>ArrayList</code> de Java) resuelven esto por debajo, haciendo esa
        copia automáticamente cuando hace falta.
      </p>
    </div>
  </div>

  <!-- ===================== 4. LISTAS ENLAZADAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. Listas enlazadas: nodos conectados por punteros</h3>
    </div>
    <p>
      Una <strong>lista enlazada</strong> también guarda elementos uno detrás de otro, pero no en
      posiciones contiguas de memoria. Cada <strong>nodo</strong> guarda su dato y una referencia (un
      puntero) al siguiente nodo. Para llegar al tercer elemento, tienes que pasar primero por el primero y
      el segundo: no hay acceso directo por índice.
    </p>

    <svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="max-width:520px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <defs>
        <marker id="flechaLista" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)"/>
        </marker>
      </defs>

      <text x="120" y="55" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="var(--accent)" font-weight="700">nodo1</text>
      <rect x="20" y="65" width="200" height="60" rx="6" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <line x1="140" y1="65" x2="140" y2="125" stroke="var(--accent)" stroke-width="2"/>
      <text x="80" y="100" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text)">Tres Deseos</text>
      <circle cx="180" cy="95" r="6" fill="var(--accent)"/>

      <line x1="220" y1="95" x2="278" y2="95" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaLista)"/>

      <text x="380" y="55" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#7fa5a3" font-weight="700">nodo2</text>
      <rect x="280" y="65" width="200" height="60" rx="6" fill="none" stroke="#7fa5a3" stroke-width="2.5"/>
      <line x1="400" y1="65" x2="400" y2="125" stroke="#7fa5a3" stroke-width="2"/>
      <text x="340" y="100" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text)">Rayando el Sol</text>
      <circle cx="440" cy="95" r="6" fill="#7fa5a3"/>

      <line x1="480" y1="95" x2="530" y2="95" stroke="var(--text-dim)" stroke-width="2" marker-end="url(#flechaLista)"/>
      <text x="535" y="99" font-family="Consolas, monospace" font-size="12" fill="var(--text-dim)">NULL</text>

      <text x="80" y="150" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">dato</text>
      <text x="180" y="150" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">puntero</text>
    </svg>
    <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
      Historial de reproducción de U1 (Lucia): cada nodo guarda su dato y una flecha hacia el siguiente,
      hasta llegar a NULL.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Arreglo vs. lista enlazada:</strong> el arreglo es más rápido para leer por posición, pero
        más caro para insertar en medio. La lista enlazada es al revés: insertar un nodo nuevo es barato
        (solo cambias un par de punteros), pero leer el elemento en la posición 100 significa recorrer
        los 99 anteriores uno por uno.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>No todas las listas enlazadas son iguales:</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li><strong>Simplemente enlazada</strong> (la del ejemplo): cada nodo apunta solo al siguiente. Para
          ir hacia atrás, no hay forma directa, tocaría recorrer desde el principio otra vez.</li>
        <li><strong>Doblemente enlazada:</strong> cada nodo guarda dos punteros, uno al siguiente y otro al
          anterior. Ocupa un poco más de memoria por nodo, pero permite recorrer la lista en ambos
          sentidos, por ejemplo, para el botón "canción anterior" sin necesitar una pila aparte.</li>
        <li><strong>Circular:</strong> el último nodo, en vez de apuntar a NULL, apunta de vuelta al
          primero. Útil para una playlist en modo "repetir todo", donde después de la última canción se
          vuelve a la primera automáticamente.</li>
      </ul>
    </div>
  </div>

  <!-- ===================== 5. PILAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. Pilas: LIFO, el último en entrar es el primero en salir</h3>
    </div>
    <p>
      Una <strong>pila</strong> (stack) solo permite agregar y quitar elementos por un extremo, llamado el
      "tope". Sigue la lógica <strong>LIFO</strong> (Last In, First Out): lo último que entró es lo primero
      que sale, como una pila de platos.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); margin-top:0.8rem;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">push</h4>
        <p style="font-size:0.85rem;">Agrega un elemento en el tope de la pila.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7fa5a3;">pop</h4>
        <p style="font-size:0.85rem;">Quita y devuelve el elemento del tope, el último que entró.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">peek / top</h4>
        <p style="font-size:0.85rem;">Consulta el elemento del tope sin quitarlo.</p>
      </div>
    </div>

    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="max-width:340px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <defs>
        <marker id="flechaPila" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)"/>
        </marker>
      </defs>

      <text x="120" y="30" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#6f9d7c" font-weight="700">push</text>
      <line x1="120" y1="38" x2="120" y2="88" stroke="#6f9d7c" stroke-width="2" marker-end="url(#flechaPila)"/>

      <text x="260" y="30" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#c44444" font-weight="700">pop</text>
      <line x1="260" y1="88" x2="260" y2="38" stroke="#c44444" stroke-width="2" marker-end="url(#flechaPila)"/>

      <rect x="60" y="90" width="160" height="55" rx="6" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <text x="140" y="123" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Rayando el Sol</text>
      <text x="240" y="123" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text-dim)">&larr; tope</text>

      <rect x="60" y="150" width="160" height="55" rx="6" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
      <text x="140" y="183" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Tres Deseos</text>

      <line x1="50" y1="207" x2="230" y2="207" stroke="var(--text-dim)" stroke-width="3"/>
      <text x="140" y="230" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text-dim)">fondo de la pila</text>
    </svg>
    <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
      "Rayando el Sol" entró de último con <code>push</code>, así que queda en el tope, y es lo primero que
      sale con <code>pop</code>.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Cada vez que reproduces una canción nueva, se apila. Cuando presionas "anterior", la app hace
        <code>pop()</code> y te devuelve la última que escuchaste, no la primera. Así funciona también el
        botón "deshacer" en la mayoría de aplicaciones.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Otras aplicaciones reales de las pilas:</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li><strong>La pila de llamadas (call stack):</strong> cada vez que una función llama a otra
          función, el programa "apila" dónde debe volver. Cuando una función termina, hace <code>pop()</code>
          y regresa exactamente a donde se quedó la anterior. Así funciona la recursión por debajo.</li>
        <li><strong>Verificar paréntesis balanceados:</strong> al leer una expresión como
          <code>((a + b) * c)</code>, cada <code>(</code> se apila, y cada <code>)</code> hace
          <code>pop()</code>. Si al final la pila queda vacía, los paréntesis estaban balanceados.</li>
        <li><strong>Deshacer / rehacer</strong> en editores de texto o de imágenes: cada acción se apila, y
          "deshacer" es un <code>pop()</code> sobre la última acción realizada.</li>
      </ul>
    </div>
  </div>

  <!-- ===================== 6. COLAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. Colas: FIFO, el primero en entrar es el primero en salir</h3>
    </div>
    <p>
      Una <strong>cola</strong> (queue) también restringe por dónde entran y salen los elementos, pero al
      revés que la pila: sigue la lógica <strong>FIFO</strong> (First In, First Out), como una fila para
      pagar en una caja.
    </p>

    <svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" style="max-width:520px; width:100%; height:auto; display:block; margin:1rem auto 0;">
      <defs>
        <marker id="flechaCola" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)"/>
        </marker>
      </defs>

      <text x="60" y="30" font-family="Segoe UI, sans-serif" font-size="12" fill="#c44444" font-weight="700">desencolar</text>
      <line x1="60" y1="38" x2="60" y2="68" stroke="#c44444" stroke-width="2" marker-end="url(#flechaCola)"/>

      <text x="480" y="30" font-family="Segoe UI, sans-serif" font-size="12" fill="#6f9d7c" font-weight="700">encolar</text>
      <line x1="490" y1="68" x2="490" y2="38" stroke="#6f9d7c" stroke-width="2" marker-end="url(#flechaCola)"/>

      <rect x="20" y="70" width="150" height="60" rx="6" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <text x="95" y="105" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Persiana Americana</text>

      <rect x="200" y="70" width="150" height="60" rx="6" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
      <text x="275" y="105" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Mi Buen Amor</text>

      <rect x="380" y="70" width="150" height="60" rx="6" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
      <text x="455" y="105" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">Oye Mi Amor</text>

      <text x="95" y="155" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text-dim)">frente (sale primero)</text>
      <text x="455" y="155" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text-dim)">final (entra aquí)</text>
    </svg>
    <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
      "Persiana Americana" entró primero, así que queda al frente, y es la primera en salir con
      <code>desencolar</code>.
    </p>

    <div class="numbered-grid" style="grid-template-columns: 1fr; max-width:460px; margin:1rem auto 0;">
      <div class="flip-card" style="min-height:200px;">
        <div class="flip-card-inner" style="min-height:200px;">
          <div class="flip-card-front numbered-card">
            <p style="margin:0 0 0.5rem; font-weight:700; font-size:0.85rem;">Pila vs. cola: ¿en qué se diferencian?</p>
            <p style="font-size:0.85rem; color:var(--text-dim);">Toca para ver &rarr;</p>
            <span class="flip-hint">Toca para ver &rarr;</span>
          </div>
          <div class="flip-card-back">
            <p><strong>Pila (LIFO):</strong> el botón "anterior" te devuelve la última canción que
            escuchaste.</p>
            <p style="margin-top:0.5rem;"><strong>Cola (FIFO):</strong> la playlist "reproducir después"
            te da la primera canción que agregaste a la fila, respetando el orden en que las fuiste
            metiendo.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Variantes de cola y otras aplicaciones reales:</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li><strong>Cola de prioridad:</strong> no siempre gana el que llegó primero. Se le asigna una
          prioridad a cada elemento, y sale primero el de mayor prioridad. Por ejemplo, si SoundFlow diera
          prioridad a usuarios premium, sus canciones podrían saltarse la fila de la cola compartida.</li>
        <li><strong>Cola circular:</strong> cuando el espacio reservado para la cola se llena, en vez de
          seguir pidiendo más memoria, reutiliza los espacios ya liberados al frente. Se usa mucho en
          buffers de audio y video, para no estar reservando memoria nueva todo el tiempo.</li>
        <li><strong>Otros usos comunes:</strong> la cola de impresión de documentos (el primero que envías
          a imprimir es el primero en salir), o la fila de espera de un call center (el primer cliente que
          llama es el primero en ser atendido).</li>
      </ul>
    </div>
  </div>

  <!-- ===================== 7. CUÁNDO USAR CADA UNA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>7. ¿Cuándo usar cada estructura?</h3>
    </div>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border);">Estructura</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border);">Resuelve</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border);">Ejemplo en SoundFlow</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Grafo</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Relaciones muchos a muchos</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">tbl_reproducciones (usuarios y canciones)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Arreglo</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Acceso rápido por posición</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Canciones de un álbum, en orden</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Lista enlazada</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Inserciones y eliminaciones baratas</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Historial de reproducción, se arma sobre la marcha</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Pila</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">LIFO: lo último que entró, sale primero</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Botón "canción anterior"</td></tr>
          <tr><td style="padding:0.4rem 0.7rem;"><strong>Cola</strong></td><td style="padding:0.4rem 0.7rem;">FIFO: lo primero que entró, sale primero</td><td style="padding:0.4rem 0.7rem;">Playlist "reproducir después"</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ===================== QUIZ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Quiz rápido de autoevaluación</h3>
    </div>
    <div class="quiz-box">
      <div class="quiz-question">
        <p>1. ¿Cuál es la diferencia entre un nodo y una arista?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Son lo mismo, solo cambia el nombre</button>
          <button type="button" class="quiz-option" data-correct="true">El nodo es la entidad; la arista es la relación entre dos nodos</button>
          <button type="button" class="quiz-option" data-correct="false">El nodo es la relación; la arista es la entidad</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. En el grafo de tbl_reproducciones, ¿qué representan los nodos?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Solo las canciones</button>
          <button type="button" class="quiz-option" data-correct="false">Solo los usuarios</button>
          <button type="button" class="quiz-option" data-correct="true">Los usuarios y las canciones</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Qué significa que un nodo tenga grado 0?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Que es la raíz del grafo</button>
          <button type="button" class="quiz-option" data-correct="true">Que no tiene ninguna arista conectada, está aislado</button>
          <button type="button" class="quiz-option" data-correct="false">Que tiene el valor más alto de todos</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Por qué el acceso a un arreglo por índice es tan rápido?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque los arreglos siempre son pequeños</button>
          <button type="button" class="quiz-option" data-correct="true">Porque sus elementos están en posiciones consecutivas y calculables</button>
          <button type="button" class="quiz-option" data-correct="false">Porque cada elemento sabe cuál es el siguiente</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué guarda cada nodo de una lista enlazada?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Solo el dato, nada más</button>
          <button type="button" class="quiz-option" data-correct="true">El dato y una referencia al siguiente nodo</button>
          <button type="button" class="quiz-option" data-correct="false">La posición exacta en memoria de todos los demás nodos</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. ¿Qué significa que una pila sea LIFO?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Que los elementos se ordenan alfabéticamente</button>
          <button type="button" class="quiz-option" data-correct="true">Que el último elemento en entrar es el primero en salir</button>
          <button type="button" class="quiz-option" data-correct="false">Que el primer elemento en entrar es el primero en salir</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué operación saca un elemento del tope de una pila?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">push</button>
          <button type="button" class="quiz-option" data-correct="true">pop</button>
          <button type="button" class="quiz-option" data-correct="false">encolar</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. La playlist "reproducir después" de SoundFlow, ¿qué estructura describe mejor su comportamiento?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Una pila, porque es LIFO</button>
          <button type="button" class="quiz-option" data-correct="true">Una cola, porque es FIFO</button>
          <button type="button" class="quiz-option" data-correct="false">Un arreglo, porque el orden no importa</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>
    </div>
  </div>

  <!-- ===================== PRÁCTICA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Práctica: ejercicios de estructuras de datos</h3>
    </div>
    <p>
      No se incluyen las respuestas: resuélvelos en papel o en un diagrama, y verifícalos tú mismo contra
      los datos reales de <code>tbl_reproducciones</code> y <code>tbl_canciones</code>.
    </p>

    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#6f9d7c;">Fáciles</h4>
      <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Dibuja el grafo completo de <code>tbl_reproducciones</code>: un nodo por usuario, un nodo por
          canción, y una arista por cada fila de la tabla.</li>
        <li>Calcula el grado de cada nodo de canción en ese grafo.</li>
        <li>¿Qué nodos del grafo de reproducciones están aislados (grado 0)?</li>
        <li>Escribe como arreglo las canciones del álbum 3 de SoundFlow, en el orden en que aparecen en
          <code>tbl_canciones</code>.</li>
      </ol>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">Mediana complejidad</h4>
      <ol start="5" style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Haz un recorrido BFS desde <strong>U2 (Camilo)</strong> en el grafo de reproducciones (tratando
          las aristas como si fueran en ambos sentidos). ¿A qué otros usuarios llega en 2 saltos, si a alguno?</li>
        <li>Simula una pila: apila las 3 primeras canciones que reprodujo <strong>U1 (Lucia)</strong> en
          orden, y escribe qué devolvería <code>pop()</code> dos veces seguidas.</li>
        <li>Simula una cola: encola las canciones del álbum 4 en el orden de <code>tbl_canciones</code>, y
          escribe qué devolvería <code>desencolar()</code> dos veces seguidas.</li>
      </ol>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="font-size:0.85rem; color:var(--text-dim);">
      · Cormen, T. et al. Introduction to Algorithms, capítulos de grafos, pilas y colas.<br>
      · MySQL 8.0 Reference Manual, Data Types. dev.mysql.com
    </p>
  </div>

`;
