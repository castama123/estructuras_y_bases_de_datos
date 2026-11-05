// Semana 3, Clase 1: Joins, UNION y funciones de agregación aplicadas a soundflow_db.
window.WEEK_CONTENT_3_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow: uniendo tablas con JOIN</h2>

  <!-- ===================== 0. POR QUÉ NECESITAMOS JOIN ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>¿Por qué necesitamos combinar tablas?</h3>
    </div>
    <p>
      Un <strong>JOIN</strong> es la instrucción que le permite a SQL combinar filas de dos o más tablas en
      un solo resultado, uniéndolas por una columna en común (normalmente una llave foránea que apunta a la
      llave primaria de otra tabla). En vez de traer los datos de cada tabla por separado y unirlos tú a
      mano, el JOIN hace esa combinación directamente en la base de datos, en una sola consulta.
    </p>
    <p>
      Comparándolo con lo que aprendimos la semana pasada: <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code>,
      <code><span style="color:#a83a3a; font-weight:700;">ORDER BY</span></code>, <code><span style="color:#a83a3a; font-weight:700;">LIKE</span></code> y las funciones de agregación trabajaban sobre
      <strong>una o dos tablas</strong>, y son herramientas que siguen siendo igual de necesarias. El JOIN
      no las reemplaza, sino que lo que hace es combinar más tablas, para que después puedas seguir
      filtrando, ordenando y agregando.
    </p>
    <p>
      La finalidad, entonces, es simple: cada vez que la respuesta que necesitas está repartida entre dos o
      más tablas, el JOIN es lo que te permite traerlos juntos, en una sola fila de resultado, sin tener que
      hacer varias consultas separadas y cruzarlas tú mismo.
    </p>
    <p>
      En <code>soundflow_db</code> la información está repartida a propósito, por normalización, entre seis
      tablas: <code>tbl_usuarios</code>, <code>tbl_pagos_suscripcion</code>, <code>tbl_artistas</code>,
      <code>tbl_albumes</code>, <code>tbl_canciones</code> y <code>tbl_reproducciones</code>. El nombre del
      artista vive en una tabla, la canción en otra, y lo que las conecta es una <strong>llave foránea</strong>,
      no el nombre en sí.
    </p>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Este es el modelo entidad-relación completo de <code>soundflow_db</code>. Analicémoslo antes
        de escribir cualquier JOIN:</strong>
      </p>
      <svg viewBox="0 0 830 520" xmlns="http://www.w3.org/2000/svg" style="max-width:800px; width:100%; height:auto; display:block; margin:0.6rem auto 0;">
        <!-- tbl_artistas -->
        <rect x="20" y="20" width="250" height="140" rx="8" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.5"/>
        <rect x="20" y="20" width="250" height="34" rx="8" fill="#8b7fb8"/>
        <rect x="20" y="44" width="250" height="10" fill="#8b7fb8"/>
        <text x="30" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_artistas</text>
        <text x="30" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_artista</text>
        <text x="30" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">nombre_artista</text>
        <text x="30" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">pais</text>
        <text x="30" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">fecha_registro</text>

        <!-- tbl_canciones -->
        <rect x="290" y="20" width="250" height="180" rx="8" fill="#ffffff" stroke="#5b9aa0" stroke-width="1.5"/>
        <rect x="290" y="20" width="250" height="34" rx="8" fill="#5b9aa0"/>
        <rect x="290" y="44" width="250" height="10" fill="#5b9aa0"/>
        <text x="300" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_canciones</text>
        <text x="300" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="316" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_cancion</text>
        <text x="300" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo</text>
        <text x="300" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">genero</text>
        <text x="300" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">duracion_seg</text>
        <text x="300" y="154" font-family="Consolas, monospace" font-size="10" fill="#33404f">reproducciones</text>
        <text x="300" y="174" font-family="Consolas, monospace" font-size="10" fill="#8aae3f" font-weight="700">FK  id_album</text>

        <!-- tbl_reproducciones -->
        <rect x="560" y="20" width="250" height="140" rx="8" fill="#ffffff" stroke="#c9714e" stroke-width="1.5"/>
        <rect x="560" y="20" width="250" height="34" rx="8" fill="#c9714e"/>
        <rect x="560" y="44" width="250" height="10" fill="#c9714e"/>
        <text x="570" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_reproducciones</text>
        <text x="570" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="586" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_reproduccion</text>
        <text x="570" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">fecha_reproduccion</text>
        <text x="570" y="114" font-family="Consolas, monospace" font-size="10" fill="#4a7c9e" font-weight="700">FK  id_usuario</text>
        <text x="570" y="134" font-family="Consolas, monospace" font-size="10" fill="#5b9aa0" font-weight="700">FK  id_cancion</text>

        <!-- tbl_albumes -->
        <rect x="20" y="290" width="250" height="140" rx="8" fill="#ffffff" stroke="#8aae3f" stroke-width="1.5"/>
        <rect x="20" y="290" width="250" height="34" rx="8" fill="#8aae3f"/>
        <rect x="20" y="314" width="250" height="10" fill="#8aae3f"/>
        <text x="30" y="312" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_albumes</text>
        <text x="30" y="344" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="344" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_album</text>
        <text x="30" y="364" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo_album</text>
        <text x="30" y="384" font-family="Consolas, monospace" font-size="10" fill="#33404f">anio_lanzamiento</text>
        <text x="30" y="404" font-family="Consolas, monospace" font-size="10" fill="#8b7fb8" font-weight="700">FK  id_artista</text>

        <!-- tbl_pagos_suscripcion -->
        <rect x="290" y="290" width="250" height="140" rx="8" fill="#ffffff" stroke="#b8a03a" stroke-width="1.5"/>
        <rect x="290" y="290" width="250" height="34" rx="8" fill="#b8a03a"/>
        <rect x="290" y="314" width="250" height="10" fill="#b8a03a"/>
        <text x="300" y="312" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_pagos_suscripcion</text>
        <text x="300" y="344" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="316" y="344" font-family="Consolas, monospace" font-size="9.5" fill="#a83a3a" font-weight="700">PK  id_pagos_suscripcion</text>
        <text x="300" y="364" font-family="Consolas, monospace" font-size="10" fill="#33404f">monto</text>
        <text x="300" y="384" font-family="Consolas, monospace" font-size="10" fill="#33404f">fecha_pago</text>
        <text x="300" y="404" font-family="Consolas, monospace" font-size="10" fill="#4a7c9e" font-weight="700">FK  id_usuario</text>

        <!-- tbl_usuarios -->
        <rect x="560" y="290" width="250" height="180" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <rect x="560" y="290" width="250" height="34" rx="8" fill="#4a7c9e"/>
        <rect x="560" y="314" width="250" height="10" fill="#4a7c9e"/>
        <text x="570" y="312" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_usuarios</text>
        <text x="570" y="344" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="586" y="344" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  idusuario</text>
        <text x="570" y="364" font-family="Consolas, monospace" font-size="10" fill="#33404f">nombre</text>
        <text x="570" y="384" font-family="Consolas, monospace" font-size="10" fill="#33404f">email</text>
        <text x="570" y="404" font-family="Consolas, monospace" font-size="10" fill="#33404f">password_hash</text>
        <text x="570" y="424" font-family="Consolas, monospace" font-size="10" fill="#33404f">estado_activo</text>
        <text x="570" y="444" font-family="Consolas, monospace" font-size="10" fill="#33404f">creado_at</text>

        <!-- artistas (PK) → albumes (FK id_artista): misma columna -->
        <line x1="145" y1="160" x2="145" y2="290" stroke="#8b7fb8" stroke-width="2"/>
        <circle cx="145" cy="160" r="4" fill="#8b7fb8"/>
        <circle cx="145" cy="290" r="4" fill="#8b7fb8"/>
        <text x="153" y="178" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">1</text>
        <text x="153" y="284" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">N</text>

        <!-- albumes (PK) → canciones (FK id_album): diagonal -->
        <line x1="270" y1="344" x2="290" y2="174" stroke="#8aae3f" stroke-width="2"/>
        <circle cx="270" cy="344" r="4" fill="#8aae3f"/>
        <circle cx="290" cy="174" r="4" fill="#8aae3f"/>
        <text x="245" y="340" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">1</text>
        <text x="296" y="180" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">N</text>

        <!-- canciones (PK) → reproducciones (FK id_cancion): misma fila -->
        <line x1="540" y1="74" x2="560" y2="134" stroke="#5b9aa0" stroke-width="2"/>
        <circle cx="540" cy="74" r="4" fill="#5b9aa0"/>
        <circle cx="560" cy="134" r="4" fill="#5b9aa0"/>
        <text x="512" y="70" font-family="Consolas, monospace" font-size="12" fill="#5b9aa0" font-weight="700">1</text>
        <text x="566" y="130" font-family="Consolas, monospace" font-size="12" fill="#5b9aa0" font-weight="700">N</text>

        <!-- usuarios (PK) → reproducciones (FK id_usuario): misma columna -->
        <line x1="685" y1="160" x2="685" y2="290" stroke="#4a7c9e" stroke-width="2"/>
        <circle cx="685" cy="160" r="4" fill="#4a7c9e"/>
        <circle cx="685" cy="290" r="4" fill="#4a7c9e"/>
        <text x="693" y="178" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">N</text>
        <text x="693" y="284" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">1</text>

        <!-- usuarios (PK) → pagos_suscripcion (FK id_usuario): misma fila -->
        <line x1="540" y1="404" x2="560" y2="344" stroke="#4a7c9e" stroke-width="2"/>
        <circle cx="540" cy="404" r="4" fill="#4a7c9e"/>
        <circle cx="560" cy="344" r="4" fill="#4a7c9e"/>
        <text x="512" y="408" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">N</text>
        <text x="566" y="340" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">1</text>

        <text x="415" y="500" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-style="italic" fill="var(--text-dim)">Seis tablas conectadas por llaves foráneas (FK): esta es la base de todos los JOIN de esta clase.</text>
      </svg>
    </div>

  </div>

  <!-- ===================== 1. INNER JOIN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>1. INNER JOIN</h3>
    </div>
    <p>
      <code><span style="color:#a83a3a; font-weight:700;">INNER JOIN</span></code> combina dos o más tablas y devuelve <strong>solo las filas donde hay
      coincidencia en todas ellas</strong>, según la condición que definas con <code><span style="color:#a83a3a; font-weight:700;">ON</span></code>. Si una fila
      de una tabla no tiene pareja en la otra, simplemente no aparece en el resultado.
    </p>

    <div style="max-width:280px; margin:1rem auto 0;">
      <svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" style="max-width:260px; width:100%; height:auto; display:block; margin:0 auto;">
        <circle cx="100" cy="70" r="55" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
        <circle cx="160" cy="70" r="55" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
        <path d="M130,24 A55,55 0 0,1 130,116 A55,55 0 0,1 130,24 Z" fill="var(--accent)" fill-opacity="0.55"/>
        <text x="65" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">A</text>
        <text x="195" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">B</text>
      </svg>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
        Solo la intersección: filas que existen en A <strong>y</strong> en B.
      </p>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        <strong>Sintaxis general:</strong>
      </p>
      <div class="sql" style="margin-top:0.4rem;"><span class="sql-kw-p">SELECT</span> columnas
<span class="sql-kw-p">FROM</span> tablaA
<span class="sql-kw-p">INNER</span> <span class="sql-kw-p">JOIN</span> tablaB <span class="sql-kw-p">ON</span> tablaA.columna = tablaB.columna;</div>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: <u>título de cada canción, junto con el título de su álbum</u>. Es decir, vamos a traer el
      nombre de la canción junto con el nombre del álbum al que pertenece. Como cada canción sí tiene un
      álbum válido (la FK es <code><span style="color:#a83a3a; font-weight:700;">NOT NULL</span></code>), este <code><span style="color:#a83a3a; font-weight:700;">INNER JOIN</span></code> no pierde ninguna fila:
      las 10 canciones aparecen.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Antes de la consulta, recordemos de dónde sale cada columna y cómo se conectan estas dos
        tablas:</strong>
      </p>
            <div style="display:flex; gap:1.2rem; flex-wrap:wrap; align-items:flex-start; margin-top:0.6rem;">
        <div style="flex:1 1 420px; min-width:280px;">
        <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block; margin:0;">
        <!-- tbl_albumes -->
        <rect x="20" y="20" width="210" height="140" rx="8" fill="#ffffff" stroke="#8aae3f" stroke-width="1.5"/>
        <rect x="20" y="20" width="210" height="34" rx="8" fill="#8aae3f"/>
        <rect x="20" y="44" width="210" height="10" fill="#8aae3f"/>
        <text x="30" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_albumes</text>
        <text x="30" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_album</text>
        <text x="30" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo_album</text>
        <text x="30" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">anio_lanzamiento</text>
        <text x="30" y="134" font-family="Consolas, monospace" font-size="10" fill="#8b7fb8" font-weight="700">FK  id_artista</text>

        <!-- tbl_canciones -->
        <rect x="320" y="20" width="220" height="180" rx="8" fill="#ffffff" stroke="#5b9aa0" stroke-width="1.5"/>
        <rect x="320" y="20" width="220" height="34" rx="8" fill="#5b9aa0"/>
        <rect x="320" y="44" width="220" height="10" fill="#5b9aa0"/>
        <text x="330" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_canciones</text>
        <text x="330" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="346" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_cancion</text>
        <text x="330" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo</text>
        <text x="330" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">genero</text>
        <text x="330" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">duracion_seg</text>
        <text x="330" y="154" font-family="Consolas, monospace" font-size="10" fill="#33404f">reproducciones</text>
        <text x="330" y="174" font-family="Consolas, monospace" font-size="10" fill="#8aae3f" font-weight="700">FK  id_album</text>

        <!-- albumes (PK) → canciones (FK id_album) -->
        <line x1="230" y1="74" x2="320" y2="174" stroke="#8aae3f" stroke-width="2"/>
        <circle cx="230" cy="74" r="4" fill="#8aae3f"/>
        <circle cx="320" cy="174" r="4" fill="#8aae3f"/>
        <text x="237" y="70" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">1</text>
        <text x="298" y="170" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">N</text>

        <text x="280" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">1 álbum tiene N canciones</text>
      </svg>
        </div>
        <div style="flex:1 1 260px; min-width:240px; font-size:0.88rem;">
      <p style="margin:0; font-style:italic; color:#a83a3a;">
        Consulta: listar el título de cada canción junto con el título de su álbum, ordenado por título de canción.
      </p>
      <p style="margin:0.6rem 0 0;">
        De dónde sale cada columna y cómo se unen las tablas:
      </p>
      <ul style="margin:0.3rem 0 0; padding-left:1.2rem;">
        <li><code style="color:#5b9aa0; font-weight:700;">c.titulo</code> sale de <code style="color:#5b9aa0; font-weight:700;">tbl_canciones</code>.</li>
        <li><code style="color:#8aae3f; font-weight:700;">al.titulo_album</code> sale de <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code>.</li>
        <li>Las dos tablas se unen por el <code>id</code> de cada una: <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code> con <code style="color:#5b9aa0; font-weight:700;">tbl_canciones</code>, por <code>id_album</code>.</li>
      </ul>
        </div>
      </div>
    </div>

    <p style="margin-top:0.8rem;">
      Así se ve la misma consulta <strong>sin ningún alias</strong>, escribiendo el nombre completo de cada
      tabla cada vez que se necesita:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">01_inner_join_sin_alias.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> tbl_canciones.titulo, tbl_albumes.titulo_album
<span class="sql-kw-p">FROM</span> tbl_canciones
<span class="sql-kw-p">INNER</span> <span class="sql-kw-p">JOIN</span> tbl_albumes <span class="sql-kw-p">ON</span> tbl_canciones.id_album = tbl_albumes.id_album
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> tbl_canciones.titulo;</code></pre>
    </div>
    <p style="margin-top:0.8rem;">
      Y así queda usando <strong>alias de tabla</strong> (<code>c</code>, <code>al</code>): mismo resultado,
      mucho más corta y fácil de leer.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">01_inner_join.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> c.titulo, al.titulo_album
<span class="sql-kw-p">FROM</span> tbl_canciones c
<span class="sql-kw-p">INNER</span> <span class="sql-kw-p">JOIN</span> tbl_albumes al <span class="sql-kw-p">ON</span> c.id_album = al.id_album
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> c.titulo;</code></pre>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>La consulta se lee así:</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>"Tráeme el título de la canción y el título del álbum."</li>
        <li>"Empezando por <code>tbl_canciones</code>."</li>
        <li>"Únela con <code>tbl_albumes</code>, donde el <code>id_album</code> de una coincida con el
          <code>id_album</code> de la otra."</li>
        <li>"Y ordena el resultado por título de canción."</li>
      </ul>
    </div>

    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 10 filas (todas las canciones tienen álbum)</div>
        <table><thead><tr><th>titulo</th><th>titulo_album</th></tr></thead><tbody>
          <tr><td>Cuando Pase el Temblor</td><td>Grandes Éxitos</td></tr>
          <tr><td>De Música Ligera</td><td>Grandes Éxitos</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>Éxitos Eternos</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>Éxitos Eternos</td></tr>
          <tr><td>Mi Buen Amor</td><td>Grandes Éxitos</td></tr>
          <tr><td>Mi Tierra</td><td>Grandes Éxitos</td></tr>
          <tr><td>Oye Mi Amor</td><td>¿Dónde Jugarán los Niños?</td></tr>
          <tr><td>Persiana Americana</td><td>Grandes Éxitos</td></tr>
          <tr><td>Rayando el Sol</td><td>¿Dónde Jugarán los Niños?</td></tr>
          <tr><td>Tres Deseos</td><td>Grandes Éxitos</td></tr>
        </tbody></table>
      </div>
    </div>

    <p style="margin-top:1.2rem;">
      Ahora extendamos el mismo ejemplo a <strong>tres tablas</strong>: agreguemos también el nombre del
      artista. Para eso encadenamos un segundo <code><span style="color:#a83a3a; font-weight:700;">INNER JOIN</span></code>, uno detrás del otro.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Así se conectan ahora las tres tablas:</strong>
      </p>
            <div style="display:flex; gap:1.2rem; flex-wrap:wrap; align-items:flex-start; margin-top:0.6rem;">
        <div style="flex:1 1 420px; min-width:280px;">
        <svg viewBox="0 0 780 260" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block; margin:0;">
        <!-- tbl_artistas -->
        <rect x="20" y="20" width="200" height="140" rx="8" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.5"/>
        <rect x="20" y="20" width="200" height="34" rx="8" fill="#8b7fb8"/>
        <rect x="20" y="44" width="200" height="10" fill="#8b7fb8"/>
        <text x="30" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_artistas</text>
        <text x="30" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_artista</text>
        <text x="30" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">nombre_artista</text>
        <text x="30" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">pais</text>
        <text x="30" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">fecha_registro</text>

        <!-- tbl_albumes -->
        <rect x="290" y="20" width="200" height="140" rx="8" fill="#ffffff" stroke="#8aae3f" stroke-width="1.5"/>
        <rect x="290" y="20" width="200" height="34" rx="8" fill="#8aae3f"/>
        <rect x="290" y="44" width="200" height="10" fill="#8aae3f"/>
        <text x="300" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_albumes</text>
        <text x="300" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="316" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_album</text>
        <text x="300" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo_album</text>
        <text x="300" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">anio_lanzamiento</text>
        <text x="300" y="134" font-family="Consolas, monospace" font-size="10" fill="#8b7fb8" font-weight="700">FK  id_artista</text>

        <!-- tbl_canciones -->
        <rect x="560" y="20" width="200" height="180" rx="8" fill="#ffffff" stroke="#5b9aa0" stroke-width="1.5"/>
        <rect x="560" y="20" width="200" height="34" rx="8" fill="#5b9aa0"/>
        <rect x="560" y="44" width="200" height="10" fill="#5b9aa0"/>
        <text x="570" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_canciones</text>
        <text x="570" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="586" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_cancion</text>
        <text x="570" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo</text>
        <text x="570" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">genero</text>
        <text x="570" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">duracion_seg</text>
        <text x="570" y="154" font-family="Consolas, monospace" font-size="10" fill="#33404f">reproducciones</text>
        <text x="570" y="174" font-family="Consolas, monospace" font-size="10" fill="#8aae3f" font-weight="700">FK  id_album</text>

        <!-- artistas (PK) → albumes (FK id_artista) -->
        <line x1="220" y1="70" x2="290" y2="134" stroke="#8b7fb8" stroke-width="2"/>
        <circle cx="220" cy="70" r="4" fill="#8b7fb8"/>
        <circle cx="290" cy="134" r="4" fill="#8b7fb8"/>
        <text x="227" y="66" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">1</text>
        <text x="258" y="130" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">N</text>

        <!-- albumes (PK) → canciones (FK id_album) -->
        <line x1="490" y1="70" x2="560" y2="174" stroke="#8aae3f" stroke-width="2"/>
        <circle cx="490" cy="70" r="4" fill="#8aae3f"/>
        <circle cx="560" cy="174" r="4" fill="#8aae3f"/>
        <text x="497" y="66" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">1</text>
        <text x="528" y="170" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">N</text>

        <text x="390" y="220" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">1 artista tiene N álbumes; 1 álbum tiene N canciones</text>
      </svg>
        </div>
        <div style="flex:1 1 260px; min-width:240px; font-size:0.88rem;">
      <p style="margin:0; font-style:italic; color:#a83a3a;">
        Consulta: listar el título de cada canción junto con el título de su álbum y el nombre de su artista, ordenado por título de canción.
      </p>
      <p style="margin:0.6rem 0 0;">
        De dónde sale cada columna y cómo se unen las tablas:
      </p>
      <ul style="margin:0.3rem 0 0; padding-left:1.2rem;">
        <li><code style="color:#5b9aa0; font-weight:700;">c.titulo</code> sale de <code style="color:#5b9aa0; font-weight:700;">tbl_canciones</code>.</li>
        <li><code style="color:#8aae3f; font-weight:700;">al.titulo_album</code> sale de <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code>.</li>
        <li><code style="color:#8b7fb8; font-weight:700;">ar.nombre_artista</code> sale de <code style="color:#8b7fb8; font-weight:700;">tbl_artistas</code>.</li>
        <li>Las tres tablas se unen por el <code>id</code> de cada una:<ul style="margin:0.2rem 0 0; padding-left:1.2rem;"><li><code style="color:#8b7fb8; font-weight:700;">tbl_artistas</code> con <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code>, por <code>id_artista</code>.</li><li><code style="color:#8aae3f; font-weight:700;">tbl_albumes</code> con <code style="color:#5b9aa0; font-weight:700;">tbl_canciones</code>, por <code>id_album</code>.</li></ul></li>
      </ul>
        </div>
      </div>
    </div>

    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">02_inner_join_tres_tablas.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> c.titulo, al.titulo_album, ar.nombre_artista
