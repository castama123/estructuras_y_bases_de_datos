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

// Demo de coseno sobre el plano cartesiano de SoundFlow (Semana 6): al elegir una canción,
// resalta su flecha (vector) junto a la de "una nueva búsqueda" y dibuja el ángulo entre
// ambas, para mostrar en vivo que la similitud de coseno mide ese ángulo, no la distancia.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.cosplane-btn');
  if (!btn) return;

  const demo = btn.closest('.cosplane-demo');
  if (!demo) return;
  const stage = demo.previousElementSibling;
  if (!stage) return;

  const target = btn.dataset.compare;

  stage.querySelectorAll('.cosplane-wedge').forEach(w => {
    w.setAttribute('opacity', w.dataset.compare === target ? '0.35' : '0');
  });

  stage.querySelectorAll('.cosplane-vec').forEach(v => {
    const isTarget = v.dataset.compare === target || v.dataset.compare === 'query';
    v.setAttribute('opacity', isTarget ? '1' : '0.25');
    v.setAttribute('stroke-width', v.dataset.compare === 'query' ? '3' : (isTarget ? '3' : '1.5'));
  });

  demo.querySelectorAll('.cosplane-btn').forEach(b => b.classList.remove('vsim-btn-active'));
  btn.classList.add('vsim-btn-active');

  const status = demo.querySelector('.cosplane-status');
  if (status) status.textContent = btn.dataset.status || '';
});

// Toggle pgvector vs Chroma (Semana 6, Clase 2): al hacer clic en uno de los dos botones,
// muestra el panel correspondiente y oculta el otro.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.dbcompare-btn');
  if (!btn) return;

  const wrapper = btn.closest('div');
  if (!wrapper) return;
  const group = wrapper.parentElement;
  if (!group) return;

  const target = btn.dataset.target;

  group.querySelectorAll('.dbcompare-btn').forEach(b => b.classList.remove('vsim-btn-active'));
  btn.classList.add('vsim-btn-active');

  group.querySelectorAll('.dbcompare-panel').forEach(p => {
    p.style.display = p.dataset.panel === target ? '' : 'none';
  });
});

// Ruleta de sorteo (Semana 8): gira un disco SVG dividido en tantas porciones como equipos.
// Cada giro elige al azar una porción todavía no usada, calcula cuánto tiene que rotar el disco
// para que esa porción quede justo bajo el puntero fijo (arriba), y al terminar la animación le
// asigna su turno real: todos los equipos presentan el martes, en el orden en que van saliendo en
// la ruleta, y la hora exacta de cada uno se calcula sumando la duración de ese equipo
// (data-duracion, en minutos) más un margen fijo (RULETA_MARGEN_MIN) a un reloj único que arranca
// en 6:15 p.m. El margen no es tiempo de exposición, es un colchón por si la cámara anterior se
// alarga un poco. El botón "Reiniciar ruleta" limpia todo para repetir el sorteo.
const RULETA_MARGEN_MIN = 5;
function ruletaFormatoHora(minutosDesdeMedianoche) {
  const horas = Math.floor(minutosDesdeMedianoche / 60);
  const mins = minutosDesdeMedianoche % 60;
  const ampm = horas < 12 ? 'a.m.' : 'p.m.';
  let horas12 = horas % 12;
  if (horas12 === 0) horas12 = 12;
  return `${horas12}:${String(mins).padStart(2, '0')} ${ampm}`;
}

