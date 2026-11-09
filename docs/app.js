// WebsiteGenerator: lol.py (Juni 2021) läuft im Browser. Fragen nacheinander, wie im Terminal.
// Jede Antwort lässt sich anklicken und ändern; das Skript spielt dann bis dorthin neu ab.
const ICON_BASE = "https://raw.githubusercontent.com/WebsiteGenerator/WebsiteGenerator/main/icons/";

const availableIcons = [
    "bitcoin", "briar", "cloud", "dev-to", "discord", "dollar", "education",
    "element", "euro", "facebook", "flickr", "gallery", "gaming", "github",
    "instagram", "internet", "key", "liberapay", "linkedin", "mail", "mastodon",
    "matrix", "monero", "money", "music", "note", "odysee", "onlyfans", "patreon",
    "paypal", "pinterest", "pixelfed", "plane", "pleroma", "polywork", "pound",
    "privacy", "protonmail", "reddit", "rss", "security", "server", "session",
    "shopping", "snapchat", "talk", "telegram", "tiktok", "tumblr", "twitch",
    "twitter", "user", "video", "xmpp", "youtube"
];

const $ = sel => document.querySelector(sel);
const logEl = $('#log'), screenEl = $('#screen'), lineEl = $('#line'), askEl = $('#ask'), input = $('#answer');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let cssContent = "";

function resolveImage(input) {
    if (!input) return "";
    if (!input.includes('/')) {
        return ICON_BASE + input + ".png";
    }
    return input;
}

// Das erzeugte HTML ist bewusst unverändert: so sahen die Seiten schon 2021 aus.
function buildHtml(d) {
    let cardsHtml = "";
    d.cards.forEach(c => {
        const cpUrl = c.url.replace('https://', '');
        cardsHtml += `
<div class="card bg-gray-100 rounded-lg bg-gray-800 hover:shadow-xl p-5 content-around" onclick="window.open('${c.url}')">
    <div class="flex">
        <img src="${c.image}" class="rounded-lg w-10 h-10">
        <span class="font-bold ml-3 mt-2">${c.name}</span>
    </div>
    <p class="text-gray-400 mt-2">${c.desc}</p>
    <p class="text-blue-300 mt-2">${cpUrl}</p>
</div>
`;
    });

    let socialsHtml = "";
    if (d.socials.length > 0) {
        socialsHtml += `<div class="m-10" id="socials"><center>`;
        d.socials.forEach(s => {
            socialsHtml += `<img src="${s.image}" class="inline-block rounded-lg w-10 h-10 m-2 cursor-pointer hover:opacity-80 transition" id="icon_${s.name}" onclick="window.open('${s.url}')"> `;
        });
        socialsHtml += `</center></div>`;
    }

    return `<!DOCTYPE html>
<html>
    <head>
        <meta property='og:title' id="${d.domain}" content='${d.name}' />
        <meta property='og:type' content="website" />
        <meta property='og:description' id="eDesc" content='${d.desc}' />
        <meta property="og:image" id="eIcon" content='${d.thumb}' />
        <meta name="theme-color" content="#c83ca0">

        <style>
            ${cssContent}
            ::-webkit-scrollbar { width: 10px; }
            ::-webkit-scrollbar-track { background: #151A23; }
            ::-webkit-scrollbar-thumb { background: #666; }
            ::-webkit-scrollbar-thumb:hover { background: #555; }
            body, html { overflow-x: hidden; }
            body { padding-bottom: 30px; }
            header span:hover, .card:hover { cursor: pointer; transition-duration: 0.2s; }
            header span { transition: background-color 75ms ease-in-out, box-shadow 75ms ease-in-out; }
            .card { transform: rotate(0deg); transition: transform 0.2s ease-in-out; }
            .card:hover { transform: rotate(2deg); }
            #splashIcon { transform: translateY(-60%); }
            #list { display: grid; margin: auto; grid-template-columns: repeat(auto-fit, 320px); grid-gap: 50px; justify-content:center; margin-top: 300px; }
            * { user-select: none; }
            .partner-title { display: none; }
            @media only screen and (max-width: 600px) {
                #list { grid-gap: 30px; margin-top: 220px; }
            }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${d.name}</title>
        <link rel="shortcut icon" href="${d.image}" type="image/x-icon">
    </head>
    <body class="pt-40 p-0 bg-gray-900 text-white">
        <div class="text-center md:w-1/2 w-screen select-none mx-auto">
            <a class="text-6xl font-semibold">${d.name}</a> <br>
            <a class="text-gray-500">${d.desc}</a> <br>
            <a class="text-gray-700">${d.pronouns}</a> <br>
        </div>
        <div class="w-1/2 float-right hidden md:block">
            <img src="${d.image}" id="splashIcon" style="border-radius: 20px;" class="overflow-hidden w-64 mx-auto">
        </div>
        <div class="px-20 w-screen" id="list">
            ${cardsHtml}
        </div>
        ${socialsHtml}
        <br>
    </body>
    <footer class="text-gray-500">
        <div class="flex justify-center cursor-pointer hover:text-gray-400" onclick="window.open('https://github.com/WebsiteGenerator/WebsiteGenerator')">
            Made with WebsiteGenerator
        </div>
    </footer>
</html>`;
}

