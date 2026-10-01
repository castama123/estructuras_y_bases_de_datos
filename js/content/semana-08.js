// Contenido de la Semana 8: Clase 1 = "Estación del Éxito", la semana de sustentación final.
// Sigue el mismo patrón que semana-01.js ... semana-07.js:
// variable global window.WEEK_CONTENT_8_1, leída por semana.html.
// El contenido de esta semana sigue el formato oficial "The SoundFlow Chaos Challenge" tal como
// está definido en el formulario del núcleo (4 Cámaras de Prueba), adaptado al horario real de
// clase (un solo día, martes, de 6:15 p.m. a 9:40 p.m., con un margen de 5 min entre equipo y
// equipo, 10 equipos) y a los 10 equipos del curso.

window.WEEK_CONTENT_8_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">Estación del Éxito: The SoundFlow Chaos Challenge</h2>

  <p style="margin-top:0;">
    Llegamos a la última estación del Journey Map. Esta clase es la
    <strong>sustentación final</strong>, donde cada equipo demuestra, en vivo y sobre su
    propia versión de SoundFlow-AI, que su sistema resiste el caos: fallos a mitad de una
    transacción, intentos de ataque, búsquedas que no usan palabras exactas, y preguntas directas
    sobre por qué tomaron cada decisión técnica.
  </p>

  <!-- ===================== 1. QUÉ ES ESTA SUSTENTACIÓN ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>¿Qué vas a hacer en esta sustentación?</h3>
    </div>
    <p>
      Cada equipo presenta de forma <strong>grupal</strong>, con <strong>demostración en vivo</strong>
      sobre su propia base de datos en Supabase y su propio código, apoyados en diapositivas o
      gráficos que ayuden a explicar lo que está pasando en pantalla. No es una exposición teórica:
      es someter la aplicación a fallos reales, frente al profesor, y mostrar que el sistema responde
      como debería.
    </p>
    <div class="content-box" style="border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.5rem;"><strong style="color:#b33a2e;">Todos deben exponer</strong></p>
      <p style="margin:0;">
        La exposición será grupal: cada integrante del equipo debe tomar la palabra y mostrar al menos
        una parte de la demo en vivo. Pero la nota será individual, evaluando el conocimiento propio de
        cada estudiante.
      </p>
    </div>
  </div>

  <!-- ===================== 2. LAS 4 CÁMARAS DE PRUEBA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Las 4 Cámaras de Prueba</h3>
    </div>
    <p>
      El profesor va a inducir fallos controlados sobre tu propia aplicación, uno por uno, en cuatro
      "cámaras" distintas. Cada una valida un pedazo distinto de lo que construiste a lo largo del
      semestre:
    </p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:#b33a2e;">Cámara 1: El Vacío Atómico</h4>
        <p style="margin:0 0 0.4rem; font-size:0.78rem; color:#1a1a1a;">Valida: Semanas 2 y 7</p>
        <p style="margin:0 0 0.4rem; font-size:0.85rem; color:#1a1a1a;">
          <strong>El caos:</strong> inicias un "Suscripción Premium" que toca dos tablas, pero usando a
          propósito un <code style="color:#b33a2e;">user_id</code> que no existe en <code>perfiles</code>. El
          <code style="color:#b33a2e;">INSERT</code> en <code>historial_pagos</code> viola la
          <strong>Foreign Key</strong> y dispara el <code style="color:#b33a2e;">EXCEPTION</code> de la función,
          de forma inmediata y 100% repetible, sin tener que cronometrar ni interrumpir nada a mano.
        </p>
        <p style="margin:0 0 0.4rem; font-size:0.85rem; color:#1a1a1a;">
          <strong>La prueba:</strong> en tu propia terminal ves el error de la función (algo como
          <code>"El upgrade falló, se revirtió todo: ..."</code>), y entras a Supabase y demuestras que la
          transacción hizo <code style="color:#b33a2e;">ROLLBACK</code> perfecto: no quedó ningún pago suelto
          en <code>historial_pagos</code> para ese intento fallido.
        </p>
        <ol style="margin:0; padding-left:1.1rem; font-size:0.85rem; color:#1a1a1a; line-height:1.6;">
          <li>Crea la función en Supabase (<code style="color:#b33a2e;">INSERT</code> &rarr;
            <code style="color:#b33a2e;">UPDATE</code>, con <code>SECURITY DEFINER</code>).</li>
          <li>Corre tu script de Python con un <code>user_id</code> inventado, que no exista en
            <code>perfiles</code>.</li>
          <li>Valida en los logs que se hizo <code style="color:#b33a2e;">ROLLBACK</code> (deben aparecer el
            error <code style="color:#b33a2e;">P0001</code> y el <code style="color:#b33a2e;">Warning 400</code>).</li>
        </ol>
        <p style="margin:0.6rem 0 0; font-size:0.85rem; color:#1a1a1a;">
          <strong>Nota:</strong> para que el <code style="color:#b33a2e;">INSERT</code> funcione desde Python
          necesitas agregar <code style="color:#b33a2e;">SECURITY DEFINER</code> al final de la función. Sin
          eso, RLS bloquea el <code>INSERT</code> con el error
          <code style="color:#b33a2e;">new row violates row-level security policy</code>, porque en la Semana 7
          solo creaste una política de <code>SELECT</code> para <code>historial_pagos</code>, no de
          <code>INSERT</code>.
        </p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7c3aed;">Cámara 2: El Intento de Infiltración</h4>
        <p style="margin:0 0 0.4rem; font-size:0.78rem; color:#1a1a1a;">Valida: Semana 7</p>
        <p style="margin:0 0 0.4rem; font-size:0.85rem; color:#1a1a1a;">
          <strong>El caos:</strong> aquí tú actúas como atacante de tu propia aplicación. Ya autenticado
          como un usuario de prueba, intentas leer el perfil de "un vecino" (otro <code>user_id</code>)
          usando el cliente de Supabase.
        </p>
        <p style="margin:0; font-size:0.85rem; color:#1a1a1a;">
          <strong>La prueba:</strong> muestras que el intento de leer el perfil ajeno devolvió una lista
          vacía. Eso confirma que tu <strong>RLS</strong> es un escudo real, no solo teoría.
        </p>
        <ol style="margin:0.6rem 0 0; padding-left:1.1rem; font-size:0.85rem; color:#1a1a1a; line-height:1.6;">
          <li>Corre <code>probar_rls.py</code> autenticado como un usuario de prueba, apuntando al
            <code>user_id</code> de otro.</li>
          <li>Muestra en consola y en Supabase que el ataque falló: <code>probar_rls.py</code> imprime
            una lista vacía.</li>
        </ol>
      </div>
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Cámara 3: El Oráculo Semántico</h4>
        <p style="margin:0 0 0.4rem; font-size:0.78rem; color:#1a1a1a;">Valida: Semana 6</p>
        <p style="margin:0 0 0.4rem; font-size:0.85rem; color:#1a1a1a;">
          <strong>El caos:</strong> en vez de buscar "Rock", tú mismo escribes un prompt abstracto,
          metafórico o "ruidoso", por ejemplo "música que se siente como un atardecer en una ciudad
          futurista, pero con un poco de tristeza".
        </p>
        <p style="margin:0; font-size:0.85rem; color:#1a1a1a;">
          <strong>La prueba:</strong> demuestras cómo los <strong>embeddings</strong> y la similitud de
          coseno encuentran canciones que coinciden con el sentimiento, no con las palabras. Eso valida
          la "mente" de tu buscador semántico. Además, juega con el <code style="color:#5b7c99;">match_threshold</code>
          y explica qué pasa cuando subes o bajas ese umbral.
        </p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Cámara 4: Prueba de Fuego de Conocimiento</h4>
        <p style="margin:0 0 0.4rem; font-size:0.78rem; color:#1a1a1a;">Valida: todo el semestre</p>
        <p style="margin:0 0 0.4rem; font-size:0.85rem; color:#1a1a1a;">
          <strong>El caos:</strong> reciben preguntas al azar para poner a prueba su conocimiento real,
          no memorizado.
        </p>
        <p style="margin:0; font-size:0.85rem; color:#1a1a1a;">
          <strong>La prueba:</strong> el equipo explica el flujo completo de su aplicación usando la
          pregunta como eje, conectando <strong>al menos 3 semanas distintas</strong> en la misma
          respuesta.
        </p>
      </div>
    </div>
    <p style="margin:0.8rem 0 0.3rem;"><strong>Ejemplos de preguntas para la Cámara 4</strong></p>
    <p style="margin:0 0 0.5rem; font-size:0.85rem; color:#1a1a1a;">
      Estúdienlas de verdad: no son para memorizar una respuesta, sino para entender la conexión entre
      semanas y poder explicarla con sus propias palabras el día de la sustentación. Toca cada tarjeta
      para ver qué semanas conecta.
    </p>
    <div class="numbered-grid numbered-grid-2col">
      <div class="flip-card" style="min-height:190px;">
        <div class="flip-card-inner" style="min-height:190px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #b33a2e; text-align:left;">
            <p class="num" style="color:#b33a2e;">Pregunta 1</p>
            <p>Si quitamos las Transacciones ACID, ¿cómo se vería afectada la integridad de tus
              reportes de agregación al final del mes?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#b33a2e;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 2 (agregación) y Semana 7 (ACID).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:190px;">
        <div class="flip-card-inner" style="min-height:190px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #7c3aed; text-align:left;">
            <p class="num" style="color:#7c3aed;">Pregunta 2</p>
            <p>¿Por qué es más eficiente usar una Búsqueda Vectorial en la nube que intentar hacer un
              simple <code>LIKE</code> en una base de datos local?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#7c3aed;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 2 (SQL local), Semana 6 (búsqueda vectorial) y Semana 7 (nube).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:190px;">
        <div class="flip-card-inner" style="min-height:190px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #5b7c99; text-align:left;">
            <p class="num" style="color:#5b7c99;">Pregunta 3</p>
            <p>¿Qué es un embedding y por qué dos canciones con letras totalmente distintas pueden
              tener embeddings muy parecidos?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#5b7c99;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 6 (embeddings).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:210px;">
        <div class="flip-card-inner" style="min-height:210px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #c99a4e; text-align:left;">
            <p class="num" style="color:#c99a4e;">Pregunta 4</p>
            <p>¿Por qué un índice vectorial como HNSW no garantiza siempre el resultado más parecido
              exacto, a diferencia de un B+Tree que sí es exacto?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#c99a4e;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 5 (B+Tree) y Semana 6 (HNSW).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:210px;">
        <div class="flip-card-inner" style="min-height:210px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #6f9d7c; text-align:left;">
            <p class="num" style="color:#6f9d7c;">Pregunta 5</p>
            <p>Si tu ORM carga la playlist de un usuario y, sin darte cuenta, cae en el problema N+1 al
              traer también el artista de cada canción, ¿cómo se relaciona ese error de rendimiento con
              la Atomicidad de una transacción: son el mismo tipo de problema o son completamente
              distintos?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#6f9d7c;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 5 (ORM y problema N+1) y Semana 7 (Atomicidad).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:210px;">
        <div class="flip-card-inner" style="min-height:210px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #b33a2e; text-align:left;">
            <p class="num" style="color:#b33a2e;">Pregunta 6</p>
            <p>¿Por qué guardar el historial de reproducciones como documentos flexibles en MongoDB
              sería más práctico que como filas rígidas en SQL, y qué perderías en RLS si tus datos ya
              no viven en Postgres?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#b33a2e;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semanas 1 y 2 (SQL), Semana 4 (MongoDB) y Semana 7 (RLS).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:190px;">
        <div class="flip-card-inner" style="min-height:190px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #7c3aed; text-align:left;">
            <p class="num" style="color:#7c3aed;">Pregunta 7</p>
            <p>Un contador de "me gusta" en tiempo real usa Redis en vez de una tabla SQL. Si el
              servidor de Redis se cae a mitad de una actualización, ¿qué propiedad ACID está en
              riesgo, y qué garantías perdiste al salir del modelo relacional?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#7c3aed;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 4 (Redis) y Semana 7 (ACID).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:220px;">
        <div class="flip-card-inner" style="min-height:220px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #5b7c99; text-align:left;">
            <p class="num" style="color:#5b7c99;">Pregunta 8</p>
            <p>Si SoundFlow-AI guardara los embeddings de las canciones en MongoDB en vez de pgvector,
              ¿qué cambiaría y qué ventaja perderías?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#5b7c99;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 4 (MongoDB), Semana 6 (pgvector) y Semana 7 (RLS).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:220px;">
        <div class="flip-card-inner" style="min-height:220px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #c99a4e; text-align:left;">
            <p class="num" style="color:#c99a4e;">Pregunta 9</p>
            <p>En la calibración del buscador ajustaron el <code>match_threshold</code> probando
              consultas literales, con sinónimos y abstractas. ¿Por qué ese proceso es distinto a
              arreglar un bug como el de SQL Injection?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#c99a4e;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 6 (calibración) y Semana 7 (SQL Injection).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:210px;">
        <div class="flip-card-inner" style="min-height:210px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #6f9d7c; text-align:left;">
            <p class="num" style="color:#6f9d7c;">Pregunta 10</p>
            <p>Si el buscador semántico devuelve resultados que "casi" tienen sentido pero no son
              exactos, ¿cómo decides si el problema es del <code>match_threshold</code>, del índice
              B+Tree que soporta la consulta, o de una transacción que dejó embeddings a medio
              generar?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#6f9d7c;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 5 (B+Tree), Semana 6 (búsqueda semántica) y Semana 7 (transacciones).</p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="min-height:210px;">
        <div class="flip-card-inner" style="min-height:210px;">
          <div class="flip-card-front numbered-card" style="border-left:4px solid #b33a2e; text-align:left;">
            <p class="num" style="color:#b33a2e;">Pregunta 11</p>
            <p>¿Por qué la búsqueda semántica de SoundFlow-AI es la base de un sistema RAG, aunque el
              proyecto no genere texto con un modelo de lenguaje?</p>
            <span class="flip-hint">Toca para ver qué semanas conecta &rarr;</span>
          </div>
          <div class="flip-card-back" style="background:#b33a2e;">
            <p style="font-weight:700; margin:0 0 0.4rem;">Conecta con:</p>
            <p>Semana 6 (RAG).</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===================== 3. CÓMO SE CALIFICA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Cómo se califica: 5 criterios de 1 punto cada uno (equivalen a 100 puntos)</h3>
    </div>
    <div class="content-box" style="border-left:4px solid var(--accent);">
      <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">
        <thead>
          <tr>
            <th style="text-align:left; padding:0.4rem 0.5rem; border-bottom:2px solid var(--border); color:var(--accent);">Criterio</th>
            <th style="text-align:right; padding:0.4rem 0.5rem; border-bottom:2px solid var(--border); color:var(--accent); white-space:nowrap;">Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border);"><strong style="color:#b33a2e;">Cámara 1:</strong> El Vacío Atómico (ACID / ROLLBACK)</td>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border); text-align:right;">1</td>
          </tr>
          <tr>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border);"><strong style="color:#7c3aed;">Cámara 2:</strong> El Intento de Infiltración (RLS)</td>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border); text-align:right;">1</td>
          </tr>
          <tr>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border);"><strong style="color:#5b7c99;">Cámara 3:</strong> El Oráculo Semántico (búsqueda vectorial)</td>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border); text-align:right;">1</td>
          </tr>
          <tr>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border);"><strong style="color:#c99a4e;">Cámara 4:</strong> Prueba de Fuego de Conocimiento</td>
            <td style="padding:0.5rem; border-bottom:1px solid var(--border); text-align:right;">1</td>
          </tr>
          <tr>
            <td style="padding:0.5rem;"><strong>Desempeño individual y actitud técnica</strong> (participación, dominio del código y honestidad)</td>
            <td style="padding:0.5rem; text-align:right;">1</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="padding:0.5rem; border-top:2px solid var(--border); font-weight:700; text-align:right;">Total</td>
            <td style="padding:0.5rem; border-top:2px solid var(--border); font-weight:700; text-align:right;">5</td>
          </tr>
        </tfoot>
      </table>
      <p style="margin:0.8rem 0 0; font-size:0.85rem; color:var(--text-dim);">
        Cada cámara se evalúa por separado: si una falla por completo (por ejemplo, el ROLLBACK no
        revierte nada, o RLS no logra bloquear el acceso a datos de otro usuario), esos puntos se pierden
        para ese equipo sin importar qué tan bien les vaya en las otras cámaras. Cada criterio se califica de 0 a 1; esa nota se multiplica por 20 para obtener su equivalente sobre 100.
      </p>
    </div>
  </div>

  <!-- ===================== 4. NIVELES DE DESEMPEÑO POR CÁMARA ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Niveles de desempeño por cámara (escala 1 a 5)</h3>
    </div>
    <p style="margin-top:0; font-size:0.85rem; color:var(--text-dim);">
      Cada cámara se califica como un solo nivel de desempeño, del 5 (excelente) al 1 (no cumple), no
      como una suma de puntos sueltos.
    </p>

    <div class="content-box" style="border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.6rem; color:#b33a2e;"><strong>Cámara 1: El Vacío Atómico (1 punto)</strong></p>
      <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
        <tbody>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 5 (1)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Excelente: la falla se induce exactamente en el punto pedido, el ROLLBACK revierte todo por completo (ni el pago ni el estado premium quedan a medias), y el equipo explica el código sin dudar ni leerlo de memoria.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 4 (0.79)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Bueno: el ROLLBACK funciona correctamente, pero el equipo duda o necesita ayuda para explicar bien qué hace EXCEPTION.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 3 (0.59)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Aceptable: el ROLLBACK funciona pero de forma parcial o poco clara, y la explicación es superficial.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 2 (0.39)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Insuficiente: queda algún dato a medias (un registro huérfano), aunque haya algo de manejo de excepción en el código.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; font-weight:700; white-space:nowrap;">Nivel 1 (0.2)</td>
            <td style="padding:0.4rem 0.5rem;">No cumple: no hay ROLLBACK real, la transacción deja datos corruptos evidentes, o el equipo no sabe explicar qué pasó.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content-box" style="border-left:4px solid #7c3aed;">
      <p style="margin:0 0 0.6rem; color:#7c3aed;"><strong>Cámara 2: El Intento de Infiltración (1 punto)</strong></p>
      <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
        <tbody>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 5 (1)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Excelente: el acceso a datos de otro usuario es bloqueado por RLS (lista vacía), y el equipo explica con precisión cómo funciona su política de RLS.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 4 (0.79)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Bueno: el ataque es bloqueado correctamente, pero el equipo duda o da una explicación incompleta de por qué funciona.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 3 (0.59)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Aceptable: el ataque es bloqueado pero genera dudas o necesita ajustes en vivo para demostrarse con confianza.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 2 (0.39)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Insuficiente: el ataque tiene un efecto parcial no deseado (un error visible en los logs en vez de un bloqueo limpio, o una política RLS mal configurada).</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; font-weight:700; white-space:nowrap;">Nivel 1 (0.2)</td>
            <td style="padding:0.4rem 0.5rem;">No cumple: el equipo logra leer datos de otro usuario sin que RLS lo impida.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content-box" style="border-left:4px solid #5b7c99;">
      <p style="margin:0 0 0.6rem; color:#5b7c99;"><strong>Cámara 3: El Oráculo Semántico (1 punto)</strong></p>
      <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
        <tbody>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 5 (1)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Excelente: ante una consulta abstracta o metafórica del profesor, no probada antes por el equipo, la búsqueda devuelve canciones relevantes por significado, y el equipo explica con precisión la similitud de coseno y el rol del match_threshold.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 4 (0.79)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Bueno: los resultados son relevantes semánticamente, pero el equipo duda o da una explicación incompleta de la similitud de coseno o del match_threshold.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 3 (0.59)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Aceptable: los resultados son parcialmente relevantes (mezclan coincidencia semántica con algo de coincidencia literal), o el equipo necesita ayuda para ubicar la función de búsqueda.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 2 (0.39)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Insuficiente: los resultados son mayormente por coincidencia de palabras, con poca evidencia real de comprensión semántica.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; font-weight:700; white-space:nowrap;">Nivel 1 (0.2)</td>
            <td style="padding:0.4rem 0.5rem;">No cumple: la búsqueda no devuelve resultados coherentes ante la consulta abstracta, o el equipo no puede mostrar ni explicar la función de similitud.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content-box" style="border-left:4px solid #c99a4e;">
      <p style="margin:0 0 0.6rem; color:#c99a4e;"><strong>Cámara 4: Prueba de Fuego de Conocimiento (1 punto)</strong></p>
      <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
        <tbody>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 5 (1)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Excelente: conectan correctamente al menos 3 semanas distintas con vocabulario técnico preciso, argumentan con ejemplos de su propia aplicación, y cada integrante responde preguntas de seguimiento sin quedarse en blanco.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 4 (0.79)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Bueno: conectan al menos 3 semanas correctamente, pero la argumentación es algo genérica o falta profundizar en el "por qué".</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 3 (0.59)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Aceptable: mencionan las semanas relevantes pero la conexión entre ellas es superficial.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 2 (0.39)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Insuficiente: solo logran conectar 1 o 2 semanas, o cometen errores conceptuales al explicar los temas.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; font-weight:700; white-space:nowrap;">Nivel 1 (0.2)</td>
            <td style="padding:0.4rem 0.5rem;">No cumple: no logran responder con contenido técnico real, o inventan una respuesta sin relación con lo preguntado.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content-box" style="border-left:4px solid var(--accent);">
      <p style="margin:0 0 0.6rem; color:var(--accent);"><strong>Desempeño individual y actitud técnica (1 punto)</strong></p>
      <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
        <tbody>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 5 (1)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Excelente: todos los integrantes participan de forma equilibrada, cada uno puede explicar cualquier parte de su propio código con seguridad y sin apuntes, y cuando no saben algo lo admiten de inmediato y razonan en voz alta en vez de inventar.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 4 (0.79)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Bueno: todos participan pero de forma desigual (unos hablan más que otros), la mayoría domina su código aunque alguno tropiece en detalles puntuales, y son generalmente honestos aunque duden un poco antes de admitir que no saben algo.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 3 (0.59)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Aceptable: falla notoriamente uno de los tres aspectos: un integrante casi no participa, o entienden el flujo general de su código pero no los detalles de implementación, o evitan admitir que no saben dando respuestas vagas.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border); font-weight:700; white-space:nowrap;">Nivel 2 (0.39)</td>
            <td style="padding:0.4rem 0.5rem; border-bottom:1px solid var(--border);">Insuficiente: solo uno o dos integrantes llevan toda la exposición, repiten frases memorizadas sin comprensión real del código, e inventan respuestas que suenan convincentes pero son incorrectas en vez de admitir que no saben.</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0.5rem; font-weight:700; white-space:nowrap;">Nivel 1 (0.2)</td>
            <td style="padding:0.4rem 0.5rem;">No cumple: una sola persona expone todo el trabajo del equipo, no pueden explicar su propio código, e insisten en respuestas claramente erróneas incluso después de ser corregidos.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ===================== 5. CÓMO SE REPARTE EL TIEMPO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Cómo se reparte el tiempo: no todos los equipos duran lo mismo</h3>
    </div>
    <p>
      Como en las cuatro cámaras <strong>todos deben exponer</strong>, un equipo de 1 o 2 personas
      necesita menos tiempo que uno de 3 o más. Por eso el bloque no es fijo, depende de cuántos son:
    </p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Equipos de 1 o 2 personas: 15 min</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim); line-height:1.8;">
          0 a 9 min: Cámaras 1, 2 y 3<br>
          9 a 12 min: Cámara 4<br>
          12 a 15 min: retroalimentación y cambio
        </p>
      </div>
      <div class="concept-card">
        <h4 style="color:var(--accent);">Equipos de 3 o 4 personas: 20 min</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim); line-height:1.8;">
          0 a 12 min: Cámaras 1, 2 y 3<br>
          12 a 16 min: Cámara 4<br>
          16 a 20 min: retroalimentación y cambio
        </p>
      </div>
    </div>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Lo que se evalúa, de fondo, es lo mismo en las cuatro cámaras sin importar el tamaño del equipo:
      la argumentación técnica, el rigor académico, el trabajo en equipo y el desempeño individual al
      resolver el reto, como conclusión de todo el Journey Map del núcleo.
    </p>
  </div>

  <!-- ===================== 6. RULETA DE SORTEO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Sorteo del orden: gira la ruleta</h3>
    </div>
    <p>
      Cada giro elige un equipo al azar y lo ubica en el orden de presentación del martes; la ruleta
      calcula la hora exacta de cada uno sumando lo que ya duraron los que salieron antes que él, más
      el margen de 5 minutos por equipo. Gírala en clase para que el orden quede definido frente a
      todos.
    </p>
    <div class="ruleta-wrap" style="max-width:980px; margin:0.8rem auto 0; text-align:center;">
      <div style="display:flex; flex-wrap:wrap; gap:2rem; align-items:flex-start; justify-content:center; text-align:left;">
        <div style="flex:0 0 auto; text-align:center; margin:0 auto;">
          <svg class="ruleta-svg" viewBox="0 0 300 320" style="width:100%; max-width:280px; display:block; margin:0 auto;">
            <polygon points="140,15 160,15 150,0" fill="var(--text)"></polygon>
            <g class="ruleta-disco" style="transform-origin:150px 160px; transition:transform 3.2s cubic-bezier(0.17,0.67,0.35,1);">
              <path class="ruleta-slice" data-index="0" data-duracion="15" data-grupo="Grupo 1: Jhordan y Emmanuel" d="M150,160 L150,20 A140,140 0 0,1 232.29,46.74 Z" fill="#5b7c99"></path>
              <path class="ruleta-slice" data-index="1" data-duracion="15" data-grupo="Grupo 2: Carlos y Guillermo" d="M150,160 L232.29,46.74 A140,140 0 0,1 283.15,116.74 Z" fill="#c99a4e"></path>
              <path class="ruleta-slice" data-index="2" data-duracion="15" data-grupo="Grupo 3: Santiago y César" d="M150,160 L283.15,116.74 A140,140 0 0,1 283.15,203.26 Z" fill="#b33a2e"></path>
              <path class="ruleta-slice" data-index="3" data-duracion="20" data-grupo="Grupo 4: Mónica, Jadilson, Isabel y Ricardo" d="M150,160 L283.15,203.26 A140,140 0 0,1 232.29,273.26 Z" fill="#6f9d7c"></path>
              <path class="ruleta-slice" data-index="4" data-duracion="15" data-grupo="Grupo 5: Juan Manuel" d="M150,160 L232.29,273.26 A140,140 0 0,1 150,300 Z" fill="#7c3aed"></path>
              <path class="ruleta-slice" data-index="5" data-duracion="15" data-grupo="Grupo 6: Andrés Felipe" d="M150,160 L150,300 A140,140 0 0,1 67.71,273.26 Z" fill="#5b7c99"></path>
              <path class="ruleta-slice" data-index="6" data-duracion="15" data-grupo="Grupo 7: Arnold" d="M150,160 L67.71,273.26 A140,140 0 0,1 16.85,203.26 Z" fill="#c99a4e"></path>
              <path class="ruleta-slice" data-index="7" data-duracion="15" data-grupo="Grupo 8: Heyller" d="M150,160 L16.85,203.26 A140,140 0 0,1 16.85,116.74 Z" fill="#b33a2e"></path>
              <path class="ruleta-slice" data-index="8" data-duracion="15" data-grupo="Grupo 9: Juan Camilo" d="M150,160 L16.85,116.74 A140,140 0 0,1 67.71,46.74 Z" fill="#6f9d7c"></path>
              <path class="ruleta-slice" data-index="9" data-duracion="15" data-grupo="Grupo 10: Chakiba" d="M150,160 L67.71,46.74 A140,140 0 0,1 150,20 Z" fill="#7c3aed"></path>
              <text x="179.36" y="69.65" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">1</text>
              <text x="226.86" y="104.16" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">2</text>
              <text x="245" y="160" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">3</text>
              <text x="226.86" y="215.84" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">4</text>
              <text x="179.36" y="250.35" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">5</text>
              <text x="120.64" y="250.35" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">6</text>
              <text x="73.14" y="215.84" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">7</text>
              <text x="55" y="160" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">8</text>
              <text x="73.14" y="104.16" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#fff">9</text>
              <text x="120.64" y="69.65" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#fff">10</text>
              <circle cx="150" cy="160" r="24" fill="var(--bg-card)" stroke="var(--border)" stroke-width="2"></circle>
            </g>
          </svg>
          <div style="text-align:center;">
            <button class="ruleta-spin-btn" type="button" style="margin-top:0.6rem; padding:0.5rem 1.2rem; border-radius:8px; border:1px solid var(--accent); background:var(--accent-soft); color:var(--text); font-family:inherit; font-size:0.9rem; cursor:pointer;">Girar la ruleta</button>
            <button class="ruleta-reset-btn" type="button" style="margin-top:0.6rem; margin-left:0.5rem; padding:0.5rem 1.2rem; border-radius:8px; border:1px solid var(--border); background:transparent; color:var(--text-dim); font-family:inherit; font-size:0.85rem; cursor:pointer;">Reiniciar ruleta</button>
            <p class="ruleta-status" style="margin:0.6rem 0 0; font-size:0.85rem; color:var(--text-dim);">Quedan 10 equipos por sortear.</p>
          </div>
        </div>
        <div style="flex:1 1 420px; min-width:340px;">
          <p style="margin:0 0 0.4rem; font-size:0.85rem; color:var(--text-dim); font-weight:bold;">Orden del sorteo</p>
          <table class="ruleta-resultados" style="width:100%; border-collapse:collapse; font-size:0.88rem;">
            <thead>
              <tr>
                <th style="text-align:left; padding:0.5rem 0.6rem; border-bottom:1px solid var(--border); color:var(--text-dim); width:2.2rem;">#</th>
                <th style="text-align:left; padding:0.5rem 0.6rem; border-bottom:1px solid var(--border); color:var(--text-dim);">Equipo</th>
                <th style="text-align:left; padding:0.5rem 0.6rem; border-bottom:1px solid var(--border); color:var(--text-dim); white-space:nowrap;">Hora</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <p style="margin:1rem 0 0.4rem; font-size:0.85rem; color:var(--text-dim); font-weight:bold; text-align:left;">Equipos en juego</p>
      <ul style="margin:0; padding:0; list-style:none; font-size:0.85rem; color:var(--text-dim); line-height:1.9; text-align:left; columns:4; column-gap:1.2rem;">
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#5b7c99; margin-right:0.4rem;"></span>1. Jhordan y Emmanuel (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#c99a4e; margin-right:0.4rem;"></span>2. Carlos y Guillermo (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#b33a2e; margin-right:0.4rem;"></span>3. Santiago y César (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#6f9d7c; margin-right:0.4rem;"></span>4. Mónica, Jadilson, Isabel y Ricardo (20 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#7c3aed; margin-right:0.4rem;"></span>5. Juan Manuel (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#5b7c99; margin-right:0.4rem;"></span>6. Andrés Felipe (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#c99a4e; margin-right:0.4rem;"></span>7. Arnold (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#b33a2e; margin-right:0.4rem;"></span>8. Heyller (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#6f9d7c; margin-right:0.4rem;"></span>9. Juan Camilo (15 min)</li>
        <li><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#7c3aed; margin-right:0.4rem;"></span>10. Chakiba (15 min)</li>
      </ul>
    </div>
  </div>

`;
