// Contenido enriquecido de la Semana 4: Bases de datos NoSQL y MongoDB.
// Sigue el mismo patrón que semana-01.js / semana-02.js / semana-03.js:
// variables globales window.WEEK_CONTENT_4_1 (y _2 cuando exista), leídas por semana.html.

window.WEEK_CONTENT_4_1 = `
  <!-- ===================== 0. POR QUÉ NOSQL ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>¿Por qué NoSQL?</h3>
    </div>

    <div class="content-box" style="border-left:4px solid #6f9d7c;">
      <p style="margin:0 0 0.5rem;"><strong>¿Por qué surgieron estas bases de datos?</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Grandes volúmenes de datos que crecen todo el tiempo, como el big data de las redes sociales</li>
        <li>Contenidos dinámicos y cambiantes, típicos de las redes sociales</li>
        <li>Necesidad de documentos flexibles, que no siempre tienen los mismos campos</li>
        <li>Alta popularidad y adopción en la industria actual</li>
        <li>Bases de datos documentales pensadas para escalar fácilmente</li>
        <li>Interacción continua de los usuarios con la aplicación</li>
        <li>Picos abruptos en la creación de información</li>
        <li>Demandas altas de solicitudes simultáneas</li>
        <li>Múltiples usuarios interactuando al mismo tiempo</li>
        <li>Videojuegos que usan modelos no relacionales</li>
        <li>Dispositivos de internet de las cosas que generan datos constantemente</li>
      </ul>
    </div>

    <p style="margin-top:1rem;">
      Hasta ahora, todo lo que hizo <code>SoundFlow</code> vivió en MySQL: tablas fijas, columnas
      definidas de antemano, relaciones entre tablas con <code>FOREIGN KEY</code>. Eso funciona muy bien
      cuando los datos son <strong>predecibles</strong>, un usuario siempre tiene nombre, correo y
      contraseña, y el volumen es manejable. Pero una plataforma de streaming real también genera otro
      tipo de datos: millones de eventos por minuto, cada "play", cada error, cada clic, perfiles de
      artistas con información que varía muchísimo de uno a otro, redes sociales, premios, listas que
      pueden crecer sin límite. Ahí es donde MySQL empieza a quedarse corto, y aparecen las bases de datos
      <strong>NoSQL</strong>.
    </p>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <p style="margin:0;">
        <strong>El problema real: el incremento de información.</strong> Cada año, las aplicaciones
        generan más datos, más rápido, y de formas menos predecibles, texto libre, imágenes, listas de
        tamaño variable, eventos con estructuras distintas entre sí. Guardar todo eso en tablas rígidas,
        donde cada fila debe tener exactamente las mismas columnas, se vuelve incómodo y lento de mantener.
      </p>
    </div>

    <p style="margin-top:1rem;">
      La respuesta de las bases de datos relacionales a "necesito más capacidad" siempre fue
      <strong>escalar verticalmente</strong>: comprarle a tu único servidor más RAM, más procesador, un
      disco más rápido. Funciona, pero tiene un límite físico y se vuelve carísimo. Las bases de datos
      NoSQL, en cambio, están pensadas desde el diseño para <strong>escalar horizontalmente</strong>:
      en vez de un servidor más grande, agregas más servidores, nodos, que trabajan juntos, repartiéndose
      los datos y la carga entre todos.
    </p>

    <div style="max-width:640px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 640 228" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%; height:auto; display:block; margin:0 auto;">
        <text x="150" y="24" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14.5" font-weight="700" fill="var(--text)">Escalamiento vertical</text>
        <rect x="95" y="120" width="110" height="60" rx="8" fill="#ffffff" stroke="#c99a4e" stroke-width="1.5"/>
        <rect x="105" y="70" width="90" height="45" rx="8" fill="#ffffff" stroke="#c99a4e" stroke-width="1.5" opacity="0.85"/>
        <rect x="115" y="40" width="70" height="25" rx="8" fill="#ffffff" stroke="#c99a4e" stroke-width="1.5" opacity="0.7"/>
        <text x="150" y="156" text-anchor="middle" font-family="Consolas, monospace" font-size="11.5" fill="#33404f">1 servidor</text>
        <text x="150" y="196" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" fill="var(--text-dim)">más RAM, más CPU, más disco...</text>

        <line x1="320" y1="30" x2="320" y2="190" stroke="var(--border)" stroke-width="1"/>

        <text x="480" y="24" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14.5" font-weight="700" fill="var(--text)">Escalamiento horizontal</text>
        <rect x="380" y="120" width="70" height="55" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="415" y="152" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Nodo 1</text>
        <rect x="465" y="120" width="70" height="55" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="500" y="152" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Nodo 2</text>
        <rect x="550" y="120" width="70" height="55" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="585" y="152" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#33404f">Nodo 3</text>
        <line x1="450" y1="147" x2="465" y2="147" stroke="#6f9d7c" stroke-width="1.5"/>
        <line x1="535" y1="147" x2="550" y2="147" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="500" y="196" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" fill="var(--text-dim)">más servidores trabajando juntos</text>
        <text x="500" y="214" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">cada nodo con su propia RAM, CPU y disco</text>
      </svg>
    </div>

    <p style="margin-top:1.2rem;">
      Otra diferencia grande está en el <strong>formato</strong>. En vez de filas y columnas, muchas bases
      NoSQL guardan la información como <strong>JSON</strong>, o su versión binaria, <strong>BSON</strong>:
      un formato de texto con llaves y valores, que puede anidar objetos dentro de objetos y listas dentro
      de listas, sin necesidad de definir una estructura fija de antemano.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>¿Qué es JSON?</strong> JSON, <em>JavaScript Object Notation</em>, es un formato de texto
        para representar datos, pensado para que tanto una persona como un programa lo lean fácilmente.
      </p>
      <p style="margin:0.8rem 0 0;">
        Se arma con dos ideas nada más: pares de <strong>llave y valor</strong>, como en un diccionario, la
        llave <code>"nombre"</code> apunta al valor <code>"Karol G"</code>, y agrupaciones, un objeto entre
        llaves <code>{ }</code> junta varios pares, y una lista entre corchetes <code>[ ]</code> junta
        varios valores.
      </p>
    </div>

    <div style="max-width:300px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 285 175" xmlns="http://www.w3.org/2000/svg" style="max-width:300px; width:100%; height:auto; display:block; margin:0 auto;">
        <text x="30" y="45" font-family="Consolas, monospace" font-size="17" fill="var(--text)">{</text>
        <text x="48" y="45" font-family="Consolas, monospace" font-size="17" fill="#0f6b5c" font-weight="700">"nombre"</text>
        <text x="140" y="45" font-family="Consolas, monospace" font-size="17" fill="var(--text)">:</text>
        <text x="155" y="45" font-family="Consolas, monospace" font-size="17" fill="#a2270f" font-weight="700">"Karol G"</text>
        <text x="255" y="45" font-family="Consolas, monospace" font-size="17" fill="var(--text)">}</text>

        <line x1="88" y1="55" x2="88" y2="85" stroke="#0f6b5c" stroke-width="1.3"/>
        <text x="88" y="101" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" fill="#0f6b5c">llave (key)</text>

        <line x1="198" y1="55" x2="198" y2="85" stroke="#a2270f" stroke-width="1.3"/>
        <text x="198" y="101" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" fill="#a2270f">valor (value)</text>

        <line x1="30" y1="55" x2="30" y2="130" stroke="var(--text-dim)" stroke-width="1.3"/>
        <line x1="255" y1="55" x2="255" y2="130" stroke="var(--text-dim)" stroke-width="1.3"/>
        <line x1="30" y1="130" x2="255" y2="130" stroke="var(--text-dim)" stroke-width="1.3" stroke-dasharray="3 3"/>
        <text x="142" y="150" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" fill="var(--text-dim)">llaves { } agrupan los pares de un objeto</text>
      </svg>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.4rem;">
        Un objeto puede tener varios pares, separados por comas, y un valor puede ser otro objeto o una
        lista entre corchetes <code>[ ]</code>, como en el ejemplo de abajo.
      </p>
    </div>

    <p style="margin-top:1.2rem;">
      Varios de estos documentos JSON, agrupados, forman una <strong>colección</strong>, y varias
      colecciones forman una <strong>base de datos</strong>:
    </p>
    <div style="max-width:620px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 620 285" xmlns="http://www.w3.org/2000/svg" style="max-width:620px; width:100%; height:auto; display:block; margin:0 auto;">
        <ellipse cx="310" cy="28" rx="100" ry="14" fill="#eef4f9" stroke="#4a7c9e" stroke-width="1.5"/>
        <path d="M210 28v36c0 7.7 44.8 14 100 14s100-6.3 100-14V28" fill="#eef4f9" stroke="#4a7c9e" stroke-width="1.5"/>
        <text x="310" y="33" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#33404f">soundflow_nosql</text>
        <text x="310" y="74" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="var(--text-dim)">base de datos</text>

        <line x1="310" y1="80" x2="310" y2="104" stroke="#6f9d7c" stroke-width="1.5"/>

        <rect x="240" y="104" width="140" height="42" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="310" y="125" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#33404f">canciones</text>
        <text x="310" y="139" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="var(--text-dim)">colección</text>

        <line x1="310" y1="146" x2="110" y2="172" stroke="var(--text-dim)" stroke-width="1.2"/>
        <line x1="310" y1="146" x2="310" y2="172" stroke="var(--text-dim)" stroke-width="1.2"/>
        <line x1="310" y1="146" x2="510" y2="172" stroke="var(--text-dim)" stroke-width="1.2"/>

        <rect x="25" y="172" width="170" height="96" rx="8" fill="#f7faf8" stroke="#6f9d7c" stroke-width="1.3"/>
        <text x="40" y="190" font-family="Consolas, monospace" font-size="10.5" fill="var(--text)">{</text>
        <text x="52" y="204" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"titulo"</tspan><tspan fill="var(--text)">: </tspan><tspan fill="#a2270f">"Tusa"</tspan></text>
        <text x="52" y="218" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"artista"</tspan><tspan fill="var(--text)">: </tspan><tspan fill="#a2270f">"Karol G"</tspan></text>
        <text x="52" y="232" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"reproducciones"</tspan><tspan fill="var(--text)">:</tspan></text>
        <text x="52" y="246" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0b5fa5">950000</tspan></text>
        <text x="40" y="260" font-family="Consolas, monospace" font-size="10.5" fill="var(--text)">}</text>

        <rect x="225" y="172" width="170" height="96" rx="8" fill="#f7faf8" stroke="#6f9d7c" stroke-width="1.3"/>
        <text x="240" y="190" font-family="Consolas, monospace" font-size="10.5" fill="var(--text)">{</text>
        <text x="252" y="204" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"titulo"</tspan><tspan fill="var(--text)">: </tspan><tspan fill="#a2270f">"Provenza"</tspan></text>
        <text x="252" y="218" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"duracion_seg"</tspan><tspan fill="var(--text)">:</tspan></text>
        <text x="252" y="232" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0b5fa5">195</tspan></text>
        <text x="240" y="248" font-family="Consolas, monospace" font-size="10.5" fill="var(--text)">}</text>
        <text x="252" y="262" font-family="Segoe UI, sans-serif" font-size="8.5" fill="var(--text-dim)" font-style="italic">(sin "artista")</text>

        <rect x="425" y="172" width="170" height="96" rx="8" fill="#f7faf8" stroke="#6f9d7c" stroke-width="1.3"/>
        <text x="440" y="190" font-family="Consolas, monospace" font-size="10.5" fill="var(--text)">{</text>
        <text x="452" y="204" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"titulo"</tspan><tspan fill="var(--text)">: </tspan><tspan fill="#a2270f">"Ojitos Lindos"</tspan></text>
        <text x="452" y="218" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"artista"</tspan><tspan fill="var(--text)">: </tspan><tspan fill="#a2270f">"Bad Bunny"</tspan></text>
        <text x="452" y="232" font-family="Consolas, monospace" font-size="9.2"><tspan fill="#0f6b5c">"destacada"</tspan><tspan fill="var(--text)">: </tspan><tspan fill="#7c3aed">true</tspan></text>
        <text x="440" y="246" font-family="Consolas, monospace" font-size="10.5" fill="var(--text)">}</text>
      </svg>
    </div>

    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">ejemplo.json</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{
  <span class="code-key">"nombre"</span>: <span class="code-str">"Karol G"</span>,
  <span class="code-key">"genero_principal"</span>: <span class="code-str">"Reggaeton"</span>,
  <span class="code-key">"redes_sociales"</span>: {
    <span class="code-key">"instagram"</span>: <span class="code-str">"@karolg"</span>,
    <span class="code-key">"tiktok"</span>: <span class="code-str">"@karolg"</span>
  },
  <span class="code-key">"premios"</span>: [<span class="code-str">"Grammy Latino 2023"</span>, <span class="code-str">"Billboard Music Award"</span>]
}</code></pre>
    </div>

    <p style="margin-top:1.2rem;">
      "NoSQL" no es una sola tecnología: es una familia con varios <strong>modelos</strong> distintos,
      cada uno pensado para un tipo de problema diferente.
    </p>

    <div style="max-width:680px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style="max-width:680px; width:100%; height:auto; display:block; margin:0 auto;">
        <!-- Documentos -->
        <rect x="10" y="15" width="150" height="160" rx="10" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <rect x="30" y="35" width="110" height="70" rx="4" fill="#eef4f9" stroke="#4a7c9e" stroke-width="1"/>
        <text x="85" y="52" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#4a7c9e">{ "a": 1,</text>
        <text x="85" y="64" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#4a7c9e">"b": [2,3] }</text>
        <text x="85" y="125" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#33404f">Documentos</text>
        <text x="85" y="145" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">JSON, MongoDB</text>

        <!-- Grafos -->
        <rect x="175" y="15" width="150" height="160" rx="10" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.5"/>
        <circle cx="220" cy="55" r="10" fill="#eee9f7" stroke="#8b7fb8" stroke-width="1.2"/>
        <circle cx="265" cy="45" r="10" fill="#eee9f7" stroke="#8b7fb8" stroke-width="1.2"/>
        <circle cx="255" cy="85" r="10" fill="#eee9f7" stroke="#8b7fb8" stroke-width="1.2"/>
        <line x1="228" y1="50" x2="257" y2="47" stroke="#8b7fb8" stroke-width="1.2"/>
        <line x1="223" y1="64" x2="249" y2="80" stroke="#8b7fb8" stroke-width="1.2"/>
        <line x1="262" y1="55" x2="258" y2="75" stroke="#8b7fb8" stroke-width="1.2"/>
        <text x="250" y="125" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#33404f">Grafos</text>
        <text x="250" y="145" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">nodos y arcos</text>

        <!-- Clave-valor -->
        <rect x="340" y="15" width="150" height="160" rx="10" fill="#ffffff" stroke="#c99a4e" stroke-width="1.5"/>
        <rect x="360" y="40" width="45" height="22" rx="3" fill="#faf3e6" stroke="#c99a4e" stroke-width="1"/>
        <text x="382" y="55" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#c99a4e">key</text>
        <text x="412" y="55" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12.5" fill="#c99a4e">&#8594;</text>
        <rect x="425" y="40" width="45" height="22" rx="3" fill="#faf3e6" stroke="#c99a4e" stroke-width="1"/>
        <text x="447" y="55" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#c99a4e">valor</text>
        <text x="415" y="125" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#33404f">Clave-valor</text>
        <text x="415" y="145" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">como un diccionario</text>

        <!-- Columnas -->
        <rect x="505" y="15" width="165" height="160" rx="10" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
        <rect x="525" y="35" width="18" height="70" fill="#e9f2f1" stroke="#7fa5a3" stroke-width="1"/>
        <rect x="547" y="35" width="18" height="50" fill="#e9f2f1" stroke="#7fa5a3" stroke-width="1"/>
        <rect x="569" y="35" width="18" height="60" fill="#e9f2f1" stroke="#7fa5a3" stroke-width="1"/>
        <rect x="591" y="35" width="18" height="40" fill="#e9f2f1" stroke="#7fa5a3" stroke-width="1"/>
        <text x="587" y="125" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#33404f">Columnas</text>
        <text x="587" y="145" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">familias de columnas</text>
      </svg>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Documentos</strong>, <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">MongoDB</span>, <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">CouchDB</span>: cada registro es un documento JSON/BSON, con su
        propia forma.
        <br><br>
        <em style="color:#4a7c9e; font-style:normal; font-weight:700;">Se usa cuando:</em> los registros tienen forma variable o cambian con el tiempo,
        y necesitas consultar por cualquier campo interno, perfiles de usuario, catálogos de productos.
        <br><br>
        <em style="color:#c99a4e; font-style:normal; font-weight:700;">Quién la usa:</em> eBay y Forbes, entre otros, para catálogos de contenido con atributos
        variables.
      </p>
      <p style="margin:0.8rem 0 0;">
        <strong>Grafos</strong>, <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">Neo4j</span>: los datos se guardan como <strong>nodos</strong>,
        entidades, por ejemplo "usuario" o "canción", conectados por <strong>arcos</strong>, las
        relaciones entre ellos, por ejemplo "sigue a" o "reprodujo", ideal para redes muy conectadas.
        <br><br>
        <em style="color:#4a7c9e; font-style:normal; font-weight:700;">Se usa cuando:</em> lo importante son las conexiones entre los datos, redes sociales,
        recomendaciones, detección de comunidades.
        <br><br>
        <em style="color:#c99a4e; font-style:normal; font-weight:700;">Quién la usa:</em> es el mismo tipo de idea detrás del grafo social de Facebook y LinkedIn,
        quién sigue a quién, amigos en común, recomendaciones de conexiones.
      </p>
      <p style="margin:0.8rem 0 0;">
        <strong>Clave-valor</strong>, <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">Redis</span>: cada dato se guarda y se busca por una llave única, como un
        diccionario gigante, pensado para lecturas ultra rápidas.
        <br><br>
        <em style="color:#4a7c9e; font-style:normal; font-weight:700;">Se usa cuando:</em> necesitas leer o
        escribir muchísimas veces por segundo, sin relaciones complejas, caché, sesiones, contadores en
        tiempo real, rankings.
        <br><br>
        <em style="color:#c99a4e; font-style:normal; font-weight:700;">Quién la usa:</em> Twitter, GitHub y Pinterest, entre otros, para caché y datos de acceso
        ultra frecuente.
      </p>
      <p style="margin:0.8rem 0 0;">
        <strong>Columnas</strong>, <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">Cassandra</span>:
        agrupa los datos por columnas en vez de por filas, pensado para escribir y leer volúmenes enormes
        de datos distribuidos en muchos servidores.
        <br><br>
        <em style="color:#4a7c9e; font-style:normal; font-weight:700;">Se usa cuando:</em> el volumen de escritura es
        masivo y distribuido, métricas de series de tiempo, telemetría de sensores, logs a gran escala.
        <br><br>
        <em style="color:#c99a4e; font-style:normal; font-weight:700;">Quién la usa:</em> Netflix e Instagram, entre otros, para volúmenes de datos a escala masiva.
      </p>
    </div>
  </div>

  <!-- ===================== 1. QUÉ ES MONGODB ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>1. ¿Qué es MongoDB?</h3>
    </div>
    <p>
      <strong>MongoDB</strong> es una base de datos <strong>documental</strong>: en vez de tablas con filas
      y columnas fijas, guarda la información como <strong>documentos JSON</strong>, internamente, en un
      formato binario llamado <strong>BSON</strong>, que es más eficiente para MongoDB de leer y escribir,
      pero se ve y se comporta igual que JSON desde tu punto de vista. Los documentos se agrupan en
      <strong>colecciones</strong>, que son el equivalente a las tablas, con una diferencia clave: dos
      documentos de la misma colección <strong>no tienen que tener los mismos campos</strong>.
    </p>

    <div style="max-width:660px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" style="max-width:660px; width:100%; height:auto; display:block; margin:0 auto;">
        <text x="150" y="24" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14.5" font-weight="700" fill="var(--text)">MySQL: tabla</text>
        <rect x="20" y="40" width="260" height="150" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <rect x="20" y="40" width="260" height="26" fill="#4a7c9e"/>
        <text x="65" y="58" text-anchor="middle" fill="#fff" font-family="Consolas, monospace" font-size="10.5" font-weight="700">nombre</text>
        <text x="150" y="58" text-anchor="middle" fill="#fff" font-family="Consolas, monospace" font-size="10.5" font-weight="700">genero</text>
        <text x="235" y="58" text-anchor="middle" fill="#fff" font-family="Consolas, monospace" font-size="10.5" font-weight="700">pais</text>
        <line x1="110" y1="40" x2="110" y2="190" stroke="#4a7c9e" stroke-width="1"/>
        <line x1="190" y1="40" x2="190" y2="190" stroke="#4a7c9e" stroke-width="1"/>
        <line x1="20" y1="98" x2="280" y2="98" stroke="#4a7c9e" stroke-width="0.7" opacity="0.5"/>
        <line x1="20" y1="130" x2="280" y2="130" stroke="#4a7c9e" stroke-width="0.7" opacity="0.5"/>
        <line x1="20" y1="162" x2="280" y2="162" stroke="#4a7c9e" stroke-width="0.7" opacity="0.5"/>
        <text x="65" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#33404f">Karol G</text>
        <text x="150" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#33404f">Reggaeton</text>
        <text x="235" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#33404f">Colombia</text>
        <text x="65" y="116" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#33404f">Shakira</text>
        <text x="150" y="116" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#33404f">Pop</text>
        <text x="235" y="116" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#a83a3a">NULL</text>
        <text x="150" y="180" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">columnas fijas para todas las filas</text>

        <line x1="330" y1="30" x2="330" y2="210" stroke="var(--border)" stroke-width="1"/>

        <text x="500" y="24" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14.5" font-weight="700" fill="var(--text)">MongoDB: colección</text>
        <rect x="380" y="40" width="130" height="150" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="445" y="60" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">{ nombre: "Karol G",</text>
        <text x="445" y="72" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">genero: "Reggaeton",</text>
        <text x="445" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">redes: {...},</text>
        <text x="445" y="96" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">premios: [...] }</text>

        <rect x="520" y="40" width="130" height="150" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="585" y="60" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">{ nombre: "Shakira",</text>
        <text x="585" y="72" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">genero: "Pop",</text>
        <text x="585" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">biografia: "..." }</text>
        <text x="515" y="205" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">cada documento puede tener campos distintos</text>
      </svg>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Diferencia: en MySQL, si Shakira no tiene "país" registrado, esa celda queda en
        <code>NULL</code>, pero la columna <code>pais</code> existe igual para todas las filas. En
        MongoDB, si un documento no necesita un campo, <strong>simplemente no lo tiene</strong>: el
        documento de Karol G puede traer <code>redes_sociales</code> y <code>premios</code>, mientras que
        el de Shakira solo trae <code>biografia</code>, sin que eso rompa nada. Esto se llama un esquema
        <strong>flexible</strong>, o polimórfico, y lo vas a practicar más adelante en esta clase.
      </p>
    </div>

    <p style="margin-top:1rem;">
      MongoDB también escala horizontalmente de forma nativa: cuando una sola colección crece demasiado
      para un solo servidor, MongoDB puede repartir, <strong>"shardear"</strong>, los documentos entre
      varios servidores automáticamente, y un componente llamado <code>mongos</code> se encarga de dirigir
      cada consulta al servidor correcto, sin que la aplicación tenga que saber en cuál está guardado cada
      documento.
    </p>
  </div>

  <!-- ===================== 2. INSTALACIÓN: COMMUNITY SERVER + COMPASS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. Instalación y configuración: MongoDB Community Server + Compass</h3>
    </div>
    <p>
      Para trabajar con MongoDB necesitas dos piezas: un <strong>servidor</strong> donde vive la base de
      datos, <strong>MongoDB Community Server</strong>, el motor gratuito de MongoDB que instalas en tu
      propia máquina, sin crear ninguna cuenta, y un <strong>cliente visual</strong> para conectarte, ver
      y editar los datos, <strong>MongoDB Compass</strong>.
    </p>

    <div style="max-width:600px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" style="max-width:600px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="230" y="15" width="140" height="70" rx="10" fill="#eef4f9" stroke="#4a7c9e" stroke-width="1.5"/>
        <text x="300" y="42" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#33404f">MongoDB Community</text>
        <text x="300" y="58" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" fill="#4a7c9e">localhost:27017</text>
        <text x="300" y="72" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">en tu equipo</text>

        <line x1="300" y1="85" x2="300" y2="130" stroke="#6f9d7c" stroke-width="1.5"/>

        <rect x="230" y="130" width="140" height="35" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="300" y="152" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" font-weight="700" fill="#33404f">MongoDB Compass</text>
      </svg>
    </div>

    <p style="margin-top:1rem;">Sigue estos pasos, en orden, para dejar tu entorno listo:</p>
    <div style="margin-top:0.6rem; display:flex; flex-direction:column; gap:0.6rem;">
      <div class="content-box" style="border-left:4px solid #4a7c9e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#4a7c9e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">1</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M12 3v10m0 0l-4-4m4 4l4-4" stroke="#4a7c9e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="#4a7c9e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;">Descarga el instalador desde
          <a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noopener">mongodb.com/try/download/community</a>,
          eligiendo tu sistema operativo. No necesitas cuenta para descargarlo.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #4a7c9e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#4a7c9e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">2</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="#4a7c9e" stroke-width="1.8"/>
          <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#4a7c9e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;">Ejecuta el instalador y elige <strong>"Complete"</strong> como tipo de
          instalación.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #4a7c9e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#4a7c9e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">3</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <rect x="3" y="9" width="18" height="6" rx="3" stroke="#4a7c9e" stroke-width="1.8"/>
          <circle cx="16" cy="12" r="2" fill="#4a7c9e"/>
        </svg>
        <p style="margin:0;">Deja marcada la opción de instalar MongoDB como <strong>"Service" de
          Windows</strong>, así arranca solo en segundo plano cada vez que enciendes tu equipo. Marca
          también la casilla para instalar <strong>MongoDB Compass</strong> junto con el servidor.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">4</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <circle cx="12" cy="12" r="9" stroke="#6f9d7c" stroke-width="1.8"/>
          <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;">Al terminar, abre <strong>Compass</strong>: si se conecta sin errores, el
          servidor ya está corriendo.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">5</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M9 7V4M15 7V4M7 9h10v3a5 5 0 0 1-10 0V9z" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 17v3" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <p style="margin:0;">En Compass, dale clic a <strong>"New Connection"</strong>. Va a aparecer ya
          sugerida la conexión local, <code>mongodb://localhost:27017</code>: dale <strong>"Save"</strong>
          para guardarla, y luego <strong>"Connect"</strong>. No necesitas usuario, contraseña, ni
          configurar ningún acceso de red.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">La Connection String de tu servidor local se ve así:</p>
    <div class="sql" style="margin-top:0.5rem;">mongodb://localhost:27017</div>

    <p style="margin-top:1rem;">
      Una vez conectado, prueba que todo funciona creando tu primera base de datos desde Compass:
    </p>

    <div style="margin-top:0.6rem; display:flex; flex-direction:column; gap:0.6rem;">
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">1</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <ellipse cx="12" cy="6" rx="7" ry="3" stroke="#6f9d7c" stroke-width="1.8"/>
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#6f9d7c" stroke-width="1.8"/>
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="#6f9d7c" stroke-width="1.8"/>
        </svg>
        <p style="margin:0;">En la pantalla principal de Compass, dale clic a <strong>"Create
          Database"</strong>.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">2</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="#6f9d7c" stroke-width="1.8"/>
          <path d="M8 9h8M8 13h5" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <p style="margin:0;">En la ventana que aparece, escribe <code><span style="color:#c99a4e; font-size:1.15em; font-weight:700;">soundflow_nosql</span></code> como
          <strong>Database Name</strong> y <code><span style="color:#c99a4e; font-size:1.15em; font-weight:700;">logs</span></code> como <strong>Collection Name</strong>. Compass
          te pide los dos datos desde el inicio para poder crear la base de datos.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">3</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <circle cx="12" cy="12" r="9" stroke="#6f9d7c" stroke-width="1.8"/>
          <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;">Confirma con <strong>"Create Database"</strong>. Ya deberías ver
          <code><span style="color:#c99a4e; font-size:1.15em; font-weight:700;">soundflow_nosql</span></code> en la lista de bases de datos, con la colección <code><span style="color:#c99a4e; font-size:1.15em; font-weight:700;">logs</span></code>
          adentro, todavía vacía.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">4</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M7 3h7l4 4v14H7z" stroke="#6f9d7c" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M11 12h4M13 10v4" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <p style="margin:0;">Entra a la colección <code><span style="color:#c99a4e; font-size:1.15em; font-weight:700;">logs</span></code> y dale clic a <strong>"ADD DATA"</strong>
          &rarr; <strong>"Insert Document"</strong>. Pega este documento de prueba y dale
          <strong>"Insert"</strong>:</p>
      </div>
    </div>

    <div class="code-block nosql" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">documento_ejemplo.json</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{
  <span class="code-key">"evento"</span>: <span class="code-str">"inicio_sesion"</span>,
  <span class="code-key">"usuario_id"</span>: <span class="code-num">101</span>,
  <span class="code-key">"plataforma"</span>: <span class="code-str">"Android"</span>,
  <span class="code-key">"exitoso"</span>: <span class="code-bool">true</span>
}</code></pre>
    </div>
  </div>

  <!-- ===================== 3. DOCUMENTOS Y COLECCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Colecciones y documentos</h3>
    </div>
    <p>
      Un <strong>documento</strong> es la unidad básica de datos en MongoDB: un objeto con pares
      <strong>llave: valor</strong>, escrito en JSON, guardado internamente como BSON. Una
      <strong>colección</strong> es un grupo de documentos, más o menos similares entre sí, guardados
      juntos, el equivalente conceptual a una tabla.
    </p>

    <p style="margin-top:0.8rem;">MongoDB acepta varios tipos de datos dentro de un documento:</p>
    <div class="concept-grid">
      <div class="concept-card">
        <h4>String</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Texto: <code>"Karol G"</code></p>
      </div>
      <div class="concept-card">
        <h4>Number</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Enteros o decimales: <code>101</code>, <code>4.5</code></p>
      </div>
      <div class="concept-card">
        <h4>Boolean</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);"><code>true</code> / <code>false</code></p>
      </div>
      <div class="concept-card">
        <h4>Date</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);"><code>new Date()</code></p>
      </div>
      <div class="concept-card">
        <h4>Array</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Lista de valores: <code>["Voz", "Guitarra"]</code></p>
      </div>
      <div class="concept-card">
        <h4>Objeto anidado</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un documento dentro de otro: <code>{ instagram: "..." }</code></p>
      </div>
    </div>

    <p style="margin-top:1rem;">
      Un solo documento puede combinar todos estos tipos de datos a la vez. Este ejemplo trae los seis
      tipos juntos, listo para pegarlo con <strong>"ADD DATA"</strong> &rarr; <strong>"Insert
      Document"</strong> en Compass:
    </p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">ejemplo_completo.json</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{
  <span class="code-key">"nombre"</span>: <span class="code-str">"Shakira"</span>,
  <span class="code-key">"genero_principal"</span>: <span class="code-str">"Pop"</span>,
  <span class="code-key">"activo"</span>: <span class="code-bool">true</span>,
  <span class="code-key">"reproducciones_totales"</span>: <span class="code-num">3100000</span>,
  <span class="code-key">"fecha_registro"</span>: <span class="code-str">"2023-11-02"</span>,
  <span class="code-key">"premios"</span>: [<span class="code-str">"Grammy 2006"</span>, <span class="code-str">"Grammy Latino 2022"</span>],
  <span class="code-key">"redes_sociales"</span>: {
    <span class="code-key">"instagram"</span>: <span class="code-str">"@shakira"</span>,
    <span class="code-key">"tiktok"</span>: <span class="code-str">"@shakira"</span>
  }
}</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code>"nombre"</code> y <code>"genero_principal"</code> son <strong>String</strong>,
        <code>"activo"</code> es <strong>Boolean</strong>, <code>"reproducciones_totales"</code> es
        <strong>Number</strong>, <code>"premios"</code> es un <strong>Array</strong>, y
        <code>"redes_sociales"</code> es un <strong>objeto anidado</strong>. Para
        <code>"fecha_registro"</code>, Compass te deja escribir el texto y luego cambiar su tipo a
        <strong>Date</strong> con el menú desplegable que aparece junto a cada campo en el editor de
        "Insert Document".
      </p>
    </div>
  </div>

  <!-- ===================== 4. CREAR, LISTAR Y ELIMINAR COLECCIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. Crear, listar y eliminar colecciones</h3>
    </div>
    <p>
      Antes de trabajar con documentos, conviene saber administrar las colecciones mismas: crearlas, ver
      cuáles existen, y borrarlas cuando ya no se necesitan. En Compass, todo esto se hace desde el panel
      lateral de la base de datos, sin escribir ningún comando.
    </p>
    <p style="margin-top:0.8rem;">
      Para esta parte de la clase vamos a usar una colección nueva, de ejemplo, <code>canciones</code>,
      dentro de <code>soundflow_nosql</code>.
    </p>

    <div style="margin-top:0.6rem; display:flex; flex-direction:column; gap:0.6rem;">
      <div class="content-box" style="border-left:4px solid #4a7c9e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#4a7c9e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">1</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <circle cx="12" cy="12" r="9" stroke="#4a7c9e" stroke-width="1.8"/>
          <path d="M12 8v8M8 12h8" stroke="#4a7c9e" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <p style="margin:0;"><strong>Crear:</strong> con <code>soundflow_nosql</code> abierta en Compass,
          dale clic a <strong>"Create collection"</strong>, escribe <code>canciones</code> como
          nombre, y confirma.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #4a7c9e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#4a7c9e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">2</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M4 6h16M4 12h16M4 18h10" stroke="#4a7c9e" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <p style="margin:0;"><strong>Listar:</strong> todas las colecciones de una base de datos aparecen
          en el panel lateral izquierdo de Compass, debajo del nombre de la base de datos.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #c99a4e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#c99a4e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">3</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" stroke="#c99a4e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;"><strong>Eliminar:</strong> pasa el mouse sobre el nombre de la colección en el
          panel lateral, dale clic a los tres puntos, y elige <strong>"Drop Collection"</strong>. Esto
          borra la colección completa, junto con todos sus documentos, sin poder deshacerse.</p>
      </div>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        Es el mismo concepto que <code>CREATE TABLE</code>, ver la lista de tablas, y <code>DROP
        TABLE</code> en MySQL, pero más simple: una colección no necesita columnas, tipos de datos ni
        llaves definidas antes de crearla.
      </p>
    </div>
  </div>

  <!-- ===================== 5. OPERADORES DE COMPARACIÓN Y AGREGACIÓN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. Operadores de comparación y agregación</h3>
    </div>
    <p>
      Antes de armar filtros y actualizaciones más específicas, conviene conocer los operadores de
      comparación de MongoDB. Se escriben con un signo <code>$</code> al inicio y reemplazan el valor
      exacto dentro de un filtro, para pedir mayor que, menor que, igual o distinto.
    </p>

    <p style="margin-top:1.2rem;">Tabla comparativa: el mismo operador, en MongoDB y en MySQL.</p>
    <div style="display:flex; gap:1.2rem; flex-wrap:wrap; margin-top:0.6rem;">
      <div style="flex:1 1 220px; min-width:220px;">
        <p style="margin:0 0 0.3rem; font-weight:700; color:var(--text);">MongoDB</p>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#4a7c9e; color:#fff; border:1px solid var(--border);">Operador</th>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#4a7c9e; color:#fff; border:1px solid var(--border);">Significado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$eq</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Igual</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$ne</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Distinto</td></tr>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$gt</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Mayor que</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$gte</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Mayor o igual que</td></tr>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$lt</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Menor que</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$lte</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Menor o igual que</td></tr>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$in</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Dentro de</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$nin</span></code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No dentro de</td></tr>
          </tbody>
        </table>
      </div>
      <div style="flex:1 1 220px; min-width:220px;">
        <p style="margin:0 0 0.3rem; font-weight:700; color:var(--text);">MySQL</p>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; border:1px solid var(--border);">Operador</th>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; border:1px solid var(--border);">Significado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>=</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Igual</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>!=</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Distinto</td></tr>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>&gt;</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Mayor que</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>&gt;=</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Mayor o igual que</td></tr>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>&lt;</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Menor que</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>&lt;=</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Menor o igual que</td></tr>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>IN</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Dentro de</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>NOT IN</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">No dentro de</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.5rem;">
      <code><span style="color:#e24b4a; font-weight:700;">$in</span></code> y <code><span style="color:#e24b4a; font-weight:700;">$nin</span></code> se ven con más detalle, con ejemplos, en la sección de consultas avanzadas.
    </p>

    <p style="margin-top:1.2rem;">Ejemplos, todos sobre la colección <code>canciones</code>:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">01_operadores_comparacion.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Canciones con más de 900.000 reproducciones</span>
{ <span class="code-key">reproducciones</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$gt</span>: <span class="code-num">900000</span> } }

<span class="code-com">// Canciones con menos de 500.000 reproducciones</span>
{ <span class="code-key">reproducciones</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$lt</span>: <span class="code-num">500000</span> } }

<span class="code-com">// Canciones que NO son de Reggaeton</span>
{ <span class="code-key">genero</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$ne</span>: <span class="code-str">"Reggaeton"</span> } }</code></pre>
    </div>

    <h4 style="color:#6f9d7c; font-size:1rem; margin:2.2rem 0 0.4rem;">Framework de agregación</h4>
    <p style="margin-top:0;">
      Cuando ya no basta con filtrar documentos, sino que hay que <strong>transformar</strong> los datos,
      agrupar, resumir, calcular totales o promedios, MongoDB usa el <strong>framework de agregación</strong>:
      una tubería, <em>pipeline</em>, de etapas que se aplican una tras otra sobre los documentos.
    </p>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">¿Qué es un pipeline?</h4>
    <div class="content-box" style="margin-top:0.4rem;">
      <p style="margin:0;">
        Literalmente, una tubería: los documentos entran por un extremo y salen transformados por el otro,
        pasando por una fila de etapas en un orden fijo. Cada etapa recibe exactamente lo que dejó la etapa
        anterior, lo transforma a su manera, y se lo entrega a la siguiente, como una línea de producción en
        una fábrica. No hay saltos ni retrocesos: si una etapa reduce los documentos de 8 a 4, la siguiente
        etapa arranca ya con esos 4, nunca con los 8 originales. En un pipeline, las etapas van encadenadas
        una después de la otra, no una dentro de otra.
      </p>
    </div>

    <p style="margin-top:1.2rem;">Tabla comparativa: cada etapa del pipeline, y su equivalente en SQL.</p>
    <table style="width:100%; max-width:640px; border-collapse:collapse; font-size:0.85rem; margin:0.6rem auto 0;">
      <thead>
        <tr>
          <th style="text-align:left; padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; border:1px solid var(--border);">Etapa MongoDB</th>
          <th style="text-align:left; padding:0.4rem 0.6rem; background:#6f9d7c; color:#fff; border:1px solid var(--border);">Significado</th>
          <th style="text-align:left; padding:0.4rem 0.6rem; background:#4a7c9e; color:#fff; border:1px solid var(--border);">Equivalente en SQL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$match</span></code></td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Filtra documentos, igual que <code>find</code>. Suele ser la primera etapa.</td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>WHERE</code></td>
        </tr>
        <tr style="background:var(--bg);">
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$group</span></code></td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Agrupa documentos por un campo y calcula un resumen por cada grupo.</td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>GROUP BY</code> + <code>SUM</code>/<code>AVG</code>/<code>COUNT</code></td>
        </tr>
        <tr>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$sort</span></code></td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Ordena los documentos resultantes, ascendente o descendente.</td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>ORDER BY</code></td>
        </tr>
        <tr style="background:var(--bg);">
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code><span style="color:#e24b4a; font-weight:700;">$project</span></code></td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Elige y renombra qué campos quedan en el resultado final.</td>
          <td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>SELECT</code> (columnas)</td>
        </tr>
      </tbody>
    </table>

    <p style="margin-top:1rem;">
      Dentro de <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$group</span></code> se usan operadores acumuladores para resumir los valores de cada grupo:
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>$sum</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Suma los valores de un campo dentro
          de cada grupo.</p>
      </div>
      <div class="concept-card">
        <h4>$avg</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Calcula el promedio de un campo
          dentro de cada grupo.</p>
      </div>
      <div class="concept-card">
        <h4>$push</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Junta los valores de un campo en un
          array, sin eliminar duplicados.</p>
      </div>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        <strong>Nota:</strong> para usar estas funciones lo haremos desde la opción <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">"Aggregations"</span>, agregando
        cada etapa con el botón <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">"Add Stage"</span>.
      </p>
    </div>

    <p style="margin-top:1rem;">
      <strong>Ejemplo:</strong> recorrer un pipeline sobre <code>canciones</code>, donde queremos el total
      de reproducciones de las canciones de <strong>Reggaeton</strong>, agrupadas por género y ordenadas de
      mayor a menor, mostrando solo el género y ese total.
    </p>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Así se recorre el pipeline, paso a paso:</strong></p>
      <ol style="margin:0; padding-left:1.2rem; font-size:0.9rem;">
        <li style="margin-bottom:0.4rem;">
          Entran las <strong>12 canciones</strong> de la colección <code>canciones</code>.
          <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$match</span></code>
          filtra y deja pasar solo las <strong>9</strong> que son de Reggaeton.
        </li>
        <li style="margin-bottom:0.4rem;">
          Esas 9 canciones llegan a <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$group</span></code>,
          que las junta en <strong>1 solo documento</strong> por género y suma sus reproducciones:
          <code>total_reproducciones: 9120000</code>.
        </li>
        <li style="margin-bottom:0.4rem;">
          Ese documento pasa por <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$sort</span></code>,
          que ordena de mayor a menor.
        </li>
        <li>
          Por último, <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$project</span></code>
          arma el documento final, dejando solo <code>genero</code> y <code>total_reproducciones</code>.
        </li>
      </ol>
      <p style="margin:0.6rem 0 0;">
        <strong>Resultado final:</strong> <code>{ genero: "Reggaeton", total_reproducciones: 9120000 }</code>.
        Ahora veamos, etapa por etapa, el código de cada una.
      </p>
    </div>

    <p style="margin-top:1.2rem;"><strong>Etapa 1: <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$match</span></code></strong> <span style="color:var(--text-dim); font-size:0.85rem;">(en inglés, "coincidir")</span></p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">02a_match.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$match</span>: { <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span> } }</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        <strong>Cómo se lee:</strong> esta es la primera etapa del pipeline, con el operador
        <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$match</span></code> y el filtro <code>{ genero: "Reggaeton" }</code>. Deja pasar a la
        siguiente etapa solo los documentos donde <code>genero</code> sea exactamente <code>"Reggaeton"</code>.
      </p>
    </div>

    <p style="margin-top:1.2rem;"><strong>Etapa 2: <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$group</span></code></strong> <span style="color:var(--text-dim); font-size:0.85rem;">(en inglés, "agrupar")</span></p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">02b_group.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$group</span>: {
    _id: <span class="code-str">"$genero"</span>,
    total_reproducciones: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$sum</span>: <span class="code-str">"$reproducciones"</span> }
} }</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        <strong>Cómo se lee:</strong> <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$group</span></code> junta en un solo documento todos los que tengan el
        mismo valor en <code>_id</code>. Aquí <code>_id: "$genero"</code> dice "agrupa por el valor del
        campo <code>genero</code> de cada documento". Por cada grupo, calcula
        <code>total_reproducciones</code> sumando, con <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$sum</span></code>, el campo <code>reproducciones</code> de
        todos los documentos que cayeron en ese grupo.
      </p>
    </div>

    <p style="margin-top:1.2rem;"><strong>Etapa 3: <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$sort</span></code></strong> <span style="color:var(--text-dim); font-size:0.85rem;">(en inglés, "ordenar")</span></p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">02c_sort.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$sort</span>: { total_reproducciones: <span class="code-num">-1</span> } }</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        <strong>Cómo se lee:</strong> <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$sort</span></code> ordena los documentos que le llegan según
        <code>total_reproducciones</code>. El <code>-1</code> significa "de mayor a menor"; sería
        <code>1</code> si quisiera "de menor a mayor".
      </p>
    </div>

    <p style="margin-top:1.2rem;"><strong>Etapa 4: <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$project</span></code></strong> <span style="color:var(--text-dim); font-size:0.85rem;">(en inglés, "proyectar")</span></p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">02d_project.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$project</span>: { _id: <span class="code-num">0</span>, genero: <span class="code-str">"$_id"</span>, total_reproducciones: <span class="code-num">1</span> } }</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>Cómo se lee:</strong> <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$project</span></code> arma el documento final, campo por campo:
      </p>
      <ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;">
        <li style="margin-bottom:0.4rem;">
          <code>_id: 0</code> quita el campo <code>_id</code> del resultado.
        </li>
        <li style="margin-bottom:0.4rem;">
          <code>genero: "$_id"</code> crea un campo nuevo llamado <code>genero</code> y le pone el valor
          que traía <code>_id</code>; así es como se "renombra".
        </li>
        <li>
          <code>total_reproducciones: 1</code> deja ese campo tal cual, sin cambiarle nombre ni valor.
        </li>
      </ul>
    </div>

    <p style="margin-top:1.2rem;">Así funciona un pipeline: encadenando las cuatro etapas, una detrás de otra, el resultado final es:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">02e_resultado.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>{ genero: <span class="code-str">"Reggaeton"</span>, total_reproducciones: <span class="code-num">9120000</span> }</code></pre>
    </div>

    <p style="margin-top:1rem;">
      Dentro del mismo <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$group</span></code> se pueden agregar más acumuladores, uno por cada campo que se
      quiera resumir:
    </p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">03_agregacion_extra.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Etapa 1: filtra por género</span>
{ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$match</span>: { <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span> } }

<span class="code-com">// Etapa 2: agrupa y calcula los acumuladores</span>
{ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$group</span>: {
    _id: <span class="code-str">"$genero"</span>,
    <span class="code-com">// Promedio de duración por género</span>
    duracion_promedio: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$avg</span>: <span class="code-str">"$duracion_seg"</span> },
    <span class="code-com">// Lista de títulos de cada género, juntados en un array</span>
    titulos: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$push</span>: <span class="code-str">"$titulo"</span> }
} }</code></pre>
    </div>

  </div>

  <!-- ===================== 6. CRUD EN COMPASS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. CRUD en Compass: crear, leer, actualizar y eliminar</h3>
    </div>
    <p>
      Las cuatro operaciones básicas de cualquier base de datos se conocen como <strong>CRUD</strong>:
      Crear, Leer, Actualizar y Eliminar. Primero vemos cómo hacer cada una desde Compass, sin escribir
      código; en la siguiente sección se ven las mismas cuatro, esta vez con código en mongosh.
    </p>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Crear: <code>insertOne</code> / <code>insertMany</code></h4>
    <div class="content-box" style="margin-top:0.4rem;">
      <p style="margin:0;">
        El botón <strong>"Insert Document"</strong> es el equivalente visual de
        <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">insertOne</span></code>: abre un editor para escribir un solo documento nuevo. <strong>"Import
        File"</strong>, subiendo un archivo JSON con un array de documentos, es el equivalente de
        <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">insertMany</span></code>.
      </p>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Leer: <code>find</code> / <code>findOne</code></h4>
    <div class="content-box" style="margin-top:0.4rem;">
      <p style="margin:0;">
        La barra <strong>"Filter"</strong> en la vista de "Documents" hace lo mismo que
        <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">find</span></code>: escribes el objeto de filtro, por ejemplo
        <code>{ genero: "Reggaeton" }</code>, y Compass muestra todos los documentos que coinciden. Darle
        clic a uno solo para expandirlo y verlo por separado es la idea de <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">findOne</span></code>.
      </p>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Actualizar: <code>updateOne</code> / <code>updateMany</code></h4>
    <div class="content-box" style="margin-top:0.4rem;">
      <p style="margin:0;">
        Editar un documento con el ícono de lápiz y guardar los cambios es el equivalente de
        <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">updateOne</span></code>. Para actualizar varios a la vez, primero filtras con la barra "Filter" y
        luego aplicas la actualización masiva con el botón "Update" sobre los documentos filtrados, el
        equivalente de <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">updateMany</span></code>.
      </p>
    </div>

    <p style="margin-top:1rem;">Así queda repartido en las dos cajas del botón "Update" de Compass:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">Compass: Update</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Filter</span>
{ <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span> }

<span class="code-com">// Update</span>
{ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$set</span>: { <span class="code-key">destacada</span>: <span class="code-bool">true</span> } }</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        Son las mismas dos partes que en <code>updateOne</code>/<code>updateMany</code>, solo que separadas en dos
        cuadros distintos: el filtro va en <strong>Filter</strong>, y el <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$set</span></code> va solo, sin el filtro adentro, en <strong>Update</strong>.
      </p>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Eliminar: <code>deleteOne</code> / <code>deleteMany</code></h4>
    <div class="content-box" style="margin-top:0.4rem;">
      <p style="margin:0;">
        El ícono de basura junto a un documento es el equivalente de <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">deleteOne</span></code>.
        Filtrar primero y luego eliminar todos los documentos visibles en ese resultado es el equivalente
        de <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">deleteMany</span></code>. No hay forma de deshacerlo: una vez eliminado, el documento
        desaparece.
      </p>
    </div>
  </div>

  <!-- ===================== 7. CRUD EN MONGOSH ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>7. CRUD en mongosh: crear, leer, actualizar y eliminar</h3>
    </div>
    <p>
      Las mismas cuatro operaciones, ahora como código en el shell integrado de Compass
      (<code>db.canciones....</code>). Cada una tiene una versión para un solo documento y otra para
      varios a la vez.
    </p>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Crear</h4>
    <div class="concept-grid">
      <div class="concept-card">
        <h4>insertOne</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Agrega un solo documento a la
          colección.</p>
      </div>
      <div class="concept-card">
        <h4>insertMany</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Agrega varios documentos de una
          sola vez, con un array.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">Insertar un documento:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">06_insertOne.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>db.canciones.insertOne({
  <span class="code-key">titulo</span>: <span class="code-str">"Despacito"</span>,
  <span class="code-key">artista</span>: <span class="code-str">"Luis Fonsi"</span>,
  <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>,
  <span class="code-key">duracion_seg</span>: <span class="code-num">228</span>,
  <span class="code-key">reproducciones</span>: <span class="code-num">700000</span>
})</code></pre>
    </div>

    <p style="margin-top:1rem;">Insertar varios documentos de una vez:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">07_insertMany.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>db.canciones.insertMany([
  { <span class="code-key">titulo</span>: <span class="code-str">"Provenza"</span>, <span class="code-key">artista</span>: <span class="code-str">"Karol G"</span>, <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>, <span class="code-key">duracion_seg</span>: <span class="code-num">195</span>, <span class="code-key">reproducciones</span>: <span class="code-num">780000</span> },
  { <span class="code-key">titulo</span>: <span class="code-str">"Tacones Rojos"</span>, <span class="code-key">artista</span>: <span class="code-str">"Sebastián Yatra"</span>, <span class="code-key">genero</span>: <span class="code-str">"Pop"</span>, <span class="code-key">duracion_seg</span>: <span class="code-num">210</span>, <span class="code-key">reproducciones</span>: <span class="code-num">620000</span> },
  { <span class="code-key">titulo</span>: <span class="code-str">"Ojitos Lindos"</span>, <span class="code-key">artista</span>: <span class="code-str">"Bad Bunny"</span>, <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>, <span class="code-key">duracion_seg</span>: <span class="code-num">254</span>, <span class="code-key">reproducciones</span>: <span class="code-num">1100000</span> },
  { <span class="code-key">titulo</span>: <span class="code-str">"Feliz Cumpleaños Ferxxo"</span>, <span class="code-key">artista</span>: <span class="code-str">"Feid"</span>, <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>, <span class="code-key">duracion_seg</span>: <span class="code-num">220</span>, <span class="code-key">reproducciones</span>: <span class="code-num">890000</span> },
  { <span class="code-key">titulo</span>: <span class="code-str">"La Jumpa"</span>, <span class="code-key">artista</span>: <span class="code-str">"Arcángel"</span>, <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>, <span class="code-key">duracion_seg</span>: <span class="code-num">200</span>, <span class="code-key">reproducciones</span>: <span class="code-num">1050000</span> }
])</code></pre>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Leer</h4>
    <div class="concept-grid">
      <div class="concept-card">
        <h4>find</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Devuelve todos los documentos que
          cumplen el filtro.</p>
      </div>
      <div class="concept-card">
        <h4>findOne</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Devuelve solo el primer documento
          que cumple el filtro.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">Ejemplos:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">08_find.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Todas las canciones de Reggaeton</span>
db.canciones.find({ <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span> })

<span class="code-com">// Devuelve varios documentos, uno por cada canción que coincide:</span>
[
  { <span class="code-key">titulo</span>: <span class="code-str">"Tusa"</span>, <span class="code-key">artista</span>: <span class="code-str">"Karol G"</span>, <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>, <span class="code-key">reproducciones</span>: <span class="code-num">950000</span> },
  { <span class="code-key">titulo</span>: <span class="code-str">"Provenza"</span>, <span class="code-key">artista</span>: <span class="code-str">"Karol G"</span>, <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>, <span class="code-key">reproducciones</span>: <span class="code-num">780000</span> }
]

<span class="code-com">// Solo una canción de Karol G</span>
db.canciones.findOne({ <span class="code-key">artista</span>: <span class="code-str">"Karol G"</span> })

<span class="code-com">// Devuelve un único documento, el primero que coincide:</span>
{ <span class="code-key">titulo</span>: <span class="code-str">"Tusa"</span>, <span class="code-key">artista</span>: <span class="code-str">"Karol G"</span>, <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span>, <span class="code-key">reproducciones</span>: <span class="code-num">950000</span> }</code></pre>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Actualizar</h4>
    <p>
      Actualizar necesita dos partes: un <strong>filtro</strong>, para decidir qué documentos cambiar, y
      un <strong>operador de actualización</strong>, casi siempre <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$set</span></code>, para decir qué campos
      cambiar y con qué valor. <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">updateOne</span></code> cambia solo el primer documento que coincide;
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">updateMany</span></code> cambia todos los que coinciden.
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>updateOne</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Modifica el primer documento que
          cumple el filtro.</p>
      </div>
      <div class="concept-card">
        <h4>updateMany</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Modifica todos los documentos que
          cumplen el filtro.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">Ejemplos:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">09_update.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Actualizar las reproducciones de una sola canción</span>
db.canciones.updateOne(
  { <span class="code-key">titulo</span>: <span class="code-str">"Tusa"</span> },
  { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$set</span>: { <span class="code-key">reproducciones</span>: <span class="code-num">960000</span> } }
)

<span class="code-com">// Marcar como destacadas todas las canciones de Reggaeton</span>
db.canciones.updateMany(
  { <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span> },
  { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$set</span>: { <span class="code-key">destacada</span>: <span class="code-bool">true</span> } }
)</code></pre>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Eliminar</h4>
    <p>
      Igual que con las actualizaciones, eliminar también necesita un filtro para decidir qué borrar.
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">deleteOne</span></code> borra solo el primer documento que coincide; <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">deleteMany</span></code> borra
      todos los que coinciden. No hay forma de deshacerlo: una vez eliminado, el documento desaparece.
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>deleteOne</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Elimina el primer documento que
          cumple el filtro.</p>
      </div>
      <div class="concept-card">
        <h4>deleteMany</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Elimina todos los documentos que
          cumplen el filtro.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">Ejemplos:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">10_delete.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Eliminar una sola canción</span>
db.canciones.deleteOne({ <span class="code-key">titulo</span>: <span class="code-str">"Tacones Rojos"</span> })

<span class="code-com">// Eliminar todas las canciones con menos de 100.000 reproducciones</span>
db.canciones.deleteMany({ <span class="code-key">reproducciones</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$lt</span>: <span class="code-num">100000</span> } })</code></pre>
    </div>
  </div>

  <!-- ===================== 10. CONSULTAS AVANZADAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>8. Consultas avanzadas</h3>
    </div>
    <p>
      Con el filtro y los operadores de comparación ya cubiertos, faltan cuatro herramientas que se usan
      todo el tiempo en consultas reales: combinar condiciones con lógica, mostrar solo algunos campos,
      ordenar y paginar resultados, y buscar dentro de arrays.
    </p>

    <p style="margin-top:1rem;"><strong>Operadores lógicos: <code>$and</code>, <code>$or</code>, <code>$not</code></strong></p>
    <div class="concept-grid">
      <div class="concept-card">
        <h4>$and</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Todas las condiciones deben
          cumplirse a la vez.</p>
      </div>
      <div class="concept-card">
        <h4>$or</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Basta con que se cumpla al menos
          una condición.</p>
      </div>
      <div class="concept-card">
        <h4>$not</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Invierte el resultado de una
          condición.</p>
      </div>
    </div>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">11_logicos.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Reggaeton O Pop</span>
canciones.find({ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$or</span>: [ { <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span> }, { <span class="code-key">genero</span>: <span class="code-str">"Pop"</span> } ] })

<span class="code-com">// Más de 500.000 reproducciones Y menos de 240 segundos</span>
canciones.find({ <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$and</span>: [ { <span class="code-key">reproducciones</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$gt</span>: <span class="code-num">500000</span> } }, { <span class="code-key">duracion_seg</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$lt</span>: <span class="code-num">240</span> } } ] })

<span class="code-com">// Reproducciones que NO son menores a 100.000</span>
canciones.find({ <span class="code-key">reproducciones</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$not</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$lt</span>: <span class="code-num">100000</span> } } })</code></pre>
    </div>

    <p style="margin-top:1.4rem;"><strong>Consultas con arrays: <code>$in</code>, <code>$all</code>, <code>$elemMatch</code></strong></p>
    <div class="concept-grid">
      <div class="concept-card">
        <h4>$in</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El valor del campo está dentro de
          una lista dada.</p>
      </div>
      <div class="concept-card">
        <h4>$all</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El array del documento contiene
          todos los valores indicados.</p>
      </div>
      <div class="concept-card">
        <h4>$elemMatch</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Al menos un elemento del array
          cumple varias condiciones a la vez.</p>
      </div>
    </div>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">14_arrays.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Artistas cuyo género es Reggaeton o Pop</span>
artistas.find({ <span class="code-key">genero</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$in</span>: [<span class="code-str">"Reggaeton"</span>, <span class="code-str">"Pop"</span>] } })

<span class="code-com">// Artistas que tocan TANTO Voz COMO Guitarra</span>
artistas.find({ <span class="code-key">instrumentos_favoritos</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$all</span>: [<span class="code-str">"Voz"</span>, <span class="code-str">"Guitarra"</span>] } })

<span class="code-com">// Suponiendo un array "historial" con { anio, reproducciones } por año:</span>
<span class="code-com">// canciones cuyo historial tiene un año con más de 900.000 reproducciones</span>
canciones.find({ <span class="code-key">historial</span>: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$elemMatch</span>: { anio: <span class="code-num">2024</span>, reproducciones: { <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$gt</span>: <span class="code-num">900000</span> } } } })</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        La diferencia clave: sin <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$elemMatch</span></code>, MongoDB permite que las condiciones se cumplan repartidas
        entre <em>distintos</em> elementos del array. Con <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">$elemMatch</span></code>, exige que sea el <em>mismo</em>
        elemento el que cumpla todas las condiciones a la vez.
      </p>
    </div>
  </div>

  <!-- ===================== 11. ÍNDICES EN MONGODB ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>9. Índices en MongoDB</h3>
    </div>
    <p>
      Sin un índice, MongoDB responde a una consulta revisando documento por documento, un
      <strong>collection scan</strong>. Con una colección de unos pocos documentos no se nota, pero con
      millones de documentos esa diferencia es la que separa una consulta instantánea de una que tarda
      segundos o minutos. Un índice funciona como el índice de un libro: una estructura ordenada aparte que
      le permite a MongoDB saltar directo a los documentos que buscas, sin recorrer toda la colección.
    </p>

    <p style="margin-top:1rem;"><strong>Crear índices simples y compuestos</strong></p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">15_indices_crear.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Índice simple: un solo campo, ascendente</span>
db.canciones.createIndex({ <span class="code-key">genero</span>: <span class="code-num">1</span> })

<span class="code-com">// Índice compuesto: varios campos, cada uno con su propio orden</span>
db.canciones.createIndex({ <span class="code-key">genero</span>: <span class="code-num">1</span>, <span class="code-key">reproducciones</span>: <span class="code-num">-1</span> })</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code>1</code> indexa en orden ascendente, <code>-1</code> en orden descendente. Un índice
        compuesto es más útil cuanto más coincide con los campos que realmente se usan juntos en los
        filtros y en el <code>sort</code> de las consultas frecuentes.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>Cómo consultarlo desde Compass</strong></p>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        No hace falta indicarle a Compass que use el índice, lo hace automáticamente cuando el filtro y el
        orden coinciden con los campos indexados:
      </p>
      <ul style="margin:0.6rem 0 0; padding-left:1.2rem;">
        <li style="margin-bottom:0.4rem;">
          En la barra <strong>"Filter"</strong> escribes: <code>{ genero: "Reggaeton" }</code>
        </li>
        <li>
          Y en la barra <strong>"Sort"</strong> (que está al lado, o dentro de "Options" según la versión)
          escribes: <code>{ reproducciones: -1 }</code>
        </li>
      </ul>
    </div>

    <p style="margin-top:1.4rem;"><strong>Rendimiento: <code>explain()</code></strong></p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">16_explain.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>canciones.find({ <span class="code-key">genero</span>: <span class="code-str">"Reggaeton"</span> }).explain(<span class="code-str">"executionStats"</span>)

<span class="code-com">// En el resultado interesa sobre todo:</span>
<span class="code-com">// - stage: "COLLSCAN" (revisó todo) o "IXSCAN" (usó un índice)</span>
<span class="code-com">// - totalDocsExamined: cuántos documentos tuvo que revisar</span>
<span class="code-com">// - nReturned: cuántos documentos realmente cumplían el filtro</span></code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Si <code>totalDocsExamined</code> es mucho más grande que <code>nReturned</code>, la consulta está
        revisando muchos documentos de más: suele ser una señal de que falta un índice adecuado.
      </p>
    </div>

    <p style="margin-top:1.4rem;"><strong>Eliminar y gestionar índices</strong></p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">17_indices_gestionar.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com">// Listar todos los índices de la colección</span>
canciones.getIndexes()

<span class="code-com">// Eliminar un índice puntual</span>
canciones.dropIndex({ <span class="code-key">genero</span>: <span class="code-num">1</span> })

<span class="code-com">// Eliminar todos los índices, excepto el de _id</span>
canciones.dropIndexes()</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        En Compass, todo esto se hace sin escribir código desde la pestaña <strong>"Indexes"</strong>
        dentro de la colección: un botón <strong>"Create Index"</strong> para crearlos, una tabla con los
        índices existentes y su uso, y un ícono de basura junto a cada uno para eliminarlo. Nunca se puede
        eliminar el índice de <code>_id</code>, MongoDB lo necesita siempre.
      </p>
    </div>
  </div>

  <!-- ===================== 12. PRÁCTICA: PERFIL ARTÍSTICO POLIMÓRFICO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>10. Práctica: el perfil artístico polimórfico - camino a la estación</h3>
    </div>
    <p style="margin-top:0.8rem;">
      Para <code>soundflow_nosql</code>, la colección <code>artistas</code> va a tener:
    </p>
    <ul style="margin:0.4rem 0 0; padding-left:1.2rem; color:var(--text);">
      <li><strong>Campos fijos:</strong> <code>nombre</code>, <code>genero_principal</code>, todos los
        artistas los tienen.</li>
      <li><strong>Un objeto anidado con llaves dinámicas:</strong> <code>redes_sociales</code>, donde cada
        artista puede tener Instagram, TikTok, YouTube, Twitter, o cualquier combinación, sin que eso
        rompa el documento de otro artista.</li>
      <li><strong>Listas, arrays:</strong> <code>premios</code> e <code>instrumentos_favoritos</code>,
        que pueden tener cualquier cantidad de elementos, incluso cero.</li>
    </ul>

    <div class="code-block nosql" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">02_artistas.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>db.artistas.insertOne({
  <span class="code-key">nombre</span>: <span class="code-str">"Karol G"</span>,
  <span class="code-key">genero_principal</span>: <span class="code-str">"Reggaeton"</span>,
  <span class="code-key">redes_sociales</span>: {
    <span class="code-key">instagram</span>: <span class="code-str">"@karolg"</span>,
    <span class="code-key">tiktok</span>: <span class="code-str">"@karolg"</span>,
    <span class="code-key">youtube</span>: <span class="code-str">"KarolGTV"</span>
  },
  <span class="code-key">premios</span>: [<span class="code-str">"Grammy Latino 2023"</span>, <span class="code-str">"Billboard Music Award"</span>],
  <span class="code-key">instrumentos_favoritos</span>: [<span class="code-str">"Voz"</span>, <span class="code-str">"Guitarra"</span>],
  <span class="code-key">biografia</span>: <span class="code-str">"Cantante y compositora colombiana..."</span>
})</code></pre>
    </div>

    <div style="max-width:660px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 660 190" xmlns="http://www.w3.org/2000/svg" style="max-width:660px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="10" y="10" width="200" height="170" rx="10" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="110" y="30" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" font-weight="700" fill="#33404f">Karol G</text>
        <text x="110" y="48" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">genero_principal</text>
        <text x="110" y="66" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">redes_sociales {3}</text>
        <text x="110" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">premios [2]</text>
        <text x="110" y="102" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">instrumentos [2]</text>
        <text x="110" y="120" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">biografia</text>
        <text x="110" y="160" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">6 campos</text>

        <rect x="230" y="10" width="200" height="170" rx="10" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <text x="330" y="30" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" font-weight="700" fill="#33404f">Bad Bunny</text>
        <text x="330" y="48" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">genero_principal</text>
        <text x="330" y="66" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">redes_sociales {2}</text>
        <text x="330" y="84" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">premios [5]</text>
        <text x="330" y="120" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">sin instrumentos_favoritos</text>
        <text x="330" y="160" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">4 campos</text>

        <rect x="450" y="10" width="200" height="170" rx="10" fill="#ffffff" stroke="#c99a4e" stroke-width="1.5"/>
        <text x="550" y="30" text-anchor="middle" font-family="Consolas, monospace" font-size="10.5" font-weight="700" fill="#33404f">Artista nuevo</text>
        <text x="550" y="48" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">genero_principal</text>
        <text x="550" y="120" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">sin redes, premios ni</text>
        <text x="550" y="134" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">instrumentos todavía</text>
        <text x="550" y="160" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">2 campos</text>
      </svg>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Los tres documentos viven en la <strong>misma colección</strong> <code>artistas</code>, y ninguno
        es "inválido" por tener menos campos que los otros. En una tabla de MySQL, esto sería imposible
        sin dejar columnas en <code>NULL</code> o crear tablas adicionales; en MongoDB, cada documento
        trae solo lo que necesita.
      </p>
    </div>

    <p style="margin-top:1rem;">
      Para la actividad, vas a crear <strong>12 artistas</strong> en total. En vez de llamar
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">insertOne</span></code> doce veces, usa <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">insertMany</span></code> con un array de documentos:
    </p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">03_artistas_insertMany.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>db.artistas.insertMany([
  {
    <span class="code-key">nombre</span>: <span class="code-str">"Shakira"</span>,
    <span class="code-key">genero_principal</span>: <span class="code-str">"Pop"</span>,
    <span class="code-key">redes_sociales</span>: { <span class="code-key">instagram</span>: <span class="code-str">"@shakira"</span> },
    <span class="code-key">premios</span>: [<span class="code-str">"Grammy 2006"</span>, <span class="code-str">"Grammy Latino 2022"</span>]
  },
  {
    <span class="code-key">nombre</span>: <span class="code-str">"Feid"</span>,
    <span class="code-key">genero_principal</span>: <span class="code-str">"Reggaeton"</span>,
    <span class="code-key">redes_sociales</span>: { <span class="code-key">instagram</span>: <span class="code-str">"@feid"</span>, <span class="code-key">tiktok</span>: <span class="code-str">"@feid"</span> },
    <span class="code-key">instrumentos_favoritos</span>: [<span class="code-str">"Voz"</span>]
  },
  {
    <span class="code-key">nombre</span>: <span class="code-str">"J Balvin"</span>,
    <span class="code-key">genero_principal</span>: <span class="code-str">"Reggaeton"</span>,
    <span class="code-key">premios</span>: [<span class="code-str">"Latin Grammy 2020"</span>]
  }
  <span class="code-com">// ... hasta completar los 12 artistas</span>
])</code></pre>
    </div>
  </div>

  <!-- ===================== 13. PRÁCTICA: LOGS DE TRÁFICO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>11. Práctica: el sistema de logs de tráfico - camino a la estación</h3>
    </div>
    <p>
      SoundFlow genera eventos todo el tiempo: cada vez que alguien reproduce una canción, cada vez que
      algo falla. Meter todo eso directo en MySQL saturaría la base de datos de pagos y usuarios con
      millones de filas de bajo valor a largo plazo. Para esto, MongoDB es una mejor opción: la prioridad
      acá es la <strong>velocidad de escritura</strong>, no la integridad relacional estricta.
    </p>
    <p style="margin-top:0.8rem;">
      La idea central de esta práctica es que la colección <code>logs</code> funciona como una
      <strong>"bolsa" de eventos</strong>: todos los eventos van al mismo lugar, aunque tengan estructuras
      completamente distintas entre sí.
    </p>

    <p style="margin-top:1rem;"><strong>Evento de tipo "play"</strong>, reproducción: guarda
    <code>id_usuario</code>, <code>id_cancion</code> y <code>timestamp</code>.</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">04_log_play.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>db.logs.insertOne({
  <span class="code-key">tipo_evento</span>: <span class="code-str">"play"</span>,
  <span class="code-key">id_usuario</span>: <span class="code-num">101</span>,
  <span class="code-key">id_cancion</span>: <span class="code-num">205</span>,
  <span class="code-key">timestamp</span>: new Date()
})</code></pre>
    </div>

    <p style="margin-top:1rem;"><strong>Evento de tipo "error"</strong>: guarda <code>codigo_error</code>,
    <code>mensaje</code> y <code>navegador_usuario</code>, campos que un evento de "play" ni siquiera
    tiene.</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
          MongoDB
        </span>
        <span class="code-filename">05_log_error.js</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>db.logs.insertOne({
  <span class="code-key">tipo_evento</span>: <span class="code-str">"error_sistema"</span>,
  <span class="code-key">timestamp</span>: new Date(),
  <span class="code-key">codigo_error</span>: <span class="code-num">404</span>,
  <span class="code-key">mensaje</span>: <span class="code-str">"Archivo de audio no encontrado en el bucket S3"</span>,
  <span class="code-key">navegador_usuario</span>: <span class="code-str">"Chrome 122.0.1"</span>,
  <span class="code-key">prioridad</span>: <span class="code-str">"alta"</span>
})</code></pre>
    </div>

    <div style="max-width:520px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg" style="max-width:520px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="10" y="10" width="500" height="160" rx="10" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.5" stroke-dasharray="4 3"/>
        <text x="260" y="30" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#33404f">colección: logs</text>

        <rect x="35" y="50" width="200" height="105" rx="8" fill="#eaf5f4" stroke="#6f9d7c" stroke-width="1.2"/>
        <text x="135" y="70" text-anchor="middle" font-family="Consolas, monospace" font-size="10" font-weight="700" fill="#33404f">tipo_evento: "play"</text>
        <text x="135" y="88" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">id_usuario: 101</text>
        <text x="135" y="104" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">id_cancion: 205</text>
        <text x="135" y="120" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#33404f">timestamp: ...</text>

        <rect x="285" y="50" width="200" height="105" rx="8" fill="#3a1414" stroke="#e24b4a" stroke-width="1.2"/>
        <text x="385" y="70" text-anchor="middle" font-family="Consolas, monospace" font-size="10" font-weight="700" fill="#f2a3a2">tipo_evento: "error_sistema"</text>
        <text x="385" y="88" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#f2a3a2">codigo_error: 404</text>
        <text x="385" y="104" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#f2a3a2">mensaje: "..."</text>
        <text x="385" y="120" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#f2a3a2">navegador_usuario: "..."</text>
      </svg>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Para la actividad, debes insertar <strong>3 eventos de tipo "play"</strong> y <strong>3 eventos de
        tipo "error"</strong>, todos en la misma colección <code>logs</code>, sin haber definido ninguna
        columna de antemano. Eso es justamente lo que MongoDB permite y MySQL no: mezclar formas de
        documento distintas en un mismo lugar, sin necesitar una migración ni una tabla nueva por cada tipo
        de evento.
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
        <p>1. ¿Cuál es la razón principal por la que surgen las bases de datos NoSQL?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque SQL dejó de funcionar</button>
          <button type="button" class="quiz-option" data-correct="true">Porque el volumen y la variedad de datos crecieron más de lo que las tablas rígidas pueden manejar fácilmente</button>
          <button type="button" class="quiz-option" data-correct="false">Porque son gratis y las relacionales no</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Qué es escalar horizontalmente?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Comprarle más RAM y CPU a un único servidor</button>
          <button type="button" class="quiz-option" data-correct="true">Agregar más servidores, nodos, que se reparten los datos y la carga</button>
          <button type="button" class="quiz-option" data-correct="false">Borrar datos viejos para liberar espacio</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Qué modelo NoSQL guarda los datos como nodos conectados por arcos?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Documentos</button>
          <button type="button" class="quiz-option" data-correct="true">Grafos</button>
          <button type="button" class="quiz-option" data-correct="false">Clave-valor</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. En MongoDB, ¿qué es una colección?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Un solo documento JSON</button>
          <button type="button" class="quiz-option" data-correct="true">Un grupo de documentos, más o menos similares, guardados juntos, equivalente a una tabla</button>
          <button type="button" class="quiz-option" data-correct="false">El nombre del archivo de configuración de MongoDB</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué significa que dos documentos de la misma colección sean "polimórficos"?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Que pueden tener campos distintos entre sí, sin que eso rompa la colección</button>
          <button type="button" class="quiz-option" data-correct="false">Que están escritos en distintos idiomas</button>
          <button type="button" class="quiz-option" data-correct="false">Que uno de los dos tiene un error</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. ¿Qué necesitas para conectar Compass a tu MongoDB Community Server local?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Crear una cuenta en la nube y configurar accesos de red</button>
          <button type="button" class="quiz-option" data-correct="true">Nada especial: el servidor corre en tu equipo, y Compass ya trae lista la conexión local</button>
          <button type="button" class="quiz-option" data-correct="false">Comprar un plan pago de MongoDB</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Cuál es la diferencia entre <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">insertOne</span></code> e <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">insertMany</span></code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">insertMany solo funciona con números</button>
          <button type="button" class="quiz-option" data-correct="true">insertOne guarda un solo documento; insertMany guarda un array de varios documentos de una vez</button>
          <button type="button" class="quiz-option" data-correct="false">No hay ninguna diferencia real</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. ¿Por qué conviene guardar los logs de tráfico de SoundFlow en MongoDB en vez de en MySQL?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Porque priorizan velocidad de escritura y tienen estructuras variables, play, error, etc., sin saturar la base de datos relacional</button>
          <button type="button" class="quiz-option" data-correct="false">Porque MySQL no permite hacer INSERT</button>
          <button type="button" class="quiz-option" data-correct="false">Porque MongoDB es la única base de datos que existe</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. ¿Qué pasa con <code>use soundflow_nosql</code> si todavía no has insertado ningún documento?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">MongoDB no crea la base de datos de verdad hasta que insertes el primer documento</button>
          <button type="button" class="quiz-option" data-correct="false">Da un error inmediatamente</button>
          <button type="button" class="quiz-option" data-correct="false">Crea la base de datos igual que CREATE DATABASE en MySQL</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. ¿Qué formato usa MongoDB internamente para guardar los documentos?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">CSV</button>
          <button type="button" class="quiz-option" data-correct="true">BSON, una versión binaria de JSON</button>
          <button type="button" class="quiz-option" data-correct="false">XML</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>
    </div>
  </div>

  <!-- ===================== PRÁCTICA GUIADA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Práctica: Community Server, Compass y tus primeras colecciones</h3>
    </div>
    <p>
      Con MongoDB Community Server instalado y Compass ya conectado, resuelve estos casos sobre
      <code>soundflow_nosql</code>.
    </p>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:#c99a4e;">Mediana complejidad</h4>
      <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Usa <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">insertMany</span></code> para completar los <strong>12 artistas</strong> de la colección
          <code>artistas</code>, variando qué campos incluye cada uno, no todos necesitan
          <code>redes_sociales</code>, <code>premios</code> ni <code>instrumentos_favoritos</code>.</li>
        <li>Inserta <strong>3 eventos de tipo "play"</strong> y <strong>3 eventos de tipo "error"</strong>
          en la colección <code>logs</code>, con la estructura de cada tipo mostrada en esta clase.</li>
        <li>En Compass, filtra la colección <code>logs</code> para ver solo los documentos donde
          <code>tipo_evento</code> sea <code>"error_sistema"</code>.</li>
        <li>Explica con tus palabras qué pasaría si intentaras guardar esos mismos 12 artistas y 6 logs en
          tablas de MySQL: ¿cuántas tablas necesitarías, y qué columnas quedarían en <code>NULL</code> la
          mayoría del tiempo?</li>
      </ol>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="line-height:1.9;">
      · MongoDB Manual, Introduction to MongoDB. mongodb.com/docs/manual<br>
      · MongoDB Community Edition Documentation. mongodb.com/docs/manual/administration/install-community<br>
      · MongoDB Compass Documentation. mongodb.com/docs/compass<br>
      · MongoDB Manual, Documents. mongodb.com/docs/manual/core/document<br>
      · MongoDB Manual, insertOne() / insertMany(). mongodb.com/docs/manual/reference/method<br>
      · MongoDB Manual, Sharding. mongodb.com/docs/manual/sharding<br>
      · JSON.org, Introducing JSON. json.org<br>
      · Neo4j, What is a Graph Database? neo4j.com/developer/graph-database
    </p>
  </div>
`;

