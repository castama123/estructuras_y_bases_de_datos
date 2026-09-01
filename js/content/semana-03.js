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
        <text x="300" y="174" font-family="Consolas, monospace" font-size="10" fill="#7fa5a3" font-weight="700">FK  id_album</text>

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
        <rect x="20" y="290" width="250" height="140" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
        <rect x="20" y="290" width="250" height="34" rx="8" fill="#7fa5a3"/>
        <rect x="20" y="314" width="250" height="10" fill="#7fa5a3"/>
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
        <line x1="270" y1="344" x2="290" y2="174" stroke="#7fa5a3" stroke-width="2"/>
        <circle cx="270" cy="344" r="4" fill="#7fa5a3"/>
        <circle cx="290" cy="174" r="4" fill="#7fa5a3"/>
        <text x="245" y="340" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">1</text>
        <text x="296" y="180" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">N</text>

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
      <div class="sql" style="margin-top:0.4rem;">SELECT columnas
FROM tablaA
INNER JOIN tablaB ON tablaA.columna = tablaB.columna;</div>
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
      <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="max-width:500px; width:100%; height:auto; display:block; margin:0.6rem auto 0;">
        <!-- tbl_albumes -->
        <rect x="20" y="20" width="210" height="140" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
        <rect x="20" y="20" width="210" height="34" rx="8" fill="#7fa5a3"/>
        <rect x="20" y="44" width="210" height="10" fill="#7fa5a3"/>
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
        <text x="330" y="174" font-family="Consolas, monospace" font-size="10" fill="#7fa5a3" font-weight="700">FK  id_album</text>

        <!-- albumes (PK) → canciones (FK id_album) -->
        <line x1="230" y1="74" x2="320" y2="174" stroke="#7fa5a3" stroke-width="2"/>
        <circle cx="230" cy="74" r="4" fill="#7fa5a3"/>
        <circle cx="320" cy="174" r="4" fill="#7fa5a3"/>
        <text x="237" y="70" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">1</text>
        <text x="298" y="170" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">N</text>

        <text x="280" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">1 álbum tiene N canciones</text>
      </svg>
      <p style="margin:0.6rem 0 0; font-style:italic; color:#a83a3a;">
        Consulta: listar el título de cada canción junto con el título de su álbum, ordenado por título de canción.
      </p>
      <p style="margin:0.6rem 0 0;">
        <code>c.titulo</code> sale de <code>tbl_canciones</code>; <code>al.titulo_album</code> sale de
        <code>tbl_albumes</code>. Estas dos tablas se unen por el <code>id</code> de cada una:
        <code>tbl_albumes</code> con <code>tbl_canciones</code>, por <code>id_album</code>.
      </p>
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
      <pre><code>SELECT tbl_canciones.titulo, tbl_albumes.titulo_album
FROM tbl_canciones
INNER JOIN tbl_albumes ON tbl_canciones.id_album = tbl_albumes.id_album
ORDER BY tbl_canciones.titulo;</code></pre>
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
      <pre><code>SELECT c.titulo, al.titulo_album
