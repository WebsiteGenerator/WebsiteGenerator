let cardCount = 0;
let socialCount = 0;

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

function initGallery() {
    const gallery = document.getElementById('icon-gallery');
    if (!gallery) return;
    
    let html = '';
    availableIcons.forEach(icon => {
        const url = `https://raw.githubusercontent.com/WebsiteGenerator/WebsiteGenerator/main/icons/${icon}.png`;
        html += `
        <div class="icon-item" onclick="copyToClipboard('${icon}')" title="Click to copy '${icon}'">
            <img src="${url}" alt="${icon}">
            <span>${icon}</span>
        </div>`;
    });
    gallery.innerHTML = html;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied '${text}' to clipboard!`);
    });
}

function addCard() {
    cardCount++;
    const container = document.getElementById('cards-container');
    const cardHtml = `
        <div class="dynamic-item" id="card-${cardCount}">
            <button class="remove-btn" onclick="removeElement('card-${cardCount}')">×</button>
            <div class="input-group">
                <label>Name</label>
                <input type="text" class="card-name" placeholder="Project Name" />
            </div>
            <div class="input-group">
                <label>Description</label>
                <input type="text" class="card-desc" placeholder="Short description" />
            </div>
            <div class="input-group">
                <label>Link (URL)</label>
                <input type="text" class="card-url" placeholder="https://..." />
            </div>
            <div class="input-group">
                <label>Icon / Image URL (or Image Code)</label>
                <input type="text" class="card-image" placeholder="Image Code (e.g. github) or full URL" />
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHtml);
}

function addSocial() {
    socialCount++;
    const container = document.getElementById('socials-container');
    const socialHtml = `
        <div class="dynamic-item" id="social-${socialCount}">
            <button class="remove-btn" onclick="removeElement('social-${socialCount}')">×</button>
            <div class="input-group">
                <label>Name</label>
                <input type="text" class="social-name" placeholder="e.g. GitHub" />
            </div>
            <div class="input-group">
                <label>Link (URL)</label>
                <input type="text" class="social-url" placeholder="https://..." />
            </div>
            <div class="input-group">
                <label>Icon (Image Code or URL)</label>
                <input type="text" class="social-image" placeholder="e.g. github" />
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', socialHtml);
}

function removeElement(id) {
    document.getElementById(id).remove();
}

function resolveImage(input) {
    if (!input) return "";
    if (!input.includes('/')) {
        return "https://raw.githubusercontent.com/WebsiteGenerator/WebsiteGenerator/main/icons/" + input + ".png";
    }
    return input;
}

async function generateWebsite() {
    const btn = document.querySelector('.btn-primary');
    btn.textContent = "Generating...";
    btn.disabled = true;

    try {
        // Load the CSS
        let cssContent = "";
        try {
            const res = await fetch('template.css');
            cssContent = await res.text();
        } catch (e) {
            console.error("Could not load template.css", e);
        }

        // Get form values
        const name = document.getElementById('site-name').value || "My Name";
        const pronouns = document.getElementById('site-pronouns').value || "";
        const desc = document.getElementById('site-desc').value || "My Description";
        const domain = document.getElementById('site-domain').value || "example.com";
        const image = document.getElementById('site-image').value || "";
        const thumb = document.getElementById('site-thumb').value || "";

        // Generate Cards
        let cardsHtml = "";
        document.querySelectorAll('#cards-container .dynamic-item').forEach(el => {
            const cName = el.querySelector('.card-name').value;
            const cDesc = el.querySelector('.card-desc').value;
            const cUrl = el.querySelector('.card-url').value;
            const cImage = resolveImage(el.querySelector('.card-image').value);
            const cpUrl = cUrl.replace('https://', '');

            cardsHtml += `
<div class="card bg-gray-100 rounded-lg bg-gray-800 hover:shadow-xl p-5 content-around" onclick="window.open('${cUrl}')">
    <div class="flex">
        <img src="${cImage}" class="rounded-lg w-10 h-10">
        <span class="font-bold ml-3 mt-2">${cName}</span>
    </div>
    <p class="text-gray-400 mt-2">${cDesc}</p>
    <p class="text-blue-300 mt-2">${cpUrl}</p>
</div>
`;
        });

        // Generate Socials
        let socialsHtml = "";
        const socialItems = document.querySelectorAll('#socials-container .dynamic-item');
        if (socialItems.length > 0) {
            socialsHtml += `<div class="m-10" id="socials"><center>`;
            socialItems.forEach(el => {
                const sName = el.querySelector('.social-name').value;
                const sUrl = el.querySelector('.social-url').value;
                const sImage = resolveImage(el.querySelector('.social-image').value);
                socialsHtml += `<img src="${sImage}" class="inline-block rounded-lg w-10 h-10 m-2 cursor-pointer hover:opacity-80 transition" id="icon_${sName}" onclick="window.open('${sUrl}')"> `;
            });
            socialsHtml += `</center></div>`;
        }

        // Build the final HTML
        const finalHtml = `<!DOCTYPE html>
<html>
    <head>
        <meta property='og:title' id="${domain}" content='${name}' />
        <meta property='og:type' content="website" />
        <meta property='og:description' id="eDesc" content='${desc}' />
        <meta property="og:image" id="eIcon" content='${thumb}' />
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
        <title>${name}</title>
        <link rel="shortcut icon" href="${image}" type="image/x-icon">
    </head>
    <body class="pt-40 p-0 bg-gray-900 text-white">
        <div class="text-center md:w-1/2 w-screen select-none mx-auto">
            <a class="text-6xl font-semibold">${name}</a> <br>
            <a class="text-gray-500">${desc}</a> <br>
            <a class="text-gray-700">${pronouns}</a> <br>
        </div>
        <div class="w-1/2 float-right hidden md:block">
            <img src="${image}" id="splashIcon" style="border-radius: 20px;" class="overflow-hidden w-64 mx-auto">
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

        // Trigger download
        const blob = new Blob([finalHtml], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "index.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (e) {
        alert("An error occurred: " + e.message);
    } finally {
        btn.textContent = "Generate & Download";
        btn.disabled = false;
    }
}

// Initialize gallery on load
window.onload = initGallery;
