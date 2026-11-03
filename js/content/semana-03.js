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
      Comparándolo con lo que aprendimos la semana pasada: <code>SELECT</code>, <code>WHERE</code>,
      <code>ORDER BY</code>, <code>LIKE</code> y las funciones de agregación trabajaban sobre
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
      <code>INNER JOIN</code> combina dos o más tablas y devuelve <strong>solo las filas donde hay
      coincidencia en todas ellas</strong>, según la condición que definas con <code>ON</code>. Si una fila
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
      álbum válido (la FK es <code>NOT NULL</code>), este <code>INNER JOIN</code> no pierde ninguna fila:
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
      artista. Para eso encadenamos un segundo <code>INNER JOIN</code>, uno detrás del otro.
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
      <code>LEFT JOIN</code> (o <code>LEFT OUTER JOIN</code>) devuelve <strong>todas las filas de la tabla
      izquierda</strong>, tengan o no coincidencia en la derecha. Cuando no hay coincidencia, las columnas de
      la tabla derecha quedan en <code>NULL</code>.
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
      nada, y su fila queda con <code>NULL</code> en las columnas de <code>tbl_reproducciones</code>.
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
        <li>La condición del <code>ON</code> es la misma línea del diagrama: <code><span style="color:#4a7c9e; font-weight:700;">u.idusuario</span> = <span style="color:#c9714e; font-weight:700;">r.id_usuario</span></code>.</li>
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
        El uso más común de <code>LEFT JOIN</code> en la práctica es justo este: encontrar los
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
        quedan con <code>NULL</code> ahí.
      </p>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Cuándo usar LEFT JOIN?</strong> Cuando quieres conservar todos los registros de la tabla
        de la izquierda, tengan o no pareja en la derecha, típicamente para encontrar los "huérfanos" del
        lado izquierdo (usuarios sin reproducciones, álbumes sin canciones). Esas filas huérfanas quedan con
        <code>NULL</code> en las columnas de la tabla de la derecha, porque no hay ninguna fila de esa tabla
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
      <code>RIGHT JOIN</code> (o <code>RIGHT OUTER JOIN</code>) es el espejo exacto de <code>LEFT JOIN</code>:
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
        De dónde sale cada columna y qué conserva el <code>RIGHT JOIN</code>:
      </p>
      <ul style="margin:0.3rem 0 0; padding-left:1.2rem;">
        <li><code style="color:#8aae3f; font-weight:700;">al.titulo_album</code> sale de <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code>.</li>
        <li><code style="color:#5b9aa0; font-weight:700;">c.titulo</code> sale de <code style="color:#5b9aa0; font-weight:700;">tbl_canciones</code>.</li>
        <li>Aquí <code style="color:#8aae3f; font-weight:700;">tbl_albumes</code> es la tabla "derecha", así que <code>RIGHT JOIN</code> conserva sus 10 filas completas, tengan o no canciones.</li>
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
          quedan con <code>NULL</code> en <code>titulo</code>. Este resultado sí es distinto al que
          obtendrías con <code>LEFT JOIN tbl_canciones c LEFT JOIN tbl_albumes al</code> en ese orden (ese
          left join, con las tablas en ese orden, solo traería las 10 canciones, sin los álbumes vacíos).
        </p>
      </div>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Cuándo usar RIGHT JOIN?</strong> Cuando quieres conservar todos los registros de la tabla
        de la derecha, tengan o no pareja en la izquierda, típicamente para encontrar los "huérfanos" del
        lado derecho (álbumes sin canciones, en nuestro ejemplo). Esas filas huérfanas quedan con
        <code>NULL</code> en las columnas de la tabla de la izquierda, porque no hay ninguna fila de esa
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
      <code>FULL OUTER JOIN</code> devuelve <strong>todas las filas de ambas tablas</strong>, coincidan o no,
      con <code>NULL</code> en el lado que le falte a cada una.
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
        <code>FULL OUTER JOIN</code></strong> como palabra clave (a diferencia de PostgreSQL o SQL Server).
        Para simularlo, se combina un <code>LEFT JOIN</code> con un <code>RIGHT JOIN</code> usando
        <code>UNION</code>.
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
        En este caso puntual, el resultado es <strong>idéntico</strong> al del <code>LEFT JOIN</code> que ya
        vimos (11 filas): como <code>id_usuario</code> en <code>tbl_reproducciones</code> es
        <code>NOT NULL</code> y tiene una FK obligatoria hacia <code>tbl_usuarios</code>, nunca puede existir
        una reproducción "huérfana" del lado derecho. Cuando las llaves foráneas están bien diseñadas, el
        <code>RIGHT JOIN</code> no aporta filas nuevas. Aun así, aprende la sintaxis: la vas a necesitar en
        esquemas menos restringidos, o en otros motores donde sí exista <code>FULL OUTER JOIN</code>
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
      <code>CROSS JOIN</code> no compara nada: combina <strong>cada fila de una tabla con cada fila de la
      otra</strong> (producto cartesiano), sin condición <code>ON</code>. Si A tiene <em>n</em> filas y B
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
        <li>Como no hay ningún <code>ON</code>, MySQL no compara nada: simplemente empareja cada artista con cada usuario, sin importar si esa combinación significa algo.</li>
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
        <strong>Cuidado:</strong> <code>CROSS JOIN</code> crece muy rápido. Con dos tablas de 1.000 filas
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
        <code>CROSS JOIN</code> una tabla con las <code>12 meses &times; 3 géneros = 36</code> combinaciones
        posibles, y después se hace un <code>LEFT JOIN</code> de esa tabla completa contra las
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
      <code>JOIN</code> combina columnas de dos tablas <strong>lado a lado</strong>. <code>UNION</code> hace
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
          <code>UNION</code> compara la <strong>fila completa</strong>, no solo una columna: como las 5 filas
          de la segunda consulta son idénticas, campo por campo, a 5 filas que ya estaban en la primera,
          <code>UNION</code> las reconoce como duplicadas exactas y las elimina, dejando 8 filas en vez de
          13.
        </p>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Regla práctica: si sabes de antemano que tus dos consultas <strong>nunca</strong> van a devolver
        filas repetidas entre sí (por ejemplo, nombres de artistas y nombres de usuarios, que nunca
        coinciden), usa
        <code>UNION ALL</code>: da el mismo resultado que <code>UNION</code> pero sin el costo de comparar
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
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>INNER JOIN</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Solo las filas con coincidencia en ambas tablas</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Solo te interesan registros completos, con pareja confirmada (canción con su álbum)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>LEFT JOIN</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todo A, con NULL donde falte B</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Necesitas conservar todos los registros de una tabla, tengan o no relación (encontrar huérfanos)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>RIGHT JOIN</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todo B, con NULL donde falte A</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Poco usado en la práctica; casi siempre se reescribe como LEFT JOIN</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>FULL OUTER JOIN</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todo A y todo B, con NULL donde falte</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Necesitas ver huérfanos de ambos lados a la vez (no nativo en MySQL)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>CROSS JOIN</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Todas las combinaciones posibles</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Necesitas generar una matriz de combinaciones (reportes), no para consultas normales de negocio</td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:1rem; font-size:0.88rem;">
      <p style="margin:0 0 0.5rem;"><strong>Conclusión: la tabla de la izquierda y la de la derecha</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Izquierda</strong> es la tabla que escribes primero, después de <code>FROM</code>. <strong>Derecha</strong> es la que escribes después de <code>JOIN</code>. Tú decides cuál es cuál; no hay una tabla que sea "A" por naturaleza.</li>
        <li>En <code>INNER JOIN</code>, <code>FULL OUTER JOIN</code> y <code>CROSS JOIN</code> el orden no cambia el resultado.</li>
        <li>En <code>LEFT JOIN</code> y <code>RIGHT JOIN</code> el orden sí importa: <code>A RIGHT JOIN B</code> equivale a <code>B LEFT JOIN A</code>. Por eso se suele usar solo LEFT y reordenar las tablas.</li>
        <li>Para elegir la izquierda pregúntate: "¿de qué tabla quiero ver todas las filas, aunque no tengan pareja?". Esa va a la izquierda en un LEFT JOIN.</li>
        <li>Sí hay que conocer la base de datos: qué tablas y columnas existen, y qué llave foránea apunta a qué llave primaria, porque eso es lo que se escribe en el <code>ON</code>. Por eso el diagrama del modelo es la herramienta de trabajo.</li>
      </ul>
    </div>
  </div>

  <!-- ===================== 9. SUBCONSULTAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>8. Subconsultas (subqueries)</h3>
    </div>
    <p>
      Una <strong>subconsulta</strong> es un <code>SELECT</code> metido dentro de otra consulta. Se puede
      usar en tres lugares distintos, y cada uno resuelve un problema diferente.
    </p>

    <p style="margin-top:1rem;"><strong>1. Subconsulta en <code>WHERE</code>:</strong> Se usa cuando necesitas filtrar con un dato que aún no tienes. La subconsulta devuelve un valor o una lista de valores, y la consulta de afuera los usa como condición. Cuando devuelve <strong>varios</strong> valores se usa <code>IN</code>. Idea: "primero averiguo el dato, luego filtro con él". Ejemplo: canciones que pertenecen a álbumes lanzados antes de 1995.</p>
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
        La subconsulta <code>(SELECT id_album FROM tbl_albumes WHERE anio_lanzamiento &lt; 1995)</code> se
        ejecuta primero y devuelve varios valores: los álbumes 4, 7, 8 y 10 (los únicos con
        <code>anio_lanzamiento</code> menor a 1995). El <code>WHERE ... IN</code> de afuera se queda con las
        canciones cuyo <code>id_album</code> esté entre esos valores. Como <code>tbl_canciones</code> solo
        usa los álbumes 1 a 4, y de esos solo el álbum 4 aparece en la lista, el resultado son las 2
        canciones de ese álbum: "Oye Mi Amor" y "Rayando el Sol".
      </p>
    </div>

    <p style="margin-top:1rem;">Segundo ejemplo, con un solo valor de retorno (por eso no hace falta
    <code>IN</code>, basta un operador de comparación): canciones con más reproducciones que el promedio
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

    <p style="margin-top:1rem;"><strong>2. Subconsulta en <code>SELECT</code>:</strong> Se usa cuando necesitas un dato extra en cada fila del resultado. La subconsulta devuelve <strong>un solo valor por fila</strong> y aparece como una columna más; casi siempre referencia la fila externa (esto se llama <strong>subconsulta correlacionada</strong>). Idea: "a cada fila le pego un cálculo propio". Ejemplo: cada canción, junto con cuántas veces aparece en el log de reproducciones:</p>
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
        <li>Cuando ya se resolvió para las 10 canciones, <code>ORDER BY c.titulo</code> ordena todo el resultado alfabéticamente.</li>
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
          Fíjate en Sofía Herrera: con <code>LEFT JOIN</code> (Sección 2) su fila quedaba con
          <code>NULL</code> en <code>id_cancion</code>, porque no había ninguna reproducción que unir. Acá,
          con <code>COUNT(*)</code> en una subconsulta correlacionada, el resultado es <code>0</code>, no
          <code>NULL</code>: <code>COUNT</code> siempre devuelve un número, incluso cuando cuenta cero filas.
        </p>
      </div>
    </div>

    <p style="margin-top:1rem;"><strong>3. Subconsulta en <code>FROM</code>:</strong> Se usa cuando necesitas consultar una tabla que primero hay que construir. El resultado de la subconsulta funciona como una tabla temporal y debe llevar alias. Idea: "primero armo una tabla resumen, luego la consulto". Por ejemplo, cuántas canciones tiene cada álbum, filtrando después solo los álbumes con 3 o más:</p>
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
          Temblor) y álbum 4 tiene 2. El <code>WHERE cantidad_canciones &gt;= 3</code> de afuera solo deja pasar los
          álbumes 1 y 3.
        </p>
      </div>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cómo se resuelve, paso a paso:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li>MySQL ejecuta <strong>primero la subconsulta de adentro</strong>, completa y una sola vez. No depende de ninguna fila de la consulta de afuera.</li>
        <li>Con su resultado arma una <strong>tabla temporal</strong> en memoria, a la que se le pone el alias <code>canciones_por_album</code>.</li>
        <li>La consulta de afuera toma esa tabla temporal como si fuera una tabla normal y le aplica el <code>WHERE cantidad_canciones &gt;= 3</code>.</li>
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
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>WHERE</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Un solo valor (con <code>=</code>, <code>&gt;</code>, <code>&lt;</code>) o varios valores (con <code>IN</code>)</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Filtrar filas comparándolas contra ese resultado; no aparece como columna en el resultado final</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>WHERE id_album IN (SELECT id_album FROM tbl_albumes WHERE anio_lanzamiento &lt; 1995)</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>SELECT</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Un solo valor por cada fila de la consulta externa</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Agregar una columna calculada; casi siempre correlacionada (se repite fila por fila)</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>(SELECT COUNT(*) FROM tbl_reproducciones r WHERE r.id_cancion = c.id_cancion) AS veces_en_el_log</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem;"><code>FROM</code></td><td style="padding:0.4rem 0.7rem;">Una tabla temporal completa (varias columnas y filas)</td><td style="padding:0.4rem 0.7rem;">Tratarla como si fuera una tabla real, para agrupar o calcular algo primero y filtrar o seleccionar después; necesita alias obligatorio</td><td style="padding:0.4rem 0.7rem;"><code>FROM (SELECT id_album, COUNT(*) AS cantidad_canciones FROM tbl_canciones GROUP BY id_album) AS canciones_por_album</code></td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:1rem; font-size:0.88rem;">
      <p style="margin:0;"><strong>Truco para decidir:</strong> si la pregunta dice "que sean mayores que / que estén en", va en <code>WHERE</code>; si dice "junto con cuántos / el total de", va en <code>SELECT</code>; si dice "de los que ya agrupé / sobre el resumen de", va en <code>FROM</code>.</p>
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
        <strong>No son gratis:</strong> un índice acelera las lecturas (<code>SELECT</code>), pero hace un
        poco más lentas las escrituras (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>),
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
        <li>Con <code>WHERE genero = 'Pop'</code>, la búsqueda empieza en la <strong>raíz</strong> del árbol y compara.</li>
        <li>En cada nivel baja solo por la rama correcta y <strong>descarta todas las demás</strong>, como en un árbol de búsqueda binaria.</li>
        <li>Al llegar a la <strong>hoja</strong> donde está <code>'Pop'</code>, MySQL salta directo a esas filas de la tabla, sin revisar las demás.</li>
      </ol>
      <p style="margin:0.6rem 0 0.3rem;"><strong>Por qué importa:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Sin índice</strong> la búsqueda recorre fila por fila, como un arreglo desordenado: O(n).</li>
        <li><strong>Con índice</strong> baja por el árbol: O(log n). Con millones de filas son 3 o 4 pasos en vez de millones.</li>
        <li>Las hojas del árbol están <strong>enlazadas entre sí</strong>, como una lista enlazada. Por eso los rangos y el <code>ORDER BY</code> también son rápidos: se recorren las hojas una tras otra.</li>
        <li>Por eso escribir cuesta más: cada <code>INSERT</code> debe acomodar el nuevo valor en su lugar dentro del árbol.</li>
      </ul>
    </div>
  </div>

  <!-- ===================== 11. VISTAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>10. Vistas (VIEWS)</h3>
    </div>
    <p>
      Una <strong>vista</strong> es una consulta <code>SELECT</code> guardada bajo un nombre, que se comporta
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
    <code>INNER JOIN</code> de canción + álbum + artista que ya escribimos arriba es perfecto para guardar
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
        <li><strong>Solo <code>SELECT</code>:</strong> puede leer, pero no <code>INSERT</code>, <code>UPDATE</code> ni <code>DELETE</code>. No puede cambiar ni borrar datos, ni por error ni a propósito.</li>
        <li><strong>Sin ver la consulta interna:</strong> al no tener el permiso <code>SHOW VIEW</code>, no puede leer cómo está escrita la vista. Solo ve las columnas que devuelve.</li>
        <li><strong>Menos daño si algo sale mal:</strong> si su clave se filtra o comete un error, lo máximo que se expone es lo que la vista deja ver.</li>
        <li><strong>Se puede retirar cuando ya no haga falta:</strong> <code>REVOKE SELECT ON soundflow_db.vista_usuarios_publica FROM 'analista'@'localhost';</code></li>
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
    <p style="margin-top:1rem;"><strong>Paso 2.</strong> Ejecuta los pasos 1 y 2 del bloque anterior (<code>19b_usuario_vista.sql</code>): el <code>CREATE USER</code> y el <code>GRANT</code>. Cambia la clave por la que prefieras.</p>
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
      <p style="margin:0;">Debe aparecer un único permiso: <code>GRANT SELECT ON soundflow_db.vista_usuarios_publica</code>. Si aparecen más, el usuario tiene más acceso del que debería.</p>
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
      <p style="margin:0;">Si <code>CREATE USER</code> da error de permisos, es porque tu conexión no es <code>root</code> ni tiene el privilegio <code>CREATE USER</code>.</p>
    </div>
  </div>

  <!-- ===================== 12. TRIGGERS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>11. Disparadores (TRIGGERS)</h3>
    </div>
    <p>
      Un <strong>trigger</strong> (disparador) es código SQL que la base de datos ejecuta
      <strong>automáticamente</strong> cuando ocurre un evento en una tabla: un <code>INSERT</code>, un
      <code>UPDATE</code> o un <code>DELETE</code>. Nadie lo llama; se dispara solo.
    </p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Para qué sirven en concreto:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li><strong>Mantener datos derivados al día.</strong> En soundflow_db, cada vez que se inserta una reproducción, el trigger le suma 1 al contador de esa canción en <code>tbl_canciones</code>. Nadie se acuerda de actualizarlo a mano.</li>
        <li><strong>Auditoría (historial de cambios).</strong> Guardar quién cambió qué y cuándo. Por ejemplo, copiar la fila anterior a una tabla <code>log_cambios</code> antes de cada <code>UPDATE</code> o <code>DELETE</code>.</li>
        <li><strong>Validar o corregir datos antes de guardarlos.</strong> Con un trigger <code>BEFORE INSERT</code> puedes rechazar un valor inválido (un precio negativo) o limpiar uno (pasar el correo a minúsculas).</li>
        <li><strong>Reglas de negocio automáticas.</strong> Por ejemplo, impedir borrar un artista con álbumes, o marcar un pago como vencido cuando cambia una fecha.</li>
        <li><strong>Mantener copias o resúmenes sincronizados.</strong> Actualizar una tabla de totales o de estadísticas cuando cambia la tabla original.</li>
      </ol>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuándo se dispara:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><code>BEFORE</code>: antes de <code>INSERT</code>, <code>UPDATE</code> o <code>DELETE</code>. Sirve para validar o modificar el dato.</li>
        <li><code>AFTER</code>: después del cambio. Sirve para actualizar otras tablas o guardar el historial.</li>
        <li>Dentro del trigger puedes usar <code>NEW.columna</code> (el valor nuevo) y <code>OLD.columna</code> (el valor anterior).</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>La diferencia con un procedimiento:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>El <strong>procedimiento</strong> se ejecuta cuando alguien lo llama con <code>CALL</code>.</li>
        <li>El <strong>trigger</strong> se ejecuta solo, cuando ocurre el evento. Quien hace el <code>INSERT</code> ni siquiera sabe que existe.</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuidados:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Son "invisibles": si algo cambia inesperadamente en una tabla, el culpable puede ser un trigger que nadie recuerda.</li>
        <li>Hacen más lenta cada escritura.</li>
        <li>Los triggers que modifican otras tablas pueden encadenarse con otros triggers y volverse difíciles de seguir.</li>
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
        <li>Decide la tabla que vigila, el evento (<code>INSERT</code>, <code>UPDATE</code> o <code>DELETE</code>) y si corre antes (<code>BEFORE</code>) o después (<code>AFTER</code>).</li>
        <li>Escribe qué debe hacer, usando <code>NEW</code> y <code>OLD</code> si necesitas los valores de la fila.</li>
        <li>Ejecuta el bloque completo en Workbench, incluido el <code>DELIMITER</code>.</li>
        <li>Compruébalo con <code>SHOW TRIGGERS;</code> y pruébalo haciendo un <code>INSERT</code>, <code>UPDATE</code> o <code>DELETE</code>.</li>
        <li>Si ya no lo necesitas, bórralo con <code>DROP TRIGGER IF EXISTS nombre_trigger;</code></li>
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
        <li><code>DELIMITER //</code>: cambia temporalmente el símbolo que cierra una sentencia, de <code>;</code> a <code>//</code>. Así MySQL no corta el trigger en el primer <code>;</code> que aparece dentro.</li>
        <li><code>CREATE TRIGGER trg_after_insert_reproduccion</code>: crea el trigger y le pone nombre. El patrón <code>trg_momento_evento_tabla</code> ayuda a reconocerlo después.</li>
        <li><code>AFTER INSERT ON tbl_reproducciones</code>: define cuándo se dispara. Aquí, <strong>después de</strong> insertar una fila en <code>tbl_reproducciones</code>.</li>
        <li><code>FOR EACH ROW</code>: se ejecuta una vez por cada fila afectada. Si un <code>INSERT</code> agrega 3 filas, el trigger corre 3 veces. En MySQL es obligatorio.</li>
        <li><code>BEGIN</code>: abre el cuerpo del trigger, lo que va a hacer.</li>
        <li><code>UPDATE tbl_canciones</code>: el trigger actualiza otra tabla, la de canciones.</li>
        <li><code>SET reproducciones = reproducciones + 1</code>: le suma 1 al contador actual.</li>
        <li><code>WHERE id_cancion = NEW.id_cancion;</code>: limita el cambio a la canción que se reprodujo. <code>NEW.id_cancion</code> es el <code>id_cancion</code> de la fila recién insertada. Sin este <code>WHERE</code> se actualizarían todas las canciones.</li>
        <li><code>END //</code>: cierra el cuerpo del trigger. Usa <code>//</code> porque es el delimitador temporal que definimos.</li>
        <li><code>DELIMITER ;</code>: devuelve el delimitador normal.</li>
      </ol>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code>NEW</code> es una palabra especial que solo existe dentro de triggers: representa la fila que
        se acaba de insertar (o actualizar). <code>NEW.id_cancion</code> es el valor de esa columna en la
        fila nueva. Este trigger queda <strong>activo desde ya</strong>: en la siguiente sección vas a crear
        el procedimiento <code>sp_registrar_reproduccion</code>, y cuando lo llames, cada <code>INSERT</code>
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
      <h3>12. Procedimientos almacenados (STORED PROCEDURES)</h3>
    </div>
    <p>
      Un <strong>procedimiento almacenado</strong> es un bloque de código SQL guardado en la base de datos,
      con un nombre, que <strong>se ejecuta cuando alguien lo llama</strong> con <code>CALL</code>. Puede
      contener cualquier combinación de sentencias: <code>INSERT</code>, <code>UPDATE</code>,
      <code>DELETE</code>, <code>SELECT</code>, variables, condicionales (<code>IF</code>), bucles, y hasta
      llamar a otros procedimientos. Se define con <code>CREATE PROCEDURE</code> y admite parámetros de
      entrada y/o salida.
    </p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cuándo usarlos:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li><strong>Tareas de varios pasos que van juntas:</strong> <code>sp_registrar_reproduccion</code> valida, inserta y deja que el trigger actualice el contador, todo con un solo <code>CALL</code>.</li>
        <li><strong>Lógica que se repite en varios sistemas:</strong> web, app y reportes llaman al mismo procedimiento.</li>
        <li><strong>Validar antes de escribir y operaciones "todo o nada":</strong> con <code>IF</code> y transacciones, si algo falla no se guarda nada.</li>
        <li><strong>Mantenimiento y procesos por lotes:</strong> limpiar registros viejos o recalcular totales.</li>
        <li><strong>Controlar el acceso:</strong> un usuario puede ejecutar el procedimiento (<code>EXECUTE</code>) sin tocar las tablas.</li>
      </ol>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Por qué conviene:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Reutilización:</strong> se escribe una vez y se llama muchas veces.</li>
        <li><strong>Consistencia:</strong> todos los sistemas aplican las mismas reglas. Si cambia la regla, se corrige en un solo lugar.</li>
        <li><strong>Menos tráfico:</strong> la aplicación envía un solo <code>CALL</code> en vez de varias consultas.</li>
        <li><strong>Seguridad:</strong> los usuarios ejecutan la operación sin tocar las tablas. También ayuda contra la inyección SQL, porque los parámetros no se mezclan con el código.</li>
        <li><strong>Mantenimiento:</strong> la lógica queda cerca de los datos, no repartida entre aplicaciones.</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuándo no conviene:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>Si la lógica es muy compleja o cambia mucho, suele ser más fácil de probar y versionar en el código de la aplicación.</li>
        <li>Son más difíciles de depurar que el código normal.</li>
        <li>Atan la lógica al motor de base de datos: si cambias de MySQL a otro motor, hay que reescribirlos.</li>
      </ul>
      <p style="margin:0.7rem 0 0;"><strong>En una frase:</strong> un procedimiento es una receta guardada con nombre: en vez de repetir los pasos cada vez, la llamas con <code>CALL</code> y la base de datos los ejecuta todos.</p>
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
        <li>Decide qué tarea va a hacer y qué datos necesita. Los de entrada se declaran con <code>IN</code> y los de salida con <code>OUT</code>.</li>
        <li>Escribe el cuerpo entre <code>BEGIN</code> y <code>END</code>: las sentencias, los <code>IF</code> y las validaciones que necesites.</li>
        <li>Ejecuta el bloque completo en una pestaña SQL de Workbench, incluido el <code>DELIMITER</code>.</li>
        <li>Compruébalo con <code>SHOW PROCEDURE STATUS WHERE Db = 'soundflow_db';</code> y pruébalo con <code>CALL</code>.</li>
        <li>Si ya no lo necesitas, bórralo con <code>DROP PROCEDURE IF EXISTS nombre_procedimiento;</code></li>
      </ol>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: registrar una reproducción, pero solo si el usuario y la canción realmente existen (usando
      <code>IF</code> para controlar el flujo, y <code>EXISTS</code> para validar que los campos sí existan
      antes de hacer la inserción).
    </p>
    <p style="margin-top:1rem;"><strong>Cómo crearlo en Workbench (clic derecho).</strong> El editor ya maneja el delimitador por ti, así que el código va sin <code>DELIMITER</code>:</p>
    <div class="content-box" style="margin-top:0.6rem; font-size:0.88rem;">
      <ol style="margin:0; padding-left:1.3rem;">
        <li>En el panel izquierdo (Navigator), abre <code>soundflow_db</code>.</li>
        <li>Clic derecho sobre <strong>Stored Procedures</strong> y elige <strong>Create Stored Procedure...</strong></li>
        <li>Borra la plantilla y pega el código de abajo.</li>
        <li>Pulsa <strong>Apply</strong>, revisa el script que muestra, vuelve a pulsar <strong>Apply</strong> y luego <strong>Finish</strong>.</li>
        <li>Para ejecutarlo, abre una pestaña SQL y corre el <code>CALL</code>.</li>
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
        registrada (la encontramos con <code>LEFT JOIN</code>). Y "Mi Tierra" (canción 103) era la única
        canción que nunca aparecía en <code>tbl_reproducciones</code> (la vimos en el ejemplo de
        <code>UNION</code>). Este <code>CALL</code> resuelve ambas cosas a la vez: Sofía reproduce, por fin,
        "Mi Tierra".
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Y como el trigger <code>trg_after_insert_reproduccion</code> ya está activo (lo creaste arriba),
        este mismo <code>CALL</code> también lo dispara: el contador <code>reproducciones</code> de "Mi
        Tierra" pasa de <code>3.200.000</code> a <code>3.200.001</code>, sin que este procedimiento tenga
        que saber que ese trigger existe.
      </p>
    </div>
    <p style="margin-top:1.2rem;"><strong>Comparando antes y después de la ejecución.</strong> Para comprobar que el trigger se disparó, mira el contador de la canción antes y después del <code>CALL</code>:</p>
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
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Antes del <code>CALL</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>3200000</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Valor inicial.</td></tr>
          <tr><td style="padding:0.4rem 0.7rem;">Después del <code>CALL</code></td><td style="padding:0.4rem 0.7rem;"><code>3200001</code></td><td style="padding:0.4rem 0.7rem;">El procedimiento hizo el <code>INSERT</code> y el trigger sumó 1 por su cuenta.</td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0;">Si el valor sube en 1, el trigger funcionó. Si no cambia, revisa que el trigger exista con <code>SHOW TRIGGERS;</code> y que el procedimiento no haya devuelto el mensaje "Usuario o canción no existen". Si ya habías ejecutado el <code>CALL</code> antes, compara siempre con el valor justo antes de la nueva ejecución.</p>
    </div>
  </div>

  <!-- ===================== 14. FUNCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>13. Funciones almacenadas (STORED FUNCTIONS)</h3>
    </div>
    <p>
      Una <strong>función almacenada</strong> es un bloque de código guardado en la base de datos que
      <strong>calcula y devuelve un valor</strong>, y se usa <strong>dentro de una consulta</strong>, igual
      que <code>COUNT()</code>, <code>UPPER()</code> o <code>NOW()</code>. Se define con
      <code>CREATE FUNCTION</code> y no se ejecuta con <code>CALL</code>.
    </p>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cuándo usarlas:</strong></p>
      <ol style="margin:0; padding-left:1.3rem;">
        <li><strong>Un cálculo que repites en muchas consultas:</strong> <code>fn_total_reproducciones(id_cancion)</code> cuenta cuántas veces se reprodujo una canción. En vez de repetir la subconsulta, la llamas con el id.</li>
        <li><strong>Dar formato o limpiar valores:</strong> convertir una duración en segundos a <code>mm:ss</code>, o armar un nombre completo.</li>
        <li><strong>Reglas de cálculo del negocio:</strong> un descuento, un impuesto, la edad a partir de una fecha. Así todos los reportes calculan lo mismo.</li>
        <li><strong>Usar el resultado en <code>SELECT</code>, <code>WHERE</code> u <code>ORDER BY</code>:</strong> eso un procedimiento no lo permite.</li>
      </ol>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Por qué conviene:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Reutilización:</strong> se escribe una vez y se usa en cualquier consulta.</li>
        <li><strong>Consistencia:</strong> todos calculan igual. Si cambia la regla, se corrige en un solo lugar.</li>
        <li><strong>Consultas más cortas:</strong> el <code>SELECT</code> queda legible, sin subconsultas repetidas.</li>
      </ul>
      <p style="margin:0.7rem 0 0.3rem;"><strong>Cuándo no conviene:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li>En tablas muy grandes: una función que consulta otra tabla se ejecuta por <strong>cada fila</strong> y puede volver lenta la consulta.</li>
        <li>Para operaciones que modifican datos (<code>INSERT</code>, <code>UPDATE</code>): para eso están los procedimientos.</li>
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
        <li>Decide qué va a calcular, qué datos recibe y de qué tipo es el valor que devuelve (<code>RETURNS</code>).</li>
        <li>Escribe el cuerpo entre <code>BEGIN</code> y <code>END</code>. Siempre debe terminar con un <code>RETURN</code> que entregue el valor.</li>
        <li>Agrega <code>DETERMINISTIC</code> si, con los mismos datos de entrada, siempre devuelve el mismo resultado.</li>
        <li>Ejecuta el bloque completo en una pestaña SQL de Workbench, incluido el <code>DELIMITER</code>.</li>
        <li>Compruébala con <code>SHOW FUNCTION STATUS WHERE Db = 'soundflow_db';</code> y pruébala dentro de un <code>SELECT</code>.</li>
        <li>Si ya no la necesitas, bórrala con <code>DROP FUNCTION IF EXISTS nombre_funcion;</code></li>
      </ol>
    </div>

    <p style="margin-top:1rem;">
      Ejemplo: una función que cuenta cuántas veces se ha reproducido una canción, el mismo cálculo que ya
      hiciste con la subconsulta correlacionada de la sección de Subconsultas, pero empaquetado para
      reutilizarlo:
    </p>
    <p style="margin-top:1rem;"><strong>Cómo crearla en Workbench (clic derecho).</strong> El editor ya maneja el delimitador por ti, así que el código va sin <code>DELIMITER</code>:</p>
    <div class="content-box" style="margin-top:0.6rem; font-size:0.88rem;">
      <ol style="margin:0; padding-left:1.3rem;">
        <li>En el panel izquierdo (Navigator), abre <code>soundflow_db</code>.</li>
        <li>Clic derecho sobre <strong>Functions</strong> y elige <strong>Create Function...</strong></li>
        <li>Borra la plantilla y pega el código de abajo.</li>
        <li>Pulsa <strong>Apply</strong>, revisa el script que muestra, vuelve a pulsar <strong>Apply</strong> y luego <strong>Finish</strong>.</li>
        <li>Para usarla, abre una pestaña SQL y corre el <code>SELECT</code>.</li>
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
        <li><code>RETURNS INT</code>: declara que la función siempre devuelve un número entero.</li>
        <li><code>DETERMINISTIC</code>: le dice a MySQL que, con los mismos datos de entrada, la función
          siempre devuelve el mismo resultado.</li>
        <li><code>DECLARE total INT</code>: crea una variable local para guardar el conteo.</li>
        <li><code>SELECT COUNT(*) INTO total ...</code>: guarda el resultado del conteo en la variable
          <code>total</code>, en vez de devolverlo directo.</li>
        <li><code>RETURN total</code>: devuelve el valor calculado.</li>
        <li><code>fn_total_reproducciones(id_cancion)</code>: se llama dentro del <code>SELECT</code> como
          una columna más, una vez por cada fila de <code>tbl_canciones</code>.</li>
      </ul>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        La diferencia con un procedimiento: un procedimiento no devuelve nada por sí mismo y se ejecuta
        aparte con <code>CALL</code>; una función siempre devuelve un valor y se usa dentro de una consulta,
        no aparte.
      </p>
    </div>
    <p style="margin-top:1.2rem;"><strong>Diferencia entre una vista y una función.</strong> Las dos guardan una consulta, pero lo que devuelven es distinto: la vista devuelve una <strong>tabla</strong> y la función devuelve <strong>un solo valor</strong>.</p>
    <div style="overflow-x:auto; margin-top:0.6rem;">
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;"></th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Vista</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Función</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Devuelve</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">una tabla (varias filas y columnas)</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">un solo valor</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Va en</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>FROM</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code></td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Recibe parámetros</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">No</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Sí (por ejemplo <code>p_cancion</code>)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><strong>Para qué sirve</strong></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">reutilizar una consulta completa o mostrar solo ciertas columnas</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">reutilizar un cálculo</td></tr>
          <tr><td style="padding:0.4rem 0.7rem;"><strong>Ejemplo del curso</strong></td><td style="padding:0.4rem 0.7rem;"><code>vista_catalogo_completo</code></td><td style="padding:0.4rem 0.7rem;"><code>fn_total_reproducciones</code></td></tr>
        </tbody>
      </table>
    </div>
    <div class="content-box" style="margin-top:0.8rem; font-size:0.88rem;">
      <p style="margin:0 0 0.4rem;"><strong>Cuál usar:</strong></p>
      <ul style="margin:0; padding-left:1.2rem;">
        <li><strong>Vista</strong>, si necesitas un resultado con varias columnas (canción, álbum y artista) o quieres ocultar columnas sensibles a otros usuarios.</li>
        <li><strong>Función</strong>, si necesitas un número o un texto calculado para cada fila, a partir de un dato que le pasas.</li>
      </ul>
      <p style="margin:0.7rem 0 0;"><strong>En una frase:</strong> si quiero una tabla ya armada, uso una vista; si quiero un valor calculado, uso una función.</p>
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
      <li>Sofía Herrera (usuario 10) nunca había reproducido nada, lo confirmamos con <code>LEFT JOIN</code>.</li>
      <li>Alguien llama <code>CALL sp_registrar_reproduccion(10, 103)</code>: el <strong>procedimiento</strong>
        valida que el usuario y la canción existan, y hace el <code>INSERT</code>.</li>
      <li>Ese <code>INSERT</code> dispara el <strong>trigger</strong> <code>trg_after_insert_reproduccion</code>,
        que suma 1 al contador de "Mi Tierra" en <code>tbl_canciones</code>.</li>
      <li>Si alguien consulta <code>vista_usuarios_publica</code> para ver la actividad de Sofía, ve su
        nombre y correo, pero nunca su <code>password_hash</code>: esa es la <strong>vista</strong> de
        seguridad protegiendo el dato sensible en todo momento.</li>
    </ol>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim); font-style:italic;">
      En la Clase 2 vas a ver que el INSERT del procedimiento y el UPDATE del trigger, en el paso 2 y 3, ya
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
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);"><code style="color:#6cb6ff; font-weight:700;">VIEW</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Un <code>SELECT</code> guardado con nombre</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Se consulta en el <code>FROM</code>, como una tabla</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Una <strong>tabla</strong> (filas y columnas)</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Reutilizar una consulta que repites, u ocultar columnas sensibles a otros usuarios</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);" ><code>SELECT * FROM vista_catalogo_completo</code></td></tr>
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);"><code style="color:#c792ea; font-weight:700;">PROCEDURE</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Bloque de lógica con nombre y parámetros, con varias sentencias</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Alguien lo llama con <code>CALL</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Nada, o parámetros de salida</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Agrupar una acción de varios pasos que se repite, con validaciones</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);" ><code>CALL sp_registrar_reproduccion(10, 103)</code></td></tr>
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);"><code style="color:#8fd6c4; font-weight:700;">FUNCTION</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Como un procedimiento, pero siempre devuelve un valor</td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Se usa dentro de una consulta, como <code>COUNT()</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Un solo <strong>valor</strong></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);">Reutilizar un cálculo y usar su resultado en un <code>SELECT</code> o <code>WHERE</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top; border-bottom:1px solid var(--border);" ><code>SELECT fn_total_reproducciones(id_cancion)</code></td></tr>
          <tr><td style="padding:0.5rem 0.7rem; vertical-align:top;"><code style="color:#f0c47e; font-weight:700;">TRIGGER</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Código asociado a una tabla</td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Se dispara <strong>solo</strong> ante <code>INSERT</code>, <code>UPDATE</code> o <code>DELETE</code></td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Nada</td><td style="padding:0.5rem 0.7rem; vertical-align:top;">Mantener datos derivados al día, auditar cambios o validar datos automáticamente</td><td style="padding:0.5rem 0.7rem; vertical-align:top;" ><code>trg_after_insert_reproduccion</code> suma 1 al contador</td></tr>
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

  <!-- ===================== QUIZ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Quiz rápido de autoevaluación</h3>
    </div>
    <div class="quiz-box">
      <div class="quiz-question">
        <p>1. ¿Qué diferencia principal hay entre <code>INNER JOIN</code> y <code>LEFT JOIN</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Son exactamente lo mismo</button>
          <button type="button" class="quiz-option" data-correct="true">LEFT JOIN conserva todas las filas de la izquierda aunque no tengan pareja; INNER JOIN las descarta</button>
          <button type="button" class="quiz-option" data-correct="false">INNER JOIN es más rápido porque no usa ON</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. En un <code>LEFT JOIN tbl_usuarios u LEFT JOIN tbl_reproducciones r</code>, ¿qué significa que <code>r.id_cancion</code> sea NULL en una fila?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Que hubo un error en la consulta</button>
          <button type="button" class="quiz-option" data-correct="true">Que ese usuario no tiene ninguna reproducción registrada</button>
          <button type="button" class="quiz-option" data-correct="false">Que la canción se borró de tbl_canciones</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Por qué en la práctica casi no se usa <code>RIGHT JOIN</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque MySQL no lo soporta</button>
          <button type="button" class="quiz-option" data-correct="true">Porque el mismo resultado se logra con LEFT JOIN invirtiendo el orden de las tablas</button>
          <button type="button" class="quiz-option" data-correct="false">Porque siempre da error con más de 2 tablas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Cómo se simula un <code>FULL OUTER JOIN</code> en MySQL?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">No se puede lograr de ninguna forma</button>
          <button type="button" class="quiz-option" data-correct="true">Con un LEFT JOIN y un RIGHT JOIN combinados con UNION</button>
          <button type="button" class="quiz-option" data-correct="false">Usando CROSS JOIN en vez de FULL OUTER JOIN</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué riesgo tiene usar <code>CROSS JOIN</code> con tablas grandes?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Ninguno, siempre es la opción más eficiente</button>
          <button type="button" class="quiz-option" data-correct="true">El resultado crece como n &times; m, puede volverse enorme muy rápido</button>
          <button type="button" class="quiz-option" data-correct="false">Solo funciona con tablas de menos de 10 filas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. ¿Cuál es la diferencia entre <code>UNION</code> y <code>UNION ALL</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">UNION ALL es más lento porque revisa más filas</button>
          <button type="button" class="quiz-option" data-correct="true">UNION elimina filas duplicadas; UNION ALL las conserva todas</button>
          <button type="button" class="quiz-option" data-correct="false">No hay ninguna diferencia real</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué requisito deben cumplir dos consultas para poder combinarse con <code>UNION</code>?</p>
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
        <p>9. ¿Qué diferencia hay entre una subconsulta en <code>WHERE</code> y una subconsulta correlacionada en <code>SELECT</code>?</p>
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
        <p>13. Dentro de un trigger <code>AFTER INSERT</code>, ¿qué representa <code>NEW.id_cancion</code>?</p>
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
      <h3>Práctica: escribe tus propias consultas</h3>
    </div>
    <p>
      Con lo visto en esta clase, escribe el <code>SELECT</code> (o la vista/procedimiento/trigger) que
      resuelva cada uno de estos casos sobre <code>soundflow_db</code>. No se incluyen las respuestas: la
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
        <li>Crea una vista <code>vista_canciones_pop</code> que solo muestre las canciones de género "Pop".</li>
        <li>Crea un índice sobre la columna <code>genero</code> de <code>tbl_canciones</code> y explica en
          qué casos ayudaría.</li>
      </ol>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">Mediana complejidad</h4>
      <ol start="8" style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Muestra el nombre del usuario, el título de la canción y el nombre del artista para cada
          reproducción registrada (JOIN de cuatro tablas).</li>
        <li>Genera todas las combinaciones posibles de género y año de lanzamiento de álbum (CROSS JOIN),
          usando <code>SELECT DISTINCT</code> sobre cada columna.</li>
        <li>Simula un FULL OUTER JOIN entre <code>tbl_artistas</code> y <code>tbl_albumes</code> con
          LEFT JOIN + RIGHT JOIN + UNION, y explica por qué el resultado sí o no trae filas nuevas frente al
          LEFT JOIN solo.</li>
        <li>Usa UNION ALL para juntar los títulos de canciones de género "Pop" con los títulos de canciones
          de género "Rock" en una sola columna, y cuenta cuántas filas trae en total.</li>
        <li>Escribe una subconsulta en el WHERE que encuentre los álbumes con más canciones que el promedio
          de canciones por álbum.</li>
        <li>Crea un procedimiento <code>sp_contar_canciones_por_genero(p_genero)</code> que reciba un
          género por parámetro y muestre cuántas canciones hay de ese género.</li>
        <li>Crea un trigger <code>BEFORE INSERT</code> sobre <code>tbl_canciones</code> que impida insertar
          una canción con <code>duracion_seg</code> negativa o en cero (usa <code>SIGNAL</code> para
          lanzar un error).</li>
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
      (<code>CREATE TABLE</code>, <code>INSERT</code>) necesarias para reconstruir la base de datos
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
        exactamente los mismos <code>CREATE TABLE</code> e <code>INSERT</code> que ya conoces de esta clase.
        Guardar backups regularmente es lo que te permite deshacer un error grave (como un
        <code>DELETE</code> sin <code>WHERE</code>) volviendo a un punto anterior, en vez de perder los
        datos para siempre.
      </p>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="font-size:0.85rem; color:var(--text-dim);">
      · MySQL 8.0 Reference Manual, JOIN Clause. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, mysqldump. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, UNION Clause. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, Subqueries. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, Optimization and Indexes. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, CREATE VIEW Statement. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, CREATE PROCEDURE and CREATE FUNCTION Statements. dev.mysql.com<br>
      · MySQL 8.0 Reference Manual, Triggers Syntax. dev.mysql.com
    </p>
  </div>