FROM tbl_canciones c
INNER JOIN tbl_albumes al ON c.id_album = al.id_album
ORDER BY c.titulo;</code></pre>
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
      <svg viewBox="0 0 780 260" xmlns="http://www.w3.org/2000/svg" style="max-width:720px; width:100%; height:auto; display:block; margin:0.6rem auto 0;">
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
        <rect x="290" y="20" width="200" height="140" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
        <rect x="290" y="20" width="200" height="34" rx="8" fill="#7fa5a3"/>
        <rect x="290" y="44" width="200" height="10" fill="#7fa5a3"/>
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
        <text x="570" y="174" font-family="Consolas, monospace" font-size="10" fill="#7fa5a3" font-weight="700">FK  id_album</text>

        <!-- artistas (PK) → albumes (FK id_artista) -->
        <line x1="220" y1="70" x2="290" y2="134" stroke="#8b7fb8" stroke-width="2"/>
        <circle cx="220" cy="70" r="4" fill="#8b7fb8"/>
        <circle cx="290" cy="134" r="4" fill="#8b7fb8"/>
        <text x="227" y="66" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">1</text>
        <text x="258" y="130" font-family="Consolas, monospace" font-size="12" fill="#8b7fb8" font-weight="700">N</text>

        <!-- albumes (PK) → canciones (FK id_album) -->
        <line x1="490" y1="70" x2="560" y2="174" stroke="#7fa5a3" stroke-width="2"/>
        <circle cx="490" cy="70" r="4" fill="#7fa5a3"/>
        <circle cx="560" cy="174" r="4" fill="#7fa5a3"/>
        <text x="497" y="66" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">1</text>
        <text x="528" y="170" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">N</text>

        <text x="390" y="220" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">1 artista tiene N álbumes; 1 álbum tiene N canciones</text>
      </svg>
      <p style="margin:0.6rem 0 0; font-style:italic; color:#a83a3a;">
        Consulta: listar el título de cada canción junto con el título de su álbum y el nombre de su artista, ordenado por título de canción.
      </p>
      <p style="margin:0.6rem 0 0;">
        <code>c.titulo</code> sale de <code>tbl_canciones</code>; <code>al.titulo_album</code> sale de
        <code>tbl_albumes</code>; <code>ar.nombre_artista</code> sale de <code>tbl_artistas</code>. Las
        tres tablas se unen por el <code>id</code> de cada una: <code>tbl_artistas</code> con
        <code>tbl_albumes</code> por <code>id_artista</code>, y <code>tbl_albumes</code> con
        <code>tbl_canciones</code> por <code>id_album</code>.
      </p>
    </div>

    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">02_inner_join_tres_tablas.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>SELECT c.titulo, al.titulo_album, ar.nombre_artista
FROM tbl_canciones c
INNER JOIN tbl_albumes al ON c.id_album = al.id_album
INNER JOIN tbl_artistas ar ON al.id_artista = ar.id_artista
ORDER BY c.titulo;</code></pre>
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
      <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="max-width:500px; width:100%; height:auto; display:block; margin:0.6rem auto 0;">
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
      <p style="margin:0.6rem 0 0; font-style:italic; color:#a83a3a;">
        Consulta: listar el nombre de cada usuario junto con el id de cada canción que reprodujo, incluyendo a los usuarios que no han reproducido nada.
      </p>
      <p style="margin:0.6rem 0 0;">
        <code>u.nombre</code> sale de <code>tbl_usuarios</code>; <code>r.id_cancion</code> sale de
        <code>tbl_reproducciones</code>. La condición del <code>ON</code> es la misma línea del diagrama:
        <code>u.idusuario = r.id_usuario</code>.
      </p>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">02_left_join.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>SELECT u.nombre, r.id_cancion
FROM tbl_usuarios u
LEFT JOIN tbl_reproducciones r ON u.idusuario = r.id_usuario
ORDER BY u.nombre;</code></pre>
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
      <div class="sql">SELECT u.nombre
