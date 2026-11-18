# Hinweise für KI-Assistenten und Mitwirkende

## Projekt

- Browser-Version: `docs/` (statisch, wird von Vercel als Root ausgeliefert, Domain websitegenerator.bf0.by0.link). Kein Build-Schritt.
- Terminal-Version: `src/main.py`.
- Datenschutzerklärung: `docs/datenschutz/index.html` (Route `/datenschutz/`), technische Doku: `DATENSCHUTZ-TECHNIK.md` (Repo-Root, absichtlich nicht in `docs/`).

## Datenschutz-Regel (verbindlich)

Bei **jeder datenschutzrelevanten Codeänderung** müssen die Datenschutzerklärung (`docs/datenschutz/index.html`) und die technische Doku (`DATENSCHUTZ-TECHNIK.md`) im selben Commit/PR geprüft und aktualisiert werden, einschließlich des **Stand-Datums** in beiden Dateien. Datenschutzrelevant sind insbesondere:

- neue oder geänderte externe Dienste, CDNs, Schriften, Bilder oder Skripte (auch in der erzeugten `index.html` aus `buildHtml()` in `docs/app.js`),
- neue Requests (`fetch`, XHR, WebSocket, `sendBeacon`, `<img>`/`<link>` auf fremde Domains),
- Cookies, `localStorage`, `sessionStorage`, IndexedDB, Service Worker, Cache API,
- Statistik/Analytics (z. B. Umami, Vercel Analytics),
- neue Eingabefelder oder geänderte Verarbeitung von Eingaben,
- Änderungen am Hosting (Vercel-Projekt, GitHub Pages, Domains, Redirects).

Wenn unklar ist, ob etwas relevant ist: im Zweifel prüfen und in `DATENSCHUTZ-TECHNIK.md` notieren.