`;

window.WEEK_CONTENT_3_2 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">Laboratorio SoundFlow</h2>

  <!-- ===================== 0. POR QUÉ ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>Laboratorio de SQL con Python</h3>
    </div>
    <p>
      En esta clase vas a conectar <code>soundflow_db</code> con código Python, y vas a trabajar sobre esto:
    </p>
    <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); margin-top:0.8rem;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Conexión y SQL injection</h4>
        <p style="font-size:0.85rem;">Cómo Python habla con MySQL, y cómo evitar que alguien manipule tus consultas.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Despliegue</h4>
        <p style="font-size:0.85rem;">Llevar la aplicación y su base de datos de tu computador a internet.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Diseño según necesidades</h4>
        <p style="font-size:0.85rem;">No toda aplicación necesita el mismo tipo de base de datos.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 1. TRANSACCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>1. Transacciones (COMMIT / ROLLBACK)</h3>
    </div>
    <p>
      Una <strong>transacción</strong> agrupa varias sentencias en una sola unidad de <strong>todo o
      nada</strong>: o se aplican todos los cambios, o no se aplica ninguno. Esto se controla con
      <code>START TRANSACTION</code>, <code>COMMIT</code> (confirma y guarda todo de forma permanente) y
      <code>ROLLBACK</code> (deshace todo lo que llevaba la transacción).
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>De hecho, ya usaste una transacción sin escribirla:</strong> en la Clase 1, cuando
        ejecutaste <code>CALL sp_registrar_reproduccion(10, 103)</code>, el <code>INSERT</code> del
        procedimiento y el <code>UPDATE</code> que disparó el trigger corrieron juntos, como una sola
        unidad. Si algo hubiera fallado a mitad de camino, MySQL habría revertido ambos cambios
        automáticamente. Lo que aprendemos ahora es a controlar ese "todo o nada" nosotros mismos, de forma
        explícita.
      </p>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05_transaccion.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="sql-kw-p">START</span> <span class="sql-kw-p">TRANSACTION</span>;

<span class="sql-kw-p">INSERT</span> <span class="sql-kw-p">INTO</span> tbl_reproducciones (id_usuario, id_cancion) <span class="sql-kw-p">VALUES</span> (6, 108);
<span class="sql-kw-p">INSERT</span> <span class="sql-kw-p">INTO</span> tbl_reproducciones (id_usuario, id_cancion) <span class="sql-kw-p">VALUES</span> (7, 999); -- id_cancion 999 no existe

-- Esta segunda sentencia falla: viola la FK hacia tbl_canciones.
-- Si ya hubieras insertado algo antes en esta misma transacción y quieres deshacer todo:
<span class="sql-kw-p">ROLLBACK</span>;

-- Si en cambio las dos sentencias hubieran salido bien, confirmarías con:
-- COMMIT;</code></pre>
    </div>
  </div>

  <!-- ===================== 2. SQL INJECTION ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. SQL injection (o inyección SQL)</h3>
    </div>
    <div style="max-width:680px; margin:0.5rem auto 0;">
      <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style="max-width:680px; width:100%; height:auto; display:block; margin:0 auto;">
        <defs>
          <marker id="flechaInjection" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)"/>
          </marker>
        </defs>

        <!-- Atacante -->
        <rect x="10" y="35" width="160" height="140" rx="10" fill="#3a1414" stroke="#e24b4a" stroke-width="1.5"/>
        <path d="M90 52 c-16 0 -27 11 -27 26 v8 c0 3 2.5 5.5 5.5 5.5 h43 c3 0 5.5 -2.5 5.5 -5.5 v-8 c0 -15 -11 -26 -27 -26 z" fill="#f2a3a2"/>
        <circle cx="90" cy="74" r="9" fill="#1a0a0a"/>
        <text x="90" y="108" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#f2a3a2">Atacante</text>
        <text x="90" y="132" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#f2a3a2">' OR '1'='1</text>
        <text x="90" y="150" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#f2a3a2">admin' -- </text>

        <line x1="170" y1="105" x2="255" y2="105" stroke="#e24b4a" stroke-width="2" marker-end="url(#flechaInjection)"/>
        <text x="212" y="95" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#e24b4a">envía el formulario</text>

        <!-- Servidor -->
        <rect x="260" y="25" width="180" height="150" rx="10" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <rect x="260" y="25" width="180" height="30" rx="10" fill="#4a7c9e"/>
        <rect x="260" y="45" width="180" height="10" fill="#4a7c9e"/>
        <text x="350" y="45" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">Servidor (Python)</text>
        <rect x="332" y="64" width="36" height="10" rx="2" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.2"/>
        <circle cx="362" cy="69" r="1.6" fill="#4a7c9e"/>
        <rect x="332" y="77" width="36" height="10" rx="2" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.2"/>
        <circle cx="362" cy="82" r="1.6" fill="#4a7c9e"/>
        <rect x="332" y="90" width="36" height="10" rx="2" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.2"/>
        <circle cx="362" cy="95" r="1.6" fill="#4a7c9e"/>
        <text x="350" y="115" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">arma el SQL</text>
        <text x="350" y="132" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">con f-string</text>
        <text x="350" y="155" text-anchor="middle" font-family="Consolas, monospace" font-size="9" fill="#a83a3a">(sin parámetros %s)</text>

        <line x1="440" y1="105" x2="525" y2="105" stroke="#4a7c9e" stroke-width="2" marker-end="url(#flechaInjection)"/>
        <text x="482" y="95" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#4a7c9e">ejecuta la consulta</text>

        <!-- Base de datos -->
        <rect x="530" y="35" width="140" height="140" rx="10" fill="#ffffff" stroke="#8aae3f" stroke-width="1.5"/>
        <rect x="530" y="35" width="140" height="30" rx="10" fill="#8aae3f"/>
        <rect x="530" y="55" width="140" height="10" fill="#8aae3f"/>
        <text x="600" y="55" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">MySQL</text>
        <path d="M583 76 v18 c0 2.8 7.6 5 17 5 s17 -2.2 17 -5 v-18" fill="#eaf5f4" stroke="#8aae3f" stroke-width="1.2"/>
        <ellipse cx="600" cy="94" rx="17" ry="5" fill="#eaf5f4" stroke="#8aae3f" stroke-width="1.2"/>
        <ellipse cx="600" cy="76" rx="17" ry="5" fill="#eaf5f4" stroke="#8aae3f" stroke-width="1.2"/>
        <text x="600" y="118" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">soundflow_db</text>
        <text x="600" y="138" text-anchor="middle" font-family="Consolas, monospace" font-size="9" fill="#a83a3a">devuelve datos sin</text>
        <text x="600" y="153" text-anchor="middle" font-family="Consolas, monospace" font-size="9" fill="#a83a3a">autorización real</text>

        <text x="340" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">El atacante nunca toca la base de datos directo: manipula lo que el servidor le manda a MySQL</text>
      </svg>
    </div>
    <p style="margin-top:1rem;">
      <strong>SQL injection</strong> (o <strong>inyección SQL</strong>) es una de las formas más comunes en
      que un atacante puede vulnerar un sistema: si la aplicación no está bien construida, un hacker puede
      aprovechar esa falla para manipular las consultas que se ejecutan contra la base de datos y acceder a
      información que no debería, sin necesitar ninguna contraseña ni permiso real. Ocurre cuando la
      aplicación pega, directamente dentro del texto de una consulta SQL, un valor que escribió el usuario,
      en vez de mantenerlo separado del código. Veámoslo paso a paso con un login típico (email y
      contraseña):
    </p>
    <div style="margin-top:0.8rem; display:flex; flex-direction:column; gap:0.6rem;">
      <div class="content-box" style="border-left:4px solid #4a7c9e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#4a7c9e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">1</span>
        <div>
          <p style="margin:0;">La aplicación arma la consulta con un molde fijo: un texto SQL que el
            programador ya escribió de antemano y que no cambia, con un hueco por cada dato del usuario que
            hace falta:</p>
          <p style="margin:0.7rem 0; text-align:center;">
            <code>SELECT id FROM tbl_usuarios WHERE email = '<span style="background:rgba(200,154,78,0.35); padding:0 3px; border-radius:3px;">____</span>' AND password_hash = '<span style="background:rgba(200,154,78,0.35); padding:0 3px; border-radius:3px;">____</span>'</code>
          </p>
          <p style="margin:0;">En Python, esos huecos son lo que nosotros llenamos: pegamos ahí las
            variables <code>email</code> y <code>password</code> con el dato que escribió el usuario.</p>
        </div>
      </div>
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">2</span>
        <p style="margin:0;">Un usuario normal escribe un dato normal, por ejemplo <code>ana@correo.com</code>. La
          aplicación pega ese texto en el hueco y todo queda dentro de sus comillas, como se espera.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #e24b4a; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#e24b4a; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">3</span>
        <p style="margin:0;">Un atacante, en vez de un email, escribe
          <code style="color:#a83a3a; font-weight:700;">ana@correo.com' -- </code>. Esa comilla simple es
          justo el carácter que en SQL cierra un texto.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #e24b4a; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#e24b4a; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">4</span>
        <p style="margin:0;">La aplicación no distingue "esto es un dato" de "esto es código": pega ese texto
          igual, sin revisarlo.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #e24b4a; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#e24b4a; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">5</span>
        <p style="margin:0;">La comilla cierra el valor antes de tiempo, y el
          <code style="color:#a83a3a; font-weight:700;">--</code> convierte todo lo que sigue en un
          comentario (SQL ignora el resto de esa línea).</p>
      </div>
      <div class="content-box" style="border-left:4px solid #c99a4e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#c99a4e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">6</span>
        <p style="margin:0;">La consulta que MySQL realmente ejecuta queda recortada a
          <code>WHERE email = 'ana@correo.com'</code>, sin ninguna verificación de contraseña.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #e24b4a; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#e24b4a; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">7</span>
        <p style="margin:0;">El atacante entra sin conocer la contraseña, porque esa pregunta nunca se llegó a
          hacer.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #8b7fb8; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#8b7fb8; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">8</span>
        <p style="margin:0;">La causa: el atacante nunca tocó la base de datos directamente, solo escribió
          texto en un formulario. Fue la aplicación, al pegarlo sin separarlo del SQL, la que le dio el poder
          de reescribir la consulta.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">
      El problema empieza cuando la consulta ya no es fija, sino que depende de lo que escribe un usuario.
      Una forma <strong>insegura</strong> y muy común de escribirlo es meter ese valor directo dentro del
      texto del SQL, con un f-string:
    </p>
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
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Si el usuario escribe <code>Pop</code>, todo funciona bien. Pero si alguien escribe
        <code style="color:#a83a3a; font-weight:700;">Pop' OR '1'='1</code>, el texto final que le llega a
        MySQL queda así:
      </p>
      <div class="sql" style="margin-top:0.5rem;"><span class="sql-kw-p">SELECT</span> titulo <span class="sql-kw-p">FROM</span> tbl_canciones <span class="sql-kw-p">WHERE</span> genero = 'Pop' <span class="sql-kw-b">OR</span> '1'='1'</div>
      <p style="margin:0.6rem 0 0;">
        Como <code>'1'='1'</code> siempre es verdadero, el <code>WHERE</code> deja de filtrar: la consulta
        devuelve <strong>todas</strong> las canciones de la tabla, sin importar el género. Esto es
        <strong>SQL injection</strong>: el usuario logró que su texto de entrada se convirtiera en parte de
        la lógica del SQL, no en un simple dato.
      </p>
    </div>

    <p style="margin-top:1rem;">
      El caso más peligroso es en un login. Si el código arma la validación de la misma forma:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">login_vulnerable.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>usuario = input("Usuario: ")
clave = input("Clave: ")
query = f"SELECT * FROM tbl_usuarios WHERE nombre = '{usuario}' AND password_hash = '{clave}'"
cursor.execute(query)</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Si alguien escribe como usuario <code style="color:#a83a3a; font-weight:700;">admin' -- </code> (con
        espacio al final), la consulta queda:
      </p>
      <div class="sql" style="margin-top:0.5rem;"><span class="sql-kw-p">SELECT</span> * <span class="sql-kw-p">FROM</span> tbl_usuarios <span class="sql-kw-p">WHERE</span> nombre = 'admin' -- ' AND password_hash = '...'</div>
      <p style="margin:0.6rem 0 0;">
        En SQL, <code>--</code> inicia un comentario: todo lo que sigue en esa línea se ignora. La
        verificación de la contraseña <strong>nunca se ejecuta</strong>, y quien escribió esto entraría como
        "admin" sin saber ninguna clave.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>La solución: consultas parametrizadas.</strong> En vez de insertar
    el valor dentro del texto del SQL, se deja un marcador <code style="color:#a83a3a; font-weight:700;">%s</code>
    y el valor se pasa aparte. <code style="color:#a83a3a; font-weight:700;">%s</code> es un marcador
    especial que le dice a la librería de MySQL "aquí va un valor, pero todavía no lo pongas":</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">seguro.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>usuario = input("Usuario: ")
clave = input("Clave: ")
query = "SELECT * FROM tbl_usuarios WHERE nombre = %s AND password_hash = %s"
cursor.execute(query, (usuario, clave))</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Con esta forma, el driver de MySQL le manda a la base de datos el SQL y los valores
        <strong>por separado</strong>. Sin importar qué escriba el usuario, incluso
        <code style="color:#a83a3a; font-weight:700;">admin' -- </code>. <strong>Nunca construir SQL
        concatenando o con f-strings valores que vienen del usuario</strong>; siempre usar parámetros
        (<code style="color:#a83a3a; font-weight:700;">%s</code>, o
        <code style="color:#a83a3a; font-weight:700;">?</code> según la librería).
      </p>
    </div>
  </div>

  <!-- ===================== 1B. DEMO VULNERABLE EN VIVO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3 style="text-align:center;">Demo en vivo: hackeando un login vulnerable</h3>
    </div>
    <div class="content-box" style="margin-top:0; border-left:4px solid #e24b4a;">
      <p style="margin:0;">
        <strong>Uso educativo únicamente:</strong> el proyecto <code>soundflow_vulnerable_demo</code> es a
        propósito inseguro. Solo debe correr en tu computador, conectado a tu copia local de
        <code>soundflow_db</code>, mientras dura esta clase. Nunca lo despliegues en internet ni lo dejes
        corriendo fuera de este contexto.
      </p>
    </div>
    <p style="margin-top:1rem;">
      Es un mini sitio con un solo formulario de login, construido exactamente con el patrón vulnerable que
      acabas de ver (<code>login_vulnerable.py</code>), pero corriendo de verdad contra
      <code>soundflow_db</code>. Cada intento imprime, en la consola donde corre <code>python app.py</code>,
      la consulta SQL exacta que se construyó y cuántas filas devolvió MySQL, para que el ataque se vea
      paso a paso, no solo en teoría.
    </p>
    <ol style="margin:0.8rem 0 0; padding-left:1.2rem; color:var(--text);">
      <li>Corre <code>soundflow_vulnerable_demo</code> igual que <code>soundflow_app</code> (mismo
        <code>venv</code>, <code>pip install -r requirements.txt</code>, tu propio <code>.env</code>), pero
        en el puerto <code>5001</code> en vez del <code>5000</code>.</li>
      <li>Primer intento: un correo real que exista en <code>tbl_usuarios</code> y una contraseña
        cualquiera, inventada. Debería salir "ACCESO DENEGADO": la contraseña no coincide, como se espera.</li>
      <li>Segundo intento: en el campo de correo, en vez del correo normal, escribe
        <code>correo_real@ejemplo.com' -- </code> (con el espacio final) y cualquier cosa en la
        contraseña.</li>
      <li>Revisa la consola: vas a ver que el <code>--</code> comenta la verificación de
        <code>password_hash</code>, y el resultado es "ACCESO CONCEDIDO" con el nombre real de ese usuario,
        sin que el código haya comprobado ninguna contraseña.</li>
    </ol>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        El archivo <code>README.md</code> de <code>soundflow_vulnerable_demo</code> trae este mismo guion
        con más detalle, incluyendo el texto exacto para copiar y pegar. Después de la demostración, vuelve
        a <code>soundflow_app</code> (la versión seria) e intenta el mismo ataque ahí: con <code>%s</code>
        y parámetros, el intento simplemente falla, como debería.
      </p>
    </div>
  </div>

  <!-- ===================== 3. DESPLIEGUE LOCAL ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Despliegue local: MySQL Workbench + Python (Flask)</h3>
    </div>
    <p>
      <strong>Desplegar</strong> significa dejar tu aplicación (y su conexión a la base de datos) corriendo
      y lista para usarse, no solo escrita. Aquí lo vas a hacer <strong>en tu propio computador</strong>: tu
      base de datos vive en MySQL Workbench, y tu aplicación en Flask (Python), las dos en
      <code>localhost</code>, sin depender de ningún servicio en la nube ni cuenta externa. Vas a usar el
      proyecto <code>soundflow_app</code> (registro, inicio de sesión e inserción de canciones) como
      prototipo para todo esto.
    </p>

    <p style="margin-top:1rem;"><strong>Paso a paso en MySQL Workbench:</strong></p>
    <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
      <li>Abre MySQL Workbench y conéctate a tu servidor local (normalmente <code>127.0.0.1</code>, puerto
        <code>3306</code>).</li>
      <li>Confirma que la base de datos <code>soundflow_db</code> existe, con las tablas de la Clase 1
        (<code>tbl_usuarios</code>, <code>tbl_canciones</code>, <code>tbl_albumes</code>, etc.). Si no
        existe, créala y corre ahí los <code>INSERT</code> de la clase antes de continuar.</li>
      <li>Anota host, puerto, usuario y contraseña de tu servidor: los vas a necesitar en el archivo
        <code>.env</code> del siguiente paso.</li>
    </ol>

    <p style="margin-top:1rem;"><strong>Paso a paso en Python (Flask):</strong></p>
    <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
      <li>Instala Python 3.10 o más nuevo si no lo tienes.</li>
      <li>Dentro de la carpeta <code>soundflow_app</code>, crea un entorno virtual
        (<code>python -m venv venv</code>) y actívalo.</li>
      <li>Instala las dependencias del proyecto: <code>pip install -r requirements.txt</code> (incluye
        Flask, el conector de MySQL, python-dotenv y Werkzeug).</li>
      <li>Copia <code>.env.example</code> a <code>.env</code>, y reemplaza los valores con los datos que
        anotaste en MySQL Workbench.</li>
      <li>Corre la aplicación con <code>python app.py</code> y ábrela en tu navegador en
        <code>http://127.0.0.1:5000</code>.</li>
      <li>Pruébala completa: regístrate, inicia sesión, agrega una canción, y verifica en MySQL Workbench
        que la fila realmente quedó guardada.</li>
    </ol>
  </div>

  <!-- ===================== 4. DISEÑO DE BD SEGÚN NECESIDADES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. Diseño de bases de datos según necesidades</h3>
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
        <p>1. ¿Qué hace vulnerable a SQL injection un código como <code>f"...WHERE genero = '{valor}'"</code>?</p>
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
        <p>4. ¿Qué logran juntos <code>START TRANSACTION</code> y <code>COMMIT</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Agrupar varias sentencias para confirmarlas todas juntas, de forma permanente</button>
          <button type="button" class="quiz-option" data-correct="false">Crear una vista temporal</button>
          <button type="button" class="quiz-option" data-correct="false">Borrar todos los cambios hechos hasta el momento</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué hace <code>ROLLBACK</code> dentro de una transacción?</p>
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
        <p>10. ¿Qué principio de seguridad conecta las consultas parametrizadas, la vista_usuarios_publica de la Clase 1 y las variables de entorno del despliegue?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">No exponer datos ni credenciales sensibles más de lo estrictamente necesario</button>
          <button type="button" class="quiz-option" data-correct="false">Usar siempre el mismo nombre de usuario en todos lados</button>
          <button type="button" class="quiz-option" data-correct="false">Desactivar todas las contraseñas para simplificar el acceso</button>
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
        <li>Configura tu propio <code>.env</code> a partir de <code>.env.example</code> en
          <code>soundflow_app</code>, corre la aplicación en tu computador y verifica en MySQL Workbench que
          el registro de un usuario nuevo y una canción nueva quedaron guardados correctamente.</li>
        <li>Diseña, en un diagrama, cómo cambiaría el esquema de <code>soundflow_db</code> si además
          quisieras registrar en tiempo real cada "me gusta" que un usuario le da a una canción, sin afectar
          el rendimiento de las consultas actuales.</li>
        <li>Explica con tus palabras por qué una aplicación bancaria necesitaría transacciones más estrictas
          que SoundFlow.</li>
        <li>Escribe el código Python (usando parámetros seguros) que invoque el procedimiento
          <code>sp_registrar_reproduccion</code> de la Clase 1 desde una aplicación.</li>
      </ol>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="font-size:0.85rem; color:var(--text-dim);">
      · OWASP, SQL Injection. owasp.org<br>
      · MySQL Connector/Python Developer Guide. dev.mysql.com<br>
      · PyMySQL Documentation. pymysql.readthedocs.io<br>
      · MySQL 8.0 Reference Manual, START TRANSACTION, COMMIT, and ROLLBACK Statements. dev.mysql.com<br>
      · Flask Documentation. flask.palletsprojects.com<br>
      · python-dotenv Documentation. pypi.org/project/python-dotenv<br>
      · Werkzeug Security (generate_password_hash / check_password_hash). werkzeug.palletsprojects.com
    </p>
  </div>

`;
