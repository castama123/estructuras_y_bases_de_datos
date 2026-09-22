// Contenido enriquecido de la Semana 6: Clase 1 = introducción a fondo (historia, terminología,
// simulación) + Actividad 1 oficial ("Bases de datos vectoriales Supabase y Embeddings"), la
// construcción real de SoundFlow-AI paso a paso.
// Sigue el mismo patrón que semana-01.js ... semana-05.js:
// variables globales window.WEEK_CONTENT_6_1 (y _2 cuando exista), leídas por semana.html.

window.WEEK_CONTENT_6_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow-AI: cuando buscar por significado le gana a buscar por palabras</h2>

  <p style="margin-top:0;">Antes de entrar en materia, un video corto para ubicarte en el tema:</p>
  <a href="https://www.youtube.com/watch?v=NxvuhoXDAZ8" target="_blank" rel="noopener" style="display:block; max-width:360px; margin:0.6rem auto 1.4rem; border-radius:10px; overflow:hidden; border:1px solid var(--border); text-decoration:none; position:relative;">
    <img src="https://img.youtube.com/vi/NxvuhoXDAZ8/hqdefault.jpg" alt="Descubre Las Bases de Datos VECTORIALES" style="display:block; width:100%; height:auto;">
    <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25);">
      <span style="width:64px; height:64px; border-radius:50%; background:rgba(91,124,153,0.9); display:flex; align-items:center; justify-content:center;">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
      </span>
    </span>
    <span style="display:block; padding:0.6rem 0.8rem; background:#111; color:#fff; font-size:0.85rem;">Descubre Las Bases de Datos VECTORIALES. Ver en YouTube</span>
  </a>
  <p style="margin-top:-0.8rem; margin-bottom:1.4rem; font-size:0.78rem; color:var(--text-dim); text-align:center;">Aprender Big Data. Descubre Las Bases de Datos VECTORIALES [Video]. YouTube.</p>

  <!-- ===================== 1. POR QUÉ EXISTEN ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>¿Por qué existen las bases de datos vectoriales?</h3>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0;">
        Imagina a un usuario de SoundFlow un martes gris, con la lluvia golpeando la ventana. Abre la app y
        escribe en el buscador: <strong>"música para un día lluvioso"</strong>. En el catálogo hay una
        canción guardada con esta descripción: <em>"una melodía de piano muy lenta y triste que transmite
        soledad, perfecta para un día de nostalgia en casa"</em>. Ningún ser humano dudaría: el piano lento,
        la soledad y la nostalgia encajan perfecto con ese ánimo lluvioso. Es exactamente la canción que
        ese usuario está buscando, aunque ninguna de las dos frases comparta una sola palabra con la otra.
        Para una persona, esa canción es una respuesta obvia. Para una consulta SQL tradicional, son dos
        textos completamente distintos, sin ninguna relación.
      </p>
    </div>
    <div class="content-box" style="border-left:4px solid #b33a2e; margin-top:0.8rem;">
      <p style="margin:0;">
        <code>SELECT * FROM tbl_canciones WHERE descripcion LIKE '%lluvia%'</code>, cero resultados. La
        palabra "lluvia" nunca aparece en "melodía triste que transmite soledad", aunque cualquier persona
        sabe que esa canción encaja perfecto con un día lluvioso.
      </p>
    </div>
    <p>
      Esta necesidad, comparar <strong>significado</strong> en vez de texto literal, es exactamente el
      problema que las bases de datos vectoriales y los embeddings nacieron para resolver. No es una moda
      pasajera: es el resultado de más de una década de investigación en inteligencia artificial que, en los
      últimos años, se volvió accesible para cualquier desarrollador.
    </p>
    <h4 style="color:var(--accent); font-size:1.1rem; margin:1.4rem 0 0.6rem; padding-bottom:0.4rem; border-bottom:2px solid var(--accent-soft);">¿Qué es, entonces, una base de datos vectorial?</h4>
    <p>
      Es una base de datos, o una extensión de una que ya conoces, como MongoDB, Redis o PostgreSQL, diseñada para guardar
      <strong>vectores</strong> (los embeddings) y responder un tipo de pregunta distinto al que
      normalmente maneja. En vez de <em style="color:#b33a2e;">"dame las filas o documentos donde tal campo sea exactamente igual a
      X"</em>, la pregunta ahora es <em style="color:#b33a2e;">"dame los vectores más parecidos a este otro"</em>, lo que se
      conoce como búsqueda de <strong>vecinos más cercanos</strong>. Por debajo, sigue siendo la misma base
      de datos que ya conocías (relacional, documental o clave-valor), solo que ahora uno de sus campos es
      una lista de números, y existe una forma de comparar "qué tan parecidas" son dos de esas listas
      entre sí.
    </p>
    <p>
      También existen bases de datos vectoriales <strong>especializadas</strong>, construidas desde cero
      solo para esto (sin tablas relacionales ni documentos, como viste antes). Algunas de las más usadas
      hoy:
    </p>
    <ul style="margin:0.4rem 0 0; padding-left:1.2rem; color:var(--text);">
      <li><strong>Pinecone</strong>, <strong>Milvus</strong> y <strong>Weaviate</strong>, que ya conoces de la línea de tiempo.</li>
      <li><strong>Chroma</strong>, pensada para prototipos y proyectos pequeños de IA.</li>
      <li><strong>Qdrant</strong>, fácil de instalar tú mismo, muy usada por su buen desempeño.</li>
      <li><strong>LanceDB</strong>, pensada para correr localmente, sin necesidad de un servidor aparte.</li>
    </ul>
  </div>

  <!-- ===================== 1B. FUNCIONALIDADES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Funcionalidades principales</h3>
    </div>
    <p>Más allá de guardar números, una base de datos vectorial existe para hacer bien estas tres cosas:</p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Almacenar a gran escala</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Guardar millones (o miles de
          millones) de vectores de forma eficiente, uno por cada canción, documento, imagen o lo que sea
          que se haya convertido en embedding.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">Indexar la información</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Organizar esos vectores con una
          estructura como HNSW, para no tener que compararlos todos contra todos cada vez que alguien
          busca algo.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Búsqueda rápida</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Responder "¿cuáles son los más
          parecidos a este?" en milisegundos, incluso sobre catálogos enormes, gracias a esa indexación.</p>
      </div>
    </div>
    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;">
        <strong>¿Qué es HNSW?</strong> El algoritmo que casi todas las bases de datos vectoriales usan para
        indexar: en vez de comparar tu búsqueda contra cada vector guardado, uno por uno, arma un mapa en
        varias capas, como un sistema de carreteras. Mira cómo "viaja" una búsqueda de la autopista a la
        calle local, cada vez más cerca del resultado:
      </p>
      <svg viewBox="0 0 480 175" style="width:100%; max-width:480px; display:block; margin:0 auto;">
        <text x="30" y="16" font-size="9.5" fill="var(--accent)" font-family="Consolas, monospace">Capa superior, pocos nodos, saltos largos</text>
        <line x1="30" y1="30" x2="450" y2="30" stroke="var(--accent)" stroke-width="2" opacity="0.3"/>
        <circle cx="40" cy="30" r="5" fill="var(--accent)"/>
        <circle cx="160" cy="30" r="5" fill="var(--accent)"/>
        <circle cx="260" cy="30" r="5" fill="var(--accent)"/>
        <circle cx="400" cy="30" r="5" fill="var(--accent)"/>

        <text x="30" y="81" font-size="9.5" fill="#6f9d7c" font-family="Consolas, monospace">Capa media</text>
        <line x1="30" y1="95" x2="450" y2="95" stroke="#6f9d7c" stroke-width="2" opacity="0.3"/>
        <circle cx="40" cy="95" r="4.5" fill="#6f9d7c"/>
        <circle cx="95" cy="95" r="4.5" fill="#6f9d7c"/>
        <circle cx="150" cy="95" r="4.5" fill="#6f9d7c"/>
        <circle cx="205" cy="95" r="4.5" fill="#6f9d7c"/>
        <circle cx="260" cy="95" r="4.5" fill="#6f9d7c"/>
        <circle cx="285" cy="95" r="4.5" fill="#6f9d7c"/>
        <circle cx="340" cy="95" r="4.5" fill="#6f9d7c"/>
        <circle cx="400" cy="95" r="4.5" fill="#6f9d7c"/>

        <text x="30" y="146" font-size="9.5" fill="#c99a4e" font-family="Consolas, monospace">Capa inferior, todos los nodos, saltos cortos</text>
        <line x1="30" y1="160" x2="450" y2="160" stroke="#c99a4e" stroke-width="2" opacity="0.3"/>
        <circle cx="40" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="75" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="110" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="145" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="180" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="215" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="250" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="320" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="355" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="390" cy="160" r="4" fill="#c99a4e"/>
        <circle cx="425" cy="160" r="4" fill="#c99a4e"/>

        <circle cx="285" cy="160" r="6" fill="none" stroke="#b33a2e" stroke-width="2">
          <animate attributeName="r" keyTimes="0;0.6;0.65;0.85;1" values="6;6;10;10;6" dur="6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" keyTimes="0;0.6;0.65;0.85;1" values="0.4;0.4;1;1;0.4" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="285" cy="160" r="4" fill="#b33a2e"/>

        <circle r="6" fill="#7c3aed" stroke="#fff" stroke-width="1.5">
          <animate attributeName="cx" keyTimes="0;0.05;0.25;0.35;0.55;0.65;0.85;0.92;1" values="40;40;260;260;285;285;285;285;40" dur="6s" repeatCount="indefinite"/>
          <animate attributeName="cy" keyTimes="0;0.05;0.25;0.35;0.55;0.65;0.85;0.92;1" values="30;30;30;95;95;160;160;160;30" dur="6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" keyTimes="0;0.05;0.25;0.35;0.55;0.65;0.85;0.92;1" values="0;1;1;1;1;1;1;0;0" dur="6s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <p style="margin:0.6rem 0 0; font-size:0.8rem; color:var(--text-dim); text-align:center;">
        El punto morado es tu búsqueda: avanza rápido por la capa de arriba (pocos saltos largos), va bajando
        de capa en capa, y termina exactamente en el vecino más cercano (el círculo rojo), sin haber tocado
        la mayoría de los demás nodos.
      </p>
    </div>
  </div>

  <!-- ===================== 1C. LIMITACIONES ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Lo que hay que tener en cuenta: sus límites reales</h3>
    </div>
    <p>Ninguna tecnología es mágica. Estos son los dos problemas más comunes al trabajar con vectores:</p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:#b33a2e;">La maldición de la dimensionalidad</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Cuando un vector tiene muchísimas
          dimensiones (384, 768, 1536...), el concepto de "distancia" empieza a perder fuerza: casi todos
          los puntos terminan pareciendo igual de lejanos entre sí, y distinguir "parecido" de "no
          parecido" se vuelve más difícil. Por eso los índices como HNSW usan aproximaciones inteligentes en
          vez de comparar exactamente todo contra todo.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Ruido y redundancia</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">No todos los números de un embedding
          aportan información útil (ruido), y es común terminar con vectores casi idénticos guardados varias
          veces (redundancia) si no se limpian los datos de entrada. Ambos problemas desperdician espacio y
          pueden empeorar la calidad de los resultados de búsqueda.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 2. LÍNEA DE TIEMPO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Un poco de historia: cómo llegamos hasta aquí</h3>
    </div>
    <p>
      Nada de esto apareció de la nada. Es la suma de varios avances, cada uno resolviendo una pieza del
      rompecabezas, a lo largo de más de diez años:
    </p>

    <div style="position:relative; margin:1.2rem 0 0.4rem; padding-left:30px; border-left:3px solid var(--border);">

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:var(--accent); box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:var(--accent);">2013. Word2Vec</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Investigadores de Google (Mikolov et al.) publican <strong style="color:#b33a2e;">Word2Vec</strong>: la primera técnica ampliamente usada
          para <strong style="color:#b33a2e;">convertir palabras en vectores</strong>, donde palabras con
          significado parecido terminan cerca en el espacio. Es el primer ladrillo de todo lo que sigue.
        </p>
        <p style="margin:0.5rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          <strong>¿Cómo lo logra, sin que nadie le diga a mano qué significa cada palabra?</strong> Con un principio llamado
          <strong>hipótesis distribucional</strong>: "una palabra se conoce por la compañía que frecuenta".
          <strong style="color:#b33a2e;">Word2Vec se entrena leyendo millones de frases reales, en este caso el corpus de noticias de Google
          (Google News), cerca de 100 mil millones de palabras</strong>, y aprendiendo a predecir qué palabras suelen
          aparecer cerca de cuáles otras. Si "rey" y "reina" aparecen rodeadas de palabras parecidas
          (trono, palacio, corona), el modelo los acerca en el espacio vectorial. Nadie le enseñó qué es
          la realeza, lo dedujo de patrones estadísticos del lenguaje.
        </p>
        <p style="margin:0.5rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          El ejemplo más famoso de este
          entrenamiento: al hacer la operación <code>vector("rey") - vector("hombre") + vector("mujer")</code>,
          el resultado queda muy cerca de <code>vector("reina")</code>. La aritmética de vectores termina
          reflejando relaciones de significado reales. Este mismo principio, aplicado más tarde a frases
          completas en vez de palabras sueltas, es lo que usa el modelo que vas a usar hoy para "entender"
          que una descripción sobre soledad y piano lento se relaciona con un día lluvioso.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#8b7fb8; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#8b7fb8;">2016. HNSW: cómo buscar rápido entre millones de vectores</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Malkov y Yashunin publican el algoritmo HNSW (Hierarchical Navigable Small World): una estructura
          que permite encontrar los vecinos más cercanos de un vector sin tener que compararlo contra todos
          los demás, uno por uno. Se convierte en el "motor" que usan casi todas las bases de datos
          vectoriales modernas, el equivalente, para vectores, de lo que un índice B-Tree es para números.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#6f9d7c; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#6f9d7c;">2017. FAISS (Facebook AI)</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Meta (entonces Facebook) libera FAISS, una librería open source para búsqueda de similitud a gran
          escala. Es de las primeras herramientas prácticas que le permiten a cualquier equipo de ingeniería
          buscar "lo más parecido" entre millones de vectores.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#c99a4e; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#c99a4e;">2018. BERT (Google)</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Los embeddings dan un salto: en vez de asignarle un vector fijo a cada palabra suelta, BERT genera
          vectores que dependen del <strong>contexto</strong> de toda la frase. Es el antepasado directo de
          los modelos que vas a usar esta semana.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#b33a2e; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#b33a2e;">Noviembre 2019. Milvus, la primera base de datos vectorial de código abierto</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Zilliz libera Milvus como código abierto: ya no es solo una librería para programadores, sino una
          base de datos completa, pensada desde cero para guardar y buscar vectores.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#7c3aed; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#7c3aed;">2019 / 2021. Pinecone</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Se funda Pinecone (2019), y en 2021 lanza su beta pública: la primera "base de datos vectorial como
          servicio" completamente en la nube, sin que el desarrollador tenga que administrar servidores.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:var(--accent); box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:var(--accent);">Abril 2021. pgvector</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Andrew Kane libera <code>pgvector</code>: una extensión que le agrega el tipo de columna
          <code>VECTOR</code> a PostgreSQL, la misma base de datos relacional que ya conoces desde la
          Semana 1. Ya no hace falta una base de datos nueva y separada solo para vectores.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#6f9d7c; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#6f9d7c;">Noviembre 2022. ChatGPT y la explosión de RAG</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          El lanzamiento de ChatGPT dispara la demanda de un patrón llamado <strong>RAG</strong>
          (Retrieval-Augmented Generation): buscar información relevante por significado antes de
          pasársela a un modelo de lenguaje. De la noche a la mañana, todo el mundo necesita una base de
          datos vectorial.
        </p>
        <p style="margin:0.5rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          <strong style="color:#b33a2e;">RAG es un patrón de arquitectura</strong>, no depende de una base de datos en particular. Cualquiera que
          pueda guardar vectores y buscar por similitud sirve como la pieza de "Retrieval": pgvector sobre
          PostgreSQL (lo que vas a usar aquí), una especializada como Pinecone, Milvus, Weaviate, Qdrant,
          Chroma o LanceDB, o incluso Redis, MongoDB o Elasticsearch con su módulo vectorial agregado. La
          base de datos es intercambiable, lo que no cambia es el patrón: buscar por significado y pasarle
          ese contexto a un LLM antes de que genere la respuesta.
        </p>
      </div>

      <div style="position:relative; margin-bottom:1.5rem;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#8b7fb8; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#8b7fb8;">2022-2023. Todos suben al barco</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Redis, MongoDB, Elasticsearch/OpenSearch, Oracle, y los tres grandes de la nube (AWS, Azure,
          Google Cloud) agregan búsqueda vectorial a sus productos ya existentes. Dejó de ser una
          curiosidad de laboratorio.
        </p>
      </div>

      <div style="position:relative;">
        <div style="position:absolute; left:-38px; top:2px; width:14px; height:14px; border-radius:50%; background:#c99a4e; box-shadow:0 0 0 4px var(--bg-card);"></div>
        <div style="font-weight:700; color:#c99a4e;">Hoy. Supabase + pgvector</div>
        <p style="margin:0.2rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Lo que vas a usar en esta actividad: PostgreSQL de siempre, con <code>pgvector</code> encima. Todo
          el poder de una base de datos vectorial, dentro de la base de datos relacional que ya sabes usar.
        </p>
        <p style="margin:0.5rem 0 0; font-size:0.9rem; color:var(--text-dim);">
          Word2Vec, con el que arrancó todo en 2013, ya quedó superado: hoy casi nadie lo usa en producción.
          Lo reemplazaron los modelos basados en <strong style="color:#b33a2e;">Transformers</strong>, que generan un vector distinto según el
          contexto de toda la frase, no uno fijo por palabra. Muy pocas empresas entrenan su propio modelo
          de embeddings desde cero (es carísimo), la mayoría reutiliza uno ya existente. Hoy eso significa,
          sobre todo, modelos abiertos de Hugging Face como el <code style="color:#b33a2e;">sentence-transformers</code> que vas a usar
          en esta actividad, o modelos por API de unos pocos jugadores grandes:
        </p>
        <ul style="margin:0.4rem 0 0; padding-left:1.2rem; color:var(--text);">
          <li><strong>OpenAI</strong> (text-embedding-3)</li>
          <li><strong>Google</strong> (Gemini Embedding)</li>
          <li><strong>Cohere</strong> (embed-v4)</li>
          <li><strong>Voyage AI</strong></li>
        </ul>
        <div style="margin-top:0.7rem; padding:0.7rem 0.9rem; border-radius:8px; border-left:3px solid #c99a4e; background:rgba(201,154,78,0.12);">
          <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
            Dato curioso: <strong style="color:#c99a4e;">Claude</strong>, el modelo de Anthropic, no tiene su
            propio modelo de embeddings, es un LLM enfocado solo en generar texto. Para armar un RAG con
            Claude, Anthropic recomienda apoyarse justo en <strong>Voyage AI</strong>, uno de los que acabas
            de ver en esta lista.
          </p>
          <p style="margin:0.6rem 0 0.3rem; font-size:0.85rem; color:var(--text-dim);">Sus puntos más fuertes:</p>
          <ul style="margin:0; padding-left:1.2rem; color:var(--text); font-size:0.85rem;">
            <li>Escritura y redacción</li>
            <li>Análisis y razonamiento</li>
            <li>Programación</li>
            <li>Construcción y edición de contenido (como esta misma clase)</li>
          </ul>
        </div>
      </div>

    </div>
  </div>

  <!-- ===================== 2B. DATOS CURIOSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3 style="display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap; margin:0;">
        <span class="curioso-title-badge">
          <svg class="curioso-title-spark" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l1.9 5.7L19.6 9l-5.7 1.9L12 16.6l-1.9-5.7L4.4 9l5.7-1.3L12 2z" fill="currentColor"/>
          </svg>
          Dato curioso
        </span>
        <span style="color:var(--accent);">Bases de datos vectoriales en la industria</span>
      </h3>
    </div>
    <p>Productos que probablemente usamos todos los días:</p>
    <div class="curioso-grid">
      <div class="curioso-card curioso-card--green">
        <span class="curioso-card-year">2013</span>
        <h4 style="color:#6f9d7c; margin:0 0 0.4rem;">Spotify creó su propia herramienta</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
          Mucho antes de que existiera Pinecone o pgvector, Spotify ya tenía el mismo problema: encontrar
          canciones "parecidas" entre millones. En 2013, su ingeniero Erik Bernhardsson construyó
          <strong>Annoy</strong> (Approximate Nearest Neighbors Oh Yeah) en un par de tardes durante una
          Hack Week, y terminó siendo la librería que impulsó recomendaciones como <strong>Discover
          Weekly</strong> durante años.
        </p>
        <div class="curioso-timeline">
          <span class="curioso-timeline-label" style="color:#6f9d7c;">Annoy · 2013</span>
          <div class="curioso-timeline-track"><div class="curioso-timeline-dot"></div></div>
          <span class="curioso-timeline-label" style="color:#6f9d7c;">Voyager · 2023</span>
        </div>
      </div>
      <div class="curioso-card curioso-card--violet">
        <span class="curioso-card-year">10x</span>
        <h4 style="color:#8b7fb8; margin:0 0 0.4rem;">Notion: más escala, menos costo</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
          Notion usa búsqueda vectorial para su función de IA (preguntas y respuestas sobre tus propias
          notas). Entre su lanzamiento (2023) y su optimización más reciente, lograron atender 10 veces más
          carga con menos infraestructura, la diferencia entre notar o no notar la espera.
        </p>
        <div class="curioso-stat">
          <div class="curioso-stat-label"><span>Costo de infraestructura</span><span>-90%</span></div>
          <div class="curioso-stat-track"><div class="curioso-stat-fill" style="--fill:10%; background:#8b7fb8;"></div></div>
        </div>
        <div class="curioso-stat">
          <div class="curioso-stat-label"><span>Latencia de búsqueda (70-100ms &rarr; 50-70ms)</span><span>-30%</span></div>
          <div class="curioso-stat-track"><div class="curioso-stat-fill" style="--fill:60%; background:#c99a4e;"></div></div>
        </div>
      </div>
    </div>
    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <p style="margin:0 0 0.7rem;">El patrón se repite en decenas de empresas más:</p>
      <div class="curioso-pill-row">
        <span class="curioso-pill" style="background:rgba(124,58,237,0.14); color:#7c3aed;"><span class="curioso-pill-dot"></span>E-commerce: productos "parecidos"</span>
        <span class="curioso-pill" style="background:rgba(91,124,153,0.14); color:#5b7c99;"><span class="curioso-pill-dot"></span>Buscadores de imágenes</span>
        <span class="curioso-pill" style="background:rgba(179,58,46,0.14); color:#b33a2e;"><span class="curioso-pill-dot"></span>Chatbots RAG</span>
      </div>
      <p style="margin:0;">
        Todos resuelven, por debajo, el mismo problema que vas a resolver hoy con SoundFlow.
      </p>
    </div>
  </div>

  <!-- ===================== 2C. CASOS DE USO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Casos de uso: dónde más se usa esto</h3>
    </div>
    <p>SoundFlow es un caso, pero el mismo patrón, convertir algo en un vector y buscar "lo más parecido", se repite en industrias muy distintas:</p>
    <div class="usecase-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="usecase-card" style="background:rgba(91,124,153,0.10);">
        <div class="usecase-icon" style="background:rgba(91,124,153,0.16); color:#5b7c99;">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="8" width="28" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="15" cy="17" r="2.5" fill="currentColor" opacity="0.7"/>
            <path d="M8 28 L16 20 L22 25 L28 18 L32 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7"/>
            <line x1="6" y1="10" x2="34" y2="10" stroke="currentColor" stroke-width="2">
              <animate attributeName="y1" values="10;30;10" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="y2" values="10;30;10" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.9;0.9;0" dur="2.4s" repeatCount="indefinite"/>
            </line>
          </svg>
        </div>
        <h4 style="color:#5b7c99; margin:0 0 0.3rem;">Búsqueda de imágenes</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Subes una foto y el sistema encuentra
          imágenes visualmente parecidas. El embedding no sale de texto, sino de un modelo que "lee" píxeles.</p>
        <p style="margin:0.5rem 0 0; font-size:0.78rem; color:var(--text-dim);"><strong>Quién lo hace:</strong> Pinterest ("Buscar visualmente"), Google Lens, Bing Visual Search.</p>
      </div>
      <div class="usecase-card" style="background:rgba(111,157,124,0.10);">
        <div class="usecase-icon" style="background:rgba(111,157,124,0.16); color:#6f9d7c;">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="28" x2="20" y2="12" stroke="currentColor" stroke-width="2" opacity="0.4"/>
            <line x1="20" y1="12" x2="30" y2="28" stroke="currentColor" stroke-width="2" opacity="0.4"/>
            <line x1="10" y1="28" x2="30" y2="28" stroke="currentColor" stroke-width="2" opacity="0.4"/>
            <circle cx="10" cy="28" r="4" fill="currentColor"><animate attributeName="r" values="4;6;4" dur="1.8s" begin="0s" repeatCount="indefinite"/></circle>
            <circle cx="20" cy="12" r="4" fill="currentColor"><animate attributeName="r" values="4;6;4" dur="1.8s" begin="0.6s" repeatCount="indefinite"/></circle>
            <circle cx="30" cy="28" r="4" fill="currentColor"><animate attributeName="r" values="4;6;4" dur="1.8s" begin="1.2s" repeatCount="indefinite"/></circle>
          </svg>
        </div>
        <h4 style="color:#6f9d7c; margin:0 0 0.3rem;">Sistemas de recomendación</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Encuentran canciones, series o
          productos "parecidos" a lo que ya te gustó, comparando embeddings en vez de reglas fijas como
          "misma categoría".</p>
        <p style="margin:0.5rem 0 0; font-size:0.78rem; color:var(--text-dim);"><strong>Quién lo hace:</strong> Spotify, Netflix, Amazon.</p>
      </div>
      <div class="usecase-card" style="background:rgba(139,127,184,0.10);">
        <div class="usecase-icon" style="background:rgba(139,127,184,0.16); color:#8b7fb8;">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10 h28 a3 3 0 0 1 3 3 v10 a3 3 0 0 1 -3 3 h-16 l-7 6 v-6 h-5 a3 3 0 0 1 -3 -3 v-10 a3 3 0 0 1 3 -3 z" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="14" cy="19" r="1.8" fill="currentColor"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0s" repeatCount="indefinite"/></circle>
            <circle cx="20" cy="19" r="1.8" fill="currentColor"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.2s" repeatCount="indefinite"/></circle>
            <circle cx="26" cy="19" r="1.8" fill="currentColor"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite"/></circle>
          </svg>
        </div>
        <h4 style="color:#8b7fb8; margin:0 0 0.3rem;">RAG y chatbots empresariales</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Buscar en manuales, políticas internas
          o bases de conocimiento antes de responder, el caso que vas a ver a fondo más adelante en esta
          misma clase.</p>
        <p style="margin:0.5rem 0 0; font-size:0.78rem; color:var(--text-dim);"><strong>Quién lo hace:</strong> Glean, Microsoft Copilot, Notion AI.</p>
      </div>
      <div class="usecase-card" style="background:rgba(201,154,78,0.10);">
        <div class="usecase-icon" style="background:rgba(201,154,78,0.16); color:#c99a4e;">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="9" width="30" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M16 14 L26 19 L16 24 Z" fill="currentColor" opacity="0.85"/>
            <line x1="5" y1="33" x2="35" y2="33" stroke="currentColor" stroke-width="2" opacity="0.35"/>
            <circle cy="33" r="2.5" fill="currentColor"><animate attributeName="cx" values="7;33;7" dur="3s" repeatCount="indefinite"/></circle>
          </svg>
        </div>
        <h4 style="color:#c99a4e; margin:0 0 0.3rem;">Búsqueda de video</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Encontrar el fragmento exacto de una
          clase o charla donde se menciona un tema, sin depender de que el subtítulo tenga la palabra exacta
          que buscas.</p>
        <p style="margin:0.5rem 0 0; font-size:0.78rem; color:var(--text-dim);"><strong>Quién lo hace:</strong> Twelve Labs, YouTube, Google Photos.</p>
      </div>
      <div class="usecase-card" style="background:rgba(179,58,46,0.10);">
        <div class="usecase-icon" style="background:rgba(179,58,46,0.16); color:#b33a2e;">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/>
            <circle cx="20" cy="20" r="7" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.35"/>
            <line x1="20" y1="20" x2="20" y2="7" stroke="currentColor" stroke-width="2">
              <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="2.4s" repeatCount="indefinite"/>
            </line>
            <circle cx="27" cy="14" r="2" fill="currentColor"><animate attributeName="opacity" values="0;0;1;0" dur="2.4s" repeatCount="indefinite"/></circle>
          </svg>
        </div>
        <h4 style="color:#b33a2e; margin:0 0 0.3rem;">Detección de fraude</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Representar el comportamiento de una
          transacción como vector y buscar "transacciones parecidas" a patrones fraudulentos ya conocidos, en
          vez de reglas fijas tipo "monto mayor a X".</p>
        <p style="margin:0.5rem 0 0; font-size:0.78rem; color:var(--text-dim);"><strong>Quién lo hace:</strong> Stripe (Radar), PayPal, Visa.</p>
      </div>
      <div class="usecase-card" style="background:rgba(161,92,143,0.10);">
        <div class="usecase-icon" style="background:rgba(161,92,143,0.16); color:#a15c8f;">
          <div class="usecase-eq"><span></span><span></span><span></span><span></span><span></span></div>
        </div>
        <h4 style="color:#a15c8f; margin:0 0 0.3rem;">Búsqueda y reconocimiento de audio</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Encontrar canciones o efectos de
          sonido parecidos a partir de un clip de audio, comparando embeddings generados a partir del sonido
          en vez del texto.</p>
        <p style="margin:0.5rem 0 0; font-size:0.78rem; color:var(--text-dim);"><strong>Quién lo hace:</strong> Shazam, SoundHound, Spotify.</p>
      </div>
    </div>
    <div class="content-box" style="margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;">Y hay más:</p>
      <ul style="margin:0.4rem 0 0; padding-left:1.2rem; color:var(--text);">
        <li>Deduplicar o agrupar automáticamente documentos y tickets de soporte por tema, sin etiquetarlos a mano.</li>
        <li>Comparar secuencias de proteínas en bioinformática para encontrar estructuras parecidas.</li>
        <li>Buscar imágenes médicas parecidas (radiografías, resonancias, dermatología) para apoyar un diagnóstico, comparando el caso actual con miles de casos previos ya diagnosticados.</li>
        <li>Búsqueda semántica en historias clínicas y literatura médica, para encontrar pacientes con síntomas parecidos o artículos científicos relevantes, sin depender de las palabras exactas del texto.</li>
      </ul>
      <p style="margin:0.6rem 0 0;">
        El patrón de fondo es siempre el mismo: convertir algo en un vector, y preguntar "¿qué más se parece
        a esto?".
      </p>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;"><strong>Pero un momento: ¿no que los LLM solo entienden texto?</strong></p>
      <p style="margin:0;">
        Los LLM "clásicos" (GPT-3, BERT, el <code>paraphrase-multilingual-MiniLM-L12-v2</code> de esta actividad) sí nacieron
        trabajando solo con texto. Pero hoy existen <strong>modelos multimodales</strong> (GPT-4o, Gemini)
        que reciben directamente imágenes, audio o video además de texto, en el mismo modelo. Y para
        embeddings específicamente hay modelos dedicados a otras modalidades.
      </p>
      <p style="margin:0.5rem 0 0;">
        <strong>CLIP</strong> (OpenAI) se entrenó con pares de imagen + descripción para que ambas terminen en
        el mismo espacio vectorial, y modelos más recientes como <strong>Gemini Embedding 2</strong> meten texto, imagen, video
        y audio en un solo espacio. Por eso la búsqueda de imágenes o de audio que viste arriba sí es posible:
        no es que "el LLM de texto" haga esa búsqueda, es que existe un modelo de embeddings entrenado para
        esa modalidad específica, con el mismo principio de fondo.
      </p>
    </div>
  </div>

  <!-- ===================== 3. TERMINOLOGÍA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Terminología esencial de Bases de Datos Vectoriales - VDB</h3>
    </div>
    <p>El vocabulario que vas a encontrar todo el tiempo, tanto hoy como en el resto de la semana:</p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr;">      <div class="concept-card">
        <h4 style="color:var(--accent);">Embedding</h4>
        <div style="color:#5b7c99; margin:0 0 0.6rem; height:76px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="12" width="46" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="25" y="23" font-size="8" text-anchor="middle" fill="currentColor" font-family="Consolas, monospace">texto</text>
            <path d="M52 20 L70 20 M66 16 L70 20 L66 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="84" cy="14" r="4" fill="currentColor" opacity="0.85"/>
            <circle cx="98" cy="24" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="112" cy="10" r="4" fill="currentColor" opacity="0.4"/>
            <circle cx="126" cy="20" r="4" fill="currentColor" opacity="0.7"/>
            <circle cx="140" cy="15" r="4" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Una lista de números (vector) que un
          modelo de IA genera a partir de un texto (o imagen, o audio), y que representa su significado. Ese
          significado no es una sola cosa: el vector codifica a la vez tono, contexto, tema y estilo, todo
          mezclado en los mismos números. Por eso dos frases con las mismas palabras pero distinto tono
          (una seria, otra sarcástica) pueden terminar en puntos distintos del espacio vectorial.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">Vector</h4>
        <div style="color:#6f9d7c; margin:0 0 0.6rem; height:87px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 46" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="40" x2="150" y2="40" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            <line x1="10" y1="40" x2="10" y2="4" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            <line x1="10" y1="40" x2="82" y2="10" stroke="currentColor" stroke-width="2"/>
            <path d="M82 10 L73 13 M82 10 L79 19" fill="none" stroke="currentColor" stroke-width="2"/>
            <text x="88" y="12" font-size="8" fill="currentColor" font-family="Consolas, monospace">[0.4, 0.9, ...]</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">La estructura de datos detrás del
          embedding: una lista ordenada de números, por ejemplo <code>[0.02, -0.18, 0.40, ...]</code>.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Dimensión</h4>
        <div style="color:#8b7fb8; margin:0 0 0.6rem; height:87px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 46" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="80" y1="40" x2="150" y2="40" stroke="currentColor" stroke-width="1.5"/>
            <line x1="80" y1="40" x2="80" y2="6" stroke="currentColor" stroke-width="1.5"/>
            <line x1="80" y1="40" x2="42" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
            <text x="152" y="43" font-size="7" fill="currentColor">d1</text>
            <text x="83" y="8" font-size="7" fill="currentColor">d2</text>
            <text x="30" y="14" font-size="7" fill="currentColor">d3</text>
            <text x="2" y="26" font-size="7" fill="currentColor" font-family="Consolas, monospace">... hasta d384</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Cada número dentro del vector es una
          "coordenada" más. Un vector de 384 dimensiones tiene 384 números. Más dimensiones capturan matices
          más finos, pero pesan más y son más lentas de comparar.</p>
        <ul style="margin:0.5rem 0 0; padding-left:1.1rem; font-size:0.8rem; color:var(--text-dim);">
          <li><code>paraphrase-multilingual-MiniLM-L12-v2</code> (el tuyo): <strong>384</strong>, liviano, corre bien en tu propia computadora.</li>
          <li><code>all-mpnet-base-v2</code>: <strong>768</strong>, medio, más preciso pero más lento.</li>
          <li>OpenAI <code>text-embedding-3-small</code>: <strong>1.536</strong>, pesado, necesita API/servidor.</li>
          <li>OpenAI <code>text-embedding-3-large</code>: <strong>3.072</strong>, muy pesado, el que más recursos consume de esta lista.</li>
        </ul>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Espacio vectorial</h4>
        <div style="color:#c99a4e; margin:0 0 0.6rem; height:87px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 46" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="14" r="3" fill="currentColor"/>
            <circle cx="38" cy="22" r="3" fill="currentColor"/>
            <circle cx="24" cy="26" r="3" fill="currentColor"/>
            <circle cx="120" cy="30" r="3" fill="currentColor" opacity="0.5"/>
            <circle cx="130" cy="18" r="3" fill="currentColor" opacity="0.5"/>
            <circle cx="112" cy="12" r="3" fill="currentColor" opacity="0.5"/>
            <text x="17" y="42" font-size="7" fill="currentColor">"triste"</text>
            <text x="104" y="42" font-size="7" fill="currentColor">"feliz"</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El "mapa del significado" completo:
          todos los vectores posibles, donde la cercanía entre dos puntos representa cercanía de
          significado.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Similitud de coseno</h4>
        <div style="color:#5b7c99; margin:0 0 0.6rem; height:87px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 46" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="15" y1="40" x2="85" y2="10" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="40" x2="95" y2="18" stroke="currentColor" stroke-width="2" opacity="0.6"/>
            <path d="M42 27 A 18 18 0 0 1 46 21" fill="none" stroke="currentColor" stroke-width="1.2"/>
            <text x="50" y="8" font-size="7.5" fill="currentColor">ángulo pequeño = parecidos</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Mide el ángulo entre dos vectores. La
          forma más común de comparar qué tan parecidos son en significado.</p>
        <p style="margin:0.5rem 0 0; padding:0.5rem 0.7rem; background:rgba(91,124,153,0.10); border-radius:6px; font-family:Consolas, monospace; font-size:0.85rem; color:var(--text); text-align:center;">
          cos(θ) = (A · B) / (‖A‖ ‖B‖)
        </p>
        <p style="margin:0.5rem 0 0; font-size:0.8rem; color:#b33a2e; font-weight:600;">La función coseno
          funciona así: entre más pequeño es el ángulo entre dos vectores, más cerca de 1 está su coseno.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#b33a2e;">Distancia euclidiana</h4>
        <div style="color:#b33a2e; margin:0 0 0.6rem; height:57px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="16" r="4" fill="currentColor"/>
            <circle cx="140" cy="16" r="4" fill="currentColor"/>
            <line x1="24" y1="16" x2="136" y2="16" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
            <text x="58" y="10" font-size="8" fill="currentColor">distancia</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Mide la distancia "en línea recta"
          entre dos puntos. Una alternativa a la similitud de coseno, menos usada con texto.</p>
        <p style="margin:0.5rem 0 0; padding:0.5rem 0.7rem; background:rgba(179,58,46,0.10); border-radius:6px; font-family:Consolas, monospace; font-size:0.85rem; color:var(--text); text-align:center;">
          d(A,B) = √(Σ (Aᵢ − Bᵢ)²)
        </p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7c3aed;">Vecino más cercano (KNN: K-Nearest Neighbors / ANN: Approximate Nearest Neighbor, vecino más cercano aproximado)</h4>
        <div style="color:#7c3aed; margin:0 0 0.6rem; height:87px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 46" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="23" r="24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.35" stroke-dasharray="3 3"/>
            <circle cx="80" cy="23" r="4" fill="currentColor"/>
            <circle cx="65" cy="14" r="3" fill="currentColor"/>
            <circle cx="98" cy="12" r="3" fill="currentColor"/>
            <circle cx="95" cy="35" r="3" fill="currentColor"/>
            <circle cx="15" cy="8" r="3" fill="currentColor" opacity="0.3"/>
            <circle cx="148" cy="38" r="3" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El tipo de búsqueda que hace una base
          de datos vectorial: encontrar los vectores guardados más parecidos a uno dado. "ANN" es la versión
          aproximada, mucho más rápida a gran escala.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">Índice vectorial (HNSW: Hierarchical Navigable Small World, mundo pequeño navegable jerárquico)</h4>
        <div style="color:#6f9d7c; margin:0 0 0.6rem; height:87px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 46" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="8" x2="110" y2="8" stroke="currentColor" stroke-width="1" opacity="0.5"/>
            <line x1="40" y1="8" x2="20" y2="24" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <line x1="40" y1="8" x2="60" y2="24" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <line x1="110" y1="8" x2="95" y2="24" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <line x1="110" y1="8" x2="135" y2="24" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <circle cx="40" cy="8" r="3" fill="currentColor"/>
            <circle cx="110" cy="8" r="3" fill="currentColor"/>
            <circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.7"/>
            <circle cx="60" cy="24" r="3" fill="currentColor" opacity="0.7"/>
            <circle cx="95" cy="24" r="3" fill="currentColor" opacity="0.7"/>
            <circle cx="135" cy="24" r="3" fill="currentColor" opacity="0.7"/>
            <circle cx="10" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="30" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="50" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="70" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="90" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="110" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="130" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="150" cy="40" r="2.5" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Una estructura preparada de antemano
          (como HNSW) para no tener que comparar un vector contra todos los demás, uno por uno.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#b33a2e;">Chunk</h4>
        <div style="color:#b33a2e; margin:0 0 0.6rem; height:57px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="34" height="14" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <rect x="40" y="8" width="34" height="14" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.75"/>
            <rect x="76" y="8" width="34" height="14" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
            <rect x="112" y="8" width="34" height="14" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un fragmento de un texto más largo
          (un párrafo, una sección de un documento). Antes de generar embeddings de documentos extensos, se
          "trocean" en chunks, porque los modelos tienen un límite de texto que pueden procesar de una vez, y
          porque un embedding de un párrafo específico es más preciso que uno de un documento entero.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Token</h4>
        <div style="color:#5b7c99; margin:0 0 0.6rem; height:57px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="34" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="21" y="19" font-size="8" text-anchor="middle" fill="currentColor" font-family="Consolas, monospace">jug</text>
            <rect x="42" y="6" width="34" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
            <text x="59" y="19" font-size="8" text-anchor="middle" fill="currentColor" font-family="Consolas, monospace">ando</text>
            <text x="86" y="19" font-size="8" fill="currentColor">= 2 tokens</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">La unidad mínima de texto que procesa
          un modelo de IA: no siempre es una palabra completa, a veces es un pedazo de ella (por ejemplo,
          "jugando" puede partirse en "jug" + "ando"). El límite de cuánto texto puede procesar un modelo de
          una sola vez, incluyendo el modelo de embeddings, se mide en tokens, no en palabras ni en
          caracteres. Es una de las razones por las que un documento largo necesita dividirse en chunks.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:var(--accent);">pgvector</h4>
        <div style="color:#5b7c99; margin:0 0 0.6rem; height:76px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="148" height="28" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <line x1="6" y1="16" x2="154" y2="16" stroke="currentColor" stroke-width="1"/>
            <line x1="60" y1="6" x2="60" y2="34" stroke="currentColor" stroke-width="1"/>
            <line x1="110" y1="6" x2="110" y2="34" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <rect x="110" y="6" width="44" height="28" fill="currentColor" opacity="0.15"/>
            <text x="33" y="13" font-size="6.5" text-anchor="middle" fill="currentColor">id</text>
            <text x="85" y="13" font-size="6.5" text-anchor="middle" fill="currentColor">titulo</text>
            <text x="132" y="13" font-size="6.5" text-anchor="middle" fill="currentColor">VECTOR</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">La extensión que le agrega a
          PostgreSQL el tipo de columna <code>VECTOR</code> y operadores para comparar vectores, como
          <code>&lt;=&gt;</code> (distancia de coseno). Es lo que usa Supabase por debajo.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7c3aed;">LLM (Large Language Model, modelo de lenguaje grande)</h4>
        <div style="color:#7c3aed; margin:0 0 0.6rem; height:76px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <text x="2" y="24" font-size="8" fill="currentColor" font-family="Consolas, monospace">"¿Cómo...?"</text>
            <path d="M58 20 L74 20 M70 16 L74 20 L70 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <rect x="78" y="8" width="34" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="95" y="23" font-size="8" text-anchor="middle" fill="currentColor">LLM</text>
            <path d="M116 20 L132 20 M128 16 L132 20 L128 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="136" y="24" font-size="8" fill="currentColor" font-family="Consolas, monospace">"..."</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un modelo entrenado con textos
          masivos (muchos tomados de la web) para <strong>generar</strong> lenguaje, prediciendo la palabra
          más probable según patrones aprendidos (GPT, Gemini, <strong>Claude</strong>, LLaMA, son ejemplos).
          No guarda esos textos, solo quedan sus pesos. Comparte
          arquitectura con los modelos de embeddings (Transformer, capas de atención), pero mientras el LLM
          genera texto, el modelo de embeddings comprime un texto en un vector de significado: son primos,
          no la misma cosa.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">RAG (Retrieval-Augmented Generation, generación aumentada por recuperación)</h4>
        <div style="color:#c99a4e; margin:0 0 0.6rem; height:76px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="18" cy="10" rx="12" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6 10 v14 a12 4 0 0 0 24 0 v-14" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path d="M34 20 L50 20 M46 16 L50 20 L46 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <rect x="54" y="10" width="30" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="69" y="23" font-size="7" text-anchor="middle" fill="currentColor">LLM</text>
            <path d="M88 20 L104 20 M100 16 L104 20 L100 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="108" y="24" font-size="8" fill="currentColor" font-family="Consolas, monospace">respuesta</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un patrón muy usado con IA generativa:
          buscar primero la información relevante por significado (con una base de datos vectorial), y
          dársela como contexto a un modelo de lenguaje antes de que responda.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Fine-tuning (ajuste fino)</h4>
        <div style="color:#8b7fb8; margin:0 0 0.6rem; height:76px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <text x="2" y="16" font-size="7" fill="currentColor">tus datos</text>
            <path d="M4 20 L36 20 M32 16 L36 20 L32 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <rect x="56" y="6" width="34" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="73" y="23" font-size="7" text-anchor="middle" fill="currentColor">modelo</text>
            <path d="M94 20 L126 20 M122 16 L126 20 L122 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="128" y="16" font-size="7" fill="currentColor">ajustado</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Reentrenar un modelo ya existente con
          ejemplos propios para que ajuste su comportamiento de forma permanente. Es la alternativa a RAG:
          en vez de buscarle información nueva en el momento de responder, se modifica el modelo mismo. Es
          más costoso y no sirve para información que cambia seguido; por eso RAG suele ser la opción más
          práctica para "que el modelo conozca tus documentos".</p>
      </div>
      <div class="concept-card" style="grid-column: 1 / -1;">
        <h4 style="color:#c99a4e;">GPU (Graphics Processing Unit, unidad de procesamiento gráfico)</h4>
        <div style="color:#c99a4e; margin:0 0 0.6rem; height:65px; display:flex; align-items:center;">
          <svg viewBox="0 0 160 34" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <text x="13" y="20" font-size="7" text-anchor="middle" fill="currentColor">CPU</text>
            <path d="M60 17 L78 17 M74 13 L78 17 L74 21" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <rect x="86" y="4" width="10" height="10" fill="currentColor"/>
            <rect x="98" y="4" width="10" height="10" fill="currentColor"/>
            <rect x="110" y="4" width="10" height="10" fill="currentColor"/>
            <rect x="122" y="4" width="10" height="10" fill="currentColor"/>
            <rect x="86" y="16" width="10" height="10" fill="currentColor"/>
            <rect x="98" y="16" width="10" height="10" fill="currentColor"/>
            <rect x="110" y="16" width="10" height="10" fill="currentColor"/>
            <rect x="122" y="16" width="10" height="10" fill="currentColor"/>
            <text x="107" y="32" font-size="6.5" text-anchor="middle" fill="currentColor">GPU: miles en paralelo</text>
          </svg>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Procesador pensado originalmente para
          renderizar gráficos y videojuegos, pero resultó ser excelente también para entrenar modelos de IA:
          mientras un CPU normal hace pocas operaciones a la vez pero muy flexibles, una GPU hace miles de
          operaciones matemáticas simples en paralelo, justo lo que se necesita para ajustar los millones de
          pesos de una red neuronal una y otra vez durante el entrenamiento.</p>
        <p style="margin:0.5rem 0 0; font-size:0.85rem; color:var(--text-dim);">Por eso entrenar un LLM o un
          modelo de embeddings desde cero es tan poco realista para casi cualquier proyecto: cuesta dinero
          (miles de GPUs funcionando semanas o meses, más el equipo especializado), toma tiempo (recolectar y
          limpiar datos, más el entrenamiento en sí), y exige un procesamiento y una cantidad de datos
          masivos que muy pocas empresas pueden pagar. Por eso la estrategia normal, la que usas hoy con
          <code>paraphrase-multilingual-MiniLM-L12-v2</code>, es reutilizar lo que ya entrenó alguien más.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 3C. VISUALIZACIÓN 3D ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Visualización: el espacio vectorial en movimiento</h3>
    </div>
    <p>
      Es difícil imaginarse 384 dimensiones, pero la idea central se puede ver en 3: cada esfera de abajo es
      una canción "flotando" en el espacio de significado, agrupada por color según qué tan parecida es su
      "vibra" a las demás, igual a lo que va a pasar con la tabla <code>canciones_vectoriales</code> que
      vas a construir más adelante. Pasa el mouse sobre el recuadro para detener el giro, y luego sobre una
      esfera para ver de cuál canción se trata.
    </p>
    <div class="vec3d-stage">
      <div class="vec3d-scene">
        <div class="vec3d-point" title="Café de Medianoche" style="background:#6f9d7c; color:#6f9d7c; transform:translate3d(-70px,-30px,50px);"></div>
        <div class="vec3d-point" title="Enfoque Profundo" style="background:#6f9d7c; color:#6f9d7c; transform:translate3d(-95px,25px,-20px);"></div>
        <div class="vec3d-point vec3d-dim" style="background:#6f9d7c; color:#6f9d7c; transform:translate3d(-50px,-75px,-40px);"></div>
        <div class="vec3d-point" title="Fiesta de Verano" style="background:#c99a4e; color:#c99a4e; transform:translate3d(75px,-55px,45px);"></div>
        <div class="vec3d-point" title="Golpe de Trueno" style="background:#c99a4e; color:#c99a4e; transform:translate3d(95px,15px,-45px);"></div>
        <div class="vec3d-point vec3d-dim" style="background:#c99a4e; color:#c99a4e; transform:translate3d(55px,65px,-70px);"></div>
        <div class="vec3d-point" title="Gris y Lluvioso" style="background:#5b7c99; color:#5b7c99; transform:translate3d(5px,80px,25px);"></div>
        <div class="vec3d-point vec3d-dim" style="background:#5b7c99; color:#5b7c99; transform:translate3d(-15px,95px,-30px);"></div>
        <div class="vec3d-point vec3d-dim" title="Una nueva búsqueda" style="background:#7c3aed; color:#7c3aed; transform:translate3d(0px,-100px,0px);"></div>
      </div>
    </div>
    <p style="margin-top:0.6rem; font-size:0.8rem; color:var(--text-dim); text-align:center;">
      <strong style="color:#6f9d7c;">Verde = tranquilas</strong>, <strong style="color:#c99a4e;">dorado = enérgicas</strong>, <strong style="color:#5b7c99;">azul = melancólicas</strong>. Quedaron agrupadas porque sus
      embeddings, sus vectores, terminaron cerca unos de otros: el modelo "entendió" que comparten
      significado, sin que nadie le haya dicho manualmente a qué grupo pertenece cada una.
    </p>
  </div>

  <!-- ===================== 4. SIMULACIÓN ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Simulación: buscando al vecino más cercano</h3>
    </div>
    <p>
      Antes de seguir con la teoría, juega con esto: cada punto de color es una canción de SoundFlow, ubicada
      según su "significado" en un mapa de 2 dimensiones (en la actividad real serán 384). Elige una búsqueda
      y mira cuál punto morado, tu consulta, aparece más cerca de cuáles canciones.
    </p>
    <div class="content-box vsim-demo" style="margin-top:0.6rem;">
      <svg viewBox="0 0 480 300" style="width:100%; max-width:520px; display:block; margin:0 auto;">
        <line class="vsim-line" data-query="a" x1="140" y1="120" x2="110" y2="90" stroke="#7c3aed" stroke-width="2" opacity="0"/>
        <line class="vsim-line" data-query="a" x1="140" y1="120" x2="170" y2="150" stroke="#7c3aed" stroke-width="2" opacity="0"/>
        <line class="vsim-line" data-query="b" x1="400" y1="125" x2="380" y2="90" stroke="#7c3aed" stroke-width="2" opacity="0"/>
        <line class="vsim-line" data-query="b" x1="400" y1="125" x2="420" y2="160" stroke="#7c3aed" stroke-width="2" opacity="0"/>
        <line class="vsim-line" data-query="c" x1="100" y1="160" x2="90" y2="230" stroke="#7c3aed" stroke-width="2" opacity="0"/>
        <line class="vsim-line" data-query="c" x1="100" y1="160" x2="110" y2="90" stroke="#7c3aed" stroke-width="2" opacity="0"/>

        <circle class="vsim-song" data-song="midnight" cx="110" cy="90" r="10" fill="#6f9d7c" stroke="var(--bg-card)" stroke-width="2"/>
        <text x="110" y="70" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#6f9d7c">Café de Medianoche</text>

        <circle class="vsim-song" data-song="deepwork" cx="170" cy="150" r="10" fill="#6f9d7c" stroke="var(--bg-card)" stroke-width="2"/>
        <text x="170" y="172" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#6f9d7c">Enfoque Profundo</text>

        <circle class="vsim-song" data-song="summer" cx="380" cy="90" r="10" fill="#c99a4e" stroke="var(--bg-card)" stroke-width="2"/>
        <text x="380" y="70" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#c99a4e">Fiesta de Verano</text>

        <circle class="vsim-song" data-song="thunder" cx="420" cy="160" r="10" fill="#c99a4e" stroke="var(--bg-card)" stroke-width="2"/>
        <text x="420" y="182" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#c99a4e">Golpe de Trueno</text>

        <circle class="vsim-song" data-song="gris" cx="90" cy="230" r="10" fill="#5b7c99" stroke="var(--bg-card)" stroke-width="2"/>
        <text x="90" y="252" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#5b7c99">Gris y Lluvioso</text>

        <circle class="vsim-marker" cx="0" cy="0" r="9" fill="#7c3aed" stroke="#fff" stroke-width="2" opacity="0"/>
      </svg>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-top:0.8rem; justify-content:center;">
        <button type="button" class="btn btn-secondary vsim-btn" data-query="a" data-point="140,120" data-nearest="midnight,deepwork" data-status="Buscando: &quot;Algo muy tranquilo para dormir&quot; → vecinos más cercanos: Café de Medianoche y Enfoque Profundo (ambas tranquilas e instrumentales).">🌙 Algo muy tranquilo para dormir</button>
        <button type="button" class="btn btn-secondary vsim-btn" data-query="b" data-point="400,125" data-nearest="summer,thunder" data-status="Buscando: &quot;Música con mucha energía para el gimnasio&quot; → vecinos más cercanos: Fiesta de Verano y Golpe de Trueno (ambas enérgicas y movidas).">💪 Música con energía para el gimnasio</button>
        <button type="button" class="btn btn-secondary vsim-btn" data-query="c" data-point="100,160" data-nearest="gris,midnight" data-status="Buscando: &quot;Sonidos de naturaleza y lluvia&quot; → vecinos más cercanos: Gris y Lluvioso y Café de Medianoche (ambas asociadas a la lluvia, aunque una es triste y la otra tranquila).">🌧️ Sonidos de naturaleza y lluvia</button>
      </div>
      <p class="vsim-status" style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim); min-height:2.4em; text-align:center;">Elige una búsqueda para ver cuáles canciones son sus vecinos más cercanos en el mapa del significado.</p>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed; margin-top:0.8rem;">
      <p style="margin:0;">
        Fíjate que "Sonidos de naturaleza y lluvia" quedó cerca tanto de una canción triste como de una
        tranquila: ambas comparten algo de significado con la lluvia, aunque una sea melancólica y la otra
        relajante. Con esto en mente, veamos una de las aplicaciones más importantes de esta búsqueda por
        significado: RAG.
      </p>
    </div>
  </div>

  <!-- ===================== 5. RAG ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>RAG: cómo un chatbot "consulta" tus documentos antes de responder</h3>
    </div>
    <p>
      Ya viste la definición corta de RAG en la terminología. Vale la pena entenderlo a fondo, porque es la
      razón por la que hoy <em>todo el mundo</em> necesita una base de datos vectorial: es el patrón que usan
      los chatbots que responden preguntas sobre documentos privados de una empresa, sobre un manual, o
      sobre tus propias notas, en vez de inventar la respuesta, primero <strong>buscan</strong>.
    </p>
    <div class="content-box" style="border-left:4px solid #b33a2e; margin-top:0.6rem;">
      <p style="margin:0 0 0.5rem;"><strong>Un LLM no es una base de datos con internet guardado adentro.</strong></p>
      <p style="margin:0;">
        Durante el entrenamiento se le muestran textos masivos, muchos tomados de la web, otros de libros o
        código, pero el modelo no los memoriza ni los deja guardados para consultarlos después. Lo que queda
        son los <strong>pesos</strong>: números ajustados que capturan patrones estadísticos del lenguaje, no
        una copia de los textos originales. Por eso, cuando responde, el LLM no está "buscando" un dato
        exacto: está <strong>generando</strong> la palabra más probable según esos patrones. Eso explica por
        qué puede "alucinar" (inventar algo plausible pero falso cuando no tiene un patrón claro), por qué
        tiene una fecha de corte de conocimiento, y por qué no puede saber algo específico y actualizado que
        nunca vio durante su entrenamiento, como la información privada de tu empresa. Ahí es exactamente
        donde entra RAG.
      </p>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed; margin-top:0.6rem;">
      <p style="margin:0;">
        Un modelo de lenguaje (LLM) por sí solo "sabe" lo que vio durante su entrenamiento. No conoce
        los documentos internos de tu empresa, ni las notas que escribiste ayer. RAG le da acceso a esa
        información <strong>sin tener que reentrenarlo</strong>: en el momento de responder, primero se
        recupera (<strong>Retrieval</strong>) la información relevante, y luego se le pasa al modelo para
        que la use al generar (<strong>Generation</strong>) su respuesta. De ahí el nombre completo:
        Retrieval-Augmented Generation, "generación aumentada con recuperación".
      </p>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:0.6rem;">
      <p style="margin:0 0 0.5rem;"><strong>¿Entonces búsqueda semántica y RAG son lo mismo?</strong></p>
      <p style="margin:0;">
        No exactamente: la búsqueda semántica es el <strong>ingrediente</strong>, RAG es la
        <strong>receta completa</strong>. Búsqueda semántica es justo lo que vas a construir hoy con
        SoundFlow: convertir una consulta en un vector, compararla por significado contra lo que hay
        guardado, y devolver los resultados más parecidos. <code>buscar_musica.py</code> se detiene ahí, sin
        involucrar ningún LLM.
      </p>
      <p style="margin:0.5rem 0 0;">
        RAG toma ese mismo paso (de hecho, es literalmente la fase de
        <strong>Retrieval</strong> que viste arriba) y le agrega un paso más: en vez de devolverle los
        resultados crudos al usuario, se los pasa como contexto a un LLM para que redacte una respuesta en
        lenguaje natural. Dicho de otra forma: toda RAG usa búsqueda semántica por debajo, pero no toda
        búsqueda semántica es RAG, depende de si al final hay un LLM generando una respuesta, o si el
        resultado de la búsqueda ya es la respuesta.
      </p>
    </div>

    <div class="content-box" style="overflow-x:auto; margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem; font-weight:600; text-align:center;">Construccion de una base de datos vectorial</p>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem; justify-content:center;">
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">📄🖼️🔊🎬<br>Datos no estructurados<br><span style="font-size:0.72rem; color:var(--text-dim);">texto, imagen, audio, video</span></div>
        <span style="color:var(--text-dim); font-size:1.1rem;">→</span>
        <div style="background:#f3ecf9; border:1px solid #8b7fb8; border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center; color:#4d3f6b;">🧠<br>Transformación a embeddings<br><span style="font-size:0.72rem;">modelo de embeddings (no es un LLM)</span></div>
        <span style="color:var(--text-dim); font-size:1.1rem;">→</span>
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">🔢<br>Datos vectoriales<br><span style="font-size:0.72rem; color:var(--text-dim);">[0.02, -0.18, 0.40, ...]</span></div>
        <span style="color:var(--text-dim); font-size:1.1rem;">→</span>
        <div style="background:#e9f2ec; border:1px solid #6f9d7c; border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center; color:#3f5c47;">🗄️<br>Base de datos vectorial</div>
      </div>
      <p style="margin:0.7rem 0 0; font-size:0.8rem; color:var(--text-dim); text-align:center;">
        No importa el tipo de dato de entrada: cualquier cosa que un modelo de IA pueda "leer" se convierte en
        el mismo tipo de salida, una lista de números, y termina guardada de la misma forma.
      </p>
    </div>

    <div class="content-box" style="overflow-x:auto; margin-top:0.6rem;">
      <p style="margin:0 0 0.6rem; font-weight:600; text-align:center;">LLM sin RAG: solo dos actores</p>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:1rem; justify-content:center; padding:0.5rem 0;">
        <div class="norag-box" style="background:var(--accent-soft); border:1px solid var(--border); text-align:center;"><span class="norag-emoji">🧑‍💻</span>Usuario</div>
        <span class="norag-arrow" style="color:var(--text-dim);">⇄</span>
        <div class="norag-box" style="background:#fbeceb; border:1px solid #b33a2e; text-align:center; color:#7a2921;"><span class="norag-emoji">🧠</span>LLM</div>
      </div>
      <ol style="margin:0.7rem 0 0; padding-left:1.3rem; font-size:0.8rem; color:var(--text-dim);">
        <li>El usuario le hace una pregunta al <strong style="color:#b33a2e;">LLM</strong>.</li>
        <li>El <strong style="color:#b33a2e;">LLM</strong> responde únicamente con lo que aprendió durante su
          entrenamiento (meses o años atrás), no consulta ninguna otra fuente.</li>
        <li>Si la pregunta es sobre tus documentos privados o algo muy reciente, el
          <strong style="color:#b33a2e;">LLM</strong> no lo sabe, y si no sabe algo, puede inventarlo.</li>
      </ol>
      <p style="margin:0.6rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">
        <strong>Ejemplos de LLM:</strong> GPT (OpenAI), Claude (Anthropic), Gemini (Google), Llama (Meta),
        Mistral (Mistral AI), Grok (xAI), DeepSeek, Qwen (Alibaba).
      </p>
    </div>
    <div class="content-box" style="overflow-x:auto; margin-top:0.6rem; border-left:4px solid #c99a4e;">
      <p style="margin:0 0 0.6rem; font-weight:600; text-align:center;">LLM con RAG</p>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.7rem; justify-content:center; padding:0.5rem 0;">
        <div class="norag-box" style="background:var(--accent-soft); border:1px solid var(--border); text-align:center;"><span class="norag-emoji">🧑‍💻</span>Usuario</div>
        <span class="norag-arrow" style="color:var(--text-dim);">→</span>
        <div class="norag-box" style="background:#fbeceb; border:1px solid #b33a2e; text-align:center; color:#7a2921;"><span class="norag-emoji">🧠</span>LLM</div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
          <span style="background:#c99a4e; color:#fff; border-radius:999px; padding:0.15rem 0.5rem; font-size:0.68rem; font-weight:700;">1. Retrieval</span>
          <span class="norag-arrow" style="color:var(--text-dim);">⇄</span>
        </div>
        <div class="norag-box" style="background:#e9f2ec; border:1px solid #6f9d7c; text-align:center; color:#3f5c47;"><span class="norag-emoji">🗄️</span>Base de datos vectorial</div>
      </div>
      <div style="text-align:center; margin:0.5rem 0;">
        <span style="background:#7c3aed; color:#fff; border-radius:999px; padding:0.15rem 0.6rem; font-size:0.68rem; font-weight:700;">2. Augmented Generation</span>
      </div>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.7rem; justify-content:center; padding:0.5rem 0;">
        <div class="norag-box" style="background:#fbeceb; border:1px solid #b33a2e; text-align:center; color:#7a2921;"><span class="norag-emoji">🧠</span>LLM responde<br><span style="font-size:0.7rem;">usando lo que encontró</span></div>
        <span class="norag-arrow" style="color:var(--text-dim);">→</span>
        <div class="norag-box" style="background:var(--accent-soft); border:1px solid var(--border); text-align:center;"><span class="norag-emoji">🧑‍💻</span>Usuario</div>
      </div>
      <ol style="margin:0.7rem 0 0; padding-left:1.3rem; font-size:0.8rem; color:var(--text-dim);">
        <li>El usuario le hace una pregunta al <strong style="color:#b33a2e;">LLM</strong>.</li>
        <li>Antes de responder, el <strong style="color:#b33a2e;">LLM</strong> hace una pausa: convierte la
          pregunta en un vector y consulta la base de datos vectorial, buscando entre los vectores que fueron
          los embeddings generados a partir de tus propios datos reales (los de la empresa) y muestra cuáles
          son los más parecidos a ese (eso es la <strong style="color:#b33a2e;">R</strong>, de
          <strong style="color:#b33a2e;">Retrieval</strong>).</li>
        <li>La base de datos vectorial le devuelve esos resultados al <strong style="color:#b33a2e;">LLM</strong>
          y esta se convierte en la materia prima con la que va a trabajar el
          <strong style="color:#b33a2e;">LLM</strong>.</li>
        <li>Con esos resultados como contexto, el <strong style="color:#b33a2e;">LLM</strong> redacta la
          respuesta en lenguaje natural (la <strong style="color:#b33a2e;">Augmented Generation</strong>,
          "generación aumentada" con esa información extra) y se la entrega al usuario.</li>
      </ol>
      <p style="margin:0.6rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">
        <strong>Ejemplos de LLM con RAG:</strong>
      </p>
      <ul style="margin:0.4rem 0 0; padding-left:1.2rem; font-size:0.78rem; color:var(--text-dim);">
        <li><strong>Notion AI:</strong> busca en tus propias páginas y documentos de Notion (no en la web)
          para responder preguntas sobre tu espacio de trabajo.</li>
        <li><strong>NotebookLM (Google):</strong> subes tus propios documentos (PDFs, notas, artículos) y te
          responde preguntas basándose solo en eso, es un ejemplo muy claro de RAG sobre datos personales.</li>
        <li><strong>Slack AI:</strong> busca y resume mensajes dentro de tu propio workspace de Slack antes
          de responder.</li>
        <li><strong>GitHub Copilot Chat:</strong> cuando le preguntas sobre tu propio código, indexa tu
          repositorio y usa esos archivos como contexto para responder o generar código.</li>
        <li><strong>Elicit / Consensus:</strong> asistentes de investigación académica, buscan en bases de
          artículos científicos y resumen los hallazgos relevantes a tu pregunta.</li>
        <li><strong>Amazon Rufus:</strong> el asistente de compras de Amazon, busca en el catálogo de
          productos y reseñas reales antes de recomendarte algo.</li>
      </ul>
    </div>

    <div class="content-box" style="overflow-x:auto; margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem; font-weight:600; text-align:center;">LLM con RAG: cómo funciona por dentro</p>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.6rem; justify-content:center;">
        <div style="background:#e9f2ec; border:1px solid #6f9d7c; border-radius:8px; padding:0.6rem 0.9rem; font-size:0.85rem; text-align:center; color:#3f5c47;">🗄️<br>Base de datos vectorial</div>
        <div style="display:flex; flex-direction:column; align-items:center; font-size:1.1rem; color:var(--text-dim);">
          <span style="background:#8b7fb8; color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:600; margin-bottom:2px;">2</span>
          ⇄
        </div>
        <div style="background:#fbeceb; border:1px solid #b33a2e; border-radius:8px; padding:0.6rem 0.9rem; font-size:0.85rem; text-align:center; color:#7a2921;">🧠<br>LLM</div>
        <div style="display:flex; flex-direction:column; align-items:center; font-size:1.1rem; color:var(--text-dim);">
          <span style="background:var(--accent); color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:600; margin-bottom:2px;">1</span>
          ⇄
        </div>
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.6rem 0.9rem; font-size:0.85rem; text-align:center;">🧑‍💻<br>Usuario (chat, navegador)</div>
      </div>
      <ol style="margin:0.7rem 0 0; padding-left:1.3rem; font-size:0.8rem; color:var(--text-dim);">
        <li>El usuario le habla al <strong style="color:#b33a2e;">LLM</strong> a través de una interfaz (un
          chat, un navegador).</li>
        <li>El <strong style="color:#b33a2e;">LLM</strong>, antes de responder, consulta la base de datos
          vectorial para traer información puntual, y puede volver a consultarla más de una vez dentro de la
          misma conversación.</li>
      </ol>
      <p style="margin:0.6rem 0 0; font-size:0.8rem; color:var(--text-dim); text-align:center;">
        Las tres fases internas de cómo se hace son (Indexing, Retrieval, Generation), y son el detalle de
        qué pasa exactamente dentro de esa flecha número 2.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>Fase 1. Indexing: preparar los documentos de antemano</strong></p>
    <div class="content-box" style="overflow-x:auto; margin-top:0.4rem;">
      <div style="display:flex; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; justify-content:center;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">📄 Documentos</div>
          <div class="indexing-example-step" style="animation-delay:0.1s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center;">Ej: "Manual de empleados" (40 páginas)</div>
        </div>
        <span style="color:var(--text-dim); font-size:1.1rem; margin-top:0.6rem;">→</span>
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">✂️ Se dividen en chunks</div>
          <div class="indexing-example-step" style="animation-delay:0.7s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center;">Ej: "Política de vacaciones: los empleados..."</div>
        </div>
        <span style="color:var(--text-dim); font-size:1.1rem; margin-top:0.6rem;">→</span>
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">🧠 Modelo de embeddings</div>
          <div class="indexing-example-step" style="animation-delay:1.3s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center; font-family:Consolas, monospace;">Ej: [0.12, -0.87, 0.34, ...]</div>
        </div>
        <span style="color:var(--text-dim); font-size:1.1rem; margin-top:0.6rem;">→</span>
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:#e9f2ec; border:1px solid #6f9d7c; border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center; color:#3f5c47;">🗄️ Base de datos vectorial</div>
          <div class="indexing-example-step" style="animation-delay:1.9s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center;">Ej: fila guardada con texto + vector</div>
        </div>
      </div>
    </div>
    <p style="margin-top:0.6rem;">
      Cada documento se parte en <strong>chunks</strong>, porque casi
      siempre son demasiado largos para convertirse en un solo embedding útil. Cada chunk pasa por el modelo
      de embeddings por separado, y su vector resultante se guarda en la base de datos vectorial junto con el
      texto original del chunk.
    </p>
    <p style="margin-top:0.5rem;">Al trocear hay que cuidar tres cosas:</p>
    <ul style="margin:0.4rem 0 0; padding-left:1.2rem; color:var(--text);">
      <li><strong>Tamaño del chunk:</strong> ni muy corto, se pierde contexto, ni muy largo, el embedding
        queda difuso.</li>
      <li><strong>Overlap entre chunks consecutivos:</strong> para no cortar una idea justo a la mitad,
        significa que, en vez de cortar los chunks uno justo después del otro sin tocarse, dejas que
        compartan un pedacito al final de uno y al principio del siguiente.</li>
      <li><strong>Dónde se corta:</strong> mejor en fin de párrafo u oración, encabezados, no a la fuerza por
        cantidad de caracteres.</li>
      <li><strong>Para código:</strong> se buscan los límites de función, clase o bloque, incluso usando el
        parser del lenguaje (el AST) para saber exactamente dónde termina una función, en vez de adivinar
        por indentación o líneas en blanco.</li>
    </ul>

    <p style="margin-top:1rem;"><strong>Fase 2. Retrieval: buscar lo relevante en el momento de la pregunta</strong></p>
    <div class="content-box" style="overflow-x:auto; margin-top:0.4rem;">
      <div style="display:flex; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; justify-content:center;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">❓ Pregunta del usuario</div>
          <div class="indexing-example-step" style="animation-delay:0.1s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center;">Ej: "¿Qué política de vacaciones tenemos?"</div>
        </div>
        <span style="color:var(--text-dim); font-size:1.1rem; margin-top:0.6rem;">→</span>
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">🧠 Mismo modelo de embeddings</div>
          <div class="indexing-example-step" style="animation-delay:0.7s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center; font-family:Consolas, monospace;">Ej: [0.09, -0.44, 0.21, ...]</div>
        </div>
        <span style="color:var(--text-dim); font-size:1.1rem; margin-top:0.6rem;">→</span>
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:#f3ecf9; border:1px solid #8b7fb8; border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center; color:#4d3f6b;">🔍 Comparación de similitud contra todos los chunks</div>
          <div class="indexing-example-step" style="animation-delay:1.3s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center;">Ej: se compara contra todos los vectores guardados</div>
        </div>
        <span style="color:var(--text-dim); font-size:1.1rem; margin-top:0.6rem;">→</span>
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; max-width:150px;">
          <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.5rem 0.8rem; font-size:0.82rem; text-align:center;">📎 Chunk(s) más parecido(s)</div>
          <div class="indexing-example-step" style="animation-delay:1.9s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.35rem 0.5rem; font-size:0.66rem; color:var(--text-dim); text-align:center;">Ej: "Política de vacaciones: los empleados..."</div>
        </div>
      </div>
    </div>
    <p style="margin-top:0.6rem;">
      La pregunta del usuario se convierte en un vector usando <strong>el mismo modelo</strong> de embeddings
      que se usó para indexar los documentos. Ese vector se compara, con similitud de coseno, contra todos
      los vectores guardados.
    </p>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0 0 0.5rem; font-weight:600; text-align:center; color:#5b7c99;">¿Cómo se calcula esa comparación con la similitud del coseno?</p>
      <p style="margin:0 0 0.5rem; padding:0.5rem 0.7rem; background:rgba(91,124,153,0.10); border-radius:6px; font-family:Consolas, monospace; font-size:0.85rem; color:var(--text); text-align:center;">
        cos(θ) = (A · B) / (‖A‖ ‖B‖)
      </p>
      <p style="margin:0 0 0.5rem; font-size:0.8rem; color:#b33a2e; font-weight:600;">La función coseno
        funciona así: entre más pequeño es el ángulo entre dos vectores, más cerca de 1 está su coseno.</p>
      <p style="margin:0; font-size:0.8rem; color:var(--text-dim);">
        <strong>A · B</strong> (el numerador) es el producto punto entre los dos vectores. <strong>‖A‖</strong>
        y <strong>‖B‖</strong> (el denominador) son el "largo" de cada vector.
      </p>
      <p style="margin:0.5rem 0 0; font-size:0.8rem; color:var(--text-dim);">
        El resultado va de -1 a 1: entre más cerca de 1, más parecidos son en significado (ángulo pequeño
        entre ellos).
      </p>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center; margin-top:0.7rem;">
        <svg viewBox="0 0 200 150" width="220" height="165" xmlns="http://www.w3.org/2000/svg">
          <line x1="60" y1="130" x2="60" y2="15" stroke="var(--text-dim)" stroke-width="1"/>
          <text x="63" y="20" font-size="9" fill="var(--text-dim)">Z</text>
          <line x1="60" y1="130" x2="180" y2="95" stroke="var(--text-dim)" stroke-width="1"/>
          <text x="182" y="98" font-size="9" fill="var(--text-dim)">Y</text>
          <line x1="60" y1="130" x2="20" y2="150" stroke="var(--text-dim)" stroke-width="1"/>
          <text x="5" y="150" font-size="9" fill="var(--text-dim)">X</text>
          <line x1="60" y1="130" x2="120" y2="55" stroke="#5b7c99" stroke-width="2.4"/>
          <text x="122" y="52" font-size="9" fill="#5b7c99">A (pregunta)</text>
          <line x1="60" y1="130" x2="135" y2="70" stroke="#c99a4e" stroke-width="2.4"/>
          <text x="137" y="82" font-size="9" fill="#c99a4e">B (chunk)</text>
          <path d="M100 90 A 26 26 0 0 1 108 78" fill="none" stroke="var(--text-dim)" stroke-width="1"/>
          <text x="95" y="100" font-size="9" fill="var(--text-dim)">θ</text>
        </svg>
      </div>
      <p style="margin:0.6rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">
        Ejemplo simplificado a 3 dimensiones:
      </p>
      <ul style="margin:0.4rem 0 0; padding-left:1.2rem; font-size:0.78rem; color:var(--text-dim);">
        <li>A = (2, 3, 1), B = (1, 4, 0)</li>
        <li>A · B = (2×1)+(3×4)+(1×0) = 14</li>
        <li>‖A‖ y ‖B‖ (la magnitud o "largo" del vector) se calculan como en el teorema de Pitágoras, con la
          raíz cuadrada de la suma de cada componente al cuadrado:<br>
          ‖A‖ = √(2²+3²+1²) = √14 ≈ 3.74<br>
          ‖B‖ = √(1²+4²+0²) = √17 ≈ 4.12</li>
        <li>cos(θ) = 14 / (3.74 × 4.12) ≈ 0.91, un ángulo pequeño, es decir, muy parecidos</li>
      </ul>
      <p style="margin:0.5rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">
        En la realidad cada vector tiene cientos de dimensiones, no 3, pero el cálculo es exactamente el
        mismo ya que nuestro cerebro solo puede visualizar hasta 3 dimensiones (largo, ancho, alto), es el
        límite de lo que podemos dibujar o imaginar espacialmente.
      </p>
      <p style="margin:0.7rem 0 0; font-size:0.8rem; color:var(--text-dim); text-align:center;">
        Aunque no se pueda dibujar, sí se puede "ver" de otra forma: un vector de 384 dimensiones es
        literalmente una lista de 384 números.
      </p>
      <p style="margin:0.5rem 0 0; font-family:Consolas, monospace; font-size:0.72rem; color:var(--text-dim); text-align:center; word-break:break-word;">
        [0.023, -0.451, 0.128, 0.309, -0.087, 0.442, ..., 0.156, -0.203, 0.078] (384 valores en total)
      </p>
      <p style="margin:0.6rem 0 0; font-size:0.78rem; color:var(--text-dim); text-align:center;">
        Cada número no tiene un significado que se pueda señalar (no existe "la dimensión del tempo"), son
        patrones abstractos aprendidos por el modelo. Una forma visual de representarlos, sin necesidad de un
        espacio 3D, es pintar cada número como un cuadrito de color según su valor (azul = negativo, rojo =
        positivo, entre más intenso el color, más lejos de cero):
      </p>
      <div style="display:flex; flex-wrap:wrap; gap:1px; justify-content:center; max-width:340px; margin:0.6rem auto 0;"><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span><span style="width:7px; height:7px; background:#c65b4f;"></span><span style="width:7px; height:7px; background:#d47d72;"></span><span style="width:7px; height:7px; background:#dfa197;"></span><span style="width:7px; height:7px; background:#e8c1ba;"></span><span style="width:7px; height:7px; background:#f2ddd9;"></span><span style="width:7px; height:7px; background:#d8dce2;"></span><span style="width:7px; height:7px; background:#1f4e8c;"></span><span style="width:7px; height:7px; background:#3b6ea5;"></span><span style="width:7px; height:7px; background:#5b8ebd;"></span><span style="width:7px; height:7px; background:#7aa8d1;"></span><span style="width:7px; height:7px; background:#9dc0e0;"></span><span style="width:7px; height:7px; background:#c2d8ee;"></span><span style="width:7px; height:7px; background:#b33a2e;"></span></div>
      <p style="margin:0.5rem 0 0; font-size:0.72rem; color:var(--text-dim); text-align:center;">
        (los 384 valores del vector)
      </p>
    </div>
    <div class="content-box" style="border-left:4px solid #8b7fb8; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem; font-weight:600; color:#8b7fb8;">¿Coseno, euclidiana, Manhattan, Hamming o Jaccard? Regla práctica</p>
      <p style="margin:0 0 0.5rem; font-size:0.85rem; color:var(--text-dim);">
        Cada una de estas distancias es una fórmula distinta para calcular qué tan cerca o qué tan lejos están
        dos puntos (vectores):
      </p>
      <ul style="margin:0; padding-left:1.2rem; font-size:0.85rem; color:var(--text-dim);">
        <li><strong>Similitud de coseno (cosine distance):</strong> cuando importa la dirección del vector (el
          significado), no su magnitud. Es la más usada en embeddings de texto.
          <br><span style="color:#2f8f8f;">Ej: comparar el significado de dos textos, como las descripciones de
          canciones en SoundFlow-Pro, sin importar cuál descripción es más larga.</span></li>
        <li><strong>Distancia euclidiana (L2 distance):</strong> mide la distancia "en línea recta" entre dos
          puntos, cuando la magnitud sí importa.
          <br><span style="color:#2f8f8f;">Ej: coordenadas geográficas (qué tan lejos está una tienda de otra),
          características físicas de personas (estatura, peso) para agruparlas, o clustering (K-means).</span></li>
        <li><strong>Distancia de Manhattan (L1 distance):</strong> cuando hay muchas dimensiones o valores
          atípicos (outliers), o cuando moverse "en cuadrícula" tiene sentido físico.
          <br><span style="color:#2f8f8f;">Ej: cuántas cuadras hay que caminar en una ciudad con calles en
          cuadrícula (sin cortar en diagonal), o comparar consumos/precios donde no quieres que un valor
          extremo pese demasiado.</span></li>
        <li><strong>Distancia de Hamming:</strong> cuenta en cuántas posiciones son distintos dos vectores del
          mismo tamaño. Se usa con datos binarios (0 y 1) o códigos de longitud fija.
          <br><span style="color:#2f8f8f;">Ej: comparar dos huellas digitales de archivos (hashes) o dos
          secuencias de ADN de la misma longitud, contando en cuántas posiciones difieren.</span></li>
        <li><strong>Distancia de Jaccard:</strong> mide qué tan parecidos son dos conjuntos, comparando cuántos
          elementos tienen en común contra cuántos tienen en total. Se usa con datos categóricos o conjuntos,
          no con vectores densos como los embeddings.
          <br><span style="color:#2f8f8f;">Ej: comparar las etiquetas de dos artículos de blog, o los
          ingredientes de dos recetas, para ver qué porcentaje comparten.</span></li>
      </ul>
      <div style="margin-top:0.7rem; padding:0.7rem 0.9rem; border-radius:8px; border-left:3px solid #c99a4e; background:rgba(201,154,78,0.12);">
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
          Dato curioso: la distancia de <strong style="color:#c99a4e;">Manhattan</strong> se llama así por la
          ciudad de Manhattan, en Estados Unidos, porque allá las calles están organizadas en cuadrícula: para
          ir de un punto a otro no puedes cortar en diagonal atravesando los edificios, tienes que caminar
          cuadra por cuadra, sumando distancias horizontales y verticales. Por eso a esta distancia también se
          le llama "taxicab distance" (distancia de taxi).
        </p>
      </div>
    </div>

    <p style="margin-top:1rem;"><strong>Fase 3. Augmented Generation: responder usando lo que se encontró</strong></p>
    <div class="content-box" style="margin-top:0.4rem;">
      <p style="margin:0 0 0.5rem; font-weight:600;">Prompt armado para el LLM:</p>
      <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">"Contesta esta pregunta: <em>[pregunta
        original del usuario]</em>, con base en esta información: <em>[el o los chunks más relevantes que
        encontró el Retrieval]</em>."</p>
      <div class="indexing-example-step" style="animation-delay:0.4s; background:var(--bg-card); border:1px dashed var(--border); border-radius:6px; padding:0.5rem 0.7rem; font-size:0.78rem; color:var(--text-dim); margin-top:0.7rem;">
        <strong>Ej:</strong> "Contesta esta pregunta: <em>¿Qué política de vacaciones tenemos?</em>, con base
        en esta información: <em>Política de vacaciones: los empleados tienen derecho a 15 días al año...</em>."
      </div>
      <div class="indexing-example-step" style="animation-delay:1s; background:#e9f2ec; border:1px dashed #6f9d7c; border-radius:6px; padding:0.5rem 0.7rem; font-size:0.78rem; color:#3f5c47; margin-top:0.5rem;">
        <strong>Respuesta del LLM:</strong> "Según el manual de empleados, tienen derecho a 15 días de
        vacaciones al año."
      </div>
    </div>
    <p style="margin-top:0.6rem;">
      El LLM no inventa la respuesta desde cero ni "adivina" con lo que aprendió hace meses: la construye a
      partir del texto real que se le acaba de pasar como contexto. Por eso RAG reduce (aunque no elimina)
      las respuestas inventadas, y por eso puede responder sobre información privada o muy reciente que el
      modelo nunca vio durante su entrenamiento.
    </p>

    <p style="margin-top:1rem;"><strong>El flujo completo, de punta a punta</strong></p>
    <div class="content-box" style="overflow-x:auto; margin-top:0.4rem;">
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.4rem; justify-content:center; margin-bottom:0.6rem;">
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center;">📄 Documento</div>
        <span style="color:var(--text-dim);">→</span>
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center;">✂️ Chunks</div>
        <span style="color:var(--text-dim);">→</span>
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center;">🧠 Embeddings</div>
        <span style="color:var(--text-dim);">→</span>
        <div style="background:#e9f2ec; border:1px solid #6f9d7c; border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center; color:#3f5c47;">🗄️ Vector DB</div>
      </div>
      <div style="text-align:center; color:var(--text-dim); font-size:0.85rem; margin:0.2rem 0;">↓ &nbsp; se compara contra &nbsp; ↓</div>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.4rem; justify-content:center; margin-bottom:0.6rem;">
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center;">❓ Pregunta</div>
        <span style="color:var(--text-dim);">→</span>
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center;">🧠 Embedding de la pregunta</div>
      </div>
      <div style="text-align:center; color:var(--text-dim); font-size:1.1rem; margin:0.2rem 0;">↓</div>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.4rem; justify-content:center;">
        <div style="background:#f3ecf9; border:1px solid #8b7fb8; border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center; color:#4d3f6b;">🔍 Comparación de similitud</div>
        <span style="color:var(--text-dim);">→</span>
        <div style="background:var(--accent-soft); border:1px solid var(--border); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center;">📎 Chunk relevante + pregunta original</div>
        <span style="color:var(--text-dim);">→</span>
        <div style="background:#fbeceb; border:1px solid #b33a2e; border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center; color:#7a2921;">🤖 El LLM razona con ese contexto</div>
        <span style="color:var(--text-dim);">→</span>
        <div style="background:#fdf3e6; border:1px solid #c99a4e; border-radius:8px; padding:0.4rem 0.6rem; font-size:0.75rem; text-align:center; color:#8a6a2f;">✅ Respuesta</div>
      </div>
    </div>
  </div>

  <!-- ===================== 5B. HUGGING FACE ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Antes de programar: ¿qué es Hugging Face?</h3>
    </div>
    <div class="content-box" style="border-left:4px solid #ffa500;">
      <p style="margin:0;">
        Hugging Face (<a href="https://huggingface.co" target="_blank" rel="noopener">huggingface.co</a>) es
        una plataforma y comunidad donde miles de desarrolladores y empresas publican modelos de IA
        <strong>ya entrenados</strong>, listos para descargar y usar sin tener que entrenarlos desde cero. Es
        algo así como "GitHub, pero para modelos de IA": en vez de compartir solo código, la gente comparte
        modelos, datasets y demos.
      </p>
      <p style="margin:0.6rem 0 0;">
        Además del repositorio (el "Hub"), Hugging Face mantiene librerías de código abierto muy usadas, como
        <code>transformers</code> (para LLMs) y <code>sentence-transformers</code>, la misma librería que vas
        a usar en el laboratorio para descargar <code>paraphrase-multilingual-MiniLM-L12-v2</code>.
      </p>
      <p style="margin:0.6rem 0 0;">
        Hoy aloja más de 2 millones de modelos, más de 500.000 datasets y más de un millón de demos
        interactivas, la mayoría publicados gratis por las mismas empresas y universidades que los entrenaron
        (Google, Meta, laboratorios académicos), como parte de una cultura de investigación abierta. No solo
        hay modelos de embeddings, también de texto, visión, audio y multimodales; la idea de fondo siempre
        es la misma: reutilizar lo que ya entrenaron equipos grandes de investigación, en vez de entrenar
        algo desde cero.
      </p>
    </div>

    <p style="margin-top:1rem;"><strong>Tipos de modelos que vas a encontrar ahí</strong></p>
    <div class="concept-grid" style="margin-top:0.6rem;">
      <div class="concept-card">
        <h4 style="color:#b33a2e;">LLMs (generación de texto)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Modelos que generan texto, como
          GPT-2, Llama o Mistral.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">SentenceTransformer</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Convierten texto en vectores densos
          (embeddings), para búsqueda semántica. Este es el tipo que vas a usar: <code>paraphrase-multilingual-MiniLM-L12-v2</code>
          es un SentenceTransformer.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">CrossEncoder</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Comparan dos textos directamente entre
          sí. Más precisos que los embeddings, pero más lentos, se suelen usar para reordenar los mejores
          resultados de una búsqueda ya hecha.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">SparseEncoder</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Embeddings "dispersos", mezclan la
          idea de búsqueda tradicional por palabras clave con la de embeddings.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Visión, audio, multimodales</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">También hay modelos para imágenes,
          audio, video, y modelos que combinan varias modalidades a la vez (como CLIP o Gemini Embedding 2).</p>
      </div>
    </div>

    <p style="margin-top:1.2rem;"><strong>Recomendaciones para elegir un modelo</strong></p>
    <ul style="margin:0.4rem 0 0; padding-left:1.2rem; color:var(--text);">
      <li><strong>Ranking MTEB (Massive Text Embedding Benchmark):</strong> el punto de partida para elegir
        un modelo de embeddings, compara miles de modelos en decenas de tareas reales (búsqueda,
        clasificación, similitud, etc.).</li>
      <li><strong>Tamaño vs. calidad:</strong> modelos más grandes (más dimensiones, más parámetros) suelen
        dar mejores resultados, pero son más lentos y pesados de correr. Para un proyecto de práctica como
        SoundFlow-Pro, un modelo liviano como <code>paraphrase-multilingual-MiniLM-L12-v2</code> (384 dimensiones) es más que
        suficiente.</li>
      <li><strong>Descargas y "likes":</strong> un buen indicador de qué tan probado y confiable es un
        modelo dentro de la comunidad.</li>
      <li><strong>Idioma:</strong> algunos modelos son solo en inglés, otros son multilingües, hay que
        revisar que soporte el idioma que vas a usar. Por eso en SoundFlow-Pro usamos
        <code>paraphrase-multilingual-MiniLM-L12-v2</code> y no un modelo solo-inglés: tus descripciones
        están en español.</li>
      <li><strong>Licencia:</strong> revisar si el modelo se puede usar libremente, algunos tienen
        restricciones de uso comercial.</li>
    </ul>

    <p style="margin-top:1.2rem;"><strong>Hugging Face no es la única opción</strong></p>
    <div class="content-box" style="overflow-x:auto; margin-top:0.6rem;">
      <p style="margin:0 0 0.6rem; font-weight:600;">APIs privadas (de pago)</p>
      <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
        Empresas como <strong>OpenAI</strong> (GPT, text-embedding-3), <strong>Google</strong> (Gemini,
        Gemini Embedding), <strong>Anthropic</strong> (Claude, recomienda Voyage AI para embeddings) y
        <strong>Cohere</strong> (embed-v4) ofrecen sus modelos solo a través de una API. Ahí no descargas
        nada: le mandas tu texto por internet, el modelo corre en los servidores de esa empresa, y te
        devuelve el resultado. Suele ser más simple de usar, pero cuesta dinero por cada consulta y depende
        de que ese servicio esté disponible.
      </p>
      <p style="margin:0.7rem 0 0; font-weight:600;">LangChain (y similares, como LlamaIndex)</p>
      <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
        LangChain no es un proveedor de modelos, es una librería que te permite conectar con muchos
        proveedores distintos (OpenAI, Anthropic, Google, Hugging Face, etc.) usando una sola interfaz
        consistente, en vez de aprender la forma particular de cada uno. Es muy usada para construir
        aplicaciones de RAG, "cadenas" de pasos, y agentes, sin tener que reescribir la lógica cada vez que
        cambias de proveedor.
      </p>
    </div>
  </div>

  <!-- ===================== 6. OBJETIVO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <div style="display:flex; flex-direction:column;">
        <p style="margin:0 0 0.2rem; font-size:0.78rem; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:var(--text-dim);">Laboratorio de clase</p>
        <h3 style="margin:0;">Objetivo de la actividad</h3>
      </div>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0;">
        Comprender y aplicar el concepto de <strong>Embeddings</strong> y <strong>Bases de Datos
        Vectoriales</strong> para resolver problemas de búsqueda por similitud semántica, permitiendo que
        SoundFlow recomiende contenido basado en el <strong>significado</strong> y no solo en palabras clave
        exactas.
      </p>
    </div>
    <p>
      Vamos a construir <strong>SoundFlow-Pro</strong> paso a paso: un puente entre Python y una base de
      datos en la nube (Supabase), un modelo de IA que convierte descripciones musicales en vectores, y una
      función de búsqueda que encuentra canciones por "vibra", aunque el usuario no use ninguna de las
      palabras exactas que hay guardadas.
    </p>
    <div class="concept-grid" style="margin-top:0.6rem;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Paso 1</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Configurar el entorno: proyecto en
          Supabase, entorno virtual de Python, y el puente (<code>database.py</code>) entre los dos.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">Paso 2</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">El cerebro vectorial: convertir
          descripciones de canciones en embeddings y guardarlas en la nube.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#8b7fb8;">Paso 3</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Búsqueda inteligente: convertir lo que
          escribe el usuario en un vector y encontrar las canciones más parecidas en significado.</p>
      </div>
    </div>

    <p style="margin-top:1.2rem;"><strong>Recapitulando, antes de tocar código, esto es exactamente lo que vamos a hacer:</strong></p>
    <div class="numbered-grid numbered-grid-2col" style="margin-top:0.6rem;">
      <div class="numbered-card">
        <div class="num" style="color:var(--accent);">1. Crear el proyecto en Supabase</div>
        <p>Un proyecto nuevo en la nube, y dentro de él, activar <code>pgvector</code>: la extensión que le
          enseña a PostgreSQL a guardar y comparar vectores.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#6f9d7c;">2. Preparar el entorno de Python</div>
        <p>Un entorno virtual (venv) aislado, y <code>database.py</code> como el puente que conecta tu código
          con ese proyecto de Supabase.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#8b7fb8;">3. Generar los embeddings</div>
        <p>Descargar un modelo de embeddings <strong>ya entrenado</strong> (<code>paraphrase-multilingual-MiniLM-L12-v2</code>,
          modelo de Hugging Face) y usarlo para convertir la descripción de cada canción en un vector de 384
          dimensiones o números, guardado en <code>canciones_vectoriales</code>.</p>
      </div>
      <div class="numbered-card">
        <div class="num" style="color:#c99a4e;">4. Crear la función de comparación</div>
        <p>Una función SQL (<code>buscar_canciones</code>) que mide qué tan parecidos son dos vectores con
          similitud de coseno, directamente dentro de la base de datos.</p>
      </div>
      <div class="numbered-card" style="grid-column: 1 / -1;">
        <div class="num" style="color:#b33a2e;">5. Escribir la búsqueda inteligente</div>
        <p><code>buscar_musica.py</code> convierte lo que escribe el usuario en un vector, con el mismo
          modelo del paso 3, y le pide a esa función SQL que devuelva las canciones más parecidas en
          significado, sin usar ningún LLM, es búsqueda semántica pura.</p>
      </div>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed; margin-top:0.8rem;">
      <p style="margin:0;">
        Al final de estos 5 pasos, si escribes <strong>"música para un día lluvioso"</strong>, SoundFlow-Pro
        va a encontrar "Gris y Lluvioso", aunque esa frase exacta nunca haya estado escrita en la base de
        datos. Eso es, en concreto, lo que vas a construir a partir de aquí.
      </p>
    </div>
  </div>

  <!-- ===================== PASO 1 ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Paso 1: Configurar entorno aislado (venv) y archivo de secretos (.env)</h3>
    </div>
    <p>
      Antes de escribir una sola línea de IA, necesitamos construir el puente sólido entre tu código de
      Python y la base de datos en la nube.
    </p>
    <ol style="margin:0.6rem 0 0; padding-left:1.3rem;">
      <li>Ingresa a <a href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a>.</li>
      <li>Regístrate con GitHub o Gmail.</li>
      <li>Te va a pedir crear una <strong>organización</strong> antes de dejarte crear un proyecto: es solo
        una forma de agrupar proyectos, ponle el nombre <strong>estructuras_y_bases_de_datos</strong> y
        continúa, no hay nada más que configurar.</li>
      <li>Haz clic en <strong>"New project"</strong>.</li>
      <li>Escribe el nombre <strong>SoundFlow-Pro</strong>, crea una contraseña segura y haz clic en
        <strong>"Create new project"</strong>.</li>
      <li>En la barra lateral izquierda, haz clic en <strong>Settings</strong> y copia estos dos datos. Vas
        a encontrarlos en dos apartados distintos, con un ejemplo de cómo se ven:
        <div class="concept-grid" style="grid-template-columns: 1fr 1fr; margin-top:0.4rem;">
          <div class="concept-card">
            <h4 style="font-size:0.9rem;">Data API / API URL</h4>
            <p style="margin:0; font-family:Consolas, monospace; font-size:0.75rem; color:var(--text-dim); word-break:break-all;">https://abcd1234efgh.supabase.co/rest/v1/</p>
          </div>
          <div class="concept-card">
            <h4 style="font-size:0.9rem;">API Keys / Publishable key</h4>
            <p style="margin:0; font-family:Consolas, monospace; font-size:0.75rem; color:var(--text-dim); word-break:break-all;">sb_publishable_ABCdef123GHIjkl456MNOpqr</p>
          </div>
        </div>
        <p style="margin:0.6rem 0 0; font-size:0.78rem; color:#b33a2e;">
          <strong>Ojo:</strong> el dashboard muestra la URL con <code>/rest/v1/</code> al final, pero para tu
          <code>.env</code> solo copia la parte base, sin ese sufijo (ej: <code>https://abcd1234efgh.supabase.co</code>).
          La librería <code>supabase-py</code> ya agrega <code>/rest/v1/</code> por su cuenta, y si lo dejas
          repetido vas a ver el error "Invalid path specified in request URL" (PGRST125).
        </p>
      </li>
      <li style="margin-top:0.6rem;">En el explorador de Windows, crea una carpeta llamada
        <code>soundflow-ai</code> y arrástrala dentro de VS Code.</li>
      <li style="margin-top:0.4rem;">Ahora crea el <strong>entorno virtual</strong> (venv): un espacio
        aislado donde se instalan las librerías de este proyecto, para que no se mezclen con las de otros
        proyectos de Python en tu computadora.</li>
    </ol>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code># Crear el entorno virtual
python -m venv venv

# Activar el entorno virtual (Windows)
.\\venv\\Scripts\\activate

# Activar el entorno virtual (Mac/Linux)
source venv/bin/activate

# Si Windows bloquea la activación, da permiso con este comando primero:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\\venv\\Scripts\\Activate.ps1</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        Si no activas el entorno virtual, las librerías se instalan en cualquier otro lado de tu computadora,
        y tu proyecto no las va a encontrar cuando las necesite. Sabes que está activo porque el nombre
        <code>(venv)</code> aparece al inicio de la línea en tu terminal.
      </p>
    </div>

    <p style="margin-top:0.8rem;">Con el entorno activo, instala el traductor de Supabase y el lector de configuraciones:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code>pip install supabase python-dotenv</code></pre>
    </div>

    <p style="margin-top:0.8rem;">
      En la raíz de <code>soundflow-ai</code>, crea un archivo llamado <code>.env</code> con las credenciales
      que copiaste de Supabase:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">.env</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code>SUPABASE_URL=https://tu_proyecto.supabase.co
SUPABASE_KEY=tu_publishable_key_que_encontramos_antes</code></pre>
    </div>
    <div class="content-box" style="border-left:4px solid #b33a2e; margin-top:0.6rem;">
      <p style="margin:0;">
        El <code>.env</code> guarda datos sensibles fuera del código fuente. Nunca lo subas a un repositorio
        público. Es la misma idea de "no dejar las llaves pegadas en la puerta" que ya viste con las
        credenciales de base de datos en semanas anteriores.
      </p>
    </div>

    <p style="margin-top:0.8rem;">
      Crea un archivo nuevo llamado <code>database.py</code> dentro de tu carpeta <code>soundflow-ai</code>,
      y copia ahí todo el siguiente código: es el archivo que establece el túnel oficial entre Python y la
      nube.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">database.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.85rem;">import os
from dotenv import load_dotenv
from supabase import create_client, Client

# 1. Cargamos el archivo .env
load_dotenv()

# 2. Traemos las variables (URL y llave) desde el .env
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# --- Debugeamos: confirmamos que sí se leyeron ---
print(f"DEBUG: La URL encontrada es: {url}")
print(f"DEBUG: La KEY encontrada es: {key}")
# --------------------------------------------------

# 3. Intentamos conectar
if not url or not key:
    raise ValueError("¡Error! No se encontraron las credenciales en el archivo .env")

supabase: Client = create_client(url, key)
print("¡Puente hacia la nube establecido!")</code></pre>
    </div>

    <p style="margin-top:0.8rem;">
      Para confirmar que todo quedó bien conectado, crea otro archivo llamado <code>test_supabase.py</code>.
      Todavía no hemos creado ninguna tabla (eso viene en el siguiente paso), así que esta prueba no
      consulta ninguna tabla: solo confirma que el cliente de Supabase se pudo crear con la URL y la
      Publishable key correctas.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">test_supabase.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.85rem;">from database import supabase

def probar_conexion():
    try:
        # Todavía no existe ninguna tabla, así que no consultamos ninguna.
        # Si "supabase" se creó sin lanzar una excepción, la conexión es válida.
        print("Conexión exitosa. Cliente de Supabase listo para usarse:", supabase)
    except Exception as e:
        print(f"Error de conexión: {e}")

if __name__ == "__main__":
    probar_conexion()</code></pre>
    </div>
    <p style="margin-top:0.6rem;">Ejecuta en la terminal:</p>
    <div class="code-block" style="margin-top:0.4rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code>python test_supabase.py</code></pre>
    </div>
    <p style="margin-top:0.6rem;">Si todo salió bien, va a verse así:</p>
    <div class="code-block" style="margin-top:0.4rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal (resultado esperado)</span>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.8rem; color:#7ee787;">DEBUG: La URL encontrada es: https://abcd1234efgh.supabase.co
DEBUG: La KEY encontrada es: sb_publishable_ABCdef123GHIjkl456MNOpqr
¡Puente hacia la nube establecido!
Conexión exitosa. Cliente de Supabase listo para usarse: &lt;supabase._sync.client.Client object at 0x0000019CFB7520F0&gt;</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        <strong>¿Te sale error de que Python está instalado en la carpeta global?</strong> (algo como
        <code>C:\\Users\\...\\AppData\\Local\\Programs\\Python\\Python312\\...</code>). Eso pasa porque tu
        proyecto busca las herramientas dentro de <code>soundflow-ai\\venv</code>, y como la librería está
        "afuera" (en la instalación global), no la encuentra. Soluciónalo diciéndole explícitamente que use
        el Python del entorno virtual activo:
      </p>
      <pre style="overflow-x:auto; margin:0.6rem 0 0;"><code>python -m pip install python-dotenv supabase
python -m pip show python-dotenv
python test_supabase.py</code></pre>
    </div>

    <p style="margin-top:0.8rem;">
      <strong>8.</strong> Ahora, <strong style="color:#6f9d7c;">en Supabase</strong>, crearemos la extensión
      <code>vector</code> donde se van a guardar los embeddings, y crearemos la tabla
      <code>canciones_vectoriales</code>.
      <br><br>
      Ve a <strong>SQL Editor</strong> en la barra lateral izquierda, pega el siguiente código en el editor y
      dale a <strong>"Run"</strong> / <strong>"Run without RLS"</strong>. Esto crea la extensión
      <code>vector</code> y la tabla <code>canciones_vectoriales</code> directamente en tu base de datos en
      la nube:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">SQL Editor (Supabase)</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.85rem;">-- 1. Activamos la extensión para vectores
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Creamos la tabla
CREATE TABLE canciones_vectoriales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT,
  artista TEXT,
  descripcion_emocional TEXT,
  embedding VECTOR(384)
);</code></pre>
    </div>
    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:0.6rem;">
      <p style="margin:0 0 0.5rem; font-weight:600; color:#6f9d7c;">¿Qué está haciendo este código, línea por línea?</p>
      <ul style="margin:0; padding-left:1.2rem; font-size:0.85rem; color:var(--text-dim);">
        <li><strong>Línea 1, <code>CREATE EXTENSION IF NOT EXISTS vector;</code>:</strong> activa
          <code>pgvector</code> en tu base de datos, esto es lo único que hace falta para que PostgreSQL
          reconozca el tipo de columna <code>VECTOR</code>. No crea ningún dato todavía.</li>
        <li><strong>Línea 2, <code>CREATE TABLE canciones_vectoriales (...)</code>:</strong> crea la tabla
          que va a funcionar como tu base de datos vectorial: cada fila va a ser una canción con toda su
          información junta.</li>
        <li><strong><code>id UUID PRIMARY KEY DEFAULT gen_random_uuid()</code>:</strong> un identificador
          único que se genera solo, en vez de un número que sube de 1 en 1 como en tablas relacionales
          anteriores.</li>
        <li><strong><code>titulo</code>, <code>artista</code>, <code>descripcion_emocional</code> (<code>TEXT</code>):</strong>
          los datos normales de cada canción, texto plano, como cualquier columna que ya conoces.</li>
        <li><strong><code>embedding VECTOR(384)</code>:</strong> la columna nueva. Aquí es donde, más
          adelante, Python va a guardar el vector de 384 números que genera <code>sentence-transformers</code>
          a partir de <code>descripcion_emocional</code>. Por ahora la tabla queda vacía, esta columna solo
          define el "molde" que va a recibir esos números.</li>
      </ul>
      <p style="margin:0.6rem 0 0; font-size:0.85rem; color:var(--text-dim);">
        En resumen: con estas dos líneas no estás generando ningún embedding todavía, solo estás preparando
        el lugar donde se va a guardar cada uno cuando corras <code>insertar_canciones.py</code>.
      </p>
    </div>
    <div class="content-box" style="border-left:4px solid #8b7fb8; margin-top:0.6rem;">
      <p style="margin:0 0 0.5rem; font-weight:600; color:#8b7fb8;">¿Por qué usamos UUID aquí, y cómo funciona?</p>
      <p style="margin:0 0 0.5rem; font-size:0.85rem; color:var(--text-dim);">
        Un <code>UUID</code> es un identificador único generado al azar (larguísimo, tipo
        <code>a1b2c3d4-...</code>), en vez de contar 1, 2, 3... como <code>BIGINT GENERATED ALWAYS AS IDENTITY</code>.
        No revela el orden ni la cantidad de filas, y es prácticamente imposible que se repita aunque
        generes datos desde sistemas distintos. <code>gen_random_uuid()</code> es la función de PostgreSQL
        que lo genera, y <code>DEFAULT</code> hace que se calcule solo si no le mandas un <code>id</code>
        desde Python.
      </p>
      <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
        Aquí lo usamos porque es el estándar que trae Supabase en la mayoría de sus tablas, y porque en un
        proyecto real donde varias fuentes insertan canciones al mismo tiempo, un <code>UUID</code> generado
        en cada lugar nunca choca con otro.
      </p>
    </div>
    <div class="content-box" style="border-left:4px solid #5b7c99; margin-top:0.6rem;">
      <p style="margin:0;">
        <code>VECTOR(384)</code> es un tipo de columna nuevo, donde será un vector de 384 dimensiones o una
        lista de 384 números por fila (el embedding de esa canción).
        <code>CREATE EXTENSION vector</code> es lo que le enseña a PostgreSQL, la misma base de datos
        relacional que ya conoces, a entender ese tipo de columna. Esta extensión se llama
        <code>pgvector</code>.
      </p>
    </div>
    <p style="margin-top:0.6rem;">
      Con la tabla <code>canciones_vectoriales</code> creada, ya tienes todo listo para pasar al siguiente
      paso: por ahora la tabla existe pero está vacía, porque todavía no hemos inyectado música.
    </p>
  </div>

  <!-- ===================== PASO 2 ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Paso 2: Procesamiento y cerebro vectorial</h3>
    </div>
    <p>
      Para que la IA entienda la música, necesitamos una librería que convierta palabras en vectores (listas
      de números). Instálala en la terminal de VS Code, ten paciencia mientras descarga el modelo de IA:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code>python -m pip install sentence-transformers</code></pre>
    </div>

    <div class="content-box" style="border-left:4px solid #8b7fb8; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;"><strong>¿Qué es exactamente esta librería, <code>sentence-transformers</code>?</strong></p>
      <p style="margin:0;">
        Está construida sobre la base de <strong style="color:#b33a2e;"><code>transformers</code> de Hugging
        Face</strong>, que accede a miles de modelos de IA ya entrenados como (BERT, GPT, T5, y cientos más)
        y trae las herramientas para cargarlos, tokenizarlos (convertir texto en las piezas que el modelo
        entiende) y correrlos, sin importar para qué tarea sean: clasificar texto, traducir, generar texto,
        resumir, responder preguntas, etc.
      </p>
      <p style="margin:0.6rem 0 0;">
        Su trabajo es convertir cada
        frase en <strong>un solo vector, de forma independiente</strong>, para que esos vectores se puedan
        comparar después con similitud de coseno. Además sirve de "puente" fácil
        hacia Hugging Face: te deja cargar modelos de embeddings ya entrenados, como
        <code>paraphrase-multilingual-MiniLM-L12-v2</code>, con una sola línea (<code>model.encode(...)</code>), sin lidiar tú
        mismo con tokenización ni con la arquitectura del modelo por dentro.
      </p>
    </div>

    <div class="content-box" style="border-left:4px solid #5b7c99; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;"><strong>¿Qué es exactamente ese "modelo de IA" <code>paraphrase-multilingual-MiniLM-L12-v2</code>, con el que vamos a trabajar?</strong></p>
      <p style="margin:0;">
        <code>paraphrase-multilingual-MiniLM-L12-v2</code> no es un LLM generativo como GPT: es un <strong>modelo
        de embeddings</strong>, entrenado para convertir texto en un vector de significado, en más de 50
        idiomas (incluido español). Se creó con una técnica llamada <strong>destilación de conocimiento</strong>:
        un modelo "maestro" en inglés le enseña a un modelo "estudiante" multilingüe a producir vectores
        parecidos para frases equivalentes en distintos idiomas. Vive en <strong>Hugging Face</strong>, la
        plataforma desde donde lo descargas gratis al escribir
        <code>SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')</code>.
      </p>
    </div>


    <p style="margin-top:0.8rem;">
      Crea <code>insertar_canciones.py</code>: convierte la descripción de cada canción en un vector de 384
      dimensiones y la guarda en la nube.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">insertar_canciones.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.82rem;">from sentence_transformers import SentenceTransformer
