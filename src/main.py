import os
import requests
import zipfile
import shutil
import sys

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def create_folder(directory):
    """Erstellt einen Ordner, falls dieser noch nicht existiert."""
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print(f"Fehler: Konnte das Verzeichnis {directory} nicht erstellen.")
        sys.exit(1)

def download_resources():
    """Lädt die benötigten HTML-Bausteine als ZIP herunter und entpackt sie."""
    print("Ruwen's WebsiteGenerator: Lade Ressourcen herunter...")
    download_url = 'https://raw.githubusercontent.com/WebsiteGenerator/resources/main/latest.zip'
    
    try:
        r = requests.get(download_url, allow_redirects=True)
        r.raise_for_status()
        with open('latest.zip', 'wb') as f:
            f.write(r.content)
            
        with zipfile.ZipFile("latest.zip", 'r') as zip_ref:
            zip_ref.extractall("./web/")
            
        os.remove('latest.zip')
    except Exception as e:
        print(f"Ein Fehler beim Herunterladen der Ressourcen ist aufgetreten: {e}")
        sys.exit(1)

def get_image_url(prompt_text):
    """Liest eine Bild-URL oder einen Image-Code ein und formatiert ihn passend."""
    user_input = input(prompt_text).strip()
    if not user_input:
        return ""
    if "/" not in user_input:
        return f"https://websitegenerator.github.io/WebsiteGenerator/icons/{user_input}.png"
    return user_input

def read_template(path):
    """Liest eine Template-Datei aus."""
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def gather_cards():
    """Fragt in einer Schleife nach Cards, bis der Nutzer fertig ist."""
    cards_html = ""
    while True:
        add_card = input("\nMöchtest du eine Card (Projekt/Link) hinzufügen? (y/n) | ").strip().lower()
        if add_card not in ["y", "yes", "j", "ja"]:
            break
            
        print("-" * 40)
        cname = input('Wie heißt die Card? | ')
        cdescription = input("Wie lautet die Beschreibung? | ")
        curl = input("Wie lautet die URL? | ")
        print("\nTipp: Du kannst eine URL, einen lokalen Pfad oder einen Image Code angeben.")
        print("Alle Image Codes findest du unter: https://github.com/WebsiteGenerator/WebsiteGenerator/tree/main/icons\n")
        cimage = get_image_url("Welches Bild/Icon soll verwendet werden? | ")
        
        cframeyn = input("Möchtest du benutzerdefiniertes Tailwind-CSS für die Card nutzen? (Sonst 'n') | ").strip()
        cframe = "card bg-gray-100 rounded-lg bg-gray-800 hover:shadow-xl p-5 content-around"
        if cframeyn not in ["n", "no", "nein"]:
            cframe = cframeyn

        # Lese die Bausteine der Card
        rs1 = read_template("./web/wbsg_resources/cards/part1.txt")
        rs2 = read_template("./web/wbsg_resources/cards/part2.txt")
        rs3 = read_template("./web/wbsg_resources/cards/part3.txt")
        rs4 = read_template("./web/wbsg_resources/cards/part4.txt")
        rs5 = read_template("./web/wbsg_resources/cards/part5.txt")
        rs6 = read_template("./web/wbsg_resources/cards/part6.txt")
        rsurl = read_template("./web/wbsg_resources/cards/parturl.txt")
        
        cpurl = curl.replace('https://', '')
        
        # Baue die Card zusammen
        cards_html += f"\n\n{rs1}{cframe}{rsurl}{curl}{rs2}{cimage}{rs3}{cname}{rs4}{cdescription}{rs5}{cpurl}{rs6}"
        print(f"✅ Card '{cname}' hinzugefügt!")
        
    return cards_html

