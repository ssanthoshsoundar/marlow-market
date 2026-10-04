/* Portfolio client-side interactivity */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Theme toggle (remembered in localStorage) */
  $$('.theme-toggle').forEach(b => b.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  }));

  /* Mobile nav */
  const toggle = $('.nav-toggle'), nav = $('#nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  /* Count-up numbers on the home page inspector */
  $$('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    if (reduce || !target) { el.textContent = target; return; }
    let n = 0; const step = Math.max(1, Math.ceil(target / 20));
    const id = setInterval(() => { n = Math.min(target, n + step); el.textContent = n; if (n >= target) clearInterval(id); }, 40);
  });

  /* Skill bars animate when scrolled into view */
  const bars = $$('.bar i');
  if (bars.length) {
    const fill = el => el.style.width = el.dataset.w + '%';
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fill(e.target); io.unobserve(e.target); } }), { threshold: .3 });
      bars.forEach(b => io.observe(b));
    } else bars.forEach(fill);
  }

  /* Project filter + search */
  const grid = $('#project-grid');
  if (grid) {
    let cat = 'all';
    const search = $('#project-search'), none = $('#no-results');
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      $$('.project', grid).forEach(c => {
        const ok = (cat === 'all' || c.dataset.cat === cat) && (!q || c.dataset.text.includes(q));
        c.hidden = !ok; if (ok) shown++;
      });
      none.hidden = shown > 0;
    };
    $$('.chip').forEach(ch => ch.addEventListener('click', () => {
      $$('.chip').forEach(x => x.classList.remove('on')); ch.classList.add('on');
      cat = ch.dataset.filter; apply();
    }));
    search.addEventListener('input', apply);
  }

  /* Contact form: validation + AJAX submit (falls back to normal POST) */
  const form = $('#contact-form');
  if (form) {
    const status = $('#form-status'), count = $('#char-count'), msg = form.message;
    const upd = () => count.textContent = msg.value.length; upd(); msg.addEventListener('input', upd);

    const show = (html, err) => { status.hidden = false; status.className = 'notice' + (err ? ' error' : ''); status.innerHTML = html; status.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); };
    const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    form.addEventListener('submit', async e => {
      const errs = [];
      $$('input, textarea', form).forEach(f => f.classList.remove('invalid'));
      const bad = (f, t) => { f.classList.add('invalid'); errs.push(t); };
      if (form.name.value.trim().length < 2) bad(form.name, 'Please enter your name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) bad(form.email, 'Please enter a valid email address.');
      if (msg.value.trim().length < 10) bad(msg, 'Message must be at least 10 characters.');
      if (errs.length) { e.preventDefault(); show('<ul>' + errs.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>', true); return; }

      if (!window.fetch) return;           // plain POST fallback
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]'); btn.disabled = true; btn.textContent = 'Sending…';
      try {
        const r = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        const d = await r.json();
        if (d.ok) { show(esc(d.msg)); form.reset(); upd(); form.querySelector('[name=csrf]').value = d.csrf; }
        else show('<ul>' + d.errors.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>', true);
      } catch (err) { show('Network error. Please try again.', true); }
      btn.disabled = false; btn.textContent = 'Send message';
    });
  }

  /* Confirm destructive admin actions */
  $$('[data-confirm]').forEach(b => b.addEventListener('click', e => { if (!confirm(b.dataset.confirm)) e.preventDefault(); }));

  /* Back-to-top button */
  const top = $('.to-top');
  if (top) {
    addEventListener('scroll', () => top.hidden = scrollY < 400, { passive: true });
    top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  }
});