from database import supabase

# 1. Cargamos el modelo de IA y usa la clase SentenceTransformer para cargar el modelo llamado 'paraphrase-multilingual-MiniLM-L12-v2'
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

def insertar_cancion(titulo, artista, descripcion):
    print(f"Generando vector para: {titulo}...")
    # 2. La magia: convertimos el texto de la descripción en 384 números
    vector = model.encode(descripcion).tolist()
    # 3. Armamos la fila y la mandamos a la nube
    data = {
        "titulo": titulo,
        "artista": artista,
        "descripcion_emocional": descripcion,
        "embedding": vector
    }
    try:
        supabase.table("canciones_vectoriales").insert(data).execute()
        print(f"'{titulo}' guardada con éxito en la nube.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Insertemos 30 canciones con "vibras" bien distintas entre sí
    insertar_cancion("Café de Medianoche", "Ritmos Lo-Fi", "Música instrumental tranquila para estudiar en la noche con lluvia, con ritmos suaves y repetitivos, sin voces, ideal para relajarse, bajar el ritmo y quedarse dormido poco a poco")
    insertar_cancion("Fiesta de Verano", "DJ Sol", "Ritmos electrónicos movidos para bailar en la playa bajo el sol, con mucha energía, bajos intensos y un ritmo acelerado pensado para fiestas al aire libre con amigos")
    insertar_cancion("Golpe de Trueno", "Furia Eléctrica", "Guitarras distorsionadas muy potentes y batería rápida, ideal para entrenar en el gimnasio, descargar adrenalina o hacer ejercicio pesado, con un sonido agresivo y lleno de energía")
    insertar_cancion("Gris y Lluvioso", "Piano Sentimental", "Una melodía de piano muy lenta y triste que transmite soledad, perfecta para un día de nostalgia en casa, sin ritmo acelerado, ideal para momentos de calma y reflexión mientras llueve afuera")
    insertar_cancion("Enfoque Profundo", "Ondas de Enfoque", "Ritmos electrónicos constantes y suaves sin voces, diseñados para entrar en estado de flujo mientras programas o estudias, con un volumen bajo y sin sobresaltos que ayuda a mantener la concentración por horas")
    insertar_cancion("Bajo la Luna de Plata", "Trío Nocturno", "Balada romántica lenta con guitarra acústica, perfecta para una cena a la luz de las velas, con un ritmo pausado y una voz suave pensada para momentos íntimos en pareja")
    insertar_cancion("Perreo Sin Control", "MC Candela", "Reggaetón pegajoso y sensual con bajo potente, ideal para una fiesta hasta el amanecer, con un ritmo acelerado y letras pensadas para bailar pegado y sin parar")
    insertar_cancion("Sabor Caribeño", "Orquesta Tropical", "Salsa alegre y bailable con trompetas vibrantes, perfecta para una celebración familiar, con un ritmo rápido y contagioso que anima a todos a moverse en la pista")
    insertar_cancion("Humo de Café", "Cuarteto Azul", "Jazz suave con saxofón relajado, ideal para una tarde tranquila leyendo en una cafetería, con un ritmo pausado y una atmósfera cálida sin sobresaltos")
    insertar_cancion("Camino Sin Rumbo", "Blues del Sur", "Blues melancólico con guitarra eléctrica lenta, transmite nostalgia y desamor, con un ritmo arrastrado y una voz cargada de tristeza que invita a la introspección")
    insertar_cancion("Ira de Acero", "Bestia de Hierro", "Metal pesado con riffs agresivos y gritos intensos, para liberar rabia y frustración, con un sonido ruidoso, rápido y lleno de tensión")
    insertar_cancion("Batalla Final", "Orquesta Sinfónica del Norte", "Música orquestal épica con coros poderosos, ideal para una escena de película de acción, con crescendos intensos y una energía dramática y arrolladora")
    insertar_cancion("Levántate y Lucha", "Rimas del Barrio", "Hip-hop motivacional con letras de superación personal, ideal para entrenar en el gimnasio o empezar el día con energía, con un ritmo marcado y una actitud positiva y enérgica")
    insertar_cancion("Pensamientos en Voz Baja", "Habitación 204", "Indie introspectivo con voz susurrada y guitarra minimalista, para momentos de reflexión a solas, con un ritmo lento y un ambiente íntimo y calmado")
    insertar_cancion("Rutas del Viajero", "Cuerdas al Viento", "Folk acústico con guitarra y armónica, perfecta para un viaje por carretera con amigos, con un ritmo relajado pero animado, ideal para cantar en grupo")
    insertar_cancion("Respiración Consciente", "Sonidos del Bosque", "Música ambiental suave con sonidos de la naturaleza, ideal para meditar o practicar yoga, sin ritmo marcado, pensada para relajar la mente y bajar el estrés antes de dormir")
    insertar_cancion("Cumbia de mi Tierra", "Los Herederos", "Cumbia alegre y festiva con acordeón, perfecta para una reunión familiar de fin de semana, con un ritmo animado que invita a bailar en grupo")
    insertar_cancion("Neón de los 80", "Retro Wave", "Synthwave nostálgico con sintetizadores brillantes, evoca las noches de una ciudad ochentera, con un ritmo constante y una energía retro entre melancólica y bailable")
    insertar_cancion("Promesa Eterna", "Cuarteto Real", "Vals romántico y elegante, perfecto para el primer baile de una boda, con un ritmo suave y ceremonioso pensado para momentos especiales en pareja")
    insertar_cancion("Voz del Barrio", "MC Justicia", "Rap con letras de crítica social sobre la vida en la ciudad, crudo y directo, con un ritmo marcado y una energía combativa e intensa")
    insertar_cancion("Lágrimas de Ayer", "Bolero del Recuerdo", "Bolero lento y triste sobre un amor que ya no volverá, con mucho sentimiento, un ritmo pausado y una voz cargada de nostalgia")
    insertar_cancion("Pasos en la Oscuridad", "Sombras del Ático", "Banda sonora tensa e inquietante con cuerdas disonantes, ideal para una escena de suspenso, con silencios incómodos y una atmósfera oscura y alerta")
    insertar_cancion("Brisa de Coco", "Costa Serena", "Reggae relajado con ritmo suave, perfecto para un atardecer en la playa sin prisas, con un tempo lento y una sensación de calma tropical")
    insertar_cancion("Domingo de Sol", "Mañanas Felices", "Pop alegre y ligero con guitarras brillantes, ideal para un desayuno soleado en familia, con un ritmo animado pero suave, sin ser una canción para fiesta nocturna")
    insertar_cancion("Bachata de mi Vida", "Los Enamorados", "Bachata romántica y sensual, perfecta para bailar pegados con la persona que quieres, con un ritmo marcado pero cadencioso pensado para el baile en pareja")
    insertar_cancion("Rebeldía Total", "Puños en Alto", "Punk rápido y crudo con letras de protesta, para quienes quieren romper las reglas, con acordes agresivos y un ritmo acelerado sin pausas")
    insertar_cancion("Alma en Llamas", "Voces del Sur", "Soul profundo con una voz llena de emoción, transmite pasión y sufrimiento a la vez, con un ritmo pausado y arreglos cálidos de metales")
    insertar_cancion("Fiesta en el Barrio", "Cumbia Brava", "Cumbia villera con mucho ritmo y coros gritados, ideal para una fiesta callejera, con un tempo rápido y una energía ruidosa y festiva")
    insertar_cancion("Teclas Serenas", "Piano de Estudio", "Piano instrumental suave y repetitivo, diseñado para acompañar largas horas de estudio o lectura, con un volumen bajo, sin letras y un ritmo calmado que ayuda a concentrarse o relajarse antes de dormir")
    insertar_cancion("Saltando y Riendo", "Banda Infantil Alegre", "Canción infantil juguetona con ritmo saltarín, perfecta para que los niños bailen y se diviertan, con voces alegres y un tempo rápido pensado para jugar")</code></pre>
    </div>
    <div class="content-box" style="margin-top:0.6rem;">
      <p style="margin:0;">
        <code>model.encode(descripcion)</code> es el corazón de toda la actividad: toma un texto en español
        y devuelve un <strong>embedding</strong>, una lista de 384 números que representa su significado.
        Nunca escribes esos números a mano; el modelo ya viene entrenado para producirlos.
      </p>
    </div>
    <p style="margin-top:0.8rem;">Ejecuta el script:</p>
    <div class="code-block" style="margin-top:0.4rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code>python insertar_canciones.py</code></pre>
    </div>
    <p style="margin-top:0.6rem;">
      Al ejecutarlo pasan dos cosas en cadena, por cada canción: primero
      <code>model.encode(descripcion)</code> genera el vector de 384 números localmente en tu computadora
      con <code>paraphrase-multilingual-MiniLM-L12-v2</code>, y luego
      <code>supabase.table("canciones_vectoriales").insert(data).execute()</code> manda esa fila completa
      (título, artista, descripción y el vector) a la nube, a tu proyecto de Supabase.
    </p>
    <p style="margin-top:0.6rem;">
      Verifica en Supabase, en <strong>Table Editor &gt; canciones_vectoriales</strong>: en la columna
      <code>embedding</code> vas a ver una lista interminable de números por cada canción. Eso es la música
      procesada por una Inteligencia Artificial.
    </p>
  </div>

  <!-- ===================== PASO 3 ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Paso 3: Búsqueda inteligente</h3>
    </div>
    <p>Vamos a crear un buscador que encuentra canciones por "sentimiento". Primero, en Supabase creamos una función que vive dentro de la base de datos y hace la comparación matemática:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">SQL Editor (Supabase)</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.82rem;">-- Creamos (o reemplazamos, si ya existía) una función llamada "buscar_canciones"
CREATE OR REPLACE FUNCTION buscar_canciones (
  query_embedding VECTOR(384), -- El vector de la pregunta del usuario, ya convertido por Python
  match_threshold FLOAT,       -- Qué tan parecidas deben ser las canciones (0 a 1) para contar como resultado
  match_count INT              -- Cuántos resultados como máximo queremos que devuelva
) RETURNS TABLE ( -- La forma de la tabla de resultados que va a devolver
  id UUID,
  titulo TEXT,
  artista TEXT,
  similarity FLOAT
) LANGUAGE plpgsql AS $$ -- plpgsql es el lenguaje de PostgreSQL para escribir funciones con lógica
BEGIN
  RETURN QUERY -- Todo lo que devuelva el SELECT de abajo se convierte en el resultado de la función
  SELECT
    cv.id,       -- "cv" es el alias que le dimos a la tabla canciones_vectoriales, para escribir menos
    cv.titulo,
    cv.artista,
    1 - (cv.embedding <=> query_embedding) AS similarity -- El cálculo clave: distancia de coseno convertida en similitud (0 a 1)
  FROM canciones_vectoriales cv
  WHERE 1 - (cv.embedding <=> query_embedding) > match_threshold -- Descarta las canciones demasiado distintas
  ORDER BY similarity DESC -- Las más parecidas primero
  LIMIT match_count; -- Cuántos resultados como máximo
END;
$$;</code></pre>
    </div>
    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:0.6rem;">
      <p style="margin:0;">
        <code>cv.embedding &lt;=&gt; query_embedding</code> es el operador de <code>pgvector</code> que
        calcula la <strong>distancia de coseno</strong> entre el vector de cada canción y el vector de la
        búsqueda. <code>1 - distancia</code> la convierte en <strong>similitud</strong>: mientras más
        cercana a 1, más parecidas en significado. <code>match_threshold</code> descarta las canciones
        demasiado distintas, y <code>match_count</code> limita cuántos resultados queremos.
      </p>
    </div>

    <p style="margin-top:0.8rem;">Ahora, en VS Code, crea <code>buscar_musica.py</code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">buscar_musica.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code style="font-size:0.82rem;"># Importamos la clase que sabe convertir texto en vectores
from sentence_transformers import SentenceTransformer
# Importamos el cliente de Supabase que ya conectamos en database.py
from database import supabase

# Cargamos el MISMO modelo que usó insertar_canciones.py, es obligatorio que sea igual
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

def buscar_por_vibra(consulta_usuario):
    print(f"Buscando canciones para: '{consulta_usuario}'...")
    # 1. Convertimos la búsqueda del usuario en un vector, con el MISMO modelo
    vector_busqueda = model.encode(consulta_usuario).tolist()
    # 2. Llamamos a la función de Supabase para comparar vectores
    # Nota: usamos rpc (Remote Procedure Call) para que la base de datos haga la matemática
    try:
        res = supabase.rpc('buscar_canciones', {
            'query_embedding': vector_busqueda,
            'match_threshold': 0.35, # Qué tan parecidos deben ser (0 a 1)
            'match_count': 5         # Cuántos resultados queremos
        }).execute()
        # 3. res.data es la lista de canciones que devolvió la función de Supabase
        print("\\nRecomendaciones de SoundFlow AI:")
        for cancion in res.data:
            # Recorremos cada canción encontrada y mostramos su similitud (0 a 1)
            print(f"{cancion['titulo']} - {cancion['artista']} (Similitud: {cancion['similarity']:.2f})")
    except Exception as e:
        # Si algo falla (por ejemplo, la función no existe todavía), lo avisamos sin tumbar el programa
        print(f"Error en la búsqueda: {e}")
        print("Tip: ¿Ya creaste la función 'buscar_canciones' en el SQL Editor?")

# Solo se ejecuta si corres este archivo directamente (no si lo importas desde otro script)
if __name__ == "__main__":
    buscar_por_vibra("necesito algo para bailar y pasarla bien con amigos")</code></pre>
    </div>
    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:0.6rem;">
      <p style="margin:0 0 0.5rem;"><strong>¿Qué es <code>rpc</code>?</strong></p>
      <p style="margin:0;">
        RPC significa <strong>Remote Procedure Call</strong> (llamado a procedimiento remoto): te deja
        invocar una función que vive en otro lugar, aquí, dentro de la base de datos, como si fuera una
        función normal de tu código, aunque en realidad viaja por una petición HTTP hasta el servidor.
      </p>
    </div>
    <p style="margin-top:0.6rem;">Ejecuta la búsqueda:</p>
    <div class="code-block" style="margin-top:0.4rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre style="overflow-x:auto;"><code>python buscar_musica.py</code></pre>
    </div>

    <p style="margin-top:0.8rem;">Intenta agregar 3 búsquedas más, cambiando el texto de <code>buscar_por_vibra(...)</code>, las mismas 3 que probaste en la simulación al inicio de la clase:</p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr 1fr; margin-top:0.4rem;">
      <div class="concept-card">
        <h4>Prueba 1</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">"Algo muy tranquilo para dormir"</p>
      </div>
      <div class="concept-card">
        <h4>Prueba 2</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">"Música con mucha energía para el gimnasio"</p>
      </div>
      <div class="concept-card">
        <h4>Prueba 3</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">"Sonidos de naturaleza y lluvia"</p>
      </div>
    </div>
    <div class="content-box" style="border-left:4px solid #7c3aed; margin-top:0.8rem;">
      <p style="margin:0;">
        Lo impresionante: aunque no uses las mismas palabras que en la descripción guardada, la IA va a
        encontrar la canción que más se acerque al <strong>sentimiento</strong> de tu búsqueda. Eso es
        exactamente lo que una consulta <code>WHERE ... LIKE</code> nunca podría hacer.
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
        <p>1. ¿Qué avance de 2013 fue el primer ladrillo de todo lo que hoy conocemos como embeddings?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">FAISS</button>
          <button type="button" class="quiz-option" data-correct="true">Word2Vec</button>
          <button type="button" class="quiz-option" data-correct="false">pgvector</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Qué problema resuelve un algoritmo como HNSW?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Traducir texto a otros idiomas</button>
          <button type="button" class="quiz-option" data-correct="true">Encontrar los vectores más cercanos a uno dado, sin tener que compararlo contra todos los demás uno por uno</button>
          <button type="button" class="quiz-option" data-correct="false">Encriptar las contraseñas de los usuarios</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Qué evento de noviembre de 2022 disparó la demanda masiva de bases de datos vectoriales?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">El lanzamiento de PostgreSQL 15</button>
          <button type="button" class="quiz-option" data-correct="true">El lanzamiento de ChatGPT y la popularización del patrón RAG</button>
          <button type="button" class="quiz-option" data-correct="false">El cierre de Facebook</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. ¿Qué le agrega <code>pgvector</code> a PostgreSQL?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Un panel de administración gráfico</button>
          <button type="button" class="quiz-option" data-correct="true">Un tipo de columna VECTOR y operadores para comparar vectores</button>
          <button type="button" class="quiz-option" data-correct="false">Soporte para bases de datos NoSQL</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Qué es un embedding?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Una contraseña encriptada</button>
          <button type="button" class="quiz-option" data-correct="true">Una lista de números (vector) que representa el significado de un texto</button>
          <button type="button" class="quiz-option" data-correct="false">Un tipo de índice B-Tree más rápido</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. La similitud de coseno mide principalmente...</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Qué tan largos son los dos vectores</button>
          <button type="button" class="quiz-option" data-correct="true">El ángulo entre los dos vectores</button>
          <button type="button" class="quiz-option" data-correct="false">Cuántos números en común tienen los dos vectores</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué significa RAG (Retrieval-Augmented Generation)?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Un tipo de red neuronal para generar imágenes</button>
          <button type="button" class="quiz-option" data-correct="true">Buscar información relevante por significado y dársela como contexto a un modelo de lenguaje antes de que responda</button>
          <button type="button" class="quiz-option" data-correct="false">Un protocolo de seguridad para bases de datos</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. ¿Para qué sirve el entorno virtual (venv) en este proyecto?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Para conectar directamente con Supabase</button>
          <button type="button" class="quiz-option" data-correct="true">Para aislar las librerías de este proyecto, sin mezclarlas con otras instalaciones de Python en la computadora</button>
          <button type="button" class="quiz-option" data-correct="false">Para generar los embeddings más rápido</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. ¿Qué hace exactamente <code>model.encode(descripcion)</code> en <code>insertar_canciones.py</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Encripta el texto por seguridad</button>
          <button type="button" class="quiz-option" data-correct="true">Convierte el texto de la descripción en un vector de 384 números que representa su significado</button>
          <button type="button" class="quiz-option" data-correct="false">Traduce el texto a otro idioma</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. En la función SQL <code>buscar_canciones</code>, ¿qué calcula <code>cv.embedding &lt;=&gt; query_embedding</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Una resta entre dos columnas numéricas</button>
          <button type="button" class="quiz-option" data-correct="true">La distancia de coseno entre el vector de la canción y el vector de la búsqueda</button>
          <button type="button" class="quiz-option" data-correct="false">El número de palabras en común</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>11. ¿Para qué sirve <code>match_threshold</code> en la búsqueda?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Para limitar cuántas canciones puede tener la tabla</button>
          <button type="button" class="quiz-option" data-correct="true">Para descartar canciones cuya similitud sea demasiado baja como para ser un resultado relevante</button>
          <button type="button" class="quiz-option" data-correct="false">Para acelerar la conexión con Supabase</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>12. ¿Por qué el modelo usado en <code>insertar_canciones.py</code> y en <code>buscar_musica.py</code> debe ser exactamente el mismo (<code>paraphrase-multilingual-MiniLM-L12-v2</code>)?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque solo ese modelo funciona con Supabase</button>
          <button type="button" class="quiz-option" data-correct="true">Porque cada modelo construye su propio "mapa del significado"; comparar vectores generados por modelos distintos no tiene sentido</button>
          <button type="button" class="quiz-option" data-correct="false">Porque los otros modelos son de pago</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

    </div>
  </div>

  <!-- ===================== RECURSOS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Recursos y referencias</h3>
    </div>
    <p style="line-height:1.9;">
      · Aprender Big Data (2026). Descubre Las Bases de Datos VECTORIALES [Video]. YouTube. youtube.com/watch?v=NxvuhoXDAZ8<br>
      · KodeKloud (2025). ¿Cómo funciona una base de datos vectorial? [Video]. YouTube. youtube.com/watch?v=VVNYQKDLY5s<br>
      · CodelyTV (2025). Qué son las BÚSQUEDAS SEMÁNTICAS y los EMBEDDINGS: IA con tu base de datos [Video]. YouTube. youtube.com/watch?v=5rvUTeb0be4<br>
      · CodelyTV (2025). Dónde y cuándo generar los Embeddings (Programa IA) [Video]. YouTube. youtube.com/watch?v=HHr96KF4fWQ<br>
      · BettaTech (2025). Dame 30 Minutos y te enseño a implementar un RAG con Embeddings [Video]. YouTube. youtube.com/watch?v=lBimeKh88OU<br>
      · Real Python (2026). Python Virtual Environments: A Primer. realpython.com/python-virtual-environments-a-primer<br>
      · Supabase (2026). AI &amp; Vectors. supabase.com/docs/guides/ai<br>
      · Supabase (2026). What are embeddings? supabase.com/docs/guides/ai/concepts<br>
      · Supabase (2026). Semantic search. supabase.com/docs/guides/ai/semantic-search<br>
      · Supabase (2026). Structured and Unstructured. supabase.com/docs/guides/ai/structured-unstructured<br>
      · sbert (2026). SentenceTransformers Documentation. sbert.net<br>
      · Weaviate (2026). Métricas de distancia en la búsqueda vectorial. weaviate.io/blog/distance-metrics-in-vector-search
    </p>
  </div>
`;
