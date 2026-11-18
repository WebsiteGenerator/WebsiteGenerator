# Datenschutz – technische Dokumentation

Stand: 18. November 2026 · gehört zur Datenschutzerklärung unter [`docs/datenschutz/index.html`](docs/datenschutz/index.html) (live: https://websitegenerator.bf0.by0.link/datenschutz/)

> Diese Datei liegt bewusst im Repo-Root und **nicht** in `docs/`, weil `docs/` das öffentlich ausgelieferte Verzeichnis ist.

## Aufbau und Hosting

| Teil | Ort | Hinweis |
|---|---|---|
| Browser-Version („Revival“) | `docs/` (`index.html`, `app.js`, `style.css`, `template.css`, `logo.webp`) | Rein statisch, kein Build, kein Server-Code, keine Abhängigkeiten |
| Datenschutzseite | `docs/datenschutz/index.html` (Route `/datenschutz/`) | nutzt `../style.css` |
| Terminal-Version | `src/main.py` | läuft lokal beim Nutzer, nicht Teil des Webangebots |
| Symbole (Bild-Codes) | `icons/*.png` | **nicht** über Vercel ausgeliefert (`/icons/…` → 404), sondern über `raw.githubusercontent.com` |
| Repo `WebsiteGenerator/resources` | `wbsg_resources/…`, `latest.zip` | Wird vom aktuellen Code **nicht** genutzt (kein Verweis in `docs/` oder `src/`). Nur Alt-Versionen von 2021 (Commits `42e797d`, `8d2c1fa`) luden daraus; die Vorlagen dort referenzieren cdnjs (Tailwind) und alte Bild-Hoster – irrelevant für die heutige Seite. |

Hosting (belegt per HTTP-Header am 18.11.2026):
- `websitegenerator.bf0.by0.link` → `server: Vercel`, `x-vercel-id`, HTTP→HTTPS per 308 durch Vercel. Root-Verzeichnis ist `docs/` (Projekteinstellung in Vercel, **nicht** im Repo; kein `vercel.json`).
- `websitegenerator.github.io/WebsiteGenerator/` → `server: GitHub.com` (GitHub Pages, liefert ebenfalls `docs/` aus). `docs/CNAME` wurde in `2e602cf` gelöscht; Pages ist offenbar noch aktiv.
- Live-`index.html` und `app.js` sind identisch mit `main` (geprüft per `diff`). Keine von Vercel injizierten Skripte (Web Analytics/Speed Insights) im ausgelieferten HTML.

## Verarbeitungen

| # | Verarbeitung | Fundstelle | Datenkategorien | Empfänger | Speicherort / -dauer | Rechtsgrundlage | Status |
|---|---|---|---|---|---|---|---|
| 1 | Auslieferung der Seite, Server-Logs, HTTP→HTTPS-Redirect | Hosting (Header), alle Dateien in `docs/` | IP, Zeitpunkt, URL/Pfad, Status, Bytes, Referrer, User-Agent | Vercel Inc. (USA, DPF) | Vercel; im Konto 1 h–1 Tag einsehbar, Rest nach Vercel-Vorgaben | Art. 6 Abs. 1 lit. f | Hoster belegt; Log-Dauer übernommen aus Erklärung bf0.by0.link/Vercel-Angaben, nicht separat geprüft |
| 2 | Auslieferung über GitHub Pages (Spiegel) | Header `server: GitHub.com` | wie 1 | GitHub Inc. (USA, DPF) | GitHub | Art. 6 Abs. 1 lit. f | belegt; **offen**: gewollt? |
| 3 | Google Fonts (JetBrains Mono, Lexend) | `docs/index.html:13-15`, `docs/datenschutz/index.html:10-12` | IP, URL, User-Agent, Referrer | Google Ireland Ltd. / Google LLC (USA, DPF) | Google | Art. 6 Abs. 1 lit. f | belegt; **offen**: Self-Hosting empfohlen |
| 4 | Laden von `template.css` beim Start | `docs/app.js:266-273` (`fetch('template.css')`) | wie 1 (keine Eingaben) | Vercel | wie 1 | Art. 6 Abs. 1 lit. f | belegt |
| 5 | Eingaben im Terminal (Name, Pronomen, Beschreibung, Domain, Bilder, Karten, Socials) | `docs/app.js:184-228`, `112-133` | alle Angaben des Nutzers | **niemand** – nur JS-Variablen im Speicher | flüchtig, weg bei Reload | – | belegt (kein `fetch`/XHR/WebSocket/`sendBeacon` mit Eingaben) |
| 6 | Vorschau (`iframe srcdoc`, `sandbox="allow-scripts allow-popups"`) | `docs/index.html:38`, `docs/app.js:122-129` | – | – | lokal | – | belegt |
| 7 | Bilder in der Vorschau aus Nutzer-URLs (Hauptbild `img#splashIcon` + Favicon, Karten-/Social-Bilder) | `docs/app.js:37,50,86,95` | IP, User-Agent, Herkunft (Origin) | vom Nutzer gewählter Server | dort | Art. 6 Abs. 1 lit. b | belegt |
| 8 | Bild-Codes / Eingaben ohne „/“ bei Karten- und Social-Bildern → GitHub-URL | `docs/app.js:3,21-27,208,219` | IP, User-Agent, Origin, Pfad (= Eingabe) | GitHub Inc. (`raw.githubusercontent.com`, Fastly-CDN) | GitHub | Art. 6 Abs. 1 lit. b/f | belegt |
| 9 | Symbol-Auswahl (55 Icons) beim Fragen nach Karten-/Social-Bild | `docs/app.js:162-164` | IP, User-Agent, Origin | GitHub Inc. | GitHub | Art. 6 Abs. 1 lit. f | belegt |
| 10 | Relativer Pfad beim Hauptbild → wird gegen die Seiten-URL aufgelöst (srcdoc erbt Basis-URL) | `docs/app.js:95,86,196` | Pfad landet im Request an Vercel | Vercel | Server-Log wie 1 | Art. 6 Abs. 1 lit. f | belegt (Verhalten laut HTML-Spec für `about:srcdoc`) |
| 11 | Thumbnail (`og:image`) | `docs/app.js:61` | – | wird in der Vorschau nicht geladen | – | – | belegt |
| 12 | Download der `index.html` | `docs/app.js:240-250` (Blob + `URL.createObjectURL`) | – | niemand | Gerät des Nutzers | – | belegt |
| 13 | Klick auf Karte/Social in Vorschau öffnet Ziel-URL in neuem Tab | `docs/app.js:35,50` | normale Navigation | Zielseite | – | – | belegt |
| 14 | `prefers-reduced-motion`-Abfrage | `docs/app.js:18` | Einstellung, nur lokal | – | nicht gespeichert | § 25 TDDDG nicht berührt (kein Speicherzugriff) | belegt |
| 15 | Cookies, `localStorage`, `sessionStorage`, IndexedDB, Service Worker, Cache API | – (grep: keine Treffer) | – | – | – | – | belegt: **nicht vorhanden** |
| 16 | Statistik/Analytics (Umami o. ä.) | – (grep im Code, Git-History und Live-HTML: keine Treffer) | – | – | – | – | belegt: **nicht vorhanden** |
| 17 | Generierte Website (Ergebnis) lädt Nutzerbilder + Bild-Codes von GitHub; CSS inline; Footer-Link zu GitHub per `onclick` | `docs/app.js:30-108` | – (Betreiber ist dann der Nutzer) | – | – | Hinweis in Abschnitt 06 | belegt |
| 18 | Terminal-Version lädt `template.css` von `raw.githubusercontent.com`, schreibt `./web/index.html` lokal | `src/main.py:29-31,23,188` | IP des Nutzers an GitHub | GitHub | lokal | – (kein Angebot des Verantwortlichen) | belegt |
| 19 | Kontakt per E-Mail | Datenschutzseite | E-Mail-Adresse, Nachricht | – | bis Erledigung | Art. 6 Abs. 1 lit. f | aus bisheriger Erklärung übernommen |

## Anbieterangaben (geprüft 18.11.2026)

- Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA – DPF laut bisheriger Erklärung; Datenschutzhinweis https://vercel.com/legal/privacy-notice
- GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA – EU-US DPF aktiv (https://www.dataprivacyframework.gov/participant/6174)
- Google Fonts: Google erhält IP, URL, User-Agent, Referrer; keine Cookies, keine Profile (https://developers.google.com/fonts/faq/privacy). Google Ireland Ltd. ist für EWR-Nutzer Verantwortlicher der Google-Dienste; Google LLC DPF-zertifiziert.

## Offene Punkte

1. **Google Fonts selbst hosten** (wie bei bf0.by0.link). Dann entfällt die Übermittlung an Google ohne Einwilligung (vgl. LG München I, 3 O 17493/20); Abschnitt 05 und Zeilen 3 dieser Tabelle anpassen.
2. **GitHub-Pages-Spiegel** `websitegenerator.github.io/WebsiteGenerator/` deaktivieren oder bewusst behalten (dann bleibt der Satz in Abschnitt 02).
3. Optional: Symbole zusätzlich unter `docs/` ausliefern, damit die Symbol-Auswahl im Generator nicht GitHub kontaktiert (die erzeugten Seiten bräuchten weiterhin absolute URLs).
4. Kein Impressum-Link auf der Seite (bf0.by0.link verlinkt https://fcrw.cc/imprint). Prüfen, ob einer ergänzt werden soll.
5. Vercel-Projekteinstellungen (Root Directory `docs`, ggf. Web Analytics/Log Drains) sind nicht im Repo; aus dem Live-HTML ergibt sich kein Analytics, Log Drains wären von außen nicht sichtbar.