window.WEEK_CONTENT_4_2 = `
  <!-- ===================== 1. QUÉ ES REDIS ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>1. ¿Qué es Redis?</h3>
    </div>
    <p>
      Redis, <strong>RE</strong>mote <strong>DI</strong>ctionary <strong>S</strong>erver, es un motor de
      base de datos NoSQL clave-valor que guarda toda la información en memoria RAM. Nació para resolver un
      problema puntual: cuando una aplicación necesita leer o escribir el mismo dato miles de veces por
      segundo, consultar una base de datos en disco, aunque sea rápida, se vuelve un cuello de botella.
    </p>
    <p style="margin-top:0.8rem;">
      En SoundFlow, Redis es perfecto para cosas como:
    </p>
    <ul style="margin:0.4rem 0 0; padding-left:1.2rem;">
      <li style="margin-bottom:0.3rem;">Cuántas veces se ha reproducido una canción en el último minuto.</li>
      <li style="margin-bottom:0.3rem;">Cuál es la sesión activa de un usuario.</li>
      <li>Cuáles son las 10 canciones más escuchadas ahora mismo.</li>
    </ul>
    <p style="margin-top:0.6rem;">
      Son datos que cambian todo el tiempo y que se necesitan leer instantáneamente, no datos que requieran
      análisis complejo entre tablas.
    </p>

    <div class="concept-grid" style="grid-template-columns:1fr 1fr;">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
        </div>
        <h4>En memoria</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Todo vive en RAM, por eso las
          operaciones son casi instantáneas.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(201,154,78,0.18); color:#c99a4e;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="15" r="4"/><path d="M10 12l10-10M17 5l3 3M14 8l2 2"/></svg>
        </div>
        <h4>Clave-valor</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Cada dato se guarda bajo una llave
          única, sin tablas ni colecciones.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>
        </div>
        <h4>Estructuras de datos</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El valor no es solo texto: puede ser
          una lista, un conjunto, un hash o un ranking.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(74,124,158,0.15); color:#4a7c9e;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="7"/><circle cx="15" cy="12" r="7"/></svg>
        </div>
        <h4>Complemento, no reemplazo</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Casi siempre vive junto a otra base
          de datos (MySQL, MongoDB), acelerando lo que se lee más seguido.</p>
      </div>
    </div>

    <p style="margin-top:1.2rem;">Un repaso corto en video de todo lo anterior:</p>
    <a href="https://www.youtube.com/watch?v=Tay_ORqG-jo" target="_blank" rel="noopener" style="display:block; max-width:360px; margin:0.6rem auto 0; border-radius:10px; overflow:hidden; border:1px solid var(--border); text-decoration:none; position:relative;">
      <img src="https://img.youtube.com/vi/Tay_ORqG-jo/hqdefault.jpg" alt="¿Qué es Redis? Base de datos en memoria RAM ultra rápida" style="display:block; width:100%; height:auto;">
      <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25);">
        <span style="width:64px; height:64px; border-radius:50%; background:rgba(196,68,68,0.9); display:flex; align-items:center; justify-content:center;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </span>
      <span style="display:block; padding:0.6rem 0.8rem; background:#111; color:#fff; font-size:0.85rem;">¿Qué es Redis? Base de datos en memoria RAM ultra rápida — ver en YouTube</span>
    </a>
  </div>

  <!-- ===================== INTRO: POR QUÉ REDIS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>¿Por qué Redis? El modelo clave-valor en memoria</h3>
    </div>
    <p>
      Redis es otra familia de NoSQL completamente distinta a MongoDB:
      <strong>clave-valor</strong>, y en <strong>memoria RAM</strong> en vez de disco. Cada dato se guarda y
      se busca por una llave única, como un diccionario gigante: le das la llave, Redis te devuelve el
      valor al instante, sin tener que buscar entre documentos ni filas.
    </p>
    <p style="margin-top:0.8rem;">
      Esa combinación, <span style="color:#e24b4a; font-size:1.15em; font-weight:700;">llave única más memoria RAM</span>, hace que Redis sea extremadamente rápido, del orden de
      microsegundos por operación. Por eso no se usa como base de datos principal, sino como
      <strong>caché</strong>, contador en tiempo real, tabla de sesiones de usuario, o ranking, casos donde
      la velocidad importa más que guardar relaciones complejas entre los datos.
    </p>

    <div style="max-width:640px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="10" y="15" width="290" height="130" rx="10" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <text x="155" y="38" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700" fill="#33404f">MongoDB (documentos)</text>
        <text x="155" y="62" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#4a7c9e">{ titulo: "Tusa", artista: ... }</text>
        <text x="155" y="82" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Vive en disco</text>
        <text x="155" y="98" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Consultas por cualquier campo</text>
        <text x="155" y="114" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Base de datos principal</text>

        <rect x="340" y="15" width="290" height="130" rx="10" fill="#ffffff" stroke="#b33a2e" stroke-width="1.5"/>
        <text x="485" y="38" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700" fill="#33404f">Redis (clave-valor)</text>
        <text x="485" y="62" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#b33a2e">cancion:205 &rarr; "Tusa"</text>
        <text x="485" y="82" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Vive en memoria RAM</text>
        <text x="485" y="98" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Solo se busca por la llave</text>
        <text x="485" y="114" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Caché, contadores, rankings</text>
      </svg>
    </div>
  </div>

  <!-- ===================== CASOS DE USO REALES DE REDIS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>¿Por qué surgió Redis? 3 casos de uso reales</h3>
    </div>
    <p>
      Redis no nació como reemplazo de las bases de datos tradicionales, sino como respuesta a tres
      problemas puntuales que las bases de datos en disco no resolvían bien. Dale clic a cada tarjeta para
      ver un ejemplo real.
    </p>

    <div class="concept-grid" style="grid-template-columns:1fr 1fr 1fr;">
      <details class="concept-card">
        <summary style="cursor:pointer; display:flex; align-items:center; gap:0.6rem; color:var(--text); font-weight:600; font-size:0.9rem;">
          <span class="summary-icon" style="margin:0; flex-shrink:0; background:rgba(196,68,68,0.12); color:#c44444;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
          </span>
          Real-time data store
        </summary>
        <p style="margin:0.6rem 0 0; font-size:0.85rem; color:var(--text-dim);">
          <strong>Twitter</strong> adoptó Redis para su almacén de datos en tiempo real: timelines,
          contadores de likes/retweets y notificaciones necesitan leerse y actualizarse al instante, sin
          esperar a una base de datos en disco.
        </p>
      </details>
      <details class="concept-card">
        <summary style="cursor:pointer; display:flex; align-items:center; gap:0.6rem; color:var(--text); font-weight:600; font-size:0.9rem;">
          <span class="summary-icon" style="margin:0; flex-shrink:0; background:rgba(201,154,78,0.18); color:#c99a4e;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h4l3-8 4 16 3-8h4"/></svg>
          </span>
          Streaming & Messaging
        </summary>
        <p style="margin:0.6rem 0 0; font-size:0.85rem; color:var(--text-dim);">
          Redis ofrece un tipo de dato <strong>Stream</strong> pensado para gestionar colas de
          mensajería: eventos que llegan uno detrás de otro y que varios procesos necesitan leer en
          orden, como una fila de producción en tiempo real.
        </p>
      </details>
      <details class="concept-card">
        <summary style="cursor:pointer; display:flex; align-items:center; gap:0.6rem; color:var(--text); font-weight:600; font-size:0.9rem;">
          <span class="summary-icon" style="margin:0; flex-shrink:0; background:rgba(111,157,124,0.18); color:#6f9d7c;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/></svg>
          </span>
          Caching & Session Storage
        </summary>
        <p style="margin:0.6rem 0 0; font-size:0.85rem; color:var(--text-dim);">
          Sirve como sistema de <strong>caché</strong> delante de otra base de datos, para mejorar el
          performance general de la aplicación, y como almacén de <strong>sesiones de usuario</strong>,
          para saber quién está conectado sin consultar la base principal en cada clic.
        </p>
      </details>
    </div>

    <p style="margin-top:1.2rem;"><strong>Ejemplo de caching:</strong> la aplicación web siempre le habla al API; el API decide si va hasta PostgreSQL o si el dato ya está en Redis.</p>
    <div style="max-width:640px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="10" y="60" width="130" height="55" rx="8" fill="#ffffff" stroke="var(--border)" stroke-width="1.5"/>
        <text x="75" y="92" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">Aplicación web</text>

        <path d="M145 78 L245 78" stroke="#4a7c9e" stroke-width="2" marker-end="url(#arrowBlue)"/>
        <path d="M245 98 L145 98" stroke="#4a7c9e" stroke-width="2" marker-end="url(#arrowBlue)"/>

        <rect x="250" y="60" width="90" height="55" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <text x="295" y="92" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">API</text>

        <path d="M345 78 L440 78" stroke="#4a7c9e" stroke-width="2" marker-end="url(#arrowBlue)"/>
        <path d="M440 98 L345 98" stroke="#4a7c9e" stroke-width="2" marker-end="url(#arrowBlue)"/>

        <rect x="445" y="60" width="120" height="55" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <text x="505" y="92" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">PostgreSQL</text>
        <text x="505" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="13" font-weight="700" fill="#b33a2e">15 segundos</text>

        <path d="M295 115 L295 165" stroke="#b33a2e" stroke-width="2" marker-end="url(#arrowRed)"/>

        <rect x="250" y="170" width="90" height="50" rx="8" fill="#ffffff" stroke="#b33a2e" stroke-width="1.5"/>
        <text x="295" y="199" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">Redis</text>
        <text x="410" y="199" text-anchor="middle" font-family="Consolas, monospace" font-size="13" font-weight="700" fill="#6f9d7c">5 segundos</text>

        <defs>
          <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#4a7c9e"/></marker>
          <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b33a2e"/></marker>
        </defs>
      </svg>
    </div>
    <p style="margin-top:1.4rem;"><strong>Redis también se puede usar de forma directa</strong>, sin un API en medio, cuando la propia aplicación necesita leer o escribir un dato puntual (por ejemplo, un contador o una sesión). Como el dato ya está en memoria, la respuesta tarda apenas 5 segundos:</p>
    <div style="max-width:400px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" style="max-width:400px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="10" y="15" width="130" height="55" rx="8" fill="#ffffff" stroke="var(--border)" stroke-width="1.5"/>
        <text x="75" y="47" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">Aplicación web</text>

        <path d="M145 33 L255 33" stroke="#b33a2e" stroke-width="2" marker-end="url(#arrowRedDirect)"/>
        <path d="M255 53 L145 53" stroke="#b33a2e" stroke-width="2" marker-end="url(#arrowRedDirect)"/>

        <rect x="260" y="15" width="130" height="55" rx="8" fill="#ffffff" stroke="#b33a2e" stroke-width="1.5"/>
        <text x="325" y="47" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">Redis</text>

        <text x="200" y="102" text-anchor="middle" font-family="Consolas, monospace" font-size="13" font-weight="700" fill="#6f9d7c">5 segundos</text>

        <defs>
          <marker id="arrowRedDirect" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b33a2e"/></marker>
        </defs>
      </svg>
    </div>

  </div>

  <!-- ===================== 2. INSTALACIÓN: DOCKER + REDISINSIGHT ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. Instalación y configuración: Redis con Docker + RedisInsight</h3>
    </div>
    <p>
      Redis está pensado para correr en Linux, así que en Windows no existe un instalador nativo como el
      de MongoDB. Estas son las alternativas más comunes para tenerlo funcionando en Windows:
    </p>

    <table style="width:100%; max-width:640px; border-collapse:collapse; font-size:0.85rem; margin:0.6rem auto 0;">
      <thead>
        <tr>
          <th style="text-align:left; padding:0.4rem 0.6rem; background:#b33a2e; color:#fff; border:1px solid var(--border);">Opción</th>
          <th style="text-align:left; padding:0.4rem 0.6rem; background:#b33a2e; color:#fff; border:1px solid var(--border);">Cómo funciona</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#f5e9e8;"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><strong>Docker</strong></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Corre Redis dentro de un contenedor Linux, sin instalar Linux aparte.</td></tr>
        <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">WSL2 <span style="font-weight:400; color:var(--text-dim); font-size:0.78rem;">(Windows Subsystem for Linux)</span></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Subsistema de Windows que corre un kernel Linux real por debajo; instalas una distro Linux dentro de Windows y ahí compilas/instalas Redis directo.</td></tr>
        <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Memurai</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Puerto nativo de Redis para Windows, sin contenedores ni Linux.</td></tr>
        <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Máquina virtual</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Instalas Linux completo en VirtualBox/VMware y corres Redis ahí.</td></tr>
        <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Redis Cloud</td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Redis corre en la nube; solo te conectas de forma remota.</td></tr>
      </tbody>
    </table>

    <p style="margin-top:0.8rem;">
      En este curso usaremos <strong>Docker</strong>: un paquete que trae Redis ya listo para funcionar,
      aislado del resto de tu equipo, sin necesidad de configurar Linux por separado. Para verlo y trabajar
      con los datos usamos <strong>RedisInsight</strong>, el cliente visual gratuito de Redis, el mismo papel
      que cumple Compass con MongoDB.
    </p>

    <div style="max-width:600px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" style="max-width:600px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="230" y="15" width="140" height="70" rx="10" fill="#f5e9e8" stroke="#b33a2e" stroke-width="1.5"/>
        <text x="300" y="38" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#33404f">Redis en Docker</text>
        <text x="300" y="56" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="#b33a2e">localhost:6379</text>
        <text x="300" y="72" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="var(--text-dim)">contenedor, en tu equipo</text>

        <line x1="300" y1="85" x2="300" y2="130" stroke="#6f9d7c" stroke-width="1.5"/>

        <rect x="230" y="130" width="140" height="35" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="300" y="152" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" font-weight="700" fill="#33404f">RedisInsight</text>
      </svg>
    </div>

    <p style="margin-top:1rem;">Sigue estos pasos, en orden, para dejar tu entorno listo:</p>
    <div style="margin-top:0.6rem; display:flex; flex-direction:column; gap:0.6rem;">
      <div class="content-box" style="border-left:4px solid #b33a2e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#b33a2e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">1</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M12 3v10m0 0l-4-4m4 4l4-4" stroke="#b33a2e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="#b33a2e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;">Descarga e instala <strong>Docker Desktop</strong> desde
          <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener">docker.com/products/docker-desktop</a>,
          eligiendo tu sistema operativo. Puede pedirte reiniciar el equipo la primera vez.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #b33a2e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#b33a2e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">2</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <rect x="3" y="9" width="18" height="6" rx="3" stroke="#b33a2e" stroke-width="1.8"/>
          <circle cx="16" cy="12" r="2" fill="#b33a2e"/>
        </svg>
        <p style="margin:0;">Abre <strong>Docker Desktop</strong> y espera a que el ícono de la ballena, en
          la barra de tareas, quede en verde: significa que ya está corriendo en segundo plano.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #b33a2e; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#b33a2e; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">3</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="#b33a2e" stroke-width="1.8"/>
          <path d="M7 9l3 3-3 3M13 15h4" stroke="#b33a2e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;">Abre una terminal (PowerShell) y ejecuta este comando. Descarga Redis la
          primera vez, y lo deja corriendo en segundo plano, escuchando en el puerto <code>6379</code>:</p>
      </div>
    </div>

    <div class="sql" style="margin-top:0.5rem;">docker run -d --name redis -p 6379:6379 redis:latest</div>

    <div style="margin-top:0.6rem; display:flex; flex-direction:column; gap:0.6rem;">
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">4</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M12 3v10m0 0l-4-4m4 4l4-4" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="margin:0;">Descarga e instala <strong>RedisInsight</strong> desde
          <a href="https://redis.io/insight/" target="_blank" rel="noopener">redis.io/insight</a>. Es
          gratis y no necesita cuenta.</p>
      </div>
      <div class="content-box" style="border-left:4px solid #6f9d7c; margin:0; display:flex; gap:0.7rem; align-items:flex-start;">
        <span style="flex:none; width:24px; height:24px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">5</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;">
          <path d="M9 7V4M15 7V4M7 9h10v3a5 5 0 0 1-10 0V9z" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 17v3" stroke="#6f9d7c" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <p style="margin:0;">Abre RedisInsight y dale <strong>"Add Database"</strong>. Escribe
          <code>127.0.0.1</code> como host y <code>6379</code> como puerto, ponle un alias, y dale
          <strong>"Save"</strong> para guardarla, y luego <strong>"Connect"</strong>. No necesita usuario ni
          contraseña.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">La dirección de tu Redis local se ve así:</p>
    <div class="sql" style="margin-top:0.5rem;">127.0.0.1:6379</div>
  </div>

  <!-- ===================== 3. ESTRUCTURAS DE DATOS FUNDAMENTALES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Estructuras de datos fundamentales</h3>
    </div>
    <p>Todo comando en Redis se arma con tres piezas — el <strong>comando</strong>, la <strong>key</strong> y el <strong>valor</strong>:</p>
    <div style="max-width:520px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" style="max-width:520px; width:100%; height:auto; display:block; margin:0 auto;">
        <text x="70" y="20" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">comando</text>
        <rect x="15" y="30" width="110" height="50" rx="8" fill="#ffffff" stroke="#e24b4a" stroke-width="1.5"/>
        <text x="70" y="60" text-anchor="middle" font-family="Consolas, monospace" font-size="13" font-weight="700" fill="#e24b4a">SET / GET</text>

        <path d="M130 55 L175 55" stroke="var(--text-dim)" stroke-width="1.8" marker-end="url(#arrowKV)"/>

        <text x="220" y="20" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">key</text>
        <rect x="180" y="30" width="80" height="50" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="220" y="60" text-anchor="middle" font-family="Consolas, monospace" font-size="13" font-weight="700" fill="#7c3aed">country</text>

        <path d="M265 55 L310 55" stroke="var(--text-dim)" stroke-width="1.8" marker-end="url(#arrowKV)"/>

        <text x="380" y="20" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">valor</text>
        <rect x="315" y="30" width="140" height="50" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="385" y="60" text-anchor="middle" font-family="Consolas, monospace" font-size="13" font-weight="700" fill="#6f9d7c">"Chile"</text>

        <defs>
          <marker id="arrowKV" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)"/></marker>
        </defs>
      </svg>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code style="background:transparent; border:none; padding:0;"><span style="color:#e24b4a; font-weight:700;">SET</span> country "Chile"</code>
        guarda el valor, y <code style="background:transparent; border:none; padding:0;"><span style="color:#e24b4a; font-weight:700;">GET</span> country</code>
        lo recupera. La <strong>key</strong> (<span style="color:#7c3aed; font-weight:700;">country</span>) es el nombre único que
        identifica el dato, y el <strong>valor</strong> (<span style="color:#6f9d7c; font-weight:700;">"Chile"</span>) es lo que
        se guarda ahí.
      </p>
    </div>

    <p style="margin-top:1.2rem;">
      En Redis el <strong>valor</strong> guardado bajo una llave
      no es siempre texto plano. Puede ser una de varias <strong>estructuras de datos</strong>, cada una
      pensada para un tipo de problema distinto.
    </p>

    <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1.2rem;">
      <div class="concept-card" style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:flex-start;">
        <div style="flex:1 1 260px; min-width:240px;">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7h14M5 12h14M5 17h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </div>
          <h4>String</h4>
          <p style="margin:0 0 0.6rem; font-size:0.85rem; color:var(--text-dim);">Un texto o número simple. La
            estructura más básica.</p>
          <div style="display:flex; flex-direction:column; gap:0.35rem; margin-bottom:0.6rem;">
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">SET</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">asigna el valor</span>
            </div>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">GET</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">lo busca y lo devuelve</span>
            </div>
          </div>
          <code style="display:block; font-size:0.76rem; background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:0.4rem 0.55rem;"><span style="color:#e24b4a; font-weight:700;">SET</span> <span style="color:#7c3aed; font-weight:600;">usuario:1:nombre</span> <span style="color:#6f9d7c; font-weight:600;">"Ana"</span></code>
        </div>
        <div style="flex:1 1 260px; min-width:240px; border-left:1px solid var(--border); padding-left:1.2rem;">
          <svg viewBox="0 0 260 100" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
            <text x="75" y="15" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="var(--text-dim)">key</text>
            <rect x="10" y="22" width="130" height="40" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
            <text x="75" y="46" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" font-weight="700" fill="#7c3aed">usuario:1:nombre</text>
            <path d="M145 42 L175 42" stroke="var(--text-dim)" stroke-width="1.6" marker-end="url(#arrowMemStr)"/>
            <text x="215" y="15" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="var(--text-dim)">valor</text>
            <rect x="180" y="22" width="70" height="40" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
            <text x="215" y="46" text-anchor="middle" font-family="Consolas, monospace" font-size="11" font-weight="700" fill="#6f9d7c">"Ana"</text>
            <defs><marker id="arrowMemStr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)"/></marker></defs>
          </svg>
          <p style="margin:0.4rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">Así se ve en memoria: una key, un valor.</p>
        </div>
      </div>

      <div class="concept-card" style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:flex-start;">
        <div style="flex:1 1 260px; min-width:240px;">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M10 4v16" stroke="currentColor" stroke-width="1.8"/></svg>
          </div>
          <h4>Hash</h4>
          <p style="margin:0 0 0.6rem; font-size:0.85rem; color:var(--text-dim);">Un mapa de campo &rarr; valor, como
            un mini documento. Ideal para agrupar los datos de una sola entidad.</p>
          <div style="display:flex; flex-direction:column; gap:0.35rem; margin-bottom:0.6rem;">
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">HSET</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">asigna uno o varios campos</span>
            </div>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">HGET</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">busca el valor de un campo puntual</span>
            </div>
          </div>
          <code style="display:block; font-size:0.76rem; background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:0.4rem 0.55rem;"><span style="color:#e24b4a; font-weight:700;">HSET</span> <span style="color:#7c3aed; font-weight:600;">usuario:1</span> nombre <span style="color:#6f9d7c; font-weight:600;">"Ana"</span> edad <span style="color:#6f9d7c; font-weight:600;">25</span> pais <span style="color:#6f9d7c; font-weight:600;">"Chile"</span></code>
        </div>
        <div style="flex:1 1 260px; min-width:240px; border-left:1px solid var(--border); padding-left:1.2rem;">
          <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
            <rect x="70" y="10" width="120" height="32" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
            <text x="130" y="31" text-anchor="middle" font-family="Consolas, monospace" font-size="10" font-weight="700" fill="#7c3aed">usuario:1</text>
            <path d="M130 42 L130 58" stroke="var(--text-dim)" stroke-width="1.6" marker-end="url(#arrowMemHash)"/>
            <rect x="15" y="62" width="230" height="80" rx="8" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="30" y="82" font-family="Consolas, monospace" font-size="9.5" fill="var(--text-dim)">nombre &rarr; <tspan fill="#6f9d7c" font-weight="700">"Ana"</tspan></text>
            <text x="30" y="102" font-family="Consolas, monospace" font-size="9.5" fill="var(--text-dim)">edad &rarr; <tspan fill="#6f9d7c" font-weight="700">25</tspan></text>
            <text x="30" y="122" font-family="Consolas, monospace" font-size="9.5" fill="var(--text-dim)">pais &rarr; <tspan fill="#6f9d7c" font-weight="700">"Chile"</tspan></text>
            <defs><marker id="arrowMemHash" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)"/></marker></defs>
          </svg>
          <p style="margin:0.4rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">Así se ve en memoria: una key, varios campos adentro.</p>
        </div>
      </div>

      <div class="concept-card" style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:flex-start;">
        <div style="flex:1 1 260px; min-width:240px;">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="4" rx="1" stroke="currentColor" stroke-width="1.8"/><rect x="4" y="10.5" width="16" height="4" rx="1" stroke="currentColor" stroke-width="1.8"/><rect x="4" y="16" width="16" height="4" rx="1" stroke="currentColor" stroke-width="1.8"/></svg>
          </div>
          <h4>List</h4>
          <p style="margin:0 0 0.6rem; font-size:0.85rem; color:var(--text-dim);">Una lista ordenada de valores.
            Admite duplicados y mantiene el orden de inserción.</p>
          <div style="display:flex; flex-direction:column; gap:0.35rem; margin-bottom:0.6rem;">
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">RPUSH</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">agrega por la derecha (al final)</span>
            </div>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">LPUSH</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">agrega por la izquierda (al principio)</span>
            </div>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">RPOP</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">saca de la derecha (el último)</span>
            </div>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">LPOP</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">saca de la izquierda (el primero)</span>
            </div>
          </div>
          <code style="display:block; font-size:0.76rem; background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:0.4rem 0.55rem;"><span style="color:#e24b4a; font-weight:700;">RPUSH</span> <span style="color:#7c3aed; font-weight:600;">usuario:1:tareas</span> <span style="color:#6f9d7c; font-weight:600;">"Comprar"</span> <span style="color:#6f9d7c; font-weight:600;">"Estudiar"</span> <span style="color:#6f9d7c; font-weight:600;">"Pagar cuentas"</span></code>
        </div>
        <div style="flex:1 1 300px; min-width:280px; border-left:1px solid var(--border); padding-left:1.2rem;">
          <svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
            <rect x="70" y="8" width="160" height="30" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
            <text x="150" y="28" text-anchor="middle" font-family="Consolas, monospace" font-size="9" font-weight="700" fill="#7c3aed">usuario:1:tareas</text>
            <path d="M150 38 L150 54" stroke="var(--text-dim)" stroke-width="1.6" marker-end="url(#arrowMemList)"/>

            <text x="20" y="72" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" fill="#c9a227">&larr; IZQUIERDA</text>
            <rect x="10" y="78" width="85" height="38" rx="6" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
            <text x="52" y="101" text-anchor="middle" font-family="Consolas, monospace" font-size="9" font-weight="700" fill="#6f9d7c">"Comprar"</text>
            <rect x="107" y="78" width="85" height="38" rx="6" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
            <text x="149" y="101" text-anchor="middle" font-family="Consolas, monospace" font-size="9" font-weight="700" fill="#6f9d7c">"Estudiar"</text>
            <rect x="204" y="78" width="90" height="38" rx="6" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
            <text x="249" y="101" text-anchor="middle" font-family="Consolas, monospace" font-size="8.5" font-weight="700" fill="#6f9d7c">"Pagar cuentas"</text>
            <text x="280" y="72" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" fill="#c9a227">DERECHA &rarr;</text>

            <text x="52" y="130" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" fill="var(--text-dim)">índice 0</text>
            <text x="149" y="130" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" fill="var(--text-dim)">índice 1</text>
            <text x="249" y="130" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" fill="var(--text-dim)">índice 2</text>
            <text x="150" y="148" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" fill="var(--text-dim)">el orden de inserción se mantiene</text>
            <defs><marker id="arrowMemList" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)"/></marker></defs>
          </svg>
          <p style="margin:0.4rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">Así se ve en memoria: secuencia ordenada, con dos extremos.</p>
        </div>
      </div>

      <div class="concept-card" style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:flex-start;">
        <div style="flex:1 1 260px; min-width:240px;">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="12" r="6" stroke="currentColor" stroke-width="1.8"/><circle cx="15" cy="12" r="6" stroke="currentColor" stroke-width="1.8"/></svg>
          </div>
          <h4>Set</h4>
          <p style="margin:0 0 0.6rem; font-size:0.85rem; color:var(--text-dim);">Un conjunto de valores únicos, sin
            duplicados ni orden garantizado.</p>
          <div style="display:flex; flex-direction:column; gap:0.35rem; margin-bottom:0.6rem;">
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">SADD</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">agrega valores al conjunto</span>
            </div>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">SMEMBERS</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">los busca y los devuelve todos</span>
            </div>
          </div>
          <code style="display:block; font-size:0.76rem; background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:0.4rem 0.55rem;"><span style="color:#e24b4a; font-weight:700;">SADD</span> <span style="color:#7c3aed; font-weight:600;">usuario:1:colores</span> <span style="color:#6f9d7c; font-weight:600;">"rojo"</span> <span style="color:#6f9d7c; font-weight:600;">"azul"</span> <span style="color:#6f9d7c; font-weight:600;">"verde"</span></code>
        </div>
        <div style="flex:1 1 260px; min-width:240px; border-left:1px solid var(--border); padding-left:1.2rem;">
          <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
            <rect x="45" y="8" width="170" height="30" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
            <text x="130" y="28" text-anchor="middle" font-family="Consolas, monospace" font-size="9" font-weight="700" fill="#7c3aed">usuario:1:colores</text>
            <path d="M130 38 L130 54" stroke="var(--text-dim)" stroke-width="1.6" marker-end="url(#arrowMemSet)"/>
            <ellipse cx="130" cy="98" rx="115" ry="44" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5" stroke-dasharray="4 3"/>
            <circle cx="80" cy="85" r="26" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.3"/>
            <text x="80" y="89" text-anchor="middle" font-family="Consolas, monospace" font-size="8.5" font-weight="700" fill="#6f9d7c">"rojo"</text>
            <circle cx="150" cy="110" r="26" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.3"/>
            <text x="150" y="114" text-anchor="middle" font-family="Consolas, monospace" font-size="8.5" font-weight="700" fill="#6f9d7c">"azul"</text>
            <circle cx="190" cy="75" r="26" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.3"/>
            <text x="190" y="79" text-anchor="middle" font-family="Consolas, monospace" font-size="8" font-weight="700" fill="#6f9d7c">"verde"</text>
            <defs><marker id="arrowMemSet" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)"/></marker></defs>
          </svg>
          <p style="margin:0.4rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">Así se ve en memoria: sin orden ni posiciones, solo pertenencia.</p>
        </div>
      </div>

      <div class="concept-card" style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:flex-start;">
        <div style="flex:1 1 260px; min-width:240px;">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20V13M12 20V7M19 20V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </div>
          <h4>Sorted Set</h4>
          <p style="margin:0 0 0.6rem; font-size:0.85rem; color:var(--text-dim);">Como un Set, pero cada valor tiene un
            puntaje (score) que define su orden. Perfecto para rankings.</p>
          <div style="display:flex; flex-direction:column; gap:0.35rem; margin-bottom:0.6rem;">
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">ZADD</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">agrega un valor con su puntaje</span>
            </div>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <span style="display:inline-block; flex:none; font-family:Consolas, monospace; font-size:0.74rem; font-weight:700; color:#c9a227; border:1px dashed var(--border); border-radius:6px; padding:0.2rem 0.5rem;">ZRANGE</span>
              <span style="font-size:0.78rem; color:var(--text-dim);">los busca y los devuelve ordenados</span>
            </div>
          </div>
          <code style="display:block; font-size:0.76rem; background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:0.4rem 0.55rem;"><span style="color:#e24b4a; font-weight:700;">ZADD</span> <span style="color:#7c3aed; font-weight:600;">ranking</span> 100 <span style="color:#6f9d7c; font-weight:600;">"Ana"</span> 85 <span style="color:#6f9d7c; font-weight:600;">"Luis"</span> 92 <span style="color:#6f9d7c; font-weight:600;">"Sofía"</span></code>
        </div>
        <div style="flex:1 1 260px; min-width:240px; border-left:1px solid var(--border); padding-left:1.2rem;">
          <svg viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
            <rect x="75" y="8" width="110" height="30" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
            <text x="130" y="28" text-anchor="middle" font-family="Consolas, monospace" font-size="10" font-weight="700" fill="#7c3aed">ranking</text>
            <path d="M130 38 L130 52" stroke="var(--text-dim)" stroke-width="1.6" marker-end="url(#arrowMemZset)"/>
            <rect x="35" y="56" width="190" height="30" rx="6" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
            <text x="130" y="76" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="var(--text-dim)">100 &mdash; <tspan fill="#6f9d7c" font-weight="700">"Ana"</tspan></text>
            <rect x="35" y="90" width="190" height="30" rx="6" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
            <text x="130" y="110" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="var(--text-dim)">92 &mdash; <tspan fill="#6f9d7c" font-weight="700">"Sofía"</tspan></text>
            <rect x="35" y="124" width="190" height="30" rx="6" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
            <text x="130" y="144" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="var(--text-dim)">85 &mdash; <tspan fill="#6f9d7c" font-weight="700">"Luis"</tspan></text>
            <text x="245" y="76" font-family="Segoe UI, sans-serif" font-size="8" fill="var(--text-dim)">&#9660;</text>
            <text x="245" y="145" font-family="Segoe UI, sans-serif" font-size="7.5" fill="var(--text-dim)">score</text>
            <defs><marker id="arrowMemZset" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)"/></marker></defs>
          </svg>
          <p style="margin:0.4rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">Así se ve en memoria: ordenado automáticamente por score.</p>
        </div>
      </div>
    </div>

    <p style="margin-top:1.2rem;">Un vistazo rápido a cada una, aplicado siempre al mismo <strong>usuario:1</strong>:</p>
    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">01_tipos.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># String: el nombre del usuario</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> usuario:1:nombre <span class="code-str">"Ana"</span>

<span class="code-com"># Hash: los datos del usuario, agrupados</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HSET</span> usuario:1 nombre <span class="code-str">"Ana"</span> edad <span class="code-num">25</span> pais <span class="code-str">"Chile"</span>

<span class="code-com"># List: la lista de tareas del usuario</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">RPUSH</span> usuario:1:tareas <span class="code-str">"Comprar"</span> <span class="code-str">"Estudiar"</span> <span class="code-str">"Pagar cuentas"</span>

<span class="code-com"># Set: los colores favoritos del usuario, sin repetir</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SADD</span> usuario:1:colores <span class="code-str">"rojo"</span> <span class="code-str">"azul"</span> <span class="code-str">"verde"</span>

<span class="code-com"># Sorted Set: un ranking asociado al usuario</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">ZADD</span> usuario:1:ranking <span class="code-num">100</span> <span class="code-str">"Ana"</span> <span class="code-num">85</span> <span class="code-str">"Luis"</span> <span class="code-num">92</span> <span class="code-str">"Sofía"</span>

<span class="code-com"># JSON: el documento completo del usuario, guardado tal cual (Redis 8+)</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">JSON.SET</span> usuario:1:perfil $ <span class="code-str">'{"nombre":"Ana","edad":25,"pais":"Chile"}'</span></code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Todos los comandos de Redis se escriben en mayúsculas por convención, y siempre empiezan con el
        nombre de la llave sobre la que van a trabajar. No hace falta declarar de antemano qué tipo de
        estructura va a tener una llave, se define sola con el primer comando que la crea.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">JSON.SET</span></code> guarda un documento JSON completo bajo una llave, algo que antes de Redis 8 no
        existía de forma nativa (había que simularlo con un Hash o un String). El <code>$</code> indica la
        raíz del documento; <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">JSON.GET</span></code> usuario:1:perfil lo recupera completo, o con
        <code>JSON.GET usuario:1:perfil $.nombre</code> se puede leer solo un campo puntual.
      </p>
    </div>

  </div>

  <!-- ===================== 4. TRABAJAR CON KEYS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. Trabajar con keys: crear, listar y eliminar</h3>
    </div>
    <p>
      En Redis no existen bases de datos ni colecciones como en MongoDB: solo hay un <strong>espacio de
      llaves</strong> (keyspace). Cada llave es como una casilla independiente, y su nombre es lo único que
      la organiza, por convención se usan dos puntos para simular jerarquía, por ejemplo
      <code>cancion:205:titulo</code>.
    </p>

    <div style="max-width:640px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%; height:auto; display:block; margin:0 auto;">
        <text x="150" y="18" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#33404f">MongoDB: jerarquía</text>
        <rect x="20" y="28" width="260" height="150" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="1.5"/>
        <text x="35" y="48" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Base de datos</text>
        <rect x="35" y="55" width="230" height="105" rx="6" fill="#f2f6f9" stroke="#4a7c9e" stroke-width="1.2"/>
        <text x="50" y="72" font-family="Segoe UI, sans-serif" font-size="9.5" fill="var(--text-dim)">Colección: canciones</text>
        <rect x="50" y="79" width="200" height="65" rx="5" fill="#ffffff" stroke="#4a7c9e" stroke-width="1"/>
        <text x="150" y="100" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#4a7c9e">{ _id, titulo, artista... }</text>
        <text x="150" y="118" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">documento 1 de muchos</text>
        <text x="150" y="134" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">dentro de la colección</text>

        <text x="480" y="18" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#33404f">Redis: keyspace plano</text>
        <rect x="330" y="28" width="300" height="150" rx="8" fill="#ffffff" stroke="#b33a2e" stroke-width="1.5" stroke-dasharray="4 3"/>
        <rect x="345" y="42" width="120" height="34" rx="6" fill="#f5e9e8" stroke="#b33a2e" stroke-width="1.2"/>
        <text x="405" y="63" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#b33a2e">cancion:205</text>
        <rect x="475" y="42" width="140" height="34" rx="6" fill="#f5e9e8" stroke="#b33a2e" stroke-width="1.2"/>
        <text x="545" y="63" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#b33a2e">cancion:205:titulo</text>
        <rect x="345" y="86" width="120" height="34" rx="6" fill="#f5e9e8" stroke="#b33a2e" stroke-width="1.2"/>
        <text x="405" y="107" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#b33a2e">usuario:1</text>
        <rect x="475" y="86" width="140" height="34" rx="6" fill="#f5e9e8" stroke="#b33a2e" stroke-width="1.2"/>
        <text x="545" y="107" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#b33a2e">sesion:usuario:101</text>
        <rect x="345" y="130" width="270" height="34" rx="6" fill="#f5e9e8" stroke="#b33a2e" stroke-width="1.2"/>
        <text x="480" y="151" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" fill="#b33a2e">ranking:canciones</text>
        <text x="480" y="176" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">todas las llaves viven al mismo nivel, sin anidar</text>
      </svg>
    </div>

    <div class="code-block nosql" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">02_keys.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># Crear una llave simple</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> cancion:205:titulo <span class="code-str">"Tusa"</span>

<span class="code-com"># Verificar si una llave existe (1 = sí, 0 = no)</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">EXISTS</span> cancion:205:titulo

<span class="code-com"># Ver qué tipo de estructura tiene una llave</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">TYPE</span> cancion:205:titulo

<span class="code-com"># Listar llaves que coincidan con un patrón (solo para explorar, no en producción)</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">KEYS</span> cancion:*

<span class="code-com"># Eliminar una llave</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">DEL</span> cancion:205:titulo</code></pre>
    </div>
  </div>

  <!-- ===================== 5. CRUD: CREAR ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. CRUD: crear con <code>SET</code> y <code>HSET</code></h3>
    </div>
    <p>
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span></code> crea, o sobrescribe, una llave de tipo String. <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HSET</span></code> crea, o actualiza, uno o
      varios campos dentro de un Hash, el equivalente más cercano a "insertar un documento" en Redis.
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </div>
        <h4>SET</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Crea o reemplaza una llave simple,
          de tipo String.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M10 4v16" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>HSET</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Crea un Hash, o le agrega/actualiza
          campos, sin tocar los demás campos que ya tenía.</p>
      </div>
    </div>

    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">04_crear.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># String simple</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> cancion:205:titulo <span class="code-str">"Tusa"</span>

<span class="code-com"># Hash con varios campos, como un mini documento</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HSET</span> cancion:205 titulo <span class="code-str">"Tusa"</span> artista <span class="code-str">"Karol G"</span> genero <span class="code-str">"Reggaeton"</span> reproducciones <span class="code-num">950000</span></code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        En RedisInsight, el botón <strong>"+ Add Key"</strong> deja elegir el tipo (String, Hash, List,
        Set, Sorted Set) y llenar los campos desde un formulario, el mismo papel que "Insert Document"
        en Compass.
      </p>
    </div>
  </div>

  <!-- ===================== 6. CRUD: LEER ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. CRUD: leer con <code>GET</code>, <code>MGET</code> y <code>HGETALL</code></h3>
    </div>
    <p>
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">GET</span></code> lee el valor de una llave String. <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">MGET</span></code> lee varias llaves de una sola vez.
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HGETALL</span></code> trae todos los campos de un Hash, y <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HGET</span></code> trae solo uno.
    </p>

    <div class="concept-grid" style="grid-template-columns:repeat(2, 1fr);">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(74,124,158,0.15); color:#4a7c9e;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>GET</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Devuelve el valor de una llave
          String.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(74,124,158,0.15); color:#4a7c9e;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </div>
        <h4>MGET</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Devuelve varios valores String de
          una sola vez, en un solo viaje.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(74,124,158,0.15); color:#4a7c9e;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M10 4v16" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="7" r="1.4" fill="currentColor"/><circle cx="13.5" cy="7" r="1.4" fill="currentColor"/><circle cx="7" cy="13.5" r="1.4" fill="currentColor"/><circle cx="17" cy="17" r="1.4" fill="currentColor"/></svg>
        </div>
        <h4>HGETALL</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Devuelve todos los campos y valores
          de un Hash.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(74,124,158,0.15); color:#4a7c9e;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M10 4v16" stroke="currentColor" stroke-width="1.8"/><rect x="4" y="10" width="6" height="6" fill="currentColor" opacity="0.35"/></svg>
        </div>
        <h4>HGET</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Devuelve el valor de un solo campo
          dentro de un Hash.</p>
      </div>
    </div>

    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">05_leer.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># Leer un String</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">GET</span> cancion:205:titulo
<span class="code-com"># Devuelve: "Tusa"</span>

<span class="code-com"># Leer un Hash completo</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HGETALL</span> cancion:205
<span class="code-com"># Devuelve: titulo "Tusa", artista "Karol G", genero "Reggaeton", reproducciones "950000"</span>

<span class="code-com"># Leer un solo campo del Hash</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HGET</span> cancion:205 artista
<span class="code-com"># Devuelve: "Karol G"</span></code></pre>
    </div>
  </div>

  <!-- ===================== 7. CRUD: ACTUALIZAR ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>7. CRUD: actualizar con <code>SET</code>, <code>HSET</code> y <code>HINCRBY</code></h3>
    </div>
    <p>
      Actualizar en Redis usa los mismos comandos que crear: <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span></code> sobre una llave existente la
      sobrescribe por completo; <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HSET</span></code> sobre un campo existente de un Hash solo cambia ese campo, sin
      tocar los demás. <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HINCRBY</span></code> suma o resta un número a un campo del Hash, de forma atómica.
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(201,154,78,0.18); color:#c99a4e;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20l4-1 10-10-3-3-10 10-1 4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </div>
        <h4>SET</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Reemplaza por completo el valor de
          una llave String.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(201,154,78,0.18); color:#c99a4e;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M10 4v16" stroke="currentColor" stroke-width="1.8"/><path d="M15 12l3-1-1 3-3 1z" fill="currentColor"/></svg>
        </div>
        <h4>HSET</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Actualiza un campo puntual de un
          Hash, deja los demás campos intactos.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(201,154,78,0.18); color:#c99a4e;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 17l6-6 4 4 6-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h4>HINCRBY</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Suma o resta un número a un campo
          numérico del Hash, de forma atómica.</p>
      </div>
    </div>

    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">06_actualizar.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># Sobrescribir un String completo</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> cancion:205:titulo <span class="code-str">"Tusa (Remix)"</span>

<span class="code-com"># Actualizar solo un campo del Hash, los demás no se tocan</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HSET</span> cancion:205 reproducciones <span class="code-num">960000</span>

<span class="code-com"># Sumar 10.000 reproducciones sin tener que leer el valor actual primero</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HINCRBY</span> cancion:205 reproducciones <span class="code-num">10000</span></code></pre>
    </div>
  </div>

  <!-- ===================== 8. CRUD: ELIMINAR ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>8. CRUD: eliminar con <code>DEL</code> y <code>HDEL</code></h3>
    </div>
    <p>
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">DEL</span></code> borra una llave completa, sin importar qué tipo de estructura tenga.
      <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HDEL</span></code> borra solo un campo puntual dentro de un Hash, dejando el resto intacto.
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h4>DEL</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Elimina una llave completa: String,
          Hash, List, Set o Sorted Set.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M10 4v16" stroke="currentColor" stroke-width="1.8"/><path d="M11 11l4 4M15 11l-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </div>
        <h4>HDEL</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Elimina un solo campo de un Hash, el
          resto de campos sigue existiendo.</p>
      </div>
    </div>

    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">07_eliminar.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># Eliminar solo un campo del Hash</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HDEL</span> cancion:205 reproducciones

<span class="code-com"># Eliminar la llave completa, con todos sus campos</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">DEL</span> cancion:205</code></pre>
    </div>
  </div>

  <!-- ===================== 9. OPERACIONES ATÓMICAS Y EXPIRACIÓN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>9. Operaciones atómicas y expiración</h3>
    </div>
    <p>
      Dos herramientas que no existen igual en MongoDB, y que son el corazón de para qué se usa Redis en la
      práctica: <strong>incrementos atómicos</strong>, para contar sin condiciones de carrera, y
      <strong>expiración</strong>, para que una llave se autodestruya sola después de un tiempo.
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>INCR / INCRBY</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Suma 1, o la cantidad indicada, a un
          número guardado, de forma atómica, sin que dos escrituras simultáneas se pisen.</p>
      </div>
      <div class="concept-card">
        <h4>EXPIRE / TTL</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Programa a una llave para que se
          borre sola después de N segundos, o consulta cuánto tiempo le queda.</p>
      </div>
      <div class="concept-card">
        <h4>PERSIST</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Quita la expiración de una llave, la
          deja permanente otra vez.</p>
      </div>
    </div>

    <div class="code-block nosql" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">03_atomicas_ttl.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># Contador de reproducciones: suma 1 cada vez que alguien la escucha</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">INCR</span> reproducciones:cancion:205

<span class="code-com"># Sumar de a varias reproducciones de una vez</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">INCRBY</span> reproducciones:cancion:205 <span class="code-num">10</span>

<span class="code-com"># La sesión de un usuario expira sola en 1 hora (3600 segundos)</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> sesion:usuario:101 <span class="code-str">"activa"</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">EXPIRE</span> sesion:usuario:101 <span class="code-num">3600</span>

<span class="code-com"># Cuántos segundos le quedan a esa llave</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">TTL</span> sesion:usuario:101</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>Manejo de sesiones:</strong> permite mantener a un usuario "conectado" en una página web y
        configurar el <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">TTL</span></code> para que su sesión caduque automáticamente tras 30 minutos de inactividad,
        obligándolo a iniciar sesión nuevamente por seguridad.
      </p>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">INCR</span></code> es atómico: si mil usuarios reproducen la misma canción al mismo tiempo,
        Redis garantiza que las mil sumas se cuentan, sin que se pierda ninguna por una condición de
        carrera. Es exactamente el problema que resolvería mal un simple "leer, sumar 1, guardar" hecho a
        mano.
      </p>
    </div>

    <div style="max-width:640px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%; height:auto; display:block; margin:0 auto;">
        <rect x="10" y="15" width="300" height="150" rx="10" fill="#ffffff" stroke="#b33a2e" stroke-width="1.5"/>
        <text x="160" y="36" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#33404f">Sin atomicidad (riesgo)</text>
        <text x="30" y="58" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Cliente A lee: <tspan font-family="Consolas, monospace" fill="#33404f">950000</tspan></text>
        <text x="30" y="76" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Cliente B lee: <tspan font-family="Consolas, monospace" fill="#33404f">950000</tspan></text>
        <text x="30" y="94" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">A suma 1 y guarda: <tspan font-family="Consolas, monospace" fill="#33404f">950001</tspan></text>
        <text x="30" y="112" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">B suma 1 y guarda: <tspan font-family="Consolas, monospace" fill="#33404f">950001</tspan></text>
        <line x1="30" y1="124" x2="290" y2="124" stroke="var(--border)" stroke-width="1"/>
        <text x="30" y="146" font-family="Segoe UI, sans-serif" font-size="10.5" font-weight="700" fill="#b33a2e">Resultado: 950001 (se perdió 1)</text>

        <rect x="330" y="15" width="300" height="150" rx="10" fill="#ffffff" stroke="#6f9d7c" stroke-width="1.5"/>
        <text x="480" y="36" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#33404f">Con INCR (atómico)</text>
        <text x="350" y="58" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Cliente A: <tspan font-family="Consolas, monospace" fill="#33404f">INCR &rarr; 950001</tspan></text>
        <text x="350" y="76" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Cliente B: <tspan font-family="Consolas, monospace" fill="#33404f">INCR &rarr; 950002</tspan></text>
        <text x="350" y="94" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Redis procesa una a la vez,</text>
        <text x="350" y="112" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">nunca al mismo tiempo.</text>
        <line x1="350" y1="124" x2="610" y2="124" stroke="var(--border)" stroke-width="1"/>
        <text x="350" y="146" font-family="Segoe UI, sans-serif" font-size="10.5" font-weight="700" fill="#6f9d7c">Resultado: 950002 (correcto)</text>
      </svg>
    </div>

    <p style="margin-top:1.2rem;"><code><span style="color:#e24b4a; font-weight:700;">SET</span></code> también puede expirar una llave en el mismo paso, sin necesitar un <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">EXPIRE</span></code> aparte, y además acepta condiciones sobre si la key ya existe o no:</p>
    <div style="display:flex; gap:1.2rem; flex-wrap:wrap; margin-top:0.6rem;">
      <div style="flex:1 1 260px; min-width:260px;">
        <p style="margin:0 0 0.3rem; font-weight:700; color:var(--text);">Expiración</p>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#e24b4a; color:#fff; border:1px solid var(--border);">Opción</th>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#e24b4a; color:#fff; border:1px solid var(--border);">Significado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>EX</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Expira en N segundos</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>PX</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Expira en N milisegundos</td></tr>
          </tbody>
        </table>
      </div>
      <div style="flex:1 1 260px; min-width:260px;">
        <p style="margin:0 0 0.3rem; font-weight:700; color:var(--text);">Condición de escritura</p>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#7c3aed; color:#fff; border:1px solid var(--border);">Opción</th>
              <th style="text-align:left; padding:0.4rem 0.6rem; background:#7c3aed; color:#fff; border:1px solid var(--border);">Significado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>NX</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Solo guarda si la key <strong>no</strong> existe todavía</td></tr>
            <tr style="background:var(--bg);"><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);"><code>XX</code></td><td style="padding:0.4rem 0.6rem; border:1px solid var(--border);">Solo guarda si la key <strong>ya</strong> existe</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="code-block nosql" style="margin-top:0.8rem;">
      <div class="code-block-header">
        <span class="code-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L22 12L12 22L2 12Z" fill="#6f9d7c"/></svg>
          Redis
        </span>
        <span class="code-filename">00_set_opciones.txt</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code><span class="code-com"># Atajo: lo mismo que SET + EXPIRE, pero en un solo paso</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> country <span class="code-str">"Chile"</span> EX <span class="code-num">60</span>

<span class="code-com"># Solo la crea si "country" todavía no existe</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> country <span class="code-str">"Chile"</span> NX

<span class="code-com"># Expira en 500 milisegundos (medio segundo)</span>
<span style="color:#e24b4a; font-size:1.15em; font-weight:700;">SET</span> country <span class="code-str">"Chile"</span> PX <span class="code-num">500</span></code></pre>
    </div>
  </div>

  <!-- ===================== 10. RENDIMIENTO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>10. Rendimiento en Redis</h3>
    </div>
    <p>
      En Redis el problema es distinto: como todo vive en RAM y se
      accede directo por la llave, <strong>la llave misma ya funciona como índice</strong>. No hace falta
      crear nada aparte para que <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">GET</span></code> o <code><span style="color:#e24b4a; font-size:1.15em; font-weight:700;">HGETALL</span></code> sean instantáneos.
    </p>
    <p style="margin-top:0.8rem;">
      El riesgo de rendimiento en Redis no es "faltan índices", es usar mal las estructuras o los comandos:
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>Evita KEYS en producción</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);"><code>KEYS *</code> revisa todo el
          espacio de llaves de una sola vez y puede bloquear Redis. Usa <code>SCAN</code>, que recorre por
          lotes pequeños.</p>
      </div>
      <div class="concept-card">
        <h4>Diseña bien tus llaves</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un buen nombre de llave, como
          <code>cancion:205</code>, es lo más parecido a un índice: te lleva directo al dato sin buscar.</p>
      </div>
      <div class="concept-card">
        <h4>La estructura correcta importa</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un ranking mal hecho con Strings
          sueltos es lento; el mismo ranking con un Sorted Set es instantáneo.</p>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0;">
        Aunque Redis vive en RAM, no pierde los datos si el equipo se apaga: <strong>puede ser persistente</strong>,
        guardando copias de respaldo en disco de dos formas distintas, <strong>RDB</strong> o <strong>AOF</strong>.
      </p>
      <p style="margin:0.6rem 0 0;">
        Cuidado: ese respaldo en disco no reemplaza la RAM como fuente de trabajo, solo sirve para recuperar los
        datos si Redis se reinicia o se cae.
      </p>
    </div>

    <div style="display:flex; gap:1.2rem; flex-wrap:wrap; margin-top:0.8rem;">
      <div class="content-box" style="flex:1 1 260px; min-width:260px; margin:0;">
        <p style="margin:0 0 0.4rem; font-weight:700; color:var(--text);">RDB (snapshots)</p>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
          Toma una <strong>foto completa</strong> de todo lo que hay en memoria cada cierto tiempo (por
          ejemplo, cada 5 minutos) y la guarda en un archivo. Es liviano y rápido de recuperar, pero si
          Redis se cae justo antes de la siguiente foto, se pierden los cambios más recientes.
        </p>
        <ul style="margin:0.5rem 0 0; padding-left:1.1rem; font-size:0.85rem; color:var(--text-dim);">
          <li style="margin-bottom:0.3rem;">Se configura estableciendo reglas de tiempo y cantidad de cambios. Por ejemplo: "toma una foto si pasan 60 segundos y hay al menos 1000 modificaciones".</li>
          <li>Una vez configurada la regla, Redis evalúa las condiciones constantemente y ejecuta el respaldo por su cuenta.</li>
        </ul>
      </div>
      <div class="content-box" style="flex:1 1 260px; min-width:260px; margin:0;">
        <p style="margin:0 0 0.4rem; font-weight:700; color:var(--text);">AOF (registro de escrituras)</p>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
          Anota <strong>cada comando de escritura</strong> (SET, HSET, INCR...) en un archivo de registro, a
          medida que ocurre. Pierde menos información si Redis se cae, pero el archivo crece más y
          reconstruir los datos al reiniciar es más lento que con RDB.
        </p>
        <ul style="margin:0.5rem 0 0; padding-left:1.1rem; font-size:0.85rem; color:var(--text-dim);">
          <li style="margin-bottom:0.3rem;">Generalmente viene desactivado por defecto. Para que funcione, solo debes cambiar un parámetro en el servidor (ej. <code>appendonly yes</code>).</li>
          <li>A partir de ese momento, el motor de Redis se encarga automáticamente de interceptar y anotar cada comando que modifique los datos (<code>SET</code>, <code>RPUSH</code>, etc.) en el archivo de registro, sin que tu código deba enviar una instrucción extra.</li>
        </ul>
      </div>
    </div>

    <div style="max-width:640px; margin:0.8rem auto 0;">
      <svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%; height:auto; display:block; margin:0 auto;">
        <text x="20" y="18" font-family="Segoe UI, sans-serif" font-size="11" font-weight="700" fill="#4a7c9e">RDB: foto completa cada N minutos</text>
        <line x1="20" y1="45" x2="620" y2="45" stroke="#4a7c9e" stroke-width="1.5"/>
        <circle cx="20" cy="45" r="6" fill="#4a7c9e"/>
        <circle cx="170" cy="45" r="6" fill="#4a7c9e"/>
        <circle cx="320" cy="45" r="6" fill="#4a7c9e"/>
        <circle cx="470" cy="45" r="6" fill="#4a7c9e"/>
        <circle cx="620" cy="45" r="6" fill="#4a7c9e"/>
        <text x="20" y="62" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">0min</text>
        <text x="170" y="62" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">5min</text>
        <text x="320" y="62" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">10min</text>
        <text x="470" y="62" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">15min</text>
        <text x="620" y="62" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">20min</text>

        <text x="20" y="98" font-family="Segoe UI, sans-serif" font-size="11" font-weight="700" fill="#b33a2e">AOF: se anota cada escritura, sin esperar</text>
        <line x1="20" y1="120" x2="620" y2="120" stroke="#b33a2e" stroke-width="1.5"/>
        <line x1="35" y1="112" x2="35" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="65" y1="112" x2="65" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="90" y1="112" x2="90" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="130" y1="112" x2="130" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="160" y1="112" x2="160" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="195" y1="112" x2="195" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="230" y1="112" x2="230" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="255" y1="112" x2="255" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="290" y1="112" x2="290" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="330" y1="112" x2="330" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="360" y1="112" x2="360" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="395" y1="112" x2="395" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="420" y1="112" x2="420" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="460" y1="112" x2="460" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="495" y1="112" x2="495" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="520" y1="112" x2="520" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="555" y1="112" x2="555" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <line x1="585" y1="112" x2="585" y2="128" stroke="#b33a2e" stroke-width="1.3"/>
        <text x="20" y="145" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">cada línea = un SET, HSET, INCR... anotado al instante</text>
      </svg>
    </div>

    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Se pueden usar por separado o combinadas: RDB para respaldos livianos y rápidos de restaurar, AOF para
      minimizar lo que se pierde si Redis se cae de forma inesperada.
    </p>
  </div>

  <!-- ===================== QUIZ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Quiz rápido de autoevaluación</h3>
    </div>
    <div class="quiz-box">
      <div class="quiz-question">
        <p>1. ¿Dónde vive principalmente la información en Redis?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">En disco, igual que MySQL</button>
          <button type="button" class="quiz-option" data-correct="true">En memoria RAM</button>
          <button type="button" class="quiz-option" data-correct="false">En la nube, siempre</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Cuál es el modelo de datos de Redis?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Documentos</button>
          <button type="button" class="quiz-option" data-correct="true">Clave-valor</button>
          <button type="button" class="quiz-option" data-correct="false">Columnas</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Qué comando crea o actualiza un campo dentro de un Hash?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">SET</button>
          <button type="button" class="quiz-option" data-correct="true">HSET</button>
          <button type="button" class="quiz-option" data-correct="false">SADD</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Qué estructura usarías para un ranking de canciones más reproducidas?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">List</button>
          <button type="button" class="quiz-option" data-correct="false">Set</button>
          <button type="button" class="quiz-option" data-correct="true">Sorted Set</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Para qué sirve el comando EXPIRE?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Programa que una llave se borre sola después de N segundos</button>
          <button type="button" class="quiz-option" data-correct="false">Suma 1 a un contador</button>
          <button type="button" class="quiz-option" data-correct="false">Ordena un Sorted Set</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. ¿Por qué INCR es mejor que "leer el valor, sumar 1, y guardar" hecho a mano?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque usa menos memoria</button>
          <button type="button" class="quiz-option" data-correct="true">Porque es atómico: no se pierden incrementos si ocurren al mismo tiempo</button>
          <button type="button" class="quiz-option" data-correct="false">Porque guarda el dato en disco</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué comando es riesgoso usar en producción para listar llaves?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">SCAN</button>
          <button type="button" class="quiz-option" data-correct="true">KEYS *</button>
          <button type="button" class="quiz-option" data-correct="false">EXISTS</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. En Redis, ¿qué funciona como "índice" para acceder rápido a un dato?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Un índice creado aparte, como en MongoDB</button>
          <button type="button" class="quiz-option" data-correct="true">La llave misma</button>
          <button type="button" class="quiz-option" data-correct="false">El orden de inserción</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. ¿Qué tipo de datos usarías para guardar los géneros favoritos de un usuario, sin repetidos?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">String</button>
          <button type="button" class="quiz-option" data-correct="true">Set</button>
          <button type="button" class="quiz-option" data-correct="false">List</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. ¿Para qué se usa típicamente Redis junto a otra base de datos, y no como reemplazo?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Como caché, contador o ranking en tiempo real</button>
          <button type="button" class="quiz-option" data-correct="false">Para guardar relaciones complejas entre tablas</button>
          <button type="button" class="quiz-option" data-correct="false">Para hacer respaldos permanentes</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>
    </div>
  </div>

  <!-- ===================== FORO DE DEBATE: CONSULTOR SENIOR DE RENDIMIENTO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Foro de debate: Consultor Senior de Rendimiento</h3>
    </div>
    <p>
      Para esta actividad, actúas como <strong>Consultor Senior de Rendimiento</strong> de SoundFlow. Antes de
      participar en el foro, investiga por tu cuenta cómo funciona Redis por dentro (memoria RAM, persistencia,
      latencia) y prepárate para defender tu posición con argumentos técnicos, no solo con opiniones.
    </p>
    <p style="margin-top:0.6rem;">
      El foco de esta actividad <strong>no es el código</strong>, es la toma de decisiones: ¿cuándo dejamos de
      molestar a la base de datos "de disco" (MySQL/MongoDB) y empezamos a usar "la memoria" (Redis)? Analiza
      casos como el almacenamiento de sesiones, los rankings globales y el caché de perfiles.
    </p>

    <div class="content-box" style="margin-top:1rem;">
      <h4 style="margin:0 0 0.5rem; color:var(--text);">Evidencias de la competencia</h4>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li style="margin-bottom:0.4rem;">Diferencia con precisión técnica entre el almacenamiento
          persistente (disco) y el almacenamiento volátil (RAM), justificando el impacto en la latencia del
          sistema.</li>
        <li>Identifica casos de uso específicos en SoundFlow donde el uso de una base de datos de clave-valor
          es superior a una relacional o documental.</li>
      </ul>
    </div>

    <p style="margin-top:1.2rem;">Revisa el siguiente video y responde a las preguntas del debate:</p>
    <a href="https://www.youtube.com/watch?v=3leZhg7kYYQ" target="_blank" rel="noopener" style="display:block; max-width:360px; margin:0.6rem auto 0; border-radius:10px; overflow:hidden; border:1px solid var(--border); text-decoration:none; position:relative;">
      <img src="https://img.youtube.com/vi/3leZhg7kYYQ/hqdefault.jpg" alt="¿Qué es Redis y por qué se usa en todos los proyectos modernos?" style="display:block; width:100%; height:auto;">
      <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25);">
        <span style="width:64px; height:64px; border-radius:50%; background:rgba(196,68,68,0.9); display:flex; align-items:center; justify-content:center;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </span>
      <span style="display:block; padding:0.6rem 0.8rem; background:#111; color:#fff; font-size:0.85rem;">¿Qué es Redis y por qué se usa en todos los proyectos modernos? — ver en YouTube</span>
    </a>
    <p style="margin-top:0.5rem; font-size:0.78rem; color:var(--text-dim); text-align:center;">CodingMindsDev. (2026). ¿Qué es Redis y por qué se usa en todos los proyectos modernos? [Video]. YouTube.</p>

    <p style="margin-top:1.2rem;"><strong>Preguntas para el debate:</strong></p>

    <div class="content-box" style="border-left:4px solid #b33a2e; margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>1.</strong> Si Redis vive en la memoria RAM y esta se borra cuando el servidor se apaga o se
        reinicia, ¿por qué una empresa como SoundFlow confiaría en ella para manejar el "Top 50 Global" o las
        sesiones de sus usuarios premium? ¿Es la velocidad más importante que la permanencia de los datos en
        este caso?
      </p>
    </div>

    <div class="content-box" style="border-left:4px solid #7c3aed; margin-top:0.8rem;">
      <p style="margin:0;">
        <strong>2.</strong> La memoria RAM es significativamente más costosa que el espacio en disco duro. Si
        pudieras guardar todo en Redis para que la app "vuele", ¿lo harías? ¿En qué momento el beneficio de la
        rapidez deja de ser rentable para el negocio de SoundFlow?
      </p>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0;">
        Participa en el foro con al menos una intervención inicial (tu postura, con argumentos técnicos) y una
        respuesta a un compañero con una postura distinta a la tuya. Apóyate en lo visto sobre RAM vs. disco,
        RDB/AOF, y los casos de uso de Redis (caché, contadores, rankings, sesiones) para sustentar tu
        posición.
      </p>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="line-height:1.9;">
      · Redis Documentation, Data types. redis.io/docs/latest/develop/data-types<br>
      · Redis Documentation, Sets. redis.io/docs/latest/develop/data-types/sets<br>
      · Redis Documentation, Commands. redis.io/docs/latest/commands<br>
      · RedisInsight Documentation. redis.io/docs/latest/operate/redisinsight<br>
      · Docker Documentation, Redis official image. hub.docker.com/_/redis<br>
      · Redis Documentation, Persistence (RDB/AOF). redis.io/docs/latest/operate/oss_and_stack/management/persistence<br>
      · Redis Documentation, EXPIRE. redis.io/docs/latest/commands/expire
    </p>
  </div>
`;
