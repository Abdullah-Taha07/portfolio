# Abdalla Taha — Full-Stack & Mobile PWA Portfolio

A bilingual Arabic/English developer portfolio featuring a **Mishwar engineering case study**, installable PWA experience, an experimental Java Android wrapper, and 15 public practice and application projects.

**Live site:** https://abdullah-taha07.github.io/portfolio/
**Case study:** https://abdullah-taha07.github.io/portfolio/mishwar-case-study.html

## Technology stack
- Vanilla HTML5, CSS3, JavaScript (no SPA framework needed), bilingual Arabic RTL / English LTR.
- Web technologies: REST APIs, Cloudflare Workers, D1 (SQLite), R2, Vercel, PWA + Service Workers, Android Java/Custom Tabs/Gradle (from the separate Mishwar repository).
- Code-backed project case study links to relevant tests and audit documents; the Mishwar system is a **pilot, not commercially ready**.

## Local preview

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`, or `http://localhost:8000/mishwar-case-study.html`.

## Checks

```bash
node --test tests/*.test.mjs
node --check js/portfolio-fsd.js
node --check js/mishwar-case-study.js
```

GitHub Actions runs the source checks on push and pull requests. This does not replace live browser, accessibility, performance, security or mobile device testing.

## Project gallery behavior
- Published website demos are listed first.
- Projects without an available live link are grouped as **completed training projects** and never get invented URLs.
- Mishwar provides three choices: rider, captain and admin.
- Projects are described at the level of implemented web features; no unsupported claims of Flutter, React Native, Swift, app-store approval, or actual commercial launch.

## Notes and privacy
- `index.html` supplies WhatsApp Open Graph images; crawlers may cache old previews.
- This release deletes unused legacy assets from the current branch. **Git history still retains past versions and old images**, so deletion does not remove historical copies.
- Site is static and does not receive or store contact form submissions. WhatsApp, email and LinkedIn use direct links.

## Current deployment
GitHub Pages from `main`. All changes go through a separate feature branch and review; no automatic production push from the prepared update script.