<span class="sql-kw-p">FROM</span> tbl_canciones c
<span class="sql-kw-p">INNER</span> <span class="sql-kw-p">JOIN</span> tbl_albumes al <span class="sql-kw-p">ON</span> c.id_album = al.id_album
<span class="sql-kw-p">INNER</span> <span class="sql-kw-p">JOIN</span> tbl_artistas ar <span class="sql-kw-p">ON</span> al.id_artista = ar.id_artista
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> c.titulo;</code></pre>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>La consulta se lee así:</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>"Tráeme el título de la canción, el título del álbum y el nombre del artista."</li>
        <li>"Empezando por <code>tbl_canciones</code>."</li>
        <li>"Únela con <code>tbl_albumes</code>, donde el <code>id_album</code> de una coincida con el
          <code>id_album</code> de la otra."</li>
        <li>"Únela también con <code>tbl_artistas</code>, donde el <code>id_artista</code> de una coincida
          con el <code>id_artista</code> de la otra."</li>
        <li>"Y ordena el resultado por título de canción."</li>
      </ul>
    </div>

    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 10 filas (todas las canciones tienen álbum y artista)</div>
        <table><thead><tr><th>titulo</th><th>titulo_album</th><th>nombre_artista</th></tr></thead><tbody>
          <tr><td>Cuando Pase el Temblor</td><td>Grandes Éxitos</td><td>Soda Stereo</td></tr>
          <tr><td>De Música Ligera</td><td>Grandes Éxitos</td><td>Soda Stereo</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>Éxitos Eternos</td><td>Celia Cruz</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>Éxitos Eternos</td><td>Celia Cruz</td></tr>
          <tr><td>Mi Buen Amor</td><td>Grandes Éxitos</td><td>Gloria Estefan</td></tr>
          <tr><td>Mi Tierra</td><td>Grandes Éxitos</td><td>Gloria Estefan</td></tr>
          <tr><td>Oye Mi Amor</td><td>¿Dónde Jugarán los Niños?</td><td>Maná</td></tr>
          <tr><td>Persiana Americana</td><td>Grandes Éxitos</td><td>Soda Stereo</td></tr>
          <tr><td>Rayando el Sol</td><td>¿Dónde Jugarán los Niños?</td><td>Maná</td></tr>
          <tr><td>Tres Deseos</td><td>Grandes Éxitos</td><td>Gloria Estefan</td></tr>
        </tbody></table>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Cuándo usar INNER JOIN?</strong> Cuando solo te interesan los registros que tienen pareja
        confirmada en ambas tablas, y no te importa perder los que no la tengan. Es el JOIN que más se usa
        en el día a día.
      </p>
    </div>
  </div>

  <!-- ===================== 2. LEFT JOIN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. LEFT JOIN</h3>
    </div>
    <p>
      <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> (o <code><span style="color:#a83a3a; font-weight:700;">LEFT OUTER JOIN</span></code>) devuelve <strong>todas las filas de la tabla
      izquierda</strong>, tengan o no coincidencia en la derecha. Cuando no hay coincidencia, las columnas de
      la tabla derecha quedan en <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code>.
    </p>

    <div style="max-width:280px; margin:1rem auto 0;">
      <svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" style="max-width:260px; width:100%; height:auto; display:block; margin:0 auto;">
        <circle cx="100" cy="70" r="55" fill="var(--accent)" fill-opacity="0.35" stroke="var(--accent)" stroke-width="2.5"/>
        <circle cx="160" cy="70" r="55" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
        <text x="65" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">A</text>
        <text x="195" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">B</text>
      </svg>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
        Todo A, tenga o no pareja en B (con NULL donde falte).
      </p>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: ¿qué usuarios existen, tengan o no alguna reproducción registrada? De los 10 usuarios, 9
      tienen al menos una reproducción; solo <strong>Sofía Herrera</strong> (usuario 10) nunca ha escuchado
      nada, y su fila queda con <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code> en las columnas de <code>tbl_reproducciones</code>.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Antes de la consulta, recordemos cómo se conectan estas dos tablas:</strong>
      </p>
            <div style="display:flex; gap:1.2rem; flex-wrap:wrap; align-items:flex-start; margin-top:0.6rem;">
        <div style="flex:1 1 420px; min-width:280px;">
        <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block; margin:0;">
        <!-- tbl_usuarios -->
        <rect x="20" y="20" width="210" height="180" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <rect x="20" y="20" width="210" height="34" rx="8" fill="#4a7c9e"/>
        <rect x="20" y="44" width="210" height="10" fill="#4a7c9e"/>
        <text x="30" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_usuarios</text>
        <text x="30" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  idusuario</text>
        <text x="30" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">nombre</text>
        <text x="30" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">email</text>
        <text x="30" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">password_hash</text>
        <text x="30" y="154" font-family="Consolas, monospace" font-size="10" fill="#33404f">estado_activo</text>
        <text x="30" y="174" font-family="Consolas, monospace" font-size="10" fill="#33404f">creado_at</text>

        <!-- tbl_reproducciones -->
        <rect x="320" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#c9714e" stroke-width="1.5"/>
        <rect x="320" y="20" width="220" height="34" rx="8" fill="#c9714e"/>
        <rect x="320" y="44" width="220" height="10" fill="#c9714e"/>
        <text x="330" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_reproducciones</text>
        <text x="330" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="346" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_reproduccion</text>
        <text x="330" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">fecha_reproduccion</text>
        <text x="330" y="114" font-family="Consolas, monospace" font-size="10" fill="#4a7c9e" font-weight="700">FK  id_usuario</text>
        <text x="330" y="134" font-family="Consolas, monospace" font-size="10" fill="#5b9aa0" font-weight="700">FK  id_cancion</text>

        <!-- usuarios (PK) → reproducciones (FK id_usuario) -->
        <line x1="230" y1="70" x2="320" y2="114" stroke="#4a7c9e" stroke-width="2"/>
        <circle cx="230" cy="70" r="4" fill="#4a7c9e"/>
        <circle cx="320" cy="114" r="4" fill="#4a7c9e"/>
        <text x="237" y="66" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">1</text>
        <text x="298" y="110" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">N</text>

        <text x="280" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">1 usuario puede tener N reproducciones, o ninguna (Sofía Herrera)</text>
      </svg>
        </div>
        <div style="flex:1 1 260px; min-width:240px; font-size:0.88rem;">
      <p style="margin:0; font-style:italic; color:#a83a3a;">
        Consulta: listar el nombre de cada usuario junto con el id de cada canción que reprodujo, incluyendo a los usuarios que no han reproducido nada.
      </p>
      <p style="margin:0.6rem 0 0;">
        De dónde sale cada columna y cómo se unen las tablas:
      </p>
      <ul style="margin:0.3rem 0 0; padding-left:1.2rem;">
        <li><code style="color:#4a7c9e; font-weight:700;">u.nombre</code> sale de <code style="color:#4a7c9e; font-weight:700;">tbl_usuarios</code>.</li>
        <li><code style="color:#c9714e; font-weight:700;">r.id_cancion</code> sale de <code style="color:#c9714e; font-weight:700;">tbl_reproducciones</code>.</li>
        <li>La condición del <code><span style="color:#a83a3a; font-weight:700;">ON</span></code> es la misma línea del diagrama: <code><span style="color:#4a7c9e; font-weight:700;">u.idusuario</span> = <span style="color:#c9714e; font-weight:700;">r.id_usuario</span></code>.</li>
      </ul>
        </div>
      </div>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">02_left_join.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> u.nombre, r.id_cancion
<span class="sql-kw-p">FROM</span> tbl_usuarios u
<span class="sql-kw-p">LEFT</span> <span class="sql-kw-p">JOIN</span> tbl_reproducciones r <span class="sql-kw-p">ON</span> u.idusuario = r.id_usuario
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> u.nombre;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 11 filas (Lucia aparece 2 veces, Sofía con NULL)</div>
        <table><thead><tr><th>nombre</th><th>id_cancion</th></tr></thead><tbody>
          <tr><td>Andrés Torres</td><td>101</td></tr>
          <tr><td>Camilo Restrepo</td><td>102</td></tr>
          <tr><td>Daniela Ortiz</td><td>109</td></tr>
          <tr><td>Felipe Castro</td><td>107</td></tr>
          <tr><td>Juan Pablo León</td><td>110</td></tr>
          <tr><td>Lucia Marin</td><td>101</td></tr>
          <tr><td>Lucia Marin</td><td>105</td></tr>
          <tr><td>Mariana Ruiz</td><td>108</td></tr>
          <tr><td>Santiago Marin</td><td>104</td></tr>
          <tr style="background:rgba(201,113,78,0.18);"><td style="color:#c9714e; font-weight:700;">Sofía Herrera</td><td style="color:#c9714e; font-weight:700; font-style:italic;">NULL</td></tr>
          <tr><td>Valentina Gómez</td><td>106</td></tr>
        </tbody></table>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        El uso más común de <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> en la práctica es justo este: encontrar los
        <strong>huérfanos</strong>, las filas de la izquierda que <em>no</em> tienen pareja. Para eso se
        agrega un filtro por la columna de la derecha:
      </p>
      <div class="sql"><span class="sql-kw-p">SELECT</span> u.nombre
<span class="sql-kw-p">FROM</span> tbl_usuarios u
<span class="sql-kw-p">LEFT</span> <span class="sql-kw-p">JOIN</span> tbl_reproducciones r <span class="sql-kw-p">ON</span> u.idusuario = r.id_usuario
<span class="sql-kw-p">WHERE</span> r.id_reproduccion <span class="sql-kw-b">IS</span> <span class="sql-kw-b">NULL</span>;</div>
      <p style="margin:0.6rem 0 0;">
        Esta consulta responde directamente "¿qué usuarios nunca han reproducido nada?": <strong>Sofía
        Herrera</strong>, una sola fila. Fíjate que el filtro va sobre <code>r.id_reproduccion</code> (una
        columna de la tabla derecha), no sobre <code>u.idusuario</code>: solo las filas sin coincidencia real
        quedan con <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code> ahí.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Cuándo usar LEFT JOIN?</strong> Cuando quieres conservar todos los registros de la tabla
        de la izquierda, tengan o no pareja en la derecha, típicamente para encontrar los "huérfanos" del
        lado izquierdo (usuarios sin reproducciones, álbumes sin canciones). Esas filas huérfanas quedan con
        <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code> en las columnas de la tabla de la derecha, porque no hay ninguna fila de esa tabla
        que les corresponda.
      </p>
    </div>
  </div>

  <!-- ===================== 3. RIGHT JOIN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. RIGHT JOIN</h3>
    </div>
    <p>
      <code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code> (o <code><span style="color:#a83a3a; font-weight:700;">RIGHT OUTER JOIN</span></code>) es el espejo exacto de <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code>:
      devuelve <strong>todas las filas de la tabla derecha</strong>, tengan o no coincidencia en la
      izquierda.
    </p>

    <div style="max-width:280px; margin:1rem auto 0;">
      <svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" style="max-width:260px; width:100%; height:auto; display:block; margin:0 auto;">
        <circle cx="100" cy="70" r="55" fill="none" stroke="var(--text-dim)" stroke-width="2"/>
        <circle cx="160" cy="70" r="55" fill="var(--accent)" fill-opacity="0.35" stroke="var(--accent)" stroke-width="2.5"/>
        <text x="65" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">A</text>
        <text x="195" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">B</text>
      </svg>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
        Todo B, tenga o no pareja en A (con NULL donde falte).
      </p>
    </div>

    <p style="margin-top:1rem;">
      La consulta acá sería: ¿qué álbumes existen, tengan o no canciones registradas? Ya sabemos que
      <code>tbl_canciones</code> solo usa los álbumes 1 a 4; los álbumes 5 a 10 son catálogo adicional sin
      canciones todavía.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Antes de la consulta, recordemos cómo se conectan estas dos tablas:</strong>
      </p>
            <div style="display:flex; gap:1.2rem; flex-wrap:wrap; align-items:flex-start; margin-top:0.6rem;">
        <div style="flex:1 1 420px; min-width:280px;">
        <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block; margin:0;">
        <!-- tbl_canciones -->
        <rect x="20" y="20" width="210" height="180" rx="8" fill="#ffffff" stroke="#5b9aa0" stroke-width="1.5"/>
        <rect x="20" y="20" width="210" height="34" rx="8" fill="#5b9aa0"/>
        <rect x="20" y="44" width="210" height="10" fill="#5b9aa0"/>
        <text x="30" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_canciones</text>
        <text x="30" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_cancion</text>
        <text x="30" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo</text>
        <text x="30" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">genero</text>
        <text x="30" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">duracion_seg</text>
        <text x="30" y="154" font-family="Consolas, monospace" font-size="10" fill="#33404f">reproducciones</text>
        <text x="30" y="174" font-family="Consolas, monospace" font-size="10" fill="#8aae3f" font-weight="700">FK  id_album</text>

        <!-- tbl_albumes -->
        <rect x="320" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#8aae3f" stroke-width="1.5"/>
        <rect x="320" y="20" width="220" height="34" rx="8" fill="#8aae3f"/>
        <rect x="320" y="44" width="220" height="10" fill="#8aae3f"/>
        <text x="330" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_albumes</text>
        <text x="330" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="346" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_album</text>
        <text x="330" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo_album</text>
        <text x="330" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">anio_lanzamiento</text>
        <text x="330" y="134" font-family="Consolas, monospace" font-size="10" fill="#8b7fb8" font-weight="700">FK  id_artista</text>

        <!-- canciones (FK id_album) → albumes (PK) -->
        <line x1="230" y1="174" x2="320" y2="70" stroke="#8aae3f" stroke-width="2"/>
        <circle cx="230" cy="174" r="4" fill="#8aae3f"/>
        <circle cx="320" cy="70" r="4" fill="#8aae3f"/>
        <text x="237" y="170" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">N</text>
        <text x="298" y="66" font-family="Consolas, monospace" font-size="12" fill="#8aae3f" font-weight="700">1</text>

        <text x="280" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">1 álbum puede tener N canciones, o ninguna (álbumes 5 a 10)</text>
      </svg>
        </div>
        <div style="flex:1 1 260px; min-width:240px; font-size:0.88rem;">
      <p style="margin:0; font-style:italic; color:#a83a3a;">
        Consulta: listar el título de cada álbum junto con el título de cada canción que tiene, incluyendo los álbumes que no tienen ninguna canción.
      </p>
      <p style="margin:0.6rem 0 0;">
        De dónde sale cada columna y qué conserva el <code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code>:
      </p>
      <ul style="margin:0.3rem 0 0; padding-left:1.2rem;">
        <li><code style="color:#8aae3f; font-weight:700;">al.titulo_album</code> sale de <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code>.</li>
        <li><code style="color:#5b9aa0; font-weight:700;">c.titulo</code> sale de <code style="color:#5b9aa0; font-weight:700;">tbl_canciones</code>.</li>
        <li>Aquí <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code> es la tabla "derecha", así que <code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code> conserva sus 10 filas completas, tengan o no canciones.</li>
      </ul>
        </div>
      </div>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">03_right_join.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> al.titulo_album, c.titulo
<span class="sql-kw-p">FROM</span> tbl_canciones c
<span class="sql-kw-p">RIGHT</span> <span class="sql-kw-p">JOIN</span> tbl_albumes al <span class="sql-kw-p">ON</span> c.id_album = al.id_album
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> al.id_album;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 16 filas (10 canciones + 6 álbumes sin ninguna)</div>
        <table><thead><tr><th>titulo_album</th><th>titulo</th></tr></thead><tbody>
          <tr><td>Grandes Éxitos</td><td>Tres Deseos</td></tr>
          <tr><td>Grandes Éxitos</td><td>Mi Tierra</td></tr>
          <tr><td>Grandes Éxitos</td><td>Mi Buen Amor</td></tr>
          <tr><td>Éxitos Eternos</td><td>La Vida Es un Carnaval</td></tr>
          <tr><td>Éxitos Eternos</td><td>La Negra Tiene Tumbao</td></tr>
          <tr><td>Grandes Éxitos</td><td>De Música Ligera</td></tr>
          <tr><td>Grandes Éxitos</td><td>Persiana Americana</td></tr>
          <tr><td>Grandes Éxitos</td><td>Cuando Pase el Temblor</td></tr>
          <tr><td>¿Dónde Jugarán los Niños?</td><td>Rayando el Sol</td></tr>
          <tr><td>¿Dónde Jugarán los Niños?</td><td>Oye Mi Amor</td></tr>
          <tr><td>Avalancha</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
          <tr><td>Pies Descalzos</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
          <tr><td>La Voz</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
          <tr><td>El Nervio del Volcán</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
          <tr><td>Amor a la Mexicana</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
          <tr><td>Siembra</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
        </tbody></table>
        <p class="query-result-note">
          Los últimos 6 álbumes (de artistas 5 a 10) no tienen ninguna canción registrada todavía, así que
          quedan con <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code> en <code>titulo</code>. Este resultado sí es distinto al que
          obtendrías con <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span> tbl_canciones c <span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span> tbl_albumes al</code> en ese orden (ese
          left join, con las tablas en ese orden, solo traería las 10 canciones, sin los álbumes vacíos).
        </p>
      </div>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Cuándo usar RIGHT JOIN?</strong> Cuando quieres conservar todos los registros de la tabla
        de la derecha, tengan o no pareja en la izquierda, típicamente para encontrar los "huérfanos" del
        lado derecho (álbumes sin canciones, en nuestro ejemplo). Esas filas huérfanas quedan con
        <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code> en las columnas de la tabla de la izquierda, porque no hay ninguna fila de esa
        tabla que les corresponda.
      </p>
    </div>
  </div>

  <!-- ===================== 4. FULL OUTER JOIN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. FULL OUTER JOIN</h3>
    </div>
    <p>
      <code><span style="color:#a83a3a; font-weight:700;">FULL OUTER JOIN</span></code> devuelve <strong>todas las filas de ambas tablas</strong>, coincidan o no,
      con <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code> en el lado que le falte a cada una.
    </p>

    <div style="max-width:280px; margin:1rem auto 0;">
      <svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" style="max-width:260px; width:100%; height:auto; display:block; margin:0 auto;">
        <circle cx="100" cy="70" r="55" fill="var(--accent)" fill-opacity="0.35" stroke="var(--accent)" stroke-width="2.5"/>
        <circle cx="160" cy="70" r="55" fill="var(--accent)" fill-opacity="0.35" stroke="var(--accent)" stroke-width="2.5"/>
        <text x="65" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">A</text>
        <text x="195" y="74" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">B</text>
      </svg>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
        Todo A y todo B, sin dejar nada fuera.
      </p>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        <strong>Importante:</strong> SoundFlow corre en <strong>MySQL</strong>, y MySQL <strong>no tiene
        <code><span style="color:#a83a3a; font-weight:700;">FULL OUTER JOIN</span></code></strong> como palabra clave (a diferencia de PostgreSQL o SQL Server).
        Para simularlo, se combina un <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> con un <code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code> usando
        <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code>.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Usamos las mismas dos tablas que en LEFT JOIN:</strong>
      </p>
            <div style="display:flex; gap:1.2rem; flex-wrap:wrap; align-items:flex-start; margin-top:0.6rem;">
        <div style="flex:1 1 420px; min-width:280px;">
        <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block; margin:0;">
        <!-- tbl_usuarios -->
        <rect x="20" y="20" width="210" height="180" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <rect x="20" y="20" width="210" height="34" rx="8" fill="#4a7c9e"/>
        <rect x="20" y="44" width="210" height="10" fill="#4a7c9e"/>
        <text x="30" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_usuarios</text>
        <text x="30" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  idusuario</text>
        <text x="30" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">nombre</text>
        <text x="30" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">email</text>
        <text x="30" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">password_hash</text>
        <text x="30" y="154" font-family="Consolas, monospace" font-size="10" fill="#33404f">estado_activo</text>
        <text x="30" y="174" font-family="Consolas, monospace" font-size="10" fill="#33404f">creado_at</text>

        <!-- tbl_reproducciones -->
        <rect x="320" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#c9714e" stroke-width="1.5"/>
        <rect x="320" y="20" width="220" height="34" rx="8" fill="#c9714e"/>
        <rect x="320" y="44" width="220" height="10" fill="#c9714e"/>
        <text x="330" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_reproducciones</text>
        <text x="330" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="346" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_reproduccion</text>
        <text x="330" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">fecha_reproduccion</text>
        <text x="330" y="114" font-family="Consolas, monospace" font-size="10" fill="#4a7c9e" font-weight="700">FK  id_usuario</text>
        <text x="330" y="134" font-family="Consolas, monospace" font-size="10" fill="#5b9aa0" font-weight="700">FK  id_cancion</text>

        <!-- usuarios (PK) → reproducciones (FK id_usuario) -->
        <line x1="230" y1="70" x2="320" y2="114" stroke="#4a7c9e" stroke-width="2"/>
        <circle cx="230" cy="70" r="4" fill="#4a7c9e"/>
        <circle cx="320" cy="114" r="4" fill="#4a7c9e"/>
        <text x="237" y="66" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">1</text>
        <text x="298" y="110" font-family="Consolas, monospace" font-size="12" fill="#4a7c9e" font-weight="700">N</text>

        <text x="280" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">El LEFT JOIN y el RIGHT JOIN de abajo usan esta misma relación</text>
      </svg>
        </div>
        <div style="flex:1 1 260px; min-width:240px; font-size:0.88rem;">
      <p style="margin:0; font-style:italic; color:#a83a3a;">
        Consulta: listar el nombre de cada usuario junto con el id de cada canción que reprodujo, trayendo también los usuarios sin reproducciones y las reproducciones sin usuario.
      </p>
        </div>
      </div>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">04_full_outer_join_mysql.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> u.nombre, r.id_cancion
<span class="sql-kw-p">FROM</span> tbl_usuarios u
<span class="sql-kw-p">LEFT</span> <span class="sql-kw-p">JOIN</span> tbl_reproducciones r <span class="sql-kw-p">ON</span> u.idusuario = r.id_usuario
<span class="sql-kw-p">UNION</span>
<span class="sql-kw-p">SELECT</span> u.nombre, r.id_cancion
<span class="sql-kw-p">FROM</span> tbl_usuarios u
<span class="sql-kw-p">RIGHT</span> <span class="sql-kw-p">JOIN</span> tbl_reproducciones r <span class="sql-kw-p">ON</span> u.idusuario = r.id_usuario;</code></pre>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        En este caso puntual, el resultado es <strong>idéntico</strong> al del <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> que ya
        vimos (11 filas): como <code>id_usuario</code> en <code>tbl_reproducciones</code> es
        <code><span style="color:#a83a3a; font-weight:700;">NOT NULL</span></code> y tiene una FK obligatoria hacia <code>tbl_usuarios</code>, nunca puede existir
        una reproducción "huérfana" del lado derecho. Cuando las llaves foráneas están bien diseñadas, el
        <code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code> no aporta filas nuevas. Aun así, aprende la sintaxis: la vas a necesitar en
        esquemas menos restringidos, o en otros motores donde sí exista <code><span style="color:#a83a3a; font-weight:700;">FULL OUTER JOIN</span></code>
        directamente.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Cuándo usar FULL OUTER JOIN?</strong> Cuando necesitas ver los huérfanos de ambos lados
        a la vez: registros de la tabla A sin pareja en B, y registros de B sin pareja en A, todo en un
        mismo resultado.
      </p>
    </div>
  </div>

  <!-- ===================== 5. CROSS JOIN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. CROSS JOIN</h3>
    </div>
    <p>
      <code><span style="color:#a83a3a; font-weight:700;">CROSS JOIN</span></code> no compara nada: combina <strong>cada fila de una tabla con cada fila de la
      otra</strong> (producto cartesiano), sin condición <code><span style="color:#a83a3a; font-weight:700;">ON</span></code>. Si A tiene <em>n</em> filas y B
      tiene <em>m</em>, el resultado tiene <code>n &times; m</code> filas.
    </p>

    <div style="max-width:300px; margin:1rem auto 0;">
      <svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg" style="max-width:220px; width:100%; height:auto; display:block; margin:0 auto;">
        <text x="70" y="20" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">B1</text>
        <text x="110" y="20" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">B2</text>
        <text x="150" y="20" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">B3</text>
        <text x="30" y="55" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">A1</text>
        <text x="30" y="95" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">A2</text>
        <text x="30" y="135" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">A3</text>
        <rect x="50" y="35" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="90" y="35" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="130" y="35" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="50" y="75" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="90" y="75" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="130" y="75" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="50" y="115" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="90" y="115" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <rect x="130" y="115" width="35" height="30" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)"/>
        <text x="110" y="165" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">3 &times; 3 = 9 combinaciones</text>
      </svg>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: todas las combinaciones posibles de <strong>artista</strong> y <strong>usuario</strong>, sin
      ningún criterio real detrás. Hay 10 artistas y 10 usuarios en la muestra, así que el resultado tiene
      <code>10 &times; 10 = 100</code> filas.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Estas dos tablas no tienen ninguna relación por llave foránea entre sí:</strong>
      </p>
            <div style="display:flex; gap:1.2rem; flex-wrap:wrap; align-items:flex-start; margin-top:0.6rem;">
        <div style="flex:1 1 420px; min-width:280px;">
        <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block; margin:0;">
        <!-- tbl_artistas -->
        <rect x="20" y="20" width="210" height="140" rx="8" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.5"/>
        <rect x="20" y="20" width="210" height="34" rx="8" fill="#8b7fb8"/>
        <rect x="20" y="44" width="210" height="10" fill="#8b7fb8"/>
        <text x="30" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_artistas</text>
        <text x="30" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="46" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_artista</text>
        <text x="30" y="94" font-family="Consolas, monospace" font-size="10" fill="var(--accent)" font-weight="700">nombre_artista</text>
        <text x="30" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">pais</text>
        <text x="30" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">fecha_registro</text>

        <!-- tbl_usuarios -->
        <rect x="320" y="20" width="220" height="180" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <rect x="320" y="20" width="220" height="34" rx="8" fill="#4a7c9e"/>
        <rect x="320" y="44" width="220" height="10" fill="#4a7c9e"/>
        <text x="330" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_usuarios</text>
        <text x="330" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="346" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  idusuario</text>
        <text x="330" y="94" font-family="Consolas, monospace" font-size="10" fill="var(--accent)" font-weight="700">nombre</text>
        <text x="330" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">email</text>
        <text x="330" y="134" font-family="Consolas, monospace" font-size="10" fill="#33404f">password_hash</text>
        <text x="330" y="154" font-family="Consolas, monospace" font-size="10" fill="#33404f">estado_activo</text>
        <text x="330" y="174" font-family="Consolas, monospace" font-size="10" fill="#33404f">creado_at</text>

        <!-- sin relación: línea punteada gris con una X, entre las filas nombre_artista/nombre -->
        <line x1="230" y1="89" x2="320" y2="89" stroke="var(--text-dim)" stroke-width="1.5" stroke-dasharray="4,4"/>
        <text x="275" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text-dim)">&times;</text>

        <text x="280" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">Sin FK entre ellas: CROSS JOIN no la necesita</text>
      </svg>
        </div>
        <div style="flex:1 1 260px; min-width:240px; font-size:0.88rem;">
      <p style="margin:0; font-style:italic; color:#a83a3a;">
        Consulta: listar todas las combinaciones posibles entre nombre de artista y nombre de usuario, ordenadas por artista y luego por usuario.
      </p>
      <p style="margin:0.6rem 0 0;">
        De dónde sale cada columna y cómo se combinan las tablas:
      </p>
      <ul style="margin:0.3rem 0 0; padding-left:1.2rem;">
        <li><code style="color:#8b7fb8; font-weight:700;">ar.nombre_artista</code> sale de <code style="color:#8b7fb8; font-weight:700;">tbl_artistas</code>.</li>
        <li><code style="color:#4a7c9e; font-weight:700;">u.nombre</code> sale de <code style="color:#4a7c9e; font-weight:700;">tbl_usuarios</code>.</li>
        <li>Como no hay ningún <code><span style="color:#a83a3a; font-weight:700;">ON</span></code>, MySQL no compara nada: simplemente empareja cada artista con cada usuario, sin importar si esa combinación significa algo.</li>
      </ul>
        </div>
      </div>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05_cross_join.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> ar.nombre_artista, u.nombre