FROM tbl_usuarios u
LEFT JOIN tbl_reproducciones r ON u.idusuario = r.id_usuario
WHERE r.id_reproduccion IS NULL;</div>
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
      <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="max-width:500px; width:100%; height:auto; display:block; margin:0.6rem auto 0;">
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
        <text x="30" y="174" font-family="Consolas, monospace" font-size="10" fill="#7fa5a3" font-weight="700">FK  id_album</text>

        <!-- tbl_albumes -->
        <rect x="320" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
        <rect x="320" y="20" width="220" height="34" rx="8" fill="#7fa5a3"/>
        <rect x="320" y="44" width="220" height="10" fill="#7fa5a3"/>
        <text x="330" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">tbl_albumes</text>
        <text x="330" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="346" y="74" font-family="Consolas, monospace" font-size="10" fill="#a83a3a" font-weight="700">PK  id_album</text>
        <text x="330" y="94" font-family="Consolas, monospace" font-size="10" fill="#33404f">titulo_album</text>
        <text x="330" y="114" font-family="Consolas, monospace" font-size="10" fill="#33404f">anio_lanzamiento</text>
        <text x="330" y="134" font-family="Consolas, monospace" font-size="10" fill="#8b7fb8" font-weight="700">FK  id_artista</text>

        <!-- canciones (FK id_album) → albumes (PK) -->
        <line x1="230" y1="174" x2="320" y2="70" stroke="#7fa5a3" stroke-width="2"/>
        <circle cx="230" cy="174" r="4" fill="#7fa5a3"/>
        <circle cx="320" cy="70" r="4" fill="#7fa5a3"/>
        <text x="237" y="170" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">N</text>
        <text x="298" y="66" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">1</text>

        <text x="280" y="200" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" font-style="italic" fill="var(--text-dim)">1 álbum puede tener N canciones, o ninguna (álbumes 5 a 10)</text>
      </svg>
      <p style="margin:0.6rem 0 0; font-style:italic; color:#a83a3a;">
        Consulta: listar el título de cada álbum junto con el título de cada canción que tiene, incluyendo los álbumes que no tienen ninguna canción.
      </p>
      <p style="margin:0.6rem 0 0;">
        <code>al.titulo_album</code> sale de <code>tbl_albumes</code>; <code>c.titulo</code> sale de
        <code>tbl_canciones</code>. Aquí <code>tbl_albumes</code> es la tabla "derecha", así que
        <code>RIGHT JOIN</code> conserva sus 10 filas completas, tengan o no canciones.
      </p>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">03_right_join.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>SELECT al.titulo_album, c.titulo
FROM tbl_canciones c
RIGHT JOIN tbl_albumes al ON c.id_album = al.id_album
ORDER BY al.id_album;</code></pre>
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
      <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="max-width:500px; width:100%; height:auto; display:block; margin:0.6rem auto 0;">
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
      <p style="margin:0.6rem 0 0; font-style:italic; color:#a83a3a;">
        Consulta: listar el nombre de cada usuario junto con el id de cada canción que reprodujo, trayendo también los usuarios sin reproducciones y las reproducciones sin usuario.
      </p>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">04_full_outer_join_mysql.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>SELECT u.nombre, r.id_cancion
FROM tbl_usuarios u
LEFT JOIN tbl_reproducciones r ON u.idusuario = r.id_usuario
UNION
SELECT u.nombre, r.id_cancion
FROM tbl_usuarios u
RIGHT JOIN tbl_reproducciones r ON u.idusuario = r.id_usuario;</code></pre>
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
      <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="max-width:500px; width:100%; height:auto; display:block; margin:0.6rem auto 0;">
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
      <p style="margin:0.6rem 0 0; font-style:italic; color:#a83a3a;">
        Consulta: listar todas las combinaciones posibles entre nombre de artista y nombre de usuario, ordenadas por artista y luego por usuario.
      </p>
      <p style="margin:0.6rem 0 0;">
        <code>ar.nombre_artista</code> sale de <code>tbl_artistas</code>; <code>u.nombre</code> sale de
        <code>tbl_usuarios</code>. Como no hay ningún <code>ON</code>, MySQL no compara nada: simplemente
        empareja cada artista con cada usuario, sin importar si esa combinación significa algo.
      </p>
    </div>

    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05_cross_join.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>SELECT ar.nombre_artista, u.nombre
FROM tbl_artistas ar
CROSS JOIN tbl_usuarios u
ORDER BY ar.nombre_artista, u.nombre;</code></pre>
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
        <h4 style="color:#7fa5a3;">UNION ALL</h4>
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
SELECT titulo, genero, duracion_seg, reproducciones FROM tbl_canciones WHERE duracion_seg > 200
UNION ALL
SELECT titulo, genero, duracion_seg, reproducciones FROM tbl_canciones WHERE reproducciones > 5000000;

-- UNION: el mismo par de consultas, pero elimina duplicados
SELECT titulo, genero, duracion_seg, reproducciones FROM tbl_canciones WHERE duracion_seg > 200
UNION
SELECT titulo, genero, duracion_seg, reproducciones FROM tbl_canciones WHERE reproducciones > 5000000;</code></pre>
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

    <p style="margin-top:1rem;"><strong>1. Subconsulta en <code>WHERE</code>:</strong> filtrar usando el
    resultado de otra consulta. Cuando la subconsulta devuelve <strong>varios</strong> valores se usa
    <code>IN</code>. Ejemplo: canciones que pertenecen a álbumes lanzados antes de 1995.</p>
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
      <pre><code>SELECT titulo, id_album
