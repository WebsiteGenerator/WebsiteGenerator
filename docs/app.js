let cardCount = 0;
let socialCount = 0;

function addCard() {
    cardCount++;
    const container = document.getElementById('cards-container');
    const cardHtml = `
        <div class="dynamic-item" id="card-${cardCount}">
            <button class="remove-btn" onclick="removeElement('card-${cardCount}')">×</button>
            <div class="input-group">
                <label>Name</label>
                <input type="text" class="card-name" placeholder="Projektname" />
            </div>
            <div class="input-group">
                <label>Beschreibung</label>
                <input type="text" class="card-desc" placeholder="Kurze Beschreibung" />
            </div>
            <div class="input-group">
                <label>Link (URL)</label>
                <input type="text" class="card-url" placeholder="https://..." />
            </div>
            <div class="input-group">
                <label>Icon / Bild URL (oder Image Code)</label>
                <input type="text" class="card-image" placeholder="Image Code (z.B. github) oder volle URL" />
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
                <input type="text" class="social-name" placeholder="z.B. GitHub" />
            </div>
            <div class="input-group">
                <label>Link (URL)</label>
                <input type="text" class="social-url" placeholder="https://..." />
            </div>
            <div class="input-group">
                <label>Icon (Image Code oder URL)</label>
                <input type="text" class="social-image" placeholder="z.B. github" />
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
        return "https://websitegenerator.github.io/WebsiteGenerator/icons/" + input + ".png";
    }
    return input;
}

async function generateWebsite() {
    const btn = document.querySelector('.btn-primary');
    btn.textContent = "Generiere...";
    btn.disabled = true;

    try {
        // Lade das Tailwind CSS
        let cssContent = "";
        try {
            const res = await fetch('template.css');
            cssContent = await res.text();
        } catch (e) {
            console.error("Konnte template.css nicht laden.", e);
        }

        // Hole Daten aus den Feldern
        const name = document.getElementById('site-name').value || "Mein Name";
        const pronouns = document.getElementById('site-pronouns').value || "";
        const desc = document.getElementById('site-desc').value || "Meine Beschreibung";
        const domain = document.getElementById('site-domain').value || "example.com";
        const image = document.getElementById('site-image').value || "";
        const thumb = document.getElementById('site-thumb').value || "";

        // Cards generieren
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

        // Socials generieren
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

        // Zusammenbauen des fertigen HTML (analog zum Python-Skript)
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

        // Download anstoßen
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
        alert("Ein Fehler ist aufgetreten: " + e.message);
    } finally {
        btn.textContent = "Generieren & Herunterladen";
        btn.disabled = false;
    }
}
