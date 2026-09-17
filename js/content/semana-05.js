// Contenido enriquecido de la Semana 5: de los árboles en general a los índices B-Tree y B+Tree.
// Sigue el mismo patrón que semana-01.js / semana-02.js / semana-03.js / semana-04.js:
// variables globales window.WEEK_CONTENT_5_1 (y _2 cuando exista), leídas por semana.html.

window.WEEK_CONTENT_5_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow: de los árboles a los índices que aceleran millones de búsquedas</h2>

  <!-- ===================== 1. QUÉ ES UN ÁRBOL ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>¿Qué es un árbol?</h3>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0;">
        Para entender bien un índice, hay que entender primero la estructura de datos que lo hace posible:
        el árbol. Vamos a construirlo desde cero, paso a paso: primero un árbol cualquiera, luego el árbol
        binario, y de ahí subimos hasta los árboles que realmente usan las bases de datos, los B-Trees y
        B+Trees.
      </p>
    </div>
    <p>
      Un <strong>árbol</strong> es una estructura jerárquica: un conjunto de nodos conectados de forma que
      cada uno tiene un único camino desde la raíz, sin ciclos. Antes de ver los árboles que usan las bases
      de datos, fijemos bien el vocabulario que vamos a usar toda la clase.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(4, 1fr);">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Raíz</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El único nodo sin padre, el punto de partida de todo el árbol.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7fa5a3;">Padre / Hijo</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un nodo es padre de otro si tiene una conexión directa hacia abajo con él; ese otro es su hijo.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Hermanos</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Nodos que comparten el mismo padre.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Hoja</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un nodo sin hijos, el final de una rama.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Nivel</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Cuántos pasos hay desde la raíz hasta ese nodo. La raíz está en el nivel 0.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#a86fa8;">Altura</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El nivel más profundo del árbol, desde la raíz hasta su hoja más lejana.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#e24b4a;">Grado de un nodo</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Cuántos hijos tiene ese nodo, directamente.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#e24b4a;">Grado del árbol (orden)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El grado máximo entre todos sus nodos: cuántos hijos como máximo puede tener cualquier nodo.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 2. ÁRBOL BINARIO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Árbol binario</h3>
    </div>
    <p>
      Un <strong>árbol binario</strong> es un árbol donde el grado máximo de cualquier nodo es
      <strong>2</strong>: cada nodo tiene, como mucho, un hijo izquierdo y un hijo derecho. Un
      <strong>Árbol Binario de Búsqueda</strong> (BST) le agrega una regla de orden: en cada nodo, todo lo
      que está a la izquierda es menor, y todo lo que está a la derecha es mayor o igual.
    </p>
    <p>
      Organicemos nuestras 10 canciones de ejemplo (IDs 5, 12, 18, 20, 25, 30, 32, 40, 45, 50) en un BST
      balanceado:
    </p>

    <div class="tree-demo" id="bstDemo">
    <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="max-width:620px; width:100%; height:auto; display:block; margin:1rem auto;">
      <line x1="350" y1="42" x2="180" y2="112" stroke="#4a7c9e" stroke-width="2"/>
      <line x1="350" y1="42" x2="520" y2="112" stroke="#4a7c9e" stroke-width="2"/>
      <line x1="180" y1="134" x2="100" y2="182" stroke="#4a7c9e" stroke-width="2"/>
      <line x1="180" y1="134" x2="260" y2="182" stroke="#4a7c9e" stroke-width="2" data-removable="20" style="transition:opacity 0.5s ease;"/>
      <line x1="520" y1="134" x2="440" y2="182" stroke="#4a7c9e" stroke-width="2"/>
      <line x1="520" y1="134" x2="600" y2="182" stroke="#4a7c9e" stroke-width="2"/>
      <line x1="100" y1="204" x2="60" y2="252" stroke="#4a7c9e" stroke-width="2"/>
      <line x1="440" y1="204" x2="400" y2="252" stroke="#4a7c9e" stroke-width="2"/>
      <line x1="440" y1="204" x2="480" y2="252" stroke="#4a7c9e" stroke-width="2" data-extra="35" style="opacity:0; transition:opacity 0.5s ease;"/>
      <line x1="600" y1="204" x2="560" y2="252" stroke="#4a7c9e" stroke-width="2"/>

      <g class="tree-nodo" data-nodo="bst25" data-nombre="25 (raíz)">
        <circle cx="350" cy="20" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="350" y="26" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">25</text>
      </g>

      <g class="tree-nodo" data-nodo="bst18" data-nombre="18">
        <circle cx="180" cy="112" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="180" y="118" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">18</text>
      </g>
      <g class="tree-nodo" data-nodo="bst40" data-nombre="40">
        <circle cx="520" cy="112" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="520" y="118" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">40</text>
      </g>

      <g class="tree-nodo" data-nodo="bst12" data-nombre="12">
        <circle cx="100" cy="182" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="100" y="188" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12</text>
      </g>
      <g class="tree-nodo" data-nodo="bst20" data-nombre="20" data-removable="20" style="transition:opacity 0.5s ease;">
        <circle cx="260" cy="182" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="260" y="188" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">20</text>
      </g>
      <g class="tree-nodo" data-nodo="bst32" data-nombre="32">
        <circle cx="440" cy="182" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="440" y="188" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">32</text>
      </g>
      <g class="tree-nodo" data-nodo="bst50" data-nombre="50">
        <circle cx="600" cy="182" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="600" y="188" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">50</text>
      </g>

      <g class="tree-nodo" data-nodo="bst5" data-nombre="5">
        <circle cx="60" cy="252" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="60" y="258" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">5</text>
      </g>
      <g class="tree-nodo" data-nodo="bst30" data-nombre="30">
        <circle cx="400" cy="252" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="400" y="258" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">30</text>
      </g>
      <g class="tree-nodo" data-nodo="bst35" data-nombre="35 (nueva)" data-extra="35" style="opacity:0; transition:opacity 0.5s ease;">
        <circle cx="480" cy="252" r="22" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="480" y="258" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">35</text>
      </g>
      <g class="tree-nodo" data-nodo="bst45" data-nombre="45">
        <circle cx="560" cy="252" r="22" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="560" y="258" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">45</text>
      </g>

      <text x="350" y="290" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="var(--text-dim)">4 niveles para las mismas 10 canciones (compara con los B-Trees y B+Trees más abajo)</text>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: recorridos, inserción y eliminación sobre el mismo árbol</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bst25,bst18,bst12,bst5,bst20,bst40,bst32,bst30,bst50,bst45">Preorden</button>
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bst5,bst12,bst18,bst20,bst25,bst30,bst32,bst40,bst45,bst50">Inorden</button>
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bst5,bst12,bst20,bst18,bst30,bst32,bst45,bst50,bst40,bst25">Postorden</button>
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bst25,bst40,bst32" data-revela="35" data-mensaje-final="¡Listo! La canción 35 quedó insertada como hijo derecho de 32.">Insertar 35: buscar su lugar</button>
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bst25,bst18,bst20" data-oculta="20" data-mensaje-final="¡Listo! La canción 20 fue eliminada del árbol.">Eliminar 20: encontrarlo primero</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Elige una operación para verla paso a paso.
      </p>
    </div>
    </div>

    <p style="margin-top:1rem;">
      Los tres recorridos hacen lo mismo (visitar cada nodo una vez), pero cambia en qué momento se visita
      el nodo respecto a sus dos hijos: <strong>Preorden</strong> lo visita antes (nodo, izquierda,
      derecha), <strong>Inorden</strong> lo visita en medio (izquierda, nodo, derecha), y
      <strong>Postorden</strong> lo visita después (izquierda, derecha, nodo). Cada uno sirve para algo
      distinto:
    </p>

    <div class="concept-grid">
      <div class="concept-card">
        <h4 style="color:#4a7c9e;">Preorden</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Conoces el padre antes que sus
          hijos, así que puedes guardar o recrear el árbol de arriba hacia abajo. Ejemplo: exportar una
          estructura de categorías a un archivo, para reconstruirla después leyéndolo en orden.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">Inorden</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">En un BST, recorrerlo en inorden
          entrega los datos ya ordenados, sin ordenarlos aparte. Es la razón de ser de un índice: por eso
          es el más importante de los tres para esta clase.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Postorden</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Útil cuando el padre depende de sus
          hijos. Ejemplo: calcular el peso de una carpeta sumando primero sus subcarpetas, o borrar un
          árbol de memoria eliminando primero los hijos y al final el nodo padre.</p>
      </div>
    </div>

    <p style="margin-top:1.2rem;">
      ¿Qué pasa si en vez de insertar valores en un orden variado, los insertamos ya ordenados, sin
      reestructurar nada?
    </p>

    <svg viewBox="0 0 260 620" xmlns="http://www.w3.org/2000/svg" style="max-width:200px; width:100%; height:auto; display:block; margin:0.8rem auto;">
      <text x="130" y="14" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Insertando ya ordenado</text>
      <line x1="130" y1="48" x2="130" y2="70" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="106" x2="130" y2="128" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="164" x2="130" y2="186" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="222" x2="130" y2="244" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="280" x2="130" y2="302" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="338" x2="130" y2="360" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="396" x2="130" y2="418" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="454" x2="130" y2="476" stroke="#b33a2e" stroke-width="2"/>
      <line x1="130" y1="512" x2="130" y2="534" stroke="#b33a2e" stroke-width="2"/>

      <circle cx="130" cy="30" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="35" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">5</text>
      <circle cx="130" cy="88" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="93" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">12</text>
      <circle cx="130" cy="146" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="151" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">18</text>
      <circle cx="130" cy="204" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="209" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">20</text>
      <circle cx="130" cy="262" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="267" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">25</text>
      <circle cx="130" cy="320" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="325" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">30</text>
      <circle cx="130" cy="378" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="383" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">32</text>
      <circle cx="130" cy="436" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="441" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">40</text>
      <circle cx="130" cy="494" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="499" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">45</text>
      <circle cx="130" cy="552" r="18" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
      <text x="130" y="557" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">50</text>

      <text x="130" y="600" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="var(--text-dim)">
        <tspan x="130" dy="0">10 niveles para 10 datos:</tspan>
        <tspan x="130" dy="13">tan lento como una lista, O(n)</tspan>
      </text>
    </svg>

    <div class="content-box" style="border-left:4px solid #b33a2e;">
      <p style="margin:0;">
        Sin reestructurar, cada nuevo valor mayor se cuelga a la derecha del anterior: el árbol degenera en
        una cadena de <strong>10 niveles</strong> para 10 datos, en vez de los 4 niveles del árbol
        balanceado de arriba. Buscar ahí ya no es O(log n), vuelve a ser O(n), tan lento como una lista
        enlazada.
      </p>
    </div>
  </div>

  <!-- ===================== 2B. VIDEO PUENTE: ÁRBOLES B Y B+ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Antes de seguir: un repaso rápido en video</h3>
    </div>
    <p>Ya tienes las bases (árbol, binario, grado, recorridos). Este video resume justo lo que viene ahora, los Árboles B y B+, antes de entrar al detalle:</p>

    <a href="https://www.youtube.com/watch?v=bKFfQWlb_oQ" target="_blank" rel="noopener" style="display:block; max-width:360px; margin:0.8rem auto 0; border-radius:10px; overflow:hidden; border:1px solid var(--border); text-decoration:none; position:relative;">
      <img src="https://img.youtube.com/vi/bKFfQWlb_oQ/hqdefault.jpg" alt="ARBOLES B Y B+ EN BASES DE DATOS" style="display:block; width:100%; height:auto;">
      <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25);">
        <span style="width:64px; height:64px; border-radius:50%; background:rgba(196,68,68,0.9); display:flex; align-items:center; justify-content:center;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </span>
      <span style="display:block; padding:0.6rem 0.8rem; background:#111; color:#fff; font-size:0.85rem;">ARBOLES B Y B+ EN BASES DE DATOS — ver en YouTube</span>
    </a>
    <p style="margin-top:0.5rem; font-size:0.78rem; color:var(--text-dim); text-align:center;">MaroT. ARBOLES B Y B+ EN BASES DE DATOS [Video]. YouTube.</p>
  </div>

  <!-- ===================== 3. B-TREE ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>B-Tree: el árbol de "datos en el camino"</h3>
    </div>
    <p>
      Un <strong>B-Tree</strong> generaliza la idea del árbol binario: en vez de un máximo de 2 hijos,
      permite muchos más. En un B-Tree, puedes encontrar el dato en <strong>cualquier piso</strong> del
      árbol. Cada nodo, sea raíz, intermedio u hoja, guarda tanto las llaves de navegación
      <strong>como los datos completos</strong> del registro. Si vas buscando la canción #50 y la encuentras
      en el segundo piso, te detienes ahí mismo, no sigues bajando.
    </p>

    <div class="content-box" style="border-left:4px solid #4a7c9e;">
      <p style="margin:0 0 0.5rem;"><strong>¿Qué es un Árbol B?</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Estructura dinámica en forma de árbol.</li>
        <li>Eficiencia algorítmica con menor altura.</li>
        <li>Cada nodo contiene varios elementos.</li>
        <li>Todos los nodos hoja se encuentran en el mismo <span style="color:#8b7fb8; font-weight:700;">nivel</span>.</li>
      </ul>
    </div>

    <div class="content-box" style="border-left:4px solid #4a7c9e; margin-top:1rem;">
      <p style="margin:0 0 0.5rem;"><strong>¿Qué es una página?</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Nombre con el que se le conoce a los nodos del Árbol B.</li>
        <li>Puede contener hasta n-1 elementos, siendo n el <span style="color:#e24b4a; font-weight:700;">grado del árbol</span>.</li>
        <li>Exceptuando la raíz, cada página tiene como mínimo (n-1)/2 elementos.</li>
        <li>Tiene como mínimo 2 hijos y como máximo n.</li>
      </ul>
      <p style="margin:0.8rem 0 0;">
        <strong>Ejemplo con el árbol de abajo</strong>, que es de <span style="color:#e24b4a; font-weight:700;">grado (orden) n = 3</span>:
      </p>
      <ul style="margin:0.3rem 0 0; padding-left:1.2rem; color:var(--text);">
        <li>Máximo de elementos por página: n-1 = 3-1 = <strong>2</strong>. Por eso ninguna página del
          diagrama tiene más de 2 llaves, como "12 | 40" o "5 | 8".</li>
        <li>Mínimo de elementos por página (salvo la raíz): (n-1)/2 = (3-1)/2 = <strong>1</strong>. Cada
          página, excepto la raíz, debe tener al menos esa llave.</li>
        <li>Hijos por página: entre 2 y n = 3. La raíz de nuestro árbol tiene exactamente
          <strong>3 hijos</strong>, el máximo permitido para este <span style="color:#e24b4a; font-weight:700;">grado</span>.</li>
      </ul>
      <p style="margin:0.8rem 0 0; font-size:0.92rem; color:var(--text-muted, #666);">
        <em>Ojo:</em> el <strong>2</strong> de "máximo 2 llaves por página" no es una regla fija del Árbol B, es
        el resultado de este <span style="color:#e24b4a; font-weight:700;">grado</span> en particular (n = 3).
        Con otro grado cambiaría: por ejemplo, con grado 5 el máximo sería n-1 = <strong>4</strong> llaves por página.
      </p>
    </div>

    <svg viewBox="0 -14 820 324" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:1rem auto;">
      <text x="410" y="-2" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="700" fill="#8b7fb8">Nivel 1</text>
      <text x="410" y="140" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="700" fill="#8b7fb8">Nivel 2</text>
      <text x="520" y="10" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="700" fill="#e24b4a">g=3</text>

      <line x1="410" y1="100" x2="140" y2="150" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="100" x2="410" y2="150" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="100" x2="680" y2="150" stroke="#4a7c9e" stroke-width="2.5"/>
      <text x="275" y="119" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" font-style="italic" font-weight="700" fill="#4a7c9e">puntero 1</text>
      <text x="424" y="128" text-anchor="start" font-family="Segoe UI, sans-serif" font-size="9.5" font-style="italic" font-weight="700" fill="#4a7c9e">puntero 2</text>
      <text x="545" y="119" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" font-style="italic" font-weight="700" fill="#4a7c9e">puntero 3</text>

      <!-- nodo raíz: encabezado azul (llaves) + cuerpo blanco (datos completos) -->
      <rect x="290" y="15" width="240" height="85" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="2"/>
      <rect x="290" y="15" width="240" height="34" rx="8" fill="#4a7c9e"/>
      <rect x="290" y="39" width="240" height="10" fill="#4a7c9e"/>
      <text x="410" y="38" text-anchor="middle" font-family="Consolas, monospace" font-size="16" fill="#ffffff" font-weight="700">12   |   40</text>
      <text x="410" y="66" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" fill="var(--text)">🎵 datos completos de la canción 12</text>
      <text x="410" y="85" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11.5" fill="var(--text)">🎵 datos completos de la canción 40</text>

      <!-- hijo izquierdo -->
      <rect x="30" y="150" width="220" height="85" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="2"/>
      <rect x="30" y="150" width="220" height="34" rx="8" fill="#4a7c9e"/>
      <rect x="30" y="174" width="220" height="10" fill="#4a7c9e"/>
      <text x="140" y="173" text-anchor="middle" font-family="Consolas, monospace" font-size="15" fill="#ffffff" font-weight="700">5   |   8</text>
      <text x="140" y="201" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text)">🎵 datos completos de la canción 5</text>
      <text x="140" y="219" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text)">🎵 datos completos de la canción 8</text>

      <!-- hijo del medio -->
      <rect x="300" y="150" width="220" height="85" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="2"/>
      <rect x="300" y="150" width="220" height="34" rx="8" fill="#4a7c9e"/>
      <rect x="300" y="174" width="220" height="10" fill="#4a7c9e"/>
      <text x="410" y="173" text-anchor="middle" font-family="Consolas, monospace" font-size="15" fill="#ffffff" font-weight="700">18   |   25</text>
      <text x="410" y="201" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text)">🎵 datos completos de la canción 18</text>
      <text x="410" y="219" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text)">🎵 datos completos de la canción 25</text>

      <!-- hijo derecho -->
      <rect x="570" y="150" width="220" height="85" rx="8" fill="#ffffff" stroke="#4a7c9e" stroke-width="2"/>
      <rect x="570" y="150" width="220" height="34" rx="8" fill="#4a7c9e"/>
      <rect x="570" y="174" width="220" height="10" fill="#4a7c9e"/>
      <text x="680" y="173" text-anchor="middle" font-family="Consolas, monospace" font-size="15" fill="#ffffff" font-weight="700">45   |   50</text>
      <text x="680" y="201" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text)">🎵 datos completos de la canción 45</text>
      <text x="680" y="219" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="var(--text)">🎵 datos completos de la canción 50</text>

      <text x="410" y="268" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-style="italic" fill="var(--text-dim)">Encabezado azul = llaves de navegación &middot; cuerpo blanco = datos completos de cada canción &middot; líneas = punteros a los hijos</text>
      <text x="410" y="292" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#4a7c9e">Menos espacio libre para llaves por nodo &rarr; se necesitan más <tspan fill="#8b7fb8">niveles</tspan> para la misma cantidad de canciones</text>
    </svg>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>Problema</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Como los nodos están llenos de datos
          y de letreros a la vez, hay menos espacio para los letreros (punteros). El árbol tiene que ser
          más alto, con más niveles, para que quepan todas las canciones.</p>
      </div>
      <div class="concept-card">
        <h4>Búsqueda por rango</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Si quieres varias canciones seguidas
          (un rango de IDs), tienes que subir y bajar entre niveles varias veces: no hay un atajo directo
          entre los datos que ya visitaste.</p>
      </div>
    </div>

    <div class="content-box" style="border-left:4px solid #4a7c9e;">
      <p style="margin:0;">
        Este es un B-Tree de <strong>orden 3</strong> (grado máximo 3): cada nodo puede tener hasta 3 hijos,
        y por lo tanto hasta 2 llaves. A diferencia del árbol binario, aquí no hablamos de "hijo
        izquierdo/derecho", sino de posiciones entre llaves: el primer hijo guarda lo menor que la primera
        llave, el último hijo guarda lo mayor o igual que la última.
      </p>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Operación: Buscar (Search)</h4>
    <p>Recorrer un B-Tree para buscar significa comparar la llave buscada contra las llaves de cada nodo, para decidir en qué "hueco" bajar y que hijo corresponde.</p>

    <div class="tree-demo">
    <svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="410" y1="59" x2="130" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="410" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="690" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>

      <g class="tree-nodo" data-nodo="broot" data-nombre="Raíz (12 y 40, con datos)">
        <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40 (+datos)</text>
      </g>
      <g class="tree-nodo" data-nodo="bchild1" data-nombre="Nodo con 5 y 8, con datos">
        <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8 (+datos)</text>
      </g>
      <g class="tree-nodo" data-nodo="bchild2" data-nombre="Nodo con 18 y 25, con datos">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25 (+datos)</text>
      </g>
      <g class="tree-nodo" data-nodo="bchild3" data-nombre="Nodo con 45 y 50, con datos">
        <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50 (+datos)</text>
      </g>

      <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">2 saltos como máximo: raíz &rarr; nodo (ahí ya está el dato completo)</text>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: búsqueda en un B-Tree</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="broot,bchild1">Buscar canción 8</button>
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="broot,bchild2">Buscar canción 25</button>
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="broot,bchild3">Buscar canción 50</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Elige una búsqueda para verla paso a paso.
      </p>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Operación: Recorrido completo (Traverse)</h4>
    <p>Buscar solo visita el camino hacia UNA llave. <strong>Recorrer</strong> el árbol completo significa
      visitar TODAS las páginas, en orden: primero el hijo más a la izquierda, luego la raíz, luego el
      siguiente hijo, y así sucesivamente.</p>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: recorrido completo</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bchild1,broot,bchild2,broot,bchild3" data-mensaje-final="Recorrido completo: 5, 8, 12, 18, 25, 40, 45, 50 — ¡en orden ascendente, sin ordenar nada aparte!">Recorrer todo el árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver el recorrido completo, página por página.
      </p>
    </div>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Operación: Inserción - Insertar</h4>
    <p style="margin:1.2rem 0 0.4rem;">Al insertar una llave nueva, hay dos opciones posibles:</p>
    <ul style="margin:0 0 0.8rem 1.2rem; padding:0;">
      <li><strong>Opción 1:</strong> la página de destino no está llena → la nueva llave simplemente se inserta en su posición ordenada, sin más cambios.</li>
    </ul>

    <div class="tree-demo">
    <svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="410" y1="59" x2="130" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="410" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="690" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>

      <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
      <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>

      <g class="tree-nodo" data-nodo="insertOkTarget" data-nombre="Nodo con solo 8 (le sobra espacio)" data-removable="insertok1" style="transition:opacity 0.5s ease;">
        <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">8</text>
      </g>
      <g data-extra="insertok1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">5, 8</text>
      </g>

      <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25</text>
      <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50</text>

      <g data-removable="insertok1" style="transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Este es el árbol completo; fíjate en la página de la izquierda (solo 8, le sobra espacio)</text>
      </g>
      <g data-extra="insertok1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#6f9d7c" font-weight="700">5 se insertó en su posición ordenada; como no estaba llena, no hizo falta dividir ni tocar el resto del árbol</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: inserción sin problema (opción 1)</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="insertOkTarget" data-revela="insertok1" data-oculta="insertok1" data-mensaje-final="5 se insertó directamente en la página [8]; como no estaba llena, no hizo falta dividir.">Insertar 5 (sin problema)</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver la inserción directa, sin división, sobre el árbol completo.
      </p>
    </div>
    </div>

    <ul style="margin:0.8rem 0 0.8rem 1.2rem; padding:0;">
      <li><strong>Opción 2:</strong> el nodo está lleno, es decir, tiene t-1 claves, el máximo permitido (aquí grado=3, así que t-1=2) → se <strong>divide</strong> antes de insertar: las claves se distribuyen y una llave sube al padre.</li>
    </ul>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Operación: Dividir (Split)</h4>
    <p style="margin:0 0 0.8rem;">
      La regla es precisa: si una página llega a tener <strong>n elementos</strong> (uno más del máximo
      permitido, n-1), se <strong>excede</strong> y debe dividirse. La llave del medio sube al padre, y la
      página se parte en dos, como en el ejemplo de abajo.
    </p>
    <div class="tree-demo">
    <svg viewBox="0 0 820 235" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:0.8rem auto;">
      <line x1="410" y1="59" x2="130" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="410" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="690" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>

      <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
      <g data-removable="split1" style="transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>
      </g>
      <g data-extra="split1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">12 | 40 | 47</text>
      </g>

      <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>
      <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25</text>

      <g class="tree-nodo" data-nodo="splitTarget" data-nombre="Nodo con 45 y 50 (se excede al insertar 47)" data-removable="split1" style="transition:opacity 0.5s ease;">
        <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50</text>
      </g>
      <g data-extra="split1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="600" y="110" width="85" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="642" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">45</text>
        <rect x="695" y="110" width="85" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="737" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">50</text>
        <line x1="737" y1="105" x2="480" y2="35" stroke="#6f9d7c" stroke-width="1.5" stroke-dasharray="3,2"/>
      </g>

      <g data-removable="split1" style="transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Este es el árbol completo; fíjate en la página de la derecha (45, 50)</text>
      </g>
      <g data-extra="split1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#b33a2e" font-weight="700">47 sube al padre; si el padre también se excede, se dividiría igual (no se muestra ese siguiente nivel)</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: inserción con división</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="splitTarget" data-revela="split1" data-oculta="split1" data-mensaje-final="47 se insertó, el nodo se excedió y se dividió: 45 y 50 quedan en páginas separadas, con 47 subiendo como separador al padre.">Insertar 47 y ver la división</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para simular la inserción y la división paso a paso, sobre el árbol completo.
      </p>
    </div>
    </div>

    <div class="content-box" style="margin:0.8rem 0 0.8rem; border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.4rem;"><strong>¿Por qué sube justo el 47, y por qué queda ahí?</strong></p>
      <p style="margin:0;">
        De [45, 47, 50], sube la <strong>mediana</strong> (47): así las dos páginas resultantes quedan parejas
        (45 sola y 50 sola). Y queda después del 40 porque es mayor que él — en un B-Tree cada llave separa
        dos hijos, así que su posición en el padre respeta el orden: menores a la izquierda, mayores a la derecha.
      </p>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Operación: Eliminación - Remove</h4>
    <p style="margin:0 0 0.4rem;">Al eliminar una llave, hay tres opciones posibles:</p>

    <ul style="margin:0 0 0.8rem 1.2rem; padding:0;">
      <li><strong>Opción 1:</strong> la llave está en una hoja → se elimina directamente.</li>
    </ul>

    <div class="tree-demo">
    <svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="410" y1="59" x2="130" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="410" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="690" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>

      <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
      <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>

      <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>

      <g class="tree-nodo" data-nodo="elimLeafTarget" data-nombre="Nodo con 18 y 25 (hoja)" data-removable="elimleaf1" style="transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25</text>
      </g>
      <g data-extra="elimleaf1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">25</text>
      </g>

      <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50</text>

      <g data-removable="elimleaf1" style="transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Este es el árbol completo; fíjate en la página del medio (18, 25)</text>
      </g>
      <g data-extra="elimleaf1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#6f9d7c" font-weight="700">18 se eliminó directo de la hoja; con 1 llave todavía cumple el mínimo, no hace falta más</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: eliminar en una hoja (opción 1)</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="elimLeafTarget" data-revela="elimleaf1" data-oculta="elimleaf1" data-mensaje-final="18 se eliminó directamente de la hoja [18, 25]; no fue necesario tocar el resto del árbol.">Eliminar 18 (directo)</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver la eliminación directa, sobre el árbol completo.
      </p>
    </div>
    </div>

    <ul style="margin:0.8rem 0 0.8rem 1.2rem; padding:0;">
      <li><strong>Opción 2:</strong> la llave está en un nodo interno → se sustituye por su predecesor.</li>
    </ul>

    <div class="tree-demo">
    <svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="410" y1="59" x2="130" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="410" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="690" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>

      <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
      <g class="tree-nodo" data-nodo="elimIntRoot" data-nombre="Raíz (se elimina el 40)" data-removable="elimint1" style="transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>
      </g>
      <g data-extra="elimint1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">12 | 25</text>
      </g>

      <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>

      <g class="tree-nodo" data-nodo="elimIntChild2" data-nombre="Predecesor de 40: la mayor llave a su izquierda (25)" data-removable="elimint1" style="transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25</text>
      </g>
      <g data-extra="elimint1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">18</text>
      </g>

      <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50</text>

      <g data-removable="elimint1" style="transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Este es el árbol completo; el 40 está en la raíz, un nodo interno</text>
      </g>
      <g data-extra="elimint1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#6f9d7c" font-weight="700">25 (el predecesor) subió a ocupar el lugar de 40, y se borró de la hoja donde vivía</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: eliminar en un nodo interno (opción 2)</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="elimIntChild2,elimIntRoot" data-revela="elimint1" data-oculta="elimint1" data-mensaje-final="40 se eliminó de la raíz y fue sustituido por su predecesor (25), que se borró de la hoja donde vivía.">Eliminar 40 (sustituir por predecesor)</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver la sustitución por el predecesor, sobre el árbol completo.
      </p>
    </div>
    </div>

    <div class="content-box" style="margin:0.8rem 0 0.8rem; border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.4rem;"><strong>¿Por qué 25 es el predecesor, y no otro?</strong></p>
      <p style="margin:0;">
        El predecesor de una llave es la inmediatamente menor que ella: la más grande de todas las que están
        a su izquierda, "la más a la derecha del subárbol izquierdo". El subárbol izquierdo de 40 es la
        página [18, 25], y de esas dos la mayor es 25 — por eso sube ella y no el 18.
      </p>
    </div>

    <ul style="margin:0.8rem 0 0.8rem 1.2rem; padding:0;">
      <li><strong>Opción 3:</strong> si un nodo queda con menos del mínimo permitido (déficit real: con este grado, 0 llaves) → se realiza fusión o redistribución con su hermano.</li>
    </ul>

    <div class="tree-demo">
    <svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="410" y1="59" x2="130" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="410" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <line x1="410" y1="59" x2="690" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>

      <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
      <g data-removable="elimdef1" style="transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>
      </g>
      <g data-extra="elimdef1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">12 | 25</text>
      </g>

      <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>

      <g class="tree-nodo" data-nodo="elimDefChild2" data-nombre="Nodo con 18 y 25 (tiene de sobra)" data-removable="elimdef1" style="transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25</text>
      </g>
      <g data-extra="elimdef1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">18</text>
      </g>

      <g class="tree-nodo" data-nodo="elimDefChild3" data-nombre="Nodo con solo 50 (ya está en el mínimo de 1 llave)" data-removable="elimdef1" style="transition:opacity 0.5s ease;">
        <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">50</text>
      </g>
      <g data-extra="elimdef1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">40</text>
      </g>

      <g data-removable="elimdef1" style="transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Este es el árbol completo; fíjate en la página de la derecha (solo 50, ya en el mínimo)</text>
      </g>
      <g data-extra="elimdef1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#6f9d7c" font-weight="700">50 se eliminó y la página quedó con 0 llaves (déficit real); 25 sube al padre y 40 baja a ocupar el hueco</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: déficit tras eliminar (opción 3)</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="elimDefChild2,elimDefChild3" data-revela="elimdef1" data-oculta="elimdef1" data-mensaje-final="La página quedó con 0 llaves (déficit real). Como la hermana tenía de sobra, se redistribuyó en vez de fusionar. Si ningún hermano tuviera de sobra, tocaría fusionar (ver más abajo).">Eliminar 50 y ver el rebalanceo</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver el déficit y su solución, sobre el árbol completo.
      </p>
    </div>
    </div>

    <div class="content-box" style="margin:0.8rem 0 0.8rem; border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.6rem;"><strong>Paso a paso: ¿qué pasó exactamente?</strong></p>

      <div class="tree-stepper">
        <div class="tree-step-frame" data-step="1" style="">
          <svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%; height:auto; display:block; margin:0 auto;">
            <line x1="410" y1="59" x2="130" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="410" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="690" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
            <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>
            <rect x="40" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="130" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>
            <rect x="320" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="410" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25</text>
            <rect x="600" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="690" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">50</text>
            <text x="410" y="172" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">1. La página de la derecha tiene solo 50: ya está en el mínimo (con grado 3, mínimo = 1 llave)</text>
          </svg>
        </div>

        <div class="tree-step-frame" data-step="2" style="display:none;">
          <svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%; height:auto; display:block; margin:0 auto;">
            <line x1="410" y1="59" x2="130" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="410" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="690" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
            <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>
            <rect x="40" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="130" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>
            <rect x="320" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="410" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 25</text>
            <rect x="600" y="95" width="180" height="50" rx="6" fill="none" stroke="#b33a2e" stroke-width="2.5" stroke-dasharray="4,3"/>
            <text x="690" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#b33a2e" font-weight="700">∅ (0 llaves)</text>
            <text x="410" y="172" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#b33a2e" font-weight="700">2. Se elimina 50 → la página queda con 0 llaves: eso sí es déficit real</text>
          </svg>
        </div>

        <div class="tree-step-frame" data-step="3" style="display:none;">
          <svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%; height:auto; display:block; margin:0 auto;">
            <line x1="410" y1="59" x2="130" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="410" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="690" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
            <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>
            <rect x="40" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="130" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>
            <rect x="320" y="95" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
            <text x="410" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">18, 25</text>
            <rect x="600" y="95" width="180" height="50" rx="6" fill="none" stroke="#b33a2e" stroke-width="2.5" stroke-dasharray="4,3"/>
            <text x="690" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#b33a2e" font-weight="700">∅ (0 llaves)</text>
            <text x="410" y="172" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#6f9d7c" font-weight="700">3. Se revisa la hermana [18, 25]: tiene una llave de sobra sobre el mínimo</text>
          </svg>
        </div>

        <div class="tree-step-frame" data-step="4" style="display:none;">
          <svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%; height:auto; display:block; margin:0 auto;">
            <line x1="410" y1="59" x2="130" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="410" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="690" y2="95" stroke="#6f9d7c" stroke-width="2" stroke-dasharray="4,3"/>
            <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
            <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="var(--text-dim)">12 | <tspan text-decoration="line-through">40</tspan></text>
            <rect x="40" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="130" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>
            <rect x="320" y="95" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
            <text x="410" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">18, 25</text>
            <rect x="600" y="95" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
            <text x="690" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">40</text>
            <text x="410" y="172" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#6f9d7c" font-weight="700">4. El separador del padre (40) baja a la página con déficit → queda con [40]</text>
          </svg>
        </div>

        <div class="tree-step-frame" data-step="5" style="display:none;">
          <svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%; height:auto; display:block; margin:0 auto;">
            <line x1="410" y1="59" x2="130" y2="95" stroke="#4a7c9e" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="410" y2="95" stroke="#6f9d7c" stroke-width="2.5"/>
            <line x1="410" y1="59" x2="690" y2="95" stroke="#6f9d7c" stroke-width="2.5"/>
            <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
            <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">12 | 25</text>
            <rect x="40" y="95" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
            <text x="130" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>
            <rect x="320" y="95" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
            <text x="410" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">18</text>
            <rect x="600" y="95" width="180" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
            <text x="690" y="125" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">40</text>
            <text x="410" y="172" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#6f9d7c" font-weight="700">5. La llave mayor de la hermana (25) sube al padre; la hermana queda con [18] — todo vuelve al mínimo</text>
          </svg>
        </div>

        <div class="content-box" style="margin-top:0.6rem;">
          <div style="display:flex; gap:0.6rem; align-items:center; flex-wrap:wrap;">
            <button type="button" class="btn btn-secondary tree-step-prev" disabled>← Anterior</button>
            <span class="tree-step-counter" style="font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent);">Paso 1 de 5</span>
            <button type="button" class="btn btn-secondary tree-step-next">Siguiente →</button>
          </div>
        </div>
      </div>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">¿Y si ningún hermano tiene de sobra? — Fusionar (Merge)</h4>
    <p style="margin:0 0 0.8rem;">
      La Opción 3 de arriba resolvió el déficit pidiendo prestado, porque la hermana tenía una llave de
      sobra. Pero si <strong>ningún hermano tiene de sobra</strong> (todos están justo en el mínimo), no se
      puede redistribuir sin dejar a ese hermano también en déficit. En ese caso, la única salida es
      <strong>fusionar</strong>: combinar la página vacía, el hermano y la llave separadora del padre en una
      sola página.
    </p>

    <div class="tree-demo">
    <svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="max-width:740px; width:100%; height:auto; display:block; margin:0.8rem auto;">
      <line x1="410" y1="59" x2="130" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      <g data-removable="merge1" style="transition:opacity 0.5s ease;">
        <line x1="410" y1="59" x2="410" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
        <line x1="410" y1="59" x2="690" y2="110" stroke="#4a7c9e" stroke-width="2.5"/>
      </g>
      <g data-extra="merge1" style="opacity:0; transition:opacity 0.5s ease;">
        <line x1="410" y1="59" x2="550" y2="110" stroke="#6f9d7c" stroke-width="2.5"/>
      </g>

      <rect x="340" y="15" width="140" height="44" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2.5"/>
      <g data-removable="merge1" style="transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#4a7c9e" font-weight="700">12 | 40</text>
      </g>
      <g data-extra="merge1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="42" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">12</text>
      </g>

      <rect x="40" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
      <text x="130" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 8</text>

      <g class="tree-nodo" data-nodo="mergeChild2" data-nombre="Nodo con solo 18 (ya en el mínimo, sin nada de sobra)" data-removable="merge1" style="transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="410" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18</text>
      </g>
      <g class="tree-nodo" data-nodo="mergeChild3" data-nombre="Nodo con solo 50 (se va a eliminar y quedar en 0 llaves)" data-removable="merge1" style="transition:opacity 0.5s ease;">
        <rect x="600" y="110" width="180" height="50" rx="6" fill="none" stroke="#4a7c9e" stroke-width="2"/>
        <text x="690" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">50</text>
      </g>

      <g data-extra="merge1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="320" y="110" width="460" height="50" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="550" y="140" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#6f9d7c" font-weight="700">18 | 40</text>
      </g>

      <g data-removable="merge1" style="transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="var(--text-dim)">Este es el árbol completo; ni "18" ni "50" tienen nada de sobra (ambos están al mínimo)</text>
      </g>
      <g data-extra="merge1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="410" y="198" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#6f9d7c" font-weight="700">50 se eliminó (0 llaves, déficit real); como nadie tenía de sobra, se fusionó con el hermano y el separador 40 — el padre queda con una sola llave</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: fusionar (merge)</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="mergeChild3,mergeChild2" data-revela="merge1" data-oculta="merge1" data-mensaje-final="Fusión completa: el hermano, el separador del padre y la página vacía se combinaron en una sola página [18, 40].">Eliminar 50 y fusionar</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver cómo el separador del padre baja y las páginas se combinan, sobre el árbol completo.
      </p>
    </div>
    </div>

    <div class="content-box" style="border-left:4px solid #4a7c9e;">
      <p style="margin:0 0 0.5rem;"><strong>Practica en vivo: graficador de B-Trees</strong></p>
      <p style="margin:0;">
        Para ver estas 4 operaciones en tiempo real, usa el graficador de la Universidad de San Francisco:
        <a href="https://www.cs.usfca.edu/~galles/visualization/BTree.html" target="_blank" rel="noopener">cs.usfca.edu/~galles/visualization/BTree.html</a>.
        Configura <strong>"Max Degree" = 3</strong> (para que coincida con nuestro ejemplo de orden 3) e
        inserta, en este orden, las mismas 10 canciones de la actividad: <code>5, 12, 18, 20, 25, 30, 32,
        40, 45, 50</code>. Verás varias divisiones (splits) en vivo. Después, elimina el 20 y el 12 para
        mostrar los distintos casos de eliminación.
      </p>
    </div>
  </div>

  <!-- ===================== 4. B+TREE ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>B+Tree: la biblioteca de alto rendimiento</h3>
    </div>
    <p>
      En un B+Tree, los pisos de arriba <strong>solo tienen letreros</strong> (llaves de navegación y
      punteros). Todos los datos completos viven <strong>exclusivamente en el primer piso</strong>, los
      llamados nodos hoja. Y hay un segundo truco: todas las hojas están amarradas entre sí con una
      "cuerda", en la práctica una lista enlazada.
    </p>

    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0 0 0.5rem;"><strong>Características de un B+Tree</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text); columns:2; column-gap:1.5rem;">
        <li><strong>Equilibrado:</strong> todas las hojas están siempre al mismo nivel.</li>
        <li><strong>Multinivel:</strong> raíz, uno o más niveles internos, y hojas.</li>
        <li><strong>Ordenado:</strong> las llaves dentro de cada página, y las hojas entre sí, siempre están en orden.</li>
        <li><strong>Alta distribución en abanico (fan-out):</strong> muchos hijos por nodo, porque los nodos internos no cargan datos.</li>
        <li><strong>Compatible con caché:</strong> cada página suele coincidir con el tamaño de una página de memoria/disco, aprovechando la caché del sistema.</li>
        <li><strong>Eficiente en disco:</strong> pocos niveles significan pocas lecturas de disco por consulta.</li>
      </ul>
    </div>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>Ventaja 1: más letreros por piso</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Como los nodos internos solo
          guardan llaves y punteros (sin datos), caben muchísimos más en cada nodo. Eso se llama
          <strong>fan-out</strong> alto, y significa un árbol más bajito para la misma cantidad de datos:
          llegas al fondo más rápido.</p>
      </div>
      <div class="concept-card">
        <h4>Ventaja 2 (la clave): hojas encadenadas</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Todas las hojas están conectadas en
          orden con la "cuerda". Si quieres las canciones del ID 18 al 40, buscas el 18 una sola vez y
          luego sigues la cuerda: nunca vuelves a subir a los pisos de arriba.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">
      Así se organizarían nuestras 10 canciones de ejemplo (IDs 5, 12, 18, 20, 25, 30, 32, 40, 45, 50) en un
      B+Tree real, también de <strong>orden 3</strong>, con <strong>3 niveles</strong>: raíz, nodos internos
      y hojas.
    </p>

    <div class="tree-demo" id="btreeDemo">
    <svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" style="max-width:820px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <defs>
        <marker id="flechaBTree" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"/>
        </marker>
        <marker id="flechaCadena" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#c9a227"/>
        </marker>
      </defs>

      <line x1="420" y1="60" x2="185" y2="130" stroke="#7c3aed" stroke-width="2" marker-end="url(#flechaBTree)"/>
      <line x1="420" y1="60" x2="655" y2="130" stroke="#7c3aed" stroke-width="2" marker-end="url(#flechaBTree)"/>

      <line x1="185" y1="174" x2="105" y2="250" stroke="#7c3aed" stroke-width="2" marker-end="url(#flechaBTree)"/>
      <line x1="185" y1="174" x2="265" y2="250" stroke="#7c3aed" stroke-width="2" marker-end="url(#flechaBTree)"/>
      <line x1="655" y1="174" x2="495" y2="250" stroke="#7c3aed" stroke-width="2" marker-end="url(#flechaBTree)"/>
      <line x1="655" y1="174" x2="655" y2="250" stroke="#7c3aed" stroke-width="2" marker-end="url(#flechaBTree)"/>
      <line x1="655" y1="174" x2="815" y2="250" stroke="#7c3aed" stroke-width="2" marker-end="url(#flechaBTree)"/>

      <line x1="170" y1="278" x2="200" y2="278" stroke="#c9a227" stroke-width="2.5" marker-end="url(#flechaCadena)"/>
      <line x1="330" y1="278" x2="430" y2="278" stroke="#c9a227" stroke-width="2.5" marker-end="url(#flechaCadena)"/>
      <line x1="560" y1="278" x2="590" y2="278" stroke="#c9a227" stroke-width="2.5" marker-end="url(#flechaCadena)"/>
      <line x1="720" y1="278" x2="750" y2="278" stroke="#c9a227" stroke-width="2.5" marker-end="url(#flechaCadena)"/>

      <text x="420" y="14" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="#8b7fb8">Nivel 1: raíz</text>
      <g class="tree-nodo" data-nodo="root" data-nombre="Raíz (separador 25)">
        <rect x="360" y="20" width="120" height="40" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="420" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#7c3aed" font-weight="700">25</text>
      </g>

      <text x="420" y="122" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="#8b7fb8">Nivel 2: nodos internos (solo punteros, sin datos)</text>
      <g class="tree-nodo" data-nodo="intL" data-nombre="Interno izquierdo (separador 18)">
        <rect x="110" y="130" width="150" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="185" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">18</text>
      </g>
      <g class="tree-nodo" data-nodo="intR" data-nombre="Interno derecho (separadores 32 y 45)">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">32   |   45</text>
      </g>

      <text x="420" y="242" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="#8b7fb8">Nivel 3: hojas (todos los datos, encadenadas entre sí)</text>
      <g class="tree-nodo" data-nodo="leaf1" data-nombre="Hoja 1 (canciones 5 y 12)">
        <rect x="40" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="105" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 12</text>
      </g>
      <g class="tree-nodo" data-nodo="leaf2" data-nombre="Hoja 2 (canciones 18 y 20)">
        <rect x="200" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="265" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 20</text>
      </g>
      <g class="tree-nodo" data-nodo="leaf3" data-nombre="Hoja 3 (canciones 25 y 30)">
        <rect x="430" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="495" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">25, 30</text>
      </g>
      <g class="tree-nodo" data-nodo="leaf4" data-nombre="Hoja 4 (canciones 32 y 40)">
        <rect x="590" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="655" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">32, 40</text>
      </g>
      <g class="tree-nodo" data-nodo="leaf5" data-nombre="Hoja 5 (canciones 45 y 50)">
        <rect x="750" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="815" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50</text>
      </g>

      <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#c9a227" font-weight="700">La línea dorada es la "cuerda" que conecta todas las hojas en orden</text>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: elige un recorrido y mira cómo se mueve el motor</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="root,intR,leaf4">Buscar canción #32</button>
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="root,intL,leaf2,leaf3,leaf4">Escanear rango 18–40</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Elige un recorrido para verlo paso a paso.
      </p>
    </div>
    </div>
  </div>

  <!-- ===================== 5. RECORRIDO: BUSCAR #32 ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Operación: Buscar (Search) — encontrando la canción #32</h3>
    </div>
    <p>
      Dale clic al botón "Buscar canción #32" del simulador de arriba. El motor compara 32 contra la raíz
      (25): como 32 es mayor o igual, baja por la derecha al nodo interno. Ahí compara contra 32 y 45: como
      32 es mayor o igual a 32 y menor que 45, baja al hijo del medio, la hoja que guarda 32 y 40. Ahí está
      el dato completo.
    </p>
    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0;">
        Son <strong>3 saltos</strong>, uno por nivel: raíz → nodo interno → hoja. Ni uno más, sin importar
        en qué hoja termine cayendo la búsqueda, porque el árbol está balanceado: todas las hojas están
        siempre a la misma distancia de la raíz.
      </p>
    </div>
  </div>

  <!-- ===================== 6. ESCANEO DE RANGO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Operación: Recorrido secuencial — canciones entre el 18 y el 40</h3>
    </div>
    <p>
      Dale clic ahora a "Escanear rango 18–40". El motor primero baja normal, raíz → nodo interno izquierdo,
      hasta encontrar la <strong>primera hoja</strong> que puede contener el 18 (la hoja con 18 y 20). Desde
      ahí, en vez de volver a subir a la raíz para buscar el siguiente valor, simplemente
      <strong>sigue la cuerda</strong> hacia la hoja vecina (25, 30), y luego a la siguiente (32, 40), hasta
      pasarse del límite superior del rango.
    </p>
  </div>

  <!-- ===================== 7. INSERCIÓN/ELIMINACIÓN EN B+TREE Y COMPARACIÓN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Insertar, dividir, eliminar y fusionar en un B+Tree</h3>
    </div>
    <p>
      Insertar y eliminar en un B+Tree usa el <strong>mismo mecanismo de división y fusión</strong> que
      acabas de ver en los B-Trees, con un detalle extra: como todos los datos viven en las hojas, dividir o
      fusionar una hoja también obliga a actualizar los punteros de la cadena, para que las hojas sigan
      conectadas en orden. Dividir o fusionar un nodo interno (que no tiene datos, solo punteros) funciona
      exactamente igual que en un B-Tree normal.
    </p>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.2rem 0 0.4rem;">Operación: Insertar</h4>
    <div class="content-box">
      <p style="margin:0;">
        Ejemplo: insertar la canción <strong>47</strong>. El motor busca su hoja (como en la búsqueda de
        arriba) y llega a la hoja <code>[32, 40]</code>. Como esa hoja ya tiene 2 llaves, el máximo para
        orden 3, se excede y hay que <strong>dividir</strong>.
      </p>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.2rem 0 0.4rem;">Operación: Dividir nodo (Split)</h4>
    <div class="content-box">
      <p style="margin:0;">
        La hoja <code>[32, 40, 47]</code> (ya con la nueva canción) se parte en dos:
        <code>[32]</code> y <code>[40, 47]</code>. A diferencia de un B-Tree, la llave separadora
        (<strong>40</strong>) se <strong>copia</strong> hacia el padre (no se mueve, sigue también en la
        hoja), y el puntero de la cadena de <code>[32]</code> se actualiza para que apunte a
        <code>[40, 47]</code>, manteniendo las hojas encadenadas en orden.
      </p>
    </div>

    <div class="tree-demo">
    <svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" style="max-width:820px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="420" y1="60" x2="185" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="420" y1="60" x2="655" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="105" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="265" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="495" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="655" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="815" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="170" y1="278" x2="200" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="330" y1="278" x2="430" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="560" y1="278" x2="590" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="720" y1="278" x2="750" y2="278" stroke="#c9a227" stroke-width="2.5"/>

      <text x="420" y="14" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="#8b7fb8">Nivel 1: raíz</text>
      <rect x="360" y="20" width="120" height="40" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="420" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#7c3aed" font-weight="700">25</text>

      <text x="420" y="122" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="#8b7fb8">Nivel 2: nodos internos</text>
      <rect x="110" y="130" width="150" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="185" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">18</text>

      <g class="tree-nodo" data-nodo="bpSplitIntR" data-nombre="Interno derecho (recibirá el nuevo separador 40)" data-removable="bpsplit1" style="transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">32   |   45</text>
      </g>
      <g data-extra="bpsplit1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#b33a2e" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e" font-weight="700">32 | 40 | 45</text>
      </g>

      <text x="420" y="242" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="#8b7fb8">Nivel 3: hojas (encadenadas entre sí)</text>
      <rect x="40" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="105" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 12</text>
      <rect x="200" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="265" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 20</text>
      <rect x="430" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="495" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">25, 30</text>

      <g class="tree-nodo" data-nodo="bpSplitLeaf4" data-nombre="Hoja con 32 y 40 (se excede al insertar 47)" data-removable="bpsplit1" style="transition:opacity 0.5s ease;">
        <rect x="590" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="655" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">32, 40</text>
      </g>
      <g data-extra="bpsplit1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="588" y="250" width="62" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="619" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">32</text>
        <line x1="650" y1="278" x2="657" y2="278" stroke="#c9a227" stroke-width="2.5"/>
        <rect x="658" y="250" width="62" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="689" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#6f9d7c" font-weight="700">40, 47</text>
      </g>

      <rect x="750" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="815" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50</text>

      <g data-removable="bpsplit1" style="transition:opacity 0.5s ease;">
        <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#c9a227" font-weight="700">La línea dorada es la "cuerda" que conecta todas las hojas en orden</text>
      </g>
      <g data-extra="bpsplit1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#b33a2e" font-weight="700">el nodo interno también quedó con 3 llaves: se excede y tendría que dividirse (no se muestra ese siguiente nivel)</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: dividir una hoja</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bpSplitLeaf4,bpSplitIntR" data-revela="bpsplit1" data-oculta="bpsplit1" data-mensaje-final="47 se insertó, la hoja se dividió en [32] y [40, 47], la cadena se actualizó, y 40 se copió al padre.">Insertar 47 y dividir la hoja</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver la hoja dividirse, sobre el árbol completo.
      </p>
    </div>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.4rem 0 0.4rem;">Operación: Eliminar (Remove)</h4>
    <div class="content-box">
      <p style="margin:0;">
        Ejemplo: eliminar la canción <strong>45</strong>. El motor la busca y la quita de la hoja
        <code>[45, 50]</code>, que queda como <code>[50]</code>. Como 45 ya no existe en ninguna hoja, el
        separador del padre también se actualiza: de <code>32 | 45</code> pasa a <code>32 | 50</code>, para
        seguir reflejando la menor llave real de esa hoja. Si la hoja llega a tener menos del mínimo
        permitido, entra en juego redistribuir o fusionar, igual que en un B-Tree.
      </p>
    </div>

    <div class="tree-demo">
    <svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" style="max-width:820px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="420" y1="60" x2="185" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="420" y1="60" x2="655" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="105" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="265" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="495" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="655" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="815" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="170" y1="278" x2="200" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="330" y1="278" x2="430" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="560" y1="278" x2="590" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="720" y1="278" x2="750" y2="278" stroke="#c9a227" stroke-width="2.5"/>

      <rect x="360" y="20" width="120" height="40" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="420" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#7c3aed" font-weight="700">25</text>
      <rect x="110" y="130" width="150" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="185" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">18</text>
      <g class="tree-nodo" data-nodo="bpRemIntR" data-nombre="Interno derecho (separador a actualizar)" data-removable="bprem1" style="transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">32   |   45</text>
      </g>
      <g data-extra="bprem1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#6f9d7c" font-weight="700">32   |   50</text>
      </g>
      <rect x="40" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="105" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 12</text>
      <rect x="200" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="265" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 20</text>
      <rect x="430" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="495" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">25, 30</text>
      <rect x="590" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="655" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">32, 40</text>

      <g class="tree-nodo" data-nodo="bpRemAntes" data-nombre="Hoja con 45 y 50 (antes de eliminar 45)" data-removable="bprem1" style="transition:opacity 0.5s ease;">
        <rect x="750" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="815" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">45, 50</text>
      </g>
      <g data-extra="bprem1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="750" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="815" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">50</text>
      </g>

      <g data-removable="bprem1" style="transition:opacity 0.5s ease;">
        <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#c9a227" font-weight="700">La línea dorada es la "cuerda" que conecta todas las hojas en orden</text>
      </g>
      <g data-extra="bprem1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#6f9d7c" font-weight="700">45 se eliminó; el separador del padre se actualizó a 50 para seguir reflejando la menor llave real de esa hoja</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bpRemAntes,bpRemIntR" data-revela="bprem1" data-oculta="bprem1" data-mensaje-final="45 fue eliminada. La hoja queda con [50] (justo en el mínimo permitido), y el separador del padre se actualizó a 50.">Eliminar la canción 45</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver la eliminación, sobre el árbol completo.
      </p>
    </div>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.2rem 0 0.4rem;">Operación: Redistribuir (Borrow)</h4>
    <div class="content-box">
      <p style="margin:0;">
        La hoja <code>[50]</code> ya está justo en el mínimo (1 llave): eso todavía es válido, no es déficit.
        El déficit real aparece si eliminamos también el 50: la hoja quedaría con <strong>0 llaves</strong>.
        Como su hoja vecina <code>[32, 40]</code> tiene una llave de sobra, esa hoja le "presta" su llave más
        cercana (40): la hoja vecina queda <code>[32]</code>, la hoja afectada queda <code>[40]</code>, y se
        actualiza la llave separadora del padre para reflejar el cambio. No hace falta fusionar nada.
      </p>
    </div>

    <div class="tree-demo">
    <svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" style="max-width:820px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="420" y1="60" x2="185" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="420" y1="60" x2="655" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="105" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="265" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="495" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="655" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="815" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="170" y1="278" x2="200" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="330" y1="278" x2="430" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="560" y1="278" x2="590" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="720" y1="278" x2="750" y2="278" stroke="#c9a227" stroke-width="2.5"/>

      <rect x="360" y="20" width="120" height="40" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="420" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#7c3aed" font-weight="700">25</text>
      <rect x="110" y="130" width="150" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="185" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">18</text>

      <g class="tree-nodo" data-nodo="bpBorrowIntR" data-nombre="Interno derecho (separador a actualizar)" data-removable="bpborrow1" style="transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">32   |   45</text>
      </g>
      <g data-extra="bpborrow1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">32   |   40</text>
      </g>

      <rect x="40" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="105" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 12</text>
      <rect x="200" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="265" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 20</text>
      <rect x="430" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="495" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">25, 30</text>

      <g class="tree-nodo" data-nodo="bpBorrowLeaf4" data-nombre="Hoja con 32 y 40 (tiene de sobra)" data-removable="bpborrow1" style="transition:opacity 0.5s ease;">
        <rect x="590" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="655" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">32, 40</text>
      </g>
      <g data-extra="bpborrow1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="590" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="655" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">32</text>
      </g>

      <g class="tree-nodo" data-nodo="bpBorrowLeaf5" data-nombre="Hoja con solo 50 (ya en el mínimo de 1 llave)" data-removable="bpborrow1" style="transition:opacity 0.5s ease;">
        <rect x="750" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="815" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">50</text>
      </g>
      <g data-extra="bpborrow1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="750" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="815" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#6f9d7c" font-weight="700">40</text>
      </g>

      <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#c9a227" font-weight="700">La línea dorada es la "cuerda" que conecta todas las hojas en orden</text>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: redistribuir (borrow)</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bpBorrowLeaf4,bpBorrowLeaf5,bpBorrowIntR" data-revela="bpborrow1" data-oculta="bpborrow1" data-mensaje-final="50 se eliminó (0 llaves, déficit real); la hoja vecina prestó su llave 40, y el padre actualizó su separador. No hizo falta fusionar nada.">Eliminar 50 y redistribuir</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver la llave pasar de una hoja a otra, sobre el árbol completo.
      </p>
    </div>
    </div>

    <h4 style="color:var(--accent); font-size:1rem; margin:1.2rem 0 0.4rem;">Operación: Fusionar (Merge)</h4>
    <div class="content-box">
      <p style="margin:0;">
        Si en cambio ningún hermano tiene llaves de sobra (ambas hojas están justo en el mínimo de 1 llave),
        no se puede redistribuir. Al eliminar la única llave de una de ellas, queda con 0 llaves (déficit
        real), y entonces se fusiona con su vecina: se combinan en una sola hoja, se elimina la llave
        separadora que ya no hace falta en el padre, y se reconecta la cadena para saltarse la hoja que
        desapareció.
      </p>
    </div>

    <div class="tree-demo">
    <svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" style="max-width:820px; width:100%; height:auto; display:block; margin:0.8rem auto 0;">
      <line x1="420" y1="60" x2="185" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="420" y1="60" x2="655" y2="130" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="105" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="185" y1="174" x2="265" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="495" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="655" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="655" y1="174" x2="815" y2="250" stroke="#7c3aed" stroke-width="2"/>
      <line x1="170" y1="278" x2="200" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <line x1="330" y1="278" x2="430" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      <g data-removable="bpmerge1" style="transition:opacity 0.5s ease;">
        <line x1="560" y1="278" x2="590" y2="278" stroke="#c9a227" stroke-width="2.5"/>
        <line x1="720" y1="278" x2="750" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      </g>
      <g data-extra="bpmerge1" style="opacity:0; transition:opacity 0.5s ease;">
        <line x1="560" y1="278" x2="590" y2="278" stroke="#c9a227" stroke-width="2.5"/>
      </g>

      <rect x="360" y="20" width="120" height="40" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="420" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#7c3aed" font-weight="700">25</text>
      <rect x="110" y="130" width="150" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="185" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">18</text>

      <g class="tree-nodo" data-nodo="bpMergeIntR" data-nombre="Interno derecho (pierde el separador 45)" data-removable="bpmerge1" style="transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">32   |   45</text>
      </g>
      <g data-extra="bpmerge1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="550" y="130" width="210" height="44" rx="6" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="655" y="157" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#7c3aed" font-weight="700">32</text>
      </g>

      <rect x="40" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="105" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">5, 12</text>
      <rect x="200" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="265" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">18, 20</text>
      <rect x="430" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
      <text x="495" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">25, 30</text>

      <g class="tree-nodo" data-nodo="bpMergeLeaf4" data-nombre="Hoja con solo 32 (al mínimo, sin sobra)" data-removable="bpmerge1" style="transition:opacity 0.5s ease;">
        <rect x="590" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="655" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">32</text>
      </g>
      <g class="tree-nodo" data-nodo="bpMergeLeaf5" data-nombre="Hoja con solo 50 (se va a eliminar y quedar en 0 llaves)" data-removable="bpmerge1" style="transition:opacity 0.5s ease;">
        <rect x="750" y="250" width="130" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="815" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="var(--text)">50</text>
      </g>

      <g data-extra="bpmerge1" style="opacity:0; transition:opacity 0.5s ease;">
        <rect x="590" y="250" width="290" height="56" rx="6" fill="none" stroke="#6f9d7c" stroke-width="2.5"/>
        <text x="735" y="283" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#6f9d7c" font-weight="700">32</text>
      </g>

      <g data-removable="bpmerge1" style="transition:opacity 0.5s ease;">
        <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#c9a227" font-weight="700">Ni "32" ni "50" tienen de sobra (ambas al mínimo): no se puede redistribuir</text>
      </g>
      <g data-extra="bpmerge1" style="opacity:0; transition:opacity 0.5s ease;">
        <text x="420" y="322" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9.5" fill="#6f9d7c" font-weight="700">50 se eliminó (0 llaves, déficit real); se fusionó con su vecina y el separador 45 desapareció del padre</text>
      </g>
    </svg>

    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: fusionar (merge)</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary tree-traversal-btn" data-orden="bpMergeLeaf4,bpMergeLeaf5,bpMergeIntR" data-revela="bpmerge1" data-oculta="bpmerge1" data-mensaje-final="50 se eliminó (0 llaves); como nadie tenía de sobra, se fusionó con su vecina, el separador 45 desapareció del padre y la cadena se reconectó.">Eliminar 50 y fusionar</button>
        <button type="button" class="btn btn-secondary tree-reset-btn" style="opacity:0.8;">↺ Reiniciar árbol</button>
      </div>
      <p class="tree-demo-status" style="margin:0; font-family:Consolas, monospace; font-size:0.85rem; color:var(--accent); min-height:1.4em;">
        Dale clic para ver la fusión y la cadena reconectarse, sobre el árbol completo.
      </p>
    </div>
    </div>

    <div class="content-box" style="border-left:4px solid #4a7c9e;">
      <p style="margin:0 0 0.5rem;"><strong>Practica en vivo: graficador de B+Trees</strong></p>
      <p style="margin:0;">
        El mismo sitio de la Universidad de San Francisco tiene un graficador dedicado a B+Trees:
        <a href="https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html" target="_blank" rel="noopener">cs.usfca.edu/~galles/visualization/BPlusTree.html</a>.
        Configura de nuevo <strong>"Max Degree" = 3</strong> e inserta la misma secuencia:
        <code>5, 12, 18, 20, 25, 30, 32, 40, 45, 50</code>. Fíjate cómo, a diferencia del graficador de
        B-Trees, aquí las hojas quedan visiblemente conectadas entre sí. Luego elimina un par de valores
        para mostrar redistribución y fusión en vivo.
      </p>
    </div>

    <p style="margin-top:1.2rem;">
      Ahora sí, la pregunta central: ¿por qué no usar directamente el árbol binario balanceado que vimos
      antes? Recuerda que ese BST necesitó <strong>4 niveles</strong> para las mismas 10 canciones, mientras
      que el B+Tree de arriba solo necesitó <strong>3</strong>. La diferencia se dispara con más datos.
    </p>

    <div class="content-box" style="border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.6rem;"><strong>Llevando esto a los 100 millones de canciones de SoundFlow</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Árbol binario (fan-out 2): niveles ≈ log&#8322;(100.000.000) ≈ <strong>27 saltos</strong> a
          disco en el peor caso.</li>
        <li>B+Tree con un fan-out realista de motor de base de datos (por ejemplo, 500 punteros por nodo):
          niveles ≈ log&#8345;&#8342;&#8342;(100.000.000) ≈ <strong>solo 3 saltos</strong>.</li>
        <li>Cada salto es una lectura potencial de disco. Pasar de 27 a 3 saltos es la diferencia entre una
          consulta que se siente instantánea y una que el usuario nota como lenta.</li>
      </ul>
    </div>

    <div class="concept-grid">
      <div class="concept-card">
        <h4>Fan-out bajo (árbol binario)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Máximo 2 hijos por nodo. Para
          muchos datos, el árbol crece principalmente en altura.</p>
      </div>
      <div class="concept-card">
        <h4>Fan-out alto (B+Tree)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Cientos de hijos por nodo posibles,
          porque los nodos internos no cargan datos. El árbol crece principalmente en ancho, no en
          altura.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 8. MOTORES REALES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Estos árboles ya los usas: MySQL y MongoDB</h3>
    </div>
    <p>
      Los motores que ya usaste en este curso implementan índices con variantes
      de B+Tree por debajo, aunque no siempre lo digan con ese nombre.
    </p>

    <div class="content-box" style="border-left:4px solid #e24b4a;">
      <p style="margin:0 0 0.5rem;"><strong>MySQL (InnoDB)</strong></p>
      <p style="margin:0;">
        El motor InnoDB usa B+Tree tanto para el índice primario, que guarda la fila completa en la hoja,
        como para los índices secundarios que creaste en semanas anteriores.
      </p>
      <div class="code-block" style="margin-top:0.6rem;">
        <div class="code-block-header">
          <span class="code-dot" style="background:#ff5f56"></span>
          <span class="code-dot" style="background:#ffbd2e"></span>
          <span class="code-dot" style="background:#27c93f"></span>
          <span class="code-filename">mysql_indices.sql</span>
          <button class="code-copy-btn" type="button">Copiar</button>
        </div>
        <pre><code>SHOW INDEX FROM tbl_canciones;
