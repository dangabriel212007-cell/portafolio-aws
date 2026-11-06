/* Flight Log — behaviour: theme, language, menu, motion and the mini-game. */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Browser storage can be blocked; never let that break the page.
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } },
  };

  /* =====================================================================
     Spanish text. English lives in index.html and is read from the page.
     ===================================================================== */
  const ES = {
    'skip': 'Saltar al contenido',
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.game': 'Mini-juego',
    'nav.contact': 'Contacto',
    'lang.group': 'Idioma',
    'theme': 'Vuelo nocturno',
    'menu': 'Menú',

    'hero.title': 'Hola, soy Daniela Gabriel Suárez.',
    'hero.tagline': 'Estudiante de contaduría que aprende a cuidar el dinero en la nube.',
    'hero.meta': 'Futura FinOps · Aprendiendo AWS · UTTECAM',
    'hero.cta': 'Ver mi bitácora',
    'hero.hint': '¿Puedes despegar dentro del presupuesto? ✈',
    'hero.alt': 'Caricatura de Daniela saludando desde la cabina de un biplano amarillo con blanco, con su bufanda roja al viento.',

    'about.title': 'La piloto',
    'about.sub': 'Sobre mí',
    'about.license': 'Licencia de piloto',
    'about.licenseTitle': 'Licencia de piloto',
    'about.alt': 'Retrato en caricatura de Daniela sonriendo, con gorro de aviadora café y goggles.',
    'about.f.name': 'Nombre',
    'about.f.study': 'Estudia',
    'about.v.study': 'Contaduría',
    'about.f.school': 'Escuela',
    'about.f.base': 'Base',
    'about.v.base': 'Puebla, México',
    'about.f.heading': 'Rumbo',
    'about.text': 'Estudio Contaduría en la Universidad Tecnológica de Tecamachalco (UTTECAM), en Puebla, México. Descubrí FinOps por pláticas y recomendaciones. Nunca había oído de eso y me llamó la atención de inmediato: como futura contadora me da nuevas habilidades, y me encanta reducir costos y hacer presupuestos. Por eso estoy como 80% segura de que FinOps es mi camino.',

    'skills.title': 'Instrumentos de cabina',
    'skills.sub': 'Habilidades',
    'skills.alt': 'Caricatura de Daniela en un escritorio usando una laptop y una calculadora, junto a una gráfica con una nube pequeña.',
    'skills.legendLabel': 'Qué significan los indicadores',
    'skills.using': 'Lo uso',
    'skills.learning': 'Aprendiendo',
    'skills.s1': 'Contabilidad y estados financieros',
    'skills.s2': 'Presupuestos y reducción de costos',
    'skills.s3': 'Ventas y atención al cliente',
    'skills.s4': 'Hojas de cálculo (Excel / Google Sheets)',
    'skills.s5': 'Fundamentos de AWS Cloud',
    'skills.s7': 'Inglés',

    'projects.title': 'Bitácora de vuelo',
    'projects.sub': 'Proyectos',
    'parts.what': 'Qué es',
    'parts.mine': 'Qué hice',
    'parts.why': 'Por qué importa',
    'parts.learned': 'Qué aprendí',
    'newTab': '(se abre en otra pestaña)',
    'p1.title': 'AWS Cloud Quest',
    'p1.stamp': 'En curso',
    'p1.what': 'Aprendo AWS con Cloud Quest, un juego práctico con laboratorios reales.',
    'p1.builder': 'Nivel de Builder',
    'p1.reputation': 'Nivel de reputación',
    'p1.cp': 'Rol Cloud Practitioner',
    'p1.cpCount': '10 de 12 tareas',
    'p1.cpAria': 'Tareas de Cloud Practitioner completadas',
    'p1.also': 'También voy avanzando en:',
    'p1.link': 'Sobre AWS Cloud Quest',
    'p2.stamp': 'Mi negocio',
    'p2.what': 'Mi propio microemprendimiento de skincare.',
    'p2.mine': 'Me encargo de compras, precios, ventas y ganancias, y llevo el inventario y las ventas en una hoja de cálculo.',
    'p2.why': 'Es FinOps en pequeño: costos, márgenes y presupuestos reales.',
    'p2.soon': 'Página web próximamente',
    'p3.title': 'Lo que cuesta este portafolio',
    'p3.stamp': 'Presupuesto: $1 / mes',
    'p3.what': 'Este sitio corre en AWS Amplify. Puse una alerta de presupuesto mensual para saber siempre cuánto cuesta.',
    'p3.mine': 'Lo hice con HTML, CSS y JavaScript, lo publiqué en AWS Amplify Hosting y creé un presupuesto mensual de $1 en AWS Budgets.',
    'p1.learned': 'El tema que más me marcó fue Amazon EC2. Aprendí cómo se usan hoy los servidores en la nube.',
    'p2.learned': 'Aprendí a calcular cuánto ganamos por unidad. También llevo mejores registros de la mercancía que entra y sale.',
    'p3.learned': 'Aprendí los pasos para publicar un sitio en AWS Amplify y crear un presupuesto en AWS Budgets. Ahora tengo una idea de cuánto podría gastar si rento un servicio así en la nube.',

    'game.title': 'Despega dentro del presupuesto',
    'game.sub': 'Mini-juego con un dato curioso al final',
    'game.mission': 'Misión: pon el portafolio de Daniela en línea por menos de $5 al mes.',
    'game.help': 'Toca la carga que quieres subir o arrástrala al avión. Luego presiona ¡Despegar!',
    'game.disclaimer': 'Los precios son ilustrativos.',
    'game.cargoLabel': 'Carga',
    'game.fuel': 'Costo mensual',
    'game.fuelAria': 'Costo mensual contra el presupuesto de $5',
    'game.planeAlt': 'Biplano amarillo con blanco, vacío, esperando en la pista.',
    'game.empty': 'Todavía no hay nada a bordo.',
    'game.onboardLabel': 'A bordo',
    'game.takeoff': '¡Despegar!',
    'game.reset': 'Intentar de nuevo',
    'c.hosting': 'Hosting del sitio (Amplify)',
    'c.bigserver': 'Servidor enorme encendido 24/7',
    'c.domain': 'Dominio y HTTPS',
    'c.chatbot': 'Chatbot con IA',
    'c.alert': 'Alerta de presupuesto',
    'c.idledb': 'Base de datos que nadie usa',
    'c.images': 'Almacenamiento de imágenes',
    'c.testserver': 'Servidor de prueba olvidado',

    'carry.title': 'Equipaje de mano',
    'carry.sub': 'Lo que me hace ser yo',
    'carry.soon': 'Foto próximamente',
    'carry.t1': 'Peluches',
    'carry.d1': 'Amo los peluches. Mi favorito es uno que me regaló mi papá en mi cumpleaños número 7.',
    'carry.a1': 'Caricatura de Daniela abrazando a su perrito de peluche grande y a un osito.',
    'carry.a3': 'Caricatura de Daniela con bata rosa y mascarilla verde, con una rodaja de pepino junto a sus productos de skincare.',
    'carry.t2': 'Fútbol',
    'carry.a2': 'Caricatura de Daniela pateando un balón de fútbol en el pasto.',
    'carry.d2': 'Juego fútbol de medio centro.',
    'carry.d3': 'El skincare es mi ritual de autocuidado; así nació mi negocio.',
    'carry.t4': 'Música',
    'carry.a4': 'Caricatura de Daniela con los ojos cerrados escuchando música con audífonos, rodeada de notas musicales.',
    'carry.d4': 'Amo la música por sus letras. Mi banda favorita es Cuarteto de Nos. Su canción "El aprendiz" me recuerda que los momentos difíciles se convierten en aprendizaje.',

    'contact.title': 'Torre de control',
    'contact.sub': 'Contacto',
    'contact.from': 'Desde',
    'contact.to': 'Hacia',
    'contact.message': '¡Hablemos de presupuestos, nube o skincare!',
    'contact.alt': 'Caricatura de Daniela con su gorro de aviadora, sonriendo y saludando.',
    'contact.passenger': 'Pasajera',
    'contact.email': 'Escríbeme',
    'contact.builder': 'AWS Builder Center',

    'footer': '© 2026 Daniela Gabriel Suárez · Hecho con HTML, CSS y JS · Alojado en AWS Amplify',
    'credit': 'Música: “Infinity Love” de Luminewave (Pixabay)',

    'intro.preparing': 'Preparando el despegue',
    'intro.music': 'Abordar con música ♪',
    'intro.silent': 'Abordar en silencio',
    'intro.headphones': 'Mejor con audífonos',
    'intro.flt': 'VUELO',
    'intro.cloud': 'NUBE',
    'intro.cabin': 'Cinturón abrochado. Despegamos cuando quieras.',
    'music.label': 'Música de fondo',

    'clouds.label': 'Rompe esta nube para ver un dato curioso',
    'clouds.close': 'Cerrar',
    'clouds.kicker': 'Dato curioso',
    'fact.1': 'Llevo 10 de 12 tareas del rol Cloud Practitioner en AWS Cloud Quest.',
    'fact.2': 'Mi tema favorito de AWS hasta ahora es Amazon EC2: servidores en la nube.',
    'fact.3': 'En Chok Chok calculo cuánto ganamos por unidad.',
    'fact.4': 'Este sitio tiene una alerta de presupuesto de $1 al mes en AWS Budgets.',
    'fact.5': 'FinOps une finanzas e ingeniería: cada equipo se hace responsable de lo que gasta en la nube.',

    'safety.open': 'Cómo jugar',
    'safety.title': 'Instrucciones de seguridad',
    'safety.skip': 'Saltar',
    'safety.back': 'Atrás',
    'safety.s1t': 'Sube la carga',
    'safety.s1': 'Toca una caja (o arrástrala) para subirla al avión. Tócala otra vez para bajarla.',
    'safety.s2t': 'Vigila el combustible',
    'safety.s2': 'El costo mensual debe quedar debajo de $5.',
    'safety.s3t': 'Nada de desperdicio a bordo',
    'safety.s3': 'Algunas cajas parecen útiles pero son desperdicio. Con una sola, no despegas.',
    'safety.s4t': '¡A despegar!',
    'safety.s4': 'Cuando lleves solo lo que necesitas, presiona ¡Despegar!',
  };

  /* Text the mini-game writes at runtime, in both languages. */
  const MSG = {
    en: {
      fuel: (t) => `$${t} / $5.00`,
      fuelText: (t, over) => over ? `$${t}, over the $5.00 budget` : `$${t} of the $5.00 budget`,
      emptyTitle: 'The plane is empty.',
      emptyTip: 'Load some cargo first, then try to take off.',
      overTitle: 'Over budget! The plane is too heavy to take off.',
      overTip: 'Take something off and try again.',
      safetyNext: 'Next',
      safetyStart: 'Start',
      safetyStep: (n, total) => `Step ${n} of ${total}`,
      cloudHint: 'Tap a cloud ☁',
      cloudDone: 'All facts found! ✈',
      wasteTitle: "Waste on board! The plane can't take off.",
      missingTitle: "Something's missing. The plane can't take off yet.",
      stillMissing: 'Still missing:',
      tips: {
        bigserver: 'A huge server running 24/7 is way too much for a small website. Pick the smallest thing that does the job.',
        idledb: 'Idle resources cost money even when nobody uses them.',
        chatbot: "Cool features still need a budget. Make sure visitors really need it before paying for it.",
        testserver: 'A forgotten test server keeps billing every hour. Turn off what you are not using.',
        hosting: 'No hosting, no website. Load the website hosting.',
        domain: 'Visitors need a safe address to find the site. Load domain & HTTPS.',
        alert: 'Fly with a budget alert so surprise costs never catch you. It is free!',
      },
      winTitle: "You're a FinOps pilot!",
      winCost: (t) => `Monthly cost: $${t}. Under budget and ready to fly.`,
      winFact: 'Fun fact: I love cutting costs as much as I love playing soccer as a center midfielder.',
    },
    es: {
      fuel: (t) => `$${t} / $5.00`,
      fuelText: (t, over) => over ? `$${t}, se pasa del presupuesto de $5.00` : `$${t} de un presupuesto de $5.00`,
      emptyTitle: 'El avión está vacío.',
      emptyTip: 'Primero sube algo de carga y luego intenta despegar.',
      overTitle: '¡Te pasaste del presupuesto! El avión pesa demasiado para despegar.',
      overTip: 'Baja algo de carga y vuelve a intentar.',
      safetyNext: 'Siguiente',
      safetyStart: 'Empezar',
      safetyStep: (n, total) => `Paso ${n} de ${total}`,
      cloudHint: 'Toca una nube ☁',
      cloudDone: '¡Encontraste todos los datos! ✈',
      wasteTitle: '¡Hay desperdicio a bordo! El avión no puede despegar.',
      missingTitle: 'Falta algo. El avión todavía no puede despegar.',
      stillMissing: 'Falta:',
      tips: {
        bigserver: 'Un servidor enorme encendido 24/7 es demasiado para un sitio pequeño. Elige lo más chico que haga el trabajo.',
        idledb: 'Los recursos sin usar cuestan aunque nadie los use.',
        chatbot: 'Las funciones bonitas también necesitan presupuesto. Asegúrate de que los visitantes de verdad lo necesitan antes de pagarlo.',
        testserver: 'Un servidor de prueba olvidado sigue cobrando cada hora. Apaga lo que no uses.',
        hosting: 'Sin hosting no hay sitio web. Sube el hosting del sitio.',
        domain: 'Los visitantes necesitan una dirección segura para encontrar el sitio. Sube dominio y HTTPS.',
        alert: 'Vuela con una alerta de presupuesto para que ningún costo te sorprenda. ¡Es gratis!',
      },
      winTitle: '¡Eres piloto FinOps!',
      winCost: (t) => `Costo mensual: $${t}. Dentro del presupuesto y listo para volar.`,
      winFact: 'Dato curioso: me gusta recortar costos tanto como jugar fútbol de medio centro.',
    },
  };

  /* =====================================================================
     Language
     ===================================================================== */
  const i18n = {
    text: $$('[data-i18n]').map((el) => ({ el, key: el.dataset.i18n, en: el.innerHTML })),
    alt: $$('[data-i18n-alt]').map((el) => ({ el, key: el.dataset.i18nAlt, en: el.getAttribute('alt') })),
    aria: $$('[data-i18n-aria]').map((el) => ({ el, key: el.dataset.i18nAria, en: el.getAttribute('aria-label') })),
  };
  let lang = 'en';
  const msg = () => MSG[lang];
  const langButtons = $$('[data-lang]');
  const langHooks = []; // other modules re-render their runtime text here

  function applyLang(next, save) {
    lang = next === 'es' ? 'es' : 'en';
    root.lang = lang;
    const pick = (item) => (lang === 'es' && ES[item.key] != null ? ES[item.key] : item.en);
    i18n.text.forEach((item) => { item.el.innerHTML = pick(item); });
    i18n.alt.forEach((item) => item.el.setAttribute('alt', pick(item)));
    i18n.aria.forEach((item) => item.el.setAttribute('aria-label', pick(item)));
    langButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    if (save) store.set('lang', lang);
    game.refresh();
    langHooks.forEach((fn) => fn());
  }
  langButtons.forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang, true)));

  // Day/night is no longer a button: the scroll decides the sky (see "Scroll scene" below).

  /* =====================================================================
     Mobile menu
     ===================================================================== */
  const menuToggle = $('#menu-toggle');
  const nav = $('.site-nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuToggle.focus(); }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* =====================================================================
     Reveal on scroll (once)
     ===================================================================== */
  const revealEls = $$('.reveal');
  const settle = (el) => {
    if (el.classList.contains('panel')) setTimeout(() => el.classList.add('is-settled'), 1700);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        settle(entry.target);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => { el.classList.add('is-in'); settle(el); });
  }

  /* =====================================================================
     Cloud parallax + flight trail (both driven by one scroll handler)
     ===================================================================== */
  const clouds = $$('.cloud-layer').map((el) => ({ el, depth: parseFloat(el.dataset.depth) || 0 }));
  const hero = $('#takeoff');
  const main = $('#main');
  const trail = {
    svg: $('.trail'),
    dots: $('.trail-dots'),
    reveal: $('.trail-reveal'),
    plane: $('.trail-plane'),
    length: 0,
    startY: 0,
    endY: 0,
  };

  function buildTrail() {
    const w = main.clientWidth;
    const h = main.scrollHeight;
    trail.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const mainTop = main.getBoundingClientRect().top + window.scrollY;
    const art = $('.hero-art').getBoundingClientRect();

    // Start just behind the hero plane's tail, then weave between the sections.
    const pts = [{ x: art.left + art.width * 0.15, y: art.top + window.scrollY - mainTop + art.height * 0.75 }];
    $$('#main > .section').forEach((section, i) => {
      pts.push({ x: i % 2 === 0 ? w * 0.06 : w * 0.94, y: section.offsetTop + 28 });
    });
    const last = $('#contact');
    pts.push({ x: w * 0.5, y: last.offsetTop + last.offsetHeight - 24 });

    let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const dy = (b.y - a.y) * 0.55;
      d += ` C${a.x.toFixed(1)} ${(a.y + dy).toFixed(1)} ${b.x.toFixed(1)} ${(b.y - dy).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    trail.dots.setAttribute('d', d);
    trail.reveal.setAttribute('d', d);
    trail.length = trail.reveal.getTotalLength();
    trail.reveal.style.strokeDasharray = `${trail.length} ${trail.length}`;
    trail.startY = pts[0].y;
    trail.endY = pts[pts.length - 1].y;
    trail.mainTop = mainTop;
  }

  // The path only goes downwards, so we can binary-search the length for a given y.
  function lengthAtY(y) {
    let lo = 0;
    let hi = trail.length;
    for (let i = 0; i < 16; i++) {
      const mid = (lo + hi) / 2;
      if (trail.reveal.getPointAtLength(mid).y < y) lo = mid; else hi = mid;
    }
    return lo;
  }

  function drawTrail() {
    if (!trail.length) return;
    if (reduceMotion.matches) {
      trail.reveal.style.strokeDashoffset = '0';
      return;
    }
    const headY = window.scrollY + window.innerHeight * 0.62 - trail.mainTop;
    const len = headY <= trail.startY ? 0 : headY >= trail.endY ? trail.length : lengthAtY(headY);
    trail.reveal.style.strokeDashoffset = String(trail.length - len);
    const p = trail.reveal.getPointAtLength(len);
    const q = trail.reveal.getPointAtLength(Math.max(0, len - 4));
    const angle = Math.atan2(p.y - q.y, p.x - q.x) * 180 / Math.PI;
    trail.plane.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(angle + 45).toFixed(1)})`);
    trail.plane.style.opacity = len > 2 && len < trail.length - 2 ? '1' : '0';
  }

  function drawClouds() {
    if (reduceMotion.matches) return;
    const y = window.scrollY;
    if (y > hero.offsetHeight * 1.2) return;
    clouds.forEach(({ el, depth }) => { el.style.transform = `translate3d(0, ${(y * depth).toFixed(1)}px, 0)`; });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { drawClouds(); drawTrail(); scene.draw(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  let rebuildQueued = false;
  function rebuild() {
    if (rebuildQueued) return;
    rebuildQueued = true;
    requestAnimationFrame(() => { buildTrail(); drawTrail(); scene.measure(); scene.draw(); rebuildQueued = false; });
  }
  if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(main);
  window.addEventListener('resize', rebuild);
  window.addEventListener('load', rebuild);

  /* =====================================================================
     Mini-game: Take off on budget
     ===================================================================== */
  const game = (() => {
    const BUDGET = 5;
    const REQUIRED = ['hosting', 'domain', 'alert'];
    const box = $('#game');
    const crates = $$('.crate', box);
    const byId = Object.fromEntries(crates.map((c) => [c.dataset.id, c]));
    const fuelValue = $('#fuel-value');
    const fuelMeter = $('#fuel-meter');
    const fuelFill = $('#fuel-fill');
    const onboard = $('#onboard');
    const onboardEmpty = $('#onboard-empty');
    const plane = $('#game-plane');
    const runway = $('#dropzone');
    const takeoffBtn = $('#takeoff-btn');
    const resetBtn = $('#reset-btn');
    const result = $('#result');

    const loaded = new Set();
    let lastResult = null; // remembered so a language switch can re-render it
    let flying = false;

    const cost = (id) => parseFloat(byId[id].dataset.cost);
    const total = () => [...loaded].reduce((sum, id) => sum + cost(id), 0);
    const nameOf = (id) => $('.crate-name', byId[id]).textContent.trim();
    const money = (n) => n.toFixed(2);

    function renderCargo() {
      const t = total();
      const over = t > BUDGET;
      box.classList.toggle('is-over', over);
      fuelValue.textContent = msg().fuel(money(t));
      fuelFill.style.transform = `scaleX(${Math.min(t / BUDGET, 1)})`;
      fuelMeter.setAttribute('aria-valuenow', String(Math.min(t, BUDGET)));
      fuelMeter.setAttribute('aria-valuetext', msg().fuelText(money(t), over));

      crates.forEach((c) => c.setAttribute('aria-pressed', String(loaded.has(c.dataset.id))));
      onboard.replaceChildren(...crates
        .filter((c) => loaded.has(c.dataset.id))
        .map((c) => { const li = document.createElement('li'); li.textContent = nameOf(c.dataset.id); return li; }));
      onboardEmpty.hidden = loaded.size > 0;
    }

    function paragraph(text, cls) {
      const p = document.createElement('p');
      if (cls) p.className = cls;
      p.textContent = text;
      return p;
    }

    function renderResult() {
      result.className = 'result';
      if (!lastResult) { result.replaceChildren(); return; }
      const m = msg();
      if (lastResult.type === 'win') {
        result.classList.add('is-win');
        result.replaceChildren(
          paragraph(m.winTitle, 'result-title'),
          paragraph(m.winCost(money(lastResult.total))),
          paragraph(m.winFact),
        );
        return;
      }
      result.classList.add('is-fail');
      if (lastResult.type === 'empty') {
        result.replaceChildren(paragraph(m.emptyTitle, 'result-title'), paragraph(m.emptyTip));
      } else if (lastResult.type === 'over' || lastResult.type === 'waste') {
        const title = lastResult.type === 'over' ? m.overTitle : m.wasteTitle;
        const tip = m.tips[lastResult.trap] || m.overTip;
        result.replaceChildren(paragraph(title, 'result-title'), paragraph(tip));
      } else {
        const names = lastResult.missing.map(nameOf).join(', ');
        result.replaceChildren(
          paragraph(m.missingTitle, 'result-title'),
          paragraph(m.tips[lastResult.missing[0]]),
          paragraph(`${m.stillMissing} ${names}.`),
        );
      }
    }

    function toggle(id, force) {
      if (flying || box.dataset.state === 'success') return;
      const want = force ?? !loaded.has(id);
      if (want) loaded.add(id); else loaded.delete(id);
      box.dataset.state = loaded.size ? 'loading' : 'idle';
      if (lastResult) { lastResult = null; renderResult(); }
      renderCargo();
    }

    function shake() {
      if (reduceMotion.matches || !plane.animate) return;
      plane.animate([
        { transform: 'translateX(0)' }, { transform: 'translateX(-8px) rotate(-2deg)' },
        { transform: 'translateX(8px) rotate(2deg)' }, { transform: 'translateX(-6px)' },
        { transform: 'translateX(5px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' },
      ], { duration: 450, easing: 'ease-out' });
    }

    function puff() {
      const r = runway.getBoundingClientRect();
      const spots = [[0.2, 0.55], [0.45, 0.65], [0.7, 0.5]];
      spots.forEach(([x, y], i) => {
        const img = document.createElement('img');
        img.src = 'assets/cloud-2.webp';
        img.alt = '';
        img.className = 'puff';
        img.style.left = `${x * r.width - 45}px`;
        img.style.top = `${y * r.height - 37}px`;
        runway.appendChild(img);
        const anim = img.animate([
          { opacity: 0, transform: 'scale(0.4)' },
          { opacity: 1, transform: 'scale(1)', offset: 0.35 },
          { opacity: 0, transform: 'scale(1.35) translateY(-12px)' },
        ], { duration: 1100, delay: 250 + i * 140, easing: 'ease-out', fill: 'both' });
        anim.onfinish = () => img.remove();
      });
    }

    function flyAway() {
      return plane.animate([
        { transform: 'none' },
        { transform: 'translate(24px, -6px) rotate(-6deg)', offset: 0.3 },
        { transform: 'translate(170%, -260px) rotate(-16deg)', opacity: 0 },
      ], { duration: 1300, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' }).finished;
    }

    async function takeOff() {
      if (flying || box.dataset.state === 'success') return;
      const t = total();
      // Traps are marked in the HTML; they are cheap now, so the total alone doesn't give them away.
      const traps = [...loaded].filter((id) => byId[id].dataset.trap === 'true')
        .sort((a, b) => cost(b) - cost(a));
      const missing = REQUIRED.filter((id) => !loaded.has(id));
      resetBtn.hidden = false;

      if (!loaded.size) {
        lastResult = { type: 'empty' };
      } else if (t > BUDGET) {
        lastResult = { type: 'over', trap: traps[0] };
      } else if (traps.length) {
        // Under budget, but paying for waste is still a failed flight
        lastResult = { type: 'waste', trap: traps[0] };
      } else if (missing.length) {
        lastResult = { type: 'missing', missing };
      } else {
        lastResult = { type: 'win', total: t };
      }

      if (lastResult.type !== 'win') {
        box.dataset.state = lastResult.type;
        shake();
        renderResult();
        return;
      }

      box.dataset.state = 'success';
      takeoffBtn.disabled = true;
      crates.forEach((c) => c.setAttribute('aria-disabled', 'true'));
      resetBtn.focus();
      if (!reduceMotion.matches && plane.animate) {
        flying = true;
        puff();
        try { await flyAway(); } catch (e) { /* cancelled by reset */ }
        flying = false;
      }
      renderResult();
    }

    function reset() {
      plane.getAnimations?.().forEach((a) => a.cancel());
      $$('.puff', runway).forEach((p) => p.remove());
      flying = false;
      loaded.clear();
      lastResult = null;
      box.dataset.state = 'idle';
      takeoffBtn.disabled = false;
      crates.forEach((c) => c.removeAttribute('aria-disabled'));
      resetBtn.hidden = true;
      renderResult();
      renderCargo();
      takeoffBtn.focus();
    }

    crates.forEach((c) => {
      c.addEventListener('click', () => toggle(c.dataset.id));
      // Dragging is optional; clicking or the keyboard does the same thing.
      c.addEventListener('dragstart', (e) => {
        if (box.dataset.state === 'success') { e.preventDefault(); return; }
        e.dataTransfer.setData('text/plain', c.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
        c.classList.add('is-dragging');
      });
      c.addEventListener('dragend', () => c.classList.remove('is-dragging'));
    });
    runway.addEventListener('dragover', (e) => { e.preventDefault(); runway.classList.add('is-target'); });
    runway.addEventListener('dragleave', () => runway.classList.remove('is-target'));
    runway.addEventListener('drop', (e) => {
      e.preventDefault();
      runway.classList.remove('is-target');
      const id = e.dataTransfer.getData('text/plain');
      if (byId[id]) toggle(id, true);
    });
    takeoffBtn.addEventListener('click', takeOff);
    resetBtn.addEventListener('click', reset);
    resetBtn.hidden = true;

    return {
      refresh() { renderCargo(); if (!flying) renderResult(); },
    };
  })();

  /* =====================================================================
     Music: the vinyl plays and pauses. The song downloads only when asked.
     ===================================================================== */
  const music = (() => {
    const audio = $('#music');
    const vinyl = $('#vinyl');
    const TARGET_VOLUME = 0.6;
    let fadeFrame = 0;

    const sync = () => vinyl.setAttribute('aria-pressed', String(!audio.paused));

    function fadeIn() {
      cancelAnimationFrame(fadeFrame);
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / 1500, 1);
        try { audio.volume = TARGET_VOLUME * t; } catch (e) { /* iOS: volume is read-only */ }
        if (t < 1) fadeFrame = requestAnimationFrame(step);
      };
      fadeFrame = requestAnimationFrame(step);
    }

    function play() {
      try { audio.volume = 0; } catch (e) { /* ignore */ }
      const started = audio.play();
      sync();
      fadeIn();
      // If the browser refuses (no permission, no file), the vinyl just stays paused.
      if (started && started.catch) started.catch(() => { cancelAnimationFrame(fadeFrame); sync(); });
    }

    function pause() {
      cancelAnimationFrame(fadeFrame);
      audio.pause();
      sync();
    }

    vinyl.addEventListener('click', () => (audio.paused ? play() : pause()));
    audio.addEventListener('play', sync);
    audio.addEventListener('pause', sync);
    return { play };
  })();

  /* =====================================================================
     Intro: loading → choose sound → camera climbs through the clouds
     ===================================================================== */
  function revealTitle() {
    const title = $('#hero-title');
    const text = title.textContent.trim();
    const spoken = document.createElement('span');
    spoken.className = 'visually-hidden';
    spoken.textContent = text;
    const shown = document.createElement('span');
    shown.setAttribute('aria-hidden', 'true');
    let i = 0;
    text.split(' ').forEach((word, index, words) => {
      const w = document.createElement('span');
      w.className = 'word';
      [...word].forEach((letter) => {
        const c = document.createElement('span');
        c.className = 'char';
        c.textContent = letter;
        c.style.setProperty('--i', String(i++));
        w.appendChild(c);
      });
      shown.appendChild(w);
      if (index < words.length - 1) shown.appendChild(document.createTextNode(' '));
    });
    title.replaceChildren(spoken, shown);
    title.classList.add('is-revealing');
  }

  function startIntro() {
    const intro = $('#intro');
    if (!root.classList.contains('intro-on') || !intro) return;
    window.__introReady = true;

    // The camera always lands on the hero, even if the browser remembered a scroll position
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const shell =[$('.skip-link'), $('.site-header'), main, $('.site-footer'), $('#vinyl')];
    shell.forEach((el) => { el.inert = true; });

    const countEl = $('#intro-count');
    const progressEl = $('#intro-progress');
    const trackPlane = $('#intro-track-plane');
    const track = $('.intro-track');

    // Progress follows real loading: the hero art, the clouds and the fonts.
    const assets = ['assets/hero-plane.webp', 'assets/cloud-1.webp', 'assets/cloud-2.webp', 'assets/cloud-3.webp', 'assets/cloud-4.webp'];
    let loaded = 0;
    const total = assets.length + 1;
    assets.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => { loaded++; };
      img.src = src;
    });
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { loaded++; });

    const MIN_MS = 1200;
    const MAX_MS = 4000;
    const began = performance.now();
    let shown = 0;
    let lastReported = -1;

    function tick(now) {
      const elapsed = now - began;
      let target = Math.min((loaded / total) * 100, (elapsed / MIN_MS) * 100);
      if (elapsed >= MAX_MS) target = 100;
      shown += (target - shown) * 0.14;
      if (target - shown < 0.5) shown = target;
      const value = Math.floor(shown);
      countEl.textContent = String(value);
      const travel = Math.max(track.clientWidth - 24, 0);
      trackPlane.style.transform = `translateX(${(travel * shown / 100).toFixed(1)}px) rotate(45deg)`;
      if (value !== lastReported && value % 10 === 0) {
        progressEl.setAttribute('aria-valuenow', String(value));
        lastReported = value;
      }
      if (shown >= 100) showChoice();
      else requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    function showChoice() {
      progressEl.setAttribute('aria-valuenow', '100');
      intro.dataset.stage = 'choice';
      setTimeout(() => $('#board-music').focus({ preventScroll: true }), 200);
    }

    // The big record flies to the corner and becomes the music button (FLIP: measure, move, animate).
    function flyRecord() {
      const record = $('#intro-record');
      const target = $('.vinyl-disc');
      const cornerButton = $('#vinyl');
      const from = record.getBoundingClientRect();
      const to = target.getBoundingClientRect();

      // Keep the space so "Flight Log" doesn't jump while it fades out
      const spacer = document.createElement('div');
      spacer.style.width = `${from.width}px`;
      spacer.style.height = `${from.height}px`;
      record.replaceWith(spacer);
      intro.appendChild(record);
      record.classList.add('is-flying');
      Object.assign(record.style, {
        left: `${from.left}px`,
        top: `${from.top}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
      });

      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      const scale = to.width / from.width;
      const flight = record.animate([
        { transform: 'translate(0, 0) scale(1)' },
        { transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scale.toFixed(3)})` },
      ], { duration: 1000, delay: 150, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' });

      // Hand-off: show the corner button instantly, then hide the big record
      flight.finished.then(() => {
        cornerButton.style.transition = 'none';
        root.classList.remove('vinyl-hold');
        record.style.visibility = 'hidden';
        requestAnimationFrame(() => { cornerButton.style.transition = ''; });
      }).catch(() => { root.classList.remove('vinyl-hold'); });
    }

    function board(withMusic) {
      if (intro.dataset.stage !== 'choice') return;
      if (withMusic) {
        music.play(); // inside the click, so the browser allows sound
        $('#intro-record').classList.add('is-spinning');
      }
      flyRecord();
      intro.dataset.stage = 'flying';
      try { sessionStorage.setItem('introSeen', '1'); } catch (e) { /* ignore */ }

      const FLIGHT_MS = 1600;
      const easing = 'cubic-bezier(0.77, 0, 0.175, 1)';
      // The camera climbs, so the world falls: near clouds (bigger depth) fall faster and grow more.
      $$('.intro-cloud', intro).forEach((cloud) => {
        const depth = parseFloat(cloud.style.getPropertyValue('--d')) || 0.5;
        cloud.animate([
          { transform: 'translateY(0) scale(1)' },
          { transform: `translateY(${Math.round(60 + 150 * depth)}vh) scale(${(1 + 0.6 * depth).toFixed(2)})` },
        ], { duration: FLIGHT_MS, easing, fill: 'forwards' });
      });
      $('.intro-bg', intro).animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 700, delay: 850, easing: 'ease', fill: 'forwards',
      });

      // Around 60% of the climb, the hero wakes up underneath.
      setTimeout(() => {
        revealTitle();
        root.classList.remove('intro-hold');
      }, 950);

      setTimeout(() => {
        root.classList.remove('intro-on', 'vinyl-hold');
        shell.forEach((el) => { el.inert = false; });
        const title = $('#hero-title');
        title.setAttribute('tabindex', '-1');
        title.focus({ preventScroll: true });
        rebuild();
      }, FLIGHT_MS + 80);
    }

    $('#board-music').addEventListener('click', () => board(true));
    $('#board-silent').addEventListener('click', () => board(false));
  }

  /* =====================================================================
     Safety card: how to play, shown before the mini-game once per visit
     ===================================================================== */
  (() => {
    const panel = $('#safety');
    if (!panel) return;
    const steps = $$('.safety-step', panel);
    const dots = $$('.safety-dots span', panel);
    const back = $('#safety-back');
    const next = $('#safety-next');
    const status = $('#safety-status');
    const board = [$('.game-brief'), $('.game-board')];
    let current = 0;

    function render(direction) {
      steps.forEach((step, i) => {
        step.hidden = i !== current;
        step.classList.remove('is-moving-in', 'is-moving-back');
      });
      if (direction && !reduceMotion.matches) {
        const step = steps[current];
        void step.offsetWidth; // restart the slide animation
        step.classList.add(direction > 0 ? 'is-moving-in' : 'is-moving-back');
      }
      dots.forEach((dot, i) => dot.classList.toggle('is-on', i === current));
      back.hidden = current === 0;
      next.textContent = current === steps.length - 1 ? msg().safetyStart : msg().safetyNext;
      status.textContent = msg().safetyStep(current + 1, steps.length);
    }

    function open(withFocus) {
      current = 0;
      panel.hidden = false;
      panel.classList.remove('is-leaving');
      board.forEach((el) => { el.inert = true; });
      render(0);
      if (withFocus) next.focus({ preventScroll: true });
    }

    function close() {
      try { sessionStorage.setItem('safetySeen', '1'); } catch (e) { /* ignore */ }
      const done = () => {
        panel.hidden = true;
        panel.classList.remove('is-leaving');
        board.forEach((el) => { el.inert = false; });
        const firstCrate = $('.crate');
        if (firstCrate) firstCrate.focus({ preventScroll: true });
      };
      if (reduceMotion.matches) { done(); return; }
      panel.classList.add('is-leaving'); // exit (150ms) is quicker than the entry
      setTimeout(done, 150);
    }

    back.addEventListener('click', () => { if (current > 0) { current--; render(-1); } });
    next.addEventListener('click', () => {
      if (current < steps.length - 1) { current++; render(1); } else close();
    });
    $('#safety-skip').addEventListener('click', close);
    $('#safety-open').addEventListener('click', () => open(true));
    panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    langHooks.push(() => { if (!panel.hidden) render(0); });

    let seen = false;
    try { seen = sessionStorage.getItem('safetySeen') === '1'; } catch (e) { /* ignore */ }
    if (!seen) open(false);
  })();

  /* =====================================================================
     Fun-fact clouds: tap one, it pops into little pieces and shows a fact
     ===================================================================== */
  (() => {
    const spots = $$('.sky-spot');
    if (!spots.length) return;
    const hint = $('#sky-hint');
    const total = spots.length;
    let found = 0;
    let openCard = null;

    function renderHint() {
      if (!hint) return;
      $('.sky-hint-text', hint).textContent = found === total ? msg().cloudDone : msg().cloudHint;
      $('.sky-count', hint).textContent = `${found}/${total}`;
    }

    // 2D burst: little round cloud bits fly out, drift down and fade
    function burst(spot, cloud) {
      if (reduceMotion.matches || !spot.animate) return;
      const c = cloud.getBoundingClientRect();
      const s = spot.getBoundingClientRect();
      const cx = c.left - s.left + c.width / 2;
      const cy = c.top - s.top + c.height / 2;
      const COUNT = 11;
      for (let i = 0; i < COUNT; i++) {
        const bit = document.createElement('span');
        bit.className = 'cloud-bit';
        const size = 8 + Math.random() * 16;
        Object.assign(bit.style, {
          width: `${size}px`, height: `${size}px`,
          left: `${cx}px`, top: `${cy}px`,
          marginLeft: `${-size / 2}px`, marginTop: `${-size / 2}px`,
        });
        spot.appendChild(bit);
        const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 30 + Math.random() * 40;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist * 0.7;
        const anim = bit.animate([
          { transform: 'translate(0, 0) scale(0.6)', opacity: 1 },
          { transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(1)`, opacity: 1, offset: 0.45 },
          { transform: `translate(${(dx * 1.15).toFixed(1)}px, ${(dy + 28).toFixed(1)}px) scale(0.7)`, opacity: 0 },
        ], {
          duration: 650 + Math.random() * 200,
          delay: Math.random() * 60,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
          fill: 'forwards',
        });
        anim.onfinish = () => bit.remove();
      }
    }

    function closeCard(moveFocus) {
      if (!openCard) return;
      const card = openCard;
      openCard = null;
      card.hidden = true;
      card.classList.remove('is-entering');
      if (moveFocus) {
        const heading = card.closest('section').querySelector('h2');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
      }
    }

    function pop(spot) {
      const cloud = $('.sky-cloud', spot);
      const card = $('.fact-card', spot);
      if (cloud.classList.contains('is-popped')) return;
      closeCard(false);
      burst(spot, cloud);
      cloud.classList.add('is-popped');
      cloud.setAttribute('aria-expanded', 'true');
      cloud.setAttribute('aria-hidden', 'true');
      cloud.tabIndex = -1;
      found++;
      renderHint();
      setTimeout(() => {
        card.hidden = false;
        card.classList.add('is-entering');
        card.focus({ preventScroll: true });
        openCard = card;
      }, reduceMotion.matches ? 0 : 180);
    }

    spots.forEach((spot) => {
      $('.sky-cloud', spot).addEventListener('click', () => pop(spot));
      $('.fact-close', spot).addEventListener('click', () => closeCard(true));
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openCard) closeCard(true); });
    document.addEventListener('pointerdown', (e) => {
      if (openCard && !openCard.contains(e.target) && !e.target.closest('.sky-cloud')) closeCard(false);
    });
    langHooks.push(renderHint);
  })();

  /* =====================================================================
     Cloud curtain: clicking an in-page link closes the sky, jumps, reopens
     (like changing the channel). Keyboard jumps straight there, no animation.
     ===================================================================== */
  (() => {
    const layer = document.createElement('div');
    layer.className = 'curtain';
    layer.setAttribute('aria-hidden', 'true');
    const sky = document.createElement('div');
    sky.className = 'curtain-sky';
    layer.appendChild(sky);
    // [left %, top %, enters from x, enters from y, which cloud image]
    const layout = [
      [-20, -12, -1, 0, 1], [32, -20, 0, -1, 4], [62, -8, 1, 0, 2], [10, 40, -1, 0, 4],
      [-26, 28, -1, 0, 3], [30, 24, 0, 1, 1], [66, 32, 1, 0, 4],
      [-14, 64, -1, 1, 2], [36, 68, 0, 1, 3], [70, 70, 1, 1, 1],
    ];
    const clouds = layout.map(([x, y, fx, fy, img]) => {
      const cloud = document.createElement('img');
      cloud.src = `assets/cloud-${img}.webp`;
      cloud.alt = '';
      cloud.className = 'curtain-cloud';
      cloud.style.left = `${x}%`;
      cloud.style.top = `${y}%`;
      cloud.dataset.off = `translate(${fx * 75}vw, ${fy * 90}vh)`;
      layer.appendChild(cloud);
      return cloud;
    });
    document.body.appendChild(layer);

    const EASE = 'cubic-bezier(0.77, 0, 0.175, 1)';
    let busy = false;

    function jump(target, href) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      if (location.hash !== href) history.pushState(null, '', href);
      const heading = target.querySelector('h1, h2') || target;
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }

    async function go(target, href) {
      busy = true;
      layer.classList.add('is-active');
      try {
        await Promise.all([
          ...clouds.map((c) => c.animate([{ transform: c.dataset.off }, { transform: 'none' }],
            { duration: 380, easing: EASE, fill: 'forwards' }).finished),
          sky.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 80, easing: 'ease', fill: 'forwards' }).finished,
        ]);
        jump(target, href);
        await new Promise((resolve) => setTimeout(resolve, 60));
        await Promise.all([
          ...clouds.map((c) => c.animate([{ transform: 'none' }, { transform: c.dataset.off }],
            { duration: 420, easing: EASE, fill: 'forwards' }).finished),
          sky.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease', fill: 'forwards' }).finished,
        ]);
      } catch (e) {
        jump(target, href);
      }
      layer.classList.remove('is-active');
      [sky, ...clouds].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
      busy = false;
    }

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link || link.classList.contains('skip-link')) return;
      const href = link.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Keyboard (detail 0), reduced motion or the intro: let the browser jump normally
      if (e.detail === 0 || reduceMotion.matches || root.classList.contains('intro-on') || !layer.animate) return;
      e.preventDefault();
      if (!busy) go(target, href);
    });
  })();

  /* =====================================================================
     Scroll scene: sky dawn → day → sunset → night, clouds between sections,
     the airplane window on #projects and the header's day/night tokens.
     Driven by the single scroll listener above (onScroll → rAF → scene.draw).
     ===================================================================== */
  const scene = (() => {
    const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
    const sky = $('.sky-scene');
    const stars = $('.sky-stars');
    const header = $('.site-header');
    const nightBlocks = $$('[data-sky="night"]');
    const gates = $$('.cloud-gate').map((el) => ({ el, left: $('.gate-left', el), right: $('.gate-right', el), w: 0 }));
    const track = $('.window-track');
    const wall = $('.window-wall');
    const hole = $('.window-hole');
    const windowQuery = window.matchMedia('(min-width: 768px)');

    let keys = [];           // [scrollY, [dawn, day, dusk, night]]
    let starsFrom = 0;
    let starsTo = 1;
    let maxScale = 3.4;
    let headerNight = null;

    // Seeded random so the stars don't jump around when the canvas is redrawn
    function drawStars() {
      if (!stars) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      stars.width = Math.round(w * dpr);
      stars.height = Math.round(h * dpr);
      const ctx = stars.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      let seed = 7;
      const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const count = Math.round((w * h) / 7000);
      for (let i = 0; i < count; i++) {
        const x = rand() * w;
        const y = rand() * h * 0.9;
        const r = rand() < 0.08 ? 1.6 : 0.6 + rand() * 0.7;
        ctx.globalAlpha = 0.45 + rand() * 0.55;
        ctx.fillStyle = rand() < 0.3 ? '#FFE58A' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function measure() {
      const vh = window.innerHeight;
      const top = (sel) => { const el = $(sel); return el ? el.getBoundingClientRect().top + window.scrollY : 0; };
      const about = top('#about');
      const projects = top('#projects');
      const game = top('#mini-game');
      const contact = top('#contact');
      // The night is complete before #mini-game (light text) comes into view
      keys = [
        [0, [1, 0, 0, 0]],
        [about - vh * 0.3, [0, 1, 0, 0]],
        [projects - vh * 0.5, [0, 1, 0, 0]],
        [projects + vh * 0.1, [0, 0, 1, 0]],
        [game - vh * 1.3, [0, 0, 1, 0]],
        [game - vh * 0.95, [0, 0, 0, 1]],
      ];
      for (let i = 1; i < keys.length; i++) {
        if (keys[i][0] <= keys[i - 1][0]) keys[i][0] = keys[i - 1][0] + 1;
      }
      starsFrom = game - vh * 0.95;
      starsTo = Math.max(starsFrom + 1, contact - vh * 0.3);
      gates.forEach((g) => { g.w = g.left.offsetWidth; });
      if (hole && windowQuery.matches) {
        // Scale needed for the oval to grow past every corner of the screen
        const a = hole.offsetWidth / 2;
        const b = hole.offsetHeight / 2;
        const vw = document.documentElement.clientWidth;
        maxScale = Math.sqrt(((vw / 2) / a) ** 2 + ((vh / 2) / b) ** 2) * 1.12;
      }
      drawStars();
    }

    function weightsAt(y) {
      if (y <= keys[0][0]) return keys[0][1];
      for (let i = 1; i < keys.length; i++) {
        const [y1, w1] = keys[i];
        if (y <= y1) {
          const [y0, w0] = keys[i - 1];
          const t = (y - y0) / (y1 - y0);
          const e = t * t * (3 - 2 * t); // smooth crossfade, never a jump
          return w0.map((v, k) => v + (w1[k] - v) * e);
        }
      }
      return keys[keys.length - 1][1];
    }

    function drawGates(vh) {
      const vw = document.documentElement.clientWidth;
      for (const g of gates) {
        const r = g.el.getBoundingClientRect();
        const boundary = r.top + r.height / 2;
        if (boundary < -vh * 0.3 || boundary > vh * 1.3) continue; // only gates near the screen
        const p = clamp01((vh - boundary) / vh);       // 0 entering from below, 1 leaving at the top
        const apart = Math.abs(p - 0.5) * 2;           // 0 = meeting in the middle, 1 = fully parted
        const travel = vw * 0.62;
        const scale = (1 + (1 - apart) * 0.15).toFixed(3);
        const leftX = -g.w + vw * 0.06 - apart * travel;
        const rightX = -vw * 0.06 + apart * travel;
        g.left.style.transform = `translate3d(${leftX.toFixed(1)}px, -50%, 0) scale(${scale})`;
        g.right.style.transform = `translate3d(${rightX.toFixed(1)}px, -50%, 0) scale(${scale})`;
      }
    }

    function drawWindow(vh) {
      if (!track || !hole || !windowQuery.matches) return;
      const extra = vh * 0.7; // the pinned stretch (.window-track::after is 70vh in CSS)
      const pw = clamp01(-track.getBoundingClientRect().top / extra);
      hole.style.setProperty('--win-scale', (1 + pw * (maxScale - 1)).toFixed(3));
      wall.style.opacity = pw > 0.85 ? (1 - (pw - 0.85) / 0.15).toFixed(3) : '1';
    }

    function draw() {
      if (!keys.length) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const w = weightsAt(y);
      const s = sky.style;
      s.setProperty('--w-dawn', w[0].toFixed(3));
      s.setProperty('--w-day', w[1].toFixed(3));
      s.setProperty('--w-dusk', w[2].toFixed(3));
      s.setProperty('--w-night', w[3].toFixed(3));
      s.setProperty('--w-stars', (w[3] * (0.35 + 0.65 * clamp01((y - starsFrom) / (starsTo - starsFrom)))).toFixed(3));
      const maxY = Math.max(1, document.documentElement.scrollHeight - vh);
      s.setProperty('--progress', clamp01(y / maxY).toFixed(4));

      // Header switches to night tokens while it sits over a night section
      const mid = header.offsetHeight / 2;
      const overNight = nightBlocks.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      if (overNight !== headerNight) {
        headerNight = overNight;
        if (overNight) root.dataset.header = 'night'; else delete root.dataset.header;
      }

      if (!reduceMotion.matches) {
        drawGates(vh);
        drawWindow(vh);
      }
    }

    return { measure, draw };
  })();

  /* =====================================================================
     Drawings: one-shot moves on hover (mouse) or tap
     ===================================================================== */
  (() => {
    if (reduceMotion.matches) return;
    const wiggle = (el) => {
      el.classList.remove('is-wiggling');
      void el.offsetWidth; // restart the animation
      el.classList.add('is-wiggling');
    };
    document.addEventListener('click', (e) => {
      const el = e.target.closest && e.target.closest('[data-wiggle]');
      if (el) wiggle(el);
    });
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.addEventListener('mouseover', (e) => {
        const el = e.target.closest && e.target.closest('[data-wiggle]');
        if (el && !el.classList.contains('is-wiggling')) wiggle(el);
      });
    }
    document.addEventListener('animationend', (e) => {
      if (e.target.classList && e.target.classList.contains('is-wiggling')) e.target.classList.remove('is-wiggling');
    });
  })();

  /* =====================================================================
     Cursor: small dot + soft contrail on a canvas (mouse only)
     ===================================================================== */
  (() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches || reduceMotion.matches) return;
    root.classList.add('has-cursor');

    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-trail';
    canvas.setAttribute('aria-hidden', 'true');
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    dot.innerHTML = '<span class="cursor-ring"></span><span class="cursor-core"></span>';
    document.body.append(canvas, dot);
    const ctx = canvas.getContext('2d');

    let w = 0;
    let h = 0;
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    // White + "difference" blending (set in CSS) keeps the dot and trail visible on any sky
    const color = '#FFFFFF';

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let settledAt = 0;
    let started = false;
    const points = [];
    const TRAIL_MS = 320;

    function loop(now) {
      x += (tx - x) * 0.28; // spring-like follow so the dot doesn't feel rigid
      y += (ty - y) * 0.28;
      dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      points.push({ x, y, t: now });
      while (points.length && now - points[0].t > TRAIL_MS) points.shift();

      ctx.clearRect(0, 0, w, h);
      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        for (let i = 1; i < points.length; i++) {
          const k = i / points.length;
          ctx.globalAlpha = k * 0.35;
          ctx.lineWidth = 0.5 + k * 2.5;
          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // Stop drawing once the dot has been still long enough for the trail to fade
      const still = Math.abs(tx - x) < 0.2 && Math.abs(ty - y) < 0.2;
      if (still) {
        if (!settledAt) settledAt = now;
        if (now - settledAt > TRAIL_MS + 20) {
          ctx.clearRect(0, 0, w, h);
          points.length = 0;
          frame = 0;
          return;
        }
      } else {
        settledAt = 0;
      }
      frame = requestAnimationFrame(loop);
    }

    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX;
      ty = e.clientY;
      if (!started) { x = tx; y = ty; started = true; }
      dot.classList.add('is-visible');
      if (!frame) frame = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerover', (e) => {
      const target = e.target.closest && e.target.closest('a, button, label, summary, [role="button"]');
      dot.classList.toggle('is-hover', Boolean(target));
    });
    document.addEventListener('pointerdown', () => dot.classList.add('is-down'));
    document.addEventListener('pointerup', () => dot.classList.remove('is-down'));
    document.documentElement.addEventListener('mouseleave', () => dot.classList.remove('is-visible'));
  })();

  /* =====================================================================
     Start
     ===================================================================== */
  const savedLang = store.get('lang');
  applyLang(savedLang === 'es' ? 'es' : 'en', false);
  startIntro();
  buildTrail();
  drawTrail();
  drawClouds();
  scene.measure();
  scene.draw();
})();
