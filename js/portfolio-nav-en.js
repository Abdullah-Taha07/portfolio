/* Progressive-enhancement navigation for the standalone English landing page.
   Without JavaScript, mobile navigation remains visible and usable. */
(() => {
  'use strict';
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!menu || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };

  document.documentElement.classList.add('en-nav-ready');
  setOpen(false);
  menu.addEventListener('click', () => {
    setOpen(menu.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      menu.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) setOpen(false);
  });
})();