<span class="sql-kw-p">FROM</span> tbl_artistas ar
<span class="sql-kw-p">CROSS</span> <span class="sql-kw-p">JOIN</span> tbl_usuarios u
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> ar.nombre_artista, u.nombre;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 100 filas en total (se muestran las primeras 7)</div>
        <table><thead><tr><th>nombre_artista</th><th>nombre</th></tr></thead><tbody>
          <tr><td>Caifanes</td><td>Andrés Torres</td></tr>
          <tr><td>Caifanes</td><td>Camilo Restrepo</td></tr>
          <tr><td>Caifanes</td><td>Daniela Ortiz</td></tr>
          <tr><td>Caifanes</td><td>Felipe Castro</td></tr>
          <tr><td>Caifanes</td><td>Juan Pablo León</td></tr>
          <tr><td>Caifanes</td><td>Lucia Marin</td></tr>
          <tr><td>Caifanes</td><td>Mariana Ruiz</td></tr>
        </tbody></table>
        <p class="query-result-note">
          Y así sigue con los otros 9 artistas: 10 usuarios cada uno, hasta completar 100 filas. Ninguna de
          estas combinaciones significa que ese usuario escuche a ese artista, solo que es una combinación
          posible entre las dos tablas.
        </p>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Cuidado:</strong> <code><span style="color:#a83a3a; font-weight:700;">CROSS JOIN</span></code> crece muy rápido. Con dos tablas de 1.000 filas
        cada una, el resultado tendría 1.000.000 de filas. Se usa sobre todo para generar matrices de
        combinaciones, como este ejemplo, casi nunca para consultas normales de negocio.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Otro caso típico, con SoundFlow:</strong> imagina que quieres un reporte de reproducciones
        mes a mes, por género. Si solo agrupas las reproducciones reales por mes y género, un mes en que un
        género no tuvo <strong>ninguna</strong> reproducción ni siquiera aparece en el reporte, porque no
        hay ninguna fila registrada para esa combinación. Para evitar ese "hueco", primero se genera con
        <code><span style="color:#a83a3a; font-weight:700;">CROSS JOIN</span></code> una tabla con las <code>12 meses &times; 3 géneros = 36</code> combinaciones
        posibles, y después se hace un <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> de esa tabla completa contra las
        reproducciones reales. Así, todo mes sin reproducciones de un género queda con <code>0</code>, en
        vez de desaparecer del reporte.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Cuándo usar CROSS JOIN?</strong> Cuando necesitas generar todas las combinaciones posibles
        entre dos conjuntos (una matriz), típicamente para después cruzarla con datos reales y así detectar
        combinaciones que no tuvieron ningún registro.
      </p>
    </div>
  </div>

  <!-- ===================== 6. UNION Y UNION ALL ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. UNION y UNION ALL</h3>
    </div>
    <p>
      <code><span style="color:#a83a3a; font-weight:700;">JOIN</span></code> combina columnas de dos tablas <strong>lado a lado</strong>. <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code> hace
      algo distinto: combina las <strong>filas</strong> de dos consultas, una <strong>debajo</strong> de la
      otra, apilándolas en un solo resultado. Para poder usarlo, ambas consultas deben devolver el
      <strong>mismo número de columnas</strong>, con tipos de datos compatibles.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); margin-top:0.8rem;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">UNION</h4>
        <p style="font-size:0.85rem;">Apila los resultados y <strong>elimina las filas duplicadas</strong>.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8aae3f;">UNION ALL</h4>
        <p style="font-size:0.85rem;">Apila los resultados y <strong>conserva los duplicados</strong>. Es más rápido, porque no compara filas.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo con las mismas 4 columnas (<code>titulo</code>, <code>genero</code>, <code>duracion_seg</code>,
      <code>reproducciones</code>) desde dos consultas distintas, elegidas a propósito para que compartan
      algunas canciones en común: canciones con más de 200 segundos de duración, y canciones con más de
      5.000.000 de reproducciones. Mostrar más columnas ayuda a ver <strong>qué canción es cada fila</strong>,
      no solo su género.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">07_union_vs_union_all.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- UNION ALL: conserva todo, incluidos los repetidos
<span class="sql-kw-p">SELECT</span> titulo, genero, duracion_seg, reproducciones <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> duracion_seg > 200
<span class="sql-kw-p">UNION</span> <span class="sql-kw-p">ALL</span>
<span class="sql-kw-p">SELECT</span> titulo, genero, duracion_seg, reproducciones <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> reproducciones > 5000000;

-- UNION: el mismo par de consultas, pero elimina duplicados
<span class="sql-kw-p">SELECT</span> titulo, genero, duracion_seg, reproducciones <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> duracion_seg > 200
<span class="sql-kw-p">UNION</span>
<span class="sql-kw-p">SELECT</span> titulo, genero, duracion_seg, reproducciones <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> reproducciones > 5000000;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">UNION ALL: 13 filas (8 + 5, sin eliminar nada)</div>
        <table><thead><tr><th>titulo</th><th>genero</th><th>duracion_seg</th><th>reproducciones</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td><td>Pop</td><td>210</td><td>15200000</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>Salsa</td><td>245</td><td>8900000</td></tr>
          <tr><td>De Música Ligera</td><td>Rock</td><td>260</td><td>5400000</td></tr>
          <tr><td>Rayando el Sol</td><td>Rock</td><td>205</td><td>21000000</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>Salsa</td><td>240</td><td>12300000</td></tr>
          <tr><td>Mi Buen Amor</td><td>Pop</td><td>205</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
          <tr><td>Oye Mi Amor</td><td>Rock</td><td>215</td><td>980000</td></tr>
          <tr><td>Cuando Pase el Temblor</td><td>Rock</td><td>230</td><td>4100000</td></tr>
          <tr style="background:rgba(139,127,184,0.12);"><td>Tres Deseos</td><td>Pop</td><td>210</td><td>15200000</td></tr>
          <tr style="background:rgba(139,127,184,0.12);"><td>La Vida Es un Carnaval</td><td>Salsa</td><td>245</td><td>8900000</td></tr>
          <tr style="background:rgba(139,127,184,0.12);"><td>De Música Ligera</td><td>Rock</td><td>260</td><td>5400000</td></tr>
          <tr style="background:rgba(139,127,184,0.12);"><td>Rayando el Sol</td><td>Rock</td><td>205</td><td>21000000</td></tr>
          <tr style="background:rgba(139,127,184,0.12);"><td>La Negra Tiene Tumbao</td><td>Salsa</td><td>240</td><td>12300000</td></tr>
        </tbody></table>
        <p class="query-result-note">
          Las primeras 8 filas vienen de la consulta con <code>duracion_seg &gt; 200</code>; las últimas 5
          (resaltadas) vienen de la consulta con <code>reproducciones &gt; 5.000.000</code>. Fíjate que esas
          5 últimas son canciones que <strong>ya habían salido</strong> en las primeras 8 (Tres Deseos, La
          Vida Es un Carnaval, De Música Ligera, Rayando el Sol y La Negra Tiene Tumbao cumplen las dos
          condiciones a la vez), así que aparecen repetidas de fila completa.
        </p>
      </div>
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">UNION: solo 8 filas (los 5 duplicados exactos se eliminan)</div>
        <table><thead><tr><th>titulo</th><th>genero</th><th>duracion_seg</th><th>reproducciones</th></tr></thead><tbody>
          <tr><td>Tres Deseos</td><td>Pop</td><td>210</td><td>15200000</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>Salsa</td><td>245</td><td>8900000</td></tr>
          <tr><td>De Música Ligera</td><td>Rock</td><td>260</td><td>5400000</td></tr>
          <tr><td>Rayando el Sol</td><td>Rock</td><td>205</td><td>21000000</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>Salsa</td><td>240</td><td>12300000</td></tr>
          <tr><td>Mi Buen Amor</td><td>Pop</td><td>205</td><td style="color:var(--text-dim); font-style:italic;">NULL</td></tr>
          <tr><td>Oye Mi Amor</td><td>Rock</td><td>215</td><td>980000</td></tr>
          <tr><td>Cuando Pase el Temblor</td><td>Rock</td><td>230</td><td>4100000</td></tr>
        </tbody></table>
        <p class="query-result-note">
          <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code> compara la <strong>fila completa</strong>, no solo una columna: como las 5 filas
          de la segunda consulta son idénticas, campo por campo, a 5 filas que ya estaban en la primera,
          <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code> las reconoce como duplicadas exactas y las elimina, dejando 8 filas en vez de
          13.
        </p>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Regla práctica: si sabes de antemano que tus dos consultas <strong>nunca</strong> van a devolver
        filas repetidas entre sí (por ejemplo, nombres de artistas y nombres de usuarios, que nunca
        coinciden), usa
        <code><span style="color:#a83a3a; font-weight:700;">UNION ALL</span></code>: da el mismo resultado que <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code> pero sin el costo de comparar
        cada fila para eliminar duplicados.
      </p>
    </div>
  </div>

  <!-- ===================== 8. TABLA COMPARATIVA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>7. Tabla comparativa de JOINs</h3>
    </div>
    <div style="overflow-x:auto; margin-top:1rem;">
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Tipo</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Qué devuelve</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Cuándo usarlo</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">INNER JOIN</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Solo las filas con coincidencia en ambas tablas</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Solo te interesan registros completos, con pareja confirmada (canción con su álbum)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todo A, con NULL donde falte B</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Necesitas conservar todos los registros de una tabla, tengan o no relación (encontrar huérfanos)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todo B, con NULL donde falte A</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Poco usado en la práctica; casi siempre se reescribe como LEFT JOIN</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">FULL OUTER JOIN</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todo A y todo B, con NULL donde falte</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Necesitas ver huérfanos de ambos lados a la vez (no nativo en MySQL)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">CROSS JOIN</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todas las combinaciones posibles</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Necesitas generar una matriz de combinaciones (reportes), no para consultas normales de negocio</td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:1rem; font-size:0.88rem;">
      <p style="margin:0 0 0.5rem;"><strong>Conclusión: la tabla de la izquierda y la de la derecha</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Izquierda</strong> es la tabla que escribes primero, después de <code><span style="color:#a83a3a; font-weight:700;">FROM</span></code>. <strong>Derecha</strong> es la que escribes después de <code><span style="color:#a83a3a; font-weight:700;">JOIN</span></code>. Tú decides cuál es cuál; no hay una tabla que sea "A" por naturaleza.</li>
        <li>En <code><span style="color:#a83a3a; font-weight:700;">INNER JOIN</span></code>, <code><span style="color:#a83a3a; font-weight:700;">FULL OUTER JOIN</span></code> y <code><span style="color:#a83a3a; font-weight:700;">CROSS JOIN</span></code> el orden no cambia el resultado.</li>
        <li>En <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> y <code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code> el orden sí importa: <code>A <span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span> B</code> equivale a <code>B <span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span> A</code>. Por eso se suele usar solo LEFT y reordenar las tablas.</li>
        <li>Para elegir la izquierda pregúntate: "¿de qué tabla quiero ver todas las filas, aunque no tengan pareja?". Esa va a la izquierda en un LEFT JOIN.</li>
        <li>Sí hay que conocer la base de datos: qué tablas y columnas existen, y qué llave foránea apunta a qué llave primaria, porque eso es lo que se escribe en el <code><span style="color:#a83a3a; font-weight:700;">ON</span></code>. Por eso el diagrama del modelo es la herramienta de trabajo.</li>
      </ul>
    </div>
  </div>

  <!-- ===================== 9. SUBCONSULTAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>8. Subconsultas (subqueries)</h3>
    </div>
    <p>
      Una <strong>subconsulta</strong> es un <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> metido dentro de otra consulta. Se puede
      usar en tres lugares distintos, y cada uno resuelve un problema diferente.
    </p>

    <p style="margin-top:1rem;"><strong>1. Subconsulta en <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code>:</strong> Se usa cuando necesitas filtrar con un dato que aún no tienes. La subconsulta devuelve un valor o una lista de valores, y la consulta de afuera los usa como condición. Cuando devuelve <strong>varios</strong> valores se usa <code><span style="color:#a83a3a; font-weight:700;">IN</span></code>. Idea: "primero averiguo el dato, luego filtro con él". Ejemplo: canciones que pertenecen a álbumes lanzados antes de 1995.</p>
    <p style="margin-top:0.5rem; font-style:italic; color:#a83a3a;">
      Consulta: listar el título y el álbum de las canciones que pertenecen a álbumes lanzados antes de 1995.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">13_subconsulta_where.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> titulo, id_album
<span class="sql-kw-p">FROM</span> tbl_canciones
<span class="sql-kw-p">WHERE</span> id_album <span class="sql-kw-b">IN</span> (<span class="sql-kw-p">SELECT</span> id_album <span class="sql-kw-p">FROM</span> tbl_albumes <span class="sql-kw-p">WHERE</span> anio_lanzamiento &lt; 1995)
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> titulo;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 2 filas</div>
        <table><thead><tr><th>titulo</th><th>id_album</th></tr></thead><tbody>
          <tr><td>Oye Mi Amor</td><td>4</td></tr>
          <tr><td>Rayando el Sol</td><td>4</td></tr>
        </tbody></table>
      </div>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        La subconsulta <code>(<span style="color:#a83a3a; font-weight:700;">SELECT</span> id_album <span style="color:#a83a3a; font-weight:700;">FROM</span> tbl_albumes <span style="color:#a83a3a; font-weight:700;">WHERE</span> anio_lanzamiento &lt; 1995)</code> se
        ejecuta primero y devuelve varios valores: los álbumes 4, 7, 8 y 10 (los únicos con
        <code>anio_lanzamiento</code> menor a 1995). El <code><span style="color:#a83a3a; font-weight:700;">WHERE</span> ... <span style="color:#a83a3a; font-weight:700;">IN</span></code> de afuera se queda con las
        canciones cuyo <code>id_album</code> esté entre esos valores. Como <code>tbl_canciones</code> solo
        usa los álbumes 1 a 4, y de esos solo el álbum 4 aparece en la lista, el resultado son las 2
        canciones de ese álbum: "Oye Mi Amor" y "Rayando el Sol".
      </p>
    </div>

    <p style="margin-top:1rem;">Segundo ejemplo, con un solo valor de retorno (por eso no hace falta
    <code><span style="color:#a83a3a; font-weight:700;">IN</span></code>, basta un operador de comparación): canciones con más reproducciones que el promedio
    general.</p>
    <p style="margin-top:0.5rem; font-style:italic; color:#a83a3a;">
      Consulta: listar el título y las reproducciones de las canciones con más reproducciones que el promedio general.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">13b_subconsulta_where_avg.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> titulo, reproducciones
<span class="sql-kw-p">FROM</span> tbl_canciones
<span class="sql-kw-p">WHERE</span> reproducciones > (<span class="sql-kw-p">SELECT</span> <span class="sql-kw-b">AVG</span>(reproducciones) <span class="sql-kw-p">FROM</span> tbl_canciones)
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> reproducciones <span class="sql-kw-b">DESC</span>;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 4 filas (promedio = 8.885.000)</div>
        <table><thead><tr><th>titulo</th><th>reproducciones</th></tr></thead><tbody>
          <tr><td>Rayando el Sol</td><td>21000000</td></tr>
          <tr><td>Tres Deseos</td><td>15200000</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>12300000</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>8900000</td></tr>
        </tbody></table>
      </div>
    </div>

    <p style="margin-top:1rem;"><strong>2. Subconsulta en <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>:</strong> Se usa cuando necesitas un dato extra en cada fila del resultado. La subconsulta devuelve <strong>un solo valor por fila</strong> y aparece como una columna más; casi siempre referencia la fila externa (esto se llama <strong>subconsulta correlacionada</strong>). Idea: "a cada fila le pego un cálculo propio". Ejemplo: cada canción, junto con cuántas veces aparece en el log de reproducciones:</p>
    <p style="margin-top:0.5rem; font-style:italic; color:#a83a3a;">
      Consulta: listar el título de cada canción junto con cuántas veces aparece en el log de reproducciones.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">14_subconsulta_select.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> c.titulo,
  (<span class="sql-kw-p">SELECT</span> <span class="sql-kw-b">COUNT</span>(*) <span class="sql-kw-p">FROM</span> tbl_reproducciones r <span class="sql-kw-p">WHERE</span> r.id_cancion = c.id_cancion) <span class="sql-kw-b">AS</span> veces_en_el_log
<span class="sql-kw-p">FROM</span> tbl_canciones c
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> c.titulo;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 10 filas</div>
        <table><thead><tr><th>titulo</th><th>veces_en_el_log</th></tr></thead><tbody>
          <tr><td>Cuando Pase el Temblor</td><td>1</td></tr>
          <tr><td>De Música Ligera</td><td>1</td></tr>
          <tr><td>La Negra Tiene Tumbao</td><td>1</td></tr>
          <tr><td>La Vida Es un Carnaval</td><td>1</td></tr>
          <tr><td>Mi Buen Amor</td><td>1</td></tr>
          <tr style="background:rgba(201,113,78,0.18);"><td style="color:#c9714e; font-weight:700;">Mi Tierra</td><td style="color:#c9714e; font-weight:700;">0</td></tr>
          <tr><td>Oye Mi Amor</td><td>1</td></tr>
          <tr><td>Persiana Americana</td><td>1</td></tr>
          <tr><td>Rayando el Sol</td><td>1</td></tr>
          <tr style="background:rgba(139,127,184,0.15);"><td style="color:#5b7c99; font-weight:700;">Tres Deseos</td><td style="color:#5b7c99; font-weight:700;">2</td></tr>
        </tbody></table>
      </div>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cómo se resuelve, paso a paso:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>MySQL recorre <code>tbl_canciones</code> <strong>fila por fila</strong>.</li>
        <li>Para cada canción, toma su <code>id_cancion</code> y lo reemplaza dentro de la subconsulta.</li>
        <li>La subconsulta busca en <code>tbl_reproducciones</code> las filas con ese <code>id_cancion</code> y las cuenta.</li>
        <li>Ese número queda en la columna <code>veces_en_el_log</code> de esa fila.</li>
        <li>Cuando ya se resolvió para las 10 canciones, <code><span style="color:#a83a3a; font-weight:700;">ORDER BY</span> c.titulo</code> ordena todo el resultado alfabéticamente.</li>
      </ol>
      <p style="margin:0.6rem 0 0.3rem;"><strong>Dos ejemplos:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Tres Deseos</strong> (<code>id_cancion</code> 101): la subconsulta busca <code>id_cancion = 101</code>, encuentra 2 filas (dos usuarios distintos la reprodujeron) y <code>veces_en_el_log</code> queda en <code>2</code>.</li>
        <li><strong>Mi Tierra</strong> (<code>id_cancion</code> 103): no encuentra ninguna fila, así que el conteo da <code>0</code>.</li>
      </ul>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Es correlacionada porque, para cada canción, va y revisa dentro de <code>tbl_reproducciones</code>,
        comparándola contra cada una de sus filas: <code>r.id_cancion = c.id_cancion</code>. La subconsulta
        se ejecuta 10 veces (una por canción), y cada vez trae cuántas filas encontró con ese mismo valor.
      </p>
    </div>

    <p style="margin-top:1rem;">Segundo ejemplo, correlacionando por usuario en vez de por canción: cada
    usuario, junto con cuántas reproducciones tiene registradas en el log.</p>
    <p style="margin-top:0.5rem; font-style:italic; color:#a83a3a;">
      Consulta: listar el nombre de cada usuario junto con su total de reproducciones registradas.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">14b_subconsulta_select_usuarios.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> u.nombre,
  (<span class="sql-kw-p">SELECT</span> <span class="sql-kw-b">COUNT</span>(*) <span class="sql-kw-p">FROM</span> tbl_reproducciones r <span class="sql-kw-p">WHERE</span> r.id_usuario = u.idusuario) <span class="sql-kw-b">AS</span> total_reproducciones
<span class="sql-kw-p">FROM</span> tbl_usuarios u
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> u.nombre;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 10 filas</div>
        <table><thead><tr><th>nombre</th><th>total_reproducciones</th></tr></thead><tbody>
          <tr><td>Andrés Torres</td><td>1</td></tr>
          <tr><td>Camilo Restrepo</td><td>1</td></tr>
          <tr><td>Daniela Ortiz</td><td>1</td></tr>
          <tr><td>Felipe Castro</td><td>1</td></tr>
          <tr><td>Juan Pablo León</td><td>1</td></tr>
          <tr><td>Lucia Marin</td><td>2</td></tr>
          <tr><td>Mariana Ruiz</td><td>1</td></tr>
          <tr><td>Santiago Marin</td><td>1</td></tr>
          <tr style="background:rgba(201,113,78,0.18);"><td style="color:#c9714e; font-weight:700;">Sofía Herrera</td><td style="color:#c9714e; font-weight:700;">0</td></tr>
          <tr><td>Valentina Gómez</td><td>1</td></tr>
        </tbody></table>
        <p class="query-result-note">
          Fíjate en Sofía Herrera: con <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> (Sección 2) su fila quedaba con
          <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code> en <code>id_cancion</code>, porque no había ninguna reproducción que unir. Acá,
          con <code><span style="color:#a83a3a; font-weight:700;">COUNT</span>(*)</code> en una subconsulta correlacionada, el resultado es <code>0</code>, no
          <code><span style="color:#a83a3a; font-weight:700;">NULL</span></code>: <code><span style="color:#a83a3a; font-weight:700;">COUNT</span></code> siempre devuelve un número, incluso cuando cuenta cero filas.
        </p>
      </div>
    </div>

    <p style="margin-top:1rem;"><strong>3. Subconsulta en <code><span style="color:#a83a3a; font-weight:700;">FROM</span></code>:</strong> Se usa cuando necesitas consultar una tabla que primero hay que construir. El resultado de la subconsulta funciona como una tabla temporal y debe llevar alias. Idea: "primero armo una tabla resumen, luego la consulto". Por ejemplo, cuántas canciones tiene cada álbum, filtrando después solo los álbumes con 3 o más:</p>
    <p style="margin-top:0.5rem; font-style:italic; color:#a83a3a;">
      Consulta: listar el id y la cantidad de canciones de los álbumes que tienen 3 canciones o más.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">15b_subconsulta_from_albumes.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> id_album, cantidad_canciones
