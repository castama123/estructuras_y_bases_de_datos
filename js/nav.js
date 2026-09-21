// Construye el menú desplegable "Semanas" del navbar en todas las páginas.
// Requiere que js/weeks-data.js ya esté cargado (define WEEKS).
(function () {
  const menu = document.getElementById('navWeeksMenu');
  if (!menu || typeof WEEKS === 'undefined') return;

  WEEKS.forEach(w => {
    const disponible = w.disponible !== false;
    if (disponible) {
      const a = document.createElement('a');
      a.href = `semana.html?n=${w.n}`;
      a.textContent = `Semana ${w.n}: ${w.titulo}`;
      menu.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.className = 'nav-week-disabled';
      span.textContent = w.titulo
        ? `Semana ${w.n}: ${w.titulo} (en construcción)`
        : `Semana ${w.n} (en construcción)`;
      menu.appendChild(span);
    }
  });

  // Cierra el dropdown al hacer clic en un enlace (útil en móvil/tablet)
  const details = menu.closest('details.nav-dropdown');
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { if (details) details.open = false; });
  });

  // Cierra el dropdown si se hace clic fuera de él
  document.addEventListener('click', (e) => {
    if (details && details.open && !details.contains(e.target)) {
      details.open = false;
    }
  });
})();

// Botón "Copiar" de los bloques de código tipo editor (funciona en cualquier
// página, incluso si el contenido se insertó dinámicamente después).
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.code-copy-btn');
  if (!btn) return;
  const block = btn.closest('.code-block');
  const code = block ? block.querySelector('code') : null;
  if (!code) return;
  navigator.clipboard.writeText(code.textContent).then(() => {
    const original = btn.textContent;
    btn.textContent = '¡Copiado!';
    setTimeout(() => { btn.textContent = original; }, 1500);
  });
});

// Tarjetas con volteo (flip cards): clic para mostrar el reverso.
document.addEventListener('click', (e) => {
  const card = e.target.closest('.flip-card');
  if (!card) return;
  card.classList.toggle('flipped');
});

// Quiz rápido de autoevaluación: clic en una opción da feedback inmediato.
document.addEventListener('click', (e) => {
  const opt = e.target.closest('.quiz-option');
  if (!opt || opt.disabled) return;

  const question = opt.closest('.quiz-question');
  const options = question.querySelectorAll('.quiz-option');
  const isCorrect = opt.dataset.correct === 'true';

  options.forEach(o => { o.disabled = true; });

  if (isCorrect) {
    opt.classList.add('correct');
  } else {
    opt.classList.add('incorrect');
    const correctOpt = question.querySelector('.quiz-option[data-correct="true"]');
    if (correctOpt) correctOpt.classList.add('correct');
  }

  const feedback = question.querySelector('.quiz-feedback');
  if (feedback) {
    feedback.style.display = 'block';
    feedback.textContent = isCorrect
      ? '¡Correcto!'
      : 'Casi. La respuesta correcta quedó marcada en verde.';
    feedback.className = 'quiz-feedback ' + (isCorrect ? 'quiz-feedback-ok' : 'quiz-feedback-bad');
  }
});

// Tarjetas con data-highlight: clic para resaltar esa parte en un ejemplo
// asociado (por defecto #tablaDemo; usa data-highlight-target para apuntar a
// otro elemento, como #anatomiaDemo). Vuelve a hacer clic para quitar el resaltado.
document.addEventListener('click', (e) => {
  const card = e.target.closest('.numbered-card[data-highlight]');
  if (!card) return;

  const targetId = card.dataset.highlightTarget || 'tablaDemo';
  const demo = document.getElementById(targetId);
  if (!demo) return;

  const target = card.dataset.highlight;
  const wasActive = card.classList.contains('active-highlight');

  // Limpia cualquier resaltado previo (tarjetas y demo) dentro de esta misma tarjeta
  card.closest('.numbered-grid').querySelectorAll('.numbered-card').forEach(c => {
    c.classList.remove('active-highlight');
  });
  Array.from(demo.classList).forEach(cls => {
    if (cls.indexOf('hl-') === 0) demo.classList.remove(cls);
  });

  if (!wasActive) {
    card.classList.add('active-highlight');
    demo.classList.add('hl-' + target);
  }
});

