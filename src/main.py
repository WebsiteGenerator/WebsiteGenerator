import os
import requests
import sys

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def create_folder(directory):
    """Creates a directory if it does not exist."""
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print(f"Error: Could not create directory {directory}.")
        sys.exit(1)

def get_image_url(prompt_text):
    """Reads an image URL or image code and formats it correctly."""
    user_input = input(prompt_text).strip()
    if not user_input:
        return ""
    if "/" not in user_input:
        return f"https://websitegenerator.github.io/WebsiteGenerator/icons/{user_input}.png"
    return user_input

def get_css_content():
    """Fetches the latest CSS directly from the repository."""
    print("Fetching latest styles...")
    css_url = 'https://raw.githubusercontent.com/WebsiteGenerator/WebsiteGenerator/main/docs/template.css'
    try:
        r = requests.get(css_url)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"Warning: Could not fetch CSS. Your website might lack styling. ({e})")
        return ""

def gather_cards():
    """Loops to gather user cards."""
    cards_html = ""
    while True:
        add_card = input("\nDo you want to add a card (project/link)? (y/n) | ").strip().lower()
        if add_card not in ["y", "yes"]:
            break
            
        print("-" * 40)
        cname = input('What is the name of the card? | ')
        cdescription = input("What is the description? | ")
        curl = input("What is the URL? | ")
        print("\nTip: You can provide a URL, a local path, or an Image Code.")
        print("Browse all Image Codes here: https://github.com/WebsiteGenerator/WebsiteGenerator/tree/main/icons\n")
        cimage = get_image_url("Which image/icon should be used? | ")
        
        cframeyn = input("Do you want to use a custom Tailwind-CSS frame? (If not, type 'n') | ").strip()
        cframe = "card bg-gray-100 rounded-lg bg-gray-800 hover:shadow-xl p-5 content-around"
        if cframeyn not in ["n", "no"]:
            cframe = cframeyn

        cpurl = curl.replace('https://', '')
        
        # Build the card HTML
        cards_html += f"""
        <div class="{cframe}" onclick="window.open('{curl}')">
            <div class="flex">
                <img src="{cimage}" class="rounded-lg w-10 h-10">
                <span class="font-bold ml-3 mt-2">{cname}</span>
            </div>
            <p class="text-gray-400 mt-2">{cdescription}</p>
            <p class="text-blue-300 mt-2">{cpurl}</p>
        </div>
        """
        print(f"✅ Card '{cname}' added successfully!")
        
    return cards_html

def gather_socials():
    """Loops to gather social media icons."""
    socials_html = ""
    has_socials = False
    
    while True:
        add_scm = input("\nDo you want to add a Social Media icon? (y/n) | ").strip().lower()
        if add_scm not in ["y", "yes"]:
            break
            
        has_socials = True
        print("-" * 40)
        sname = input("What is the name of the network/icon? | ")
        print("\nTip: Browse all Image Codes here: https://github.com/WebsiteGenerator/WebsiteGenerator/tree/main/icons\n")
        simage = get_image_url("Which icon should be used? (Image Code or URL) | ")
        surl = input("What is the URL to your profile? | ")
        
        socials_html += f'                <img src="{simage}" class="inline-block rounded-lg w-10 h-10 m-2 cursor-pointer hover:opacity-80" id="icon_{sname}" onclick="window.open(\'{surl}\')">\n'
        print(f"✅ Icon '{sname}' added successfully!")
        
    if has_socials:
        return f'        <div class="m-10" id="socials">\n            <center>\n{socials_html}            </center>\n        </div>'
    return ""

def main():
    clear_screen()
    print("=" * 60)
    print(" 🚀 Welcome to WebsiteGenerator! (Terminal Edition) 🚀")
    print("=" * 60)
    
    # Create output directory
    create_folder('./web')
    
    # Gather basic info
    print("\nLet's gather some information about you!")
    name = input("What should be the name of your website? | ").strip()
    print(f"Awesome! '{name}' is a great name. :D")
    
    pronouns = input("What are your pronouns? (Leave empty or type 'n' to skip) | ").strip()
    if pronouns.lower() in ["no", "n"]:
        pronouns = ""
        
    description = input("What description text would you like to use? | ").strip()
    domain = input("What domain do you use? (Without https://) | ").strip()
    image = input("Link to your profile picture (URL) | ").strip()
    previewimage = input("Link to your preview thumbnail (URL) | ").strip()
    
    # Gather dynamic elements
    cards_content = gather_cards()
    socials_content = gather_socials()
    
    # Generate the Website
    print("\nGenerating your website... Please wait!")
    css_content = get_css_content()
    
    # Construct final HTML
    final_html = f"""<!DOCTYPE html>
<html>
    <head>
        <meta property='og:title' id="{domain}" content='{name}' />
        <meta property='og:type' content="website" />
        <meta property='og:description' id="eDesc" content='{description}' />
        <meta property="og:image" id="eIcon" content='{previewimage}' />
        <meta name="theme-color" content="#c83ca0">

        <style>
            {css_content}
            ::-webkit-scrollbar {{ width: 10px; }}
            ::-webkit-scrollbar-track {{ background: #151A23; }}
            ::-webkit-scrollbar-thumb {{ background: #666; }}
            ::-webkit-scrollbar-thumb:hover {{ background: #555; }}
            body, html {{ overflow-x: hidden; }}
            body {{ padding-bottom: 30px; }}
            header span:hover, .card:hover {{ cursor: pointer; transition-duration: 0.2s; }}
            header span {{ transition: background-color 75ms ease-in-out, box-shadow 75ms ease-in-out; }}
            .card {{ transform: rotate(0deg); transition: transform 0.2s ease-in-out; }}
            .card:hover {{ transform: rotate(2deg); }}
            #splashIcon {{ transform: translateY(-60%); }}
            #list {{ display: grid; margin: auto; grid-template-columns: repeat(auto-fit, 320px); grid-gap: 50px; justify-content:center; margin-top: 300px; }}
            * {{ user-select: none; }}
            .partner-title {{ display: none; }}
            @media only screen and (max-width: 600px) {{
                #list {{ grid-gap: 30px; margin-top: 220px; }}
            }}
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{name}</title>
        <link rel="shortcut icon" href="{image}" type="image/x-icon">
    </head>
    <body class="pt-40 p-0 bg-gray-900 text-white">
        <div class="text-center md:w-1/2 w-screen select-none mx-auto">
            <a class="text-6xl font-semibold">{name}</a> <br>
            <a class="text-gray-500">{description}</a> <br>
            <a class="text-gray-700">{pronouns}</a> <br>
        </div>
        <div class="w-1/2 float-right hidden md:block">
            <img src="{image}" id="splashIcon" style="border-radius: 20px;" class="overflow-hidden w-64 mx-auto">
        </div>
        <div class="px-20 w-screen" id="list">
            {cards_content}
        </div>
        {socials_content}
        <br>
    </body>
    <footer class="text-gray-500">
        <div class="flex justify-center cursor-pointer hover:text-gray-400" onclick="window.open('https://github.com/WebsiteGenerator/WebsiteGenerator')">
            Made with WebsiteGenerator
        </div>
    </footer>
</html>"""

    try:
        with open("./web/index.html", "w", encoding="utf-8") as f:
            f.write(final_html)
    except Exception as e:
        print(f"Error while saving the file: {e}")

    print("\n🎉 Done! Thank you for using my Python Script.")
    print("Your new website is ready in the './web/' folder as a portable 'index.html' file.")

if __name__ == "__main__":
    main()
