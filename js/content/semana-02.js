window.WEEK_CONTENT_2_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow: refinando consultas SQL</h2>

  <!-- ===================== 0. CREACIÓN DE LAS TABLAS DE LA ACTIVIDAD ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>Antes de empezar: creamos las tablas de la actividad</h3>
    </div>
    <p>
      La actividad de esta semana necesita cuatro tablas nuevas: <code>tbl_artistas</code>,
      <code>tbl_albumes</code>, <code>tbl_canciones</code> y <code>tbl_reproducciones</code>, igual de
      bien construidas que
      <code>tbl_usuarios</code> y <code>tbl_pagos_suscripcion</code> de la Semana 1. Aquí abajo tienes el
      modelo entidad-relación y el script completo de las <strong>seis tablas</strong> de
      <code>soundflow_db</code> hasta ahora.
    </p>

    <div class="content-box">
      <p style="margin:0 0 0.5rem; font-size:0.85rem;">
        Antes de crear las tablas, mira cómo se relacionan entre sí. Hay dos tipos de relación:
      </p>
      <ul style="margin:0 0 0.6rem; padding-left:1.2rem; line-height:1.6; font-size:0.85rem;">
        <li>
          <strong>Usuario &rarr; Pagos (1:N):</strong> un usuario tiene muchos pagos, y cada pago es de un
          solo usuario. <code>tbl_pagos_suscripcion</code> lleva una FK hacia <code>tbl_usuarios</code>.
        </li>
        <li>
          <strong>Usuarios &harr; Canciones (N:M):</strong> un usuario reproduce muchas canciones, y una
          canción la reproducen muchos usuarios. Se resuelve con una <strong>tabla puente</strong>,
          <code>tbl_reproducciones</code>, con una FK hacia <code>tbl_usuarios</code> y otra hacia
          <code>tbl_canciones</code>. Cada fila es una reproducción (quién, qué y cuándo) y conecta los dos
          grupos de tablas.
        </li>
        <li>
          <strong>Artista &rarr; Álbumes (1:N):</strong> un artista tiene muchos álbumes, y cada álbum es de
          un solo artista. <code>tbl_albumes</code> lleva una FK hacia <code>tbl_artistas</code>.
        </li>
        <li>
          <strong>Álbum &rarr; Canciones (1:N):</strong> un álbum tiene muchas canciones, y cada canción es
          de un solo álbum. <code>tbl_canciones</code> lleva una FK hacia <code>tbl_albumes</code>.
        </li>
      </ul>
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

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">¿Por qué aplicar normalización?</h4>
      <ul style="margin:0 0 0.8rem; padding-left:1.2rem; color:var(--text);">
        <li><strong>Reducción</strong> de los datos duplicados.</li>
        <li>Ahorro de <strong>espacio</strong> en disco.</li>
        <li><strong>Mantenimiento</strong> más sencillo.</li>
        <li><strong>Integridad</strong> de los datos.</li>
        <li>Mejora del <strong>rendimiento</strong> de las consultas SQL.</li>
        <li><strong>Flexibilidad</strong> y <strong>escalabilidad</strong>.</li>
      </ul>
    </div>

    <div class="content-box" style="margin-top:1rem;">
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
      <p style="margin:0 0 0.6rem; text-align:center;"><strong style="color:#5b7c99;">Ejemplo de 1FN: sin normalizar &rarr; normalizado</strong></p>
      <p style="margin:0 0 0.8rem; font-size:0.85rem;">Vamos a seguir <strong>un solo caso</strong> en las tres formas normales: la tabla donde SoundFlow guarda qué usuario escuchó qué canción. Empieza mal hecha y, en cada paso, la arreglamos hasta llegar a las tablas de <code>soundflow_db</code>.</p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center;">
        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#c44444; text-align:center;">✗ Sin normalizar</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="3" style="padding:0.3rem 0.4rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">reproducciones_v1</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_usuario</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">nombre_usuario</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">canciones_escuchadas</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Lucia Marin</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">'Tres Deseos, Rayando el Sol'</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">5</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Andrés Torres</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">'Tres Deseos'</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            La celda de Lucía guarda <strong>dos canciones separadas por coma</strong>: no es un valor atómico y es una lista dentro de una columna. Eso rompe 1FN.
          </p>
        </div>

        <div style="font-size:1.6rem; color:var(--text-dim); flex-shrink:0;">&rarr;</div>

        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#5b7c99; text-align:center;">✓ Normalizado</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="4" style="padding:0.3rem 0.4rem; background:#3d5a70; color:#fff; text-align:left; font-size:0.68rem;">reproducciones_v2</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#5b7c99; color:#fff; text-align:left;">id_usuario</th><th style="padding:0.3rem 0.4rem; background:#5b7c99; color:#fff; text-align:left;">nombre_usuario</th><th style="padding:0.3rem 0.4rem; background:#5b7c99; color:#fff; text-align:left;">id_cancion</th><th style="padding:0.3rem 0.4rem; background:#5b7c99; color:#fff; text-align:left;">titulo</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Lucia Marin</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Tres Deseos</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Lucia Marin</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">105</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Rayando el Sol</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">5</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Andrés Torres</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Tres Deseos</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            Una canción por fila: cada celda guarda un solo valor, sin listas. Pero ahora el nombre de Lucía y el título "Tres Deseos" se repiten. De eso se encarga 2FN.
          </p>
        </div>
      </div>
    </div>

    <div class="content-box" style="border-left:4px solid #5b7c99; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#5b7c99;">¿Nuestro modelo cumple 1FN?</h4>
      <p style="margin:0 0 0.6rem; font-size:0.85rem;">
        Revisemos las seis tablas de <code>soundflow_db</code> con las reglas de 1FN: sin filas repetidas
        (cada fila tiene su llave primaria), valores atómicos y ninguna columna con varios valores
        separados por comas.
      </p>
      <table style="border-collapse:collapse; font-size:0.78rem; width:100%;">
        <thead>
          <tr>
            <th style="padding:0.35rem 0.5rem; background:#5b7c99; color:#fff; text-align:left;">Tabla</th>
            <th style="padding:0.35rem 0.5rem; background:#5b7c99; color:#fff; text-align:left;">Llave primaria</th>
            <th style="padding:0.35rem 0.5rem; background:#5b7c99; color:#fff; text-align:left;">Valores atómicos</th>
            <th style="padding:0.35rem 0.5rem; background:#5b7c99; color:#fff; text-align:center;">1FN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>tbl_usuarios</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>idusuario</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);">Un nombre, un email y un hash por fila.</td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border); text-align:center; color:#6f9d7c; font-weight:700;">✓</td>
          </tr>
          <tr>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>tbl_pagos_suscripcion</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>id_pagos_suscripcion</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);">Un monto y una fecha por pago.</td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border); text-align:center; color:#6f9d7c; font-weight:700;">✓</td>
          </tr>
          <tr>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>tbl_artistas</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>id_artista</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);">Un nombre y un país por artista.</td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border); text-align:center; color:#6f9d7c; font-weight:700;">✓</td>
          </tr>
          <tr>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>tbl_albumes</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>id_album</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);">Un título y un año por álbum; el artista se referencia con <code>id_artista</code>.</td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border); text-align:center; color:#6f9d7c; font-weight:700;">✓</td>
          </tr>
          <tr>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>tbl_canciones</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>id_cancion</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);">Un solo género por canción (<code>'Pop'</code>, <code>'Salsa'</code> o <code>'Rock'</code>), nunca una lista.</td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border); text-align:center; color:#6f9d7c; font-weight:700;">✓</td>
          </tr>
          <tr>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>tbl_reproducciones</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);"><code>id_reproduccion</code></td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border);">Una fila por cada reproducción, con un usuario y una canción.</td>
            <td style="padding:0.35rem 0.5rem; border:1px solid var(--border); text-align:center; color:#6f9d7c; font-weight:700;">✓</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content-box" style="border-left:4px solid #7fa5a3; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#5f8582;">Segunda Forma Normal (2FN): Dependencia completa de la llave</h4>
      <ul style="margin:0 0 0.8rem; padding-left:1.2rem; color:var(--text);">
        <li>Cumple con las reglas de 1FN.</li>
        <li>Todos los atributos que no forman parte de la <strong>clave principal o llave primaria</strong> tienen dependencia funcional completa de ella. Dicho de otra forma: no debe haber dependencias parciales en las columnas no clave.</li>
        <li>Todas las dependencias parciales se deben eliminar y separar dentro de sus propias tablas.</li>
      </ul>
    </div>

    <div class="content-box" style="border-left:4px solid #7fa5a3; margin-top:1rem;">
      <p style="margin:0 0 0.6rem; text-align:center;"><strong style="color:#5f8582;">Ejemplo de 2FN: sin normalizar &rarr; normalizado</strong></p>
      <p style="margin:0 0 0.8rem; font-size:0.85rem;">Seguimos con la tabla que quedó después de 1FN, ahora para revisar sus dependencias.</p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center;">
        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#c44444; text-align:center;">✗ Sin normalizar</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="4" style="padding:0.3rem 0.4rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">reproducciones_v2</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_usuario</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">nombre_usuario</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_cancion</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">titulo</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Lucia Marin</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Tres Deseos</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Lucia Marin</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">105</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Rayando el Sol</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">5</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Andrés Torres</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Tres Deseos</td></tr>
            </tbody>
          </table>
          <ol style="margin:0.4rem 0 0; padding-left:1.1rem; font-size:0.72rem; color:var(--text-dim); text-align:left;">
            <li>Cumple 1FN: cada celda tiene un solo valor.</li>
            <li>Paso 2, buscar la llave (lo que identifica <strong>una sola fila</strong>):
              <ul style="margin:0.2rem 0 0; padding-left:1rem;">
                <li><code>id_usuario</code> sola no sirve: el 1 aparece en 2 filas.</li>
                <li><code>id_cancion</code> sola no sirve: el 101 aparece en 2 filas.</li>
                <li>Juntas sí sirven: (1, 101), (1, 105) y (5, 101) son todas distintas.</li>
                <li>Dos columnas juntas como llave = <strong>llave compuesta</strong>.</li>
              </ul>
            </li>
            <li>Rompe el paso 3: <code>nombre_usuario</code> depende solo de <code>id_usuario</code>, y <code>titulo</code> solo de <code>id_cancion</code>. Ninguna depende de la pareja completa, y por eso "Lucia Marin" y "Tres Deseos" se repiten (dependencias parciales).</li>
          </ol>
        </div>

        <div style="font-size:1.6rem; color:var(--text-dim); flex-shrink:0;">&rarr;</div>

        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#5f8582; text-align:center;">✓ Normalizado</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%; margin-bottom:0.5rem;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:#5f8582; color:#fff; text-align:left; font-size:0.68rem;">tbl_usuarios</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">id_usuario</th><th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">nombre</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#5f8582; font-weight:700;">Lucia Marin</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">5</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#5f8582; font-weight:700;">Andrés Torres</td></tr>
            </tbody>
          </table>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%; margin-bottom:0.5rem;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:#5f8582; color:#fff; text-align:left; font-size:0.68rem;">tbl_canciones</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">id_cancion</th><th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">titulo</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#5f8582; font-weight:700;">Tres Deseos</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">105</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#5f8582; font-weight:700;">Rayando el Sol</td></tr>
            </tbody>
          </table>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:#5f8582; color:#fff; text-align:left; font-size:0.68rem;">tbl_reproducciones</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">id_usuario</th><th style="padding:0.3rem 0.4rem; background:#7fa5a3; color:#fff; text-align:left;">id_cancion</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">105</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">5</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            Cada dato vive una sola vez: el nombre en <code>tbl_usuarios</code> y el título en <code>tbl_canciones</code>. <code>tbl_reproducciones</code> solo guarda la pareja que las conecta (tablas simplificadas). En <code>soundflow_db</code> esta última tiene además su propio <code>id_reproduccion</code>, para que un usuario pueda escuchar la misma canción más de una vez.
          </p>
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
      <p style="margin:0 0 0.6rem; text-align:center;"><strong style="color:#8b7fb8;">Ejemplo de 3FN: sin normalizar &rarr; normalizado</strong></p>
      <p style="margin:0 0 0.8rem; font-size:0.85rem;">Ahora miramos <code>tbl_canciones</code>, que ya salió de 2FN.</p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center;">
        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#c44444; text-align:center;">✗ Sin normalizar</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="4" style="padding:0.3rem 0.4rem; background:#8a3030; color:#fff; text-align:left; font-size:0.68rem;">tbl_canciones</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_cancion</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">titulo</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">id_album</th><th style="padding:0.3rem 0.4rem; background:#c44444; color:#fff; text-align:left;">titulo_album</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Tres Deseos</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Grandes Éxitos</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Mi Tierra</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Grandes Éxitos</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">108</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Mi Buen Amor</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#c44444; font-weight:700;">Grandes Éxitos</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">102</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">La Vida Es un Carnaval</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">2</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Éxitos Eternos</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            "Grandes Éxitos" se repite en tres canciones: <code>titulo_album</code> depende de <code>id_album</code> (otra columna no clave), no directamente de <code>id_cancion</code>. Es una dependencia "transitiva": <code>id_cancion</code> &rarr; <code>id_album</code> &rarr; <code>titulo_album</code>.
          </p>
        </div>

        <div style="font-size:1.6rem; color:var(--text-dim); flex-shrink:0;">&rarr;</div>

        <div style="flex:1; min-width:220px;">
          <p style="margin:0 0 0.4rem; font-size:0.8rem; font-weight:700; color:#8b7fb8; text-align:center;">✓ Normalizado</p>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%; margin-bottom:0.5rem;">
            <thead>
              <tr><th colspan="3" style="padding:0.3rem 0.4rem; background:#6b5f96; color:#fff; text-align:left; font-size:0.68rem;">tbl_canciones</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">id_cancion</th><th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">titulo</th><th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">id_album (FK)</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">101</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Tres Deseos</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">103</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Mi Tierra</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">108</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">Mi Buen Amor</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">102</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">La Vida Es un Carnaval</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">2</td></tr>
            </tbody>
          </table>
          <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.7rem; width:100%;">
            <thead>
              <tr><th colspan="2" style="padding:0.3rem 0.4rem; background:#6b5f96; color:#fff; text-align:left; font-size:0.68rem;">tbl_albumes</th></tr>
              <tr><th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">id_album</th><th style="padding:0.3rem 0.4rem; background:#8b7fb8; color:#fff; text-align:left;">titulo_album</th></tr>
            </thead>
            <tbody>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">1</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#8b7fb8; font-weight:700;">Grandes Éxitos</td></tr>
              <tr><td style="padding:0.3rem 0.4rem; border:1px solid var(--border);">2</td><td style="padding:0.3rem 0.4rem; border:1px solid var(--border); color:#8b7fb8; font-weight:700;">Éxitos Eternos</td></tr>
            </tbody>
          </table>
          <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
            El título del álbum vive una sola vez, junto a su álbum: <code>titulo_album</code> depende directamente de <code>id_album</code>, su llave primaria (tablas simplificadas).
          </p>
        </div>
      </div>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        Así, la tabla del principio terminó convertida en las tablas de <code>soundflow_db</code>: 1FN dejó una
        canción por fila, 2FN separó usuarios, canciones y reproducciones, y 3FN separó álbumes y artistas.
        Las tres reglas dicen lo mismo desde ángulos distintos: <strong>cada dato debe vivir en un solo lugar,
        y ese lugar debe ser el correcto según de qué depende realmente ese dato.</strong>
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
        <p>8. Una tabla de reproducciones tiene una columna <code>canciones_escuchadas</code> con el valor <code>'Tres Deseos, Rayando el Sol'</code> en una sola celda. ¿Qué regla de normalización viola?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">1FN, porque la columna no guarda un valor atómico</button>
          <button type="button" class="quiz-option" data-correct="false">2FN, porque la llave primaria no es compuesta</button>
          <button type="button" class="quiz-option" data-correct="false">Ninguna, es una forma válida de guardar varias canciones</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. Una tabla guarda <code>id_usuario</code>, <code>id_cancion</code> y <code>nombre_usuario</code>, con llave compuesta (<code>id_usuario</code> + <code>id_cancion</code>). El <code>nombre_usuario</code> depende solo de <code>id_usuario</code>. ¿Qué forma normal viola?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">1FN</button>
          <button type="button" class="quiz-option" data-correct="true">2FN</button>
          <button type="button" class="quiz-option" data-correct="false">3FN</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. Una tabla de pagos guarda <code>id_pago</code>, <code>id_usuario</code> y <code>email_usuario</code>. El email depende de <code>id_usuario</code>, que no es la llave primaria. ¿Qué forma normal viola?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">1FN</button>
          <button type="button" class="quiz-option" data-correct="false">2FN</button>
          <button type="button" class="quiz-option" data-correct="true">3FN</button>
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

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">Guía de estructuras de datos</h2>

  <div class="activity-section" style="border-top:none; padding-top:0;">
    <p>
      Una <strong>estructura de datos</strong> es una forma de organizar y guardar datos en la memoria de
      una computadora, para poder usarlos de manera eficiente. No basta con "guardar" la información:
      <strong>cómo</strong> la guardas determina qué tan rápido puedes buscarla, agregar algo nuevo,
      eliminar algo, o recorrerla completa.
    </p>
    <p>
      Piénsalo como organizar un clóset: puedes tirar toda la ropa en un montón (funciona, pero buscar algo
      es lento), o colgarla por tipo y color (toma más trabajo organizarla, pero encontrar lo que necesitas
      es inmediato). En esta clase ves siete estructuras, qué hace cada una, dónde se usa y
      <strong>cómo se escribe en Python</strong>.
    </p>
  </div>

  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header"><h3>Antes de empezar: ¿las construyo yo o ya vienen hechas?</h3></div>
    <p>
      Esta es la duda más común, así que va primero: <strong>casi siempre ya vienen hechas</strong>.
      Python, Java y las bases de datos ya traen estas estructuras: en un lenguaje las <strong>llamas</strong>
      con el nombre correcto, y en una base de datos las usa el motor por dentro. <strong>Que no las construyas no significa que no las uses</strong>: las usas todo el tiempo.
      Escribir una lista enlazada o un árbol desde cero se hace en clase para entender cómo funcionan,
      no porque lo vayas a repetir en cada proyecto.
    </p>
    <p>
      Entonces, ¿para qué estudiarlas? Para <strong>elegir bien</strong>. Usar una <code>list</code> como cola funciona,
      pero se vuelve lenta con muchos datos; con un <code>deque</code> no. Saber por qué un índice acelera un
      <code>WHERE</code> o por qué un <code>LIKE '%Amor%'</code> no lo aprovecha también sale de aquí.
    </p>
    <div class="content-box" style="overflow-x:auto;">