// Simulador de recorrido (árboles y grafos, Semana 2): anima, paso a paso y en
// tiempo real, el orden en que un recorrido (BFS, DFS, etc.) visita cada nodo.
// El botón que dispara la animación trae su propia secuencia en el atributo
// data-orden (ids de nodo separados por coma), así el mismo código sirve para
// cualquier diagrama que use la clase .tree-demo / .tree-nodo.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.tree-traversal-btn');
  if (!btn || btn.disabled) return;

  const demo = btn.closest('.tree-demo');
  if (!demo) return;

  const secuencia = (btn.dataset.orden || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!secuencia.length) return;

  const botones = demo.querySelectorAll('.tree-traversal-btn');
  const estado = demo.querySelector('.tree-demo-status');
  const nodos = demo.querySelectorAll('.tree-nodo');

  // Limpia cualquier resaltado de un recorrido anterior antes de empezar uno nuevo.
  nodos.forEach(g => {
    g.classList.remove('tree-nodo-visitando', 'tree-nodo-visitado');
  });

  // Antes de cada recorrido, vuelve el árbol a su estado original: oculta cualquier
  // nodo/línea "extra" que se hubiera insertado (data-extra), y vuelve a mostrar
  // cualquier nodo/línea "eliminable" que se hubiera ocultado (data-removable) en
  // un recorrido anterior. Así, inserciones/eliminaciones simuladas en un botón no
  // dejan rastro al probar otro botón.
  demo.querySelectorAll('[data-extra]').forEach(el => { el.style.opacity = '0'; });
  demo.querySelectorAll('[data-removable]').forEach(el => { el.style.opacity = '1'; });

  botones.forEach(b => { b.disabled = true; });

  const paso = 750; // milisegundos entre cada nodo visitado
  secuencia.forEach((idNodo, i) => {
    setTimeout(() => {
      const nodoActivo = demo.querySelector(`.tree-nodo[data-nodo="${idNodo}"]`);
      // El nodo anterior pasa de "visitando" a "visitado" (queda marcado, más tenue).
      nodos.forEach(g => { g.classList.remove('tree-nodo-visitando'); });
      if (nodoActivo) {
        nodoActivo.classList.add('tree-nodo-visitando', 'tree-nodo-visitado');
      }
      if (estado && nodoActivo) {
        estado.textContent = `Paso ${i + 1} de ${secuencia.length}: visitando "${nodoActivo.dataset.nombre}"`;
      }

      if (i === secuencia.length - 1) {
        setTimeout(() => {
          nodos.forEach(g => { g.classList.remove('tree-nodo-visitando'); });

          // data-revela="X": el botón termina insertando de verdad el nodo/línea
          // marcados con data-extra="X" (aparecen con una transición de opacidad).
          if (btn.dataset.revela) {
            demo.querySelectorAll(`[data-extra="${btn.dataset.revela}"]`).forEach(el => { el.style.opacity = '1'; });
          }
          // data-oculta="X": el botón termina eliminando de verdad el nodo/línea
          // marcados con data-removable="X" (desaparecen con una transición de opacidad).
          if (btn.dataset.oculta) {
            demo.querySelectorAll(`[data-removable="${btn.dataset.oculta}"]`).forEach(el => { el.style.opacity = '0'; });
          }

          if (estado) {
            estado.textContent = btn.dataset.mensajeFinal || 'Recorrido completo. Elige otro recorrido para comparar el orden.';
          }
          botones.forEach(b => { b.disabled = false; });
        }, paso);
      }
    }, i * paso);
  });
});