<span class="sql-kw-p">FROM</span> (
  <span class="sql-kw-p">SELECT</span> id_album, <span class="sql-kw-b">COUNT</span>(*) <span class="sql-kw-b">AS</span> cantidad_canciones
  <span class="sql-kw-p">FROM</span> tbl_canciones
  <span class="sql-kw-p">GROUP</span> <span class="sql-kw-p">BY</span> id_album
) <span class="sql-kw-b">AS</span> canciones_por_album
<span class="sql-kw-p">WHERE</span> cantidad_canciones >= 3;</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 2 filas</div>
        <table><thead><tr><th>id_album</th><th>cantidad_canciones</th></tr></thead><tbody>
          <tr><td>1</td><td>3</td></tr>
          <tr><td>3</td><td>3</td></tr>
        </tbody></table>
        <p class="query-result-note">
          La subconsulta cuenta las canciones de cada álbum: álbum 1 tiene 3 (Tres Deseos, Mi Tierra, Mi
          Buen Amor), álbum 2 tiene 2, álbum 3 tiene 3 (De Música Ligera, Persiana Americana, Cuando Pase el
          Temblor) y álbum 4 tiene 2. El <code><span style="color:#a83a3a; font-weight:700;">WHERE</span> cantidad_canciones &gt;= 3</code> de afuera solo deja pasar los
          álbumes 1 y 3.
        </p>
      </div>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cómo se resuelve, paso a paso:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>MySQL ejecuta <strong>primero la subconsulta de adentro</strong>, completa y una sola vez. No depende de ninguna fila de la consulta de afuera.</li>
        <li>Con su resultado arma una <strong>tabla temporal</strong> en memoria, a la que se le pone el alias <code>canciones_por_album</code>.</li>
        <li>La consulta de afuera toma esa tabla temporal como si fuera una tabla normal y le aplica el <code><span style="color:#a83a3a; font-weight:700;">WHERE</span> cantidad_canciones &gt;= 3</code>.</li>
        <li>Solo las filas que cumplen la condición llegan al resultado final.</li>
      </ol>
    </div>

    <p style="margin-top:1.2rem;"><strong>WHERE vs. SELECT vs. FROM:</strong> las tres son subconsultas,
    pero se diferencian en dónde van y qué tipo de resultado devuelven.</p>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Ubicación</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Qué devuelve</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Para qué sirve</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Ejemplo de la clase</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Un solo valor (con <code>=</code>, <code>&gt;</code>, <code>&lt;</code>) o varios valores (con <code><span style="color:#a83a3a; font-weight:700;">IN</span></code>)</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Filtrar filas comparándolas contra ese resultado; no aparece como columna en el resultado final</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">WHERE</span> id_album <span style="color:#a83a3a; font-weight:700;">IN</span> (<span style="color:#a83a3a; font-weight:700;">SELECT</span> id_album <span style="color:#a83a3a; font-weight:700;">FROM</span> tbl_albumes <span style="color:#a83a3a; font-weight:700;">WHERE</span> anio_lanzamiento &lt; 1995)</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Un solo valor por cada fila de la consulta externa</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Agregar una columna calculada; casi siempre correlacionada (se repite fila por fila)</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>(<span style="color:#a83a3a; font-weight:700;">SELECT COUNT</span>(*) <span style="color:#a83a3a; font-weight:700;">FROM</span> tbl_reproducciones r <span style="color:#a83a3a; font-weight:700;">WHERE</span> r.id_cancion = c.id_cancion) <span style="color:#a83a3a; font-weight:700;">AS</span> veces_en_el_log</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem;"><code><span style="color:#a83a3a; font-weight:700;">FROM</span></code></td><td style="padding:0.4rem 0.7rem;">Una tabla temporal completa (varias columnas y filas)</td><td style="padding:0.4rem 0.7rem;">Tratarla como si fuera una tabla real, para agrupar o calcular algo primero y filtrar o seleccionar después; necesita alias obligatorio</td><td style="padding:0.4rem 0.7rem;"><code><span style="color:#a83a3a; font-weight:700;">FROM</span> (<span style="color:#a83a3a; font-weight:700;">SELECT</span> id_album, <span style="color:#a83a3a; font-weight:700;">COUNT</span>(*) <span style="color:#a83a3a; font-weight:700;">AS</span> cantidad_canciones <span style="color:#a83a3a; font-weight:700;">FROM</span> tbl_canciones <span style="color:#a83a3a; font-weight:700;">GROUP BY</span> id_album) <span style="color:#a83a3a; font-weight:700;">AS</span> canciones_por_album</code></td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:1rem; font-size:0.88rem;">
      <p style="margin:0;"><strong>Truco para decidir:</strong> si la pregunta dice "que sean mayores que / que estén en", va en <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code>; si dice "junto con cuántos / el total de", va en <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>; si dice "de los que ya agrupé / sobre el resumen de", va en <code><span style="color:#a83a3a; font-weight:700;">FROM</span></code>.</p>
    </div>

  </div>

  <!-- ===================== 10. ÍNDICES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>9. Índices (index)</h3>
    </div>
    <p>
      Un <strong>índice</strong> es una estructura que MySQL mantiene aparte, para encontrar filas rápido
      sin tener que revisar la tabla completa, igual que el índice de un libro te lleva directo a la página
      sin leer todas las anteriores.
    </p>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;"><strong>Sintaxis general:</strong></p>
      <div class="sql" style="margin-top:0.4rem;"><span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">INDEX</span> nombre_indice <span class="sql-kw-p">ON</span> tabla (columna);</div>
    </div>
    <p style="margin-top:1rem;">
      Ejemplo: si consultas seguido las canciones por género, un índice ahí evita que MySQL revise las 10,
      1.000 o 10 millones de filas una por una cada vez:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">17_indice.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">INDEX</span> idx_canciones_genero <span class="sql-kw-p">ON</span> tbl_canciones (genero);</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>No son gratis:</strong> un índice acelera las lecturas (<code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>), pero hace un
        poco más lentas las escrituras (<code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code>, <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code>),
        porque cada cambio en la tabla también tiene que actualizar el índice. Además ocupa espacio extra en
        disco. Por eso no se indexa cada columna "por si acaso", solo las que de verdad se usan seguido para
        filtrar o unir tablas.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.4rem;"><strong>Aquí ya estás usando una estructura de datos</strong></p>
      <p style="margin:0 0 0.4rem;">
        El índice <code>idx_canciones_genero</code> no es magia: MySQL lo guarda como un
        <strong>árbol B+ (B+Tree)</strong>, el mismo tipo de árbol que vimos en la Semana 2. Así funciona:
      </p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>Al crear el índice, MySQL toma los valores de <code>genero</code> y los guarda <strong>ordenados</strong> dentro del árbol. Cada valor apunta a la fila real de <code>tbl_canciones</code>.</li>
        <li>Con <code><span style="color:#a83a3a; font-weight:700;">WHERE</span> genero = 'Pop'</code>, la búsqueda empieza en la <strong>raíz</strong> del árbol y compara.</li>
        <li>En cada nivel baja solo por la rama correcta y <strong>descarta todas las demás</strong>, como en un árbol de búsqueda binaria.</li>
        <li>Al llegar a la <strong>hoja</strong> donde está <code>'Pop'</code>, MySQL salta directo a esas filas de la tabla, sin revisar las demás.</li>
      </ol>
      <p style="margin:0.6rem 0 0.3rem;"><strong>Por qué importa:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Sin índice</strong> la búsqueda recorre fila por fila, como un arreglo desordenado: O(n).</li>
        <li><strong>Con índice</strong> baja por el árbol: O(log n). Con millones de filas son 3 o 4 pasos en vez de millones.</li>
        <li>Las hojas del árbol están <strong>enlazadas entre sí</strong>, como una lista enlazada. Por eso los rangos y el <code><span style="color:#a83a3a; font-weight:700;">ORDER BY</span></code> también son rápidos: se recorren las hojas una tras otra.</li>
        <li>Por eso escribir cuesta más: cada <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> debe acomodar el nuevo valor en su lugar dentro del árbol.</li>
      </ul>
    </div>
  </div>

  <!-- ===================== QUIZ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Quiz rápido de autoevaluación</h3>
    </div>
    <div class="quiz-box">
      <div class="quiz-question">
        <p>1. ¿Qué diferencia principal hay entre <code><span style="color:#a83a3a; font-weight:700;">INNER JOIN</span></code> y <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Son exactamente lo mismo</button>
          <button type="button" class="quiz-option" data-correct="true">LEFT JOIN conserva todas las filas de la izquierda aunque no tengan pareja; INNER JOIN las descarta</button>
          <button type="button" class="quiz-option" data-correct="false">INNER JOIN es más rápido porque no usa ON</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. En un <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span> tbl_usuarios u <span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span> tbl_reproducciones r</code>, ¿qué significa que <code>r.id_cancion</code> sea NULL en una fila?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Que hubo un error en la consulta</button>
          <button type="button" class="quiz-option" data-correct="true">Que ese usuario no tiene ninguna reproducción registrada</button>
          <button type="button" class="quiz-option" data-correct="false">Que la canción se borró de tbl_canciones</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Por qué en la práctica casi no se usa <code><span style="color:#a83a3a; font-weight:700;">RIGHT JOIN</span></code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque MySQL no lo soporta</button>
          <button type="button" class="quiz-option" data-correct="true">Porque el mismo resultado se logra con LEFT JOIN invirtiendo el orden de las tablas</button>
          <button type="button" class="quiz-option" data-correct="false">Porque siempre da error con más de 2 tablas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Cómo se simula un <code><span style="color:#a83a3a; font-weight:700;">FULL OUTER JOIN</span></code> en MySQL?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">No se puede lograr de ninguna forma</button>
          <button type="button" class="quiz-option" data-correct="true">Con un LEFT JOIN y un RIGHT JOIN combinados con UNION</button>
          <button type="button" class="quiz-option" data-correct="false">Usando CROSS JOIN en vez de FULL OUTER JOIN</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué riesgo tiene usar <code><span style="color:#a83a3a; font-weight:700;">CROSS JOIN</span></code> con tablas grandes?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Ninguno, siempre es la opción más eficiente</button>
          <button type="button" class="quiz-option" data-correct="true">El resultado crece como n &times; m, puede volverse enorme muy rápido</button>
          <button type="button" class="quiz-option" data-correct="false">Solo funciona con tablas de menos de 10 filas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. ¿Cuál es la diferencia entre <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code> y <code><span style="color:#a83a3a; font-weight:700;">UNION ALL</span></code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">UNION ALL es más lento porque revisa más filas</button>
          <button type="button" class="quiz-option" data-correct="true">UNION elimina filas duplicadas; UNION ALL las conserva todas</button>
          <button type="button" class="quiz-option" data-correct="false">No hay ninguna diferencia real</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué requisito deben cumplir dos consultas para poder combinarse con <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Deben venir de la misma tabla</button>
          <button type="button" class="quiz-option" data-correct="true">Deben devolver el mismo número de columnas, con tipos de datos compatibles</button>
          <button type="button" class="quiz-option" data-correct="false">Deben tener exactamente el mismo WHERE</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. ¿Cuál es la diferencia entre JOIN y UNION?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">JOIN combina columnas de tablas distintas lado a lado; UNION apila filas de consultas, una debajo de otra</button>
          <button type="button" class="quiz-option" data-correct="false">Son dos nombres distintos para exactamente lo mismo</button>
          <button type="button" class="quiz-option" data-correct="false">JOIN solo funciona con números, UNION solo con texto</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. ¿Qué diferencia hay entre una subconsulta en <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code> y una subconsulta correlacionada en <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">No hay ninguna diferencia real</button>
          <button type="button" class="quiz-option" data-correct="true">La del WHERE se ejecuta una sola vez; la correlacionada se ejecuta una vez por cada fila de la consulta externa</button>
          <button type="button" class="quiz-option" data-correct="false">La del WHERE solo funciona con texto, nunca con números</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. ¿Qué desventaja tiene crear un índice en una columna que casi nunca se consulta?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Ninguna, los índices siempre son gratis</button>
          <button type="button" class="quiz-option" data-correct="true">Hace más lentas las escrituras (INSERT/UPDATE/DELETE) y ocupa espacio extra, sin beneficio real en lecturas</button>
          <button type="button" class="quiz-option" data-correct="false">Impide hacer JOIN con esa tabla</button>
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
      Con lo visto en esta clase, escribe el <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> o el índice que resuelva cada uno de estos casos sobre <code>soundflow_db</code>. No se incluyen las respuestas: la
      idea es que practiques y las corras tú mismo en tu DBMS.
    </p>

    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#6f9d7c;">Fáciles</h4>
      <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Muestra el título de cada canción junto con el título de su álbum (INNER JOIN).</li>
        <li>Muestra el nombre de cada artista junto con el título de cada uno de sus álbumes.</li>
        <li>Muestra todos los álbumes, tengan o no canciones registradas todavía (LEFT JOIN).</li>
        <li>De la consulta anterior, filtra solo los álbumes que <strong>no</strong> tienen ninguna canción.</li>
        <li>Combina en una sola lista los nombres de todos los artistas y todos los usuarios, con una
          columna extra que diga "artista" o "usuario" según corresponda.</li>
        <li>Crea un índice sobre la columna <code>genero</code> de <code>tbl_canciones</code> y explica en
          qué casos ayudaría.</li>
      </ol>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">Mediana complejidad</h4>
      <ol start="7" style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Muestra el nombre del usuario, el título de la canción y el nombre del artista para cada
          reproducción registrada (JOIN de cuatro tablas).</li>
        <li>Genera todas las combinaciones posibles de género y año de lanzamiento de álbum (CROSS JOIN),
          usando <code><span style="color:#a83a3a; font-weight:700;">SELECT DISTINCT</span></code> sobre cada columna.</li>
        <li>Simula un FULL OUTER JOIN entre <code>tbl_artistas</code> y <code>tbl_albumes</code> con
          LEFT JOIN + RIGHT JOIN + UNION, y explica por qué el resultado sí o no trae filas nuevas frente al
          LEFT JOIN solo.</li>
        <li>Usa UNION ALL para juntar los títulos de canciones de género "Pop" con los títulos de canciones
          de género "Rock" en una sola columna, y cuenta cuántas filas trae en total.</li>
        <li>Escribe una subconsulta en el WHERE que encuentre los álbumes con más canciones que el promedio
          de canciones por álbum.</li>
      </ol>
    </div>
  </div>

  <!-- ===================== BACKUP Y RESTAURACIÓN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Backup y restauración de la base de datos</h3>
    </div>
    <p>
      Un <strong>backup</strong> es simplemente un archivo de texto con las sentencias SQL
      (<code><span style="color:#a83a3a; font-weight:700;">CREATE TABLE</span></code>, <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>) necesarias para reconstruir la base de datos
      exactamente como estaba en ese momento. <strong>Restaurar</strong> un backup es solo volver a ejecutar
      ese archivo completo contra un servidor MySQL. Hay dos formas típicas de hacerlo:
    </p>

    <p style="margin-top:1rem;"><strong>Con MySQL Workbench (visual):</strong></p>
    <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
      <li>Ve al menú <strong>Server &rarr; Data Export</strong>.</li>
      <li>Selecciona el esquema <code>soundflow_db</code> (puedes elegir tablas específicas o todo el
        esquema completo).</li>
      <li>Elige <strong>Export to Self-Contained File</strong>, y define dónde guardar el archivo
        <code>.sql</code>.</li>
      <li>Dale a <strong>Start Export</strong>. Ese archivo queda con la estructura y los datos completos.</li>
      <li>Para restaurar, usa <strong>Server &rarr; Data Import</strong>, selecciona ese mismo archivo y el
        esquema de destino.</li>
    </ol>

    <p style="margin-top:1rem;"><strong>Con línea de comandos (<code>mysqldump</code>):</strong></p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">backup.sh</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code># Backup completo (estructura + datos)
mysqldump -u root -p soundflow_db > backup_soundflow.sql

# Solo la estructura, sin datos
mysqldump -u root -p --no-data soundflow_db > estructura_soundflow.sql

# Restaurar un backup (en soundflow_db, ya creada y vacía)
mysql -u root -p soundflow_db < backup_soundflow.sql</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code>mysqldump</code> pide la contraseña del usuario y genera un archivo <code>.sql</code> con
        exactamente los mismos <code><span style="color:#a83a3a; font-weight:700;">CREATE TABLE</span></code> e <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> que ya conoces de esta clase.
        Guardar backups regularmente es lo que te permite deshacer un error grave (como un
        <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code> sin <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code>) volviendo a un punto anterior, en vez de perder los
        datos para siempre.
      </p>
    </div>
  </div>