<table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Estructura</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">En Python la llamas...</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">En SQL / bases de datos</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">¿La uso o la construyo?</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><a href="#arreglos">Arreglo</a></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>list</code>, <code>tuple</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Filas de una tabla</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">La usas: ya viene hecha</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><a href="#listas">Lista enlazada</a></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>collections.deque</code> (por dentro)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Hojas enlazadas de un índice B+Tree</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">La usas con <code>deque</code>; la construyes solo para aprender</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><a href="#pilas">Pila</a></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>list</code> con <code>append()</code> y <code>pop()</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>SAVEPOINT</code> (se parece)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">La usas: ya viene hecha</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><a href="#colas">Cola</a></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>collections.deque</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Tabla de tareas pendientes</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">La usas: ya viene hecha</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><a href="#grafos">Grafo</a></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>dict</code> de listas o <code>networkx</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Tabla de relaciones + <code>JOIN</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">La usas: armas el <code>dict</code> o usas <code>networkx</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><a href="#arboles">Árbol</a></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Clases propias, <code>heapq</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Índices B-Tree y B+Tree</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">La usas con índices y librerías; rara vez la construyes</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><a href="#tries">Trie</a></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>dict</code> de <code>dict</code> o librería</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>LIKE 'prefijo%'</code> con índice</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">La usas con un <code>dict</code> propio o una librería</td></tr></tbody></table>
    </div>
    <h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5b7c99;">En un lenguaje las llamas; en una base de datos las usa el motor por dentro</h3>
    <div style="display:flex; gap:1rem; flex-wrap:wrap;">
      <div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #5b7c99;">
        <p style="margin:0 0 0.4rem; font-weight:700; color:#5b7c99;">En un lenguaje (Python, JavaScript, Java)</p>
        <p style="margin:0; font-size:0.9rem;"><strong>Las llamas tú.</strong> Escribes <code>lista = []</code>, <code>deque()</code> o <code>{}</code>
        y tú decides cuál estructura usar. Si eliges mal, el programa se vuelve lento.</p>
      </div>
      <div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #7fa5a3;">
        <p style="margin:0 0 0.4rem; font-weight:700; color:#5f8582;">En una base de datos (MySQL, PostgreSQL)</p>
        <p style="margin:0; font-size:0.9rem;"><strong>No las llamas.</strong> Escribes SQL (<code>SELECT</code>, <code>CREATE INDEX</code>) y el motor trabaja con
        árboles, listas enlazadas, tablas hash y colas por dentro. Lo que tú decides es el diseño (tablas e índices); la estructura
        la elige el motor.</p>
      </div>
    </div>
    <div class="content-box" style="margin-top:1rem; overflow-x:auto;">