-- Type: BTREE (en la práctica, InnoDB lo implementa como B+Tree)</code></pre>
      </div>
    </div>

    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:1rem;">
      <p style="margin:0 0 0.5rem;"><strong>MongoDB (WiredTiger)</strong></p>
      <p style="margin:0;">
        El motor de almacenamiento WiredTiger, el que usa Compass por debajo, guarda tanto las colecciones
        como sus índices en estructuras B-Tree, descritas por la propia documentación como efectivamente
        B+Tree en la práctica.
      </p>
      <div class="code-block" style="margin-top:0.6rem;">
        <div class="code-block-header">
          <span class="code-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#6f9d7c"/></svg>
            MongoDB
          </span>
          <span class="code-filename">mongo_indices.js</span>
          <button class="code-copy-btn" type="button">Copiar</button>
        </div>
        <pre><code>db.canciones.createIndex({ <span class="code-key">id_cancion</span>: <span class="code-num">1</span> })
db.canciones.getIndexes()</code></pre>
      </div>
    </div>
  </div>

  <!-- ===================== QUIZ ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Quiz rápido de autoevaluación</h3>
    </div>
    <div class="quiz-box">

      <div class="quiz-question">
        <p>1. El grado de un nodo en un árbol es...</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Su nivel dentro del árbol</button>
          <button type="button" class="quiz-option" data-correct="true">La cantidad de hijos directos que tiene</button>
          <button type="button" class="quiz-option" data-correct="false">La cantidad de hojas del árbol completo</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Qué distingue a un árbol binario de un árbol genérico?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">No puede tener hojas</button>
          <button type="button" class="quiz-option" data-correct="true">El grado máximo de cualquier nodo es 2 (hijo izquierdo y derecho)</button>
          <button type="button" class="quiz-option" data-correct="false">No tiene raíz</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Qué recorrido de un Árbol Binario de Búsqueda entrega los datos en orden ascendente?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Preorden</button>
          <button type="button" class="quiz-option" data-correct="true">Inorden</button>
          <button type="button" class="quiz-option" data-correct="false">Postorden</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Por qué un árbol binario de búsqueda sin balancear puede degradarse a O(n)?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque pierde la raíz</button>
          <button type="button" class="quiz-option" data-correct="true">Porque insertar datos ya ordenados puede formar una cadena de un solo hijo por nivel</button>
          <button type="button" class="quiz-option" data-correct="false">Porque los BST no permiten eliminar nodos</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Cuál es la diferencia principal entre un B-Tree y un B+Tree?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">El B-Tree no tiene raíz</button>
          <button type="button" class="quiz-option" data-correct="true">En el B+Tree, los datos completos viven solo en las hojas; en el B-Tree, cualquier nodo puede guardar datos</button>
          <button type="button" class="quiz-option" data-correct="false">El B+Tree no permite más de 2 hijos por nodo</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. Cuando un nodo de un B-Tree se llena y se inserta una llave más, ¿qué ocurre?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Se rechaza la inserción</button>
          <button type="button" class="quiz-option" data-correct="true">El nodo se divide en dos, y una llave sube (se promueve) al nodo padre</button>
          <button type="button" class="quiz-option" data-correct="false">Todo el árbol se reconstruye desde cero</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué hace posible que un B+Tree resuelva un rango sin volver a subir a la raíz?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Que la raíz guarda todos los datos</button>
          <button type="button" class="quiz-option" data-correct="true">Que las hojas están encadenadas entre sí (la "cuerda")</button>
          <button type="button" class="quiz-option" data-correct="false">Que no existen nodos internos</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. ¿Por qué un B+Tree suele tener menos niveles que un árbol binario con la misma cantidad de datos?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Porque su fan-out (hijos por nodo) es mucho mayor a 2</button>
          <button type="button" class="quiz-option" data-correct="false">Porque no guarda ningún dato</button>
          <button type="button" class="quiz-option" data-correct="false">Porque no está balanceado</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. En MySQL (InnoDB), al hacer <code>SHOW INDEX</code> y ver "Type: BTREE"...</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Es un árbol binario simple</button>
          <button type="button" class="quiz-option" data-correct="true">Se llama BTREE pero está implementado como un B+Tree</button>
          <button type="button" class="quiz-option" data-correct="false">No existe, MySQL no usa árboles</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. Cada nivel que baja una búsqueda en un índice representa, en el peor de los casos...</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Un cambio de nombre de tabla</button>
          <button type="button" class="quiz-option" data-correct="true">Una posible lectura de disco (un "salto" de I/O)</button>
          <button type="button" class="quiz-option" data-correct="false">Una reinicialización del motor</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>11. ¿Qué motor de almacenamiento usa MongoDB con estructuras tipo B-Tree/B+Tree para sus índices?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">InnoDB</button>
          <button type="button" class="quiz-option" data-correct="true">WiredTiger</button>
          <button type="button" class="quiz-option" data-correct="false">RedisEngine</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

    </div>
  </div>

  <!-- ===================== ACTIVIDAD ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Actividad: Desafío de Navegación</h3>
    </div>
    <p>
      Actividad de análisis visual y lógico. Trabajas con esta lista de 10 IDs de canciones:
      <code>5, 12, 18, 20, 25, 30, 32, 40, 45, 50</code>.
    </p>

    <div class="content-box" style="border-left:4px solid #c99a4e;">
      <ol style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li><strong>El Dibujo:</strong> esquematiza cómo se organizarían estos 10 IDs en un B+Tree de
          3 niveles (puedes apoyarte en el simulador de esta clase, pero redibújalo a mano o en una
          herramienta de diagramas).</li>
        <li><strong>El Recorrido:</strong> traza con un color el camino que haría el motor de la base de
          datos para encontrar la canción #32.</li>
        <li><strong>El Escaneo de Rango:</strong> explica o dibuja cómo el motor encontraría todas las
          canciones entre el ID 18 y el 40, resaltando la importancia de la conexión entre las hojas.</li>
        <li><strong>Justificación Técnica:</strong> ¿por qué si SoundFlow tiene 100 millones de canciones,
          un B+Tree es mejor que un Árbol Binario simple?</li>
      </ol>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <p style="margin:0 0 0.5rem;"><strong>Evidencias de la competencia asociadas a esta actividad</strong></p>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text);">
        <li>Esquematiza correctamente la jerarquía de un árbol balanceado, separando nodos de navegación
          de nodos de datos.</li>
        <li>Argumenta la eficiencia del B+Tree para consultas de rango basándose en la conexión de los
          nodos hoja.</li>
        <li>Calcula de forma conceptual la reducción de "saltos" (I/O de disco) que se logra al aumentar
          el orden del árbol (abanico de salida).</li>
      </ul>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="line-height:1.9;">
      · GeeksforGeeks, Introduction to Tree Data Structure. geeksforgeeks.org/introduction-to-tree-data-structure<br>
      · GeeksforGeeks, Binary Search Tree Data Structure. geeksforgeeks.org/binary-search-tree-data-structure<br>
      · MySQL Documentation, InnoDB and MyISAM Index Statistics. dev.mysql.com/doc/refman/en/index-btree-hash<br>
      · MongoDB Documentation, Indexes. mongodb.com/docs/manual/indexes<br>
      · MongoDB Documentation, WiredTiger Storage Engine. mongodb.com/docs/manual/core/wiredtiger<br>
      · MaroT. ARBOLES B Y B+ EN BASES DE DATOS [Video]. YouTube. youtube.com/watch?v=bKFfQWlb_oQ<br>
      · Galles, D. (Universidad de San Francisco). Graficador interactivo de B-Trees. cs.usfca.edu/~galles/visualization/BTree.html<br>
      · Galles, D. (Universidad de San Francisco). Graficador interactivo de B+Trees. cs.usfca.edu/~galles/visualization/BPlusTree.html
    </p>
  </div>
