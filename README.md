# Abdalla Taha — JavaScript Full-Stack & Mobile PWA Portfolio

A bilingual, evidence-first developer portfolio with a dedicated [Mishwar pilot engineering case study](https://abdullah-taha07.github.io/portfolio/mishwar-case-study.html).

- Arabic landing page: https://abdullah-taha07.github.io/portfolio/
- English SEO landing page: https://abdullah-taha07.github.io/portfolio/en/
- Public code profile: https://github.com/Abdullah-Taha07

## Tech and evidence

HTML, CSS and vanilla JavaScript for the portfolio. The Mishwar *pilot* uses browser PWAs, a shared Cloudflare Workers API, D1/SQLite, R2, and an experimental Android Java / Custom Tabs wrapper. It is **not** a commercial production deployment or a Google Play/App Store release.

Evidence sections link directly to public Mishwar tests for routing integrity, staff authorization and location/ETA trust, explaining what tests verify and what remains unvalidated on real devices. AI-assisted coding is clearly disclosed. No invented performance or customer-impact numbers are used.

## Structure

- `index.html`: Arabic and in-browser language toggle, 15 project gallery cards, selected projects, no-JS fallback.
- `en/index.html`: indexable, static English landing page with 15 visible projects.
- `mishwar-case-study.html`: bilingual technical architecture, decisions, evidence links and real-world caveats.
- `css/` and `js/`: static styling and interactions.
- `tests/*.test.mjs`: source contracts and regression guards.
- `robots.txt` and `sitemap.xml`: crawler discovery.

## Local preview

```bash
python -m http.server 8000
```

Visit `http://localhost:8000/`, `http://localhost:8000/en/` and `http://localhost:8000/mishwar-case-study.html?lang=en`.

## Checks

```bash
node --check js/portfolio-fsd.js
node --check js/mishwar-case-study.js
node --test tests/*.test.mjs
```

The GitHub Actions workflow runs these source checks on pull requests and main pushes. Browser interaction was separately smoke-tested on desktop and 390px mobile locally. **Passing source and local browser tests does not guarantee a Lighthouse score, WCAG conformance or reliable access to external Vercel demo URLs.** Verify live websites and external services after release.

## Workflows and safety

Create a feature branch from reviewed `main`, run tests and open a pull request. Do not automatically merge or deploy production changes. The public site does not collect contact submissions; contact actions point to external WhatsApp, email, LinkedIn and telephone handlers.

## V8 additions
- A standalone offline-only, fictional Mishwar product walk-through at `demo/mishwar-tour.html`. It never calls the live API and is not a production demo.
- Four merged, reviewable Mishwar PR links (#1–#4) next to honest evidence boundaries.
- All 15 Arabic project cards are now present in the static HTML, even without JavaScript.
- `tests/browser_quality.py` tests live Chromium interactions and reports optional axe WCAG findings. `portfolio-checks.yml` installs the browser and axe tool during GitHub CI. Local offline rendering is supported with `--offline` when localhost navigation is blocked.
- `portfolio-lighthouse.yml` reports Lighthouse metrics from a local static server during PRs or manual runs. The thresholds are warnings, not claims of a passed 99 score.
- Real public Coffee and E-commerce screenshot utility: `scripts/CAPTURE_REAL_PUBLIC_PREVIEWS.ps1`, optional and never automatically executed.
- Source fonts are loaded from Google Fonts with a system-font fallback. No licensed font files are distributed in the bundle.

## Final hiring quality pass (after V8, no project screenshots)
- Added a bilingual **role and proof** section in the Mishwar engineering case study. It separates personal contribution (requirements, coordination, review and verification) from code generated with AI assistance and does not imply independent coding ability was already tested.
- Added `scripts/audit-site-links.mjs`, `scripts/audit-external-links.mjs` and `tests/portfolio-hiring-final.test.mjs`: validate repository-local assets, page anchors, resumes and expected contact/app URLs without making external network claims. These tests run in existing GitHub Actions.
- Added `scripts/summarize-lighthouse.mjs`: report **measured** scores per local URL/run, rather than inferring 99 or 100 from a green workflow. PR Lighthouse reports remain informational, with existing warning-only thresholds.
- External demo URLs require manual verification in a real browser. Optional: `node scripts/audit-external-links.mjs` probes public URLs on your own machine without logging in, but 403s/redirects are inconclusive. Passing CI does not confirm login flows, external service availability or production performance.
- Observed 24 Nov 2026 local PR Lighthouse report: Arabic performance 96–100, English 98–100, Mishwar case study 100; Accessibility, Best Practices and SEO were 100 in sampled runs. These are not live-production scores. See `docs/PORTFOLIO_HIRING_QA_20261124_AR.md`.
- Final CV cross-check: the Arabic and English PDF resumes describe Mishwar as a pilot and disclose Codex use. The PDFs were not modified in this pass.
- Release workflow: branch → tests → Pull Request → manual merge. No automated push, merge or deployment is performed by this patch.