FROM tbl_canciones
WHERE id_album IN (SELECT id_album FROM tbl_albumes WHERE anio_lanzamiento &lt; 1995)
ORDER BY titulo;</code></pre>
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
      <pre><code>SELECT titulo, reproducciones
FROM tbl_canciones
WHERE reproducciones > (SELECT AVG(reproducciones) FROM tbl_canciones)
ORDER BY reproducciones DESC;</code></pre>
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

    <p style="margin-top:1rem;">Tercer ejemplo, con <code>EXISTS</code> en vez de <code>IN</code> o un
    operador de comparación: <code>EXISTS</code> solo revisa si la subconsulta devuelve al menos una fila,
    sin importar cuántas ni cuáles. Es el complemento exacto del <code>LEFT JOIN ... WHERE ... IS NULL</code>
    que ya usaste para encontrar a Sofía Herrera: en vez de buscar quién NO tiene reproducciones, busca
    quién SÍ las tiene.</p>
    <p style="margin-top:0.5rem; font-style:italic; color:#a83a3a;">
      Consulta: listar el nombre de los usuarios que sí han reproducido al menos una canción.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">13c_subconsulta_where_exists.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Usuarios que SÍ han reproducido algo (lo opuesto a Sofía Herrera)
SELECT nombre FROM tbl_usuarios u
WHERE EXISTS (SELECT 1 FROM tbl_reproducciones r WHERE r.id_usuario = u.idusuario);</code></pre>
    </div>

    <p style="margin-top:1rem;"><strong>2. Subconsulta en <code>SELECT</code>:</strong> calcular un valor
    por cada fila, casi siempre referenciando la fila externa (esto se llama <strong>subconsulta
    correlacionada</strong>). Ejemplo: cada canción, junto con cuántas veces aparece en el log de
    reproducciones:</p>
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
      <pre><code>SELECT c.titulo,
  (SELECT COUNT(*) FROM tbl_reproducciones r WHERE r.id_cancion = c.id_cancion) AS veces_en_el_log
FROM tbl_canciones c
ORDER BY c.titulo;</code></pre>
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
      <p style="margin:0;">
        MySQL recorre <code>tbl_canciones</code> fila por fila, y para cada canción resuelve la subconsulta
        reemplazando por el ID de esa canción específica.
        Por ejemplo, para <strong>Tres Deseos</strong> (<code>id_cancion</code> 101), la subconsulta busca
        en <code>tbl_reproducciones</code> las filas con <code>id_cancion = 101</code>, encuentra 2 (dos
        usuarios distintos la reprodujeron), y ese <code>2</code> es el valor que queda en
        <code>veces_en_el_log</code>. Para <strong>Mi Tierra</strong> (<code>id_cancion</code> 103), no
        encuentra ninguna fila, así que el conteo da <code>0</code>. Al final, cuando ya se resolvió la
        subconsulta para las 10 canciones, <code>ORDER BY c.titulo</code> ordena todo el resultado
        alfabéticamente.
      </p>
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
      <pre><code>SELECT u.nombre,
  (SELECT COUNT(*) FROM tbl_reproducciones r WHERE r.id_usuario = u.idusuario) AS total_reproducciones
FROM tbl_usuarios u
ORDER BY u.nombre;</code></pre>
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

    <p style="margin-top:1rem;"><strong>3. Subconsulta en <code>FROM</code>:</strong> usar el resultado de
    una consulta como si fuera una tabla temporal. Por ejemplo, cuántas canciones tiene cada álbum,
    filtrando después solo los álbumes con 3 o más:</p>
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
      <pre><code>SELECT id_album, cantidad_canciones
FROM (
  SELECT id_album, COUNT(*) AS cantidad_canciones
  FROM tbl_canciones
  GROUP BY id_album
) AS canciones_por_album
WHERE cantidad_canciones >= 3;</code></pre>
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
      <div class="sql" style="margin-top:0.4rem;">CREATE INDEX nombre_indice ON tabla (columna);</div>
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
      <pre><code>CREATE INDEX idx_canciones_genero ON tbl_canciones (genero);</code></pre>
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
      <div class="sql" style="margin-top:0.4rem;">CREATE VIEW nombre_vista AS
