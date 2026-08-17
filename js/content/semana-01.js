// Contenido enriquecido de la Semana 1, dividido en 2 clases.
// Este patrón se puede repetir para las próximas semanas:
// crear js/content/semana-0X.js y definir window.WEEK_CONTENT_X_1 (y _2 si aplica).
window.WEEK_CONTENT_1_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow, plataforma de streaming musical</h2>

  <!-- ===================== 1. FORO ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>1. Foro: ¿Sabe Spotify demasiado sobre nosotros?</h3>
      <span class="pill pill-individual">Individual</span>
      <span class="pill pill-entrega">Entregable · 5%</span>
    </div>

    <p>
      Cada clic, cada canción saltada y cada segundo de escucha alimenta el algoritmo de
      plataformas como Spotify. Para que esto funcione, la base de datos debe ser masiva y
      persistente: sabe qué género prefieres a las 7 a.m., qué canciones saltas a los 3
      segundos, con quién compartes tus playlists y hasta en qué momento del día te sientes
      nostálgico. Esa cantidad de información no es un efecto secundario, es el negocio mismo.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(2, 1fr);">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
        </div>
        <h4>Datos</h4>
        <p>Cada columna que guardamos es una decisión: qué se recolecta, cuánto tiempo y quién puede verlo.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M4 7l8-4 8 4M4 7v0a3 3 0 006 0M4 7l3 7a3 3 0 006 0l-3-7M14 7l3 7a3 3 0 006 0l-3-7M20 7v0a3 3 0 006 0"/><line x1="8" y1="21" x2="16" y2="21"/></svg>
        </div>
        <h4>Ética</h4>
        <p><strong>Privacy by Design:</strong> la privacidad se construye desde el primer <code>CREATE TABLE</code>, no se agrega al final.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(176,127,196,0.18); color:#b07fc4;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg>
        </div>
        <h4>Ley</h4>
        <p>La <strong>Ley 1581 de 2012 (Habeas Data)</strong> es un requisito de ingeniería tan real como una llave foránea.</p>
        <p style="margin-top:0.6rem;">Su propósito es proteger el derecho de todas las personas a conocer, actualizar y rectificar la información que se haya recolectado sobre ellas en bases de datos.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.7-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>
        </div>
        <h4>El dilema</h4>
        <p>Más datos, mejores recomendaciones, pero también más riesgo. Ese balance lo define el arquitecto de datos.</p>
      </div>
    </div>

    <div class="content-box">
      <h4>Pregunta para el debate</h4>
      <p>
        Como futuro ingeniero de sistemas, ¿consideras que el éxito de una plataforma como
        Spotify justifica la recolección masiva y persistente de cada movimiento del usuario,
        o debería la arquitectura de datos priorizar la privacidad absoluta (Habeas Data)
        aunque esto degrade la precisión de los algoritmos de IA? ¿Es posible un punto medio
        desde el diseño de la base de datos?
      </p>
    </div>
  </div>

  <!-- ===================== 2. QUÉ ES UNA BASE DE DATOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. ¿Qué es una base de datos?</h3>
    </div>

    <p>
      Una <strong>base de datos</strong> es un sistema organizado para guardar información de
      forma <strong>persistente</strong>: sobrevive aunque se apague el computador o se
      reinicie la aplicación. Un <strong>motor de base de datos (DBMS)</strong> es el software
      que administra esa información, la guarda en disco, la organiza en estructuras y
      responde a las consultas que le hacemos.
    </p>

    <p>
      Las bases de datos son la <strong>base fundamental del mundo digital actual</strong>.
      No hay banco, hospital, tienda, red social, gobierno o plataforma de streaming que funcione sin una.
      Cada vez que retiras dinero de un cajero, agendas una cita médica, compras algo en línea o le das
      "me gusta" a una canción, hay una base de datos respondiendo detrás de escena.
    </p>

    <div class="numbered-grid icons-3col" style="margin:0.8rem 0 1.2rem;">
      <div class="numbered-card" style="text-align:center;">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6"/><path d="M5 10v9M19 10v9M9 10v9M15 10v9"/><path d="M3 19h18"/></svg>
        </div>
        <p style="margin:0; font-size:0.82rem;">Bancos</p>
      </div>
      <div class="numbered-card" style="text-align:center;">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-7-11a7 7 0 0114 0c0 6.5-7 11-7 11z"/><path d="M12 7v7M9 10.5h6"/></svg>
        </div>
        <p style="margin:0; font-size:0.82rem;">Salud</p>
      </div>
      <div class="numbered-card" style="text-align:center;">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M2 3h2l2.6 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L21 7H6"/></svg>
        </div>
        <p style="margin:0; font-size:0.82rem;">Comercio</p>
      </div>
      <div class="numbered-card" style="text-align:center;">
        <div class="summary-icon" style="background:rgba(139,127,184,0.18); color:#8b7fb8;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><line x1="7.5" y1="7.5" x2="11" y2="16"/><line x1="16.5" y1="7.5" x2="13" y2="16"/><line x1="8" y1="6" x2="16" y2="6"/></svg>
        </div>
        <p style="margin:0; font-size:0.82rem;">Redes sociales</p>
      </div>
      <div class="numbered-card" style="text-align:center;">
        <div class="summary-icon" style="background:rgba(201,162,63,0.18); color:#c9a23f;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <p style="margin:0; font-size:0.82rem;">Gobierno</p>
      </div>
      <div class="numbered-card" style="text-align:center;">
        <div class="summary-icon" style="background:rgba(176,127,196,0.18); color:#b07fc4;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h4l2-6 4 12 2-6h4"/></svg>
        </div>
        <p style="margin:0; font-size:0.82rem;">Streaming</p>
      </div>
    </div>

    <div class="content-box">
      <h4>La analogía RAM vs. Disco</h4>
      <p>
        Una estructura de datos en memoria (como un diccionario o una lista en Python) es como
        una pizarra acrílica: escribes rápido, borras rápido, es perfecta mientras trabajas —
        pero si alguien limpia la pizarra (o apagas el computador), todo desaparece para siempre.
      </p>
      <p style="margin-top:0.6rem;">
        Una base de datos en disco es el cuaderno donde guardas la versión definitiva de lo importante: los
        datos sobreviven aunque el sistema se reinicie. Por eso SoundFlow necesita una base de
        datos real, no solo variables en memoria.
      </p>

      <svg class="ram-disk-illustration" viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg" style="width:100%; max-width:400px; margin:1rem auto 0; display:block;">
        <g class="ram-shape">
          <rect x="10" y="30" width="110" height="70" rx="10" fill="none" stroke="#c44444" stroke-width="2"/>
          <text x="65" y="60" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#c44444">RAM</text>
          <text x="65" y="78" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="#a83a3a">volátil</text>
        </g>
        <line class="flow-arrow" x1="130" y1="65" x2="270" y2="65" stroke="#5b7c99" stroke-width="2"/>
        <polygon points="270,60 282,65 270,70" fill="#5b7c99"/>
        <text x="200" y="55" text-anchor="middle" font-family="Consolas, monospace" font-size="9" fill="#6c7a89">INSERT</text>
        <g>
          <rect x="290" y="20" width="100" height="90" rx="10" fill="#5b7c99"/>
          <ellipse cx="340" cy="35" rx="50" ry="10" fill="#6f93ac"/>
          <text x="340" y="72" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#fff">Disco</text>
          <text x="340" y="90" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="#e6edf3">persistente</text>
        </g>
      </svg>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.6rem 0 0.4rem;">Bases de datos transaccionales vs. de consulta</h4>
    <p>
      No todas las bases de datos se usan de la misma forma. Según qué tan seguido se escribe en ellas y
      qué tan complejo es lo que se les pregunta, se dividen en dos grandes familias:
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(2, 1fr); margin-top:0.8rem;">
      <div class="concept-card" style="border:1px solid #5b7c99; border-radius:10px;">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
        </div>
        <h4>Transaccionales (OLTP)</h4>
        <p style="font-size:0.78rem; color:var(--text-dim); margin:-0.2rem 0 0.5rem;">OLTP = Online Transaction Processing</p>
        <p>Optimizadas para muchas operaciones cortas y frecuentes de lectura/escritura, en tiempo real.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">
          <strong>En SoundFlow:</strong> cada vez que Camilo se registra, paga su suscripción o le da "me
          gusta" a una canción, es una transacción pequeña e inmediata sobre <code>usuarios</code> o
          <code>pagos_suscripcion</code>.
        </p>
      </div>
      <div class="concept-card" style="border:1px solid #8b7fb8; border-radius:10px;">
        <div class="summary-icon" style="background:rgba(139,127,184,0.18); color:#8b7fb8;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-6 4 4 5-8"/></svg>
        </div>
        <h4>De consulta / analíticas (OLAP)</h4>
        <p style="font-size:0.78rem; color:var(--text-dim); margin:-0.2rem 0 0.5rem;">OLAP = Online Analytical Processing</p>
        <p>Optimizadas para consultas pesadas y complejas sobre grandes volúmenes de datos históricos.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">
          <strong>En SoundFlow:</strong> un analista preguntando "¿qué género musical creció más este
          trimestre en Latinoamérica?" no necesita respuesta instantánea, sino una respuesta correcta sobre
          millones de registros históricos.
        </p>
      </div>
    </div>

    <div class="content-box">
      <p style="margin:0;">
        La diferencia no es de tecnología sino de <strong>propósito</strong>: una base transaccional prioriza
        velocidad y consistencia por operación (que el pago de Camilo se registre ya, sin errores); una base
        de consulta prioriza la capacidad de cruzar y agregar muchísima información a la vez, aunque tarde
        más segundos en responder. Por eso las plataformas grandes suelen tener las dos: una base OLTP para
        el día a día de la aplicación, y otra OLAP (a veces llamada <em>data warehouse</em>) alimentada con
        copias de esos mismos datos, dedicada solo a reportes y análisis.
      </p>
    </div>
  </div>

  <!-- ===================== 3. PEQUEÑA HISTORIA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Pequeña historia de las bases de datos</h3>
    </div>

    <div class="timeline">
      <div class="timeline-item">
        <span class="timeline-badge">1</span>
        <div>
          <div class="era-icon" style="background:#e7ddd0; color:#8a6f4e;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="15" width="20" height="6" rx="1"/><circle cx="8" cy="9" r="5"/><circle cx="16" cy="9" r="5"/><circle cx="8" cy="9" r="1.2" fill="currentColor"/><circle cx="16" cy="9" r="1.2" fill="currentColor"/><path d="M8.5 13.5c0 2.2 2 2.5 3.5 2.5s3.5-.3 3.5-2.5"/></svg>
          </div>
          <h4>Años 60: archivos planos y bases jerárquicas</h4>
          <p>Cada aplicación guardaba su propia información en archivos de texto, sin ningún estándar. <strong>IBM</strong> lanza IMS, la base de datos jerárquica que usó <strong>American Airlines</strong> en el sistema SABRE para gestionar reservas de vuelos en tiempo real. Los datos vivían en grandes computadores centrales (mainframes) con cintas magnéticas.</p>
        </div>
      </div>
      <div class="timeline-item">
        <span class="timeline-badge">2</span>
        <div>
          <div class="era-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="10" x2="9" y2="20"/><line x1="15" y1="10" x2="15" y2="20"/></svg>
          </div>
          <h4>1970: el modelo relacional</h4>
          <p><strong>Edgar F. Codd</strong>, investigador de <strong>IBM</strong>, publica el artículo que propone organizar la información en tablas con filas y columnas, sentando las bases de las bases de datos <strong>SQL</strong> (<em>Structured Query Language</em>).</p>
        </div>
      </div>
      <div class="timeline-item">
        <span class="timeline-badge">3</span>
        <div>
          <div class="era-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="1.5"/><polyline points="7 9 10 12 7 15"/><line x1="12" y1="15" x2="16" y2="15"/><line x1="3" y1="20" x2="21" y2="20"/></svg>
          </div>
          <h4>1979-90s: SQL se estandariza</h4>
          <p><strong>Oracle</strong> lanza en 1979 el primer motor relacional comercial, seguido por IBM DB2 e Ingres. Se trabajaba desde terminales de texto con comandos SQL. En 1995 nace <strong>MySQL</strong>, el motor libre que instalarás esta semana.</p>
        </div>
      </div>
      <div class="timeline-item">
        <span class="timeline-badge">4</span>
        <div>
          <div class="era-icon" style="background:rgba(176,127,196,0.18); color:#b07fc4;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
          </div>
          <h4>2006-2009: nace el movimiento NoSQL</h4>
          <p>La explosión de la web obliga a repensar la escalabilidad, diseñando sistemas para repartir la información entre miles de servidores conectados en red, en vez de una sola tabla gigante:</p>
          <p style="margin-top:0.5rem;"><strong>Google</strong> publica Bigtable (2006).</p>
          <p style="margin-top:0.5rem;"><strong>Amazon</strong> publica Dynamo (2007).</p>
          <p style="margin-top:0.5rem;">De ahí nacen <strong>MongoDB</strong> (2009) y Cassandra. El término "NoSQL" lo acuñó <strong>Carlo Strozzi</strong> en 1998.</p>
          <p style="margin-top:0.5rem;">Surge la necesidad de NoSQL por <strong>rendimiento y costos</strong>: manejar el volumen y la velocidad de la web moderna con motores relacionales tradicionales se volvía cada vez más lento y caro de escalar.</p>
        </div>
      </div>
      <div class="timeline-item">
        <span class="timeline-badge timeline-badge-final">★</span>
        <div>
          <div class="era-icon" style="background:rgba(201,162,63,0.18); color:#c9a23f;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4.5 4.5 0 010-9 5.5 5.5 0 0110.5-1.5A4 4 0 0119 18H7z"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="9" y1="21" x2="9" y2="21"/><line x1="15" y1="21" x2="15" y2="21"/></svg>
          </div>
          <h4>Hoy: nube y bases de datos vectoriales</h4>
          <p>Empresas como Netflix y Spotify combinan varios motores en la nube (persistencia políglota).</p>
          <p style="margin-top:0.5rem;">Las bases de datos vectoriales tampoco tienen un solo creador: nacen de años de investigación en búsqueda por similitud.</p>
          <p style="margin-top:0.5rem;"><strong>Annoy</strong> (Approximate Nearest Neighbors Oh Yeah), creada por Spotify en 2015, fue una de las primeras librerías en resolver ese problema a gran escala para recomendaciones musicales.</p>
          <p style="margin-top:0.5rem;"><strong>FAISS</strong> (Facebook AI Similarity Search), publicada por el equipo de investigación de Facebook (hoy Meta AI) en 2017, llevó esa misma idea a miles de millones de vectores, con soporte de GPU.</p>
          <p style="margin-top:0.5rem;">La primera base de datos vectorial como producto independiente fue <strong>Pinecone</strong>, fundada en 2019 por <strong>Edo Liberty</strong>. Hoy conectan la persistencia con la IA generativa.</p>
        </div>
      </div>
    </div>

    <div class="content-box" style="margin-top:1.4rem;">
      <h4>¿Qué son Annoy y FAISS?</h4>
      <p style="margin-bottom:0.8rem;">
        Son librerías de búsqueda por similitud: encuentran rápidamente los vectores "más
        parecidos" a uno dado entre millones de datos, sin tener que compararlo contra todos
        uno por uno (sería demasiado lento). Ninguna de las dos es una base de datos completa
        por sí sola, son el motor de búsqueda que las bases de datos vectoriales modernas
        empaquetaron como producto.
      </p>
      <div class="concept-grid" style="grid-template-columns: repeat(2, 1fr); margin:0;">
        <div class="concept-card">
          <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="6"/><line x1="20" y1="20" x2="14.5" y2="14.5"/></svg>
          </div>
          <h4>Annoy (Spotify, 2015)</h4>
          <p>Su nombre viene de <strong>Approximate Nearest Neighbors Oh Yeah</strong>. Creada por Erik Bernhardsson para las recomendaciones musicales de Spotify. Construye varios "árboles" que dividen el espacio de vectores al azar, para buscar de forma aproximada sin recorrer todo el catálogo.</p>
        </div>
        <div class="concept-card">
          <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </div>
          <h4>FAISS (Facebook AI, 2017)</h4>
          <p>Desarrollada por el equipo de investigación de Facebook (Facebook AI Research, hoy Meta AI). Busca y agrupa vectores a escalas de miles de millones, con soporte de GPU para acelerar la búsqueda.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ===================== 4. NETFLIX, SPOTIFY Y OTRAS EMPRESAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. Qué bases de datos usan Netflix, Spotify y otras plataformas</h3>
    </div>

    <p>
      Ninguna plataforma de este tamaño usa un solo motor de base de datos: combinan varios
      según el problema que necesitan resolver. A esto lo llamamos <strong>persistencia
      políglota</strong>.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="10" x2="9" y2="20"/></svg>
        </div>
        <h4>Netflix</h4>
        <p>Migró sus datos relacionales críticos (facturación, catálogo) a PostgreSQL administrado en la nube (Amazon Aurora), buscando la consistencia que exige el modelo relacional a gran escala.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(111,157,124,0.18); color:#6f9d7c;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3"/><path d="M16 3c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3"/></svg>
        </div>
        <h4>Spotify</h4>
        <p>Usa Apache Cassandra (NoSQL) para guardar playlists y datos de usuario a escala global, porque necesita seguir disponible incluso si un centro de datos falla. Además usa Redis para cachear metadatos y responder en milisegundos.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8l8-5 8 5v8l-8 5-8-5V8z"/><path d="M4 8l8 5 8-5"/><line x1="12" y1="13" x2="12" y2="21"/></svg>
        </div>
        <h4>Disney+</h4>
        <p>Usa Amazon DynamoDB (NoSQL) para escalar globalmente: reparte los metadatos de cada video en muchas particiones y reparte las lecturas al azar entre ellas, para que un título muy popular no sature una sola partición. También usa Amazon Kinesis para procesar miles de millones de eventos por hora en tiempo real (recomendaciones, analítica).</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(201,162,63,0.18); color:#c9a23f;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2l1.5 5h9L18 2"/><path d="M3.5 7h17l-1.2 12a2 2 0 01-2 1.8H6.7a2 2 0 01-2-1.8L3.5 7z"/><line x1="9" y1="11" x2="9" y2="16"/><line x1="15" y1="11" x2="15" y2="16"/></svg>
        </div>
        <h4>Amazon (tienda en línea)</h4>
        <p>El carrito de compras y otros datos de altísimo tráfico corren en Amazon DynamoDB, la base NoSQL que Amazon mismo creó (nació del paper "Dynamo" de 2007). Para reportes, análisis y datos que necesitan relaciones complejas, usa Amazon Aurora, su motor relacional.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="10" rx="1"/><path d="M5 10V7a7 7 0 0114 0v3"/><circle cx="12" cy="15" r="1.5"/></svg>
        </div>
        <h4>Bancolombia</h4>
        <p>Está migrando gradualmente su core bancario hacia la nube (modelo de "deshidratación"): usa Amazon RDS (motor relacional administrado) para nuevas aplicaciones, mientras una parte de su infraestructura crítica todavía opera sobre mainframes tradicionales — un ejemplo real de cómo la banca combina lo nuevo con lo heredado.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 010 18 9 9 0 010-18z"/><line x1="3" y1="12" x2="21" y2="12"/></svg>
        </div>
        <h4>El principio detrás</h4>
        <p>Dinero y consistencia piden un motor relacional. Escala y disponibilidad piden NoSQL. Velocidad extrema pide caché en memoria. La pregunta nunca es "¿cuál es la mejor base de datos?", sino "¿cuál es la mejor para este problema?".</p>
      </div>
    </div>

    <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.8rem;">
      Fuentes: AWS re:Invent (2020). <em>How Disney+ scales globally on Amazon DynamoDB</em> ·
      Amazon Web Services. <em>Amazon Aurora vs. DynamoDB</em> ·
      Bancolombia / AWS. <em>Migración del core bancario a la nube</em>.
    </p>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.6rem 0 0.4rem; text-align:center;">¿Qué tipos de bases de datos se usan más?</h4>
    <p>
      Más allá de los casos puntuales de Netflix o Spotify, así se ve el panorama general de la
      industria hoy, según dos mediciones independientes:
    </p>

    <div class="content-box">
      <h4>Por popularidad general (DB-Engines, 2026)</h4>
      <div style="margin-top:0.8rem;">
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#c44444; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">Or</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>Oracle</strong><span style="color:var(--text-dim);">1182 pts</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:100%; height:100%; background:#c44444;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#5b9aa0; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">My</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>MySQL</strong><span style="color:var(--text-dim);">858 pts</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:72.6%; height:100%; background:#5b9aa0;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#c99a4e; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">MS</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>SQL Server</strong><span style="color:var(--text-dim);">711 pts</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:60.2%; height:100%; background:#c99a4e;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#5b7c99; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">Pg</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>PostgreSQL</strong><span style="color:var(--text-dim);">680 pts</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:57.5%; height:100%; background:#5b7c99;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">Mo</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>MongoDB</strong> <span style="font-size:0.72rem; color:var(--text-dim);">(NoSQL #1)</span><span style="color:var(--text-dim);">384 pts</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:32.5%; height:100%; background:#6f9d7c;"></div></div>
          </div>
        </div>
      </div>
      <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.8rem;">Los 4 primeros lugares son motores relacionales. MongoDB, en 5º puesto, es la base NoSQL más usada.</p>
    </div>

    <div class="content-box" style="margin-top:1rem;">
      <h4>Por uso real de desarrolladores (Stack Overflow Developer Survey, 2025)</h4>
      <div style="margin-top:0.8rem;">
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#5b7c99; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">Pg</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>PostgreSQL</strong><span style="color:var(--text-dim);">55.6%</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:92.7%; height:100%; background:#5b7c99;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#5b9aa0; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">My</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>MySQL</strong><span style="color:var(--text-dim);">40.5%</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:67.5%; height:100%; background:#5b9aa0;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#b07fc4; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">Li</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>SQLite</strong><span style="color:var(--text-dim);">32%</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:53.3%; height:100%; background:#b07fc4;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#6f9d7c; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">Mo</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>MongoDB</strong><span style="color:var(--text-dim);">26%</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:43.3%; height:100%; background:#6f9d7c;"></div></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.7rem;">
          <div style="width:34px; height:34px; border-radius:50%; background:#c4767c; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700; font-family:Segoe UI, sans-serif; flex-shrink:0;">Re</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;"><strong>Redis</strong><span style="color:var(--text-dim);">22%</span></div>
            <div style="background:var(--bg); border-radius:6px; overflow:hidden; height:11px;"><div style="width:36.7%; height:100%; background:#c4767c;"></div></div>
          </div>
        </div>
      </div>
      <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.8rem;">PostgreSQL lleva 3 años consecutivos como la base de datos más usada, más deseada y mejor valorada por los desarrolladores.</p>
    </div>

    <div class="content-box">
      <p style="margin:0;">
        Aunque existan decenas de motores especializados, la gran mayoría de
        aplicaciones del mundo real todavía se construyen sobre un motor <strong>relacional</strong>
        (como MySQL o PostgreSQL) para los datos centrales, y se apoyan en NoSQL o caché en memoria
        (como MongoDB o Redis) solo para los problemas específicos donde el modelo relacional no basta.
      </p>
    </div>

    <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.6rem;">
      Fuentes: DB-Engines. <em>Ranking de popularidad de sistemas de bases de datos</em> (2026) ·
      Stack Overflow. <em>Developer Survey</em> (2025), sección Technology.
    </p>
  </div>

  <!-- ===================== 5. INICIANDO CON BASES DE DATOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. Iniciando con bases de datos: tabla, campo, registro, relaciones y tipos de datos</h3>
    </div>

    <p>Antes de crear la base de datos de SoundFlow, veamos gráficamente las piezas que la componen.</p>

    <div style="overflow-x:auto; margin:1.2rem 0; display:flex; justify-content:center;">
      <table id="tablaDemo" style="border-collapse:collapse; font-family:Consolas,monospace; font-size:0.83rem;">
        <thead>
          <tr>
            <th class="demo-th" style="padding:0.6rem 0.8rem; background:var(--accent); color:#fff; border:1px solid var(--border);">id_usuario</th>
            <th class="demo-th" style="padding:0.6rem 0.8rem; background:var(--accent); color:#fff; border:1px solid var(--border);">nombre</th>
            <th class="demo-th" style="padding:0.6rem 0.8rem; background:var(--accent); color:#fff; border:1px solid var(--border);">email</th>
            <th class="demo-th" style="padding:0.6rem 0.8rem; background:var(--accent); color:#fff; border:1px solid var(--border);">password_hash</th>
            <th class="demo-th" style="padding:0.6rem 0.8rem; background:var(--accent); color:#fff; border:1px solid var(--border);">esta_activo</th>
            <th class="demo-th" style="padding:0.6rem 0.8rem; background:var(--accent); color:#fff; border:1px solid var(--border);">fecha_crea</th>
          </tr>
        </thead>
        <tbody>
          <tr class="demo-row">
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">1</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">Camilo Restrepo</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">camilo@flow.com</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">a1b2c3...</td>
            <td class="demo-dato" style="padding:0.5rem 0.8rem; border:1px solid var(--border);">1</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">2026-08-10</td>
          </tr>
          <tr>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">2</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">Santiago Marín</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">santiago@flow.com</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">f9e8d7...</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">1</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">2026-08-11</td>
          </tr>
          <tr>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">3</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">Valentina Ríos</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">valentina@flow.com</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">4c5b6a...</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">0</td>
            <td style="padding:0.5rem 0.8rem; border:1px solid var(--border);">2026-08-12</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="numbered-grid numbered-grid-2col" style="margin-top:0.5rem;">
      <div class="numbered-card" data-highlight="tabla" style="cursor:pointer;">
        <div class="num"><span class="color-dot" style="background:var(--accent);"></span>Tabla</div>
        <p>Conjunto de datos organizados en filas y columnas, todos de la misma entidad.</p>
      </div>
      <div class="numbered-card" data-highlight="campo" style="cursor:pointer;">
        <div class="num" style="color:#8b7fb8;"><span class="color-dot" style="background:#8b7fb8;"></span>Campo (columna)</div>
        <p>Atributo que describe a la entidad, con un tipo de dato definido.</p>
      </div>
      <div class="numbered-card" data-highlight="registro" style="cursor:pointer;">
        <div class="num" style="color:#c44444;"><span class="color-dot" style="background:#c44444;"></span>Registro (fila)</div>
        <p>Una instancia individual de la entidad, con todos sus datos.</p>
      </div>
      <div class="numbered-card" data-highlight="dato" style="cursor:pointer;">
        <div class="num" style="color:#4f7876;"><span class="color-dot" style="background:#4f7876;"></span>Dato</div>
        <p>El valor concreto que vive en la intersección de una fila y una columna.</p>
      </div>
    </div>
    <p style="font-size:0.82rem; color:var(--text-dim); margin-top:0.4rem;">El color de cada tarjeta corresponde al resaltado que verás en la tabla al hacer clic.</p>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem;">Relaciones: el hilo entre tablas</h4>
    <p>
      Una <strong>relación</strong> es el vínculo entre dos tablas, y se construye con una
      <strong>llave primaria (PK)</strong> en la tabla "de origen" y una <strong>llave foránea (FK)</strong>
      en la tabla "de destino" que apunta a ella. Gracias a esto, los datos se pueden dividir en varias
      tablas sin perder la forma de reconstruirlos: en vez de repetir el nombre y el email de un usuario
      en cada pago que hace, <code>pagos_suscripcion</code> solo guarda su <code>usuario_id</code> y "sabe"
      a quién pertenece.
    </p>

    <svg class="er-diagram" viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="290" height="210" rx="8" fill="#ffffff" stroke="#dde3ea"/>
      <rect x="20" y="10" width="290" height="34" rx="8" fill="#5b7c99"/>
      <rect x="20" y="34" width="290" height="10" fill="#5b7c99"/>
      <text x="35" y="32" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700">usuarios</text>
      <text x="35" y="64" font-family="Consolas, monospace" font-size="12" fill="#a83a3a" font-weight="700">PK  id_usuario</text>
      <text x="35" y="86" font-family="Consolas, monospace" font-size="12" fill="#33404f">nombre        VARCHAR(100)</text>
      <text x="35" y="108" font-family="Consolas, monospace" font-size="12" fill="#33404f">email         VARCHAR(150) UNIQUE</text>
      <text x="35" y="130" font-family="Consolas, monospace" font-size="12" fill="#33404f">password_hash VARCHAR(256)</text>
      <text x="35" y="152" font-family="Consolas, monospace" font-size="12" fill="#33404f">esta_activo   TINYINT</text>
      <text x="35" y="174" font-family="Consolas, monospace" font-size="12" fill="#33404f">fecha_crea    TIMESTAMP</text>

      <rect x="370" y="10" width="290" height="140" rx="8" fill="#ffffff" stroke="#dde3ea"/>
      <rect x="370" y="10" width="290" height="34" rx="8" fill="#5b7c99"/>
      <rect x="370" y="34" width="290" height="10" fill="#5b7c99"/>
      <text x="385" y="32" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700">pagos_suscripcion</text>
      <text x="385" y="64" font-family="Consolas, monospace" font-size="12" fill="#a83a3a" font-weight="700">PK  id_pago</text>
      <text x="385" y="86" font-family="Consolas, monospace" font-size="12" fill="#33404f">monto       DECIMAL(10,2)</text>
      <text x="385" y="108" font-family="Consolas, monospace" font-size="12" fill="#33404f">fecha_pago  DATETIME</text>
      <text x="385" y="130" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">FK  usuario_id</text>

      <line x1="310" y1="90" x2="370" y2="90" stroke="#5b7c99" stroke-width="2"/>
      <circle cx="310" cy="90" r="4" fill="#5b7c99"/>
      <circle cx="370" cy="90" r="4" fill="#5b7c99"/>
      <text x="322" y="82" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">1</text>
      <text x="352" y="82" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">N</text>
      <text x="340" y="104" text-anchor="middle" font-family="Consolas, monospace" font-size="8" fill="#6c7a89">ON DELETE</text>
      <text x="340" y="114" text-anchor="middle" font-family="Consolas, monospace" font-size="8" fill="#6c7a89">RESTRICT</text>
    </svg>
    <p style="font-size:0.82rem; color:var(--text-dim); text-align:center; margin-top:-0.4rem;">
      1 usuario puede tener N pagos, pero cada pago pertenece a un único usuario.
      <code>ON DELETE RESTRICT</code> significa que MySQL bloquea el intento de borrar un usuario mientras
      aún tenga pagos asociados, así nunca queda un pago "huérfano" apuntando a un usuario que ya no existe.
    </p>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.6rem 0 0.4rem; text-align:center;">Los tres tipos de relación</h4>
    <p>
      La "forma" de una relación depende de cuántos registros de una tabla pueden asociarse con cuántos de
      la otra. El truco para reconocerla siempre es el mismo: pregúntate "¿del lado A, cuántos del lado B
      puede tener?" y "¿del lado B, cuántos del lado A puede tener?". Según esas dos respuestas, cae en uno
      de estos tres casos:
    </p>

    <div style="display:flex; flex-direction:column; gap:1.4rem; margin-top:1rem;">

      <!-- 1:1 -->
      <div class="content-box" style="border-left:4px solid #5b7c99;">
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.6rem;">
          <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99; width:44px; height:44px; margin:0; flex-shrink:0;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><line x1="9" y1="12" x2="15" y2="12"/></svg>
          </div>
          <h4 style="margin:0; color:#5b7c99;">1. Uno a uno (1:1)</h4>
        </div>
        <p><strong>En palabras simples:</strong> un registro de la tabla A se conecta con un solo registro de la tabla B, y ese registro de B tampoco se conecta con nadie más. Ambos lados responden "solo uno".</p>
        <p style="margin-top:0.6rem;"><strong>Analogía:</strong> como una persona y su huella digital — cada persona tiene una sola huella, y esa huella no le pertenece a nadie más.</p>
        <p style="margin-top:0.6rem;"><strong>En SoundFlow:</strong> Camilo (usuario) tiene su propio <code>perfil_facturacion</code>, con su tarjeta y dirección. Ese perfil es solo suyo: nunca lo comparte con otro usuario, ni él tiene dos.</p>
        <svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%; max-width:360px; height:auto; margin:0.8rem auto 0; display:block;">
          <rect x="10" y="28" width="130" height="34" rx="8" fill="#ffffff" stroke="#5b7c99" stroke-width="1.5"/>
          <text x="75" y="50" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" fill="#33404f">Camilo</text>
          <rect x="180" y="28" width="130" height="34" rx="8" fill="#ffffff" stroke="#5b7c99" stroke-width="1.5"/>
          <text x="245" y="50" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#33404f">Perfil facturación</text>
          <line x1="140" y1="45" x2="180" y2="45" stroke="#5b7c99" stroke-width="2"/>
          <circle cx="140" cy="45" r="4" fill="#5b7c99"/>
          <circle cx="180" cy="45" r="4" fill="#5b7c99"/>
          <text x="152" y="37" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">1</text>
          <text x="168" y="37" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99" font-weight="700">1</text>
        </svg>
        <div style="font-size:0.8rem; color:var(--text); margin-top:0.8rem; background:rgba(91,124,153,0.08); border-radius:8px; padding:0.8rem 1rem;">
          <strong style="color:#5b7c99;">Otros ejemplos en SoundFlow:</strong>
          <br><br>
          <code>usuario</code> ↔ <code>configuracion_privacidad</code>
          (sus preferencias que comparte: por ejemplo, si su actividad de escucha es visible para
          sus amigos, o si su perfil es público o privado).
          <br><br>
          <code>artista</code> ↔ <code>perfil_verificado</code>
          (la insignia azul solo existe una vez por artista).
        </div>
      </div>

      <!-- 1:N -->
      <div class="content-box" style="border-left:4px solid #7fa5a3;">
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.6rem;">
          <div class="summary-icon" style="background:rgba(127,165,163,0.18); color:#7fa5a3; width:44px; height:44px; margin:0; flex-shrink:0;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="3"/><circle cx="18" cy="5" r="2.4"/><circle cx="18" cy="12" r="2.4"/><circle cx="18" cy="19" r="2.4"/><line x1="8" y1="12" x2="15.5" y2="6.5"/><line x1="8" y1="12" x2="15.5" y2="12"/><line x1="8" y1="12" x2="15.5" y2="17.5"/></svg>
          </div>
          <h4 style="margin:0; color:#7fa5a3;">2. Uno a muchos (1:N)</h4>
        </div>
        <p><strong>En palabras simples:</strong> un registro de la tabla A se conecta con varios registros de la tabla B, pero cada uno de esos registros de B solo pertenece a uno de A. Un lado responde "uno", el otro responde "varios".</p>
        <p style="margin-top:0.6rem;"><strong>Analogía:</strong> como una madre y sus hijos — una madre puede tener varios hijos, pero cada hijo tiene una sola madre.</p>
        <p style="margin-top:0.6rem;"><strong>En SoundFlow:</strong> la artista Shakira (1) tiene 40 <code>canciones</code> subidas (N). Cada una de esas canciones le pertenece solo a ella, nunca a otro artista.</p>
        <svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" style="width:100%; max-width:360px; height:auto; margin:0.8rem auto 0; display:block;">
          <rect x="6" y="48" width="110" height="34" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
          <text x="61" y="70" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#33404f">Shakira</text>
          <rect x="200" y="4" width="110" height="30" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
          <text x="255" y="24" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">Canción 1</text>
          <rect x="200" y="49" width="110" height="30" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
          <text x="255" y="69" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">Canción 2</text>
          <rect x="200" y="94" width="110" height="30" rx="8" fill="#ffffff" stroke="#7fa5a3" stroke-width="1.5"/>
          <text x="255" y="114" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#33404f">Canción 3</text>
          <line x1="116" y1="65" x2="200" y2="19" stroke="#7fa5a3" stroke-width="1.5"/>
          <line x1="116" y1="65" x2="200" y2="64" stroke="#7fa5a3" stroke-width="1.5"/>
          <line x1="116" y1="65" x2="200" y2="109" stroke="#7fa5a3" stroke-width="1.5"/>
          <circle cx="116" cy="65" r="4" fill="#7fa5a3"/>
          <text x="130" y="57" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">1</text>
          <text x="180" y="57" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#7fa5a3" font-weight="700">N</text>
        </svg>
        <div style="font-size:0.8rem; color:var(--text); margin-top:0.8rem; background:rgba(127,165,163,0.12); border-radius:8px; padding:0.8rem 1rem;">
          <strong style="color:#5f8582;">Otros ejemplos en SoundFlow:</strong>
          <br><br>
          1 <code>album</code> → N <code>canciones</code>
          (un álbum agrupa varias pistas, pero cada pista pertenece a un único álbum).
          <br><br>
          1 <code>usuario</code> → N <code>dispositivos_conectados</code>
          (un usuario puede tener su cuenta abierta en el celular, el portátil y un altavoz inteligente al
          mismo tiempo, pero cada dispositivo conectado quedó registrado con un solo usuario).
        </div>
      </div>

      <!-- N:M -->
      <div class="content-box" style="border-left:4px solid #8b7fb8;">
        <div style="display:flex; align-items:center; gap:0.7rem; margin-bottom:0.6rem;">
          <div class="summary-icon" style="background:rgba(139,127,184,0.18); color:#8b7fb8; width:44px; height:44px; margin:0; flex-shrink:0;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2.4"/><circle cx="5" cy="18" r="2.4"/><rect x="10" y="10" width="4" height="4" rx="1"/><circle cx="19" cy="6" r="2.4"/><circle cx="19" cy="18" r="2.4"/><line x1="7.2" y1="7.2" x2="10.5" y2="10.5"/><line x1="7.2" y1="16.8" x2="10.5" y2="13.5"/><line x1="13.5" y1="10.5" x2="16.8" y2="7.2"/><line x1="13.5" y1="13.5" x2="16.8" y2="16.8"/></svg>
          </div>
          <h4 style="margin:0; color:#8b7fb8;">3. Muchos a muchos (N:M)</h4>
        </div>
        <p><strong>En palabras simples:</strong> varios registros de la tabla A se conectan con varios registros de la tabla B, y viceversa. Ambos lados responden "varios" — por eso ninguna FK simple alcanza, hace falta una <strong>tabla puente</strong>.</p>
        <p style="margin-top:0.6rem;"><strong>Analogía:</strong> como estudiantes y materias — un estudiante ve varias materias, y una materia la ven varios estudiantes.</p>
        <p style="margin-top:0.6rem;"><strong>En SoundFlow:</strong> Camilo le dio "me gusta" a "Ojos Marrones" y a otras 50 canciones (varias del lado usuario); esa misma canción también tiene "me gusta" de Santiago y miles de usuarios más (varias del lado canción). Ningún lado es "uno solo".</p>
        <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" style="width:100%; max-width:380px; height:auto; margin:0.8rem auto 0; display:block;">
          <rect x="8" y="8" width="112" height="30" rx="8" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.8"/>
          <text x="64" y="28" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#33404f">Camilo</text>
          <rect x="8" y="64" width="112" height="30" rx="8" fill="#ffffff" stroke="#c99a4e" stroke-width="1.8"/>
          <text x="64" y="84" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#33404f">Santiago</text>
          <rect x="8" y="120" width="112" height="30" rx="8" fill="#ffffff" stroke="#5b9aa0" stroke-width="1.8"/>
          <text x="64" y="140" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#33404f">Valentina</text>

          <rect x="220" y="8" width="114" height="30" rx="8" fill="#ffffff" stroke="#dde3ea" stroke-width="1.8"/>
          <text x="277" y="28" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#33404f">Ojos Marrones</text>
          <rect x="220" y="64" width="114" height="30" rx="8" fill="#ffffff" stroke="#dde3ea" stroke-width="1.8"/>
          <text x="277" y="84" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#33404f">Vente Pa' Ca</text>
          <rect x="220" y="120" width="114" height="30" rx="8" fill="#ffffff" stroke="#dde3ea" stroke-width="1.8"/>
          <text x="277" y="140" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10.5" fill="#33404f">Luz de Luna</text>

          <!-- Camilo (morado): Ojos Marrones + Vente Pa' Ca -->
          <path d="M120,23 C170,23 170,23 220,23" fill="none" stroke="#8b7fb8" stroke-width="2"/>
          <path d="M120,23 C170,23 170,79 220,79" fill="none" stroke="#8b7fb8" stroke-width="2"/>
          <!-- Santiago (dorado): Ojos Marrones + Luz de Luna -->
          <path d="M120,79 C170,79 170,23 220,23" fill="none" stroke="#c99a4e" stroke-width="2"/>
          <path d="M120,79 C170,79 170,135 220,135" fill="none" stroke="#c99a4e" stroke-width="2"/>
          <!-- Valentina (verde): Vente Pa' Ca + Luz de Luna -->
          <path d="M120,135 C170,135 170,79 220,79" fill="none" stroke="#5b9aa0" stroke-width="2"/>
          <path d="M120,135 C170,135 170,135 220,135" fill="none" stroke="#5b9aa0" stroke-width="2"/>

          <circle cx="120" cy="23" r="4" fill="#8b7fb8"/>
          <circle cx="120" cy="79" r="4" fill="#c99a4e"/>
          <circle cx="120" cy="135" r="4" fill="#5b9aa0"/>
          <circle cx="220" cy="23" r="4" fill="#6c7a89"/>
          <circle cx="220" cy="79" r="4" fill="#6c7a89"/>
          <circle cx="220" cy="135" r="4" fill="#6c7a89"/>

          <circle cx="8" cy="176" r="4" fill="#8b7fb8"/>
          <text x="18" y="179" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">Camilo</text>
          <circle cx="72" cy="176" r="4" fill="#c99a4e"/>
          <text x="82" y="179" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">Santiago</text>
          <circle cx="146" cy="176" r="4" fill="#5b9aa0"/>
          <text x="156" y="179" font-family="Segoe UI, sans-serif" font-size="9" fill="var(--text-dim)">Valentina</text>
        </svg>
        <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.3rem;">
          Cada usuario le dio "me gusta" a 2 canciones distintas, y cada canción recibió "me gusta" de 2
          usuarios distintos. Nadie tiene "una sola" conexión de ningún lado — por eso es N:M.
        </p>
        <div style="font-size:0.8rem; color:var(--text); margin-top:0.8rem; background:rgba(139,127,184,0.1); border-radius:8px; padding:0.8rem 1rem;">
          <strong style="color:#8b7fb8;">Otros ejemplos en SoundFlow:</strong>
          <br><br>
          <code>usuarios</code> ↔ <code>artistas</code>
          (a quiénes sigues: un usuario sigue a varios artistas, y un artista es seguido por miles de usuarios).
          <br><br>
          <code>podcasts</code> ↔ <code>categorias</code>
          (un podcast puede estar en varias categorías a la vez, como "Tecnología" y "Educación", y cada categoría agrupa muchos podcasts distintos).
        </div>
      </div>

    </div>

    <div class="content-box">
      <h4 style="text-align:center;">La tabla puente: cómo se resuelve N:M en SoundFlow</h4>
      <p>
        Retomando el ejemplo de arriba: un <code>usuario</code> le da "me gusta" a muchas <code>canciones</code>,
        y una misma canción recibe "me gusta" de muchos usuarios distintos (como Camilo, Santiago y Valentina).
        Ninguna de las dos tablas puede guardar una FK simple hacia la otra, porque el vínculo no es "uno solo".
        La solución es una tercera tabla intermedia que solo contiene las dos llaves foráneas, una fila por
        cada "me gusta" real:
      </p>
      <svg class="er-diagram" viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style="max-width:680px; display:block; margin:1.2rem auto;">
        <rect x="10" y="20" width="180" height="90" rx="8" fill="#ffffff" stroke="#dde3ea"/>
        <rect x="10" y="20" width="180" height="34" rx="8" fill="#5b7c99"/>
        <rect x="10" y="44" width="180" height="10" fill="#5b7c99"/>
        <text x="22" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700">usuarios</text>
        <text x="22" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="38" y="74" font-family="Consolas, monospace" font-size="11" fill="#a83a3a" font-weight="700">PK  id_usuario</text>
        <text x="22" y="94" font-family="Consolas, monospace" font-size="11" fill="#33404f">nombre</text>

        <rect x="250" y="10" width="180" height="130" rx="8" fill="#ffffff" stroke="#8b7fb8" stroke-width="1.5"/>
        <rect x="250" y="10" width="180" height="34" rx="8" fill="#8b7fb8"/>
        <rect x="250" y="34" width="180" height="10" fill="#8b7fb8"/>
        <text x="256" y="32" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="12.5" font-weight="700">me_gusta</text>
        <text x="262" y="64" font-family="Consolas, monospace" font-size="11" fill="#5b7c99" font-weight="700">FK  id_usuario</text>
        <text x="262" y="84" font-family="Consolas, monospace" font-size="11" fill="#5b7c99" font-weight="700">FK  id_cancion</text>
        <text x="262" y="104" font-family="Consolas, monospace" font-size="11" fill="#33404f">fecha_like</text>

        <rect x="490" y="20" width="180" height="90" rx="8" fill="#ffffff" stroke="#dde3ea"/>
        <rect x="490" y="20" width="180" height="34" rx="8" fill="#5b7c99"/>
        <rect x="490" y="44" width="180" height="10" fill="#5b7c99"/>
        <text x="502" y="42" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700">canciones</text>
        <text x="502" y="74" font-family="Segoe UI, sans-serif" font-size="11" fill="#a83a3a">🔑</text>
        <text x="518" y="74" font-family="Consolas, monospace" font-size="11" fill="#a83a3a" font-weight="700">PK  id_cancion</text>
        <text x="502" y="94" font-family="Consolas, monospace" font-size="11" fill="#33404f">titulo</text>

        <line x1="190" y1="65" x2="250" y2="65" stroke="#5b7c99" stroke-width="2"/>
        <circle cx="190" cy="65" r="4" fill="#5b7c99"/>
        <circle cx="250" cy="65" r="4" fill="#5b7c99"/>
        <text x="200" y="57" font-family="Consolas, monospace" font-size="11" fill="#5b7c99" font-weight="700">1</text>
        <text x="234" y="57" font-family="Consolas, monospace" font-size="11" fill="#5b7c99" font-weight="700">N</text>
        <text x="220" y="83" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" fill="#c44444">&#9829;</text>

        <line x1="430" y1="65" x2="490" y2="65" stroke="#8b7fb8" stroke-width="2"/>
        <circle cx="430" cy="65" r="4" fill="#8b7fb8"/>
        <circle cx="490" cy="65" r="4" fill="#8b7fb8"/>
        <text x="440" y="57" font-family="Consolas, monospace" font-size="11" fill="#8b7fb8" font-weight="700">N</text>
        <text x="474" y="57" font-family="Consolas, monospace" font-size="11" fill="#8b7fb8" font-weight="700">1</text>
        <text x="460" y="83" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" fill="#c44444">&#9829;</text>
      </svg>
      <p style="margin-top:0.6rem;">
        Cada fila de <code>me_gusta</code> representa "este usuario le dio like a esta canción" — Camilo
        aparecería ahí dos veces (una por cada canción), y "Ojos Marrones" también dos veces (una por cada
        usuario que le dio like). Así, una relación N:M en realidad se construye con dos relaciones 1:N
        apoyadas en una tabla intermedia.
      </p>

      <p style="margin-top:1rem; font-size:0.85rem;"><strong>Así se verían los datos reales dentro de <code>me_gusta</code>:</strong></p>
      <div style="overflow-x:auto; display:flex; justify-content:center; margin-top:0.5rem;">
        <table style="border-collapse:collapse; font-family:Consolas, monospace; font-size:0.82rem;">
          <thead>
            <tr>
              <th style="padding:0.5rem 0.9rem; background:#8b7fb8; color:#fff; border:1px solid var(--border);">id_usuario</th>
              <th style="padding:0.5rem 0.9rem; background:#8b7fb8; color:#fff; border:1px solid var(--border);">id_cancion</th>
              <th style="padding:0.5rem 0.9rem; background:#8b7fb8; color:#fff; border:1px solid var(--border);">fecha_like</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">1 (Camilo)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">101 (Ojos Marrones)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2026-08-10</td></tr>
            <tr><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">1 (Camilo)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">102 (Vente Pa' Ca)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2026-08-11</td></tr>
            <tr><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2 (Santiago)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">101 (Ojos Marrones)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2026-08-12</td></tr>
            <tr><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2 (Santiago)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">103 (Luz de Luna)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2026-08-13</td></tr>
            <tr><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">3 (Valentina)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">102 (Vente Pa' Ca)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2026-08-14</td></tr>
            <tr><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">3 (Valentina)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">103 (Luz de Luna)</td><td style="padding:0.4rem 0.9rem; border:1px solid var(--border);">2026-08-15</td></tr>
          </tbody>
        </table>
      </div>
      <p style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:0.5rem;">
        Nota cómo "1 (Camilo)" y "101 (Ojos Marrones)" se repiten en varias filas: eso es justo lo que
        permite representar N:M sin duplicar los datos de usuarios ni de canciones.
      </p>
      <p style="font-size:0.82rem; margin-top:0.6rem;">
        <strong>En conclusión:</strong> lo que se repite en <code>me_gusta</code> es solo el ID (la referencia),
        nunca el registro completo. El nombre de Camilo y el título de la canción siguen viviendo una sola
        vez en <code>usuarios</code> y <code>canciones</code>; la tabla puente solo conecta esos IDs, tantas
        veces como combinaciones reales existan.
      </p>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.6rem 0 0.4rem;">¿Cómo organizamos el proceso, paso a paso?</h4>
    <p>Cada vez que identifiques una relación muchos a muchos, el procedimiento para modelarla es siempre el mismo:</p>

    <div class="numbered-grid" style="margin-top:0.5rem;">
      <div class="numbered-card">
        <div class="num" style="color:var(--accent);">1. Identifica las dos entidades</div>
        <p>Confirma que de verdad son N:M: ¿un usuario le da "me gusta" a varias canciones Y una canción recibe "me gusta" de varios usuarios? Si la respuesta a ambas es sí, es N:M.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#8b7fb8;">2. Crea la tabla puente</div>
        <p>Nace una tercera tabla (aquí <code>me_gusta</code>) que no representa una entidad nueva, sino la combinación de las otras dos.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#7fa5a3;">3. Agrega las dos FK</div>
        <p>La tabla puente lleva una FK hacia cada tabla original: <code>id_usuario</code> y <code>id_cancion</code>, cada una con <code>ON DELETE CASCADE</code> o <code>RESTRICT</code> según el caso.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#c44444;">4. Define la llave primaria</div>
        <p>Lo más común es usar una <strong>llave primaria compuesta</strong>: la combinación (<code>id_usuario</code>, <code>id_cancion</code>) que impide que el mismo usuario le dé "me gusta" dos veces a la misma canción.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#c99a4e;">5. Suma atributos propios</div>
        <p>Si la relación en sí tiene datos (como <code>fecha_like</code>), van en la tabla puente, no en ninguna de las dos tablas originales.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#4f7876;">6. Ya puedes consultarla</div>
        <p>Con un <code>JOIN</code> entre las tres tablas puedes responder preguntas como "¿qué canciones le gustan a Camilo?" o "¿a cuántos usuarios les gusta 'Ojos Marrones'?".</p>
      </div>
    </div>

    <div class="code-block" style="margin-top:1rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">02_tabla_puente.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>CREATE TABLE canciones (
  id_cancion INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL
);

-- Tabla puente: resuelve la relación N:M entre usuarios y canciones
CREATE TABLE me_gusta (
  id_usuario INT NOT NULL,
  id_cancion INT NOT NULL,
  fecha_like TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, id_cancion),
  CONSTRAINT fk_mg_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE,
  CONSTRAINT fk_mg_cancion
    FOREIGN KEY (id_cancion) REFERENCES canciones(id_cancion)
    ON DELETE CASCADE
);</code></pre>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem; text-align:center;">Tipos de datos más comunes</h4>
    <p class="objetivos" style="font-size:0.85rem;">Toca cada tarjeta para ver un ejemplo aplicado a SoundFlow.</p>
    <div class="numbered-grid">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front numbered-card"><div class="num">INT</div><p>Números enteros.<span class="flip-hint">Toca para ver el ejemplo &rarr;</span></p></div>
          <div class="flip-card-back"><p><strong>SoundFlow:</strong> id_usuario = 1, 2, 3... Ideal para identificadores y contadores.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front numbered-card"><div class="num">VARCHAR(n)</div><p>Texto de longitud variable.<span class="flip-hint">Toca para ver el ejemplo &rarr;</span></p></div>
          <div class="flip-card-back"><p><strong>SoundFlow:</strong> email VARCHAR(150), password_hash VARCHAR(256) para que quepa la firma SHA-256.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front numbered-card"><div class="num">DECIMAL(p,s)</div><p>Números exactos para dinero.<span class="flip-hint">Toca para ver el ejemplo &rarr;</span></p></div>
          <div class="flip-card-back"><p><strong>SoundFlow:</strong> monto DECIMAL(10,2) = 9.99, exacto.<br><strong>FLOAT</strong> es más impreciso (aproxima en binario), por eso no se usa para dinero.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front numbered-card"><div class="num">DATETIME / TIMESTAMP</div><p>Fechas y horas.<span class="flip-hint">Toca para ver el ejemplo &rarr;</span></p></div>
          <div class="flip-card-back"><p><strong>SoundFlow:</strong> fecha_crea TIMESTAMP guarda automáticamente el momento en que se registró el usuario.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front numbered-card"><div class="num">TINYINT</div><p>Números muy pequeños (0 o 1).<span class="flip-hint">Toca para ver el ejemplo &rarr;</span></p></div>
          <div class="flip-card-back"><p><strong>SoundFlow:</strong> esta_activo = 1 (activo) o 0 (Soft Delete). Es la bandera booleana del Soft Delete.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front numbered-card"><div class="num">BOOLEAN</div><p>Verdadero o falso.<span class="flip-hint">Toca para ver el ejemplo &rarr;</span></p></div>
          <div class="flip-card-back"><p><strong>SoundFlow:</strong> acepta_terminos = TRUE. En MySQL, <code>BOOLEAN</code> no es un tipo nuevo: es solo un alias de <code>TINYINT(1)</code>.</p></div>
        </div>
      </div>
    </div>

    <div class="quiz-box">
      <h4 style="margin:0 0 0.8rem; color:var(--text); font-size:0.95rem;">Quiz rápido de autoevaluación</h4>

      <div class="quiz-question">
        <p>1. ¿Qué identifica de forma única cada fila de una tabla?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Foreign Key</button>
          <button type="button" class="quiz-option" data-correct="true">Primary Key</button>
          <button type="button" class="quiz-option" data-correct="false">VARCHAR</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Qué tipo de dato usarías para guardar el precio de una suscripción?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">INT</button>
          <button type="button" class="quiz-option" data-correct="true">DECIMAL</button>
          <button type="button" class="quiz-option" data-correct="false">TINYINT</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. Si los datos desaparecen al apagar el computador, ¿dónde estaban viviendo?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">En disco</button>
          <button type="button" class="quiz-option" data-correct="true">En RAM</button>
          <button type="button" class="quiz-option" data-correct="false">En la nube</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. Un artista sube muchas canciones, pero cada canción tiene un solo artista dueño. ¿Qué tipo de relación es?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Uno a uno (1:1)</button>
          <button type="button" class="quiz-option" data-correct="true">Uno a muchos (1:N)</button>
          <button type="button" class="quiz-option" data-correct="false">Muchos a muchos (N:M)</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. Para resolver una relación muchos a muchos (N:M) en SQL, ¿qué necesitas crear?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Una columna extra en cada tabla</button>
          <button type="button" class="quiz-option" data-correct="true">Una tabla puente</button>
          <button type="button" class="quiz-option" data-correct="false">Un índice UNIQUE</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem;">Crear la base de datos y las tablas</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">01_crear_base_datos.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>CREATE DATABASE soundflow_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE soundflow_db;

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(256) NOT NULL,
  esta_activo TINYINT NOT NULL DEFAULT 1,
  fecha_crea TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pagos_suscripcion (
  id_pago INT AUTO_INCREMENT PRIMARY KEY,
  monto DECIMAL(10,2) NOT NULL,
  fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT NOT NULL,
  CONSTRAINT fk_pago_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
    ON DELETE RESTRICT
);</code></pre>
    </div>

    <div class="content-box">
      <h4>¿Qué significa <code>utf8mb4_0900_ai_ci</code>?</h4>
      <p>Esa línea define cómo MySQL guarda y compara el texto. Se lee en 4 partes:</p>
      <div class="numbered-grid" style="margin-top:0.8rem;">
        <div class="numbered-card">
          <div class="num" style="color:var(--accent);">utf8mb4</div>
          <p>El conjunto de caracteres. Soporta hasta 4 bytes por carácter, lo que permite guardar cualquier idioma, símbolos y emojis.</p>
        </div>
        <div class="numbered-card">
          <div class="num" style="color:#7fa5a3;">0900</div>
          <p>La versión del algoritmo de comparación Unicode (Unicode Collation Algorithm 9.0.0), nativo desde MySQL 8.0.</p>
        </div>
        <div class="numbered-card">
          <div class="num" style="color:#8b7fb8;">ai</div>
          <p><strong>Accent Insensitive</strong> (insensible a acentos): "a" y "á" se consideran iguales al buscar o comparar.</p>
        </div>
        <div class="numbered-card">
          <div class="num" style="color:#c99a4e;">ci</div>
          <p><strong>Case Insensitive</strong> (insensible a mayúsculas): "A" y "a" se consideran equivalentes.</p>
        </div>
      </div>
      <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.8rem;">
        En la práctica: gracias a <code>ai_ci</code>, buscar "camilo" también encuentra "Camilo" o "Camiló"
        sin que el usuario tenga que escribir el acento o la mayúscula exacta.
      </p>
    </div>
  </div>

  <!-- ===================== ACTIVIDADES DE LA SEMANA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Actividades de la semana</h3>
    </div>
    <ul class="activity-list">
      <li class="activity-item">
        <span class="activity-name">Foro: ¿Sabe Spotify demasiado sobre nosotros?</span>
        <span class="pill pill-individual">Individual</span>
        <span class="pill pill-entrega">Entregable · 5%</span>
      </li>
      <li class="activity-item">
        <span class="activity-name">Actividad 1: Preparando el entorno de trabajo (MySQL Server y Workbench)</span>
        <span class="pill pill-individual">Individual</span>
        <span class="pill pill-suma">Suma en la estación</span>
      </li>
      <li class="activity-item">
        <span class="activity-name">Actividad 2: Base de datos para SoundFlow</span>
        <span class="pill pill-grupal">Grupal</span>
        <span class="pill pill-suma">Suma en la estación</span>
      </li>
      <li class="activity-item">
        <span class="activity-name">Actividad 3: Operaciones CRUD</span>
        <span class="pill pill-grupal">Grupal</span>
        <span class="pill pill-entrega">Entregable · 5%</span>
      </li>
    </ul>

    <p style="font-size:0.82rem; color:var(--text-dim); margin-top:0.6rem;">
      <strong>Nota sobre la Actividad 1:</strong> MySQL Workbench es opcional, solo una interfaz gráfica.
      Lo único obligatorio es instalar el <strong>MySQL Server</strong> (el motor). Si no quieres instalar
      Workbench, puedes trabajar con el cliente de línea de comandos que ya viene incluido, o con
      alternativas gratuitas como DBeaver, HeidiSQL o la extensión de MySQL para VS Code.
    </p>
  </div>

  <!-- ===================== 6. RECURSOS Y REFERENCIAS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>6. Recursos y referencias</h3>
    </div>
    <div class="content-box">
      <h4>Para profundizar</h4>
      <p style="margin-bottom:0.6rem;">
        W3Schools. (2026). <em>SQL Tutorial</em>.
        <a href="https://www.w3schools.com/sql/" target="_blank" rel="noopener">w3schools.com/sql</a>
        — referencia rápida de sintaxis SQL, tipos de datos y ejemplos interactivos.
      </p>
      <p style="margin:0;">
        Amazon Web Services. (2025). <em>Netflix consolida su infraestructura de bases de datos relacionales en Amazon Aurora</em>.
        <a href="https://aws.amazon.com/blogs/database/netflix-consolidates-relational-database-infrastructure-on-amazon-aurora-achieving-up-to-75-improved-performance/" target="_blank" rel="noopener">aws.amazon.com/blogs/database</a>
      </p>
      <p style="margin:0.6rem 0 0;">
        Spotify Engineering. (2015). <em>Personalization at Spotify using Cassandra</em>.
        <a href="https://engineering.atspotify.com/2015/01/personalization-at-spotify-using-cassandra" target="_blank" rel="noopener">engineering.atspotify.com</a>
      </p>
      <p style="margin:0.6rem 0 0;">
        CoderRed Corp. (2023). <em>Guide to MySQL Charsets & Collations</em>.
        <a href="https://www.coderedcorp.com/blog/guide-to-mysql-charsets-collations/" target="_blank" rel="noopener">coderedcorp.com/blog</a>
        — explica <code>utf8mb4</code> y las reglas de comparación (<code>collation</code>).
      </p>
    </div>
  </div>

`;

window.WEEK_CONTENT_1_2 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow: encriptación, Soft Delete y CRUD</h2>

  <!-- ===================== 1. DDL, DML Y DCL ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>1. Los 3 lenguajes dentro de SQL: DDL, DML y DCL</h3>
    </div>
    <p>
      "SQL" no es un solo bloque de comandos: se divide en tres sublenguajes según <strong>qué tipo de
      operación</strong> hacen sobre la base de datos. Ya usaste los dos primeros sin que los nombráramos
      todavía — hoy les ponemos nombre y entendemos por qué existe la división.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(3, 1fr); margin-top:0.8rem;">
      <div class="concept-card" style="border:1px solid #5b7c99; border-radius:10px;">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="10" x2="9" y2="20"/></svg>
        </div>
        <h4>DDL</h4>
        <p style="font-size:0.78rem; color:var(--text-dim); margin:-0.2rem 0 0.5rem;">Data Definition Language</p>
        <p>Define y modifica la <strong>estructura</strong>: las tablas, sus columnas y sus tipos de dato. Comandos: <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">Ya lo usaste en la Clase 1, cuando creamos <code>usuarios</code> y <code>pagos_suscripcion</code> con <code>CREATE TABLE</code>.</p>
      </div>
      <div class="concept-card" style="border:1px solid #7fa5a3; border-radius:10px;">
        <div class="summary-icon" style="background:rgba(127,165,163,0.18); color:#7fa5a3;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>
        </div>
        <h4>DML</h4>
        <p style="font-size:0.78rem; color:var(--text-dim); margin:-0.2rem 0 0.5rem;">Data Manipulation Language</p>
        <p>Manipula los <strong>datos</strong> que viven dentro de las tablas ya creadas. Comandos: <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> — es decir, CRUD.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">Es el tema central de hoy: lo vemos a fondo más abajo, en la sección 3.</p>
      </div>
      <div class="concept-card" style="border:1px solid #8b7fb8; border-radius:10px;">
        <div class="summary-icon" style="background:rgba(139,127,184,0.18); color:#8b7fb8;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
        </div>
        <h4>DCL</h4>
        <p style="font-size:0.78rem; color:var(--text-dim); margin:-0.2rem 0 0.5rem;">Data Control Language</p>
        <p>Controla <strong>quién puede hacer qué</strong>: otorga o quita permisos sobre tablas y bases de datos. Comandos: <code>GRANT</code>, <code>REVOKE</code>.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">Todavía no lo usamos — lo veremos a fondo en la Semana 7, junto con seguridad y despliegue en la nube.</p>
      </div>
    </div>

    <div class="content-box">
      <p style="margin:0;">
        Piénsalo como los tres roles de una obra: <strong>DDL</strong> construye el escenario (las tablas),
        <strong>DML</strong> es la actuación que pasa sobre ese escenario (leer, agregar, cambiar y borrar
        datos), y <strong>DCL</strong> decide quién tiene permiso de entrar a cada parte del teatro.
        Los tres son SQL, pero cada uno resuelve un problema distinto.
      </p>
    </div>
  </div>

  <!-- ===================== 2. ENCRIPTACIÓN SHA-256 ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>2. Encriptación: cómo funciona SHA-256</h3>
    </div>
    <p>
      Cuando Camilo crea su cuenta en SoundFlow y escribe su contraseña, esa contraseña nunca se guarda tal
      cual en la base de datos. Se le aplica <strong>SHA-256</strong>, un algoritmo de <em>hash</em> que la
      convierte en una cadena de 64 caracteres fija e irrepetible: su "firma". Este proceso tiene tres
      propiedades clave:
    </p>
    <div class="numbered-grid" style="margin-top:0.8rem;">
      <div class="numbered-card">
        <div class="num" style="color:var(--accent);">1. Es de un solo sentido</div>
        <p>Puedes convertir "Rock2026*" en su hash, pero es computacionalmente inviable ir del hash de vuelta a la contraseña original.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#7fa5a3;">2. Es determinista</div>
        <p>La misma contraseña siempre produce exactamente el mismo hash — por eso sirve para comparar sin guardar el original.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#8b7fb8;">3. Efecto avalancha</div>
        <p>Cambiar un solo carácter de la contraseña produce un hash completamente distinto, sin ningún parecido con el anterior.</p>
      </div>
    </div>

    <div class="content-box">
      <h4>Efecto avalancha en acción</h4>
      <p style="margin-bottom:0.6rem;">Estos son hashes SHA-256 reales, calculados a partir de dos contraseñas casi idénticas (solo cambia "2026" por "2027"):</p>
      <div style="overflow-x:auto;">
        <table style="border-collapse:collapse; width:100%; font-family:Consolas, monospace; font-size:0.78rem;">
          <thead>
            <tr>
              <th style="text-align:left; padding:0.4rem 0.6rem; border-bottom:2px solid var(--border); color:var(--text-dim); font-family:Segoe UI, sans-serif;">Contraseña</th>
              <th style="text-align:left; padding:0.4rem 0.6rem; border-bottom:2px solid var(--border); color:var(--text-dim); font-family:Segoe UI, sans-serif;">Hash SHA-256</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:0.5rem 0.6rem; border-bottom:1px solid var(--border);">Rock2026*</td>
              <td style="padding:0.5rem 0.6rem; border-bottom:1px solid var(--border); word-break:break-all; color:#5b7c99;">340291a915ea899e7db89cb45a2f166a8713abebc5885b249dad95dc8c1ac153</td>
            </tr>
            <tr>
              <td style="padding:0.5rem 0.6rem;">Rock2027*</td>
              <td style="padding:0.5rem 0.6rem; word-break:break-all; color:#c44444;">108e28a99cce855b1064e2ce4fd9378234b2305d654ab6a8b5839fd98e67deda</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">
        Un solo carácter distinto (2026 → 2027) y el hash resultante no tiene absolutamente nada en común
        con el anterior. Así es imposible adivinar la contraseña original a partir de pistas del hash.
      </p>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem;">¿Cómo se verifica el login, si no se puede "desencriptar"?</h4>
    <div class="numbered-grid">
      <div class="numbered-card">
        <div class="num" style="color:var(--accent);">1. Usuario escribe su clave</div>
        <p>Camilo escribe "Rock2026*" en el formulario de inicio de sesión.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#7fa5a3;">2. SoundFlow la vuelve a hashear</div>
        <p>La aplicación aplica SHA-256 a lo que Camilo escribió, en el momento, sin guardar nada.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#8b7fb8;">3. Compara los dos hashes</div>
        <p>Si el hash recién calculado coincide con el que está guardado en <code>password_hash</code>, el acceso es correcto.</p>
      </div>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem;">SHA2() en MySQL</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">03_sha256.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Guardar un usuario con la contraseña ya encriptada
INSERT INTO usuarios (nombre, email, password_hash)
VALUES ('Camilo Restrepo', 'camilo@flow.com', SHA2('Rock2026*', 256));

-- Verificar el login: compara el hash de lo escrito contra el guardado
SELECT * FROM usuarios
WHERE email = 'camilo@flow.com'
  AND password_hash = SHA2('Rock2026*', 256);</code></pre>
    </div>
  </div>

  <!-- ===================== 2. SOFT DELETE ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>3. Soft Delete: borrar sin borrar</h3>
    </div>
    <p>
      Cuando un usuario "elimina" su cuenta en SoundFlow, lo intuitivo sería usar <code>DELETE</code> y
      borrar la fila de la base de datos. Pero en la práctica, casi ninguna plataforma real hace esto.
      En su lugar usan <strong>Soft Delete</strong>: marcar el registro como inactivo, sin borrarlo de verdad.
    </p>

    <div class="concept-grid" style="grid-template-columns: repeat(2, 1fr); margin-top:0.8rem;">
      <div class="concept-card" style="border:1px solid #c44444; border-radius:10px;">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </div>
        <h4>Hard Delete (<code>DELETE</code>)</h4>
        <p>Borra la fila para siempre. Se pierde el historial, se rompen las FK que apunten a ella, y no hay forma de recuperarla.</p>
      </div>
      <div class="concept-card" style="border:1px solid #7fa5a3; border-radius:10px;">
        <div class="summary-icon" style="background:rgba(127,165,163,0.15); color:#7fa5a3;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </div>
        <h4>Soft Delete (<code>UPDATE</code>)</h4>
        <p>Cambia <code>esta_activo</code> a 0. La fila sigue ahí: se puede reactivar, auditar, y no rompe ninguna FK.</p>
      </div>
    </div>

    <div class="content-box">
      <h4>¿Por qué SoundFlow prefiere Soft Delete?</h4>
      <p>
        Recuerda que <code>pagos_suscripcion</code> tiene una FK hacia <code>usuarios</code> con
        <code>ON DELETE RESTRICT</code>. Si intentas un <code>DELETE</code> físico sobre un usuario con
        pagos registrados, MySQL <strong>bloquea la operación</strong> — y eso es justo lo que queremos:
        proteger la contabilidad. El Soft Delete logra el mismo resultado para el usuario final (su cuenta
        deja de estar activa) sin arriesgar la integridad de los datos financieros ni el historial.
      </p>
    </div>

    <div class="code-block" style="margin-top:1rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">04_soft_delete.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- "Eliminar" a un usuario sin borrarlo de verdad
UPDATE usuarios SET esta_activo = 0 WHERE id_usuario = 3;

-- Las consultas normales de la app solo muestran usuarios activos
SELECT id_usuario, nombre, email FROM usuarios WHERE esta_activo = 1;

-- Reactivar una cuenta es tan simple como volver a cambiar la bandera
UPDATE usuarios SET esta_activo = 1 WHERE id_usuario = 3;</code></pre>
    </div>
  </div>

  <!-- ===================== 4. EL LENGUAJE SQL ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>4. El lenguaje SQL</h3>
    </div>
    <p>
      Antes de escribir más comandos, vale la pena entender qué tipo de lenguaje es SQL y cómo está
      construida una instrucción, porque eso explica por qué se escribe como se escribe.
    </p>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.2rem 0 0.4rem;">SELECT, FROM y WHERE</h4>
    <p>Estas tres palabras son las más usadas en todo SQL, y cada una responde una pregunta distinta:</p>

    <div class="concept-grid" style="grid-template-columns: repeat(3, 1fr); margin-top:0.6rem;">
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>
        </div>
        <h4>SELECT</h4>
        <p><strong>¿Qué columnas quiero ver?</strong> Después de <code>SELECT</code> escribes los nombres de las columnas, separadas por comas. <code>*</code> significa "todas".</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(127,165,163,0.18); color:#7fa5a3;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="13" rx="1"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
        </div>
        <h4>FROM</h4>
        <p><strong>¿De qué tabla vienen esos datos?</strong> Después de <code>FROM</code> va el nombre de la tabla donde SQL debe buscar.</p>
      </div>
      <div class="concept-card">
        <div class="summary-icon" style="background:rgba(139,127,184,0.18); color:#8b7fb8;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
        </div>
        <h4>WHERE</h4>
        <p><strong>¿Cuáles filas, específicamente?</strong> Después de <code>WHERE</code> va la condición que filtra: solo las filas que la cumplan aparecen en el resultado.</p>
      </div>
    </div>

    <div class="content-box">
      <p style="margin:0;">
        Juntando las tres: <code>SELECT nombre FROM usuarios WHERE esta_activo = 1;</code> se lee de
        corrido como una frase: "de la tabla <strong>usuarios</strong>, muéstrame la columna
        <strong>nombre</strong>, pero solo de las filas donde <strong>esta_activo sea 1</strong>".
      </p>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem;">Anatomía de una instrucción SQL</h4>
    <p>Toda instrucción SQL se arma con las mismas piezas básicas. Toca cada tarjeta para resaltar esa pieza en el ejemplo de abajo:</p>

    <div class="content-box" style="margin-top:0.8rem;">
      <pre style="margin:0; overflow-x:auto;"><code id="anatomiaDemo"><span class="anat-kw">SELECT</span> <span class="anat-ident">nombre</span> <span class="anat-kw">FROM</span> <span class="anat-ident">usuarios</span> <span class="anat-kw">WHERE</span> <span class="anat-ident">esta_activo</span> = <span class="anat-val">1</span><span class="anat-semi">;</span></code></pre>
    </div>

    <div class="numbered-grid numbered-grid-2col" style="margin-top:0.8rem;">
      <div class="numbered-card" data-highlight="palabras" data-highlight-target="anatomiaDemo" style="cursor:pointer;">
        <div class="num" style="color:var(--accent);"><span class="color-dot" style="background:var(--accent);"></span>Palabras clave</div>
        <p><code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>... Por convención se escriben en MAYÚSCULAS, aunque SQL no distingue mayúsculas de minúsculas en ellas.</p>
      </div>
      <div class="numbered-card" data-highlight="identificadores" data-highlight-target="anatomiaDemo" style="cursor:pointer;">
        <div class="num" style="color:#7fa5a3;"><span class="color-dot" style="background:#7fa5a3;"></span>Identificadores</div>
        <p>Nombres de tablas y columnas, como <code>usuarios</code> o <code>id_usuario</code>. Por convención se escriben en minúsculas con guiones bajos (<em>snake_case</em>).</p>
      </div>
      <div class="numbered-card" data-highlight="valores" data-highlight-target="anatomiaDemo" style="cursor:pointer;">
        <div class="num" style="color:#8b7fb8;"><span class="color-dot" style="background:#8b7fb8;"></span>Valores</div>
        <p>Los datos concretos: los textos van entre comillas simples (<code>'Camilo'</code>), los números no (<code>9.99</code>).</p>
      </div>
      <div class="numbered-card" data-highlight="punto" data-highlight-target="anatomiaDemo" style="cursor:pointer;">
        <div class="num" style="color:#c99a4e;"><span class="color-dot" style="background:#c99a4e;"></span>Punto y coma</div>
        <p>Cada instrucción termina en <code>;</code>. Marca dónde acaba un comando SQL, especialmente cuando escribes varios seguidos.</p>
      </div>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem;">Comentarios en SQL</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">05_comentarios.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Esto es un comentario de una sola línea

/* Esto es un comentario
   de varias líneas */

SELECT nombre, email
FROM usuarios          -- también puedes comentar al final de una línea
WHERE esta_activo = 1;</code></pre>
    </div>
  </div>

  <!-- ===================== 5. OPERACIONES CRUD ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>5. Operaciones CRUD</h3>
    </div>
    <p><strong>CRUD</strong> son las cuatro operaciones básicas que cualquier aplicación hace sobre una base de datos: Crear, Leer, Actualizar y Borrar. Cada una tiene su propio comando SQL:</p>

    <div class="concept-grid" style="grid-template-columns: 1fr; margin-top:0.8rem;">
      <div class="concept-card" style="border-left:3px solid #5b7c99;">
        <div class="summary-icon" style="background:rgba(91,124,153,0.15); color:#5b7c99;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <h4>Create</h4>
        <p><code>INSERT INTO</code> — agrega una fila nueva.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">
          Plantilla: <code>INSERT INTO tabla (columnas) VALUES (valores);</code><br>
          Después de <code>INSERT INTO</code> va el nombre de la tabla; entre paréntesis, las columnas
          que vas a llenar; después de <code>VALUES</code>, los valores en el mismo orden.
        </p>
        <div class="sql-console">
          <pre><code><span class="sql-kw">INSERT INTO</span> <span class="sql-ident">usuarios</span> (<span class="sql-ident">nombre</span>, <span class="sql-ident">email</span>)
<span class="sql-kw">VALUES</span> (<span class="sql-str">'Valentina Gómez'</span>, <span class="sql-str">'valentina@flow.com'</span>);</code></pre>
        </div>
      </div>
      <div class="concept-card" style="border-left:3px solid #7fa5a3;">
        <div class="summary-icon" style="background:rgba(127,165,163,0.18); color:#7fa5a3;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <h4>Read</h4>
        <p><code>SELECT</code> — consulta filas existentes.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">
          Plantilla: <code>SELECT columnas FROM tabla WHERE condición;</code><br>
          Ya vimos esta arriba: qué columnas quieres, de qué tabla, y con qué filtro.
        </p>
        <div class="sql-console">
          <pre><code><span class="sql-kw">SELECT</span> <span class="sql-ident">nombre</span>, <span class="sql-ident">email</span> <span class="sql-kw">FROM</span> <span class="sql-ident">usuarios</span>
<span class="sql-kw">WHERE</span> <span class="sql-ident">id_usuario</span> = <span class="sql-num">1</span>;</code></pre>
        </div>
      </div>
      <div class="concept-card" style="border-left:3px solid #8b7fb8;">
        <div class="summary-icon" style="background:rgba(139,127,184,0.18); color:#8b7fb8;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>
        </div>
        <h4>Update</h4>
        <p><code>UPDATE</code> — modifica una fila existente.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">
          Plantilla: <code>UPDATE tabla SET columna = nuevo_valor WHERE condición;</code><br>
          <code>SET</code> indica qué columna cambia y a qué valor. El <code>WHERE</code> es clave: sin
          él, se actualizarían <strong>todas</strong> las filas de la tabla.
        </p>
        <div class="sql-console">
          <pre><code><span class="sql-kw">UPDATE</span> <span class="sql-ident">usuarios</span> <span class="sql-kw">SET</span> <span class="sql-ident">esta_activo</span> = <span class="sql-num">0</span>
<span class="sql-kw">WHERE</span> <span class="sql-ident">id_usuario</span> = <span class="sql-num">1</span>;</code></pre>
        </div>
      </div>
      <div class="concept-card" style="border-left:3px solid #c44444;">
        <div class="summary-icon" style="background:rgba(196,68,68,0.12); color:#c44444;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
        </div>
        <h4>Delete</h4>
        <p><code>DELETE</code> — borra una fila. En SoundFlow, casi siempre se reemplaza por Soft Delete.</p>
        <p style="font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem;">
          Plantilla: <code>DELETE FROM tabla WHERE condición;</code><br>
          Igual que en <code>UPDATE</code>, sin <code>WHERE</code> borrarías todas las filas de la tabla.
        </p>
        <div class="sql-console">
          <pre><code><span class="sql-kw">DELETE FROM</span> <span class="sql-ident">usuarios</span>
<span class="sql-kw">WHERE</span> <span class="sql-ident">id_usuario</span> = <span class="sql-num">5</span>;</code></pre>
        </div>
      </div>
    </div>

    <div class="quiz-box">
      <h4 style="margin:0 0 0.8rem; color:var(--text); font-size:0.95rem;">Quiz rápido de autoevaluación</h4>

      <div class="quiz-question">
        <p>1. Si cambias un solo carácter de una contraseña antes de aplicar SHA-256, ¿qué pasa con el hash resultante?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Cambia solo ese carácter en el hash</button>
          <button type="button" class="quiz-option" data-correct="true">Es completamente distinto</button>
          <button type="button" class="quiz-option" data-correct="false">No cambia nada</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Por qué SoundFlow prefiere Soft Delete en vez de DELETE para los usuarios?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque DELETE no existe en MySQL</button>
          <button type="button" class="quiz-option" data-correct="true">Para no romper el historial de pagos ni las FK</button>
          <button type="button" class="quiz-option" data-correct="false">Porque es más rápido que DELETE</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Qué comando SQL corresponde a la "U" de CRUD?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">SELECT</button>
          <button type="button" class="quiz-option" data-correct="true">UPDATE</button>
          <button type="button" class="quiz-option" data-correct="false">INSERT</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Cuál de estos comandos es DDL (Data Definition Language)?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">CREATE TABLE</button>
          <button type="button" class="quiz-option" data-correct="false">INSERT INTO</button>
          <button type="button" class="quiz-option" data-correct="false">SELECT</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. En <code>SELECT nombre FROM usuarios WHERE esta_activo = 1;</code>, ¿qué determina la cláusula <code>WHERE</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Qué columnas se muestran</button>
          <button type="button" class="quiz-option" data-correct="false">De qué tabla vienen los datos</button>
          <button type="button" class="quiz-option" data-correct="true">Cuáles filas aparecen en el resultado</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. Si ejecutas <code>DELETE FROM usuarios;</code> sin <code>WHERE</code>, ¿qué pasa?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Borra solo la primera fila</button>
          <button type="button" class="quiz-option" data-correct="true">Borra todas las filas de la tabla</button>
          <button type="button" class="quiz-option" data-correct="false">Da error de sintaxis</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>
    </div>

    <h4 style="color:var(--text); font-size:0.95rem; margin:1.4rem 0 0.4rem; text-align:center;">Actividad 3: CRUD completo</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">02_crud_completo.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- CREATE: SHA2 convierte la contraseña en un hash de un solo sentido
INSERT INTO usuarios (nombre, email, password_hash)
VALUES
  ('Camilo Restrepo', 'camilo@flow.com', SHA2('Rock2026*', 256)),
  ('Santiago Marin', 'santiago@flow.com', SHA2('Superpass!45', 256));

INSERT INTO pagos_suscripcion (monto, usuario_id) VALUES (9.99, 1), (9.99, 1);

-- READ: búsqueda indexada por la PK
SELECT id_usuario, nombre, email FROM usuarios WHERE id_usuario = 1;
SELECT * FROM usuarios WHERE esta_activo = 1;

-- UPDATE: Soft Delete (se desactiva, no se borra)
UPDATE usuarios SET esta_activo = 0 WHERE id_usuario = 1;
SELECT nombre, esta_activo FROM usuarios;

-- DELETE: intento de borrado físico de un usuario con pagos
DELETE FROM usuarios WHERE id_usuario = 1;
-- Resultado esperado: MySQL bloquea la operación (FK constraint fails).
-- Este error es un EXITO de diseño: protege la contabilidad de SoundFlow.</code></pre>
    </div>
  </div>

`;