// Visor paso a paso (.tree-stepper): muestra una serie de diagramas fijos, uno
// por paso (.tree-step-frame[data-step]), y dos botones (.tree-step-prev /
// .tree-step-next) para avanzar o retroceder entre ellos. A diferencia del
// simulador de recorrido, aquí cada paso es un dibujo distinto (no una
// animación), útil para explicar procesos con varios cambios encadenados.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.tree-step-prev, .tree-step-next');
  if (!btn || btn.disabled) return;

  const stepper = btn.closest('.tree-stepper');
  if (!stepper) return;

  const frames = Array.from(stepper.querySelectorAll('.tree-step-frame'));
  if (!frames.length) return;

  let actual = frames.findIndex(f => f.style.display !== 'none');
  if (actual === -1) actual = 0;

  const delta = btn.classList.contains('tree-step-next') ? 1 : -1;
  const siguiente = Math.min(frames.length - 1, Math.max(0, actual + delta));

  frames.forEach((f, i) => { f.style.display = (i === siguiente) ? '' : 'none'; });

  const contador = stepper.querySelector('.tree-step-counter');
  if (contador) contador.textContent = `Paso ${siguiente + 1} de ${frames.length}`;

  const prevBtn = stepper.querySelector('.tree-step-prev');
  const nextBtn = stepper.querySelector('.tree-step-next');
  if (prevBtn) prevBtn.disabled = siguiente === 0;
  if (nextBtn) nextBtn.disabled = siguiente === frames.length - 1;
});

// Botón "Reiniciar árbol": devuelve un .tree-demo a su estado original (oculta
// lo "extra", vuelve a mostrar lo "removable", limpia resaltados) sin tener que
// volver a correr una animación completa. Útil para repetir la explicación.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.tree-reset-btn');
  if (!btn) return;

  const demo = btn.closest('.tree-demo');
  if (!demo) return;

  demo.querySelectorAll('.tree-nodo').forEach(g => {
    g.classList.remove('tree-nodo-visitando', 'tree-nodo-visitado');
  });
  demo.querySelectorAll('[data-extra]').forEach(el => { el.style.opacity = '0'; });
  demo.querySelectorAll('[data-removable]').forEach(el => { el.style.opacity = '1'; });
  demo.querySelectorAll('.tree-traversal-btn').forEach(b => { b.disabled = false; });

  const estado = demo.querySelector('.tree-demo-status');
  if (estado) estado.textContent = 'Árbol reiniciado. Elige una operación para verla de nuevo.';
});

// Simulador de logs de queries (Semana 5, Clase 2: problema N+1): revela línea
// por línea las consultas SQL que un ORM dispararía de verdad, para visualizar
// cuántas queries se ejecutan según la estrategia de carga usada. El botón trae
// data-lineas (JSON con la lista de queries en texto), data-total (mensaje final)
// y data-tono ("malo"/"bueno") para colorear el contador.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.query-log-btn');
  if (!btn || btn.disabled) return;

  const demo = btn.closest('.query-log-demo');
  if (!demo) return;
  const salida = demo.querySelector('.query-log-output');
  const contador = demo.querySelector('.query-log-counter');
  if (!salida) return;

  let lineas;
  try {
    lineas = JSON.parse(btn.dataset.lineas || '[]');
  } catch (err) {
    return;
  }
  if (!lineas.length) return;

  const botones = demo.querySelectorAll('.query-log-btn');
  botones.forEach(b => { b.disabled = true; });
  salida.innerHTML = '';
  if (contador) {
    contador.textContent = '';
    contador.className = 'query-log-counter';
  }

  const paso = 140;
  lineas.forEach((linea, i) => {
    setTimeout(() => {
      const fila = document.createElement('div');
      fila.className = 'query-log-line';
      fila.textContent = `[${i + 1}] ${linea}`;
      salida.appendChild(fila);
      salida.scrollTop = salida.scrollHeight;

      if (i === lineas.length - 1) {
        setTimeout(() => {
          if (contador) {
            contador.textContent = btn.dataset.total || `Total: ${lineas.length} queries ejecutadas`;
            contador.classList.add(btn.dataset.tono === 'bueno' ? 'query-log-bueno' : 'query-log-malo');
          }
          botones.forEach(b => { b.disabled = false; });
        }, 200);
      }
    }, i * paso);
  });
});