SELECT columnas
FROM tabla
WHERE condicion;</div>
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
      <pre><code>CREATE VIEW vista_catalogo_completo AS
SELECT c.titulo, al.titulo_album, ar.nombre_artista
FROM tbl_canciones c
INNER JOIN tbl_albumes al ON c.id_album = al.id_album
INNER JOIN tbl_artistas ar ON al.id_artista = ar.id_artista;

-- Y a partir de ahora, en vez de repetir el JOIN, solo escribes:
SELECT * FROM vista_catalogo_completo WHERE nombre_artista = 'Maná';</code></pre>
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
      <pre><code>CREATE VIEW vista_usuarios_publica AS
SELECT idusuario, nombre, email, estado_activo
FROM tbl_usuarios;

SELECT * FROM vista_usuarios_publica WHERE idusuario = 10;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        A una aplicación (o a un equipo de análisis de datos) le das acceso a
        <code>vista_usuarios_publica</code>, nunca a <code>tbl_usuarios</code> directamente. Así, aunque
        alguien consulte la vista con total libertad, es <strong>físicamente imposible</strong> que obtenga
        el <code>password_hash</code> de nadie: esa columna ni siquiera existe en la vista.
      </p>
    </div>
  </div>

  <!-- ===================== 12. TRIGGERS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>11. Disparadores (TRIGGERS)</h3>
    </div>
    <p>
      Un <strong>trigger</strong> es un procedimiento especial que se dispara <strong>automáticamente</strong>
      cuando ocurre un evento sobre una tabla (<code>INSERT</code>, <code>UPDATE</code> o
      <code>DELETE</code>), ya sea <code>BEFORE</code> (antes del evento) o <code>AFTER</code> (después).
      Nadie lo llama a mano, como sí pasa con un procedimiento.
    </p>

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
      <pre><code>DELIMITER //

CREATE TRIGGER trg_after_insert_reproduccion
AFTER INSERT ON tbl_reproducciones
FOR EACH ROW
BEGIN
  UPDATE tbl_canciones
  SET reproducciones = reproducciones + 1
  WHERE id_cancion = NEW.id_cancion;
END //

DELIMITER ;</code></pre>
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
      <pre><code>SELECT titulo, reproducciones FROM tbl_canciones WHERE id_cancion = 103;</code></pre>
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
      Un procedimiento almacenado es un bloque de código SQL con nombre que puede contener cualquier
      combinación de sentencias, no solo <code>INSERT</code>/<code>UPDATE</code>/<code>DELETE</code>.
      También puede hacer <code>SELECT</code>, usar variables, condicionales (<code>IF</code>), bucles, y
      hasta llamar a otros procedimientos. Simplemente agrupa lógica que quieres reutilizar bajo un solo
      nombre, con parámetros de entrada y/o salida. Se define con <code>CREATE PROCEDURE</code> y se
      ejecuta con <code>CALL</code>.
    </p>

    <p style="margin-top:1rem;">
      Ejemplo: registrar una reproducción, pero solo si el usuario y la canción realmente existen (usando
      <code>IF</code> para controlar el flujo, y <code>EXISTS</code> para validar que los campos sí existan
      antes de hacer la inserción).
    </p>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0 0 0.4rem;"><strong>Se lee así:</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li><code>DELIMITER //</code> / <code>DELIMITER ;</code>: cambia y después restaura el símbolo de
          fin de bloque, para que los <code>;</code> de adentro no corten el procedimiento antes de tiempo.</li>
        <li><code>CREATE PROCEDURE sp_registrar_reproduccion(IN p_usuario INT, IN p_cancion INT) BEGIN ...
          END</code>: crea el procedimiento con dos parámetros de entrada y el bloque de instrucciones que
          se ejecuta al llamarlo.</li>
        <li><code>IF EXISTS (...) AND EXISTS (...) THEN ... ELSE ... END IF</code>: si el usuario y la
          canción existen, inserta la reproducción; si no, devuelve un mensaje de aviso.</li>
        <li><code>CALL sp_registrar_reproduccion(10, 103)</code>: ejecuta el procedimiento con esos dos
          valores.</li>
      </ul>
    </div>
    <div class="code-block" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">21_sp_registrar_reproduccion.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>DELIMITER //