<table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Tú escribes...</th><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Por dentro el motor...</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>CREATE INDEX idx_titulo ON tbl_canciones (titulo);</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Construye y mantiene un árbol B+Tree.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>SELECT ... WHERE reproducciones BETWEEN ...</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Puede recorrer las hojas enlazadas del índice.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>JOIN</code> entre dos tablas</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Puede usar una tabla hash u otro método interno, según lo que decida el optimizador.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>START TRANSACTION</code> y <code>ROLLBACK</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Usa registros y colas de bloqueos para deshacer y ordenar los cambios.</td></tr></tbody></table>
    </div>
    <p style="font-size:0.9rem;"><strong>Una excepción:</strong> bases como Redis sí te dejan llamar la estructura directamente, con comandos como
    <code>LPUSH</code> (listas) o <code>SADD</code> (conjuntos). Ahí eliges la estructura tú, igual que en un lenguaje.</p>
    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <p style="margin:0;"><strong>Dos que usarás todo el tiempo aunque no estén en la lista:</strong>
      el <code>dict</code> (diccionario, una tabla hash: busca por clave en O(1) en promedio) y el <code>set</code>
      (conjunto, sin repetidos). Redis, de la Semana 4, se basa en ideas parecidas.</p>
    </div>
  </div>

  <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin:1.2rem 0 0;">
    <a href="#arreglos" style="text-decoration:none; background:#5b7c99; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Arreglos</a>
    <a href="#listas" style="text-decoration:none; background:#8b7fb8; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Listas enlazadas</a>
    <a href="#pilas" style="text-decoration:none; background:#c99a4e; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Pilas</a>
    <a href="#colas" style="text-decoration:none; background:#7fa5a3; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Colas</a>
    <a href="#grafos" style="text-decoration:none; background:#6f9d7c; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Grafos</a>
    <a href="#arboles" style="text-decoration:none; background:#5f8582; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Árboles</a>
    <a href="#tries" style="text-decoration:none; background:#b8704f; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Tries</a>
    <a href="#elegir" style="text-decoration:none; background:#33404f; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">¿Cuál elijo?</a>
    <a href="#faq" style="text-decoration:none; background:#33404f; color:#fff; padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem;">Preguntas frecuentes</a>
  </div>
<div class="activity-section" id="arreglos" style="border-left:5px solid #5b7c99; padding-left:1.2rem;">
  <div class="activity-section-header"><h3 style="color:#5b7c99;">1. Arreglos</h3></div>
  <p style="font-size:1rem;"><strong>Una fila de casillas numeradas, una al lado de la otra.</strong></p>
  <p>Es la estructura más simple y la base de casi todas las demás.</p>
<svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" style="max-width:560px; width:100%; height:auto; display:block; margin:0.8rem auto;"><defs><marker id="ah1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5b7c99"/></marker></defs><rect x="20" y="60" width="104" height="46" rx="0" fill="#ffffff" stroke="#5b7c99" stroke-width="1.6"/><text x="72" y="88" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Tres Deseos</text><text x="72" y="126" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">[0]</text><rect x="124" y="60" width="104" height="46" rx="0" fill="#e7edf2" stroke="#5b7c99" stroke-width="1.6"/><text x="176" y="88" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Tierra</text><text x="176" y="126" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">[1]</text><rect x="228" y="60" width="104" height="46" rx="0" fill="#ffffff" stroke="#5b7c99" stroke-width="1.6"/><text x="280" y="88" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Buen Amor</text><text x="280" y="126" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">[2]</text><rect x="332" y="60" width="104" height="46" rx="0" fill="#ffffff" stroke="#5b7c99" stroke-width="1.6"/><text x="384" y="88" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Oye Mi Amor</text><text x="384" y="126" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">[3]</text><rect x="436" y="60" width="104" height="46" rx="0" fill="#ffffff" stroke="#5b7c99" stroke-width="1.6"/><text x="488" y="88" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Rayando el Sol</text><text x="488" y="126" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">[4]</text><text x="280" y="150" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5b7c99" font-style="italic">casillas contiguas en memoria: cada una tiene su número de posición (índice)</text><text x="176" y="30" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#c44444" font-weight="700">canciones[1]</text><line x1="176" y1="36" x2="176" y2="56" stroke="#c44444" stroke-width="2" marker-end="url(#ah1)"/></svg>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5b7c99;">Qué operaciones tiene y cuánto cuestan</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Operación</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Costo</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Leer <code>canciones[1]</code> por posición</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Agregar al final</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1) en promedio</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Insertar al inicio o en medio</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n): hay que correr los demás</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar un valor (desordenado)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar un valor (ordenado)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(log n) con búsqueda binaria</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Eliminar en medio</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n)</td></tr></tbody></table></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5b7c99;">¿Cuándo usarla y cuándo evitarla?</h3>
<div style="display:flex; gap:1rem; flex-wrap:wrap;"><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #3f7f55;"><p style="margin:0 0 0.4rem; font-weight:700; color:#3f7f55;">✓ Úsala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Necesitas leer por posición muy seguido ("la canción número 3").</li><li style="margin-bottom:0.35rem;">Tienes una colección de tamaño casi fijo que casi no cambia: un top 10, un tablero, los días de la semana.</li><li style="margin-bottom:0.35rem;">Vas a <strong>buscar mucho y modificar poco</strong>: ordénalo una vez y usa búsqueda binaria.</li><li style="margin-bottom:0.35rem;">Procesas muchos números seguidos: píxeles, embeddings, mediciones.</li></ul></div><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #a83a3a;"><p style="margin:0 0 0.4rem; font-weight:700; color:#a83a3a;">✗ Evítala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Insertas o eliminas mucho al inicio o en medio: cada cambio corre todos los demás elementos.</li><li style="margin-bottom:0.35rem;">Buscas muchas veces por valor en un arreglo grande y desordenado: usa un <code>set</code> o un <code>dict</code>.</li><li style="margin-bottom:0.35rem;">Cada elemento es un registro con varios campos (nombre, email, plan): usa una clase, un <code>dict</code> o una tabla.</li></ul></div></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5b7c99;">¿Dónde se usa en aplicaciones y sistemas?</h3>
<div class="content-box" style="margin:0;"><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Hojas de cálculo: las filas y columnas son una matriz.</li><li style="margin-bottom:0.35rem;">Imágenes y video: una imagen es un arreglo de píxeles (lo procesan librerías como NumPy y OpenCV).</li><li style="margin-bottom:0.35rem;">Videojuegos: el tablero de ajedrez o de Sudoku, y las tablas de puntuaciones.</li><li style="margin-bottom:0.35rem;">Inteligencia artificial: los <strong>embeddings</strong> son arreglos de números (los que usa pgvector en SoundFlow).</li></ul></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5b7c99;">¿Cómo la usas en un lenguaje de programación?</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Lenguaje</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Cómo se llama</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Cómo se escribe</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Python</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>list</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>canciones = ["Tres Deseos", "Mi Tierra"]</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">JavaScript</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>Array</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>const canciones = ["Tres Deseos", "Mi Tierra"];</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Java</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>ArrayList</code> o arreglo <code>[]</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>List&lt;String&gt; canciones = new ArrayList&lt;&gt;();</code></td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">arreglos.py</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>canciones = ["Tres Deseos", "Mi Tierra", "Mi Buen Amor"]   <span class="code-com"># list: así se crea un arreglo</span>

print(canciones[1])                       <span class="code-com"># "Mi Tierra"  -&gt; acceso por posición, O(1)</span>
canciones.append("Oye Mi Amor")           <span class="code-com"># agrega al final, O(1)</span>
canciones.insert(1, "Rayando el Sol")     <span class="code-com"># inserta en medio, O(n): corre los demás</span>
print("Mi Tierra" in canciones)           <span class="code-com"># True -&gt; busca uno por uno, O(n)</span>

<span class="code-com"># Arreglo ordenado + búsqueda binaria (el módulo bisect ya viene en Python)</span>
from bisect import bisect_left
ordenadas = sorted(canciones)
pos = bisect_left(ordenadas, "Mi Tierra")                 <span class="code-com"># O(log n)</span>
existe = pos &lt; len(ordenadas) and ordenadas[pos] == "Mi Tierra"
print(existe)                             <span class="code-com"># True</span></code></pre>
</div>
<p style="font-size:0.9rem;">No construyes nada: <code>list</code> ya es el arreglo. Tú decides si lo mantienes ordenado (buscas rápido) o desordenado (insertas rápido).</p>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5b7c99;">¿Cómo se usa en una base de datos? (casi siempre por dentro)</h3>
<p style="font-size:0.9rem;">En una base de datos casi nunca <strong>llamas</strong> a la estructura: escribes SQL y el motor decide cuándo usarla por dentro. La columna "Qué haces tú" es lo único que escribes.</p>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Dónde</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Cómo aparece</th><th style="padding:0.4rem 0.6rem; background:#5b7c99; color:#fff; text-align:left;">Qué haces tú</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">MySQL</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No tiene tipo arreglo: una "lista" es una tabla con una fila por elemento.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Creas la tabla y usas <code>SELECT ... ORDER BY</code>.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">PostgreSQL</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Permite columnas arreglo, por ejemplo <code>TEXT[]</code>.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Declaras la columna, pero el diseño relacional lo evita (1FN).</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">MongoDB</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Un documento puede tener un campo arreglo, como <code>generos: ["Salsa", "Pop"]</code>.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Lo escribes dentro del documento (lo viste en la Semana 4).</td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">consulta_arreglo.sql</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code><span class="code-com">-- En MySQL una "lista de canciones" es una tabla: una fila por canción, nunca una columna con varias.</span>
SELECT titulo
FROM tbl_canciones
WHERE id_album = 3
ORDER BY id_cancion;   <span class="code-com">-- el ORDER BY pone las filas en el orden que pides</span></code></pre>
</div>
<p style="font-size:0.9rem;">Así se resuelve en una base relacional lo que en Python sería una lista: filas dentro de una tabla. Guardar <code>'Mi Tierra, Tres Deseos'</code> dentro de una sola celda rompería la 1FN.</p>
<div class="content-box" style="border-left:4px solid #5b7c99; margin-top:1rem;"><p style="margin:0 0 0.4rem;"><strong>¿La uso o la tengo que construir?</strong> La usas: casi siempre <strong>ya viene hecha</strong> (<code>list</code>).</p><p style="margin:0; color:#a83a3a;"><strong>Ojo:</strong> insertar o eliminar al inicio de una <code>list</code> grande es lento. Si lo haces seguido, usa un <code>deque</code> (ver Colas).</p></div>
</div>
<div class="activity-section" id="listas" style="border-left:5px solid #8b7fb8; padding-left:1.2rem;">
  <div class="activity-section-header"><h3 style="color:#8b7fb8;">2. Listas enlazadas</h3></div>
  <p style="font-size:1rem;"><strong>Una cadena de cajas: cada caja guarda un dato y dice dónde está la siguiente.</strong></p>
  <p>Gana cuando insertas o eliminas mucho en medio de los datos, porque solo se cambian unos punteros.</p>
<svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" style="max-width:560px; width:100%; height:auto; display:block; margin:0.8rem auto;"><defs><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#8b7fb8"/></marker></defs><text x="78" y="24" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#c44444" font-weight="700">cabeza</text><line x1="78" y1="30" x2="78" y2="58" stroke="#c44444" stroke-width="2" marker-end="url(#ah2)"/><rect x="60" y="60" width="100" height="44" rx="0" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.6"/><text x="110" y="87" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Tres Deseos</text><rect x="160" y="60" width="36" height="44" rx="0" fill="#f3eef9" stroke="#8b7fb8" stroke-width="1.6"/><text x="178" y="87" text-anchor="middle" font-family="Consolas, monospace" font-size="16" fill="#8b7fb8" font-weight="700">•</text><line x1="178" y1="82" x2="230" y2="82" stroke="#8b7fb8" stroke-width="2" marker-end="url(#ah2)"/><rect x="230" y="60" width="100" height="44" rx="0" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.6"/><text x="280" y="87" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Tierra</text><rect x="330" y="60" width="36" height="44" rx="0" fill="#f3eef9" stroke="#8b7fb8" stroke-width="1.6"/><text x="348" y="87" text-anchor="middle" font-family="Consolas, monospace" font-size="16" fill="#8b7fb8" font-weight="700">•</text><line x1="348" y1="82" x2="400" y2="82" stroke="#8b7fb8" stroke-width="2" marker-end="url(#ah2)"/><rect x="400" y="60" width="100" height="44" rx="0" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.6"/><text x="450" y="87" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Buen Amor</text><rect x="500" y="60" width="36" height="44" rx="0" fill="#fbeaea" stroke="#8b7fb8" stroke-width="1.6"/><text x="518" y="87" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#c44444" font-weight="700">null</text><text x="280" y="132" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#8b7fb8" font-style="italic">cada nodo guarda un dato y un puntero al siguiente; el último apunta a null</text></svg>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#8b7fb8;">Qué operaciones tiene y cuánto cuestan</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Operación</th><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Costo</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Leer el elemento número k</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n): hay que recorrer desde la cabeza</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Insertar al inicio</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Insertar al final</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n), o O(1) si guardas un puntero a la cola</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Eliminar un nodo que ya tienes en la mano</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar un valor</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n)</td></tr></tbody></table></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#8b7fb8;">¿Cuándo usarla y cuándo evitarla?</h3>
<div style="display:flex; gap:1rem; flex-wrap:wrap;"><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #3f7f55;"><p style="margin:0 0 0.4rem; font-weight:700; color:#3f7f55;">✓ Úsala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Insertas o eliminas mucho al inicio o en medio, y ya tienes el nodo en la mano.</li><li style="margin-bottom:0.35rem;">Necesitas moverte hacia adelante y hacia atrás (lista doblemente enlazada): una playlist.</li><li style="margin-bottom:0.35rem;">No sabes cuántos datos habrá y la cantidad sube y baja todo el tiempo.</li><li style="margin-bottom:0.35rem;">Vas a construir otras estructuras encima: pilas, colas o tablas hash con colisiones.</li></ul></div><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #a83a3a;"><p style="margin:0 0 0.4rem; font-weight:700; color:#a83a3a;">✗ Evítala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Necesitas acceso por posición: llegar al elemento 100 obliga a pasar por los 99 anteriores.</li><li style="margin-bottom:0.35rem;">Buscas mucho por valor: recorrer la cadena es O(n).</li><li style="margin-bottom:0.35rem;">En Python, para casi todo: <code>list</code> o <code>deque</code> hacen el trabajo sin que escribas una clase.</li></ul></div></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#8b7fb8;">¿Dónde se usa en aplicaciones y sistemas?</h3>
<div class="content-box" style="margin:0;"><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Reproductores de música: "anterior" y "siguiente" funcionan con una lista doblemente enlazada.</li><li style="margin-bottom:0.35rem;">Navegadores y editores: historial de páginas y de cambios encadenados.</li><li style="margin-bottom:0.35rem;">Sistemas operativos: el núcleo de Linux usa listas enlazadas para procesos y bloques libres de memoria.</li><li style="margin-bottom:0.35rem;">Cachés LRU: una tabla hash más una lista doblemente enlazada para sacar lo menos usado.</li></ul></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#8b7fb8;">¿Cómo la usas en un lenguaje de programación?</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Lenguaje</th><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Cómo se llama</th><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Cómo se escribe</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Python</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No trae lista enlazada general. Usa <code>deque</code>.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>from collections import deque</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">JavaScript</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No la trae. Se arma con objetos que apuntan al siguiente.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>{ dato: "Tres Deseos", siguiente: null }</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Java</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>LinkedList</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>LinkedList&lt;String&gt; lista = new LinkedList&lt;&gt;();</code></td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">lista_enlazada.py</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>class Nodo:
    def __init__(self, cancion):
        self.cancion = cancion      <span class="code-com"># el dato de este nodo</span>
        self.siguiente = None       <span class="code-com"># todavía no apunta a nadie</span>

class ListaEnlazada:
    def __init__(self):
        self.cabeza = None          <span class="code-com"># lista vacía</span>

    def agregar(self, cancion):     <span class="code-com"># agrega al final</span>
        nuevo = Nodo(cancion)
        if self.cabeza is None:
            self.cabeza = nuevo
            return
        actual = self.cabeza
        while actual.siguiente:     <span class="code-com"># avanza hasta el último nodo</span>
            actual = actual.siguiente
        actual.siguiente = nuevo    <span class="code-com"># lo conecta</span>

    def recorrer(self):
        actual = self.cabeza
        while actual:
            print(actual.cancion)
            actual = actual.siguiente

historial = ListaEnlazada()
historial.agregar("Tres Deseos")
historial.agregar("Mi Tierra")
historial.agregar("Mi Buen Amor")
historial.recorrer()                <span class="code-com"># imprime las tres, en orden</span></code></pre>
</div>
<p style="font-size:0.9rem;">En un proyecto real normalmente usarías <code>from collections import deque</code> en vez de escribir esta clase. La clase se programa para aprender cómo funcionan los punteros.</p>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#8b7fb8;">¿Cómo se usa en una base de datos? (casi siempre por dentro)</h3>
<p style="font-size:0.9rem;">En una base de datos casi nunca <strong>llamas</strong> a la estructura: escribes SQL y el motor decide cuándo usarla por dentro. La columna "Qué haces tú" es lo único que escribes.</p>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Dónde</th><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Cómo aparece</th><th style="padding:0.4rem 0.6rem; background:#8b7fb8; color:#fff; text-align:left;">Qué haces tú</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Redis</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">El tipo <code>LIST</code> está hecho con listas enlazadas.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Usas comandos como <code>RPUSH</code> y <code>LRANGE</code> (Semana 4).</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Índices (MySQL, PostgreSQL)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Las hojas del B+Tree están enlazadas entre sí.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Solo creas el índice con <code>CREATE INDEX</code>: el motor hace el resto.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Versiones de una fila</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Algunos motores encadenan las versiones anteriores de una fila.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No haces nada: es interno del motor.</td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">indice_con_hojas_enlazadas.sql</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code><span class="code-com">-- Crear un índice: el motor lo guarda como un B+Tree.</span>
CREATE INDEX idx_reproducciones ON tbl_canciones (reproducciones);

<span class="code-com">-- Un rango como este puede recorrer las hojas enlazadas del índice, una tras otra.</span>
SELECT titulo, reproducciones
FROM tbl_canciones
WHERE reproducciones BETWEEN 5000000 AND 15000000;</code></pre>
</div>
<p style="font-size:0.9rem;">Tú no ves la lista enlazada: el motor la usa por dentro para recorrer rangos sin volver a empezar desde la raíz. Si el optimizador la usa o no depende del motor y de cuántas filas tenga la tabla.</p>
<div class="content-box" style="border-left:4px solid #8b7fb8; margin-top:1rem;"><p style="margin:0 0 0.4rem;"><strong>¿La uso o la tengo que construir?</strong> La usas con <code>deque</code>. Casi nunca la construyes: eso se hace para aprender, o en casos muy especiales de bajo nivel.</p><p style="margin:0; color:#a83a3a;"><strong>Ojo:</strong> no hay acceso directo por posición. Para llegar al nodo 100 tienes que pasar por los 99 anteriores. Y si pierdes la cabeza, pierdes toda la lista.</p></div>
</div>
<div class="activity-section" id="pilas" style="border-left:5px solid #c99a4e; padding-left:1.2rem;">
  <div class="activity-section-header"><h3 style="color:#c99a4e;">3. Pilas (LIFO)</h3></div>
  <p style="font-size:1rem;"><strong>Una pila de platos: el último que pones es el primero que sacas.</strong></p>
  <p>Úsala cuando importe el orden inverso: lo último que entró es lo primero que necesitas.</p>
<svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" style="max-width:380px; width:100%; height:auto; display:block; margin:0.8rem auto;"><defs><marker id="ah3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c99a4e"/></marker></defs><rect x="120" y="70" width="140" height="46" rx="0" fill="#fbf3e4" stroke="#c99a4e" stroke-width="1.6"/><text x="190" y="98" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Buen Amor</text><rect x="120" y="116" width="140" height="46" rx="0" fill="#ffffff" stroke="#c99a4e" stroke-width="1.6"/><text x="190" y="144" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Tierra</text><rect x="120" y="162" width="140" height="46" rx="0" fill="#ffffff" stroke="#c99a4e" stroke-width="1.6"/><text x="190" y="190" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Tres Deseos</text><text x="60" y="100" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#c44444" font-weight="700">tope</text><line x1="86" y1="96" x2="116" y2="96" stroke="#c44444" stroke-width="2" marker-end="url(#ah3)"/><text x="150" y="22" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">push</text><line x1="150" y1="28" x2="150" y2="64" stroke="#6f9d7c" stroke-width="2" marker-end="url(#ah3)"/><text x="232" y="22" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#c99a4e" font-weight="700">pop</text><line x1="232" y1="64" x2="232" y2="28" stroke="#c99a4e" stroke-width="2" marker-end="url(#ah3)"/><text x="190" y="222" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#c99a4e" font-style="italic">base</text><text x="320" y="140" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#c99a4e" font-style="italic">último en</text><text x="320" y="154" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#c99a4e" font-style="italic">entrar,</text><text x="320" y="168" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#c99a4e" font-style="italic">primero en</text><text x="320" y="182" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#c99a4e" font-style="italic">salir (LIFO)</text></svg>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#c99a4e;">Qué operaciones tiene y cuánto cuestan</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Operación</th><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Costo</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>push</code>: poner encima</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>pop</code>: sacar el de encima</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>peek</code>: mirar el de encima sin sacarlo</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar algo en la pila</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n)</td></tr></tbody></table></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#c99a4e;">¿Cuándo usarla y cuándo evitarla?</h3>
<div style="display:flex; gap:1rem; flex-wrap:wrap;"><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #3f7f55;"><p style="margin:0 0 0.4rem; font-weight:700; color:#3f7f55;">✓ Úsala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Hay que deshacer en <strong>orden inverso</strong>: lo último que hiciste se revierte primero.</li><li style="margin-bottom:0.35rem;">Vuelves atrás por donde viniste: backtracking, recursión, el botón "atrás".</li><li style="margin-bottom:0.35rem;">Validas cosas anidadas: paréntesis, llaves, etiquetas HTML.</li><li style="margin-bottom:0.35rem;">Recorres un grafo o un árbol en profundidad (DFS) sin recursión.</li></ul></div><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #a83a3a;"><p style="margin:0 0 0.4rem; font-weight:700; color:#a83a3a;">✗ Evítala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Necesitas atender por orden de llegada: eso es una cola.</li><li style="margin-bottom:0.35rem;">Necesitas llegar a un elemento del medio: una pila solo deja ver el de encima.</li><li style="margin-bottom:0.35rem;">Necesitas recorrer en el orden en que se guardaron.</li></ul></div></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#c99a4e;">¿Dónde se usa en aplicaciones y sistemas?</h3>
<div class="content-box" style="margin:0;"><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Deshacer y rehacer: Word, Photoshop y VS Code guardan tus acciones en una pila.</li><li style="margin-bottom:0.35rem;">Botón "atrás" del navegador.</li><li style="margin-bottom:0.35rem;">Cada lenguaje tiene una pila de llamadas: cuando una función llama a otra, se apila.</li><li style="margin-bottom:0.35rem;">Validar paréntesis o etiquetas HTML, evaluar expresiones y resolver Sudokus (backtracking).</li></ul></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#c99a4e;">¿Cómo la usas en un lenguaje de programación?</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Lenguaje</th><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Cómo se llama</th><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Cómo se escribe</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Python</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>list</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>pila.append(x)</code> y <code>pila.pop()</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">JavaScript</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>Array</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>pila.push(x)</code> y <code>pila.pop()</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Java</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>Deque</code> (por ejemplo <code>ArrayDeque</code>)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>pila.push(x)</code> y <code>pila.pop()</code></td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">pila.py</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>pila = []                         <span class="code-com"># una list sirve como pila</span>

