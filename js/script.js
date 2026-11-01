/* ==========================================================================
   [NÁZEV] – skripty webu
   1. Mobilní menu (hamburger) s plynulým rozbalením
   2. Jemné animace při rolování
   3. Hladké rolování na kotvy v rámci stránky
   Web funguje i bez JavaScriptu: menu je pak v patičce a obsah je hned vidět.
   Nic se neukládá (žádné cookies ani localStorage).
   ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Posluchač změny media query i pro starší Safari */
  function onMediaChange(mql, handler) {
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(handler);
    }
  }

  /* ------------------------------------------------------------------------
     1. Mobilní menu
     ------------------------------------------------------------------------ */
  function initMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = toggle ? document.getElementById(toggle.getAttribute('aria-controls')) : null;
    if (!toggle || !nav) {
      return;
    }

    var label = toggle.querySelector('.nav-toggle__label');
    var desktop = window.matchMedia('(min-width: 56em)');

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (label) {
        label.textContent = open ? 'Zavřít' : 'Menu';
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    /* Escape zavře menu a vrátí fokus na tlačítko */
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Klik na odkaz v menu nebo kamkoli mimo menu ho zavře */
    document.addEventListener('click', function (event) {
      if (!isOpen()) {
        return;
      }
      var insideNav = nav.contains(event.target);
      var onToggle = toggle.contains(event.target);
      if ((insideNav && event.target.closest('a')) || (!insideNav && !onToggle)) {
        setOpen(false);
      }
    });

    /* Po přechodu na desktop vrátit menu do výchozího stavu */
    onMediaChange(desktop, function (event) {
      if (event.matches) {
        setOpen(false);
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Animace při rolování
     Prvky s atributem data-reveal se jemně vysunou, když dorazí na obrazovku.
     Co je vidět už při načtení, se neanimuje (aby nic neproblikávalo).
     Při „omezeném pohybu“ v systému se animace vůbec nezapnou.
     ------------------------------------------------------------------------ */
  function initReveal() {
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      return;
    }

    var elements = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!elements.length) {
      return;
    }

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    elements.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        element.classList.add('is-visible');
      }
    });

    document.documentElement.classList.add('js-reveal');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    elements.forEach(function (element) {
      if (!element.classList.contains('is-visible')) {
        observer.observe(element);
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. Hladké rolování na kotvy (#id) se správným přesunem fokusu
     ------------------------------------------------------------------------ */
  function initSmoothScroll() {
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
    initMenu();
    initReveal();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
