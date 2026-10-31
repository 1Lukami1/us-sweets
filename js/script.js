/* ==========================================================================
   [NÁZEV] – skripty webu
   1. Mobilní menu (hamburger)
   2. Filtr krabic (stránka krabice.html)
   3. Hladké rolování na kotvy v rámci stránky
   Web funguje i bez JavaScriptu: menu je pak v patičce a filtr se nezobrazí.
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

    /* Klik na odkaz nebo mimo menu ho zavře */
    document.addEventListener('click', function (event) {
      if (!isOpen()) {
        return;
      }
      var clickedLink = event.target.closest('a');
      var insideNav = nav.contains(event.target);
      var onToggle = toggle.contains(event.target);
      if ((insideNav && clickedLink) || (!insideNav && !onToggle)) {
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
     2. Filtr krabic
     HTML: [data-filter] obsahuje skupiny [data-filter-group="tema|velikost"]
     s tlačítky [data-value]; položky [data-filter-item] mají data-tema
     a data-velikost. Hodnota „vse“ znamená bez omezení.
     Výchozí filtr lze nastavit v adrese, např. krabice.html?tema=gamer
     ------------------------------------------------------------------------ */
  function initFilter() {
    var root = document.querySelector('[data-filter]');
    if (!root) {
      return;
    }

    var items = Array.prototype.slice.call(document.querySelectorAll('[data-filter-item]'));
    var groups = Array.prototype.slice.call(root.querySelectorAll('[data-filter-group]'));
    var status = root.querySelector('[data-filter-status]');
    var empty = document.querySelector('[data-filter-empty]');
    var params = new URLSearchParams(window.location.search);
    var state = {};

    function buttonsOf(group) {
      return Array.prototype.slice.call(group.querySelectorAll('button[data-value]'));
    }

    groups.forEach(function (group) {
      var key = group.getAttribute('data-filter-group');
      var requested = params.get(key);
      var isValid = buttonsOf(group).some(function (button) {
        return button.getAttribute('data-value') === requested;
      });
      state[key] = isValid ? requested : 'vse';

      group.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-value]');
        if (!button) {
          return;
        }
        state[key] = button.getAttribute('data-value');
        apply();
      });
    });

    function matches(item) {
      return Object.keys(state).every(function (key) {
        return state[key] === 'vse' || item.getAttribute('data-' + key) === state[key];
      });
    }

    function apply() {
      groups.forEach(function (group) {
        var key = group.getAttribute('data-filter-group');
        buttonsOf(group).forEach(function (button) {
          button.setAttribute('aria-pressed', String(button.getAttribute('data-value') === state[key]));
        });
      });

      var visible = 0;
      items.forEach(function (item) {
        var show = matches(item);
        item.hidden = !show;
        if (show) {
          visible += 1;
        }
      });

      if (status) {
        status.textContent = 'Zobrazeno ' + visible + ' z ' + items.length + ' krabic.';
      }
      if (empty) {
        empty.hidden = visible !== 0;
      }
    }

    root.hidden = false;
    apply();
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
    initFilter();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