`;

window.WEEK_CONTENT_5_2 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow: el N+1 Queries, el "asesino silencioso" que se esconde en tu ORM</h2>

  <!-- ===================== DEFINICIÓN INICIAL ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>¿Qué es el problema de la consulta N+1 Queries?</h3>
    </div>
    <p>
      El problema de las consultas N+1 es un problema de rendimiento común en las aplicaciones basadas en
      bases de datos, especialmente en aquellas que utilizan marcos de trabajo de mapeo objeto-relacional
      (ORM). Ocurre cuando una consulta inicial recupera un conjunto de registros y, posteriormente, se
      ejecuta una consulta adicional para obtener los datos relacionados con cada registro. Esto da como
      resultado N+1 consultas, donde N es el número de registros recuperados por la consulta inicial. Por
      ejemplo, si tiene 10 usuarios y necesita obtener sus publicaciones asociadas, la aplicación podría
      ejecutar una consulta para obtener los usuarios y luego 10 consultas adicionales para obtener las
      publicaciones de cada usuario.
    </p>
  </div>

  <!-- ===================== 0. ANALOGÍA DE ARRANQUE ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Analogía: 21 viajes al supermercado</h3>
    </div>
    <p>
      Olvídate de código por un momento. Imagina que te piden organizar una cena para 20 invitados, cada uno
      con un plato distinto, y tienes que hacer el mercado para prepararlos todos.
    </p>
    <p>
      Lo lógico: haces <strong>una sola lista</strong> con los 20 ingredientes que necesitas, vas
      <strong>un solo viaje</strong> al supermercado, llenas el carrito con todo, y vuelves a casa. Un viaje,
      veinte ingredientes.
    </p>
    <p>
      Ahora imagina la versión absurda: vas al supermercado <strong>una primera vez</strong> solo para ver la
      lista de los 20 invitados y qué plato le toca a cada uno. Sales y vas a casa de nuevo.
    </p>
    <p>
      Vuelves a subir al carro, manejas de nuevo hasta el supermercado, compras
      <strong>únicamente el ingrediente del primer plato</strong>, y regresas a casa. Repites exactamente lo
      mismo para el segundo plato. Y para el tercero. Y así, veinte veces más. Al final hiciste
      <strong>21 viajes</strong> al supermercado para traer exactamente lo mismo que hubieras podido traer en
      uno solo.
    </p>

    <div class="concept-grid" style="grid-template-columns:1fr 1fr;">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        </div>
        <h4>21 viajes (el problema)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">1 viaje para ver la lista de platos, +
          20 viajes más, uno por cada ingrediente suelto. Mismo resultado, muchísimo más tiempo perdido
          manejando de ida y vuelta.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h4>1 viaje (la solución)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Anotas todo lo que necesitas de una
          vez, y traes todos los ingredientes en un solo viaje con el carrito lleno.</p>
      </div>
    </div>

    <div class="content-box" style="margin-top:0.8rem; border-left:4px solid #7c3aed;">
      <p style="margin:0;">
        Eso es exactamente lo que le puede pasar a un ORM mal configurado: 1 consulta para traer la lista de
        20 canciones de una playlist, y luego <strong>20 consultas más</strong> — una por cada canción — para
        ir a buscar, una por una, el álbum al que pertenece. "1 consulta para la lista, + N consultas de
        vuelta, una por cada ítem" es exactamente la fórmula <strong>N+1 Queries</strong> que vas a ver hoy, aplicada
        a SoundFlow.
      </p>
    </div>
  </div>

  <!-- ===================== 1. QUÉ ES UN ORM ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>1. ¿Qué es un ORM (y por qué SoundFlow usa uno)?</h3>
    </div>
    <p>
      Un <strong>ORM</strong> (Object-Relational Mapping, "mapeo objeto-relacional") es una capa de software
      que traduce entre dos formas distintas de representar los mismos datos:<br><br>
      El mundo de <strong>objetos</strong> del código (clases, atributos, listas)<br>
      El mundo de <strong>tablas</strong> de la base de datos (filas, columnas, llaves foráneas).<br><br>
      En vez de
      escribir <code style="color:#4a7c9e; font-weight:700;">SELECT * FROM tbl_canciones WHERE id_cancion = 5</code>, escribes algo como
      <code style="color:#7c3aed; font-weight:700;">Cancion.query.get(5)</code>, y el ORM arma el SQL, lo ejecuta, y te devuelve un objeto Python
      con sus atributos ya listos.
    </p>

    <div class="content-box" style="margin:0.8rem 0; border-left:4px solid #7c3aed;">
      <p style="margin:0 0 0.6rem;"><strong>¿Cómo funciona, paso a paso?</strong></p>
      <div class="numbered-grid numbered-grid-2col" style="margin:0;">
        <div class="numbered-card">
          <div class="num" style="color:#7c3aed;">1. Mapeas clases a tablas</div>
          <p>Defines una clase por cada tabla y un atributo por cada columna como <code>Artista</code>,
            <code>Album</code>, <code>Cancion</code> y le dices al ORM "estos objetos
            corresponden a esas filas".</p>
          <p style="margin:0.5rem 0 0; font-size:0.82rem; color:var(--text-dim);">Ejemplo:
            <code style="color:#7c3aed; font-weight:700;">id_cancion = Column(Integer, primary_key=True)</code>
            equivale a <code style="color:#4a7c9e; font-weight:700;">id_cancion INT PRIMARY KEY</code>.</p>
        </div>
        <div class="numbered-card">
          <div class="num" style="color:#4a7c9e;">2. Programas con objetos normales</div>
          <p>Escribes código Python común: <code>artista.albumes</code>, <code>session.add(cancion)</code>,
            <code>Cancion.query.get(5)</code>. Nunca escribes SQL a mano para estas operaciones.</p>
          <p style="margin:0.5rem 0 0; font-size:0.82rem; color:var(--text-dim);">Ejemplo: quieres la canción
            con id 5, entonces escribes <code style="color:#7c3aed; font-weight:700;">cancion = Cancion.query.get(5)</code>.</p>
        </div>
        <div class="numbered-card">
          <div class="num" style="color:#6f9d7c;">3. El ORM traduce y ejecuta</div>
          <p>Por debajo, arma el <code>SELECT</code>/<code>INSERT</code>/<code>UPDATE</code>/<code>JOIN</code>
            equivalente, con parámetros seguros (no texto concatenado), y lo manda a la base de datos real.</p>
          <p style="margin:0.5rem 0 0; font-size:0.82rem; color:var(--text-dim);">Ejemplo: esa línea dispara, por
            debajo, <code style="color:#4a7c9e; font-weight:700;">SELECT * FROM tbl_canciones WHERE id_cancion = 5</code>.</p>
        </div>
        <div class="numbered-card">
          <div class="num" style="color:#c99a4e;">4. Te devuelve objetos, no filas</div>
          <p>Toma las filas que regresan y reconstruye objetos Python con sus atributos ya listos para usar,
            en vez de tuplas o diccionarios crudos.</p>
          <p style="margin:0.5rem 0 0; font-size:0.82rem; color:var(--text-dim);">Ejemplo: en vez de una tupla
            cruda, terminas con <code style="color:#7c3aed; font-weight:700;">cancion.titulo</code> listo para
            usar, con valor <code style="color:#6f9d7c; font-weight:700;">'Bohemian Rhapsody'</code>.</p>
        </div>
      </div>
      <p style="margin:0.8rem 0 0;">
        Todo esto ocurre dentro de una <strong>sesión</strong>: un espacio donde el ORM lleva la cuenta de
        qué objetos creaste, modificaste o borraste, para mandar esos cambios juntos a la base de datos con
        <code>session.commit()</code> (o deshacerlos todos con <code>rollback()</code> si algo falla).
      </p>
    </div>

    <div class="concept-grid" style="grid-template-columns:1fr 1fr;">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h4>Ventajas</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Menos SQL escrito a mano, código más
          legible en el lenguaje que ya usas, y protección automática contra SQL injection.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        </div>
        <h4>El riesgo</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El ORM oculta el SQL que en verdad se
          ejecuta. Eso es cómodo... hasta que esconde algo costoso, como el problema que vamos a ver hoy: el
          <strong>N+1 Queries</strong>.</p>
      </div>
    </div>

    <div class="concept-grid" style="grid-template-columns:1fr 1fr; margin-top:1rem;">
      <div class="concept-card">
        <h4>¿Cuándo usarlo?</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">En apps backend con mucho CRUD
          repetitivo (como SoundFlow), cuando el equipo prioriza velocidad de desarrollo y el esquema es
          razonablemente estable.</p>
      </div>
      <div class="concept-card">
        <h4>¿Cuándo evitarlo?</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">En reportes/analítica pesada o
          consultas muy específicas de rendimiento.</p>
      </div>
    </div>

    <p style="margin-top:1rem;">
      Para esta clase usamos <strong>SQLAlchemy</strong>, el ORM más usado en Python. La idea aplica igual en
      Django ORM, Sequelize (Node.js) o Hibernate (Java): todos pueden sufrir el mismo problema, y todos
      ofrecen una forma de resolverlo.
    </p>
  </div>

  <!-- ===================== 2. MODELOS SQLALCHEMY PARA SOUNDFLOW ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. Los modelos de SoundFlow en SQLAlchemy</h3>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0;">
        Antes del código: en este ejercicio vamos a conectar las tablas de <strong>Artista</strong>,
        <strong>Álbum</strong> y <strong>Canción</strong> (más <strong>Playlist</strong> y
        <strong>Artistas Similares</strong>) con clases de Python, para lograr algo puntual:
        <strong>poder encontrar el álbum de cada canción de una playlist, o las canciones top de un artista
        similar</strong>, con un simple
        atributo (<code>artista.albumes</code>, <code>playlist.canciones</code>) en vez de escribir SQL a
        mano.
      </p>
    </div>
    <p>
      Para esta clase sumamos tres tablas nuevas a nuestra base de SoundFlow:
      <code style="color:#7c3aed; font-weight:700;">tbl_playlists</code>,
      su tabla puente <code style="color:#c99a4e; font-weight:700;">tbl_playlist_canciones</code>, y
      <code style="color:#6f9d7c; font-weight:700;">tbl_artistas_similares</code>, una
      relación de artista a artista (autorreferenciada). Todo lo demás, artistas, álbumes, canciones, es la
      misma base que ya construimos.
    </p>

    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">tablas_nuevas.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>CREATE TABLE tbl_playlists (
  id_playlist INT NOT NULL AUTO_INCREMENT,
  nombre_playlist VARCHAR(120) NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_playlist),
  CONSTRAINT fk_playlist_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios (idusuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tbl_playlist_canciones (
  id_playlist INT NOT NULL,
  id_cancion INT NOT NULL,
  orden INT NOT NULL,
  PRIMARY KEY (id_playlist, id_cancion),
  CONSTRAINT fk_pc_playlist FOREIGN KEY (id_playlist) REFERENCES tbl_playlists (id_playlist),
  CONSTRAINT fk_pc_cancion FOREIGN KEY (id_cancion) REFERENCES tbl_canciones (id_cancion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tbl_artistas_similares (
  id_artista INT NOT NULL,
  id_artista_similar INT NOT NULL,
  PRIMARY KEY (id_artista, id_artista_similar),
  CONSTRAINT fk_similar_a FOREIGN KEY (id_artista) REFERENCES tbl_artistas (id_artista),
  CONSTRAINT fk_similar_b FOREIGN KEY (id_artista_similar) REFERENCES tbl_artistas (id_artista)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;</code></pre>
    </div>

    <p style="margin-top:0.8rem;">Y así se ven esas mismas tablas como modelos de SQLAlchemy, con sus <code>relationship()</code>:</p>

    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">modelos.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.78rem;">class Artista(Base):                       # Esta clase = la tabla tbl_artistas
    __tablename__ = "tbl_artistas"         # Nombre real de la tabla en la BD
    id_artista = Column(Integer, primary_key=True)     # Variable -> objeto Column (columna real, llave primaria)
    nombre_artista = Column(String(100))               # Variable -> objeto Column (columna real, VARCHAR(100))
    <span style="color:#6f9d7c; font-weight:600;">albumes = relationship("Album", back_populates="artista")</span>
    # Variable -> objeto relationship. NO es columna: declara la relación:
    # un Artista tiene una lista de Album relacionados, encuéntralos usando
    # la llave foránea que ya está en Album.id_artista

    <span style="color:#6f9d7c; font-weight:600;">similares = relationship(              # Variable -> objeto relationship. Autorreferencia: Artista con otros Artista
        "Artista", secondary="tbl_artistas_similares",   # vía la tabla puente
        primaryjoin="Artista.id_artista==tbl_artistas_similares.c.id_artista",       # cuál lado es "el artista"
        secondaryjoin="Artista.id_artista==tbl_artistas_similares.c.id_artista_similar"  # cuál lado es "el similar"
    )</span>

class Album(Base):                         # Esta clase = la tabla tbl_albumes
    __tablename__ = "tbl_albumes"          # Nombre real de la tabla en la BD
    id_album = Column(Integer, primary_key=True)       # Variable -> objeto Column (columna real, llave primaria)
    titulo_album = Column(String(150))                 # Variable -> objeto Column (columna real, VARCHAR(150))
    id_artista = Column(Integer, ForeignKey("tbl_artistas.id_artista"))   # Variable -> objeto Column (columna real, FK hacia Artista)
    <span style="color:#6f9d7c; font-weight:600;">artista = relationship("Artista", back_populates="albumes")</span>
    # Variable -> objeto relationship. NO es columna: declara la relación:
    # cada Album pertenece a un solo Artista, encuéntralo usando la llave
    # foránea id_artista de esta misma tabla. Es el espejo de "albumes" en Artista.

class Cancion(Base):                       # Esta clase = la tabla tbl_canciones
    __tablename__ = "tbl_canciones"        # Nombre real de la tabla en la BD
    id_cancion = Column(Integer, primary_key=True)     # Variable -> objeto Column (columna real, llave primaria)
    titulo = Column(String(150))                       # Variable -> objeto Column (columna real, VARCHAR(150))
    reproducciones = Column(Integer)                   # Variable -> objeto Column (columna real, entero)
    id_album = Column(Integer, ForeignKey("tbl_albumes.id_album"))    # Variable -> objeto Column (columna real, FK hacia Album)
    <span style="color:#6f9d7c; font-weight:600;">album = relationship("Album")</span>
    # Variable -> objeto relationship. NO es columna: declara la relación:
    # cada Cancion pertenece a un solo Album, encuéntralo usando la llave
    # foránea id_album de esta misma tabla.

class Playlist(Base):                      # Esta clase = la tabla tbl_playlists
    __tablename__ = "tbl_playlists"        # Nombre real de la tabla en la BD
    id_playlist = Column(Integer, primary_key=True)    # Variable -> objeto Column (columna real, llave primaria)
    nombre_playlist = Column(String(120))              # Variable -> objeto Column (columna real, VARCHAR(120))
    <span style="color:#6f9d7c; font-weight:600;">canciones = relationship("Cancion", secondary="tbl_playlist_canciones")</span>
    # Variable -> objeto relationship. NO es columna: muchos a muchos, vía la
    # tabla puente tbl_playlist_canciones. Una Playlist tiene muchas Canciones,
    # y una Cancion puede estar en muchas Playlist.</code></pre>
    </div>

    <p style="margin-top:0.8rem;">
      Si nunca has visto SQLAlchemy, cada clase de <code>modelos.py</code> es la versión en Python de un
      <code>CREATE TABLE</code> que ya conoces. Toca cada tarjeta para resaltar esa pieza dentro de la clase
      <code>Artista</code>:
    </p>

    <div class="content-box" style="margin-top:0.6rem;">
      <pre style="margin:0; overflow-x:auto;"><code id="ormModeloDemo"><span class="orm-tabla">class Artista(Base):
    __tablename__ = "tbl_artistas"</span>
    <span class="orm-columna">id_artista = Column(Integer, primary_key=True)</span>
    <span class="orm-columna">nombre_artista = Column(String(100))</span>
    <span class="orm-relacion">albumes = relationship("Album", back_populates="artista")</span></code></pre>
    </div>

    <div class="numbered-grid numbered-grid-2col" style="margin-top:0.8rem;">
      <div class="numbered-card" data-highlight="tabla" data-highlight-target="ormModeloDemo" style="cursor:pointer;">
        <div class="num" style="color:var(--accent);"><span class="color-dot" style="background:var(--accent);"></span>La clase = la tabla</div>
        <p><code>class Artista(Base)</code> representa a <code>tbl_artistas</code>. <code>Base</code> es la
          clase de la que heredan todos los modelos, para que SQLAlchemy sepa que esto no es una clase
          cualquiera de Python, sino una tabla. <code>__tablename__</code> es su nombre real en la base de datos.</p>
      </div>
      <div class="numbered-card" data-highlight="columna" data-highlight-target="ormModeloDemo" style="cursor:pointer;">
        <div class="num" style="color:#6f9d7c;"><span class="color-dot" style="background:#6f9d7c;"></span>Column = columna real</div>
        <p><code>id_artista</code> es una <strong>variable</strong> (un atributo de la clase) que apunta a un
          <strong>objeto</strong> <code>Column(Integer, primary_key=True)</code>.</p>
      </div>
      <div class="numbered-card" data-highlight="relacion" data-highlight-target="ormModeloDemo" style="cursor:pointer; grid-column: 1 / -1;">
        <div class="num" style="color:#8b7fb8;"><span class="color-dot" style="background:#8b7fb8;"></span>relationship = atajo de navegación</div>
        <p><code>albumes</code> es otra <strong>variable</strong>, pero apunta a un objeto distinto:
          <code>relationship(...)</code>, que <strong>no crea una columna nueva</strong>. Le dice a
          SQLAlchemy "cuando pidan <code>artista.albumes</code>, ve tú mismo a <code>tbl_albumes</code>", en
          vez de escribir el JOIN a mano. <code>back_populates="artista"</code> la conecta con su espejo en
          la clase <code>Album</code>.</p>
      </div>
    </div>

  </div>

  <!-- ===================== 3. CARGA PEREZOSA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. La carga perezosa (lazy loading): la raíz del problema</h3>
    </div>
    <p>
      Fíjate en <code style="color:#6f9d7c; font-weight:600;">album = relationship("Album")</code>: no dice cuándo traer ese álbum. Por defecto,
      SQLAlchemy usa <code>lazy="select"</code>, es decir, <strong>carga perezosa</strong>: el álbum de una
      canción NO se trae junto con la canción. Se trae después, en una consulta aparte, y solo en el
      instante exacto en que tu código escribe <code>cancion.album</code>.
    </p>
    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0;">
        Esto no es un error de SQLAlchemy: es una decisión de diseño. Traer TODO relacionado con TODO,
        siempre, sería un desperdicio (¿para qué traer el álbum si nunca lo vas a usar?). El problema
        aparece cuando accedes a esa relación perezosa <strong>dentro de un ciclo</strong>, una vez por cada
        fila — ahí es donde nace el N+1 Queries.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>Carga ansiosa (eager loading): la otra cara de la moneda</strong></p>
    <p>
      Es la estrategia opuesta a la carga perezosa: en vez de esperar a que el código pida la relación,
      le dices a SQLAlchemy que la traiga <strong>de una vez</strong>, junto con (o inmediatamente después
      de) la consulta principal, para no disparar una consulta nueva por cada fila. Más adelante vas a ver
      dos formas concretas de pedirla: <code>joinedload</code> (todo en un solo JOIN) y
      <code>selectinload</code> (una consulta en bloque por cada nivel de la relación).
    </p>
  </div>

  <!-- ===================== 4. EL PROBLEMA N+1 ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. El problema N+1 Queries: el "asesino silencioso" del rendimiento</h3>
    </div>
    <p>
      El patrón es siempre el mismo: <strong>1 consulta</strong> para traer una lista de N filas, y luego
      <strong>N consultas más</strong>, una por cada fila, para traer algo relacionado con ella. Total:
      <strong>N + 1</strong> consultas, cuando con una sola (bien escrita, con JOIN) hubiera bastado.
    </p>
    <p style="margin-top:0.6rem;">
      Se le dice <strong>"asesino silencioso"</strong> porque en desarrollo, con pocos datos de prueba
      (digamos, una playlist de 3 canciones), el problema pasa completamente desapercibido: 4 consultas en
      vez de 1 no se nota en la velocidad. Pero en producción, con playlists de 200 canciones o un catálogo
      de miles de artistas, esas mismas 4 consultas se convierten en 201, y la página que cargaba en 50ms
      empieza a tardar segundos — sin que nadie haya tocado el código de nuevo. El bug estuvo ahí desde el
      principio, dormido, esperando a que hubiera suficientes datos para despertar.
    </p>
  </div>

  <!-- ===================== 5. ESCENARIO PLAYLIST ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. Escenario 1: la playlist y el álbum de cada canción</h3>
    </div>
    <p>
      Queremos mostrar una playlist de <strong>20 canciones</strong>, con el nombre del álbum de cada una
      (para mostrar la carátula). El código más "obvio" de escribir es este:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">playlist_sin_optimizar.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>playlist = session.query(Playlist).get(7)

for cancion in playlist.canciones:               # 1 consulta: trae las 20 canciones
    print(cancion.titulo, cancion.album.titulo_album)   # 1 consulta MÁS, por cada canción</code></pre>
    </div>
    <p style="margin-top:0.8rem;">
      La línea <code>cancion.album</code> se ve inofensiva, pero como <code>album</code> es
      <code>lazy="select"</code>, cada vez que el ciclo la toca, dispara una consulta nueva a
      <code>tbl_albumes</code>. Con 20 canciones: <strong>1 (la playlist) + 20 (un álbum a la vez) = 21
      consultas</strong>, cuando el dato completo cabía en una sola.
    </p>

    <div class="query-log-demo">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: mira las queries reales en la consola</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary query-log-btn"
          data-tono="malo"
          data-total="Total: 21 queries ejecutadas para mostrar 20 canciones 🐌"
          data-lineas='["SELECT * FROM tbl_playlist_canciones JOIN tbl_canciones WHERE id_playlist = 7  -- trae las 20 canciones","SELECT * FROM tbl_albumes WHERE id_album = 101  -- álbum de la canción #1","SELECT * FROM tbl_albumes WHERE id_album = 104  -- álbum de la canción #2","SELECT * FROM tbl_albumes WHERE id_album = 101  -- álbum de la canción #3","SELECT * FROM tbl_albumes WHERE id_album = 107  -- álbum de la canción #4","SELECT * FROM tbl_albumes WHERE id_album = 109  -- álbum de la canción #5","SELECT * FROM tbl_albumes WHERE id_album = 104  -- álbum de la canción #6","SELECT * FROM tbl_albumes WHERE id_album = 112  -- álbum de la canción #7","SELECT * FROM tbl_albumes WHERE id_album = 101  -- álbum de la canción #8","SELECT * FROM tbl_albumes WHERE id_album = 115  -- álbum de la canción #9","SELECT * FROM tbl_albumes WHERE id_album = 109  -- álbum de la canción #10","SELECT * FROM tbl_albumes WHERE id_album = 118  -- álbum de la canción #11","SELECT * FROM tbl_albumes WHERE id_album = 107  -- álbum de la canción #12","SELECT * FROM tbl_albumes WHERE id_album = 121  -- álbum de la canción #13","SELECT * FROM tbl_albumes WHERE id_album = 104  -- álbum de la canción #14","SELECT * FROM tbl_albumes WHERE id_album = 124  -- álbum de la canción #15","SELECT * FROM tbl_albumes WHERE id_album = 112  -- álbum de la canción #16","SELECT * FROM tbl_albumes WHERE id_album = 127  -- álbum de la canción #17","SELECT * FROM tbl_albumes WHERE id_album = 101  -- álbum de la canción #18","SELECT * FROM tbl_albumes WHERE id_album = 130  -- álbum de la canción #19","SELECT * FROM tbl_albumes WHERE id_album = 109  -- álbum de la canción #20"]'
        >▶ Cargar playlist (SIN optimizar)</button>
      </div>
      <div class="query-log-output"></div>
      <span class="query-log-counter"></span>
    </div>

    <p style="margin-top:0.8rem;">La solución: pedirle a SQLAlchemy que traiga la relación de una vez, con <code>joinedload</code> (un solo JOIN), quitando así la carga perezosa para esta consulta:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">playlist_optimizada.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.78rem;">from sqlalchemy.orm import joinedload   # Importa la función para pedir un JOIN explícito

playlist = (
    session.query(Playlist)                                            # Consulta sobre Playlist
    .options(joinedload(Playlist.canciones).joinedload(Cancion.album))  # Trae canciones Y álbumes ya, en el mismo JOIN
    .get(7)                                                             # Filtra por id_playlist = 7
)

for cancion in playlist.canciones:                      # Recorre las 20 canciones, ya cargadas en memoria
    print(cancion.titulo, cancion.album.titulo_album)   # ya está en memoria: 0 consultas extra</code></pre>
    </div>

    <div class="query-log-demo">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: la misma playlist, ya optimizada</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary query-log-btn"
          data-tono="bueno"
          data-total="Total: 1 query ejecutada para las mismas 20 canciones 🚀"
          data-lineas='["SELECT * FROM tbl_playlist_canciones JOIN tbl_canciones JOIN tbl_albumes WHERE id_playlist = 7  -- trae las 20 canciones y sus álbumes en un solo JOIN"]'
        >▶ Cargar playlist (optimizada)</button>
      </div>
      <div class="query-log-output"></div>
      <span class="query-log-counter"></span>
    </div>
  </div>

  <!-- ===================== 6. CÓMO SE VE EN LA VIDA REAL ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. Cómo detectarlo en un proyecto real</h3>
    </div>
    <p>
      Los simuladores de arriba son una versión dramatizada, pero el problema se ve exactamente así en la
      vida real, con estas herramientas:
    </p>
    <div class="concept-grid" style="grid-template-columns:1fr 1fr 1fr;">
      <div class="concept-card">
        <h4>Logging del motor</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Activando
          <code>create_engine(url, echo=True)</code>, SQLAlchemy imprime en consola cada SQL que ejecuta de
          verdad. Si ves la misma consulta repetida 20 veces con distinto <code>WHERE id = ?</code>, ahí está
          el N+1 Queries.</p>
      </div>
      <div class="concept-card">
        <h4>Debug toolbars</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Flask-DebugToolbar y Django Debug
          Toolbar agregan un panel que cuenta cuántas queries disparó cada página, y marca en rojo las
          consultas duplicadas.</p>
      </div>
      <div class="concept-card">
        <h4>APM en producción</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Herramientas como New Relic, Datadog
          o Sentry Performance detectan automáticamente ráfagas de consultas idénticas y las señalan como
          "N+1 query" en sus reportes.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 7. ESCENARIO ARTISTAS SIMILARES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>7. Escenario 2: artistas similares y sus canciones top (el N+1 Queries anidado)</h3>
    </div>
    <p>
      En el perfil de un artista queremos mostrar sus <strong>5 "Artistas Similares"</strong>, y por cada
      uno de esos 5, sus <strong>3 canciones más populares</strong>. Este caso es más traicionero que el
      anterior: el N+1 Queries aparece <strong>dos veces, uno anidado dentro del otro</strong>.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">similares_sin_optimizar.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.78rem;">artista = session.query(Artista).get(12)               # 1 consulta: trae el artista con id_artista = 12

for similar in artista.similares:                       # 1 consulta MÁS: trae los 5 artistas similares
    top3 = (
        session.query(Cancion)                          # Nueva consulta a Cancion, una vez por cada similar
        .filter(Cancion.id_artista == similar.id_artista)   # Filtra solo las canciones de ESE similar
        .order_by(Cancion.reproducciones.desc())         # Ordena de más a menos reproducida
        .limit(3)                                        # Se queda solo con las 3 canciones top
        .all()                                           # 1 consulta POR CADA similar (5 en total)
    )
    for cancion in top3:                                 # Recorre las 3 canciones top de este similar
        print(cancion.titulo, cancion.album.titulo_album)   # 1 consulta MÁS por canción (15 en total)</code></pre>
    </div>

    <div class="content-box" style="border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.4rem;"><strong>La cuenta completa: no es solo N×M+1, es peor</strong></p>
      <p style="margin:0;">
        1 (el artista) + 1 (la lista de 5 similares) + <strong>5</strong> (una consulta de "top 3" por cada
        similar) + <strong>15</strong> (una consulta de álbum por cada una de esas 15 canciones) =
        <strong>22 consultas</strong>. La fórmula "N×M+1" de la guía se queda corta: cuando anidas una
        relación dentro de otra, el problema se multiplica en <em>cada nivel</em> de anidación, no solo una vez.
      </p>
    </div>

    <div class="query-log-demo">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: perfil de artista sin optimizar</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary query-log-btn"
          data-tono="malo"
          data-total="Total: 22 queries ejecutadas para 5 artistas × 3 canciones 🐌🐌"
          data-lineas='["SELECT * FROM tbl_artistas WHERE id_artista = 12  -- el artista principal","SELECT * FROM tbl_artistas_similares JOIN tbl_artistas WHERE id_artista = 12  -- sus 5 artistas similares","SELECT * FROM tbl_canciones WHERE id_artista = 45 ORDER BY reproducciones DESC LIMIT 3  -- top 3 de similar #1","SELECT * FROM tbl_canciones WHERE id_artista = 46 ORDER BY reproducciones DESC LIMIT 3  -- top 3 de similar #2","SELECT * FROM tbl_canciones WHERE id_artista = 47 ORDER BY reproducciones DESC LIMIT 3  -- top 3 de similar #3","SELECT * FROM tbl_canciones WHERE id_artista = 48 ORDER BY reproducciones DESC LIMIT 3  -- top 3 de similar #4","SELECT * FROM tbl_canciones WHERE id_artista = 49 ORDER BY reproducciones DESC LIMIT 3  -- top 3 de similar #5","SELECT * FROM tbl_albumes WHERE id_album = 201  -- álbum canción 1 de similar #1","SELECT * FROM tbl_albumes WHERE id_album = 202  -- álbum canción 2 de similar #1","SELECT * FROM tbl_albumes WHERE id_album = 203  -- álbum canción 3 de similar #1","SELECT * FROM tbl_albumes WHERE id_album = 204  -- álbum canción 1 de similar #2","SELECT * FROM tbl_albumes WHERE id_album = 205  -- álbum canción 2 de similar #2","SELECT * FROM tbl_albumes WHERE id_album = 206  -- álbum canción 3 de similar #2","SELECT * FROM tbl_albumes WHERE id_album = 207  -- álbum canción 1 de similar #3","SELECT * FROM tbl_albumes WHERE id_album = 208  -- álbum canción 2 de similar #3","SELECT * FROM tbl_albumes WHERE id_album = 209  -- álbum canción 3 de similar #3","SELECT * FROM tbl_albumes WHERE id_album = 210  -- álbum canción 1 de similar #4","SELECT * FROM tbl_albumes WHERE id_album = 211  -- álbum canción 2 de similar #4","SELECT * FROM tbl_albumes WHERE id_album = 212  -- álbum canción 3 de similar #4","SELECT * FROM tbl_albumes WHERE id_album = 213  -- álbum canción 1 de similar #5","SELECT * FROM tbl_albumes WHERE id_album = 214  -- álbum canción 2 de similar #5","SELECT * FROM tbl_albumes WHERE id_album = 215  -- álbum canción 3 de similar #5"]'
        >▶ Cargar perfil (SIN optimizar)</button>
      </div>
      <div class="query-log-output"></div>
      <span class="query-log-counter"></span>
    </div>

    <p style="margin-top:0.8rem;">
      La solución: encadenar <code>selectinload</code> por cada nivel de la relación, quitando así la carga
      perezosa de cada una. En vez de una consulta por fila, SQLAlchemy hace <strong>una consulta por
      nivel</strong>, trayendo todas las filas de ese nivel de una vez con un <code>WHERE id IN (...)</code>:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">similares_optimizado.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.78rem;">from sqlalchemy.orm import selectinload   # Importa la función que carga colecciones en bloque

artista = (
    session.query(Artista)                     # Consulta sobre Artista
    .options(
        selectinload(Artista.similares)        # Nivel 1: trae los 5 similares en 1 sola consulta (no 5)
        .selectinload(Artista.top_canciones)    # Nivel 2: trae las top 3 de CADA similar en 1 sola consulta (no 5)
        .selectinload(Cancion.album)            # Nivel 3: trae los álbumes de esas canciones en 1 sola consulta (no 15)
    )
    .get(12)                                    # Filtra por id_artista = 12
)
# Ya no importa si son 5 similares o 500: siempre son las mismas 4 consultas.</code></pre>
    </div>

    <div class="query-log-demo">
      <p style="margin:0 0 0.6rem;"><strong>Simulador: perfil de artista optimizado</strong></p>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.6rem;">
        <button type="button" class="btn btn-secondary query-log-btn"
          data-tono="bueno"
          data-total="Total: 4 queries ejecutadas, sin importar cuántos artistas o canciones haya 🚀"
          data-lineas='["SELECT * FROM tbl_artistas WHERE id_artista = 12  -- el artista principal","SELECT * FROM tbl_artistas_similares JOIN tbl_artistas WHERE id_artista IN (12)  -- los 5 similares, en un solo lote","SELECT * FROM tbl_canciones WHERE id_artista IN (45,46,47,48,49)  -- las canciones top de los 5, en un solo lote","SELECT * FROM tbl_albumes WHERE id_album IN (201,202,203,204,205,206,207,208,209,210,211,212,213,214,215)  -- todos los álbumes, en un solo lote"]'
        >▶ Cargar perfil (optimizado)</button>
      </div>
      <div class="query-log-output"></div>
      <span class="query-log-counter"></span>
    </div>
  </div>

  <!-- ===================== 8. TABLA COMPARATIVA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>8. Las 4 estrategias de carga en SQLAlchemy</h3>
    </div>
    <p>No todas las relaciones se resuelven igual. Esta es la caja de herramientas completa:</p>
    <div class="content-box" style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
        <thead>
          <tr style="border-bottom:2px solid var(--border);">
            <th style="text-align:left; padding:0.5rem 0.6rem; color:var(--accent);">Estrategia</th>
            <th style="text-align:left; padding:0.5rem 0.6rem; color:var(--accent);">Cómo trae los datos</th>
            <th style="text-align:left; padding:0.5rem 0.6rem; color:var(--accent);">Úsala cuando...</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem 0.6rem;"><code>lazy="select"</code><br><span style="color:var(--text-dim); font-size:0.8rem;">(el default)</span></td>
            <td style="padding:0.5rem 0.6rem;">Una consulta aparte, solo cuando de verdad accedes al atributo.</td>
            <td style="padding:0.5rem 0.6rem;">Casi nunca vas a usar esa relación (evitas traer datos de más).</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem 0.6rem;"><code>joinedload()</code></td>
            <td style="padding:0.5rem 0.6rem;">Un solo <code>JOIN</code>, todo en una consulta.</td>
            <td style="padding:0.5rem 0.6rem;">Relación 1-a-1 o "muchos a 1" (canción → su único álbum).</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem 0.6rem;"><code>selectinload()</code></td>
            <td style="padding:0.5rem 0.6rem;">Una consulta extra con <code>WHERE id IN (...)</code>, trae todo el nivel de una vez.</td>
            <td style="padding:0.5rem 0.6rem;">Relación 1-a-muchos o muchos-a-muchos con colecciones grandes (playlist → canciones).</td>
          </tr>
          <tr>
            <td style="padding:0.5rem 0.6rem;"><code>subqueryload()</code></td>
            <td style="padding:0.5rem 0.6rem;">Parecido a selectinload, pero con una subconsulta en vez de IN.</td>
            <td style="padding:0.5rem 0.6rem;">Casos parecidos a selectinload en versiones antiguas de SQLAlchemy; hoy selectinload suele ser mejor opción.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ===================== 9. RESUMEN Y GUÍA PARA LA ACTIVIDAD ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>9. Para tu informe: ideas clave que puedes desarrollar</h3>
    </div>
    <p>Esta clase te da las piezas para escribir tu informe técnico. No es la respuesta armada —eso te toca
      escribirlo a ti, investigando y justificando— pero aquí está el mapa, con las preguntas exactas de la
      actividad:</p>
    <div class="concept-grid" style="grid-template-columns:1fr 1fr 1fr;">
      <div class="concept-card">
        <h4>Fase de Investigación</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">"¿Por qué el problema N+1 es
          considerado un <strong>'asesino silencioso'</strong> del rendimiento y cómo se manifiesta
          visualmente en los logs de una base de datos?" Piensa por qué el mismo código se comporta distinto
          con 3 filas de prueba que con 3.000 reales, y qué patrón repetido verías en un log con
          <code>echo=True</code> (revisa la Sección 6).</p>
      </div>
      <div class="concept-card">
        <h4>Escenario de la Playlist</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">20 canciones, mostrando el álbum de
          cada una. "Si el ORM no está configurado correctamente, ¿cuántas consultas se ejecutarán?
          Justifica tu respuesta usando la fórmula N+1." Aplica 1 + N con N=20 y explica de dónde sale cada
          parte (revisa la Sección 5).</p>
      </div>
      <div class="concept-card">
        <h4>Escenario de Seguidores</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">5 artistas similares, 3 canciones
          top de cada uno. "¿Cómo evitarías que esta consulta se convierta en una pesadilla de rendimiento
          (N * M + 1)?" Identifica los <strong>dos niveles</strong> de anidación (similares, y canciones de
          cada similar), cuenta las consultas de cada nivel por separado, y explica con qué estrategia de
          carga la resolverías (revisa la Sección 7).</p>
      </div>
    </div>
  </div>

  <!-- ===================== NO SOLO SQLALCHEMY ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Otros ORM similares a SQLAlchemy</h3>
    </div>
    <p>
      El problema N+1 Queries no depende de este ORM ni de que la base sea relacional: aparece en
      cualquier tecnología que cargue datos relacionados <strong>uno por uno</strong> en vez de en lote.
    </p>
    <div class="concept-grid" style="grid-template-columns:1fr 1fr 1fr;">
      <div class="concept-card">
        <h4>Otros ORMs relacionales</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Django (<code>select_related</code> /
          <code>prefetch_related</code>), Sequelize o Prisma en Node.js (<code>include</code>), Eloquent en
          Laravel, Entity Framework en C#. Todos tienen el mismo par de herramientas: carga perezosa por
          defecto, y un método de carga ansiosa para arreglar el N+1 Queries.</p>
      </div>
      <div class="concept-card">
        <h4>MongoDB (NoSQL)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Con Mongoose, llamar a
          <code>populate()</code> dentro de un <code>for</code> genera el mismo patrón. La solución
          equivalente a un JOIN aquí es <code>$lookup</code> en el pipeline de agregación (lo viste en la
          Semana 4), o batchear el <code>populate</code>.</p>
      </div>
      <div class="concept-card">
        <h4>Sin ORM, con SQL puro</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">La versión más universal: un bucle
          que hace 1 consulta y luego N consultas más, comparado contra un solo <code>JOIN</code>. Ni
          siquiera hace falta un ORM para tener este problema — el ORM solo lo hace más fácil de generar sin
          darte cuenta.</p>
      </div>
    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <a href="https://www.youtube.com/watch?v=Kx8-gSnNbnw" target="_blank" rel="noopener" style="display:block; max-width:360px; margin:0.6rem auto 1rem; border-radius:10px; overflow:hidden; border:1px solid var(--border); text-decoration:none; position:relative;">
      <img src="https://img.youtube.com/vi/Kx8-gSnNbnw/hqdefault.jpg" alt="N+1 Query Problem — Fix this in your backend project" style="display:block; width:100%; height:auto;">
      <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25);">
        <span style="width:64px; height:64px; border-radius:50%; background:rgba(196,68,68,0.9); display:flex; align-items:center; justify-content:center;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </span>
      <span style="display:block; padding:0.6rem 0.8rem; background:#111; color:#fff; font-size:0.85rem;">N+1 Query Problem | Fix this in your backend Project — ver en YouTube</span>
    </a>
    <p style="line-height:1.9;">
      · SQLAlchemy Documentation, Relationship Loading Techniques. docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html<br>
      · Baeldung on Computer Science, What Is the "N+1 Select Problem"? baeldung.com/cs/orm-n-plus-one-select-problem<br>
      · PlanetScale, What is the N+1 Query Problem and How to Solve it? planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it<br>
      · Flask-SQLAlchemy Documentation, Configuration (echo, record_queries). flask-sqlalchemy.readthedocs.io<br>
      · Django Documentation, Database access optimization (select_related / prefetch_related). docs.djangoproject.com/en/stable/topics/db/optimization
    </p>
  </div>
`;
