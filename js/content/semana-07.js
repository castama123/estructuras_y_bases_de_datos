// Contenido enriquecido de la Semana 7: Clase 1 = introducción a fondo (historia, terminología,
// analogías) + Actividad 1 oficial ("Transacciones ACID, DBaaS (Cloud) y prevención de SQL Injection"),
// la construcción real de los tres desafíos de SoundFlow-AI paso a paso.
// Sigue el mismo patrón que semana-01.js ... semana-06.js:
// variables globales window.WEEK_CONTENT_7_1 (y _2 cuando exista), leídas por semana.html.

window.WEEK_CONTENT_7_1 = `

  <h2 style="color:var(--accent); font-size:1.4rem; margin:0 0 1.2rem; text-align:center;">SoundFlow-AI a prueba de fallos: Transacciones ACID, RLS y SQL Injection</h2>

  <p style="margin-top:0;">Antes de entrar en materia, un video corto para ubicarte en el tema:</p>
  <a href="https://www.youtube.com/watch?v=0tAqp3w_K2o" target="_blank" rel="noopener" style="display:block; max-width:360px; margin:0.6rem auto 1.4rem; border-radius:10px; overflow:hidden; border:1px solid var(--border); text-decoration:none; position:relative;">
    <img src="https://img.youtube.com/vi/0tAqp3w_K2o/hqdefault.jpg" alt="ACID Transactions: Fundamentos de bases de datos" style="display:block; width:100%; height:auto;">
    <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25);">
      <span style="width:64px; height:64px; border-radius:50%; background:rgba(91,124,153,0.9); display:flex; align-items:center; justify-content:center;">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
      </span>
    </span>
    <span style="display:block; padding:0.6rem 0.8rem; background:#111; color:#fff; font-size:0.85rem;">ACID Transactions: Fundamentos de bases de datos. Ver en YouTube</span>
  </a>
  <p style="margin-top:-0.8rem; margin-bottom:1.4rem; font-size:0.78rem; color:var(--text-dim); text-align:center;">Hacker Nómada (2020). ACID Transactions: Fundamentos de bases de datos [Video]. YouTube.</p>

  <!-- ===================== 1. POR QUÉ EXISTEN LAS TRANSACCIONES ===================== -->
  <div class="activity-section" style="border-top:none; padding-top:0;">
    <div class="activity-section-header">
      <h3>El problema del cajero automático</h3>
    </div>
    <p>
      Imagina que estás frente a un cajero automático. Le pides retirar 100&nbsp;mil pesos. El cajero hace dos
      cosas, en este orden: primero descuenta el dinero de tu cuenta, y después te entrega los billetes.
      Ahora imagina que, justo entre esos dos pasos, la máquina se traba y se apaga. Tu saldo ya bajó, pero
      los billetes nunca salieron. Eso es justo lo que una <strong>transacción</strong> evita.
    </p>
    <div class="content-box" style="margin-top:0.6rem;">
      <svg viewBox="0 0 640 260" style="width:100%; max-width:640px; display:block; margin:0 auto;">
        <rect x="20" y="20" width="270" height="90" rx="8" fill="none" stroke="#5b7c99" stroke-width="1.5"/>
        <text x="155" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#5b7c99">Paso 1</text>
        <text x="155" y="68" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">Descuenta $100.000</text>
        <text x="155" y="86" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">de tu cuenta</text>

        <rect x="350" y="20" width="270" height="90" rx="8" fill="none" stroke="#b33a2e" stroke-width="1.5" stroke-dasharray="5,4"/>
        <text x="485" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e">Paso 2</text>
        <text x="485" y="68" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">Entrega los billetes</text>
        <text x="485" y="86" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#b33a2e">⚡ La máquina se traba</text>

        <path d="M290 65 L345 65" stroke="var(--text-dim)" stroke-width="1.5" marker-end="url(#arrow7)"/>
        <defs>
          <marker id="arrow7" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-dim)"/>
          </marker>
        </defs>

        <rect x="120" y="150" width="400" height="90" rx="8" fill="none" stroke="#b33a2e" stroke-width="1.5"/>
        <text x="320" y="178" text-anchor="middle" font-family="Consolas, monospace" font-size="12" fill="#b33a2e">❌ Sin transacción: estado inconsistente</text>
        <text x="320" y="202" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">Tu saldo bajó $100.000, pero nunca recibiste el dinero.</text>
        <text x="320" y="220" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="var(--text-dim)">El banco "perdió" tu plata en el camino.</text>
      </svg>
    </div>
    <p style="margin-top:0.6rem;">
      Una <strong>transacción</strong> agrupa varios pasos como si fueran uno solo, indivisible: o se
      completan absolutamente todos, o la base de datos revierte automáticamente los que ya alcanzó a hacer,
      como si nunca hubieran ocurrido. A ese "deshacer todo" se le llama <strong style="color:#b33a2e;">ROLLBACK</strong>,
      y a confirmar que todo salió bien se le llama <strong style="color:#6f9d7c;">COMMIT</strong>.
    </p>
    <p>
      En SoundFlow-AI, este mismo problema aparece cuando un <strong style="color:#b33a2e;">usuario paga</strong>
      por el <strong style="color:#b33a2e;">plan Premium</strong>: hay que registrar el pago en
      <code style="color:#b33a2e;">historial_pagos</code> y actualizar el <code style="color:#b33a2e;">plan</code>
      en <code style="color:#b33a2e;">perfiles</code>. Si el sistema falla entre esas dos acciones, no puede
      quedar un pago registrado sin que el usuario reciba sus beneficios, ni al revés.
    </p>
  </div>

  <!-- ===================== 2. LAS 4 PROPIEDADES ACID ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Las 4 propiedades ACID</h3>
    </div>
    <p>
      ACID es un acrónimo que resume las cuatro garantías que una transacción le promete a tu aplicación.
      Sin estas cuatro propiedades, ningún sistema que maneje dinero, inventario o datos críticos podría
      confiar en su propia base de datos.
    </p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:#b33a2e;">Atomicidad (Atomicity)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Todos los pasos de la transacción
          ocurren, o ninguno ocurre. No existe un punto intermedio válido. Si el
          <strong style="color:#b33a2e;">UPDATE</strong> del plan falla, el
          <strong style="color:#b33a2e;">INSERT</strong> del pago también se deshace.</p>
        <div style="margin-top:0.6rem; background:var(--bg-card); border:1px dashed #b33a2e; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.72rem; color:var(--text-dim);">
          INSERT pago ✅ &rarr; UPDATE plan ❌<br>
          <span style="color:#b33a2e;">↳ ROLLBACK: el INSERT también se deshace</span>
        </div>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Consistencia (Consistency)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">La base de datos pasa de un estado
          válido a otro estado válido, respetando siempre sus reglas (Foreign Keys, restricciones, tipos de
          dato). Nunca queda en un estado que viole esas reglas.</p>
        <div style="margin-top:0.6rem; background:var(--bg-card); border:1px dashed #c99a4e; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.72rem; color:var(--text-dim);">
          INSERT historial_pagos (user_id: "xyz")<br>
          <span style="color:#c99a4e;">↳ ERROR: xyz no existe en perfiles (FK). Rechazado.</span>
        </div>
      </div>
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Aislamiento (Isolation)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Si dos transacciones ocurren al mismo
          tiempo (<strong style="color:#b33a2e;">dos usuarios pagando a la vez</strong>), una no puede ver los
          resultados a medias de la otra. Cada una actúa como si fuera la única corriendo en ese instante.</p>
        <div style="margin-top:0.6rem; background:var(--bg-card); border:1px dashed #5b7c99; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.72rem; color:var(--text-dim);">
          T1: Usuario A paga &nbsp;|&nbsp; T2: Usuario B paga<br>
          <span style="color:#5b7c99;">↳ Corren en paralelo, sin verse entre sí</span>
        </div>
        <p style="margin:0.5rem 0 0; font-size:0.75rem; color:var(--text-dim);">
          No tienes que configurar nada: PostgreSQL ya trae esto activado por defecto (con una técnica llamada
          <strong>MVCC</strong>, <em>Multi-Version Concurrency Control</em>, o Control de Concurrencia
          Multi-Versión), corriendo ambas transacciones en paralelo de verdad, sin frenar una a la otra como
          una fila.
        </p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">Durabilidad (Durability)</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Una vez que la transacción hizo
          <strong style="color:#b33a2e;">COMMIT</strong>, el cambio queda guardado para siempre, incluso si el
          servidor se apaga un segundo después. No se puede "perder" un pago ya confirmado.</p>
        <div style="margin-top:0.6rem; background:var(--bg-card); border:1px dashed #6f9d7c; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.72rem; color:var(--text-dim);">
          COMMIT ✅ &rarr; 💥 se apaga el servidor<br>
          <span style="color:#6f9d7c;">↳ Al reiniciar, el pago sigue ahí</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ===================== 3. DATO CURIOSO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3 style="display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap; margin:0;">
        <span class="curioso-title-badge">
          <svg class="curioso-title-spark" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l1.9 5.7L19.6 9l-5.7 1.9L12 16.6l-1.9-5.7L4.4 9l5.7-1.3L12 2z" fill="currentColor"/>
          </svg>
          Dato curioso
        </span>
        <span style="color:var(--accent);">De dónde viene ACID, y qué pasa cuando falta</span>
      </h3>
    </div>
    <div class="curioso-grid">
      <div class="curioso-card curioso-card--red">
        <span class="curioso-card-year">$440M</span>
        <h4 style="color:#b33a2e; margin:0 0 0.4rem;">Knight Capital: 45 minutos, 440 millones de dólares</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
          El 1 de agosto de 2012, la firma de trading Knight Capital perdió 440 millones de dólares en solo 45
          minutos: un despliegue de código a medias (7 de 8 servidores actualizados) activó por error un
          sistema obsoleto de 2003 que empezó a comprar caro y vender barato sin control. La empresa quedó
          prácticamente destruida antes del almuerzo.
        </p>
        <div class="curioso-stat">
          <div class="curioso-stat-label"><span>Valor de la acción, en 2 días</span><span>-75%</span></div>
          <div class="curioso-stat-track"><div class="curioso-stat-fill" style="--fill:75%; background:#b33a2e;"></div></div>
        </div>
      </div>
      <div class="curioso-card curioso-card--green">
        <span class="curioso-card-year">2007</span>
        <h4 style="color:#6f9d7c; margin:0 0 0.4rem;">El padre de las transacciones, perdido en el mar</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">
          Jim Gray, el investigador de IBM que en 1981 sentó las bases de atomicidad, consistencia y
          durabilidad (ganador del Premio Turing en 1998 por ese trabajo), desapareció el 28 de enero de 2007
          navegando solo cerca de San Francisco. Nunca se encontró rastro de él ni de su velero; fue declarado
          legalmente muerto cinco años después, en 2012.
        </p>
        <div class="curioso-timeline">
          <span class="curioso-timeline-label" style="color:#6f9d7c;">Turing Award · 1998</span>
          <div class="curioso-timeline-track"><div class="curioso-timeline-dot"></div></div>
          <span class="curioso-timeline-label" style="color:#6f9d7c;">Desaparece · 2007</span>
        </div>
      </div>
    </div>
    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:1rem;">
      <p style="margin:0;">
        Knight Capital no fue exactamente un problema de ACID (fue un despliegue mal hecho), pero ilustra la
        misma lección de fondo: en sistemas que mueven dinero, un estado intermedio corrupto, aunque dure
        solo segundos, puede ser catastrófico. Por eso los bancos, las bolsas de valores y plataformas como
        SoundFlow no pueden confiar en que "probablemente todo salió bien", necesitan garantías absolutas.
      </p>
    </div>
  </div>

  <!-- ===================== 4. CASOS DE USO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>¿Dónde más importan las transacciones?</h3>
    </div>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Transferencias bancarias</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Restar de la cuenta A y sumar a la
          cuenta B deben ocurrir juntos. Si solo pasa lo primero, el dinero "desaparece" del sistema.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Checkout de e-commerce</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Descontar el inventario y confirmar el
          pago deben ir de la mano. Si el pago falla, el producto no puede quedar reservado para nadie.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7c3aed;">Reservas de aerolíneas</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Dos personas no pueden terminar con el
          mismo asiento en el mismo vuelo. El aislamiento evita que dos reservas simultáneas choquen entre
          sí.</p>
      </div>
    </div>
  </div>

  <!-- ===================== 5. DESAFÍO 1: PROTOCOLO DE SUSCRIPCIÓN PREMIUM ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Desafío 1: El protocolo de suscripción Premium</h3>
    </div>
    <p>
      Vas a construir el mecanismo real que evita que SoundFlow-AI le cobre a un usuario sin darle el plan
      Premium, o al revés. Primero, dos tablas relacionadas por <code>user_id</code>:
    </p>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Esto se corre en el <strong>SQL Editor de Supabase</strong>, igual que hiciste con
      <code>canciones_vectoriales</code> en la Semana 6.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">tablas.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>CREATE TABLE perfiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id), -- auth.users: tabla y campo que Supabase administra automáticamente, para saber con control y seguridad de quién es cada perfil
  nombre TEXT,
  plan TEXT DEFAULT 'gratis'
);

CREATE TABLE historial_pagos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, -- la BD genera este número sola, 1, 2, 3...
  user_id UUID REFERENCES perfiles(user_id),
  monto NUMERIC,
  fecha TIMESTAMP DEFAULT now()
);</code></pre>
    </div>
    <p style="margin-top:0.8rem; font-size:0.85rem; color:var(--text-dim);">
      La columna <code>user_id</code> en <code>historial_pagos</code> es una <strong>Foreign Key</strong> que
      apunta a <code>perfiles</code>, así ambas tablas quedan conectadas por el mismo usuario, exactamente
      como practicaste con las relaciones entre tablas desde la Semana 1.
    </p>
    <div class="content-box" style="border-left:4px solid #5b7c99; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;"><strong>Antes de seguir: pobla las tablas con datos de prueba</strong></p>
      <p style="margin:0;">
        Ambas tablas están vacías, y su Foreign Key exige que cada <code>user_id</code> ya exista en
        <code>auth.users</code>. Vamos a crear esos usuarios por la vía oficial: la
        <strong>API de administración</strong> de Supabase, desde Python, porque es la que garantiza que cada
        usuario quede completo y funcional, listo para iniciar sesión de verdad más adelante.
      </p>
    </div>
    <p style="margin-top:0.8rem; font-size:0.85rem; color:var(--text-dim);">
      Para esto necesitas la <code>service_role</code> key de tu proyecto (distinta a la que usas normalmente):
      ve a <strong style="color:#b33a2e;">Project Settings → API Keys → service_role</strong> y copia esa llave
      <strong style="color:#b33a2e;">(secreta)</strong>. Agrégala a tu <code>.env</code>, junto a las que ya
      tienes:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">.env</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_secreta</code></pre>
    </div>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Esa línea es una variable de entorno que guarda la <strong>service role key</strong> de Supabase, la
      llave "maestra" de tu proyecto.
    </p>
    <p style="margin-top:0.6rem;">
      Ahora vamos a crear 10 usuarios reales usando la API de administración, asignarles su plan (5 premium, 5
      gratis) y su fila en <code>perfiles</code>, y registrar el pago correspondiente en
      <code>historial_pagos</code> para los que quedaron en premium.
    </p>
    <p style="margin-top:0.6rem;">En VS Code, crea un archivo llamado <code>crear_usuarios_prueba.py</code>:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">crear_usuarios_prueba.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>import os  <span style="color:#6f9d7c;"># módulo para leer variables de entorno (las del .env)</span>
from dotenv import load_dotenv  <span style="color:#6f9d7c;"># función que carga el archivo .env</span>
from supabase import create_client  <span style="color:#6f9d7c;"># función que arma un cliente para conectarse a Supabase</span>

load_dotenv()  <span style="color:#6f9d7c;"># lee tu archivo .env y deja sus variables disponibles para el resto del script</span>

url = os.environ.get("SUPABASE_URL")  <span style="color:#6f9d7c;"># saca del .env la URL de tu proyecto y la guarda en url</span>
service_role_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")  <span style="color:#6f9d7c;"># igual, pero con la llave de administrador</span>

admin = create_client(url, service_role_key)  <span style="color:#6f9d7c;"># crea el cliente especial de administrador, con esa URL y esa llave</span>

usuarios_creados = []  <span style="color:#6f9d7c;"># lista vacía donde vas a guardar los datos de cada usuario, para usarlos después</span>

for n in range(1, 11):  <span style="color:#6f9d7c;"># repite todo lo de abajo 10 veces, con n valiendo 1, 2, 3... hasta 10</span>
    email = f"usuario{n}@soundflow.test"  <span style="color:#6f9d7c;"># arma el correo de ese usuario según el número</span>
    respuesta = admin.auth.admin.create_user({
        "email": email,
        "password": "password123",
        "email_confirm": True
    })  <span style="color:#6f9d7c;"># crea el usuario de verdad en Supabase, ya confirmado, sin revisar correo</span>
    user_id = respuesta.user.id  <span style="color:#6f9d7c;"># saca el UUID que Supabase le asignó a ese usuario recién creado</span>
    plan = "premium" if n <= 5 else "gratis"  <span style="color:#6f9d7c;"># del 1 al 5, premium; del 6 al 10, gratis. Siempre 5 y 5</span>
    usuarios_creados.append({"user_id": user_id, "nombre": f"Usuario{n}", "plan": plan})  <span style="color:#6f9d7c;"># guarda sus datos en la lista</span>
    print(f"Creado {email} -> {user_id} ({plan})")  <span style="color:#6f9d7c;"># muestra en pantalla qué usuario se acaba de crear</span>

admin.table("perfiles").insert(usuarios_creados).execute()  <span style="color:#6f9d7c;"># con los 10 ya creados, inserta sus filas en perfiles</span>

pagos = [{"user_id": u["user_id"], "monto": 29900} for u in usuarios_creados if u["plan"] == "premium"]  <span style="color:#6f9d7c;"># arma la lista de pagos, solo para los usuarios premium</span>
admin.table("historial_pagos").insert(pagos).execute()  <span style="color:#6f9d7c;"># inserta esos pagos en historial_pagos</span>

print("Listo: 10 usuarios de prueba (5 premium, 5 gratis) con sus perfiles y pagos.")  <span style="color:#6f9d7c;"># mensaje final de confirmación</span></code></pre>
    </div>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Ejecútalo una sola vez desde la terminal: <code>python crear_usuarios_prueba.py</code>. Después revisa en
      <strong>Table Editor</strong> que <code>perfiles</code> tenga 10 filas (5 premium, 5 gratis) y
      <code>historial_pagos</code> exactamente 5.
    </p>
    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;"><strong>¿Necesitas reiniciar los datos de prueba?</strong></p>
      <p style="margin:0 0 0.6rem;">
        Si vuelves a correr <code>crear_usuarios_prueba.py</code> sin borrar lo anterior, vas a duplicar
        usuarios. Para limpiar todo primero, borra en orden inverso al que se creó (los pagos dependen de los
        perfiles, y los perfiles dependen de los usuarios), desde el SQL Editor:
      </p>
      <div class="code-block" style="margin:0;">
        <div class="code-block-header">
          <span class="code-dot" style="background:#ff5f56"></span>
          <span class="code-dot" style="background:#ffbd2e"></span>
          <span class="code-dot" style="background:#27c93f"></span>
          <span class="code-filename">limpiar_datos_prueba.sql</span>
          <button class="code-copy-btn" type="button">Copiar</button>
        </div>
        <pre><code>DELETE FROM historial_pagos;
DELETE FROM perfiles;
DELETE FROM auth.users WHERE email LIKE '%@soundflow.test';</code></pre>
      </div>
    </div>
    <p style="margin-top:0.8rem;">
      Ahora vamos a construir una función SQL que hace las dos acciones (insertar el pago y actualizar el
      plan) dentro de un bloque transaccional, y que después vamos a probar forzando un error, para confirmar
      que el <strong style="color:#b33a2e;">ROLLBACK</strong> deshace todo y demuestra la
      <strong>Atomicidad</strong> en la práctica:
    </p>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      En el <strong>SQL Editor de Supabase</strong>, crearemos la siguiente función para validar la transacción:
    </p>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Para llegar ahí: entra al Dashboard de tu proyecto en <strong style="color:#b33a2e;">Supabase</strong>, en
      el menú lateral izquierdo busca el ícono de <code style="color:#b33a2e;">&lt;/&gt;</code> (SQL Editor) y
      haz clic en él, luego en <strong style="color:#b33a2e;">"New query"</strong> para abrir un editor en
      blanco, pega el código de abajo y ejecútalo con el botón <strong style="color:#b33a2e;">"Run"</strong>
      (o Ctrl+Enter). Después de correrlo, puedes confirmar que la función quedó creada yendo a
      <strong>Database → Functions</strong> en ese mismo menú lateral: ahí debe aparecer
      <code style="color:#b33a2e;">procesar_upgrade_premium</code> en la lista.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">funcion_upgrade.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>CREATE OR REPLACE FUNCTION procesar_upgrade_premium(p_user_id UUID, p_monto NUMERIC)
RETURNS void AS $$
BEGIN
  -- Paso 1: registrar el pago
  INSERT INTO historial_pagos (user_id, monto) VALUES (p_user_id, p_monto);

  -- Paso 2: otorgar el plan Premium
  UPDATE perfiles SET plan = 'premium' WHERE user_id = p_user_id;

EXCEPTION WHEN OTHERS THEN
  -- Si cualquiera de los dos pasos falla, deshace ambos automáticamente
  RAISE EXCEPTION 'El upgrade falló, se revirtió todo: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;</code></pre>
    </div>
    <div class="content-box" style="border-left:4px solid #6f9d7c; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;"><strong>Esta función actúa como una transacción real</strong></p>
      <p style="margin:0;">
        En PostgreSQL, cada función <code>plpgsql</code> corre dentro de su propia transacción implícita. Si el bloque
        termina sin errores, PostgreSQL hace el <strong style="color:#6f9d7c;">COMMIT</strong> por ti; si el
        bloque <code>EXCEPTION</code> se activa, hace el <strong style="color:#b33a2e;">ROLLBACK</strong> de
        todo lo que la función alcanzó a ejecutar antes de fallar, ambos pasos, no solo el que falló. No
        necesitas escribir <code>BEGIN;</code> / <code>COMMIT;</code> de SQL en ningún lado.
      </p>
    </div>
    <p style="margin-top:0.8rem;">
      Para comprobarlo, fuerza el error a propósito desde el <strong style="color:#b33a2e;">SQL Editor</strong>,
      pasando un <code style="color:#b33a2e;">p_user_id</code> que no existe en
      <code style="color:#b33a2e;">perfiles</code>:
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>SELECT procesar_upgrade_premium('00000000-0000-0000-0000-000000000000', 29900);</code></pre>
    </div>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Como ese <code style="color:#b33a2e;">user_id</code> no existe en
      <code style="color:#b33a2e;">perfiles</code>, el <code style="color:#b33a2e;">INSERT</code> en
      <code style="color:#b33a2e;">historial_pagos</code> viola la
      <strong style="color:#b33a2e;">Foreign Key</strong> y dispara el
      <code style="color:#b33a2e;">EXCEPTION</code>. Revisa después la tabla
      <code style="color:#b33a2e;">historial_pagos</code>: no debe quedar ningún registro suelto de ese pago
      que falló, el <strong style="color:#b33a2e;">ROLLBACK</strong> deshizo también el
      <strong style="color:#b33a2e;">INSERT</strong>, aunque alcanzó a ejecutarse antes de que la transacción
      fallara.
    </p>
    <p style="margin-top:0.8rem;">Así se ve el error que Supabase te debería devolver en el SQL Editor:</p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">terminal</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>ERROR: P0001: El upgrade falló, se revirtió todo: insert or update on table "historial_pagos" violates foreign key constraint "historial_pagos_user_id_fkey"
CONTEXT: PL/pgSQL function procesar_upgrade_premium(uuid,numeric) line 11 at RAISE</code></pre>
    </div>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      El código <strong style="color:#b33a2e;"><code>P0001</code></strong> es el que usa PostgreSQL para un
      error levantado a mano con <strong style="color:#b33a2e;"><code>RAISE EXCEPTION</code></strong>. El
      mensaje después de los dos puntos
      (<code>insert or update on table...violates foreign key constraint...</code>) es el
      <strong style="color:#b33a2e;"><code>SQLERRM</code></strong> real: el motor te está contando exactamente
      <strong style="color:#b33a2e;">cuál restricción se violó</strong>. Si ves este error, la función y el
      <strong style="color:#b33a2e;">ROLLBACK</strong> están funcionando como deben.
    </p>
  </div>

  <!-- ===================== 6. DESAFÍO 2A: SQL INJECTION ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Desafío 2, parte A: Prevención de SQL Injection</h3>
    </div>
    <p>
      SQL Injection es un ataque donde alguien escribe, en un campo normal de tu aplicación (un buscador, un
      formulario de login), fragmentos de código SQL disfrazados de texto, con la intención de que tu propia
      base de datos los ejecute como si fueran una instrucción legítima tuya.
    </p>
    <div class="content-box" style="border-left:4px solid #b33a2e;">
      <p style="margin:0 0 0.5rem;"><strong>Código vulnerable: nunca construyas SQL concatenando texto</strong></p>
      <p style="margin:0 0 0.6rem;">
        Cuando tu código arma la consulta pegando directamente lo que escribió el usuario, la base de datos ya
        no puede distinguir <strong style="color:#b33a2e;">"esto es un dato"</strong> de
        <strong style="color:#b33a2e;">"esto es una instrucción"</strong>. Todo lo que llega dentro del texto
        final se lee y se ejecuta como si fuera parte del mismo comando SQL, sin importar la intención con la
        que se escribió.
      </p>
      <p style="margin:0 0 0.4rem; font-size:0.85rem; color:var(--text-dim);">
        En SoundFlow-AI, <code style="color:#b33a2e;">user_id</code> es un
        <strong style="color:#b33a2e;">UUID</strong>: un valor de 128 bits representado como 32 dígitos
        hexadecimales agrupados así: <code>8-4-4-4-12</code>, por ejemplo
        <code style="color:#b33a2e;">3fa85f64-5717-4562-b3fc-2c963f66afa6</code>.
      </p>
      <ul style="margin:0 0 0.4rem; padding-left:1.2rem; font-size:0.85rem; color:var(--text-dim);">
        <li>Número entero: sin comillas, <code>WHERE id = 42</code>.</li>
        <li>UUID: tiene letras y guiones, así que va <strong>entre comillas simples</strong>:
          <code>WHERE user_id = '3fa85f64-...'</code>.</li>
      </ul>
      <p style="margin:0 0 0.4rem; font-size:0.85rem; color:var(--text-dim);">
        Por eso tu código arma la consulta así:
      </p>
      <div style="background:var(--bg-card); border:1px dashed #b33a2e; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.78rem; color:var(--text-dim); margin-bottom:0.6rem;">
        consulta = f"SELECT * FROM perfiles WHERE user_id = '{id_usuario}'"
      </div>
      <p style="margin:0 0 0.4rem; font-size:0.85rem; color:var(--text-dim);">
        Como el valor va entre comillas, un ataque como <code style="color:#b33a2e;">1; DROP TABLE canciones;</code> no
        funciona tal cual, primero hay que "cerrar" esa comilla. Si el usuario escribe
        <code style="color:#b33a2e;">' ; DROP TABLE canciones; --</code> en vez de un UUID real, el texto que se
        termina enviando a la base de datos es literalmente:
      </p>
      <div style="background:var(--bg-card); border:1px dashed #b33a2e; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.78rem; color:var(--text-dim); margin-bottom:0.6rem;">
        SELECT * FROM perfiles WHERE user_id = '<span style="color:#b33a2e;">'; DROP TABLE canciones; --</span>'
      </div>
      <p style="margin:0;">
        La primera comilla que puso el atacante cierra la que abrió tu código, dejando un
        <code>user_id = ''</code> vacío y válido; el <code>--</code> al final convierte la comilla sobrante en
        un comentario, para que no rompa la sintaxis. Entre medio queda una
        <strong style="color:#b33a2e;">segunda instrucción completa, separada por punto y coma</strong>, que tú
        nunca escribiste, y que PostgreSQL ejecuta igual porque para el motor todo eso es simplemente texto SQL
        válido, sin forma de saber que la segunda mitad vino de un usuario y no de tu programa.
      </p>
    </div>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">vulnerable.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code># VULNERABLE
id_usuario = input("Ingresa tu user_id: ")
consulta = f"SELECT * FROM perfiles WHERE user_id = <span style="color:#5b7c99;">'</span><span style="color:#7c3aed;">{id_usuario}</span><span style="color:#5b7c99;">'</span>"
# Si el usuario escribe: ' ; DROP TABLE canciones; --
# la consulta final ejecuta AMBAS instrucciones.</code></pre>
    </div>
    <p style="margin-top:0.5rem; font-size:0.8rem; color:var(--text-dim);">
      En <span style="color:#5b7c99;">azul</span>, las comillas que escribes tú, a mano, en tu propio código.
      En <span style="color:#7c3aed;">morado</span>, el hueco donde se inserta tal cual lo que haya escrito el
      usuario, sin revisar ni proteger nada.
    </p>
    <div style="background:var(--bg-card); border:1px dashed #b33a2e; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.78rem; color:var(--text-dim); margin-top:0.6rem;">
      SELECT * FROM perfiles WHERE user_id = ''<span style="color:#b33a2e;"> ; DROP TABLE canciones; --</span>'
    </div>
    <p style="margin:0.6rem 0 0.4rem; font-size:0.85rem; color:var(--text-dim);">
      Así la lee PostgreSQL, carácter por carácter:
    </p>
    <ol style="margin:0 0 0.4rem; padding-left:1.2rem; font-size:0.85rem; color:var(--text-dim);">
      <li>La 1ª comilla la pone tu código (la plantilla), y abre el valor de <code>user_id</code>.</li>
      <li>La 2ª comilla es la que escribió el atacante, pegada justo después. El motor mira el siguiente
        carácter para ver si es otra comilla (lo que significaría "esto es un dato, sigue el texto"), pero lo
        que sigue es un espacio, no una comilla. Como no hay comilla doble, se lee como el cierre del valor.</li>
      <li>El valor de <code>user_id</code> queda vacío (<code>''</code>), porque no hubo ningún carácter real
        entre esas dos comillas.</li>
      <li>Justo después de ese cierre, el <code>;</code> le dice a SQL "aquí termina esta instrucción". Todo lo
        que sigue ya no es parte del <code>SELECT</code>, es un comando nuevo:
        <code style="color:#b33a2e;">DROP TABLE canciones;</code></li>
      <li>PostgreSQL lo ejecuta sin problema, porque para el motor son dos instrucciones válidas y separadas,
        una detrás de otra.</li>
      <li>El <code>--</code> final convierte la comilla sobrante (la que tu propio código puso para cerrar el
        f-string) en un comentario, para que no cause un error de sintaxis.</li>
    </ol>
    <p style="margin-top:0.8rem;">
      La defensa se llama <strong>consultas parametrizadas</strong>: en vez de pegar el valor directamente en
      el texto de la consulta, se lo pasas por separado, y es la librería la que se encarga de tratarlo
      siempre como un simple valor (nunca como código ejecutable), sin importar qué escriba el usuario.
    </p>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">seguro.py</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code># SEGURO: el cliente de Supabase ya viene "vacunado"
id_usuario = input("Ingresa tu user_id: ")
resultado = supabase.table("perfiles").select("*").eq("user_id", <span style="color:#7c3aed;">id_usuario</span>).execute()
# El método .eq() nunca interpreta id_usuario como código SQL,
# lo trata siempre como un valor plano, sin importar qué contenga.</code></pre>
    </div>
    <p style="margin-top:0.5rem; font-size:0.8rem; color:var(--text-dim);">
      Aquí no hay comillas que tú escribas: <code>"user_id"</code> es solo el nombre fijo de la columna. En
      <span style="color:#7c3aed;">morado</span>, lo que escribió el usuario, ahora entregado por separado como
      argumento, no pegado dentro de un texto; es la librería quien lo rodea de comillas y lo escapa
      internamente antes de enviarlo.
    </p>
    <p style="margin:0.6rem 0 0.4rem; font-size:0.85rem; color:var(--text-dim);">
      Fíjate en <code style="color:#b33a2e;">.eq("user_id", id_usuario)</code>: <code>id_usuario</code> ya no se pega
      dentro de un texto de consulta como hacía el f-string, sino que se pasa aparte, como argumento. Con eso,
      el cliente de Supabase lo trata como puro dato, nunca como código SQL: si trae una comilla, la escapa
      automáticamente antes de enviarla. Esa protección la aplica siempre la librería, sin que tengas que
      hacer nada extra.
    </p>
    <div style="background:var(--bg-card); border:1px dashed #6f9d7c; border-radius:6px; padding:0.5rem 0.7rem; font-family:Consolas, monospace; font-size:0.78rem; color:var(--text-dim); margin-top:0.6rem;">
      SELECT * FROM perfiles WHERE user_id = ''<span style="color:#7c3aed;">' ; DROP TABLE canciones; --</span>'
    </div>
    <p style="margin:0.6rem 0 0.4rem; font-size:0.85rem; color:var(--text-dim);">
      Así la lee PostgreSQL, carácter por carácter:
    </p>
    <ol style="margin:0 0 0.4rem; padding-left:1.2rem; font-size:0.85rem; color:var(--text-dim);">
      <li>El atacante escribe una comilla simple para intentar "cerrar" el valor de <code>user_id</code>.</li>
      <li>Supabase la duplica antes de enviarla: <code>''</code>.</li>
      <li>PostgreSQL, al ver esas dos comillas seguidas dentro del valor, no las lee como "aquí se cierra el
        string": las lee como "esto es un carácter literal (una comilla) que forma parte del texto, sigue el
        mismo valor".</li>
      <li>Por eso todo lo que el atacante escribió después, marcado en
        <span style="color:#7c3aed;">morado</span> (incluido su <code>;</code> y su
        <code style="color:#7c3aed;">DROP TABLE canciones;</code>), queda atrapado dentro de ese mismo valor
        de texto, en vez de convertirse en una instrucción SQL nueva. La búsqueda simplemente no encuentra
        ningún perfil con ese id, y ninguna tabla se borra.</li>
    </ol>
    <p style="margin-top:0.8rem; font-size:0.85rem; color:var(--text-dim);">
      El reto de esta parte no es escribir código nuevo, es <strong>auditar</strong> tu propio
      <code style="color:#b33a2e;">buscar_musica.py</code> e <code style="color:#b33a2e;">insertar_canciones.py</code> de las semanas anteriores y
      confirmar que ninguna consulta arma texto SQL con f-strings a partir de algo que escribió un usuario.
    </p>
    <div class="content-box" style="border-left:4px solid #b33a2e; margin-top:0.8rem;">
      <p style="margin:0 0 0.6rem;"><strong style="color:#b33a2e;">Qué debes entregar en esta parte</strong></p>
      <p style="margin:0 0 0.4rem;">
        <strong style="color:#b33a2e;">1. Audita tu código:</strong> revisa tus archivos que arman consultas y
        corrige cualquier valor de usuario pegado con f-string, <code>.format()</code> o <code>+</code>, usando
        el patrón de <code>seguro.py</code>.
      </p>
      <p style="margin:0;">
        <strong style="color:#b33a2e;">2. Explica por qué funciona:</strong> en tu informe, di brevemente por
        qué un valor pasado como parámetro siempre se trata como dato, nunca como código SQL.
      </p>
    </div>
  </div>

  <!-- ===================== 7. DESAFÍO 2B: RLS ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Desafío 2, parte B: Row-Level Security (RLS, Seguridad a Nivel de Fila)</h3>
    </div>
    <p>
      RLS es una capa de seguridad que vive dentro de la propia base de datos, no en tu código Python. Es un
      filtro invisible que se aplica automáticamente a cada consulta: "solo deja pasar las filas donde el
      dueño coincida con quien está haciendo la pregunta", sin que tu aplicación tenga que acordarse de
      filtrar nada.
    </p>
    <div class="content-box" style="margin-top:0.6rem;">
      <svg viewBox="0 0 640 220" style="width:100%; max-width:640px; display:block; margin:0 auto;">
        <rect x="20" y="20" width="180" height="60" rx="8" fill="rgba(91,124,153,0.12)" stroke="#5b7c99"/>
        <text x="110" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#5b7c99">Usuario A</text>
        <text x="110" y="63" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="var(--text-dim)">pide sus propios pagos</text>

        <rect x="230" y="70" width="180" height="80" rx="8" fill="rgba(201,154,78,0.14)" stroke="#c99a4e"/>
        <text x="320" y="95" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#c99a4e">🔒 Política RLS</text>
        <text x="320" y="115" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="var(--text-dim)">auth.uid() = user_id</text>
        <text x="320" y="133" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="var(--text-dim)">¿coincide?</text>

        <rect x="440" y="20" width="180" height="60" rx="8" fill="rgba(111,157,124,0.14)" stroke="#6f9d7c"/>
        <text x="530" y="45" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#6f9d7c">✅ Ve sus propios datos</text>
        <text x="530" y="63" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="var(--text-dim)">(fila propia)</text>

        <rect x="440" y="130" width="180" height="60" rx="8" fill="rgba(179,58,46,0.14)" stroke="#b33a2e"/>
        <text x="530" y="155" text-anchor="middle" font-family="Consolas, monospace" font-size="11" fill="#b33a2e">❌ 403 Forbidden</text>
        <text x="530" y="173" text-anchor="middle" font-family="Consolas, monospace" font-size="10" fill="var(--text-dim)">(fila de otro usuario)</text>

        <path d="M200 50 L228 90" stroke="var(--text-dim)" stroke-width="1.3"/>
        <path d="M410 95 L438 50" stroke="#6f9d7c" stroke-width="1.3"/>
        <path d="M410 125 L438 155" stroke="#b33a2e" stroke-width="1.3"/>
      </svg>
    </div>
    <p style="margin-top:0.6rem;">
      Sin RLS, cualquier usuario que conozca (o adivine) el <code>user_id</code> de otra persona podría
      pedirle a la API los pagos o el perfil de esa persona directamente, sin pasar por tu código Python. Con
      RLS activo, la propia base de datos rechaza esa petición antes de devolver una sola fila.
    </p>
    <p style="margin-top:0.6rem; font-size:0.85rem; color:var(--text-dim);">
      Estas políticas también se crean en el <strong>SQL Editor de Supabase</strong>.
    </p>
    <div class="content-box" style="border-left:4px solid #5b7c99; margin-top:0.6rem;">
      <p style="margin:0 0 0.5rem;"><strong>Por qué protegemos justo estas dos tablas</strong></p>
      <p style="margin:0;">
        <code style="color:#b33a2e;">perfiles</code> guarda el <code style="color:#b33a2e;">plan</code> de
        cada usuario (gratis o premium) junto a su nombre, y <code style="color:#b33a2e;">historial_pagos</code>
        guarda cuánto pagó y cuándo: ambos son datos que le pertenecen solo a esa persona, y que se filtren no
        es solo un problema de privacidad, también podría revelar quién pagó y quién no. En las dos, la regla es
        la misma, la política <strong style="color:#b33a2e;">"Owner Only"</strong>: cada usuario ve únicamente su
        propia fila, nunca la de otro.
      </p>
      <p style="margin:0.6rem 0 0; font-size:0.85rem; color:var(--text-dim);">
        <strong>Nota:</strong> no todas las tablas necesitan RLS, solo las que guardan datos sensibles o
        propios de cada usuario. <code>canciones</code>, por ejemplo, es un catálogo compartido y no lo
        necesita.
      </p>
    </div>
    <div class="code-block" style="margin-top:0.6rem;">
      <div class="code-block-header">
        <span class="code-dot" style="background:#ff5f56"></span>
        <span class="code-dot" style="background:#ffbd2e"></span>
        <span class="code-dot" style="background:#27c93f"></span>
        <span class="code-filename">politicas_rls.sql</span>
        <button class="code-copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>-- Activar el candado en ambas tablas
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE historial_pagos ENABLE ROW LEVEL SECURITY;

-- Política "Owner Only": solo el dueño puede ver su propia fila
CREATE POLICY "Los usuarios solo ven su propio perfil"
ON perfiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios solo ven sus propios pagos"
ON historial_pagos FOR SELECT
USING (auth.uid() = user_id);</code></pre>
    </div>
    <p style="margin-top:0.8rem; font-size:0.85rem; color:var(--text-dim);">
      <code style="color:#b33a2e;">auth.uid()</code> es una función especial de Supabase que devuelve el ID del
      usuario actualmente autenticado en la petición. La política compara ese ID contra el
      <code style="color:#b33a2e;">user_id</code> de cada fila, y solo deja pasar las que coinciden.
    </p>
  </div>

  <!-- ===================== 8. DESAFÍO 3: DBAAS Y MONITOREO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Desafío 3: Gestión de infraestructura en la nube (DBaaS)</h3>
    </div>
    <p>
      <strong>DBaaS</strong> (Database as a Service, "base de datos como servicio") significa que ya no eres
      tú quien instala, actualiza o le da mantenimiento físico al servidor de PostgreSQL, ese trabajo lo hace
      Supabase por ti. Tu responsabilidad se mueve de "mantener el motor funcionando" a "vigilar que nadie
      esté abusando de él".
    </p>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:#5b7c99;">Health Check</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un panel que muestra si la base de
          datos está viva, cuánta memoria y CPU está usando, y si hay algo anormal en su funcionamiento
          general.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">API Logs</h4>
        <p style="margin:0 0 0.4rem; font-size:0.85rem; color:var(--text-dim);">El registro de cada petición
          que llegó a tu proyecto: qué se pidió, quién lo pidió, y qué código de respuesta devolvió la base de
          datos:</p>
        <ul style="margin:0; padding-left:1.1rem; font-size:0.85rem; color:var(--text-dim); line-height:1.6;">
          <li><code>200</code>: éxito</li>
          <li><code>403</code> o <code>406</code>: bloqueado</li>
          <li><code>500</code>: error</li>
        </ul>
      </div>
    </div>
    <div class="content-box" style="border-left:4px solid #c99a4e; margin-top:0.8rem;">
      <p style="margin:0 0 0.5rem;"><strong>Cómo comprobar que tu RLS realmente funciona</strong></p>
      <p style="margin:0 0 0.5rem;">
        Este código se corre en <strong>Python</strong>, en tu propio entorno local, el mismo desde donde
        corres <code>buscar_musica.py</code>, no en el SQL Editor de Supabase. La idea, en orden:
      </p>
      <ol style="margin:0 0 0.6rem; padding-left:1.2rem; line-height:1.7;">
        <li>
          Los 10 <code>user_id</code> que sembraste con <code>crear_usuarios_prueba.py</code> son usuarios
          ficticios: ninguno es automáticamente "tú".
        </li>
        <li>
          Para que RLS tenga a quién comparar, primero tienes que <strong>autenticarte como uno de ellos</strong>
          con <code>sign_in_with_password</code> (todos comparten la contraseña de prueba
          <code>password123</code>).
        </li>
        <li>
          Ya autenticado como ese usuario, pides el <code>user_id</code> de <strong>otro</strong> distinto, para
          ver si RLS te bloquea.
        </li>
      </ol>
      <p style="margin:0 0 0.6rem;">
        Crea un archivo nuevo llamado <code>probar_rls.py</code>, en la misma carpeta donde ya tienes
        <code>database.py</code>, copia todo el código y agrega el id de un usuario que quieras consultar:
      </p>
      <div class="code-block" style="margin:0 0 0.6rem;">
        <div class="code-block-header">
          <span class="code-dot" style="background:#ff5f56"></span>
          <span class="code-dot" style="background:#ffbd2e"></span>
          <span class="code-dot" style="background:#27c93f"></span>
          <span class="code-filename">probar_rls.py</span>
          <button class="code-copy-btn" type="button">Copiar</button>
        </div>
        <pre><code>from database import supabase

# 1. Inicia sesión como uno de los 10 usuarios de prueba: esto se convierte
#    en "tú" para el resto del script (auth.uid() pasa a valer su user_id).
supabase.auth.sign_in_with_password({
    "email": "usuario1@soundflow.test",
    "password": "password123"
})

# 2. Copia de Table Editor > perfiles el user_id de OTRO usuario (no usuario1)
otro_user_id = "" <span style="color:#6f9d7c;"># agregar aca el usuario que van a consultar</span>

# 3. Ya autenticado como usuario1, intenta pedir el perfil de ese otro usuario
resultado = supabase.table("perfiles").select("*").eq("user_id", otro_user_id).execute()

print("Filas devueltas:", resultado.data)</code></pre>
      </div>
      <p style="margin:0 0 0.6rem; font-size:0.85rem; color:var(--text-dim);">
        Sin el paso 1, tu cliente queda sin autenticar y <code>auth.uid()</code> es nulo, así que la prueba no
        significa nada: no estarías simulando a "un usuario viendo a otro", sino a nadie viendo a alguien.
      </p>
      <p style="margin:0 0 0.6rem;">
        Guárdalo y ejecútalo desde la terminal, igual que corres cualquier otro script de esta materia:
      </p>
      <div class="code-block" style="margin:0 0 0.6rem;">
        <div class="code-block-header">
          <span class="code-dot" style="background:#ff5f56"></span>
          <span class="code-dot" style="background:#ffbd2e"></span>
          <span class="code-dot" style="background:#27c93f"></span>
          <span class="code-filename">terminal</span>
          <button class="code-copy-btn" type="button">Copiar</button>
        </div>
        <pre><code>python probar_rls.py</code></pre>
      </div>
      <p style="margin:0 0 0.4rem;">
        Cómo confirmar que la prueba salió bien:
      </p>
      <ol style="margin:0 0 0.4rem; padding-left:1.2rem; line-height:1.7;">
        <li>Si RLS está bien configurado, la consola debe mostrar <code>Filas devueltas: []</code>, vacío, no un
          error de Python, porque RLS simplemente filtra esa fila como si no existiera para tu usuario.</li>
        <li>Eso solo confirma que no viste la fila, no que fue <strong>bloqueada</strong> (podría ser que ese
          <code>user_id</code> simplemente no existe). La prueba real está en el Dashboard de Supabase: ve a
          <strong>Logs</strong> (en el menú lateral) y busca esa petición a <code>/rest/v1/perfiles</code>.</li>
        <li><code>200</code> exitosos: es justo la prueba de que RLS funciona, la petición pasa pero la fila
          queda filtrada.</li>
        <li><code>400</code> error: no tiene que ver con RLS, normalmente significa que el <code>user_id</code>
          que copiaste no tiene el formato correcto de UUID.</li>
      </ol>
    </div>
  </div>

  <!-- ===================== 9. GLOSARIO RÁPIDO ===================== -->
  <div class="activity-section">
    <div class="activity-section-header">
      <h3>Glosario rápido</h3>
    </div>
    <div class="concept-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="concept-card">
        <h4 style="color:var(--accent);">Transacción</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un grupo de operaciones que la base de
          datos trata como una sola unidad indivisible: se completan todas, o ninguna.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#b33a2e;">ROLLBACK</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Deshacer todos los cambios que una
          transacción alcanzó a hacer, dejando la base de datos como si nunca hubiera empezado.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#7c3aed;">SQL Injection</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Un ataque que aprovecha texto sin
          validar para inyectar comandos SQL no autorizados dentro de una consulta legítima.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#5b7c99;">RLS</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Row-Level Security (Seguridad a Nivel
          de Fila): políticas dentro de la propia base de datos que filtran qué filas puede ver o modificar
          cada usuario.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#6f9d7c;">DBaaS</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Database as a Service: un proveedor
          (Supabase) administra la infraestructura de tu base de datos, y tú te enfocas en usarla.</p>
      </div>
      <div class="concept-card">
        <h4 style="color:#c99a4e;">Consulta parametrizada</h4>
        <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">Una forma de construir consultas donde
          los valores del usuario se pasan por separado del texto SQL, para que nunca se interpreten como
          código.</p>
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
        <p>1. En el ejemplo del cajero automático, ¿qué problema ilustra que la máquina se trabe entre
          descontar el dinero y entregar los billetes?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Un problema de velocidad de
            internet</button>
          <button type="button" class="quiz-option" data-correct="true">Un estado inconsistente: el saldo
            bajó pero el usuario no recibió nada</button>
          <button type="button" class="quiz-option" data-correct="false">Un problema de diseño de la
            interfaz</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>2. ¿Qué garantiza la Atomicidad en una transacción?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Que la transacción se ejecute más
            rápido</button>
          <button type="button" class="quiz-option" data-correct="true">Que todos los pasos ocurran, o
            ninguno, sin quedar a medias</button>
          <button type="button" class="quiz-option" data-correct="false">Que los datos se encripten
            automáticamente</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>3. ¿Qué garantiza el Aislamiento (la "I" de ACID)?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Que dos transacciones simultáneas no
            vean los resultados a medias una de la otra</button>
          <button type="button" class="quiz-option" data-correct="false">Que la base de datos esté aislada de
            internet</button>
          <button type="button" class="quiz-option" data-correct="false">Que solo un usuario pueda usar la
            base de datos a la vez</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>4. En la función <code>procesar_upgrade_premium</code>, ¿qué pasa si el UPDATE del plan falla
          después de que el INSERT del pago ya se ejecutó?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">El pago queda registrado igual, sin
            el plan actualizado</button>
          <button type="button" class="quiz-option" data-correct="true">El bloque EXCEPTION revierte también
            el INSERT del pago, como si nunca hubiera pasado</button>
          <button type="button" class="quiz-option" data-correct="false">La base de datos se bloquea por
            completo</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>5. ¿Por qué <code>f"SELECT * FROM users WHERE id = {id_usuario}"</code> es peligroso?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Porque es una sintaxis inválida en
            Python</button>
          <button type="button" class="quiz-option" data-correct="true">Porque si el usuario escribe código
            SQL en vez de un ID, ese código se ejecuta como parte de la consulta</button>
          <button type="button" class="quiz-option" data-correct="false">Porque es más lento que usar
            .eq()</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>6. ¿Cómo evita <code>supabase.table("users").select("*").eq("id", id_usuario)</code> el SQL
          Injection?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">El valor se pasa por separado del
            texto SQL, así que nunca se interpreta como código ejecutable</button>
          <button type="button" class="quiz-option" data-correct="false">Porque encripta automáticamente el
            valor</button>
          <button type="button" class="quiz-option" data-correct="false">Porque bloquea cualquier usuario
            desconocido</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>7. ¿Qué hace exactamente una política de RLS como <code>auth.uid() = user_id</code>?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Encripta la columna user_id</button>
          <button type="button" class="quiz-option" data-correct="true">Solo deja pasar las filas donde el
            usuario autenticado coincide con el dueño de esa fila</button>
          <button type="button" class="quiz-option" data-correct="false">Elimina las filas de usuarios
            inactivos</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>8. Si un usuario intenta ver los pagos de otro y RLS está bien configurado, ¿qué deberías ver en
          los API Logs de Supabase?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="false">Un código 200 con los datos del otro
            usuario</button>
          <button type="button" class="quiz-option" data-correct="true">Un código 403 o 406, señal de que la
            petición fue bloqueada</button>
          <button type="button" class="quiz-option" data-correct="false">Ningún registro, RLS no deja rastro
            en los logs</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>9. ¿Qué significa que Supabase sea un DBaaS (Database as a Service)?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Que Supabase administra la
            infraestructura del servidor, y tú solo te enfocas en usar y proteger tus datos</button>
          <button type="button" class="quiz-option" data-correct="false">Que la base de datos es gratis para
            siempre</button>
          <button type="button" class="quiz-option" data-correct="false">Que no necesitas usar SQL nunca</button>
        </div>
        <p class="quiz-feedback"></p>
      </div>

      <div class="quiz-question">
        <p>10. ¿Qué le pasó a Knight Capital en 2012, y qué lección deja para sistemas que manejan dinero?</p>
        <div class="quiz-options">
          <button type="button" class="quiz-option" data-correct="true">Un despliegue de código a medias
            activó un sistema obsoleto y perdieron $440 millones en 45 minutos, mostrando el riesgo de estados
            intermedios corruptos</button>
          <button type="button" class="quiz-option" data-correct="false">Sufrieron un ataque de SQL
            Injection que borró su base de datos completa</button>
          <button type="button" class="quiz-option" data-correct="false">Perdieron sus datos porque no tenían
            copias de seguridad</button>
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
      · OWASP (2026). SQL Injection. owasp.org/www-community/attacks/SQL_Injection<br>
      · Supabase (2026). Row Level Security. supabase.com/docs/guides/database/postgres/row-level-security<br>
      · GeeksforGeeks (2026). ACID Properties in DBMS. geeksforgeeks.org/dbms/acid-properties-in-dbms<br>
      · RINKU (2025). ¿Qué es SQL INJECTION (SQLi)? Explicado paso a paso [Video]. YouTube. youtube.com/watch?v=lmMldcFgweI<br>
      · HelloByter (2024). Te Explico que es una Inyección SQL [Video]. YouTube. youtube.com/watch?v=ymrCs6EhFnI<br>
      · Hacker Nómada (2020). ACID Transactions: Fundamentos de bases de datos [Video]. YouTube. youtube.com/watch?v=0tAqp3w_K2o<br>
      · Hueso, L. Gestión de bases de datos (2ª Edición). Rama Editorial, 2012. Digitalia, digitaliapublishing.com/a/109944
    </p>
  </div>
`;
