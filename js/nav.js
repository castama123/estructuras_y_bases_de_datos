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
      span.textContent = `Semana ${w.n}: ${w.titulo} (en construcción)`;
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
          if (estado) estado.textContent = 'Recorrido completo. Elige otro recorrido para comparar el orden.';
          botones.forEach(b => { b.disabled = false; });
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

  // Guarda qué clase quedó abierta en esta semana, para restaurarla si se recarga la página.
  const params = new URLSearchParams(location.search);
  const weekN = parseInt(params.get('n'), 10) || 1;
  localStorage.setItem('classTab_semana' + weekN, cls);
});