pila.append("Tres Deseos")        <span class="code-com"># push</span>
pila.append("Mi Tierra")          <span class="code-com"># push</span>
pila.append("Mi Buen Amor")       <span class="code-com"># push</span>

print(pila[-1])                   <span class="code-com"># peek -&gt; "Mi Buen Amor" (el de encima)</span>
print(pila.pop())                 <span class="code-com"># pop  -&gt; "Mi Buen Amor" (último en entrar, primero en salir)</span>
print(pila.pop())                 <span class="code-com"># pop  -&gt; "Mi Tierra"</span>

<span class="code-com"># Recorrido en profundidad (DFS) iterativo: usa una pila</span>
<span class="code-com"># pila = [inicio]; mientras haya elementos: sacar uno y apilar sus vecinos</span></code></pre>
</div>
<p style="font-size:0.9rem;">Tampoco la construyes: la <code>list</code> de Python ya hace de pila.</p>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#c99a4e;">¿Cómo se usa en una base de datos? (casi siempre por dentro)</h3>
<p style="font-size:0.9rem;">En una base de datos casi nunca <strong>llamas</strong> a la estructura: escribes SQL y el motor decide cuándo usarla por dentro. La columna "Qué haces tú" es lo único que escribes.</p>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Dónde</th><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Cómo aparece</th><th style="padding:0.4rem 0.6rem; background:#c99a4e; color:#fff; text-align:left;">Qué haces tú</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">SQL (transacciones)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>SAVEPOINT</code> y <code>ROLLBACK TO</code> se comportan parecido a una pila.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Marcas puntos con <code>SAVEPOINT</code> y vuelves con <code>ROLLBACK TO</code>.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Redis</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Un <code>LIST</code> usado por un solo extremo.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>LPUSH</code> para apilar y <code>LPOP</code> para sacar.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">El motor de consultas</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Usa pilas al analizar consultas SQL anidadas.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No haces nada: es interno.</td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">savepoint.sql</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>START TRANSACTION;
INSERT INTO tbl_pagos_suscripcion (monto, id_usuario) VALUES (25000, 1);
SAVEPOINT despues_del_pago;

UPDATE tbl_usuarios SET estado_activo = 0 WHERE idusuario = 1;
ROLLBACK TO despues_del_pago;     <span class="code-com">-- deshace solo el UPDATE; el INSERT sigue en pie</span>
COMMIT;</code></pre>
</div>
<p style="font-size:0.9rem;">Es una comparación, no una pila literal: los savepoints permiten volver a un punto anterior, y lo último que hiciste se deshace primero. Tiene que ver con el <code>ROLLBACK</code> que viste en las transacciones.</p>
<div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;"><p style="margin:0 0 0.4rem;"><strong>¿La uso o la tengo que construir?</strong> La usas tal cual: <code>list</code> ya es una pila.</p><p style="margin:0; color:#a83a3a;"><strong>Ojo:</strong> <code>pop()</code> sobre una pila vacía lanza <code>IndexError</code>. Revisa <code>if pila:</code> antes de sacar.</p></div>
</div>
<div class="activity-section" id="colas" style="border-left:5px solid #7fa5a3; padding-left:1.2rem;">
  <div class="activity-section-header"><h3 style="color:#7fa5a3;">4. Colas (FIFO)</h3></div>
  <p style="font-size:1rem;"><strong>La fila del banco: el primero en llegar es el primero en ser atendido.</strong></p>
  <p>Úsala cuando importe el orden de llegada.</p>
<svg viewBox="0 0 620 160" xmlns="http://www.w3.org/2000/svg" style="max-width:620px; width:100%; height:auto; display:block; margin:0.8rem auto;"><defs><marker id="ah4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7fa5a3"/></marker></defs><rect x="150" y="50" width="120" height="46" rx="0" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.6"/><text x="210" y="78" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Tres Deseos</text><rect x="270" y="50" width="120" height="46" rx="0" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.6"/><text x="330" y="78" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Tierra</text><rect x="390" y="50" width="120" height="46" rx="0" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.6"/><text x="450" y="78" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Mi Buen Amor</text><line x1="146" y1="73" x2="36" y2="73" stroke="#c44444" stroke-width="2" marker-end="url(#ah4)"/><text x="86" y="64" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#c44444" font-weight="700">sale</text><line x1="600" y1="73" x2="514" y2="73" stroke="#6f9d7c" stroke-width="2" marker-end="url(#ah4)"/><text x="560" y="64" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">entra</text><text x="210" y="116" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#7fa5a3" font-weight="700">frente</text><text x="450" y="116" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#7fa5a3" font-weight="700">final</text><text x="310" y="146" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#7fa5a3" font-style="italic">el primero en entrar es el primero en salir (FIFO)</text></svg>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#7fa5a3;">Qué operaciones tiene y cuánto cuestan</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Operación</th><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Costo</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Encolar (entrar por el final)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Desencolar (salir por el frente)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1) con <code>deque</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Ver quién está de primero</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Desencolar con <code>list.pop(0)</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n): evítalo</td></tr></tbody></table></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#7fa5a3;">¿Cuándo usarla y cuándo evitarla?</h3>
<div style="display:flex; gap:1rem; flex-wrap:wrap;"><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #3f7f55;"><p style="margin:0 0 0.4rem; font-weight:700; color:#3f7f55;">✓ Úsala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Hay que atender por <strong>orden de llegada</strong>: turnos, pedidos, peticiones.</li><li style="margin-bottom:0.35rem;">Tienes tareas pendientes que otro proceso va a ir sacando una por una.</li><li style="margin-bottom:0.35rem;">Recorres un grafo por niveles (BFS) o procesas "primero los más cercanos".</li><li style="margin-bottom:0.35rem;">Quieres amortiguar picos: guardar lo que llega mientras algo más lento lo procesa.</li></ul></div><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #a83a3a;"><p style="margin:0 0 0.4rem; font-weight:700; color:#a83a3a;">✗ Evítala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Lo último que entra debe salir primero: eso es una pila.</li><li style="margin-bottom:0.35rem;">Algunos elementos son más urgentes que otros: necesitas una cola de prioridad (<code>heapq</code>).</li><li style="margin-bottom:0.35rem;">Necesitas buscar un elemento que está en medio de la fila.</li></ul></div></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#7fa5a3;">¿Dónde se usa en aplicaciones y sistemas?</h3>
<div class="content-box" style="margin:0;"><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Colas de tareas en segundo plano: Celery en Python, RabbitMQ, Amazon SQS.</li><li style="margin-bottom:0.35rem;">Kafka: registra eventos en orden, y varios consumidores los leen en ese orden.</li><li style="margin-bottom:0.35rem;">Cola de impresión, peticiones a un servidor web y buffer de streaming de música o video.</li><li style="margin-bottom:0.35rem;">Planificador de procesos de un sistema operativo.</li></ul></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#7fa5a3;">¿Cómo la usas en un lenguaje de programación?</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Lenguaje</th><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Cómo se llama</th><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Cómo se escribe</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Python</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>collections.deque</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>cola.append(x)</code> y <code>cola.popleft()</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">JavaScript</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>Array</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>cola.push(x)</code> y <code>cola.shift()</code> (sirve; con colas muy grandes conviene otra estructura)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Java</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>Queue</code> (por ejemplo <code>ArrayDeque</code>)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>cola.offer(x)</code> y <code>cola.poll()</code></td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">cola.py</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>from collections import deque

cola = deque()
cola.append("Tres Deseos")        <span class="code-com"># encolar</span>
cola.append("Mi Tierra")
cola.append("Mi Buen Amor")

print(cola.popleft())             <span class="code-com"># desencolar -&gt; "Tres Deseos" (el primero que entró)</span>
print(cola[0])                    <span class="code-com"># frente    -&gt; "Mi Tierra"</span>
print(len(cola))                  <span class="code-com"># 2</span>

<span class="code-com"># Cuidado: lista.pop(0) también funciona, pero es O(n) porque corre todos los elementos.</span></code></pre>
</div>
<p style="font-size:0.9rem;">La cola también viene hecha, y la usas con <code>deque</code>. Es la estructura que usa el BFS.</p>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#7fa5a3;">¿Cómo se usa en una base de datos? (casi siempre por dentro)</h3>
<p style="font-size:0.9rem;">En una base de datos casi nunca <strong>llamas</strong> a la estructura: escribes SQL y el motor decide cuándo usarla por dentro. La columna "Qué haces tú" es lo único que escribes.</p>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Dónde</th><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Cómo aparece</th><th style="padding:0.4rem 0.6rem; background:#7fa5a3; color:#fff; text-align:left;">Qué haces tú</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">MySQL y PostgreSQL</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No tienen un tipo cola: una tabla de tareas pendientes hace ese papel.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>SELECT ... ORDER BY creada_at LIMIT 1</code>, con <code>FOR UPDATE SKIP LOCKED</code> si hay varios procesos.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Redis</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Un <code>LIST</code> usado por los dos extremos.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>LPUSH</code> para encolar y <code>RPOP</code> para desencolar.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">RabbitMQ, Kafka, SQS</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No son bases de datos tradicionales: son sistemas hechos para colas y eventos.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Publicas mensajes y otro programa los consume.</td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">cola_de_tareas.sql</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code><span class="code-com">-- Ejemplo inventado: una tabla de tareas usada como cola (el más antiguo primero).</span>
SELECT id_tarea, detalle
FROM tbl_tareas
WHERE estado = 'pendiente'
ORDER BY creada_at ASC
LIMIT 1;</code></pre>
</div>
<p style="font-size:0.9rem;"><code>tbl_tareas</code> no existe en SoundFlow: es un ejemplo del patrón. Muchas aplicaciones guardan trabajos pendientes así. Si varios procesos leen a la vez, se combina con <code>FOR UPDATE SKIP LOCKED</code> (disponible en PostgreSQL y en MySQL 8).</p>
<div class="content-box" style="border-left:4px solid #7fa5a3; margin-top:1rem;"><p style="margin:0 0 0.4rem;"><strong>¿La uso o la tengo que construir?</strong> La usas tal cual: <code>deque</code> ya es una cola.</p><p style="margin:0; color:#a83a3a;"><strong>Ojo:</strong> <code>popleft()</code> sobre un <code>deque</code> vacío lanza <code>IndexError</code>. Y no uses <code>list.pop(0)</code> en colas grandes.</p></div>
</div>
<div class="activity-section" id="grafos" style="border-left:5px solid #6f9d7c; padding-left:1.2rem;">
  <div class="activity-section-header"><h3 style="color:#6f9d7c;">5. Grafos</h3></div>
  <p style="font-size:1rem;"><strong>Cosas (nodos) conectadas por relaciones (aristas).</strong></p>
  <p>Úsalo cuando lo importante son las relaciones entre las cosas.</p>