CREATE PROCEDURE sp_registrar_reproduccion(
  IN p_usuario INT,
  IN p_cancion INT
)
BEGIN
  IF EXISTS (SELECT 1 FROM tbl_usuarios WHERE idusuario = p_usuario)
     AND EXISTS (SELECT 1 FROM tbl_canciones WHERE id_cancion = p_cancion) THEN
    INSERT INTO tbl_reproducciones (id_usuario, id_cancion) VALUES (p_usuario, p_cancion);
  ELSE
    SELECT 'Usuario o canción no existen' AS mensaje;
  END IF;
END //

DELIMITER ;

-- Para usarlo:
CALL sp_registrar_reproduccion(10, 103);</code></pre>
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
  </div>

  <!-- ===================== 14. FUNCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>13. Funciones almacenadas (STORED FUNCTIONS)</h3>
    </div>
    <p>
      Una <strong>función almacenada</strong> se parece a un procedimiento, pero con una diferencia clave:
      siempre <strong>devuelve un valor</strong>, y ese valor se puede usar directo dentro de un
      <code>SELECT</code>, igual que usarías <code>COUNT()</code> o <code>NOW()</code>. Se define con
      <code>CREATE FUNCTION</code> en vez de <code>CREATE PROCEDURE</code>, y no se ejecuta con
      <code>CALL</code>: se llama como cualquier otra función, dentro de una consulta.
    </p>
    <p style="margin-top:1rem;">
      Ejemplo: una función que cuenta cuántas veces se ha reproducido una canción, el mismo cálculo que ya
      hiciste con la subconsulta correlacionada de la sección de Subconsultas, pero empaquetado para
      reutilizarlo:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">22_fn_total_reproducciones.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>CREATE FUNCTION fn_total_reproducciones(p_cancion INT) RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE total INT;
  SELECT COUNT(*) INTO total FROM tbl_reproducciones WHERE id_cancion = p_cancion;
  RETURN total;
END;

-- Se usa dentro de un SELECT, como cualquier otra función:
SELECT titulo, fn_total_reproducciones(id_cancion) AS veces_en_el_log
FROM tbl_canciones;</code></pre>
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
      <table style="border-collapse:collapse; width:100%; font-size:0.82rem;">
        <thead>
          <tr style="background:#232830;">
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Herramienta</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Qué es</th>
            <th style="padding:0.5rem 0.7rem; text-align:left; border-bottom:2px solid var(--border); color:#fff;">Cuándo usarla</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>VIEW</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Un SELECT guardado, se consulta como una tabla</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Reutilizar consultas repetidas, u ocultar columnas sensibles</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>PROCEDURE</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Lógica con nombre, parámetros, varias sentencias</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Encapsular una acción que se repite (registrar una reproducción)</td></tr>
          <tr><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);"><code>FUNCTION</code></td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Como un procedimiento, pero devuelve un valor</td><td style="padding:0.4rem 0.7rem; border-bottom:1px solid var(--border);">Usar el resultado directo dentro de un SELECT</td></tr>
          <tr><td style="padding:0.4rem 0.7rem;"><code>TRIGGER</code></td><td style="padding:0.4rem 0.7rem;">Código que se dispara solo, ante INSERT/UPDATE/DELETE</td><td style="padding:0.4rem 0.7rem;">Mantener datos derivados sincronizados automáticamente (contadores)</td></tr>
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

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow: conexión segura, transacciones y despliegue</h2>

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
        <h4 style="color:#7fa5a3;">Transacciones</h4>
        <p style="font-size:0.85rem;">Agrupar varios cambios en un "todo o nada", para que nunca queden a medias.</p>
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

  <!-- ===================== 1. CONEXIÓN Y SQL INJECTION ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>1. Conexión desde Python y SQL injection</h3>
    </div>
    <p>
      Para que una aplicación use <code>soundflow_db</code>, el código (en este caso, Python) tiene que
      conectarse a MySQL. La librería más común es <code>mysql-connector-python</code> (también existe
      <code>pymysql</code>, funciona muy parecido).
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">conexion_basica.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>import mysql.connector