// Simulador del pipeline de agregación (Semana 4): anima, etapa por etapa, cómo
// un "documento" avanza por $match → $group → $sort → $project. El resumen de
// cada etapa vive en el atributo data-resumen de cada .pipeline-stage.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.pipeline-play-btn');
  if (!btn || btn.disabled) return;

  const demo = btn.closest('.pipeline-demo');
  if (!demo) return;

  const stages = Array.from(demo.querySelectorAll('.pipeline-stage'));
  const token = demo.querySelector('.pipeline-token');
  const estado = demo.querySelector('.pipeline-demo-status');
  if (!stages.length || !token) return;

  stages.forEach(s => s.classList.remove('pipeline-stage-active', 'pipeline-stage-done'));
  btn.disabled = true;
  token.style.opacity = '1';

  const paso = 1300; // milisegundos entre cada etapa
  const track = token.parentElement;

  stages.forEach((stage, i) => {
    setTimeout(() => {
      stages.forEach(s => s.classList.remove('pipeline-stage-active'));
      stage.classList.add('pipeline-stage-active', 'pipeline-stage-done');

      const trackRect = track.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const left = stageRect.left - trackRect.left + stageRect.width / 2 - token.offsetWidth / 2;
      token.style.left = left + 'px';

      if (estado) {
        estado.textContent = `Etapa ${i + 1} de ${stages.length}: ${stage.dataset.resumen || ''}`;
      }

      if (i === stages.length - 1) {
        setTimeout(() => {
          stages.forEach(s => s.classList.remove('pipeline-stage-active'));
          if (estado) estado.textContent = 'Pipeline completo. Dale clic de nuevo para repetir la animación.';
          token.style.opacity = '0';
          btn.disabled = false;
        }, paso);
      }
    }, i * paso);
  });
});

// Pestañas "Clase 1" / "Clase 2" dentro de una semana con varias clases.
document.addEventListener('click', (e) => {
  const tab = e.target.closest('.class-tab');
  if (!tab) return;

  const cls = tab.dataset.class;
  const tabs = tab.closest('.class-tabs');
  if (tabs) {
    tabs.querySelectorAll('.class-tab').forEach(t => t.classList.toggle('active', t === tab));
  }

  const clase1El = document.getElementById('weekContent');
  const clase2El = document.getElementById('weekContent2');
  if (clase1El) clase1El.style.display = cls === '1' ? '' : 'none';
  if (clase2El) clase2El.style.display = cls === '2' ? '' : 'none';

  // Si la semana tiene título distinto por clase, actualízalo al cambiar de pestaña.
  const detailTituloEl = document.getElementById('detailTitulo');
  if (detailTituloEl && window.currentWeek) {
    const w = window.currentWeek;
    detailTituloEl.textContent = (cls === '2' ? w.tituloClase2 : w.tituloClase1) || w.titulo;
  }

  // Guarda qué clase quedó abierta en esta semana, para restaurarla si se recarga la página.
  const params = new URLSearchParams(location.search);
  const weekN = parseInt(params.get('n'), 10) || 1;
  localStorage.setItem('classTab_semana' + weekN, cls);
});

// Simulador de búsqueda vectorial (Semana 6): al elegir una "búsqueda" de ejemplo, mueve un
// punto de consulta sobre un mapa 2D de canciones y resalta las más cercanas (sus "vecinos
// más cercanos"), para visualizar sin código qué hace una base de datos vectorial por debajo.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.vsim-btn');
  if (!btn) return;

  const demo = btn.closest('.vsim-demo');
  if (!demo) return;

  const query = btn.dataset.query;
  const point = (btn.dataset.point || '').split(',').map(Number);
  const marker = demo.querySelector('.vsim-marker');
  if (marker && point.length === 2) {
    marker.setAttribute('cx', point[0]);
    marker.setAttribute('cy', point[1]);
    marker.setAttribute('opacity', '1');
  }

  demo.querySelectorAll('.vsim-line').forEach(line => {
    line.setAttribute('opacity', line.dataset.query === query ? '1' : '0');
  });

  demo.querySelectorAll('.vsim-song').forEach(song => {
    song.classList.remove('vsim-active');
  });
  (btn.dataset.nearest || '').split(',').forEach(id => {
    const song = demo.querySelector('.vsim-song[data-song="' + id + '"]');
    if (song) song.classList.add('vsim-active');
  });

  demo.querySelectorAll('.vsim-btn').forEach(b => b.classList.remove('vsim-btn-active'));
  btn.classList.add('vsim-btn-active');

  const status = demo.querySelector('.vsim-status');
  if (status) status.textContent = btn.dataset.status || '';
});