def gather_socials():
    """Fragt in einer Schleife nach Social Media Icons, bis der Nutzer fertig ist."""
    socials_html = ""
    has_socials = False
    
    while True:
        add_scm = input("\nMöchtest du ein Social-Media Icon hinzufügen? (y/n) | ").strip().lower()
        if add_scm not in ["y", "yes", "j", "ja"]:
            break
            
        has_socials = True
        print("-" * 40)
        sname = input("Wie heißt das Netzwerk/Icon? | ")
        print("\nTipp: Alle Image Codes findest du unter: https://github.com/WebsiteGenerator/WebsiteGenerator/tree/main/icons\n")
        simage = get_image_url("Welches Icon soll verwendet werden? (Image Code oder URL) | ")
        surl = input("Wie lautet die URL zu deinem Profil? | ")
        
        icon = f'                <img src="{simage}" class="inline-block rounded-lg w-10 h-10 m-2 cursor-pointer hover:opacity-80" id="icon_{sname}" onclick="window.open(\'{surl}\')"> '
        socials_html += f"\n{icon}"
        print(f"✅ Icon '{sname}' hinzugefügt!")
        
    if has_socials:
        return f'        <div class="m-10" id="socials">\n            <center>{socials_html}\n            </center>\n        </div>'
    return ""

def main():
    clear_screen()
    print("=" * 60)
    print(" 🚀 Willkommen beim WebsiteGenerator! (Terminal Edition) 🚀")
    print("=" * 60)
    
    # 1. Ressourcen vorbereiten
    create_folder('./web')
    download_resources()
    
    # 2. Basisdaten abfragen
    print("\nLass uns ein paar Infos über dich sammeln!")
    name = input("Wie lautet der Name für deine Website? | ").strip()
    print(f"Cool! '{name}' ist ein richtig guter Name. :D")
    
    pronouns = input("Was sind deine Pronomen? (Lass es leer oder tippe 'n', um keine anzugeben) | ").strip()
    if pronouns.lower() in ["no", "n", "nein"]:
        pronouns = ""
        
    description = input("Was möchtest du als Beschreibungstext nutzen? | ").strip()
    domain = input("Welche Domain nutzt du? (Ohne https://) | ").strip()
    image = input("Link zu deinem Profilbild (URL) | ").strip()
    previewimage = input("Link zu deinem Vorschaubild (Thumbnail) | ").strip()
    
    # 3. Dynamische Elemente abfragen
    cards_content = gather_cards()
    socials_content = gather_socials()
    
    # 4. Zusammenbauen der index.html
    print("\nGeneriere deine Website... Bitte warten!")
    
    try:
        rs1 = read_template("./web/wbsg_resources/index/part1.txt")
        rs2 = read_template("./web/wbsg_resources/index/part2.txt")
        rs3 = read_template("./web/wbsg_resources/index/part3.txt")
        rs4 = read_template("./web/wbsg_resources/index/part4.txt")
        rs5 = read_template("./web/wbsg_resources/index/part5.txt")
        rs6 = read_template("./web/wbsg_resources/index/part6.txt")
        rs7 = read_template("./web/wbsg_resources/index/part7.txt")
        rs8 = read_template("./web/wbsg_resources/index/part8.txt")
        rs9 = read_template("./web/wbsg_resources/index/part9.txt")
        rs10 = read_template("./web/wbsg_resources/index/part10.txt")
        partpronouns = read_template("./web/wbsg_resources/index/partpronouns.txt")
        css = read_template("./web/wbsg_resources/index/css.txt")
        
        # HTML zusammensetzen
        index = (
            f"{rs1}{domain}\" content='{name}{rs2}{description}{rs3}{previewimage}"
            f"{rs4}{name}{rs5}{image}{rs6}{name}{rs7}{description}{rs8}{pronouns}"
            f"{partpronouns}{image}{rs9}{cards_content}{rs10}"
        )
        
        # Den kaputten part10 reparieren, indem wir Socials vor den Footer packen
        # Da part10.txt bereits das schließende </body> und <footer> enthält, 
        # ersetzen wir das <br>\n </body> im Template durch unsere Socials.
        index = index.replace("</div>\n\t\t<br>\n    </body>", f"</div>\n        {socials_content}\n\t\t<br>\n    </body>")

        # HTML speichern
        with open("./web/index.html", "w", encoding="utf-8") as f:
            f.write(index)
            
        # CSS speichern
        with open("./web/style.css", "w", encoding="utf-8") as f:
            f.write(css)
            
    except Exception as e:
        print(f"Fehler beim Erstellen der Dateien: {e}")
    finally:
        # 5. Aufräumen
        if os.path.exists("./web/wbsg_resources/"):
            shutil.rmtree("./web/wbsg_resources/")

    print("\n🎉 Fertig! Vielen Dank, dass du mein Python-Skript nutzt.")
    print("Deine neue Website liegt im Ordner './web/' bereit.")

if __name__ == "__main__":
    main()