<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" style="max-width:560px; width:100%; height:auto; display:block; margin:0.8rem auto;"><defs><marker id="ah5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#6f9d7c"/></marker></defs><line x1="230" y1="50" x2="140" y2="50" stroke="#8aa99a" stroke-width="2"/><line x1="140" y1="50" x2="50" y2="50" stroke="#8aa99a" stroke-width="2"/><line x1="320" y1="50" x2="230" y2="50" stroke="#8aa99a" stroke-width="2"/><line x1="320" y1="50" x2="320" y2="130" stroke="#8aa99a" stroke-width="2"/><line x1="320" y1="130" x2="430" y2="90" stroke="#8aa99a" stroke-width="2"/><line x1="430" y1="90" x2="430" y2="170" stroke="#8aa99a" stroke-width="2"/><line x1="320" y1="130" x2="430" y2="170" stroke="#8aa99a" stroke-width="2"/><line x1="430" y1="170" x2="520" y2="170" stroke="#8aa99a" stroke-width="2"/><line x1="320" y1="210" x2="320" y2="130" stroke="#8aa99a" stroke-width="2"/><line x1="320" y1="210" x2="430" y2="215" stroke="#8aa99a" stroke-width="2"/><circle cx="50" cy="50" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="50" y="54" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">QUE</text><circle cx="140" cy="50" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="140" y="54" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">BIZ</text><circle cx="230" cy="50" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="230" y="54" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">SHA</text><circle cx="320" cy="50" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="320" y="54" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">KAR</text><circle cx="320" cy="130" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="320" y="134" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">JBA</text><circle cx="430" cy="90" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="430" y="94" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">BAD</text><circle cx="430" cy="170" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="430" y="174" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">DUA</text><circle cx="520" cy="170" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="520" y="174" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">ELT</text><circle cx="320" cy="210" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="320" y="214" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">ROS</text><circle cx="430" cy="215" r="19" fill="#ffffff" stroke="#6f9d7c" stroke-width="2"/><text x="430" y="219" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#33404f" font-weight="700">RAU</text><text x="110" y="120" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#6f9d7c" font-style="italic">nodo = artista</text><text x="110" y="136" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#6f9d7c" font-style="italic">arista = colaboración</text><text x="110" y="152" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#6f9d7c" font-style="italic">(sin dirección)</text></svg>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#6f9d7c;">Qué operaciones tiene y cuánto cuestan</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Operación</th><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Costo</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Agregar un nodo o una arista (lista de adyacencia)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Ver los vecinos de un nodo</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(grado del nodo)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Saber si dos nodos están conectados (lista)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(grado); con matriz O(1)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Recorrer todo (BFS o DFS)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(V + E): nodos más aristas</td></tr></tbody></table></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#6f9d7c;">¿Cuándo usarla y cuándo evitarla?</h3>
<div style="display:flex; gap:1rem; flex-wrap:wrap;"><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #3f7f55;"><p style="margin:0 0 0.4rem; font-weight:700; color:#3f7f55;">✓ Úsala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Lo importante son las <strong>relaciones</strong> entre las cosas: amigos, colaboraciones, rutas, dependencias.</li><li style="margin-bottom:0.35rem;">Preguntas como "¿cómo llego de A a B?" o "¿quién está conectado con quién?".</li><li style="margin-bottom:0.35rem;">Las relaciones son muchos a muchos y te interesan los caminos de varios saltos.</li><li style="margin-bottom:0.35rem;">Quieres recomendar algo a partir de lo que hicieron usuarios parecidos.</li></ul></div><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #a83a3a;"><p style="margin:0 0 0.4rem; font-weight:700; color:#a83a3a;">✗ Evítala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Los datos son independientes y no se relacionan: una tabla o una lista basta.</li><li style="margin-bottom:0.35rem;">La relación es de un solo nivel: un <code>JOIN</code> lo resuelve sin armar un grafo.</li><li style="margin-bottom:0.35rem;">Es una jerarquía estricta (cada elemento tiene un solo padre): eso es un árbol.</li></ul></div></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#6f9d7c;">¿Dónde se usa en aplicaciones y sistemas?</h3>
<div class="content-box" style="margin:0;"><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Redes sociales: LinkedIn, Facebook e Instagram modelan personas conectadas por amistades o seguidores.</li><li style="margin-bottom:0.35rem;">Mapas y rutas: Google Maps y Waze buscan el camino más corto sobre un grafo de calles.</li><li style="margin-bottom:0.35rem;">Git: el historial de commits es un grafo. Los gestores de paquetes (npm, pip) resuelven dependencias con grafos.</li><li style="margin-bottom:0.35rem;">Detección de fraude y recomendaciones: relacionan usuarios con lo que compran o escuchan.</li></ul></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#6f9d7c;">¿Cómo la usas en un lenguaje de programación?</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Lenguaje</th><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Cómo se llama</th><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Cómo se escribe</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Python</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>dict</code> de listas, o la librería <code>networkx</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>grafo = {"SHA": ["BIZ", "KAR"]}</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">JavaScript</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Objeto o <code>Map</code> de arreglos</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>const grafo = { SHA: ["BIZ", "KAR"] };</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Java</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>Map</code> de listas</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>Map&lt;String, List&lt;String&gt;&gt; grafo = new HashMap&lt;&gt;();</code></td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">grafo.py</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>from collections import deque

<span class="code-com"># Lista de adyacencia: cada artista con la lista de quienes colaboraron con él</span>
grafo = {
    "SHA": ["BIZ", "KAR"],
    "BIZ": ["SHA", "QUE"],
    "QUE": ["BIZ"],
    "KAR": ["SHA", "JBA"],
    "JBA": ["KAR", "BAD", "DUA", "ROS"],
    "BAD": ["JBA", "DUA"],
    "DUA": ["BAD", "JBA", "ELT"],
    "ELT": ["DUA"],
    "ROS": ["JBA", "RAU"],
    "RAU": ["ROS"],
}

def bfs(grafo, inicio):                 <span class="code-com"># recorrido en anchura: usa una COLA</span>
    visitados = {inicio}
    cola = deque([inicio])
    while cola:
        nodo = cola.popleft()
        print(nodo, end=" ")
        for vecino in grafo[nodo]:
            if vecino not in visitados:
                visitados.add(vecino)
                cola.append(vecino)

bfs(grafo, "SHA")     <span class="code-com"># SHA BIZ KAR QUE JBA BAD DUA ROS ELT RAU</span>

<span class="code-com"># Con la librería networkx (pip install networkx):</span>
import networkx as nx
G = nx.Graph(grafo)                     <span class="code-com"># acepta el dict directamente</span>
print(nx.shortest_path(G, "SHA", "ELT"))   <span class="code-com"># ['SHA', 'KAR', 'JBA', 'DUA', 'ELT']</span>
print(G.degree("JBA"))                  <span class="code-com"># 4</span></code></pre>
</div>
<p style="font-size:0.9rem;">Normalmente <strong>tú armas la estructura</strong> (el <code>dict</code>) y el recorrido, o dejas que <code>networkx</code> lo haga. BFS usa una cola y DFS usa una pila.</p>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#6f9d7c;">¿Cómo se usa en una base de datos? (casi siempre por dentro)</h3>
<p style="font-size:0.9rem;">En una base de datos casi nunca <strong>llamas</strong> a la estructura: escribes SQL y el motor decide cuándo usarla por dentro. La columna "Qué haces tú" es lo único que escribes.</p>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Dónde</th><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Cómo aparece</th><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Qué haces tú</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">MySQL y PostgreSQL</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Una tabla de relaciones, como <code>tbl_reproducciones</code>, representa las aristas.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Consultas con <code>JOIN</code>; para varios saltos, <code>WITH RECURSIVE</code> (MySQL 8.0+).</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Neo4j</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Base de datos de grafos, con su propio lenguaje (Cypher).</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>MATCH (a:Artista)-[:COLABORA_CON]-(b:Artista) RETURN a, b</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Amazon Neptune</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Otra base de datos de grafos, administrada en la nube.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Cargas nodos y aristas y consultas los caminos.</td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">grafo_de_reproducciones.sql</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code><span class="code-com">-- Cada fila de tbl_reproducciones es una arista: usuario -&gt; canción.</span>
SELECT id_usuario, id_cancion
FROM tbl_reproducciones;

<span class="code-com">-- Grado de cada canción: a cuántos usuarios está conectada.</span>
SELECT id_cancion, COUNT(*) AS grado
FROM tbl_reproducciones
GROUP BY id_cancion
ORDER BY grado DESC;</code></pre>
</div>
<p style="font-size:0.9rem;">Es el mismo grafo de la práctica: los usuarios y las canciones son los nodos, y cada fila de la tabla es una arista. En SQL no se "dibuja" el grafo, se consulta la tabla que lo representa.</p>
<div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:1rem;"><p style="margin:0 0 0.4rem;"><strong>¿La uso o la tengo que construir?</strong> La usas: armas la estructura tú (un <code>dict</code> basta) o usas una librería como <code>networkx</code>.</p><p style="margin:0; color:#a83a3a;"><strong>Ojo:</strong> si no marcas los nodos visitados, el recorrido da vueltas para siempre en los ciclos. Y en un grafo sin dirección, cada conexión se guarda en las dos listas (A tiene a B y B tiene a A).</p></div>
</div>
<div class="activity-section" id="arboles" style="border-left:5px solid #5f8582; padding-left:1.2rem;">
  <div class="activity-section-header"><h3 style="color:#5f8582;">6. Árboles</h3></div>
  <p style="font-size:1rem;"><strong>Una jerarquía: una raíz de la que salen ramas, y cada rama puede tener más ramas.</strong></p>
  <p>Úsalo para jerarquías y para buscar rápido en datos ordenados.</p>
<svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" style="max-width:420px; width:100%; height:auto; display:block; margin:0.8rem auto;"><defs><marker id="ah6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5f8582"/></marker></defs><line x1="210" y1="30" x2="120" y2="95" stroke="#8aa9a7" stroke-width="2"/><line x1="210" y1="30" x2="300" y2="95" stroke="#8aa9a7" stroke-width="2"/><line x1="120" y1="95" x2="70" y2="165" stroke="#8aa9a7" stroke-width="2"/><line x1="120" y1="95" x2="170" y2="165" stroke="#8aa9a7" stroke-width="2"/><line x1="300" y1="95" x2="250" y2="165" stroke="#8aa9a7" stroke-width="2"/><line x1="300" y1="95" x2="350" y2="165" stroke="#8aa9a7" stroke-width="2"/><circle cx="210" cy="30" r="19" fill="#ffffff" stroke="#5f8582" stroke-width="2"/><text x="210" y="35" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#33404f" font-weight="700">50</text><circle cx="120" cy="95" r="19" fill="#ffffff" stroke="#5f8582" stroke-width="2"/><text x="120" y="100" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#33404f" font-weight="700">30</text><circle cx="300" cy="95" r="19" fill="#ffffff" stroke="#5f8582" stroke-width="2"/><text x="300" y="100" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#33404f" font-weight="700">70</text><circle cx="70" cy="165" r="19" fill="#e6f1f0" stroke="#5f8582" stroke-width="2"/><text x="70" y="170" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#33404f" font-weight="700">20</text><circle cx="170" cy="165" r="19" fill="#e6f1f0" stroke="#5f8582" stroke-width="2"/><text x="170" y="170" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#33404f" font-weight="700">40</text><circle cx="250" cy="165" r="19" fill="#e6f1f0" stroke="#5f8582" stroke-width="2"/><text x="250" y="170" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#33404f" font-weight="700">60</text><circle cx="350" cy="165" r="19" fill="#e6f1f0" stroke="#5f8582" stroke-width="2"/><text x="350" y="170" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#33404f" font-weight="700">80</text><text x="262" y="34" text-anchor="start" font-family="Segoe UI, sans-serif" font-size="11" fill="#5f8582" font-style="italic">raíz</text><text x="375" y="168" text-anchor="start" font-family="Segoe UI, sans-serif" font-size="11" fill="#5f8582" font-style="italic">hojas</text><text x="210" y="212" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#5f8582" font-style="italic">menores a la izquierda, mayores a la derecha:</text><text x="210" y="227" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#5f8582" font-style="italic">buscar descarta media rama en cada paso</text></svg>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5f8582;">Qué operaciones tiene y cuánto cuestan</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Operación</th><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Costo</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar, insertar o eliminar (árbol balanceado)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(log n)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Lo mismo en un árbol desbalanceado (peor caso)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n)</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Recorrer todos los nodos</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(n)</td></tr></tbody></table></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5f8582;">¿Cuándo usarla y cuándo evitarla?</h3>
<div style="display:flex; gap:1rem; flex-wrap:wrap;"><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #3f7f55;"><p style="margin:0 0 0.4rem; font-weight:700; color:#3f7f55;">✓ Úsala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Tus datos son una <strong>jerarquía</strong>: carpetas, categorías, organigramas, comentarios con respuestas.</li><li style="margin-bottom:0.35rem;">Necesitas buscar rápido en datos ordenados y que se insertan seguido.</li><li style="margin-bottom:0.35rem;">Necesitas recorrer en orden o por rangos (<code>BETWEEN</code>, "los mayores que 50").</li><li style="margin-bottom:0.35rem;">Necesitas siempre el menor o el mayor elemento (montículo, <code>heapq</code>).</li></ul></div><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #a83a3a;"><p style="margin:0 0 0.4rem; font-weight:700; color:#a83a3a;">✗ Evítala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Tienes pocos datos: una lista ordenada basta.</li><li style="margin-bottom:0.35rem;">Los datos no tienen jerarquía ni orden que aprovechar.</li><li style="margin-bottom:0.35rem;">Un elemento puede tener varios padres o formar ciclos: eso es un grafo.</li></ul></div></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5f8582;">¿Dónde se usa en aplicaciones y sistemas?</h3>
<div class="content-box" style="margin:0;"><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Sistemas de archivos: las carpetas de Windows y Linux forman un árbol.</li><li style="margin-bottom:0.35rem;">Páginas web: el DOM de HTML es un árbol de etiquetas. JSON y XML también.</li><li style="margin-bottom:0.35rem;">Organigramas, categorías de una tienda y comentarios anidados.</li><li style="margin-bottom:0.35rem;">Compiladores e intérpretes: convierten tu código en un árbol (AST) antes de ejecutarlo.</li></ul></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5f8582;">¿Cómo la usas en un lenguaje de programación?</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Lenguaje</th><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Cómo se llama</th><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Cómo se escribe</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Python</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Clases propias; <code>heapq</code> para montículos; <code>bisect</code> sobre una lista ordenada</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>class NodoArbol: ...</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">JavaScript</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Clases u objetos anidados</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>{ valor: 50, izquierdo: null, derecho: null }</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Java</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>TreeMap</code> y <code>TreeSet</code> (árbol balanceado)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>TreeMap&lt;Integer, String&gt; mapa = new TreeMap&lt;&gt;();</code></td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">arbol.py</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None       <span class="code-com"># hijos menores</span>
        self.derecho = None         <span class="code-com"># hijos mayores</span>

def insertar(raiz, valor):
    if raiz is None:
        return NodoArbol(valor)
    if valor &lt; raiz.valor:
        raiz.izquierdo = insertar(raiz.izquierdo, valor)
    else:
        raiz.derecho = insertar(raiz.derecho, valor)
    return raiz

def buscar(raiz, valor):
    if raiz is None:
        return False
    if valor == raiz.valor:
        return True
    siguiente = raiz.izquierdo if valor &lt; raiz.valor else raiz.derecho
    return buscar(siguiente, valor)  <span class="code-com"># descarta la mitad de los nodos en cada paso</span>

raiz = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    raiz = insertar(raiz, v)

print(buscar(raiz, 60))             <span class="code-com"># True</span>
print(buscar(raiz, 65))             <span class="code-com"># False</span></code></pre>
</div>
<p style="font-size:0.9rem;">Solo la programas si tu problema es jerárquico. Para buscar rápido en una base de datos no escribes un árbol: creas un índice y el motor ya lo usa.</p>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#5f8582;">¿Cómo se usa en una base de datos? (casi siempre por dentro)</h3>
<p style="font-size:0.9rem;">En una base de datos casi nunca <strong>llamas</strong> a la estructura: escribes SQL y el motor decide cuándo usarla por dentro. La columna "Qué haces tú" es lo único que escribes.</p>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Dónde</th><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Cómo aparece</th><th style="padding:0.4rem 0.6rem; background:#5f8582; color:#fff; text-align:left;">Qué haces tú</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">MySQL y PostgreSQL</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Los índices son árboles B-Tree o B+Tree.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>CREATE INDEX idx_titulo ON tbl_canciones (titulo);</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Jerarquías en tablas</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Una columna <code>id_padre</code> en la misma tabla representa un árbol.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Se recorre con <code>WITH RECURSIVE</code>.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Planes de ejecución</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">El plan de una consulta es un árbol de operaciones.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Lo miras con <code>EXPLAIN</code>.</td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">indice_btree.sql</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code><span class="code-com">-- El índice es un B+Tree que el motor construye y mantiene por ti.</span>
CREATE INDEX idx_titulo ON tbl_canciones (titulo);

<span class="code-com">-- EXPLAIN muestra cómo piensa ejecutar la consulta.</span>
EXPLAIN SELECT * FROM tbl_canciones WHERE titulo = 'Mi Tierra';</code></pre>
</div>
<p style="font-size:0.9rem;">Con un índice, el motor baja por el árbol hasta la fila en vez de leer toda la tabla. Con solo 10 filas, el motor puede preferir leer la tabla completa, y el beneficio se nota con miles o millones de filas.</p>
<div class="content-box" style="border-left:4px solid #5f8582; margin-top:1rem;"><p style="margin:0 0 0.4rem;"><strong>¿La uso o la tengo que construir?</strong> Rara vez la construyes: la usas con índices o con las librerías y estructuras del lenguaje.</p><p style="margin:0; color:#a83a3a;"><strong>Ojo:</strong> un árbol desbalanceado se degrada. Si insertas 10, 20, 30, 40... ya ordenados, queda como una lista y buscar cuesta O(n). Por eso existen los árboles balanceados (AVL, B-Tree).</p></div>
</div>
<div class="activity-section" id="tries" style="border-left:5px solid #b8704f; padding-left:1.2rem;">
  <div class="activity-section-header"><h3 style="color:#b8704f;">7. Tries (árboles de prefijos)</h3></div>
  <p style="font-size:1rem;"><strong>Un árbol donde cada nivel es una letra y cada camino de la raíz forma una palabra.</strong></p>
  <p>Úsalo cuando necesites buscar o autocompletar por prefijo en muchas palabras.</p>
<svg viewBox="0 0 540 290" xmlns="http://www.w3.org/2000/svg" style="max-width:540px; width:100%; height:auto; display:block; margin:0.8rem auto;"><defs><marker id="ah7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#b8704f"/></marker></defs><line x1="230" y1="28" x2="130" y2="88" stroke="#d1a58f" stroke-width="2"/><line x1="230" y1="28" x2="330" y2="88" stroke="#d1a58f" stroke-width="2"/><line x1="130" y1="88" x2="130" y2="148" stroke="#d1a58f" stroke-width="2"/><line x1="330" y1="88" x2="330" y2="148" stroke="#d1a58f" stroke-width="2"/><line x1="130" y1="148" x2="80" y2="208" stroke="#d1a58f" stroke-width="2"/><line x1="130" y1="148" x2="180" y2="208" stroke="#d1a58f" stroke-width="2"/><line x1="330" y1="148" x2="330" y2="208" stroke="#d1a58f" stroke-width="2"/><circle cx="230" cy="28" r="16" fill="#fbeee8" stroke="#b8704f" stroke-width="2"/><text x="230" y="32" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="16" fill="#b8704f" font-weight="700">·</text><circle cx="130" cy="88" r="18" fill="#ffffff" stroke="#b8704f" stroke-width="2"/><text x="130" y="93" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#33404f" font-weight="700">S</text><circle cx="330" cy="88" r="18" fill="#ffffff" stroke="#b8704f" stroke-width="2"/><text x="330" y="93" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#33404f" font-weight="700">M</text><circle cx="130" cy="148" r="18" fill="#ffffff" stroke="#b8704f" stroke-width="2"/><text x="130" y="153" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#33404f" font-weight="700">O</text><circle cx="330" cy="148" r="18" fill="#ffffff" stroke="#b8704f" stroke-width="2"/><text x="330" y="153" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#33404f" font-weight="700">A</text><circle cx="80" cy="208" r="23" fill="#ffffff" stroke="#b8704f" stroke-width="1.4"/><circle cx="80" cy="208" r="18" fill="#fbeee8" stroke="#b8704f" stroke-width="2"/><text x="80" y="213" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#33404f" font-weight="700">L</text><circle cx="180" cy="208" r="23" fill="#ffffff" stroke="#b8704f" stroke-width="1.4"/><circle cx="180" cy="208" r="18" fill="#fbeee8" stroke="#b8704f" stroke-width="2"/><text x="180" y="213" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#33404f" font-weight="700">N</text><circle cx="330" cy="208" r="23" fill="#ffffff" stroke="#b8704f" stroke-width="1.4"/><circle cx="330" cy="208" r="18" fill="#fbeee8" stroke="#b8704f" stroke-width="2"/><text x="330" y="213" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#33404f" font-weight="700">R</text><text x="256" y="32" text-anchor="start" font-family="Segoe UI, sans-serif" font-size="11" fill="#b8704f" font-style="italic">raíz (vacía)</text><text x="375" y="204" text-anchor="start" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#b8704f" font-style="italic">círculo doble: aquí</text><text x="375" y="218" text-anchor="start" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#b8704f" font-style="italic">termina una palabra</text><text x="270" y="258" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#b8704f" font-style="italic">palabras guardadas: SOL, SON, MAR</text><text x="270" y="274" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#b8704f" font-style="italic">(SOL y SON comparten el camino S, O)</text></svg>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#b8704f;">Qué operaciones tiene y cuánto cuestan</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Operación</th><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Costo</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Insertar una palabra</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(L), con L = largo de la palabra</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar una palabra</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(L), sin importar cuántas palabras haya</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar todo lo que empieza con un prefijo</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">O(L) para llegar al prefijo, más lo que devuelva</td></tr></tbody></table></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#b8704f;">¿Cuándo usarla y cuándo evitarla?</h3>
<div style="display:flex; gap:1rem; flex-wrap:wrap;"><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #3f7f55;"><p style="margin:0 0 0.4rem; font-weight:700; color:#3f7f55;">✓ Úsala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Necesitas <strong>autocompletar</strong> o buscar por prefijo en muchas palabras.</li><li style="margin-bottom:0.35rem;">Quieres saber rápido si una palabra existe en un diccionario grande.</li><li style="margin-bottom:0.35rem;">Enrutas por prefijos: direcciones IP, rutas de URL.</li><li style="margin-bottom:0.35rem;">Muchas palabras comparten el mismo comienzo, y por eso el trie ahorra comparaciones.</li></ul></div><div class="content-box" style="flex:1; min-width:260px; margin:0; border-left:4px solid #a83a3a;"><p style="margin:0 0 0.4rem; font-weight:700; color:#a83a3a;">✗ Evítala cuando...</p><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Tienes pocas palabras: una lista con <code>startswith()</code> es más simple.</li><li style="margin-bottom:0.35rem;">Buscas texto que "contenga" algo en cualquier parte: el prefijo no ayuda.</li><li style="margin-bottom:0.35rem;">La memoria es limitada: el trie guarda un nodo por letra.</li></ul></div></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#b8704f;">¿Dónde se usa en aplicaciones y sistemas?</h3>
<div class="content-box" style="margin:0;"><ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;"><li style="margin-bottom:0.35rem;">Autocompletado del buscador y teclado predictivo del celular.</li><li style="margin-bottom:0.35rem;">Correctores ortográficos y diccionarios.</li><li style="margin-bottom:0.35rem;">Tablas de enrutamiento de IP: los routers buscan el prefijo de red más largo.</li><li style="margin-bottom:0.35rem;">Algunos frameworks web buscan la ruta de una URL con árboles de prefijos.</li></ul></div>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#b8704f;">¿Cómo la usas en un lenguaje de programación?</h3>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Lenguaje</th><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Cómo se llama</th><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Cómo se escribe</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Python</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No lo trae. <code>dict</code> anidado, o librerías como <code>pygtrie</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>nodo.hijos["M"]</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">JavaScript</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No lo trae. Objeto o <code>Map</code> anidado</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>nodo.hijos.get("M")</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Java</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No lo trae. <code>HashMap</code> anidado</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>nodo.hijos.get('M')</code></td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">trie.py</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code>class NodoTrie:
    def __init__(self):
        self.hijos = {}           <span class="code-com"># letra -&gt; NodoTrie</span>
        self.es_final = False     <span class="code-com"># ¿aquí termina una palabra?</span>

