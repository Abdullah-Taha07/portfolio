(() => {
  'use strict';
  const html = document.documentElement;
  const toggle = document.getElementById('case-lang-toggle');
  const views = document.querySelectorAll('[data-lang]');
  const inline = document.querySelectorAll('[data-ar][data-en]');
  const stored = (() => { try { return localStorage.getItem('at-portfolio-lang'); } catch { return null; } })();
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  let language = queryLanguage === 'en' ? 'en' : queryLanguage === 'ar' ? 'ar' : stored === 'en' ? 'en' : 'ar';
  function applyLanguage(){
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    views.forEach(view => { view.hidden = view.dataset.lang !== language; });
    inline.forEach(el => { el.textContent = el.dataset[language]; });
    toggle.textContent = language === 'ar' ? 'EN' : 'عربي';
    toggle.setAttribute('aria-label',language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    document.title = language === 'ar' ? 'مشوار — دراسة حالة Full-Stack وتطبيقات جوال | Abdalla Taha' : 'Mishwar — Full-Stack and Mobile PWA Case Study | Abdalla Taha';
  }
  toggle.addEventListener('click',() => {language = language === 'ar' ? 'en' : 'ar';try{localStorage.setItem('at-portfolio-lang',language);}catch{}applyLanguage();});
  document.getElementById('case-year').textContent = String(new Date().getFullYear());
  applyLanguage();
})();