`;

window.WEEK_CONTENT_3_2 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">Laboratorio SoundFlow</h2>

  <!-- ===================== 11. VISTAS ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>1. Vistas (VIEWS)</h3>
    </div>
    <p>
      Una <strong>vista</strong> es una consulta <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> guardada bajo un nombre, que se comporta
      como si fuera una tabla. No duplica datos: cada vez que la consultas, MySQL vuelve a ejecutar la
      consulta de adentro contra las tablas reales.
    </p>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;"><strong>Sintaxis general:</strong></p>
      <div class="sql" style="margin-top:0.4rem;"><span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">VIEW</span> nombre_vista <span class="sql-kw-b">AS</span>
<span class="sql-kw-p">SELECT</span> columnas
<span class="sql-kw-p">FROM</span> tabla
<span class="sql-kw-p">WHERE</span> condicion;</div>
    </div>

    <p style="margin-top:1rem;"><strong>Uso 1: reutilizar una consulta que usas seguido.</strong> El
    <code><span style="color:#a83a3a; font-weight:700;">INNER JOIN</span></code> de canción + álbum + artista que escribimos en la Clase 1 es perfecto para guardar
    como vista:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">18_vista_catalogo.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">VIEW</span> vista_catalogo_completo <span class="sql-kw-b">AS</span>
<span class="sql-kw-p">SELECT</span> c.titulo, al.titulo_album, ar.nombre_artista
<span class="sql-kw-p">FROM</span> tbl_canciones c
<span class="sql-kw-p">INNER</span> <span class="sql-kw-p">JOIN</span> tbl_albumes al <span class="sql-kw-p">ON</span> c.id_album = al.id_album
<span class="sql-kw-p">INNER</span> <span class="sql-kw-p">JOIN</span> tbl_artistas ar <span class="sql-kw-p">ON</span> al.id_artista = ar.id_artista;

-- Y a partir de ahora, en vez de repetir el JOIN, solo escribes:
<span class="sql-kw-p">SELECT</span> * <span class="sql-kw-p">FROM</span> vista_catalogo_completo <span class="sql-kw-p">WHERE</span> nombre_artista = 'Maná';</code></pre>
    </div>
    <div class="query-result-block">
      <div class="query-result-item" style="flex:1 1 100%;">
        <div class="query-result-caption">Resultado: 2 filas</div>
        <table><thead><tr><th>titulo</th><th>titulo_album</th><th>nombre_artista</th></tr></thead><tbody>
          <tr><td>Rayando el Sol</td><td>¿Dónde Jugarán los Niños?</td><td>Maná</td></tr>
          <tr><td>Oye Mi Amor</td><td>¿Dónde Jugarán los Niños?</td><td>Maná</td></tr>
        </tbody></table>
      </div>
    </div>

    <p style="margin-top:1rem;"><strong>Uso 2: seguridad, ocultar columnas sensibles.</strong> Conecta
    directo con Habeas Data: una vista puede exponer solo las columnas seguras de
    <code>tbl_usuarios</code>, sin que quien la consulte pueda ver jamás <code>password_hash</code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">19_vista_seguridad.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">VIEW</span> vista_usuarios_publica <span class="sql-kw-b">AS</span>
<span class="sql-kw-p">SELECT</span> idusuario, nombre, email, estado_activo
<span class="sql-kw-p">FROM</span> tbl_usuarios;

<span class="sql-kw-p">SELECT</span> * <span class="sql-kw-p">FROM</span> vista_usuarios_publica <span class="sql-kw-p">WHERE</span> idusuario = 10;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        A una aplicación (o a un equipo de análisis de datos) le das acceso a
        <code>vista_usuarios_publica</code>, nunca a <code>tbl_usuarios</code> directamente. Así, aunque
        alguien consulte la vista con total libertad, es <strong>físicamente imposible</strong> que obtenga
        el <code>password_hash</code> de nadie: esa columna ni siquiera existe en la vista.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>Cómo accede un usuario a la vista.</strong> Para compartir la vista
    sin mostrar las tablas, se crea un usuario de la base de datos y se le dan permisos solo sobre la vista:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">19b_usuario_vista.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- 1. Crear un usuario para el equipo de análisis
<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">USER</span> 'analista'@'localhost' <span class="sql-kw-p">IDENTIFIED</span> <span class="sql-kw-p">BY</span> 'clave_segura';

-- 2. Darle permiso de lectura (SELECT) solo sobre la vista
<span class="sql-kw-p">GRANT</span> <span class="sql-kw-p">SELECT</span> <span class="sql-kw-p">ON</span> soundflow_db.vista_usuarios_publica <span class="sql-kw-p">TO</span> 'analista'@'localhost';

-- 3. Verificar qué permisos tiene el usuario
<span class="sql-kw-p">SHOW</span> <span class="sql-kw-p">GRANTS</span> <span class="sql-kw-p">FOR</span> 'analista'@'localhost';

-- 4. Conectarse como 'analista' en una nueva conexión de Workbench
--    (usuario analista, host 127.0.0.1, puerto 3306)

-- 5. Lo que ese usuario puede y no puede hacer:
<span class="sql-kw-p">SELECT</span> * <span class="sql-kw-p">FROM</span> vista_usuarios_publica;   -- funciona
<span class="sql-kw-p">SELECT</span> * <span class="sql-kw-p">FROM</span> tbl_usuarios;             -- error: acceso denegado</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>¿Por qué solo se le dan ciertos permisos?</strong> Es el principio de <strong>mínimo privilegio</strong>: cada usuario recibe únicamente lo que necesita para su trabajo, nada más.</p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Solo sobre la vista, no sobre <code>tbl_usuarios</code>:</strong> el usuario puede consultar <code>vista_usuarios_publica</code>, pero si intenta leer la tabla real recibe "acceso denegado". Así el <code>password_hash</code> queda fuera de su alcance.</li>
        <li><strong>Solo <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>:</strong> puede leer, pero no <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code> ni <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code>. No puede cambiar ni borrar datos, ni por error ni a propósito.</li>
        <li><strong>Sin ver la consulta interna:</strong> al no tener el permiso <code><span style="color:#a83a3a; font-weight:700;">SHOW VIEW</span></code>, no puede leer cómo está escrita la vista. Solo ve las columnas que devuelve.</li>
        <li><strong>Menos daño si algo sale mal:</strong> si su clave se filtra o comete un error, lo máximo que se expone es lo que la vista deja ver.</li>
        <li><strong>Se puede retirar cuando ya no haga falta:</strong> <code><span style="color:#a83a3a; font-weight:700;">REVOKE SELECT ON</span> soundflow_db.vista_usuarios_publica <span style="color:#a83a3a; font-weight:700;">FROM</span> 'analista'@'localhost';</code></li>
      </ul>
    </div>
    <p style="margin-top:1.2rem;"><strong>Pruébalo tú mismo, paso a paso.</strong> Así lo verificas en tu propio equipo, con tu conexión de administrador (<code>root</code>) y una segunda conexión para el usuario nuevo:</p>
    <p style="margin-top:0.6rem;"><strong>Paso 1.</strong> Con <code>root</code>, asegúrate de que la vista exista:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">19c_paso1_vista.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">USE</span> soundflow_db;

<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">OR</span> <span class="sql-kw-p">REPLACE</span> <span class="sql-kw-p">VIEW</span> vista_usuarios_publica <span class="sql-kw-p">AS</span>
<span class="sql-kw-p">SELECT</span> idusuario, nombre, email, estado_activo
<span class="sql-kw-p">FROM</span> tbl_usuarios;</code></pre>
    </div>
    <p style="margin-top:1rem;"><strong>Paso 2.</strong> Ejecuta los pasos 1 y 2 del bloque anterior (<code>19b_usuario_vista.sql</code>): el <code><span style="color:#a83a3a; font-weight:700;">CREATE USER</span></code> y el <code><span style="color:#a83a3a; font-weight:700;">GRANT</span></code>. Cambia la clave por la que prefieras.</p>
    <p style="margin-top:1rem;"><strong>Paso 3.</strong> Comprueba que el permiso quedó guardado:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">19d_paso3_grants.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SHOW</span> <span class="sql-kw-p">GRANTS</span> <span class="sql-kw-p">FOR</span> 'analista'@'localhost';</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Debe aparecer un único permiso: <code><span style="color:#a83a3a; font-weight:700;">GRANT SELECT ON</span> soundflow_db.vista_usuarios_publica</code>. Si aparecen más, el usuario tiene más acceso del que debería.</p>
    </div>
    <p style="margin-top:1rem;"><strong>Paso 4.</strong> Conéctate como ese usuario en MySQL Workbench:</p>
    <ol style="margin:0.3rem 0 0; padding-left:1.3rem; font-size:0.88rem;">
      <li>Haz clic en el <strong>+</strong> junto a "MySQL Connections".</li>
      <li>Ponle de nombre <code>analista</code>, usuario <code>analista</code>, host <code>127.0.0.1</code> y puerto <code>3306</code>.</li>
      <li>Abre la conexión e ingresa la clave que definiste en el paso 2.</li>
    </ol>
    <p style="margin-top:1rem;"><strong>Paso 5.</strong> Dentro de esa conexión, haz las dos pruebas:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">19e_paso5_probar.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> * <span class="sql-kw-p">FROM</span> soundflow_db.vista_usuarios_publica;   -- funciona
<span class="sql-kw-p">SELECT</span> * <span class="sql-kw-p">FROM</span> soundflow_db.tbl_usuarios;             -- error: acceso denegado</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">La segunda consulta debe fallar con un mensaje parecido a: <em>SELECT command denied to user 'analista'@'localhost' for table 'tbl_usuarios'</em>. Eso confirma que el usuario ve la vista, pero no la tabla real.</p>
    </div>
    <p style="margin-top:1rem;"><strong>Paso 6.</strong> Cuando termines, vuelve a <code>root</code> y elimina el usuario de práctica:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">19f_paso6_limpiar.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">DROP</span> <span class="sql-kw-p">USER</span> 'analista'@'localhost';</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Si <code><span style="color:#a83a3a; font-weight:700;">CREATE USER</span></code> da error de permisos, es porque tu conexión no es <code>root</code> ni tiene el privilegio <code><span style="color:#a83a3a; font-weight:700;">CREATE USER</span></code>.</p>
    </div>
  </div>

  <!-- ===================== 12. TRIGGERS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. Disparadores (TRIGGERS)</h3>
    </div>
    <p>
      Un <strong>trigger</strong> (disparador) es código SQL que la base de datos ejecuta
      <strong>automáticamente</strong> cuando ocurre un evento en una tabla: un <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, un
      <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code> o un <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code>. Nadie lo llama; se dispara solo.
    </p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Para qué sirven en concreto:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li><strong>Mantener datos derivados al día:</strong> al insertar una reproducción, el trigger le suma 1 al contador de la canción en <code>tbl_canciones</code>.</li>
        <li><strong>Auditoría:</strong> guardar quién cambió qué y cuándo, copiando la fila anterior a una tabla <code>log_cambios</code>.</li>
        <li><strong>Validar o corregir datos antes de guardarlos:</strong> con <code><span style="color:#a83a3a; font-weight:700;">BEFORE INSERT</span></code>, rechazar un precio negativo o pasar el correo a minúsculas.</li>
        <li><strong>Reglas de negocio automáticas:</strong> impedir borrar un artista con álbumes, o marcar un pago como vencido.</li>
        <li><strong>Mantener resúmenes sincronizados:</strong> actualizar una tabla de totales cuando cambia la original.</li>
      </ol>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuándo se dispara:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><code><span style="color:#a83a3a; font-weight:700;">BEFORE</span></code>: antes de <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code> o <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code>. Sirve para validar o modificar el dato.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">AFTER</span></code>: después del cambio. Sirve para actualizar otras tablas o guardar el historial.</li>
        <li>Dentro del trigger puedes usar <code><span style="color:#a83a3a; font-weight:700;">NEW</span>.columna</code> (el valor nuevo) y <code><span style="color:#a83a3a; font-weight:700;">OLD</span>.columna</code> (el valor anterior).</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuidados:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Son "invisibles": si algo cambia inesperadamente en una tabla, el culpable puede ser un trigger que nadie recuerda.</li>
        <li>Úsalos para reglas que <strong>siempre</strong> deben cumplirse, sin importar desde qué aplicación se escriba.</li>
      </ul>
      <p style="margin:0.7rem 0 0;"><strong>En una frase:</strong> un trigger es un guardia que vigila una tabla: cuando entra, cambia o sale una fila, ejecuta automáticamente la tarea que le asignaste.</p>
    </div>

    <p style="margin-top:1rem;"><strong>Cómo crear un trigger.</strong> Esta es la estructura general en MySQL:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">20a_trigger_sintaxis.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">DELIMITER</span> //

<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">TRIGGER</span> nombre_trigger
<span class="sql-kw-p">BEFORE</span> | <span class="sql-kw-p">AFTER</span>  <span class="sql-kw-p">INSERT</span> | <span class="sql-kw-p">UPDATE</span> | <span class="sql-kw-p">DELETE</span>  <span class="sql-kw-p">ON</span> nombre_tabla
<span class="sql-kw-p">FOR</span> <span class="sql-kw-p">EACH</span> <span class="sql-kw-p">ROW</span>
<span class="sql-kw-p">BEGIN</span>
  -- sentencias SQL que se ejecutan cuando ocurre el evento
<span class="sql-kw-p">END</span> //

<span class="sql-kw-p">DELIMITER</span> ;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Pasos para crearlo:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>Decide la tabla que vigila, el evento (<code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code> o <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code>) y si corre antes (<code><span style="color:#a83a3a; font-weight:700;">BEFORE</span></code>) o después (<code><span style="color:#a83a3a; font-weight:700;">AFTER</span></code>).</li>
        <li>Escribe qué debe hacer, usando <code><span style="color:#a83a3a; font-weight:700;">NEW</span></code> y <code><span style="color:#a83a3a; font-weight:700;">OLD</span></code> si necesitas los valores de la fila.</li>
        <li>Ejecuta el bloque completo en Workbench, incluido el <code><span style="color:#a83a3a; font-weight:700;">DELIMITER</span></code>.</li>
        <li>Compruébalo con <code><span style="color:#a83a3a; font-weight:700;">SHOW</span> TRIGGERS;</code> y pruébalo haciendo un <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code> o <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code>.</li>
        <li>Si ya no lo necesitas, bórralo con <code><span style="color:#a83a3a; font-weight:700;">DROP TRIGGER IF EXISTS</span> nombre_trigger;</code></li>
      </ol>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: cada vez que se inserta una fila en <code>tbl_reproducciones</code>, sumar 1 automáticamente
      al contador <code>reproducciones</code> de esa canción en <code>tbl_canciones</code>, sin que nadie
      tenga que acordarse de hacerlo en el código de la aplicación:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">20_trigger_contador.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">DELIMITER</span> //

<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">TRIGGER</span> trg_after_insert_reproduccion
<span class="sql-kw-p">AFTER</span> <span class="sql-kw-p">INSERT</span> <span class="sql-kw-p">ON</span> tbl_reproducciones
<span class="sql-kw-p">FOR</span> <span class="sql-kw-p">EACH</span> <span class="sql-kw-p">ROW</span>
<span class="sql-kw-p">BEGIN</span>
  <span class="sql-kw-p">UPDATE</span> tbl_canciones
  <span class="sql-kw-p">SET</span> reproducciones = reproducciones + 1
  <span class="sql-kw-p">WHERE</span> id_cancion = <span class="sql-kw-b">NEW</span>.id_cancion;
<span class="sql-kw-p">END</span> //

<span class="sql-kw-p">DELIMITER</span> ;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Explicación línea por línea:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li><code><span style="color:#a83a3a; font-weight:700;">CREATE TRIGGER trg_after_insert_reproduccion</span></code>: crea el trigger y le pone nombre. El patrón <code>trg_momento_evento_tabla</code> ayuda a reconocerlo después.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">AFTER INSERT ON</span> tbl_reproducciones</code>: define cuándo se dispara. Aquí, <strong>después de</strong> insertar una fila en <code>tbl_reproducciones</code>.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">FOR EACH ROW</span></code>: se ejecuta una vez por cada fila afectada. Si un <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> agrega 3 filas, el trigger corre 3 veces. En MySQL es obligatorio.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">BEGIN</span></code>: abre el cuerpo del trigger, lo que va a hacer.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">UPDATE</span> tbl_canciones</code>: el trigger actualiza otra tabla, la de canciones.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">SET</span> reproducciones = reproducciones + 1</code>: le suma 1 al contador actual.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">WHERE</span> id_cancion = <span style="color:#a83a3a; font-weight:700;">NEW</span>.id_cancion;</code>: limita el cambio a la canción que se reprodujo. <code><span style="color:#a83a3a; font-weight:700;">NEW</span>.id_cancion</code> es el <code>id_cancion</code> de la fila recién insertada. Sin este <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code> se actualizarían todas las canciones.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">END</span> //</code>: cierra el cuerpo del trigger. Usa <code>//</code> porque es el delimitador temporal que definimos.</li>
      </ol>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code><span style="color:#a83a3a; font-weight:700;">NEW</span></code> es una palabra especial que solo existe dentro de triggers: representa la fila que
        se acaba de insertar (o actualizar). <code><span style="color:#a83a3a; font-weight:700;">NEW</span>.id_cancion</code> es el valor de esa columna en la
        fila nueva. Este trigger queda <strong>activo desde ya</strong>: en la siguiente sección vas a crear
        el procedimiento <code style="color:#a83a3a; font-weight:700;">sp_registrar_reproduccion</code>, y cuando lo llames, cada <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>
        que haga también va a disparar este trigger automáticamente, sin que el procedimiento tenga que
        saber que existe.
      </p>
    </div>

    <p style="margin-top:1rem;">
      Para comprobar después que el trigger sí se disparó, primero revisa el valor actual del contador de
      "Mi Tierra" (antes de llamar al procedimiento en la siguiente sección):
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">20b_validar_trigger.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> titulo, reproducciones <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> id_cancion = 103;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Ahora mismo debería mostrar <code>Mi Tierra | 3200000</code>. Después de llamar al procedimiento en
        la siguiente sección, vuelve a correr esta misma consulta: si el trigger funcionó, el valor debe
        subir a <code>3200001</code>.
      </p>
    </div>
  </div>

  <!-- ===================== 13. PROCEDIMIENTOS ALMACENADOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Procedimientos almacenados (STORED PROCEDURES)</h3>
    </div>
    <p>
      Un <strong>procedimiento almacenado</strong> es un bloque de código SQL guardado en la base de datos,
      con un nombre, que <strong>se ejecuta cuando alguien lo llama</strong> con <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>. Puede
      contener cualquier combinación de sentencias: <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code>,
      <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code>, <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>, variables, condicionales (<code><span style="color:#a83a3a; font-weight:700;">IF</span></code>), bucles, y hasta
      llamar a otros procedimientos. Se define con <code><span style="color:#a83a3a; font-weight:700;">CREATE PROCEDURE</span></code> y admite parámetros de
      entrada y/o salida.
    </p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cuándo usarlos:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li><strong>Tareas de varios pasos que van juntas:</strong> <code style="color:#a83a3a; font-weight:700;">sp_registrar_reproduccion</code> valida, inserta y deja que el trigger actualice el contador, todo con un solo <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>.</li>
        <li><strong>Lógica que se repite en varios sistemas:</strong> web, app y reportes llaman al mismo procedimiento.</li>
        <li><strong>Validar antes de escribir y operaciones "todo o nada":</strong> con <code><span style="color:#a83a3a; font-weight:700;">IF</span></code> y transacciones, si algo falla no se guarda nada.</li>
        <li><strong>Mantenimiento y procesos por lotes:</strong> limpiar registros viejos o recalcular totales.</li>
        <li><strong>Controlar el acceso:</strong> un usuario puede ejecutar el procedimiento (<code>EXECUTE</code>) sin tocar las tablas.</li>
      </ol>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Por qué conviene:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Reutilización:</strong> se escribe una vez y se llama muchas veces.</li>
        <li><strong>Consistencia:</strong> todos los sistemas aplican las mismas reglas. Si cambia la regla, se corrige en un solo lugar.</li>
        <li><strong>Menos tráfico:</strong> la aplicación envía un solo <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code> en vez de varias consultas.</li>
        <li><strong>Seguridad:</strong> los usuarios ejecutan la operación sin tocar las tablas. También ayuda contra la inyección SQL, porque los parámetros no se mezclan con el código.</li>
        <li><strong>Mantenimiento:</strong> la lógica queda cerca de los datos, no repartida entre aplicaciones.</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>La diferencia con un trigger:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>El <strong>procedimiento</strong> se ejecuta cuando alguien lo llama con <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>.</li>
        <li>El <strong>trigger</strong> se ejecuta solo, cuando ocurre el evento. Quien hace el <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> ni siquiera sabe que existe.</li>
      </ul>
      <p style="margin:0.7rem 0 0;"><strong>En una frase:</strong> un procedimiento es una receta guardada con nombre: en vez de repetir los pasos cada vez, la llamas con <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code> y la base de datos los ejecuta todos.</p>
    </div>

    <p style="margin-top:1rem;"><strong>Cómo crear un procedimiento.</strong> Esta es la estructura general en MySQL:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">21a_procedimiento_sintaxis.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">DELIMITER</span> //

<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">PROCEDURE</span> nombre_procedimiento(
  <span class="sql-kw-b">IN</span> parametro_entrada TIPO,
  <span class="sql-kw-b">OUT</span> parametro_salida TIPO
)
<span class="sql-kw-p">BEGIN</span>
  -- sentencias SQL que se ejecutan al llamarlo
<span class="sql-kw-p">END</span> //

<span class="sql-kw-p">DELIMITER</span> ;

-- Para ejecutarlo:
<span class="sql-kw-p">CALL</span> nombre_procedimiento(valor, @resultado);</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Pasos para crearlo:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>Decide qué tarea va a hacer y qué datos necesita. Los de entrada se declaran con <code><span style="color:#a83a3a; font-weight:700;">IN</span></code> y los de salida con <code><span style="color:#a83a3a; font-weight:700;">OUT</span></code>.</li>
        <li>Escribe el cuerpo entre <code><span style="color:#a83a3a; font-weight:700;">BEGIN</span></code> y <code><span style="color:#a83a3a; font-weight:700;">END</span></code>: las sentencias, los <code><span style="color:#a83a3a; font-weight:700;">IF</span></code> y las validaciones que necesites.</li>
        <li>Ejecuta el bloque completo en una pestaña SQL de Workbench, incluido el <code><span style="color:#a83a3a; font-weight:700;">DELIMITER</span></code>.</li>
        <li>Compruébalo con <code><span style="color:#a83a3a; font-weight:700;">SHOW PROCEDURE</span> STATUS <span style="color:#a83a3a; font-weight:700;">WHERE</span> Db = 'soundflow_db';</code> y pruébalo con <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>.</li>
        <li>Si ya no lo necesitas, bórralo con <code><span style="color:#a83a3a; font-weight:700;">DROP PROCEDURE IF EXISTS</span> nombre_procedimiento;</code></li>
      </ol>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: registrar una reproducción, pero solo si el usuario y la canción realmente existen (usando
      <code><span style="color:#a83a3a; font-weight:700;">IF</span></code> para controlar el flujo, y <code><span style="color:#a83a3a; font-weight:700;">EXISTS</span></code> para validar que los campos sí existan
      antes de hacer la inserción).
    </p>
    <p style="margin-top:1rem;"><strong>Cómo crearlo en Workbench (clic derecho).</strong> El editor ya maneja el delimitador por ti, así que el código va sin <code><span style="color:#a83a3a; font-weight:700;">DELIMITER</span></code>:</p>
    <div class="content-box" style="margin-top:0.6rem; font-size:0.88rem;">
      <ol style="margin:0; padding-left:1.3rem;">
        <li>En el panel izquierdo (Navigator), abre <code>soundflow_db</code>.</li>
        <li>Clic derecho sobre <strong>Stored Procedures</strong> y elige <strong>Create Stored Procedure...</strong></li>
        <li>Borra la plantilla y pega el código de abajo.</li>
        <li>Pulsa <strong>Apply</strong>, revisa el script que muestra, vuelve a pulsar <strong>Apply</strong> y luego <strong>Finish</strong>.</li>
        <li>Para ejecutarlo, abre una pestaña SQL y corre el <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>.</li>
      </ol>
    </div>
    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">21b_sp_clic_derecho.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Crea el procedimiento con nombre y dos parámetros de entrada
<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">PROCEDURE</span> sp_registrar_reproduccion(
  -- p_usuario: el id del usuario que reproduce
  <span class="sql-kw-b">IN</span> p_usuario <span class="sql-kw-b">INT</span>,
  -- p_cancion: el id de la canción reproducida
  <span class="sql-kw-b">IN</span> p_cancion <span class="sql-kw-b">INT</span>
)
-- Abre el cuerpo del procedimiento
<span class="sql-kw-p">BEGIN</span>
  -- Primero valida: ¿existe el usuario?
  <span class="sql-kw-p">IF</span> <span class="sql-kw-b">EXISTS</span> (<span class="sql-kw-p">SELECT</span> 1 <span class="sql-kw-p">FROM</span> tbl_usuarios <span class="sql-kw-p">WHERE</span> idusuario = p_usuario)
     -- ...y además, ¿existe la canción?
     <span class="sql-kw-b">AND</span> <span class="sql-kw-b">EXISTS</span> (<span class="sql-kw-p">SELECT</span> 1 <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> id_cancion = p_cancion) <span class="sql-kw-p">THEN</span>
    -- Si ambos existen, registra la reproducción (el trigger sumará 1 al contador)
    <span class="sql-kw-p">INSERT</span> <span class="sql-kw-p">INTO</span> tbl_reproducciones (id_usuario, id_cancion) <span class="sql-kw-p">VALUES</span> (p_usuario, p_cancion);
  -- Si alguno no existe, no inserta nada
  <span class="sql-kw-p">ELSE</span>
    -- y devuelve un mensaje de aviso
    <span class="sql-kw-p">SELECT</span> 'Usuario o canción no existen' <span class="sql-kw-b">AS</span> mensaje;
  -- Cierra el IF
  <span class="sql-kw-p">END</span> <span class="sql-kw-p">IF</span>;
<span class="sql-kw-p">END</span></code></pre>
    </div>
    <p style="margin-top:1rem;">Y para ejecutarlo, en una pestaña SQL:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">21c_call_sp.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Ejecuta el procedimiento con el usuario 10 y la canción 103
<span class="sql-kw-p">CALL</span> sp_registrar_reproduccion(10, 103);
--                             │    └── p_cancion = 103
--                             └─────── p_usuario  = 10</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Recuerdas a <strong>Sofía Herrera</strong> (usuario 10), la única que no tenía ninguna reproducción
        registrada (la encontramos con <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code> en la Clase 1). Y "Mi Tierra" (canción 103) era la única
        canción que nunca aparecía en <code>tbl_reproducciones</code> (la vimos en el ejemplo de
        <code><span style="color:#a83a3a; font-weight:700;">UNION</span></code> de la Clase 1). Este <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code> resuelve ambas cosas a la vez: Sofía reproduce, por fin,
        "Mi Tierra".
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Y como el trigger <code style="color:#a83a3a; font-weight:700;">trg_after_insert_reproduccion</code> ya está activo (lo creaste arriba),
        este mismo <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code> también lo dispara: el contador <code>reproducciones</code> de "Mi
        Tierra" pasa de <code>3.200.000</code> a <code>3.200.001</code>, sin que este procedimiento tenga
        que saber que ese trigger existe.
      </p>
    </div>
    <p style="margin-top:1.2rem;"><strong>Comparando antes y después de la ejecución.</strong> Para comprobar que el trigger se disparó, mira el contador de la canción antes y después del <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">21d_comparar_antes_despues.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- ANTES: anota el valor del contador
<span class="sql-kw-p">SELECT</span> titulo, reproducciones <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> id_cancion = 103;

-- EJECUCIÓN: llama al procedimiento
<span class="sql-kw-p">CALL</span> sp_registrar_reproduccion(10, 103);

-- DESPUÉS: repite la misma consulta y compara
<span class="sql-kw-p">SELECT</span> titulo, reproducciones <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> id_cancion = 103;</code></pre>
    </div>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Momento</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">reproducciones de Mi Tierra</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Qué lo explica</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Antes del <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>3200000</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Valor inicial.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem;">Después del <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code></td><td style="padding:0.4rem 0.7rem;"><code>3200001</code></td><td style="padding:0.4rem 0.7rem;">El procedimiento hizo el <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> y el trigger sumó 1 por su cuenta.</td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Si el valor sube en 1, el trigger funcionó. Si no cambia, revisa que el trigger exista con <code><span style="color:#a83a3a; font-weight:700;">SHOW</span> TRIGGERS;</code> y que el procedimiento no haya devuelto el mensaje "Usuario o canción no existen". Si ya habías ejecutado el <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code> antes, compara siempre con el valor justo antes de la nueva ejecución.</p>
    </div>
  </div>

  <!-- ===================== 14. FUNCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. Funciones almacenadas (STORED FUNCTIONS)</h3>
    </div>
    <p>
      Una <strong>función almacenada</strong> es un bloque de código guardado en la base de datos que
      <strong>calcula y devuelve un valor</strong>, y se usa <strong>dentro de una consulta</strong>, igual
      que <code><span style="color:#a83a3a; font-weight:700;">COUNT</span>()</code>, <code>UPPER()</code> o <code>NOW()</code>. Se define con
      <code><span style="color:#a83a3a; font-weight:700;">CREATE FUNCTION</span></code> y no se ejecuta con <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>.
    </p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cuándo usarlas:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li><strong>Un cálculo que repites en muchas consultas:</strong> <code>fn_total_reproducciones(id_cancion)</code> cuenta cuántas veces se reprodujo una canción. En vez de repetir la subconsulta, la llamas con el id.</li>
        <li><strong>Dar formato o limpiar valores:</strong> convertir una duración en segundos a <code>mm:ss</code>, o armar un nombre completo.</li>
        <li><strong>Reglas de cálculo del negocio:</strong> un descuento, un impuesto, la edad a partir de una fecha. Así todos los reportes calculan lo mismo.</li>
        <li><strong>Usar el resultado en <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code> u <code><span style="color:#a83a3a; font-weight:700;">ORDER BY</span></code>:</strong> eso un procedimiento no lo permite.</li>
      </ol>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Por qué conviene:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Reutilización:</strong> se escribe una vez y se usa en cualquier consulta.</li>
        <li><strong>Consistencia:</strong> todos calculan igual. Si cambia la regla, se corrige en un solo lugar.</li>
        <li><strong>Consultas más cortas:</strong> el <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> queda legible, sin subconsultas repetidas.</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuándo no conviene:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>En tablas muy grandes: una función que consulta otra tabla se ejecuta por <strong>cada fila</strong> y puede volver lenta la consulta.</li>
        <li>Para operaciones que modifican datos (<code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code>): para eso están los procedimientos.</li>
        <li>Si el cálculo cabe en una expresión simple, no hace falta una función.</li>
      </ul>
      <p style="margin:0.7rem 0 0;"><strong>En una frase:</strong> una función es una calculadora con nombre: le das un dato, te devuelve un resultado, y la puedes usar dentro de cualquier consulta.</p>
    </div>
    <p style="margin-top:1rem;"><strong>Cómo crear una función.</strong> Esta es la estructura general en MySQL:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">22a_funcion_sintaxis.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">DELIMITER</span> //

<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">FUNCTION</span> nombre_funcion(parametro TIPO)
<span class="sql-kw-b">RETURNS</span> TIPO_RETORNO
<span class="sql-kw-b">DETERMINISTIC</span>
<span class="sql-kw-p">BEGIN</span>
  <span class="sql-kw-p">DECLARE</span> variable TIPO;
  -- sentencias que calculan el valor
  <span class="sql-kw-p">RETURN</span> variable;
<span class="sql-kw-p">END</span> //

<span class="sql-kw-p">DELIMITER</span> ;

-- Para usarla, dentro de una consulta:
<span class="sql-kw-p">SELECT</span> nombre_funcion(valor);</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Pasos para crearla:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>Decide qué va a calcular, qué datos recibe y de qué tipo es el valor que devuelve (<code><span style="color:#a83a3a; font-weight:700;">RETURNS</span></code>).</li>
        <li>Agrega <code><span style="color:#a83a3a; font-weight:700;">DETERMINISTIC</span></code> si, con los mismos datos de entrada, siempre devuelve el mismo resultado.</li>
        <li>Escribe el cuerpo entre <code><span style="color:#a83a3a; font-weight:700;">BEGIN</span></code> y <code><span style="color:#a83a3a; font-weight:700;">END</span></code>. Siempre debe terminar con un <code><span style="color:#a83a3a; font-weight:700;">RETURN</span></code> que entregue el valor.</li>
        <li>Ejecuta el bloque completo en una pestaña SQL de Workbench, incluido el <code><span style="color:#a83a3a; font-weight:700;">DELIMITER</span></code>.</li>
        <li>Compruébala con <code><span style="color:#a83a3a; font-weight:700;">SHOW FUNCTION</span> STATUS <span style="color:#a83a3a; font-weight:700;">WHERE</span> Db = 'soundflow_db';</code> y pruébala dentro de un <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>.</li>
        <li>Si ya no la necesitas, bórrala con <code><span style="color:#a83a3a; font-weight:700;">DROP FUNCTION IF EXISTS</span> nombre_funcion;</code></li>
      </ol>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: una función que cuenta cuántas veces se ha reproducido una canción, el mismo cálculo que ya
      hiciste con la subconsulta correlacionada de la sección de Subconsultas de la Clase 1, pero empaquetado para
      reutilizarlo:
    </p>
    <p style="margin-top:1rem;"><strong>Cómo crearla en Workbench (clic derecho).</strong> El editor ya maneja el delimitador por ti, así que el código va sin <code><span style="color:#a83a3a; font-weight:700;">DELIMITER</span></code>:</p>
    <div class="content-box" style="margin-top:0.6rem; font-size:0.88rem;">
      <ol style="margin:0; padding-left:1.3rem;">
        <li>En el panel izquierdo (Navigator), abre <code>soundflow_db</code>.</li>
        <li>Clic derecho sobre <strong>Functions</strong> y elige <strong>Create Function...</strong></li>
        <li>Borra la plantilla y pega el código de abajo.</li>
        <li>Pulsa <strong>Apply</strong>, revisa el script que muestra, vuelve a pulsar <strong>Apply</strong> y luego <strong>Finish</strong>.</li>
        <li>Para usarla, abre una pestaña SQL y corre el <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code>.</li>
      </ol>
    </div>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">22b_fn_clic_derecho.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Crea la función con nombre y un parámetro de entrada
<span class="sql-kw-p">CREATE</span> <span class="sql-kw-p">FUNCTION</span> fn_total_reproducciones(p_cancion <span class="sql-kw-b">INT</span>)
-- Declara que devuelve un número entero
<span class="sql-kw-b">RETURNS</span> <span class="sql-kw-b">INT</span>
-- Con el mismo dato de entrada, siempre da el mismo resultado
<span class="sql-kw-b">DETERMINISTIC</span>
-- Abre el cuerpo de la función
<span class="sql-kw-p">BEGIN</span>
  -- Variable local para guardar el conteo
  <span class="sql-kw-p">DECLARE</span> total <span class="sql-kw-b">INT</span>;
  -- Cuenta las reproducciones de la canción y guarda el resultado en total
  <span class="sql-kw-p">SELECT</span> <span class="sql-kw-b">COUNT</span>(*) INTO total <span class="sql-kw-p">FROM</span> tbl_reproducciones <span class="sql-kw-p">WHERE</span> id_cancion = p_cancion;
  -- Devuelve el valor calculado
  <span class="sql-kw-p">RETURN</span> total;
<span class="sql-kw-p">END</span></code></pre>
    </div>
    <p style="margin-top:1rem;">Y para usarla, en una pestaña SQL:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">22c_usar_fn.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Se usa dentro de un SELECT, como cualquier otra función:
-- Pide el título de cada canción
<span class="sql-kw-p">SELECT</span> titulo,
  -- Llama a la función con el id de cada canción; el número que devuelve
  -- queda en la columna veces_en_el_log
  fn_total_reproducciones(id_cancion) <span class="sql-kw-b">AS</span> veces_en_el_log
-- Recorre todas las canciones; la función se ejecuta una vez por cada fila
<span class="sql-kw-p">FROM</span> tbl_canciones;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.4rem;"><strong>Se lee así:</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li><code><span style="color:#a83a3a; font-weight:700;">RETURNS INT</span></code>: declara que la función siempre devuelve un número entero.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">DETERMINISTIC</span></code>: le dice a MySQL que, con los mismos datos de entrada, la función
          siempre devuelve el mismo resultado.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">DECLARE</span> total <span style="color:#a83a3a; font-weight:700;">INT</span></code>: crea una variable local para guardar el conteo.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">SELECT COUNT</span>(*) <span style="color:#a83a3a; font-weight:700;">INTO</span> total ...</code>: guarda el resultado del conteo en la variable
          <code>total</code>, en vez de devolverlo directo.</li>
        <li><code><span style="color:#a83a3a; font-weight:700;">RETURN</span> total</code>: devuelve el valor calculado.</li>
        <li><code>fn_total_reproducciones(id_cancion)</code>: se llama dentro del <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> como
          una columna más, una vez por cada fila de <code>tbl_canciones</code>.</li>
      </ul>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        La diferencia con un procedimiento: un procedimiento no devuelve nada por sí mismo y se ejecuta
        aparte con <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code>; una función siempre devuelve un valor y se usa dentro de una consulta,
        no aparte.
      </p>
    </div>
  </div>

  <!-- ===================== 14. TODO JUNTO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Todo junto: el recorrido completo de una reproducción</h3>
    </div>
    <p>
      Así se conectan cuatro piezas de esta clase, en orden, con un solo caso real:
    </p>
    <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
      <li>Sofía Herrera (usuario 10) nunca había reproducido nada, lo confirmamos con <code><span style="color:#a83a3a; font-weight:700;">LEFT JOIN</span></code>.</li>
      <li>Alguien llama <code><span style="color:#a83a3a; font-weight:700;">CALL sp_registrar_reproduccion</span>(10, 103)</code>: el <strong>procedimiento</strong>
        valida que el usuario y la canción existan, y hace el <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>.</li>
      <li>Ese <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> dispara el <strong>trigger</strong> <code style="color:#a83a3a; font-weight:700;">trg_after_insert_reproduccion</code>,
        que suma 1 al contador de "Mi Tierra" en <code>tbl_canciones</code>.</li>
      <li>Si alguien consulta <code>vista_usuarios_publica</code> para ver la actividad de Sofía, ve su
        nombre y correo, pero nunca su <code>password_hash</code>: esa es la <strong>vista</strong> de
        seguridad protegiendo el dato sensible en todo momento.</li>
    </ol>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim); font-style:italic;">
      Más adelante en esta clase, en la sección 5 (Transacciones), vas a ver que el INSERT del procedimiento y el UPDATE del trigger, en el paso 2 y 3, ya
      corrieron juntos como una transacción, sin que tuvieras que escribirla a mano.
    </p>
  </div>

  <!-- ===================== 15. TABLA COMPARATIVA: VISTAS/PROCEDIMIENTOS/TRIGGERS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>¿Cuándo usar vista, procedimiento, función o trigger?</h3>
    </div>
    <div style="overflow-x:auto;">
      <table style="border-collapse:collapse; width:100%; font-size:0.8rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff; white-space:nowrap;">Herramienta</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff; white-space:nowrap;">Qué es</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff; white-space:nowrap;">Cómo se activa</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff; white-space:nowrap;">Qué devuelve</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff; white-space:nowrap;">Cuándo usarla</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff; white-space:nowrap;">Ejemplo en soundflow_db</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);"><code style="color:#6cb6ff; font-weight:700;">VIEW</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Un <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> guardado con nombre</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Se consulta en el <code><span style="color:#a83a3a; font-weight:700;">FROM</span></code>, como una tabla</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Una <strong>tabla</strong> (filas y columnas)</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Reutilizar una consulta que repites, u ocultar columnas sensibles a otros usuarios</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);" ><code><span style="color:#a83a3a; font-weight:700;">SELECT</span> * <span style="color:#a83a3a; font-weight:700;">FROM</span> vista_catalogo_completo</code></td></tr>
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);"><code style="color:#c792ea; font-weight:700;">PROCEDURE</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Bloque de lógica con nombre y parámetros, con varias sentencias</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Alguien lo llama con <code><span style="color:#a83a3a; font-weight:700;">CALL</span></code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Nada, o parámetros de salida</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Agrupar una acción de varios pasos que se repite, con validaciones</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);" ><code><span style="color:#a83a3a; font-weight:700;">CALL sp_registrar_reproduccion</span>(10, 103)</code></td></tr>
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);"><code style="color:#8fd6c4; font-weight:700;">FUNCTION</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Como un procedimiento, pero siempre devuelve un valor</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Se usa dentro de una consulta, como <code><span style="color:#a83a3a; font-weight:700;">COUNT</span>()</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Un solo <strong>valor</strong></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Reutilizar un cálculo y usar su resultado en un <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> o <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);" ><code><span style="color:#a83a3a; font-weight:700;">SELECT</span> fn_total_reproducciones(id_cancion)</code></td></tr>
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top;"><code style="color:#f0c47e; font-weight:700;">TRIGGER</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Código asociado a una tabla</td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Se dispara <strong>solo</strong> ante <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>, <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code> o <code><span style="color:#a83a3a; font-weight:700;">DELETE</span></code></td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Nada</td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Mantener datos derivados al día, auditar cambios o validar datos automáticamente</td><td style="padding:0.5rem 0.7rem; vertical-align:top;" ><code style="color:#a83a3a; font-weight:700;">trg_after_insert_reproduccion</code> suma 1 al contador</td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cómo decidir rápido:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>¿Quiero ver una <strong>tabla ya armada</strong>? Vista.</li>
        <li>¿Quiero <strong>ejecutar una tarea</strong> de varios pasos cuando yo lo decida? Procedimiento.</li>
        <li>¿Quiero <strong>calcular un valor</strong> para usarlo dentro de una consulta? Función.</li>
        <li>¿Quiero que algo ocurra <strong>automáticamente</strong> cuando cambian los datos? Trigger.</li>
      </ul>
    </div>
  </div>


  <!-- ===================== 0. POR QUÉ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Laboratorio de SQL con Python</h3>
    </div>
    <p>
      En esta parte de la clase vas a conectar <code>soundflow_db</code> con código Python, y vas a trabajar sobre esto:
    </p>
    <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); margin-top:0.8rem;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Conexión a MySQL</h4>
        <p style="font-size:0.85rem;">Cómo Python habla con MySQL, e inserta datos de forma segura.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Tu propia aplicación</h4>
        <p style="font-size:0.85rem;">Construir una aplicación Flask con registro, login e inserción de datos en tu computador.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Diseño según necesidades</h4>
        <p style="font-size:0.85rem;">No toda aplicación necesita el mismo tipo de base de datos.</p>
      </div>
    </div>
    <div style="margin-top:1.4rem; background:var(--bg-card); border:1px solid var(--border); border-radius:12px; padding:1rem;">
      <svg viewBox="0 0 760 380" width="100%" role="img" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0;">
        <title>Qué vamos a hacer en el laboratorio</title>
        <desc>Cuatro etapas del laboratorio y cómo se conectan el navegador, Flask y MySQL en la aplicación que construyes.</desc>
        <defs>
          <marker id="lab-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </marker>
        </defs>
        <text x="30" y="20" font-size="13" font-weight="700" fill="#6c7a89" letter-spacing="0.06em">LO QUE VAMOS A HACER</text>
      
        <g>
          <rect x="30" y="32" width="220" height="86" rx="12" fill="#5b7c99" fill-opacity="0.1" stroke="#5b7c99" stroke-width="1.2"/>
          <circle cx="54" cy="58" r="13" fill="#5b7c99"/><text x="54" y="63" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">1</text>
          <text x="76" y="63" font-size="14" font-weight="700" fill="#33404f">Python</text>
          <text x="46" y="86" font-size="12" fill="#6c7a89">Leer y entender el código</text>
          <text x="46" y="103" font-size="12" fill="#6c7a89">que habla con MySQL</text>
        </g>
        <g>
          <rect x="270" y="32" width="220" height="86" rx="12" fill="#8b7fb8" fill-opacity="0.12" stroke="#8b7fb8" stroke-width="1.2"/>
          <circle cx="294" cy="58" r="13" fill="#8b7fb8"/><text x="294" y="63" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">2</text>
          <text x="316" y="63" font-size="14" font-weight="700" fill="#33404f">Transacciones</text>
          <text x="286" y="86" font-size="12" fill="#6c7a89">COMMIT y ROLLBACK:</text>
          <text x="286" y="103" font-size="12" fill="#6c7a89">todo o nada</text>
        </g>
        <g>
          <rect x="510" y="32" width="220" height="86" rx="12" fill="#6f9d7c" fill-opacity="0.14" stroke="#6f9d7c" stroke-width="1.2"/>
          <circle cx="534" cy="58" r="13" fill="#6f9d7c"/><text x="534" y="63" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">3</text>
          <text x="556" y="63" font-size="14" font-weight="700" fill="#33404f">Tu aplicación</text>
          <text x="526" y="86" font-size="12" fill="#6c7a89">Registro, login e inserción</text>
          <text x="526" y="103" font-size="12" fill="#6c7a89">de datos, de forma segura</text>
        </g>
        <g stroke="#6c7a89" stroke-width="1.6" fill="none" marker-end="url(#lab-arr)">
          <line x1="253" y1="75" x2="267" y2="75"/>
          <line x1="493" y1="75" x2="507" y2="75"/>
        </g>
      
        <text x="30" y="156" font-size="13" font-weight="700" fill="#6c7a89" letter-spacing="0.06em">ASÍ SE CONECTAN LAS PIEZAS DE TU APLICACIÓN</text>
      
        <g>
          <rect x="30" y="170" width="170" height="96" rx="12" fill="#ffffff" stroke="#5b7c99" stroke-width="1.4"/>
          <rect x="30" y="170" width="170" height="24" rx="12" fill="#5b7c99" fill-opacity="0.18"/>
          <rect x="30" y="182" width="170" height="12" fill="#5b7c99" fill-opacity="0.18"/>
          <circle cx="46" cy="182" r="3.5" fill="#c9714e"/><circle cx="58" cy="182" r="3.5" fill="#c99a4e"/><circle cx="70" cy="182" r="3.5" fill="#6f9d7c"/>
          <text x="115" y="221" font-size="14" font-weight="700" fill="#33404f" text-anchor="middle">Navegador</text>
          <text x="115" y="241" font-size="12" fill="#6c7a89" text-anchor="middle">Formularios HTML</text>
          <text x="115" y="257" font-size="12" fill="#6c7a89" text-anchor="middle">la persona usuaria</text>
        </g>
        <g>
          <rect x="295" y="170" width="170" height="96" rx="12" fill="#c99a4e" fill-opacity="0.12" stroke="#c99a4e" stroke-width="1.4"/>
          <text x="380" y="205" font-size="14" font-weight="700" fill="#33404f" text-anchor="middle">Flask (Python)</text>
          <text x="380" y="228" font-size="12.5" fill="#33404f" text-anchor="middle" font-family="Consolas, Monaco, monospace">app.py</text>
          <text x="380" y="248" font-size="12" fill="#6c7a89" text-anchor="middle">rutas y lógica</text>
        </g>
        <g>
          <path d="M560 192 v62 a85 14 0 0 0 170 0 v-62" fill="#6f9d7c" fill-opacity="0.14" stroke="#6f9d7c" stroke-width="1.4"/>
          <ellipse cx="645" cy="192" rx="85" ry="14" fill="#6f9d7c" fill-opacity="0.22" stroke="#6f9d7c" stroke-width="1.4"/>
          <text x="645" y="226" font-size="14" font-weight="700" fill="#33404f" text-anchor="middle">MySQL</text>
          <text x="645" y="246" font-size="12" fill="#6c7a89" text-anchor="middle">soundflow_db</text>
        </g>
      
        <g fill="none" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="5 5">
          <line x1="204" y1="206" x2="290" y2="206" stroke="#5b7c99" marker-end="url(#lab-arr)"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <line x1="290" y1="238" x2="204" y2="238" stroke="#8b7fb8" marker-end="url(#lab-arr)"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <line x1="469" y1="206" x2="555" y2="206" stroke="#c99a4e" marker-end="url(#lab-arr)"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <line x1="555" y1="238" x2="469" y2="238" stroke="#6f9d7c" marker-end="url(#lab-arr)"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
        </g>
        <g font-size="11.5" fill="#6c7a89" text-anchor="middle">
          <text x="247" y="198">formulario</text>
          <text x="247" y="256">página</text>
          <text x="512" y="198">SQL con %s</text>
          <text x="512" y="256">filas</text>
        </g>
      
        <g stroke="#6c7a89" stroke-width="1" stroke-dasharray="3 4" fill="none">
          <path d="M380 266 V280 H137 V296"/>
          <path d="M380 266 V296"/>
          <path d="M380 266 V280 H622 V296"/>
        </g>
      
        <g>
          <rect x="30" y="296" width="215" height="66" rx="10" fill="#ffffff" stroke="#5b7c99" stroke-width="1.2"/>
          <rect x="30" y="296" width="6" height="66" rx="3" fill="#5b7c99"/>
          <text x="50" y="322" font-size="13.5" font-weight="700" fill="#33404f">Registro</text>
          <text x="50" y="344" font-size="12" fill="#6c7a89" font-family="Consolas, Monaco, monospace">INSERT en tbl_usuarios</text>
        </g>
        <g>
          <rect x="272" y="296" width="215" height="66" rx="10" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.2"/>
          <rect x="272" y="296" width="6" height="66" rx="3" fill="#8b7fb8"/>
          <text x="292" y="322" font-size="13.5" font-weight="700" fill="#33404f">Login</text>
          <text x="292" y="344" font-size="12" fill="#6c7a89" font-family="Consolas, Monaco, monospace">SELECT en tbl_usuarios</text>
        </g>
        <g>
          <rect x="515" y="296" width="215" height="66" rx="10" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.2"/>
          <rect x="515" y="296" width="6" height="66" rx="3" fill="#6f9d7c"/>
          <text x="535" y="322" font-size="13.5" font-weight="700" fill="#33404f">Canciones</text>
          <text x="535" y="344" font-size="12" fill="#6c7a89" font-family="Consolas, Monaco, monospace">INSERT en tbl_canciones</text>
        </g>
      </svg>
    </div>
  </div>

  <!-- ===================== PYTHON DESDE CERO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Python desde cero para este laboratorio</h3>
    </div>
    <p>
      No necesitas saber programar: solo reconocer unas pocas piezas de Python. Este es el programa más
      pequeño posible que consulta <code>soundflow_db</code>. Léelo línea por línea con sus comentarios
      (en Python empiezan con <code>#</code>):
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">00_python_minimo.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>import mysql.connector                          # trae la librería que sabe hablar con MySQL

conexion = mysql.connector.connect(            # abre la conexión, igual que haces en Workbench
    host="localhost", user="root",
    password="...", database="soundflow_db")
cursor = conexion.cursor()                     # el "mensajero": envía el SQL y recibe los resultados

genero = "Pop"                                 # variable: una caja con nombre que guarda un valor

cursor.execute(                                # envía el SQL a MySQL
    "SELECT titulo FROM tbl_canciones WHERE genero = %s",   # %s es el hueco para el valor
    (genero,))                                 # el valor va aparte, dentro de paréntesis

filas = cursor.fetchall()                      # trae todas las filas del resultado, en una lista

for fila in filas:                             # repite lo de abajo, una vez por cada fila
    print(fila[0])                             # muestra en pantalla la primera columna: el título

cursor.close()                                 # cierra el mensajero
conexion.close()                               # cierra la conexión</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Lo que hace es lo mismo que haces tú en Workbench, con las mismas cuatro acciones: <strong>conectarte</strong>, <strong>enviar un SQL</strong>, <strong>leer el resultado</strong> y <strong>cerrar</strong>. El SQL no cambia: lo único nuevo es que ahora lo envía un programa.</p>
    </div>
    <p style="margin-top:1rem;"><strong>Las piezas de Python que vas a ver en este laboratorio:</strong></p>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Pieza</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Qué es</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Dónde aparece</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong>import</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Trae una librería que alguien más ya escribió. <code>mysql.connector</code> es la que habla con MySQL.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Al inicio de todos los archivos <code>.py</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong>Variable</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Una caja con nombre que guarda un valor: <code>genero = &quot;Pop&quot;</code>. El <code>=</code> guarda, no compara.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>email</code>, <code>password</code>, <code>query</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong>Texto entre comillas</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Un valor de texto va siempre entre comillas.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">El SQL completo se escribe como texto</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong><code>input()</code></strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Pide un dato por teclado y lo devuelve como texto.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>vulnerable.py</code>, <code>seguro.py</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong>f-string</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Un texto que empieza con <code>f</code> y mete variables dentro de llaves: <code>f&quot;...{genero}...&quot;</code>. Pega el valor directo en el texto.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>vulnerable.py</code> (la forma peligrosa)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong><code>%s</code> y tupla</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">El <code>%s</code> es un hueco en el SQL. El valor se pasa aparte, en una tupla: <code>(genero,)</code>. La coma final es necesaria cuando hay un solo valor.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>seguro.py</code> (la forma segura)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong><code>cursor.execute()</code></strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Envía una sentencia SQL a MySQL.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Todos los ejemplos</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong><code>fetchall()</code> / <code>fetchone()</code></strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Traen todas las filas del resultado, o solo la primera.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Login y listados</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong><code>for ... in ...:</code></strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Repite un bloque una vez por cada elemento de una lista.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Recorrer las filas de un resultado</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong>Indentación</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Los espacios al inicio de la línea indican qué código está dentro de qué bloque. En Python importan.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Después de <code>for</code>, <code>try</code>, <code>if</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong><code>try / except / finally</code></strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>try</code> intenta; <code>except</code> atrapa el error; <code>finally</code> corre siempre, pase lo que pase (cerrar la conexión).</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Transacciones y conexión</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><strong><code>commit()</code> / <code>rollback()</code></strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Confirman o deshacen la transacción, igual que <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code> y <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span></code> en SQL.</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">Sección 5, Transacciones</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; vertical-align:top;"><strong><code>venv</code>, <code>pip</code>, <code>.env</code></strong></td><td style="padding:0.4rem 0.7rem; vertical-align:top;"><code>venv</code> es una carpeta aislada para las librerías del proyecto, <code>pip</code> las instala, y <code>.env</code> guarda las contraseñas fuera del código.</td><td style="padding:0.4rem 0.7rem; vertical-align:top;">Despliegue local, sección 7</td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;"><strong>La diferencia clave para evitar la SQL injection</strong> está en una sola línea: con un f-string el valor del usuario <strong>se pega dentro del texto del SQL</strong> (peligroso); con <code>%s</code> el valor <strong>viaja aparte</strong> y MySQL siempre lo trata como un dato, nunca como código.</p>
    </div>
  </div>

  <!-- ===================== 1. TRANSACCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. Transacciones (COMMIT / ROLLBACK)</h3>
    </div>
    <p>
      Una <strong>transacción</strong> agrupa varias sentencias en una sola unidad de <strong>todo o
      nada</strong>: o se aplican todos los cambios, o no se aplica ninguno. Esto se controla con
      <code><span style="color:#a83a3a; font-weight:700;">START TRANSACTION</span></code>, <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code> (confirma y guarda todo de forma permanente) y
      <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span></code> (deshace todo lo que llevaba la transacción).
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>De hecho, ya usaste una transacción sin escribirla:</strong> en la sección de Procedimientos almacenados, cuando
        ejecutaste <code><span style="color:#a83a3a; font-weight:700;">CALL sp_registrar_reproduccion</span>(10, 103)</code>, el <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> del
        procedimiento y el <code><span style="color:#a83a3a; font-weight:700;">UPDATE</span></code> que disparó el trigger corrieron juntos, como una sola
        unidad. Si algo hubiera fallado a mitad de camino, MySQL habría revertido ambos cambios
        automáticamente. Lo que aprendemos ahora es a controlar ese "todo o nada" nosotros mismos, de forma
        explícita.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>Por qué se usan y cuándo.</strong></p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Por qué se usan:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Todo o nada:</strong> varias sentencias que dependen una de otra se aplican juntas o no se aplica ninguna. Nunca queda la base de datos a medias.</li>
        <li><strong>Consistencia:</strong> si algo falla a la mitad (un error, un corte de luz, una caída de conexión), MySQL deshace lo que no se confirmó.</li>
        <li><strong>Aislamiento:</strong> mientras la transacción está abierta, las demás conexiones no ven tus cambios hasta que hagas <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code>.</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuándo se usan:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Cuando una operación del negocio necesita <strong>más de una sentencia</strong> que deben cumplirse juntas: crear un usuario y su primer pago, transferir dinero entre dos cuentas, descontar inventario y registrar la venta.</li>
        <li>Cuando quieres <strong>probar un cambio</strong> y poder deshacerlo si el resultado no es el esperado.</li>
        <li>No hacen falta para una sola sentencia independiente: MySQL ya la trata como una unidad.</li>
      </ul>
    </div>
    <p style="margin-top:1rem;"><strong>La estructura SQL.</strong> Una transacción siempre tiene este esqueleto:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05_transaccion_estructura.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- 1. Abrir la transacción
<span class="sql-kw-p">START</span> <span class="sql-kw-p">TRANSACTION</span>;

-- 2. Las sentencias que van juntas (INSERT, UPDATE, DELETE...)
sentencia_1;
sentencia_2;

-- 3a. Si todo salió bien: confirmar y guardar de forma permanente
<span class="sql-kw-p">COMMIT</span>;

-- 3b. Si algo falló o te arrepentiste: deshacer todo
<span class="sql-kw-p">ROLLBACK</span>;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cómo se realiza, paso a paso:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>Abre la transacción con <code><span style="color:#a83a3a; font-weight:700;">START TRANSACTION</span>;</code>.</li>
        <li>Escribe las sentencias que deben ir juntas. Hasta aquí, nada es permanente.</li>
        <li>Revisa el resultado con un <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> si quieres comprobarlo. Solo tú ves los cambios todavía.</li>
        <li>Cierra con <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span>;</code> si todo está bien, o con <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span>;</code> si algo falló o quieres deshacerlo.</li>
      </ol>
    </div>
    <p style="margin-top:1rem;"><strong>Desde dónde se debe correr.</strong></p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Pestaña SQL de MySQL Workbench:</strong> es donde lo practicamos. Todas las sentencias deben ir en la <strong>misma conexión y la misma pestaña</strong>, porque la transacción pertenece a esa sesión. Si abres otra pestaña con otra conexión, no verá tus cambios hasta el <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code>.</li>
        <li><strong>Cliente de línea de comandos (<code>mysql</code>):</strong> funciona igual, con las mismas sentencias.</li>
        <li><strong>Desde tu código (Python, Flask):</strong> la aplicación abre la conexión y llama a <code>commit()</code> o <code>rollback()</code> según el resultado. Es el uso más común en producción.</li>
        <li><strong>Dentro de un procedimiento almacenado:</strong> puedes poner <code><span style="color:#a83a3a; font-weight:700;">START TRANSACTION</span></code>, <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code> y <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span></code> en el cuerpo para que todo el procedimiento sea "todo o nada".</li>
      </ul>
    </div>
    <p style="margin-top:1rem;"><strong>Ejemplo 1: COMMIT completo.</strong> Crear un usuario y registrar su primer pago como una sola unidad. Si todo sale bien, se confirma con <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05a_transaccion_commit.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- 1. Abre la transacción: desde aquí los cambios quedan "en espera"
<span class="sql-kw-p">START</span> <span class="sql-kw-p">TRANSACTION</span>;

-- 2. Crea un usuario nuevo
<span class="sql-kw-p">INSERT</span> <span class="sql-kw-p">INTO</span> tbl_usuarios (nombre, email, password_hash)
<span class="sql-kw-p">VALUES</span> ('Laura Gómez', 'laura@email.com', 'hash_de_prueba');

-- 3. Registra su primer pago, usando el id del usuario que acabamos de crear
<span class="sql-kw-p">INSERT</span> <span class="sql-kw-p">INTO</span> tbl_pagos_suscripcion (monto, id_usuario)
<span class="sql-kw-p">VALUES</span> (25000, LAST_INSERT_ID());

-- 4. Dentro de la transacción ya ves los cambios (solo tú, todavía no están confirmados)
<span class="sql-kw-p">SELECT</span> u.nombre, p.monto
<span class="sql-kw-p">FROM</span> tbl_usuarios u
INNER JOIN tbl_pagos_suscripcion p ON p.id_usuario = u.idusuario
<span class="sql-kw-p">WHERE</span> u.email = 'laura@email.com';

-- 5. Todo salió bien: confirma y guarda los cambios de forma permanente
<span class="sql-kw-p">COMMIT</span>;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Después del <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code>, los cambios quedan guardados para siempre y los ven todas las conexiones. Antes del <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code>, solo los ves tú. <code>LAST_INSERT_ID()</code> devuelve el id que MySQL acaba de asignar al usuario nuevo, para enlazar el pago a él.</p>
    </div>
    <p style="margin-top:1rem;"><strong>Ejemplo 2: ROLLBACK.</strong> Desactivamos a Sofía dentro de una transacción y luego deshacemos el cambio:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05b_transaccion_rollback.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- 1. Abre la transacción
<span class="sql-kw-p">START</span> <span class="sql-kw-p">TRANSACTION</span>;

-- 2. Estado actual de Sofía (idusuario 10): estado_activo = 1
<span class="sql-kw-p">SELECT</span> idusuario, nombre, estado_activo <span class="sql-kw-p">FROM</span> tbl_usuarios <span class="sql-kw-p">WHERE</span> idusuario = 10;

-- 3. Desactívala dentro de la transacción
<span class="sql-kw-p">UPDATE</span> tbl_usuarios <span class="sql-kw-p">SET</span> estado_activo = 0 <span class="sql-kw-p">WHERE</span> idusuario = 10;

-- 4. Segundo paso: registrar una reproducción de Sofía con una canción que NO existe (999).
--    Está comentado a propósito, no se ejecuta. Si se ejecutara, daría error 1452
--    (la FK a tbl_canciones falla) y dejaría a Sofía desactivada sin su reproducción.
-- INSERT INTO tbl_reproducciones (id_usuario, id_cancion) VALUES (10, 999);

-- 5. Dentro de la transacción ya aparece desactivada: estado_activo = 0
<span class="sql-kw-p">SELECT</span> idusuario, nombre, estado_activo <span class="sql-kw-p">FROM</span> tbl_usuarios <span class="sql-kw-p">WHERE</span> idusuario = 10;

-- 6. Imaginemos que el paso 4 falló: ROLLBACK deshace todo lo que llevaba la transacción
<span class="sql-kw-p">ROLLBACK</span>;

-- 7. Después del ROLLBACK, Sofía vuelve a estar activa: estado_activo = 1
<span class="sql-kw-p">SELECT</span> idusuario, nombre, estado_activo <span class="sql-kw-p">FROM</span> tbl_usuarios <span class="sql-kw-p">WHERE</span> idusuario = 10;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Mira los tres <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> en las pestañas de resultados del Workbench: <code>estado_activo</code> pasa de <code>1</code> a <code>0</code> y, tras el <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span></code>, vuelve a <code>1</code>. Dentro de la transacción el cambio solo lo ves tú; el <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span></code> lo descarta y nada quedó guardado. Aquí simulamos el fallo del paso 4 (la reproducción está comentada y no se ejecuta) y escribimos el <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span></code> a mano, pero en una aplicación real se ejecuta cuando una sentencia falla a mitad de la transacción, para que no queden datos a medias.</p>
    </div>
  </div>

  <!-- ===================== 2. SQL INJECTION ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. Cómo evitar la SQL injection</h3>
    </div>
    <p>
      Cuando una aplicación recibe datos de una persona (un formulario de registro o de login), hay una regla que nunca se rompe:
      <strong>el dato nunca se pega dentro del texto del SQL</strong>. Si se hace, alguien puede escribir código SQL en un campo del
      formulario y alterar la consulta. Eso se llama <strong>SQL injection</strong> (o inyección SQL).
    </p>
    <p style="margin-top:1rem;"><strong>Cómo NO se hace.</strong> Meter el valor del usuario directo en el texto con un f-string:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">vulnerable.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>genero_usuario = input("¿Qué género buscas? ")
query = f"SELECT titulo FROM tbl_canciones WHERE genero = '{genero_usuario}'"
cursor.execute(query)</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>¿Qué es un f-string?</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Es un texto de Python que empieza con <code>f</code> antes de las comillas: <code>f"..."</code>.</li>
        <li>Lo que va entre llaves <code>{}</code> se reemplaza por el valor de esa variable. Con <code>genero_usuario = "Pop"</code>, el texto queda <code>WHERE genero = 'Pop'</code>.</li>
        <li>El problema: el valor se <strong>pega</strong> dentro del texto del SQL, así que lo que escriba la persona pasa a ser parte de la consulta.</li>
      </ul>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Si escriben <code>Pop</code>, funciona. Pero si escriben <code style="color:#a83a3a; font-weight:700;">Pop' OR '1'='1</code>, el <code><span style="color:#a83a3a; font-weight:700;">WHERE</span></code> deja de filtrar y la consulta devuelve <strong>todas</strong> las canciones. El texto del usuario se convirtió en parte del SQL.</p>
    </div>
    <p style="margin-top:1rem;"><strong>Cómo se evita.</strong> Dejar un marcador <code style="color:#a83a3a; font-weight:700;">%s</code> y pasar el valor aparte, en una tupla:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">seguro.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>genero_usuario = input("¿Qué género buscas? ")
query = "SELECT titulo FROM tbl_canciones WHERE genero = %s"
cursor.execute(query, (genero_usuario,))</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>¿Qué es <code style="color:#a83a3a; font-weight:700;">%s</code>?</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Es un <strong>marcador de posición</strong>: un espacio reservado para un valor que se entrega aparte. No tiene nada que ver con formatear texto.</li>
        <li>Se usa <code>%s</code> para cualquier tipo de dato (texto, números, fechas), siempre sin comillas alrededor.</li>
        <li>Al ejecutar, <code>cursor.execute(query, (valor,))</code> envía el SQL y el valor por separado. La coma en <code>(genero_usuario,)</code> es obligatoria cuando hay un solo valor, para que Python lo trate como tupla.</li>
        <li>Con dos valores, se usan dos marcadores y una tupla con dos datos, en el mismo orden: <code>VALUES (%s, %s)</code> con <code>(titulo, genero)</code>.</li>
      </ul>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li>El valor viaja <strong>separado</strong> del SQL, y MySQL siempre lo trata como un dato, nunca como código.</li>
        <li>Esto aplica a <strong>todas</strong> las consultas de tu aplicación: registro, login e inserción de datos.</li>
        <li>Nunca construyas SQL con f-strings ni concatenando valores que vienen del usuario.</li>
      </ul>
    </div>
  </div>

  <!-- ===================== 3. APLICACIÓN FLASK + MYSQL ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>7. Construye tu aplicación Flask + MySQL: registro, login e inserción de datos</h3>
    </div>
    <p>
      Vas a construir, paso a paso, una aplicación web que corre <strong>en tu propio computador</strong>
      (<code>localhost</code>, sin nube ni cuentas externas) y se conecta a <code>soundflow_db</code>. Al terminar, una persona podrá:
    </p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Registrarse</strong>: se hace un <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> en <code>tbl_usuarios</code>, guardando el hash de la contraseña.</li>
        <li><strong>Iniciar sesión</strong>: se hace un <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> en <code>tbl_usuarios</code> y se verifica el hash.</li>
        <li><strong>Ingresar datos</strong>: agrega canciones con un <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> en <code>tbl_canciones</code> y ve la lista actual.</li>
      </ul>
    </div>
    <p style="margin-top:1rem;">Esta es la estructura de carpetas que vas a tener al final:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">estructura.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>soundflow_app/
  app.py
  .env
  .gitignore
  requirements.txt
  templates/
    base.html
    registro.html
    login.html
    dashboard.html
  static/
    style.css</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;"><strong>Cómo se trabaja:</strong> prepara el proyecto (pasos 0 y 1), copia los archivos una sola vez (paso 2), crea el diseño (paso 3), ejecuta y prueba (paso 4) y después revisa cómo funciona cada parte (paso 5). <strong>Desplegar</strong> aquí significa dejar tu aplicación y su conexión a la base de datos corriendo y lista para usarse, no solo escrita.</p>
    </div>
    <p style="margin-top:1.4rem;"><strong>Paso 0. Verifica MySQL Workbench</strong></p>
    <p style="margin-top:0.3rem;">Abre MySQL Workbench y conéctate a tu servidor local (normalmente <code>127.0.0.1</code>, puerto <code>3306</code>). Confirma que <code>soundflow_db</code> existe con sus tablas. Anota host, puerto, usuario y contraseña: los vas a necesitar en el paso 1.</p>
    <p style="margin-top:1.4rem;"><strong>Paso 1. Prepara el proyecto</strong></p>
    <p style="margin-top:0.3rem;">Crea la carpeta <code>soundflow_app</code>, ábrela en una terminal y corre estos comandos. El primero crea un entorno virtual (una carpeta aislada para las librerías de este proyecto) y el tercero instala lo que lista <code>requirements.txt</code>:</p>
    <p style="margin-top:0.6rem;">Primero crea el archivo <code>requirements.txt</code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">requirements.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>Flask==3.0.3
mysql-connector-python==8.4.0
python-dotenv==1.0.1
Werkzeug==3.0.3</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Qué hace cada línea:</strong> cada una es una librería que instala <code>pip</code>. El <code>==</code> fija la versión, para que todos usen la misma.</p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><code>Flask==3.0.3</code>: el <strong>framework web</strong> de Python. Recibe lo que haces en el navegador (abrir una página, enviar un formulario), ejecuta tu código y devuelve una página.</li>
        <li><code>mysql-connector-python==8.4.0</code>: el <strong>conector</strong> que permite a Python hablar con MySQL (<code>import mysql.connector</code>) para correr los <code><span style="color:#a83a3a; font-weight:700;">SELECT</span></code> e <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code>.</li>
        <li><code>python-dotenv==1.0.1</code>: lee el archivo <code>.env</code> para que la contraseña de la base de datos y el <code>SECRET_KEY</code> queden <strong>fuera del código</strong>.</li>
        <li><code>Werkzeug==3.0.3</code>: herramientas que usa Flask por dentro. En este proyecto la usas para guardar la contraseña como <strong>hash</strong> (<code>generate_password_hash</code>) y verificarla al iniciar sesión (<code>check_password_hash</code>).</li>
      </ul>
    </div>
    <p style="margin-top:0.8rem;">Luego, en la terminal, ejecuta <strong>línea por línea</strong>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>python -m venv venv
venv\\Scripts\\activate          # Windows (en Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
python -c "import secrets; print(secrets.token_hex(16))"   # genera el SECRET_KEY</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Qué hace cada línea:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><code>python -m venv venv</code>: crea una carpeta llamada <code>venv</code> con un <strong>entorno virtual</strong>, un Python aislado donde se instalan solo las librerías de este proyecto, sin mezclarlas con otros. Se hace una sola vez.</li>
        <li><code>venv\\Scripts\\activate</code>: <strong>activa</strong> ese entorno. Cuando funciona, la terminal muestra <code>(venv)</code> al inicio. En Mac/Linux es <code>source venv/bin/activate</code>. Hay que repetirlo cada vez que abras una terminal nueva.</li>
        <li><code>pip install -r requirements.txt</code>: <code>pip</code> lee el archivo <code>requirements.txt</code> e instala todas las librerías de la lista (<code>-r</code> significa "lee desde el archivo"). Se hace una sola vez.</li>
        <li><code>python -c "import secrets; print(secrets.token_hex(16))"</code>: <code>-c</code> corre una línea de Python directo desde la terminal. Genera un texto aleatorio de 32 caracteres y lo imprime. Lo copias como <code>SECRET_KEY</code> en el <code>.env</code>: Flask lo usa para firmar la sesión (que el login no se pueda falsificar).</li>
        <li style="list-style:none; margin-left:-1.2rem; color:#a83a3a; font-weight:700;">Guarda ese token: lo usarás en tu .env.</li>
      </ul>
    </div>
    <p style="margin-top:0.8rem;">Crea el archivo <code>.env</code> (guarda tu contraseña <strong>fuera del código</strong>) y pega ahí el texto aleatorio que imprimió el último comando como <code>SECRET_KEY</code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">.env</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_de_mysql
DB_NAME=soundflow_db
SECRET_KEY=pega_aqui_el_texto_aleatorio</code></pre>
    </div>
    <p style="margin-top:0.8rem;">Y un <code>.gitignore</code>, para que el <code>.env</code> y el <code>venv</code> nunca se suban a GitHub:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">.gitignore</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>.env
venv/
__pycache__/</code></pre>
    </div>
    <p style="margin-top:1.4rem;"><strong>Paso 2. Crea los archivos de la aplicación (se copian una sola vez)</strong></p>
    <p style="margin-top:0.3rem;">Dentro de <code>soundflow_app</code> crea la carpeta <code>templates</code> y, dentro, estos cuatro archivos. Luego crea <code>app.py</code> junto a <code>.env</code>. El diseño (CSS) lo creas en el paso 3. <strong>Copia cada archivo completo, tal como está:</strong> con eso la aplicación queda terminada, sin pasos intermedios ni cambios después.</p>
    <p style="margin-top:0.8rem;"><strong>templates/base.html</strong>, la plantilla común de todas las páginas:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">templates/base.html</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;title&gt;{% block titulo %}SoundFlow{% endblock %}&lt;/title&gt;
  &lt;!-- Aquí se llama al CSS que está en la carpeta static --&gt;
  &lt;link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header class="barra"&gt;
    &lt;a class="logo" href="{{ url_for('inicio') }}"&gt;♪ SoundFlow&lt;/a&gt;
    {% if session.get('usuario_nombre') %}
      &lt;div class="barra-usuario"&gt;
        &lt;span&gt;{{ session['usuario_nombre'] }}&lt;/span&gt;
        &lt;a class="btn-link" href="{{ url_for('logout') }}"&gt;Cerrar sesión&lt;/a&gt;
      &lt;/div&gt;
    {% endif %}
  &lt;/header&gt;
  &lt;main class="contenedor"&gt;
    {% for m in get_flashed_messages() %}
      &lt;div class="aviso"&gt;{{ m }}&lt;/div&gt;
    {% endfor %}
    {% block contenido %}{% endblock %}
  &lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    </div>
    <p style="margin-top:0.8rem;"><strong>templates/registro.html</strong>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">templates/registro.html</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{% extends "base.html" %}
{% block titulo %}Crear cuenta{% endblock %}
{% block contenido %}
  &lt;section class="tarjeta tarjeta-auth"&gt;
    &lt;h1&gt;Crea tu cuenta&lt;/h1&gt;
    &lt;p class="sub"&gt;Empieza a escuchar sin límites.&lt;/p&gt;
    &lt;form method="POST" class="formulario"&gt;
      &lt;label&gt;Nombre &lt;input type="text" name="nombre" required&gt;&lt;/label&gt;
      &lt;label&gt;Correo &lt;input type="email" name="email" required&gt;&lt;/label&gt;
      &lt;label&gt;Contraseña &lt;input type="password" name="password" required&gt;&lt;/label&gt;
      &lt;button type="submit" class="btn"&gt;Crear cuenta&lt;/button&gt;
    &lt;/form&gt;
    &lt;p class="pie"&gt;¿Ya tienes cuenta? &lt;a href="{{ url_for('login') }}"&gt;Inicia sesión&lt;/a&gt;&lt;/p&gt;
  &lt;/section&gt;
{% endblock %}</code></pre>
    </div>
    <p style="margin-top:0.8rem;"><strong>templates/login.html</strong>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">templates/login.html</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{% extends "base.html" %}
{% block titulo %}Iniciar sesión{% endblock %}
{% block contenido %}
  &lt;section class="tarjeta tarjeta-auth"&gt;
    &lt;h1&gt;Bienvenido&lt;/h1&gt;
    &lt;p class="sub"&gt;Inicia sesión para ver tu música.&lt;/p&gt;
    &lt;form method="POST" class="formulario"&gt;
      &lt;label&gt;Correo &lt;input type="email" name="email" required&gt;&lt;/label&gt;
      &lt;label&gt;Contraseña &lt;input type="password" name="password" required&gt;&lt;/label&gt;
      &lt;button type="submit" class="btn"&gt;Entrar&lt;/button&gt;
    &lt;/form&gt;
    &lt;p class="pie"&gt;¿No tienes cuenta? &lt;a href="{{ url_for('registro') }}"&gt;Regístrate&lt;/a&gt;&lt;/p&gt;
  &lt;/section&gt;
{% endblock %}</code></pre>
    </div>
    <p style="margin-top:0.8rem;"><strong>templates/dashboard.html</strong>, el formulario de canciones y la tabla:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">templates/dashboard.html</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{% extends "base.html" %}
{% block titulo %}Tu música{% endblock %}
{% block contenido %}
  &lt;h1&gt;Hola, {{ nombre }}&lt;/h1&gt;
  &lt;p class="sub"&gt;Tu biblioteca de música&lt;/p&gt;

  &lt;section class="tarjeta"&gt;
    &lt;h2&gt;Agregar canción&lt;/h2&gt;
    {% if mensaje_error %}
      &lt;div class="aviso aviso-error"&gt;{{ mensaje_error }}&lt;/div&gt;
    {% endif %}
    &lt;form method="POST" class="formulario formulario-grid"&gt;
      &lt;label&gt;Título &lt;input type="text" name="titulo" required&gt;&lt;/label&gt;
      &lt;label&gt;Género &lt;input type="text" name="genero" required&gt;&lt;/label&gt;
      &lt;label&gt;Duración (segundos) &lt;input type="number" name="duracion_seg" min="1" required&gt;&lt;/label&gt;
      &lt;label&gt;Álbum (id_album, del 1 al 10) &lt;input type="number" name="id_album" min="1" required&gt;&lt;/label&gt;
      &lt;button type="submit" class="btn"&gt;Agregar&lt;/button&gt;
    &lt;/form&gt;
  &lt;/section&gt;

  &lt;section class="tarjeta"&gt;
    &lt;h2&gt;Tu biblioteca &lt;span class="contador"&gt;{{ canciones|length }} canciones&lt;/span&gt;&lt;/h2&gt;
    &lt;table class="lista"&gt;
      &lt;thead&gt;
        &lt;tr&gt;&lt;th&gt;#&lt;/th&gt;&lt;th&gt;Título&lt;/th&gt;&lt;th&gt;Género&lt;/th&gt;&lt;th&gt;Duración&lt;/th&gt;&lt;th&gt;Álbum&lt;/th&gt;&lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        {% for c in canciones %}
          &lt;tr&gt;
            &lt;td&gt;{{ loop.index }}&lt;/td&gt;
            &lt;td class="titulo"&gt;{{ c.titulo }}&lt;/td&gt;
            &lt;td&gt;&lt;span class="chip"&gt;{{ c.genero }}&lt;/span&gt;&lt;/td&gt;
            &lt;td&gt;{{ c.duracion_seg // 60 }}:{{ '%02d' % (c.duracion_seg % 60) }}&lt;/td&gt;
            &lt;td&gt;{{ c.id_album }}&lt;/td&gt;
          &lt;/tr&gt;
        {% endfor %}
      &lt;/tbody&gt;
    &lt;/table&gt;
  &lt;/section&gt;
{% endblock %}</code></pre>
    </div>
    <p style="margin-top:0.8rem;"><strong>app.py</strong>, completo. Pega todo el código, sin borrar ni reordenar nada; <code>if __name__ == "__main__":</code> debe quedar al final:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">app.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>import os                                   # para leer las variables de entorno

from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector                      # la librería que habla con MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv              # lee el archivo .env

load_dotenv()                               # carga las variables del .env

app = Flask(__name__)                       # crea la aplicación web
app.secret_key = os.getenv("SECRET_KEY")    # clave con la que Flask firma la sesión


def get_connection():
    """Abre una conexión nueva a soundflow_db con los datos del .env."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "soundflow_db"),
    )


@app.route("/")
def inicio():
    if "usuario_id" in session:
        return redirect(url_for("dashboard"))
    return redirect(url_for("login"))


@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":                 # el usuario envió el formulario
        nombre = request.form.get("nombre", "").strip()
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "")

        if not nombre or not email or not password:
            flash("Todos los campos son obligatorios.")
            return redirect(url_for("registro"))

        conn = get_connection()
        cursor = conn.cursor()
        try:
            # 1. ¿Ya existe ese correo? El valor viaja aparte, con %s
            cursor.execute("SELECT idusuario FROM tbl_usuarios WHERE email = %s", (email,))
            if cursor.fetchone():
                flash("Ya existe una cuenta con ese correo.")
                return redirect(url_for("registro"))

            # 2. Guarda el HASH de la contraseña, nunca la contraseña
            password_hash = generate_password_hash(password)
            cursor.execute(
                "INSERT INTO tbl_usuarios (nombre, email, password_hash) VALUES (%s, %s, %s)",
                (nombre, email, password_hash),
            )
            conn.commit()                        # confirma el INSERT
            flash("Cuenta creada correctamente.")
            return redirect(url_for("login"))
        finally:
            cursor.close()
            conn.close()

    return render_template("registro.html")      # GET: solo muestra el formulario


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "")

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)    # las filas llegan como diccionarios
        try:
            # Busca al usuario SOLO por correo; la contraseña se verifica en Python
            cursor.execute(
                "SELECT idusuario, nombre, password_hash FROM tbl_usuarios WHERE email = %s",
                (email,),
            )
            usuario = cursor.fetchone()          # una fila, o None si no existe
        finally:
            cursor.close()
            conn.close()

        # Compara la contraseña escrita contra el hash guardado
        if usuario and check_password_hash(usuario["password_hash"], password):
            session["usuario_id"] = usuario["idusuario"]        # recuerda quién entró
            session["usuario_nombre"] = usuario["nombre"]
            return redirect(url_for("dashboard"))

        flash("Correo o contraseña incorrectos.")
        return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()                              # olvida la sesión
    return redirect(url_for("login"))


@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    if "usuario_id" not in session:              # protege la página: sin sesión, al login
        return redirect(url_for("login"))

    mensaje_error = None

    if request.method == "POST":                 # el usuario envió una canción nueva
        titulo = request.form.get("titulo", "").strip()
        genero = request.form.get("genero", "").strip()
        duracion_seg = request.form.get("duracion_seg", "").strip()
        id_album = request.form.get("id_album", "").strip()

        conn = get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO tbl_canciones (titulo, genero, duracion_seg, reproducciones, id_album) "
                "VALUES (%s, %s, %s, 0, %s)",
                (titulo, genero, duracion_seg, id_album),
            )
            conn.commit()
            flash(f'Canción "{titulo}" agregada.')
            return redirect(url_for("dashboard"))
        except mysql.connector.Error as err:     # por ejemplo, un id_album que no existe (FK)
            mensaje_error = f"No se pudo guardar la canción: {err}"
        finally:
            cursor.close()
            conn.close()

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT titulo, genero, duracion_seg, id_album FROM tbl_canciones ORDER BY titulo"
        )
        canciones = cursor.fetchall()            # todas las filas, como lista
    finally:
        cursor.close()
        conn.close()

    return render_template("dashboard.html", nombre=session["usuario_nombre"],
                           canciones=canciones, mensaje_error=mensaje_error)


if __name__ == "__main__":
    app.run(debug=True)                     # arranca el servidor en http://127.0.0.1:5000</code></pre>
    </div>
    <p style="margin-top:1.4rem;"><strong>Paso 3. Crea el diseño (CSS)</strong></p>
    <p style="margin-top:0.3rem;">El <strong>CSS</strong> es el archivo que define cómo se ven las pantallas: colores, tarjetas, botones y la lista de canciones. No cambia la lógica, solo la apariencia. Hasta ahora tu aplicación funciona, pero se ve sin estilo.</p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ol style="margin:0; padding-left:1.3rem;">
        <li>Crea la carpeta <code>static</code>, junto a <code>app.py</code> (Flask entrega solo lo que está en una carpeta con ese nombre).</li>
        <li>Dentro, crea el archivo <code>style.css</code>.</li>
        <li>Copia ahí, completo, este código:</li>
      </ol>
    </div>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">static/style.css</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>/* SoundFlow - estilo de streaming musical */
:root {
  --fondo: #0f0f1a;
  --tarjeta: #181826;
  --borde: #2a2a40;
  --texto: #f1f1f7;
  --texto-suave: #a0a0bd;
  --acento: #8b5cf6;
  --acento-2: #ec4899;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Segoe UI", system-ui, sans-serif;
  color: var(--texto);
  background:
    radial-gradient(circle at 15% 0%, rgba(139, 92, 246, 0.25), transparent 45%),
    radial-gradient(circle at 90% 10%, rgba(236, 72, 153, 0.18), transparent 40%),
    var(--fondo);
}

a { color: var(--acento-2); text-decoration: none; }
a:hover { text-decoration: underline; }

/* Barra superior */
.barra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(15, 15, 26, 0.85);
  border-bottom: 1px solid var(--borde);
}
.logo {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--acento), var(--acento-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.logo:hover { text-decoration: none; }
.barra-usuario { display: flex; align-items: center; gap: 1rem; color: var(--texto-suave); }
.btn-link {
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--borde);
  border-radius: 999px;
  color: var(--texto);
}
.btn-link:hover { border-color: var(--acento); text-decoration: none; }

/* Contenido */
.contenedor { max-width: 900px; margin: 2rem auto; padding: 0 1.2rem; }
h1 { margin: 0 0 0.3rem; font-size: 2rem; }
h2 { margin: 0 0 1rem; font-size: 1.15rem; }
.sub { margin: 0 0 1.5rem; color: var(--texto-suave); }

.tarjeta {
  background: var(--tarjeta);
  border: 1px solid var(--borde);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}
.tarjeta-auth { max-width: 420px; margin: 3rem auto; }
.pie { margin: 1.2rem 0 0; text-align: center; color: var(--texto-suave); font-size: 0.9rem; }

/* Avisos */
.aviso {
  padding: 0.8rem 1rem;
  margin-bottom: 1.2rem;
  border-radius: 10px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid var(--acento);
}
.aviso-error { background: rgba(239, 68, 68, 0.15); border-color: #ef4444; }

/* Formularios */
.formulario { display: flex; flex-direction: column; gap: 1rem; }
.formulario-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.formulario-grid .btn { grid-column: 1 / -1; }
label { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; color: var(--texto-suave); }
input {
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--borde);
  background: #11111c;
  color: var(--texto);
  font-size: 1rem;
}
input:focus { outline: none; border-color: var(--acento); box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.25); }

.btn {
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(90deg, var(--acento), var(--acento-2));
}
.btn:hover { filter: brightness(1.1); transform: translateY(-1px); }

/* Lista de canciones */
.contador { margin-left: 0.5rem; font-size: 0.8rem; font-weight: 400; color: var(--texto-suave); }
.lista { width: 100%; border-collapse: collapse; }
.lista th {
  text-align: left;
  padding: 0.6rem 0.8rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--texto-suave);
  border-bottom: 1px solid var(--borde);
}
.lista td { padding: 0.75rem 0.8rem; border-bottom: 1px solid rgba(42, 42, 64, 0.5); }
.lista tr:hover td { background: rgba(139, 92, 246, 0.1); }
.lista .titulo { font-weight: 600; }
.chip {
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  background: rgba(236, 72, 153, 0.15);
  color: var(--acento-2);
}

@media (max-width: 600px) {
  .formulario-grid { grid-template-columns: 1fr; }
  .barra { padding: 1rem; }
}</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cómo se conecta el CSS con las pantallas:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><code>templates/base.html</code> es quien <strong>llama</strong> al CSS, con esta línea dentro del <code>&lt;head&gt;</code>: <code>&lt;link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}"&gt;</code>.</li>
        <li><code>registro.html</code>, <code>login.html</code> y <code>dashboard.html</code> empiezan con <code>{% extends "base.html" %}</code>, así que heredan esa línea: las tres pantallas usan el mismo CSS sin repetirla.</li>
        <li>Las <strong>clases</strong> que usa el CSS (<code>class="tarjeta"</code>, <code>class="btn"</code>, <code>class="chip"</code>...) <strong>ya vienen escritas dentro de cada archivo HTML</strong> del paso 2. No tienes que agregarlas ni cambiarlas: solo crear el <code>style.css</code>.</li>
        <li>Si cambias algo en <code>style.css</code>, guarda y recarga la página con <code>Ctrl + F5</code> para que el navegador no use la versión anterior.</li>
      </ul>
    </div>
    <p style="margin-top:1.4rem;"><strong>Paso 4. Ejecuta y prueba</strong></p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ol style="margin:0; padding-left:1.3rem;">
        <li>En la terminal, con el entorno activado <code>(venv)</code>, corre <code>python app.py</code>.</li>
        <li>Abre <code>http://127.0.0.1:5000</code>. Te lleva al login, con el diseño oscuro de streaming, porque aún no has iniciado sesión.</li>
        <li>Entra a <strong>¿No tienes cuenta? Regístrate</strong>, crea una cuenta y comprueba que te devuelve al login con el mensaje <strong>Cuenta creada correctamente</strong>.</li>
        <li>Inicia sesión con una contraseña incorrecta: debe decir <strong>Correo o contraseña incorrectos</strong>. Luego con la correcta: entras a la página con tu nombre.</li>
        <li>Agrega una canción con <code>id_album</code> entre 1 y 10: aparece en la tabla. Si ves un error, revisa la tabla de errores comunes al final.</li>
      </ol>
    </div>
    <p style="margin-top:1.4rem;"><strong>Paso 5. Cómo funciona cada parte</strong></p>
    <p style="margin-top:0.3rem;">Ya la aplicación funciona. Ahora revisa qué hace cada ruta de <code>app.py</code>.</p>
    <p style="margin-top:0.8rem;"><strong>Registro</strong> (<code>/registro</code>):</p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li><code>methods=["GET", "POST"]</code>: la misma dirección sirve para <strong>mostrar</strong> el formulario (GET) y para <strong>recibirlo</strong> (POST).</li>
        <li><code>request.form.get(...)</code> lee lo que el usuario escribió en cada campo.</li>
        <li><code>%s</code> con la tupla aparte: así el correo nunca se pega dentro del SQL (lo que vimos en SQL injection).</li>
        <li><code>generate_password_hash</code>: convierte la contraseña en un hash. En la base de datos <strong>nunca</strong> queda la contraseña real.</li>
        <li><code>conn.commit()</code>: sin esta línea el <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> no se guarda.</li>
        <li><code>finally</code>: cierra el cursor y la conexión pase lo que pase.</li>
      </ul>
    </div>
    <p style="margin-top:0.8rem;"><strong>Inicio de sesión</strong> (<code>/login</code>):</p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li>La consulta busca al usuario <strong>solo por correo</strong>. La contraseña no se compara en SQL: se compara en Python con <code>check_password_hash</code>, porque lo que está guardado es un hash.</li>
        <li><code>fetchone()</code> devuelve una fila o <code>None</code>. Por eso se pregunta <code>if usuario and ...</code>.</li>
        <li><code>session</code> guarda quién inició sesión. Flask la firma con el <code>SECRET_KEY</code> para que nadie pueda falsificarla.</li>
        <li>El mensaje es el mismo si el correo no existe o si la contraseña está mal, para no revelar cuál de los dos falló.</li>
      </ul>
    </div>
    <p style="margin-top:0.8rem;"><strong>Agregar canciones</strong> (<code>/dashboard</code>):</p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li><code>if "usuario_id" not in session</code>: protege la página. Si no hay sesión, redirige al login.</li>
        <li>El <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> usa <code>%s</code> para los cuatro datos del formulario, y <code>reproducciones</code> queda en <code>0</code> fijo: el usuario no puede escribirlo.</li>
        <li><code>except mysql.connector.Error</code>: si escribes un <code>id_album</code> que no existe, MySQL rechaza el <code><span style="color:#a83a3a; font-weight:700;">INSERT</span></code> por la llave foránea y la app muestra el error en vez de caerse.</li>
        <li><code>fetchall()</code> trae todas las filas, y la plantilla las recorre con <code>{% for %}</code>.</li>
      </ul>
    </div>
    <p style="margin-top:1.4rem;"><strong>Paso 6. Verifica en MySQL Workbench</strong></p>
    <p style="margin-top:0.3rem;">Primero, comprueba que el usuario que registraste quedó guardado y que la contraseña es un hash:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">verificar_registro.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> idusuario, nombre, email, <span class="sql-kw-p">LEFT</span>(password_hash, 25) AS hash_inicio
<span class="sql-kw-p">FROM</span> tbl_usuarios
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> idusuario DESC
<span class="sql-kw-p">LIMIT</span> 1;</code></pre>
    </div>
    <p style="margin-top:0.8rem;">Luego agrega una canción desde la aplicación y comprueba que la fila realmente quedó en la base de datos:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">verificar_cancion.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">SELECT</span> id_cancion, titulo, genero, duracion_seg, reproducciones, id_album
<span class="sql-kw-p">FROM</span> tbl_canciones
<span class="sql-kw-p">ORDER</span> <span class="sql-kw-p">BY</span> id_cancion DESC
<span class="sql-kw-p">LIMIT</span> 3;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Agrega una canción con <code>id_album</code> entre 1 y 10: debe aparecer en la tabla de la página y en Workbench.</li>
        <li>Agrega otra con <code>id_album</code> <code>999</code>: la app debe mostrar el error de llave foránea y <strong>no</strong> debe quedar ninguna fila nueva.</li>
      </ul>
    </div>
    <p style="margin-top:1.4rem;"><strong>Paso 7. Prueba que tu aplicación es segura</strong></p>
    <p style="margin-top:0.3rem;">En el formulario de login escribe como correo <code>ana@correo.com' -- </code> (con el espacio al final) y cualquier contraseña.</p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem; border-left:4px solid #6f9d7c;">
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Debe decir <strong>Correo o contraseña incorrectos</strong>. No entra.</li>
        <li>Con <code>%s</code>, esa comilla se trata como un simple carácter del correo, nunca como parte del SQL.</li>
        <li>Compara con <code>vulnerable.py</code>: ahí el mismo texto sí permitiría entrar. La diferencia está en una sola línea.</li>
      </ul>
    </div>
    <p style="margin-top:1.4rem;"><strong>Errores comunes y qué significan</strong></p>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Si ves este error</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Casi siempre es porque</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>ModuleNotFoundError: No module named 'flask'</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">El entorno virtual no está activado, o no corriste <code>pip install -r requirements.txt</code>.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>Access denied for user 'root'</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">La contraseña de <code>DB_PASSWORD</code> en el <code>.env</code> no es la de tu MySQL.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>Can't connect to MySQL server</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">El servidor MySQL no está corriendo, o el host o el puerto del <code>.env</code> están mal.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>Unknown database 'soundflow_db'</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">La base de datos no existe todavía: créala en Workbench con el script de la clase.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">La página se ve sin colores ni estilos</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">La carpeta no se llama <code>static</code>, no está junto a <code>app.py</code>, o el archivo no es <code>style.css</code>. Recarga con Ctrl + F5.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;"><code>TemplateNotFound</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border); vertical-align:top;">La carpeta no se llama <code>templates</code>, o no está junto a <code>app.py</code>.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; vertical-align:top;"><code>Address already in use</code></td><td style="padding:0.4rem 0.7rem; vertical-align:top;">Ya tienes otra app corriendo en el puerto 5000: ciérrala con Ctrl + C.</td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;"><strong>Importante:</strong> <code>app.run(debug=True)</code> es solo para desarrollo en tu computador. Nunca despliegues una aplicación con <code>debug=True</code> en internet.</p>
    </div>
  </div>

  <!-- ===================== 4. DISEÑO DE BD SEGÚN NECESIDADES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>8. Diseño de bases de datos según necesidades</h3>
    </div>
    <p>
      No toda aplicación necesita el mismo tipo de base de datos. Antes de elegir la tecnología y el
      diseño, conviene hacerse varias preguntas:
    </p>
    <ul style="margin:0.6rem 0 0; padding-left:1.2rem; color:var(--text);">
      <li><strong>Volumen de datos:</strong> ¿cientos de filas, o millones?</li>
      <li><strong>Lecturas vs. escrituras:</strong> ¿se lee mucho más de lo que se escribe (como
        reproducir canciones), o al revés?</li>
      <li><strong>Relaciones:</strong> ¿los datos tienen relaciones claras entre entidades (artista, álbum,
        canción), o son más sueltos y variables?</li>
      <li><strong>Consistencia:</strong> ¿un cambio a medias sería inaceptable (una transacción bancaria),
        o se puede tolerar una demora en que todo quede sincronizado?</li>
      <li><strong>Escalabilidad:</strong> ¿bastaría con un servidor más potente, o eventualmente se va a
        necesitar repartir la carga entre varios servidores?</li>
    </ul>
  </div>

  <!-- ===================== QUIZ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Quiz rápido de autoevaluación</h3>
    </div>
    <div class="quiz-box">
      <div class="quiz-question">
        <p>1. ¿Qué hace vulnerable a SQL injection un código como <code>f"...<span style="color:#a83a3a; font-weight:700;">WHERE</span> genero = '{valor}'"</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Que usa comillas simples en vez de dobles</button>
          <button type="button" class="quiz-option" data-correct="true">Que mete el valor del usuario directo en el texto del SQL, sin distinguirlo del código</button>
          <button type="button" class="quiz-option" data-correct="false">Que la consulta usa WHERE en vez de HAVING</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Cómo se evita SQL injection con <code>mysql-connector-python</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Usando siempre f-strings en vez de concatenación con +</button>
          <button type="button" class="quiz-option" data-correct="true">Usando marcadores (%s) y pasando los valores aparte en execute(query, valores)</button>
          <button type="button" class="quiz-option" data-correct="false">Poniendo el password_hash en mayúsculas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. En el ataque con usuario <code>admin' -- </code>, ¿qué logra el <code>--</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Resta uno al id del usuario</button>
          <button type="button" class="quiz-option" data-correct="true">Comenta el resto de la consulta, saltándose la verificación de la contraseña</button>
          <button type="button" class="quiz-option" data-correct="false">Convierte la consulta en un LEFT JOIN</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Qué logran juntos <code><span style="color:#a83a3a; font-weight:700;">START TRANSACTION</span></code> y <code><span style="color:#a83a3a; font-weight:700;">COMMIT</span></code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Agrupar varias sentencias para confirmarlas todas juntas, de forma permanente</button>
          <button type="button" class="quiz-option" data-correct="false">Crear una vista temporal</button>
          <button type="button" class="quiz-option" data-correct="false">Borrar todos los cambios hechos hasta el momento</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué hace <code><span style="color:#a83a3a; font-weight:700;">ROLLBACK</span></code> dentro de una transacción?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Guarda los cambios de forma permanente</button>
          <button type="button" class="quiz-option" data-correct="true">Deshace todos los cambios hechos desde que empezó la transacción</button>
          <button type="button" class="quiz-option" data-correct="false">Borra la tabla completa</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. En un despliegue local, ¿por qué la app Flask y MySQL Workbench se pueden conectar sin configurar nada especial en internet?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Porque los dos corren en el mismo computador (localhost), así que se comunican directo sin salir a la red</button>
          <button type="button" class="quiz-option" data-correct="false">Porque MySQL Workbench sube automáticamente la base de datos a un servidor en la nube</button>
          <button type="button" class="quiz-option" data-correct="false">Porque Flask no necesita conectarse a ninguna base de datos</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Para qué sirven las variables de entorno en un despliegue?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Para que el código corra más rápido</button>
          <button type="button" class="quiz-option" data-correct="true">Para guardar datos de configuración, como credenciales de la base de datos, fuera del código fuente</button>
          <button type="button" class="quiz-option" data-correct="false">Para definir el diseño visual de la aplicación</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. Al diseñar una base de datos, ¿qué factores ayudan a decidir entre un modelo relacional y uno no relacional?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">El volumen de datos, la necesidad de relaciones estrictas y el nivel de consistencia requerido</button>
          <button type="button" class="quiz-option" data-correct="false">El color de la interfaz de la aplicación</button>
          <button type="button" class="quiz-option" data-correct="false">El nombre que le quieras poner a las tablas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. ¿Por qué SoundFlow usa un modelo relacional (MySQL) para artistas, álbumes y canciones?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque es la única tecnología que existe</button>
          <button type="button" class="quiz-option" data-correct="true">Porque tiene relaciones claras entre tablas y necesita integridad referencial (FOREIGN KEY)</button>
          <button type="button" class="quiz-option" data-correct="false">Porque MySQL es gratis y las demás no</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. ¿Qué principio de seguridad conecta las consultas parametrizadas, la vista_usuarios_publica de la sección de Vistas y las variables de entorno del despliegue?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">No exponer datos ni credenciales sensibles más de lo estrictamente necesario</button>
          <button type="button" class="quiz-option" data-correct="false">Usar siempre el mismo nombre de usuario en todos lados</button>
          <button type="button" class="quiz-option" data-correct="false">Desactivar todas las contraseñas para simplificar el acceso</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>11. ¿Cuál es la diferencia principal entre una vista de solo lectura y una tabla real?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">La vista no guarda datos propios: cada consulta vuelve a ejecutar el SELECT de adentro contra las tablas reales</button>
          <button type="button" class="quiz-option" data-correct="false">La vista es siempre más rápida que cualquier tabla</button>
          <button type="button" class="quiz-option" data-correct="false">La vista solo puede tener una columna</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>12. ¿Cuál es la diferencia principal entre un procedimiento y una función almacenada?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">No hay ninguna diferencia real</button>
          <button type="button" class="quiz-option" data-correct="true">La función siempre devuelve un valor y se puede usar dentro de un SELECT; el procedimiento no</button>
          <button type="button" class="quiz-option" data-correct="false">Las funciones no pueden recibir parámetros</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>13. Dentro de un trigger <code><span style="color:#a83a3a; font-weight:700;">AFTER INSERT</span></code>, ¿qué representa <code><span style="color:#a83a3a; font-weight:700;">NEW</span>.id_cancion</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">El id_cancion más alto de toda la tabla</button>
          <button type="button" class="quiz-option" data-correct="true">El valor de id_cancion en la fila que se acaba de insertar</button>
          <button type="button" class="quiz-option" data-correct="false">Una variable que hay que declarar antes</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

    </div>
  </div>

  <!-- ===================== PRÁCTICA GUIADA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Práctica: conexión segura, transacciones y despliegue</h3>
    </div>
    <p>
      Con lo visto en esta clase, resuelve cada uno de estos casos sobre <code>soundflow_db</code>. No se
      incluyen las respuestas: la idea es que practiques y las corras tú mismo.
    </p>

    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#6f9d7c;">Fáciles</h4>
      <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Escribe en Python un fragmento vulnerable a SQL injection sobre <code>soundflow_db</code>, y
          explica con un ejemplo concreto cómo alguien podría explotarlo.</li>
        <li>Reescribe ese mismo fragmento usando parámetros (<code>%s</code>) para que sea seguro.</li>
        <li>Envuelve en una transacción la inserción de un nuevo usuario y su primera reproducción: si la
          reproducción falla, el usuario tampoco debe quedar guardado.</li>
        <li>Lista las variables de entorno que necesitarías configurar para desplegar una aplicación que
          use <code>soundflow_db</code> (sin escribir valores reales, solo los nombres).</li>
      </ol>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">Mediana complejidad</h4>
      <ol start="5" style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Con tu aplicación de la sección 7 funcionando, verifica en MySQL Workbench que el registro de un usuario nuevo y una canción nueva quedaron guardados correctamente.</li>
        <li>Diseña, en un diagrama, cómo cambiaría el esquema de <code>soundflow_db</code> si además
          quisieras registrar en tiempo real cada "me gusta" que un usuario le da a una canción, sin afectar
          el rendimiento de las consultas actuales.</li>
        <li>Explica con tus palabras por qué una aplicación bancaria necesitaría transacciones más estrictas
          que SoundFlow.</li>
        <li>Escribe el código Python (usando parámetros seguros) que invoque el procedimiento
          <code style="color:#a83a3a; font-weight:700;">sp_registrar_reproduccion</code> de la sección de Procedimientos almacenados desde una aplicación.</li>
      </ol>

    </div>
  </div>

  <!-- ===================== PRÁCTICA GUIADA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Práctica: vistas, procedimientos y triggers</h3>
    </div>
    <p>
      Con lo visto sobre vistas, procedimientos y triggers, resuelve estos casos sobre <code>soundflow_db</code>. No se incluyen las respuestas: la
      idea es que practiques y las corras tú mismo en tu DBMS.
    </p>

    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#6f9d7c;">Fáciles</h4>
      <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Crea una vista <code>vista_canciones_pop</code> que solo muestre las canciones de género "Pop".</li>
      </ol>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">Mediana complejidad</h4>
      <ol start="2" style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Crea un procedimiento <code>sp_contar_canciones_por_genero(p_genero)</code> que reciba un
          género por parámetro y muestre cuántas canciones hay de ese género.</li>
        <li>Crea un trigger <code><span style="color:#a83a3a; font-weight:700;">BEFORE INSERT</span></code> sobre <code>tbl_canciones</code> que impida insertar
          una canción con <code>duracion_seg</code> negativa o en cero (usa <code><span style="color:#a83a3a; font-weight:700;">SIGNAL</span></code> para
          lanzar un error).</li>
      </ol>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="font-size:0.85rem; color:var(--text-dim);">
      · MySQL 8.0 Reference Manual, CREATE VIEW Statement. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, CREATE PROCEDURE and CREATE FUNCTION Statements. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, Triggers Syntax. dev.mysql.com<br>
      · OWASP, SQL Injection. owasp.org<br>
      · MySQL Connector/Python Developer Guide. dev.mysql.com<br>
      · PyMySQL Documentation. pymysql.readthedocs.io<br>
      · MySQL 8.0 Reference Manual, START TRANSACTION, COMMIT, and ROLLBACK Statements. dev.mysql.com<br>
      · Flask Documentation. flask.palletsprojects.com<br>
      · python-dotenv Documentation. pypi.org/project/python-dotenv<br>
      · Werkzeug Security (generate_password_hash / check_password_hash). werkzeug.palletsprojects.com<br>
      · MySQL 8.0 Reference Manual, JOIN Clause. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, UNION Clause. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, Subqueries. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, Optimization and Indexes. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, mysqldump. dev.mysql.com
    </p>
  </div>

`;