// ---- Daten + Vorschau ----
let data = null;
function withDefaults(d) {
    return {
        name: d.name || "My Name", pronouns: d.pronouns || "", desc: d.desc || "My Description",
        domain: d.domain || "example.com", image: d.image || "", thumb: d.thumb || "",
        cards: d.cards.map(c => ({ name: c.name || "", desc: c.desc || "", url: c.url || "", image: c.image || "" })),
        socials: d.socials.map(s => ({ name: s.name || "", url: s.url || "", image: s.image || "" }))
    };
}
let previewTimer = null;
function updatePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
        const d = withDefaults(data);
        $('#preview').srcdoc = buildHtml(d);
        $('#address').textContent = d.domain;
    }, 120);
}
// Jede Zuweisung an die Daten aktualisiert die Vorschau
function reactive(obj) {
    return new Proxy(obj, { set(t, k, v) { t[k] = v; updatePreview(); return true; } });
}

// ---- Terminal ----
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let answers = [], replay = [], prefill = [], askIndex = 0, runId = 0, pending = null;
const replaying = () => askIndex < replay.length;

function print(html, cls) {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    logEl.appendChild(div);
    screenEl.scrollTop = screenEl.scrollHeight;
    return div;
}
async function say(text, cls) {
    if (!replaying() && !reduce) await sleep(140);
    print(esc(text), cls);
}

function ask(prompt, { icons = false } = {}) {
    const idx = askIndex++;
    const done = value => {
        answers.push({ prompt, value });
        print(`<span class="q">${esc(prompt)}</span><button type="button" class="ans" data-i="${idx}" title="Change this answer">${value ? esc(value) : '<span class="empty">(empty)</span>'}</button>`);
    };
    if (idx < replay.length) { done(replay[idx]); return Promise.resolve(replay[idx]); }
    let iconsEl = null;
    if (icons) {
        iconsEl = print(availableIcons.map(i => `<button type="button" data-icon="${i}" title="${i}" aria-label="Use image code ${i}"><img src="${ICON_BASE}${i}.png" alt="" loading="lazy" width="22" height="22"></button>`).join(''), 'icons');
    }
    return new Promise(resolve => {
        askEl.textContent = prompt;
        const old = prefill[idx];
        input.value = old && old.prompt === prompt ? old.value : "";
        input.placeholder = idx === 0 ? "type, then press Enter" : "";
        lineEl.hidden = false;
        input.focus({ preventScroll: true });
        screenEl.scrollTop = screenEl.scrollHeight;
        pending = value => {
            pending = null;
            lineEl.hidden = true;
            if (iconsEl) iconsEl.remove();
            done(value);
            resolve(value);
        };
    });
}
const yes = v => ["y", "yes"].includes(v.trim().toLowerCase());

