/* English project gallery: client-side enhancement; every card is present without JS. */
(() => {
  'use strict';
  const toolbar = document.getElementById('project-toolbar-en');
  const grid = document.getElementById('project-grid');
  const search = document.getElementById('project-search-en');
  const counter = document.getElementById('repo-count');
  if (!toolbar || !grid || !search || !counter) return;
  const cards = Array.from(grid.querySelectorAll(':scope > .project-card'));
  const fullstack = new Set(['Mishwar / RDY']);
  const frontend = new Set(['E-commerce Storefront', 'Personal Portfolio']);
  const heading = grid.querySelector('.project-group-heading');
  const unlistedCards = heading ? Array.from(heading.parentElement.children).slice(Array.from(heading.parentElement.children).indexOf(heading) + 1).filter(el => el.classList.contains('project-card')) : [];
  const noResults = document.createElement('p');
  noResults.id = 'no-projects-en';
  noResults.role = 'status';
  noResults.textContent = 'No matching projects. Try another search.';
  noResults.hidden = true;
  grid.after(noResults);
  let active = 'all';
  const controls = Array.from(toolbar.querySelectorAll('[data-filter-en]'));
  const normalize = text => text.toLocaleLowerCase('en').trim();
  function apply() {
    const query = normalize(search.value);
    let visible = 0;
    for (const card of cards) {
      const title = card.querySelector('h4')?.textContent?.trim() || '';
      const category = fullstack.has(title) ? 'fullstack' : frontend.has(title) ? 'frontend' : 'training';
      const matches = (active === 'all' || category === active) && (!query || normalize(card.textContent).includes(query));
      card.hidden = !matches;
      if (matches) visible++;
    }
    if (heading) heading.hidden = !unlistedCards.some(card => !card.hidden);
    counter.textContent = String(visible);
    noResults.hidden = visible !== 0;
  }
  for (const control of controls) control.addEventListener('click', () => {
    active = control.dataset.filterEn;
    for (const candidate of controls) {
      const selected = candidate === control;
      candidate.classList.toggle('active', selected);
      candidate.setAttribute('aria-pressed', String(selected));
    }
    apply();
  });
  search.addEventListener('input', apply);
  toolbar.hidden = false;
  apply();
})();
