/* Progressive-enhancement navigation for the standalone English landing page.
   Without JavaScript, mobile navigation remains visible and usable. */
(() => {
  'use strict';
  // First visit is dark; a deliberate user choice is shared with the Arabic page.
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle-en');
  const themeIcon = document.getElementById('theme-icon-en');
  const readTheme = () => { try { return localStorage.getItem('at-portfolio-theme'); } catch { return null; } };
  let theme = readTheme() === 'light' ? 'light' : 'dark';
  const applyTheme = () => {
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0b1220' : '#e7f1f5';
    if (themeButton) {
      themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      themeButton.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  };
  applyTheme();
  if (themeButton) themeButton.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('at-portfolio-theme', theme); } catch {}
    applyTheme();
  });
  // An explicit request for Arabic must override an English-language device.
  const arLink = document.querySelector('.header-actions a[lang="ar"]');
  if (arLink) arLink.addEventListener('click', () => {
    try { localStorage.setItem('at-portfolio-lang', 'ar'); } catch {}
  });
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
