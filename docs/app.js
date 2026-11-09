// WebsiteGenerator: Formular -> eine index.html. Die Vorschau zeigt genau die Datei, die man herunterlädt.
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

const $ = (sel, root = document) => root.querySelector(sel);
let cssContent = "";
let lastIconField = null;

function resolveImage(input) {
    if (!input) return "";
    if (!input.includes('/')) {
        return ICON_BASE + input + ".png";
    }
    return input;
}

function readForm() {
    const val = id => document.getElementById(id).value;
    return {
        name: val('site-name') || "My Name",
        pronouns: val('site-pronouns') || "",
        desc: val('site-desc') || "My Description",
        domain: val('site-domain') || "example.com",
        image: val('site-image') || "",
        thumb: val('site-thumb') || "",
        cards: [...document.querySelectorAll('#cards-container .item')].map(el => ({
            name: $('.card-name', el).value,
            desc: $('.card-desc', el).value,
            url: $('.card-url', el).value,
            image: resolveImage($('.card-image', el).value)
        })),
        socials: [...document.querySelectorAll('#socials-container .item')].map(el => ({
            name: $('.social-name', el).value,
            url: $('.social-url', el).value,
            image: resolveImage($('.social-image', el).value)
        }))
    };
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

// ---- Vorschau ----
let previewTimer = null;
function updatePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
        const d = readForm();
        $('#preview').srcdoc = buildHtml(d);
        $('#preview-address').textContent = d.domain;
    }, 200);
}

function updateNameReply() {
    const name = $('#site-name').value.trim();
    // Die Antwort aus lol.py, 2021
    $('#name-reply').textContent = name ? `Thanks! ${name} is a really nice name. :D` : "";
}

// ---- Karten und Icons ----
function addItem(containerId, templateId) {
    const node = document.getElementById(templateId).content.firstElementChild.cloneNode(true);
    $('.remove', node).addEventListener('click', () => { node.remove(); updatePreview(); });
    document.getElementById(containerId).appendChild(node);
    $('input', node).focus();
    updatePreview();
}

function initGallery() {
    const gallery = $('#icon-gallery');
    $('#icon-count').textContent = `· ${availableIcons.length}`;
    gallery.innerHTML = availableIcons.map(icon => `
        <button type="button" class="icon" role="listitem" data-icon="${icon}" title="Use '${icon}'">
            <img src="${ICON_BASE}${icon}.png" alt="" loading="lazy" width="28" height="28"><span>${icon}</span>
        </button>`).join('');
    gallery.addEventListener('click', e => {
        const btn = e.target.closest('[data-icon]');
        if (!btn) return;
        const code = btn.dataset.icon;
        const status = $('#gallery-status');
        if (lastIconField && document.body.contains(lastIconField)) {
            lastIconField.value = code;
            lastIconField.focus();
            status.textContent = `Inserted '${code}'.`;
            updatePreview();
            return;
        }
        const fallback = () => { status.textContent = `Image code: ${code}. Add a card or an icon first to insert it.`; };
        if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => { status.textContent = `Copied '${code}'. Add a card or an icon to paste it.`; }, fallback);
        else fallback();
    });
}

// ---- Download ----
function download(e) {
    e.preventDefault();
    const btn = $('.generate');
    btn.disabled = true;
    const blob = new Blob([buildHtml(readForm())], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    btn.disabled = false;
    $('#done').textContent = "Thanks for using my Python-Script.\nDone!";
}

async function init() {
    try {
        const res = await fetch('template.css');
        if (res.ok) cssContent = await res.text();
    } catch (err) {
        console.error("Could not load template.css", err);
    }
    initGallery();
    const form = $('#session');
    form.addEventListener('input', e => {
        if (e.target.id === 'site-name') updateNameReply();
        updatePreview();
    });
    form.addEventListener('focusin', e => { if (e.target.classList.contains('icon-field')) lastIconField = e.target; });
    form.addEventListener('submit', download);
    $('#add-card').addEventListener('click', () => addItem('cards-container', 'card-template'));
    $('#add-social').addEventListener('click', () => addItem('socials-container', 'social-template'));
    updatePreview();
}

init();