conexion = mysql.connector.connect(
    host="localhost",
    user="app_soundflow",
    password="********",
    database="soundflow_db"
)
cursor = conexion.cursor()
cursor.execute("SELECT titulo FROM tbl_canciones WHERE genero = 'Pop'")
resultados = cursor.fetchall()
for fila in resultados:
    print(fila)

cursor.close()
conexion.close()</code></pre>
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
        <code>Pop' OR '1'='1</code>, el texto final que le llega a MySQL queda así:
      </p>
      <div class="sql" style="margin-top:0.5rem;">SELECT titulo FROM tbl_canciones WHERE genero = 'Pop' OR '1'='1'</div>
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
        Si alguien escribe como usuario <code>admin' -- </code> (con espacio al final), la consulta queda:
      </p>
      <div class="sql" style="margin-top:0.5rem;">SELECT * FROM tbl_usuarios WHERE nombre = 'admin' -- ' AND password_hash = '...'</div>
      <p style="margin:0.6rem 0 0;">
        En SQL, <code>--</code> inicia un comentario: todo lo que sigue en esa línea se ignora. La
        verificación de la contraseña <strong>nunca se ejecuta</strong>, y quien escribió esto entraría como
        "admin" sin saber ninguna clave.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>La solución: consultas parametrizadas.</strong> En vez de insertar
    el valor dentro del texto del SQL, se deja un marcador <code>%s</code> y el valor se pasa aparte:</p>
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
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Con esta forma, el driver de MySQL le manda a la base de datos el SQL y el valor
        <strong>por separado</strong>. Sin importar qué escriba el usuario, incluso
        <code>Pop' OR '1'='1</code>, se trata siempre como un simple texto a buscar, nunca como parte de la
        sintaxis SQL. Esta es la regla de oro: <strong>nunca construir SQL concatenando o con f-strings
        valores que vienen del usuario</strong>; siempre usar parámetros (<code>%s</code>, o
        <code>?</code> según la librería).
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Esto conecta con lo que ya viste: una consulta parametrizada es la <strong>primera línea de
        defensa</strong>. Una vista como <code>vista_usuarios_publica</code> (Clase 1) es una segunda capa:
        aunque algo fallara, esa vista ni siquiera expone <code>password_hash</code>. Ninguna de las dos
        reemplaza a la otra; una app segura de verdad usa ambas.
      </p>
    </div>

    <p style="margin-top:1rem;">
      El mismo riesgo aparece en un <code>INSERT</code>, no solo en un <code>SELECT</code>. Por ejemplo, al
      guardar una canción nueva (como hace <code>soundflow_app</code>), la versión insegura concatenaría los
      valores del formulario directo en el texto del SQL:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">insert_vulnerable.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>titulo = request.form["titulo"]
genero = request.form["genero"]
query = (
    f"INSERT INTO tbl_canciones (titulo, genero, duracion_seg, reproducciones, id_album) "
    f"VALUES ('{titulo}', '{genero}', {duracion_seg}, 0, {id_album})"
)
cursor.execute(query)</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Si alguien escribe como título <code>Cancion', 'Pop', 999, 999999, 1) -- </code> (con espacio al
        final), la consulta que le llega a MySQL queda:
      </p>
      <div class="sql" style="margin-top:0.5rem;">INSERT INTO tbl_canciones (titulo, genero, duracion_seg, reproducciones, id_album) VALUES ('Cancion', 'Pop', 999, 999999, 1) -- ', 'Rock', 200, 0, 3)</div>
      <p style="margin:0.6rem 0 0;">
        La comilla del atacante cierra el valor de <code>titulo</code> antes de tiempo, y desde ahí escribe
        él mismo el resto de los valores como si fueran parte legítima de la consulta; el <code>--</code>
        final comenta lo que sobra. Así logra fijar <code>reproducciones</code> en <code>999999</code>, un
        valor que el formulario ni siquiera pide, porque el código lo fija en <code>0</code> a propósito.
      </p>
    </div>

    <p style="margin-top:1rem;">La solución es la misma de siempre: parámetros, nunca f-strings, también en
    <code>INSERT</code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">insert_seguro.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>cursor.execute(
    "INSERT INTO tbl_canciones (titulo, genero, duracion_seg, reproducciones, id_album) "
    "VALUES (%s, %s, %s, 0, %s)",
    (titulo, genero, duracion_seg, id_album)
)</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Con <code>%s</code>, la comilla dentro de <code>titulo</code> se trata como un simple carácter de
        texto: MySQL la escapa automáticamente. El título guardado sería literalmente el texto raro que
        escribió el atacante, pero <code>reproducciones</code> sigue quedando en <code>0</code>, exactamente
        como el código lo define. Este es el mismo patrón que usa <code>soundflow_app</code> (el prototipo
        de esta clase) en sus 4 consultas: verificación de correo, registro, login e inserción de canciones.
      </p>
    </div>
  </div>

  <!-- ===================== 2. TRANSACCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. Transacciones (COMMIT / ROLLBACK)</h3>
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
      <pre><code>START TRANSACTION;