async function script(id) {
    const d = data = reactive({ name: "", pronouns: "", desc: "", domain: "", image: "", thumb: "", cards: [], socials: [] });
    const live = () => id === runId;
    updatePreview();
    print(`~/WebsiteGenerator <b>$</b> python3 lol.py`, 'cmd');

    d.name = await ask("What is your name? | "); if (!live()) return;
    await say(`Thanks! ${d.name} is a really nice name. :D`, 'reply');
    const pronouns = await ask("What are your pronouns? (Leave empty or type 'n' to skip) | "); if (!live()) return;
    d.pronouns = pronouns.trim().toLowerCase() === "n" ? "" : pronouns;
    d.desc = await ask("What do you want to use as your description? | "); if (!live()) return;
    d.domain = (await ask("What domain do you want to use? (Without https:// or http://) | ")).replace(/^https?:\/\//, ""); if (!live()) return;
    d.image = await ask("What image do you want to use? (You can enter a URL or a local path here). | "); if (!live()) return;
    d.thumb = await ask("What image do you want to use as a thumbnail? (Only URL) | "); if (!live()) return;

    while (yes(await ask("Do you want to add a card? (y or n) | "))) {
        if (!live()) return;
        print("-".repeat(40), 'rule');
        const c = reactive({ name: "", desc: "", url: "", image: "" });
        d.cards = [...d.cards, c];
        c.name = await ask("What is the name of the card? | "); if (!live()) return;
        c.desc = await ask("What is the description of the card? | "); if (!live()) return;
        c.url = await ask("What is the URL of the card? | "); if (!live()) return;
        await say("Tip: You can enter a URL, a local path, or an Image Code. Click one below.", 'dim');
        c.image = resolveImage((await ask("What is the image of the card? | ", { icons: true })).trim()); if (!live()) return;
        await say(`✅ Card '${c.name}' added successfully!`, 'reply');
    }
    if (!live()) return;
    while (yes(await ask("Do you want to add a Social Media icon? (y or n) | "))) {
        if (!live()) return;
        print("-".repeat(40), 'rule');
        const s = reactive({ name: "", url: "", image: "" });
        d.socials = [...d.socials, s];
        s.name = await ask("What is the name of the network/icon? | "); if (!live()) return;
        await say("Tip: Click an Image Code below or enter a URL.", 'dim');
        s.image = resolveImage((await ask("Which image should be used? | ", { icons: true })).trim()); if (!live()) return;
        s.url = await ask("What is the URL to your profile? | "); if (!live()) return;
        await say(`✅ Icon '${s.name}' added successfully!`, 'reply');
    }
    if (!live()) return;
    await say("Thanks for using my Python-Script.");
    await say("Done!");
    const end = print(`<button type="button" class="btn" data-act="download">Download index.html</button><button type="button" class="btn ghost" data-act="again">Run it again</button>`, 'end');
    end.querySelector('[data-act="download"]').focus({ preventScroll: true });
}

function start(fromIndex = null) {
    runId++;
    if (fromIndex === null) { prefill = []; replay = []; }
    else { prefill = answers.slice(); replay = answers.slice(0, fromIndex).map(a => a.value); }
    answers = []; askIndex = 0; pending = null;
    logEl.innerHTML = "";
    lineEl.hidden = true;
    script(runId);
}

function download() {
    const blob = new Blob([buildHtml(withDefaults(data))], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

lineEl.addEventListener('submit', e => { e.preventDefault(); if (pending) pending(input.value); });
logEl.addEventListener('click', e => {
    const ans = e.target.closest('.ans');
    if (ans) { start(+ans.dataset.i); return; }
    const icon = e.target.closest('[data-icon]');
    if (icon) { input.value = icon.dataset.icon; input.focus(); return; }
    const act = e.target.closest('[data-act]');
    if (act && act.dataset.act === 'download') download();
    if (act && act.dataset.act === 'again') start();
});
screenEl.addEventListener('mouseup', () => {
    if (!lineEl.hidden && !window.getSelection().toString()) input.focus({ preventScroll: true });
});

(async () => {
    try {
        const res = await fetch('template.css');
        if (res.ok) cssContent = await res.text();
    } catch (err) {
        console.error("Could not load template.css", err);
    }
    start();
})();