document.addEventListener('click', (e) => {
  const spinBtn = e.target.closest('.ruleta-spin-btn');
  if (spinBtn) {
    if (spinBtn.disabled) return;
    const wrap = spinBtn.closest('.ruleta-wrap');
    const disco = wrap ? wrap.querySelector('.ruleta-disco') : null;
    if (!wrap || !disco) return;

    const todas = Array.from(wrap.querySelectorAll('.ruleta-slice'));
    const disponibles = todas.filter(s => !s.dataset.usado);
    if (!disponibles.length) return;

    // El estado del sorteo (el reloj y cuántos equipos ya se asignaron) vive en wrap.dataset.estado
    // como JSON, para que sobreviva entre un giro y el siguiente sin depender de variables globales.
    // "reloj" es la hora absoluta acumulada, en minutos desde medianoche (empieza en 1095 = 6:15 p.m.).
    if (!wrap.dataset.estado) {
      wrap.dataset.estado = JSON.stringify({
        reloj: 1095, // 6:15 p.m., en minutos desde medianoche
        conteo: 0
      });
    }
    const estado = JSON.parse(wrap.dataset.estado);

    // El Grupo 4 (Mónica, Jadilson, Isabel y Ricardo) siempre sale primero en el sorteo: en el
    // primer giro se fuerza esa porción en vez de escoger al azar; del segundo giro en adelante,
    // el resto de equipos se sortea normalmente.
    const esPrimerGiro = disponibles.length === todas.length;
    const grupo4 = disponibles.find(s => (s.dataset.grupo || '').startsWith('Grupo 4'));
    const elegido = (esPrimerGiro && grupo4) ? grupo4 : disponibles[Math.floor(Math.random() * disponibles.length)];
    const indice = parseInt(elegido.dataset.index, 10) || 0;
    const duracion = parseInt(elegido.dataset.duracion, 10) || 20;
    const anguloPorcion = 360 / todas.length; // reparte el círculo entre el total real de equipos
    const anguloCentro = indice * anguloPorcion + anguloPorcion / 2;

    const rotacionActual = parseFloat(disco.dataset.rotacion || '0');
    const vueltas = 4 + Math.floor(Math.random() * 3); // 4 a 6 vueltas completas, solo por efecto
    let delta = (-anguloCentro - rotacionActual) % 360;
    if (delta < 0) delta += 360;
    const nuevaRotacion = rotacionActual + delta + vueltas * 360;

    disco.style.transform = `rotate(${nuevaRotacion}deg)`;
    disco.dataset.rotacion = String(nuevaRotacion);

    const resetBtn = wrap.querySelector('.ruleta-reset-btn');
    spinBtn.disabled = true;
    if (resetBtn) resetBtn.disabled = true;

    setTimeout(() => {
      const inicio = estado.reloj;
      estado.reloj = inicio + duracion + RULETA_MARGEN_MIN;
      estado.conteo += 1;
      wrap.dataset.estado = JSON.stringify(estado);

      const horaTexto = ruletaFormatoHora(inicio);

      elegido.dataset.usado = 'true';
      elegido.style.opacity = '0.2';

      const tbody = wrap.querySelector('.ruleta-resultados tbody');
      if (tbody) {
        const fila = document.createElement('tr');
        const celda = (texto, color, nowrap) => `<td style="padding:0.5rem 0.6rem; border-bottom:1px solid var(--border); ${nowrap ? 'white-space:nowrap;' : ''} ${color ? 'color:' + color + ';' : ''}">${texto}</td>`;
        fila.innerHTML = celda(String(tbody.querySelectorAll('tr').length + 1)) + celda(elegido.dataset.grupo || '') + celda(horaTexto, 'var(--accent)', true);
        tbody.appendChild(fila);
      }

      const restantes = wrap.querySelectorAll('.ruleta-slice:not([data-usado])').length;
      const status = wrap.querySelector('.ruleta-status');
      if (status) {
        status.textContent = restantes > 0
          ? `Quedan ${restantes} equipo${restantes === 1 ? '' : 's'} por sortear.`
          : '¡Sorteo completo! El orden final quedó en la tabla de arriba.';
      }

      if (restantes > 0) spinBtn.disabled = false;
      if (resetBtn) resetBtn.disabled = false;
    }, 3300);
    return;
  }

  const resetBtn = e.target.closest('.ruleta-reset-btn');
  if (resetBtn) {
    if (resetBtn.disabled) return;
    const wrap = resetBtn.closest('.ruleta-wrap');
    if (!wrap) return;

    wrap.querySelectorAll('.ruleta-slice').forEach(s => {
      delete s.dataset.usado;
      s.style.opacity = '1';
    });
    delete wrap.dataset.estado;
    const tbody = wrap.querySelector('.ruleta-resultados tbody');
    if (tbody) tbody.innerHTML = '';

    const total = wrap.querySelectorAll('.ruleta-slice').length;
    const status = wrap.querySelector('.ruleta-status');
    if (status) status.textContent = `Quedan ${total} equipo${total === 1 ? '' : 's'} por sortear.`;

    const spinBtn = wrap.querySelector('.ruleta-spin-btn');
    if (spinBtn) spinBtn.disabled = false;
  }
});
