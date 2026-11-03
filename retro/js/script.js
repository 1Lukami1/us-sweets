/* ==========================================================================
   [NÁZEV] – RETRO VERZE – skripty webu
   (upravená kopie js/script.js z moderní verze)
   1. Tlačítko „Zastavit animace“ pro běžící text a blikající NEW!
   2. Skok na kotvy (#id) se správným přesunem fokusu (bez plynulého
      rolování, jak se na web z roku 1998 sluší)
   Web funguje i bez JavaScriptu: animace se pak zastaví přes hover
   nebo systémové nastavení „omezit pohyb“.
   Nic se neukládá (žádné cookies ani localStorage).
   ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------------
     1. Zastavení a spuštění animací
     ------------------------------------------------------------------------ */
  function initMotionToggle() {
    var button = document.querySelector('[data-motion-toggle]');
    if (!button) {
      return;
    }

    /* Při „omezit pohyb“ se nic nehýbe, tlačítko není potřeba */
    if (reducedMotion.matches) {
      return;
    }

    var root = document.documentElement;

    function setPaused(paused) {
      root.classList.toggle('motion-paused', paused);
      button.setAttribute('aria-pressed', String(paused));
      button.textContent = paused ? 'Spustit animace' : 'Zastavit animace';
    }

    button.hidden = false;
    setPaused(false);

    button.addEventListener('click', function () {
      setPaused(!root.classList.contains('motion-paused'));
    });
  }

  /* ------------------------------------------------------------------------
     2. Skok na kotvy se správným přesunem fokusu
     ------------------------------------------------------------------------ */
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
      target.scrollIntoView({ behavior: 'auto', block: 'start' });

      /* Fokus na cíl, aby klávesnice i čtečky pokračovaly od správného místa */
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

  function init() {
    initMotionToggle();
    initAnchorFocus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
