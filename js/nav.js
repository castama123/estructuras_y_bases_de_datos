// Construye el menú desplegable "Semanas" del navbar en todas las páginas.
// Requiere que js/weeks-data.js ya esté cargado (define WEEKS).
(function () {
  const menu = document.getElementById('navWeeksMenu');
  if (!menu || typeof WEEKS === 'undefined') return;

  WEEKS.forEach(w => {
    const a = document.createElement('a');
    a.href = `semana.html?n=${w.n}`;
    a.textContent = `Semana ${w.n}: ${w.titulo}`;
    menu.appendChild(a);
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