INSERT INTO tbl_reproducciones (id_usuario, id_cancion) VALUES (6, 108);
INSERT INTO tbl_reproducciones (id_usuario, id_cancion) VALUES (7, 999); -- id_cancion 999 no existe

-- Esta segunda sentencia falla: viola la FK hacia tbl_canciones.
-- Si ya hubieras insertado algo antes en esta misma transacción y quieres deshacer todo:
ROLLBACK;

-- Si en cambio las dos sentencias hubieran salido bien, confirmarías con:
-- COMMIT;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Sin la transacción, la primera fila (usuario 6) se habría quedado insertada aunque la segunda
        fallara, dejando los datos a medias. Con <code>START TRANSACTION</code> ... <code>ROLLBACK</code>,
        puedes deshacer también la primera, para que no quede un cambio "huérfano" de una operación que en
        conjunto no se completó. También existe <code>SAVEPOINT</code>, para marcar un punto intermedio y
        poder deshacer solo una parte de la transacción, no todo desde el inicio.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Nota:</strong> esto es la sintaxis SQL de transacciones para bases de datos
        <strong>relacionales</strong>. En la Semana 7 van a profundizar en las propiedades ACID a nivel
        conceptual y de arquitectura (incluyendo cómo se manejan, o no, en sistemas NoSQL), pero el
        <code>START TRANSACTION</code> / <code>COMMIT</code> / <code>ROLLBACK</code> que necesitas para
        MySQL ya lo viste aquí.
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

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        El archivo <code>.env</code> es el mismo principio de seguridad que ya viste con las consultas
        parametrizadas: la contraseña real de la base de datos nunca queda escrita dentro de
        <code>app.py</code>. El código solo referencia el <em>nombre</em> de la variable, por ejemplo
        <code>DB_PASSWORD</code>; el valor real se configura aparte, en un archivo que no se sube a GitHub.
        Cuando más adelante quieras desplegar en un servidor accesible desde internet, el mismo archivo
        <code>.env</code> se traduce directamente en variables de entorno configuradas en el panel del
        servicio que uses: la lógica no cambia, solo dónde vive el valor.
      </p>
    </div>
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
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        SoundFlow eligió un modelo <strong>relacional</strong> (MySQL) porque sus datos tienen relaciones
        muy claras (artista → álbum → canción, usuario → reproducción) y necesita integridad referencial:
        no debería poder existir una reproducción de una canción que no existe, por ejemplo. Eso es
        justamente lo que las <code>FOREIGN KEY</code> garantizan.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Pero si SoundFlow quisiera registrar, en tiempo real, cada segundo exacto en que un usuario mueve
        la barra de reproducción (millones de eventos por minuto, sin relaciones complejas entre ellos),
        probablemente no usaría solo MySQL para eso: complementaría con una tecnología distinta, pensada
        para volúmenes así. De eso trata precisamente NoSQL, que van a ver a fondo en la Semana 7: no es
        que una tecnología sea mejor que la otra, sino que cada una responde a necesidades distintas.
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