class Trie:
    def __init__(self):
        self.raiz = NodoTrie()

    def insertar(self, palabra):
        nodo = self.raiz
        for letra in palabra:
            nodo = nodo.hijos.setdefault(letra, NodoTrie())
        nodo.es_final = True

    def autocompletar(self, prefijo):
        nodo = self.raiz
        for letra in prefijo:         <span class="code-com"># baja siguiendo el prefijo</span>
            if letra not in nodo.hijos:
                return []
            nodo = nodo.hijos[letra]
        resultados = []
        def recorrer(n, camino):
            if n.es_final:
                resultados.append(camino)
            for letra, hijo in n.hijos.items():
                recorrer(hijo, camino + letra)
        recorrer(nodo, prefijo)
        return resultados

t = Trie()
for titulo in ["Mi Tierra", "Mi Buen Amor", "Oye Mi Amor", "Tres Deseos"]:
    t.insertar(titulo)

print(t.autocompletar("Mi "))        <span class="code-com"># ['Mi Tierra', 'Mi Buen Amor']</span></code></pre>
</div>
<p style="font-size:0.9rem;">Con pocos datos no hace falta: una <code>list</code> con <code>startswith()</code> resuelve el autocompletado. El trie vale la pena con muchas palabras y muchas búsquedas.</p>
<h3 style="margin:1.6rem 0 0.4rem; font-size:1.02rem; color:#b8704f;">¿Cómo se usa en una base de datos? (casi siempre por dentro)</h3>
<p style="font-size:0.9rem;">En una base de datos casi nunca <strong>llamas</strong> a la estructura: escribes SQL y el motor decide cuándo usarla por dentro. La columna "Qué haces tú" es lo único que escribes.</p>
<div class="content-box" style="overflow-x:auto;"><table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Dónde</th><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Cómo aparece</th><th style="padding:0.4rem 0.6rem; background:#b8704f; color:#fff; text-align:left;">Qué haces tú</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">MySQL y PostgreSQL</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No existe un tipo trie. Un índice B-Tree ayuda con <code>LIKE 'Mi%'</code>.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Escribes la consulta con el prefijo al inicio.</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Texto completo</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>FULLTEXT</code> en MySQL y búsqueda de texto en PostgreSQL, para buscar palabras dentro del texto.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Creas el índice de texto y usas <code>MATCH ... AGAINST</code> (MySQL).</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Lucene, Elasticsearch</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Motores de búsqueda con estructuras emparentadas con los tries.</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Indexas documentos y buscas por texto.</td></tr></tbody></table></div>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-dot" style="background:#ff5f56"></span><span class="code-dot" style="background:#ffbd2e"></span><span class="code-dot" style="background:#27c93f"></span>
    <span class="code-filename">busqueda_por_prefijo.sql</span>
    <button class="code-copy-btn" type="button">Copiar</button>
  </div>
  <pre><code><span class="code-com">-- Prefijo al inicio: un índice B-Tree sobre titulo puede ayudar.</span>
SELECT titulo FROM tbl_canciones WHERE titulo LIKE 'Mi %';

<span class="code-com">-- Comodín al inicio: el índice no sirve, el motor revisa fila por fila.</span>
SELECT titulo FROM tbl_canciones WHERE titulo LIKE '%Amor%';</code></pre>
</div>
<p style="font-size:0.9rem;">Es la misma idea del trie: buscar por prefijo es rápido, buscar "que contenga" en cualquier parte no lo es. Para buscadores de texto grandes se usan motores especializados.</p>
<div class="content-box" style="border-left:4px solid #b8704f; margin-top:1rem;"><p style="margin:0 0 0.4rem;"><strong>¿La uso o la tengo que construir?</strong> Depende: la usas armándola con un <code>dict</code> o con una librería. En una base de datos, el motor decide cómo buscar los prefijos.</p><p style="margin:0; color:#a83a3a;"><strong>Ojo:</strong> un trie gasta mucha memoria (un nodo por letra). Con pocas palabras, una lista es más simple y suficiente.</p></div>
</div>

  <div class="activity-section" id="elegir">
    <div class="activity-section-header"><h3>¿Cuál elijo según lo que necesito?</h3></div>
    <div class="content-box" style="overflow-x:auto;">
<table style="border-collapse:collapse; font-size:0.85rem; width:100%;"><thead><tr><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Si lo que necesito es...</th><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">Uso</th><th style="padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; text-align:left;">En Python</th></tr></thead><tbody><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Leer por posición o guardar una colección simple</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Arreglo</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>list</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Buscar mucho y modificar poco</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Arreglo ordenado</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>sorted()</code> + <code>bisect</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Insertar o eliminar mucho en medio de los datos</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Lista enlazada</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>deque</code> o clase propia</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Deshacer, "atrás", recursión, DFS</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Pila</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>list</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Atender por orden de llegada, tareas pendientes, BFS</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Cola</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>deque</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Modelar relaciones entre cosas (amigos, rutas, colaboraciones)</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Grafo</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>dict</code> de listas, <code>networkx</code></td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Jerarquías, carpetas, buscar rápido en datos ordenados</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Árbol</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Clases propias, índices en la BD</td></tr><tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Autocompletar o buscar por prefijo</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Trie</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>dict</code> de <code>dict</code></td></tr></tbody></table>
    </div>
  </div>

  <div class="activity-section" id="faq">
    <div class="activity-section-header"><h3>Preguntas frecuentes</h3></div>
    <details style="background:#fff; border:1px solid var(--border); border-radius:8px; padding:0.7rem 1rem; margin-top:0.6rem;"><summary style="cursor:pointer; font-weight:700; color:var(--accent);">¿Tengo que programar estas estructuras desde cero en un trabajo real?</summary><p style="margin:0.6rem 0 0;">Casi nunca. Los lenguajes y las bases de datos ya las traen. Se programan en clase para que entiendas cómo funcionan por dentro y puedas elegir bien la que ya existe.</p></details>
    <details style="background:#fff; border:1px solid var(--border); border-radius:8px; padding:0.7rem 1rem; margin-top:0.6rem;"><summary style="cursor:pointer; font-weight:700; color:var(--accent);">¿Python tiene lista enlazada?</summary><p style="margin:0.6rem 0 0;">No como un tipo de uso general. <code>collections.deque</code> usa por dentro una lista doblemente enlazada de bloques, y es lo que se usa en la práctica. La clase <code>Nodo</code> de la guía sirve para aprender.</p></details>
    <details style="background:#fff; border:1px solid var(--border); border-radius:8px; padding:0.7rem 1rem; margin-top:0.6rem;"><summary style="cursor:pointer; font-weight:700; color:var(--accent);">¿SQL tiene pilas, colas o grafos?</summary><p style="margin:0.6rem 0 0;">No como tipos. Se representan: un grafo es una tabla de relaciones, una cola puede ser una tabla de tareas pendientes, y <code>SAVEPOINT</code> se parece a una pila. Redis sí tiene listas que sirven como pila o cola.</p></details>
    <details style="background:#fff; border:1px solid var(--border); border-radius:8px; padding:0.7rem 1rem; margin-top:0.6rem;"><summary style="cursor:pointer; font-weight:700; color:var(--accent);">Mi programa se vuelve lento con listas grandes, ¿qué reviso?</summary><p style="margin:0.6rem 0 0;">Tres cosas: buscar con <code>in</code> sobre una lista es O(n) (usa un <code>set</code> o un <code>dict</code>); <code>list.pop(0)</code> es O(n) (usa un <code>deque</code>); e insertar en medio de una lista grande corre todos los elementos.</p></details>
    <details style="background:#fff; border:1px solid var(--border); border-radius:8px; padding:0.7rem 1rem; margin-top:0.6rem;"><summary style="cursor:pointer; font-weight:700; color:var(--accent);">¿Una base de datos es una tabla, un árbol o qué?</summary><p style="margin:0.6rem 0 0;">Una tabla es el modelo lógico que tú ves. Por dentro, el motor usa otras estructuras: árboles B+Tree para los índices, páginas de datos en disco, listas enlazadas, tablas hash, colas de transacciones. Tú pides con SQL y el motor decide cómo guardarlo.</p></details>
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

      <div class="quiz-question">
        <p>9. En un árbol, ¿qué es una hoja?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">El nodo raíz, el punto de partida</button>
          <button type="button" class="quiz-option" data-correct="true">Un nodo sin hijos, el final de una rama</button>
          <button type="button" class="quiz-option" data-correct="false">Cualquier nodo que tenga más de un hijo</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. ¿Para qué sirve principalmente un trie?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Para guardar números ordenados de menor a mayor</button>
          <button type="button" class="quiz-option" data-correct="true">Para buscar y autocompletar texto letra por letra, aprovechando prefijos compartidos</button>
          <button type="button" class="quiz-option" data-correct="false">Para conectar usuarios y canciones en relaciones muchos a muchos</button>
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
