/* ==========================================================================
   [NÁZEV] – RETRO VERZE – skripty webu
   (upravená kopie js/script.js z moderní verze)
   Skok na kotvy (#id) se správným přesunem fokusu, aby klávesnice
   i čtečky obrazovky pokračovaly od místa, kam odkaz vede.
   Menu je vždy vidět, takže hamburger ani jiné skripty nejsou potřeba.
   Web funguje i bez JavaScriptu. Nic se neukládá (žádné cookies ani localStorage).
   ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initAnchorFocus() {
    document.addEventListener('click', function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      var link = event.target.closest('a[href^="#"]');
      if (!link) {
        return;
      }

      var id = decodeURIComponent(link.getAttribute('href').slice(1));
      var target = id ? document.getElementById(id) : null;
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });

      if (!target.matches('a[href], button, input, select, textarea, [tabindex]')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });

      try {
        history.pushState(null, '', '#' + id);
      } catch (error) {
        /* Některé prohlížeče to při otevření ze souboru (file://) nepovolí */
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnchorFocus);
  } else {
    initAnchorFocus();
  }
})();
