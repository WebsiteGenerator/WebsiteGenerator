import os
import requests
import zipfile
import shutil
import click

@click.command()
def main():

  # Download required resources
  downloadurl = 'https://raw.githubusercontent.com/WebsiteGenerator/resources/main/latest.zip'
  r = requests.get(downloadurl, allow_redirects=True)
  open('latest.zip', 'wb').write(r.content)
  with zipfile.ZipFile("latest.zip", 'r') as zip_ref:
    zip_ref.extractall("./web/")
  # Remove the zip file
  os.remove('latest.zip')

  # Folder
  def createFolder(directory):
      try:
          if not os.path.exists(directory):
              os.makedirs(directory)
      except OSError:
          print ('Error: Creating directory. ' +  directory)

  createFolder('./web')
  createFolder('./web/wbsg_resources/temp')

  # Cards
  def card():
    cname = input('What is the name of the card? | ')
    cdescription = input("What is the description of the card? | ")
    curl = input("What is the URL of the card? | ")
    print("\n")
    print("Since version 3 there are automatic logos and icons for cards and social media icons if you specify the image code as URL for the images. You can find all image codes at https://by0.link/imagecodes.")
    print("\n")
    cimage = input("What is the image of the card? (You can enter a URL, an image code (https://by0.link/imagecodes) or a local path here). | ")
    if not "/" in cimage:
        cimage = "https://generat0r.byzero.dev/" + cimage + ".png"
    cframeyn = input("If you want to use a custom Frame enter your code - Else: Enter n or no | ")
    if cframeyn == "n" or cframeyn == "no":
      cframe = "card bg-gray-100 rounded-lg bg-gray-800 hover:shadow-xl p-5 content-around"
    else:
      cframe = cframeyn
    rs1 = open("./web/wbsg_resources/cards/part1.txt", "r")
    rs1 = rs1.read()
    rs2 = open("./web/wbsg_resources/cards/part2.txt", "r")
    rs2 = rs2.read()
    rs3 = open("./web/wbsg_resources/cards/part3.txt", "r")
    rs3 = rs3.read()
    rs4 = open("./web/wbsg_resources/cards/part4.txt", "r")
    rs4 = rs4.read()
    rs5 = open("./web/wbsg_resources/cards/part5.txt", "r")
    rs5 = rs5.read()
    rs6 = open("./web/wbsg_resources/cards/part6.txt", "r")
    rs6 = rs6.read()
    rsurl = open("./web/wbsg_resources/cards/parturl.txt", "r")
    rsurl = rsurl.read()
    cpurl = curl.replace('https://','')
    ccard = rs1 + cframe + rsurl + curl + rs2 + cimage + rs3 + cname + rs4 + cdescription + rs5 + cpurl + rs6
    ccards = '\n' + '\n' + ccard
    createFolder('./web/wbsg_resources/temp')
    f = open("./web/wbsg_resources/temp/cards.txt", "a+")
    f.write(ccards)
    f.close()
    addcard()

  def socialmedia():
    sname = input("What is the name of the icon? | ")
    print("\n")
    print("Since version 3 there are automatic logos and icons for cards and social media icons if you specify the image code as URL for the images. You can find all image codes at https://by0.link/imagecodes.")
    print("\n")
    simage = input("What is the image of the icon? (You can enter a URL, an image code (https://by0.link/imagecodes) or a local path here). | ")
    if not "/" in simage:
      simage = "https://generat0r.byzero.dev/" + simage + ".png"
    surl = input("What is the URL of the icon? | ")
    icon = "                <img src=\"" + simage + '" class="inline-block rounded-lg w-10 h-10" id=icon_' + sname + '" onclick="window.open(\'' + surl + '\')"> '
    path = os.path.exists("./web/wbsg_resources/temp/sci.txt")
    if path == False:
      f = open("./web/wbsg_resources/temp/sci.txt", "a+")
      f.write('        <div class="m-10" id="socials">\n            <center>' + "\n" + icon)
      f.close()
    else:
      f = open("./web/wbsg_resources/temp/sci.txt", "a")
      f.write("\n" + icon)
      f.close()
    addscm()

  name = input("What is the name for the website? (this could be your name or something else) | ")
  print(f'Thanks! {name} is a really nice name. :D')
  pronouns = input("What are your pronouns? (if you don't want to use pronouns, type no or n). | ")
  pronounslower = pronouns.lower()
  if pronounslower == "no" or pronounslower == "n":
    pronouns = ""
  description = input("What do you want to use as your description? | ")
  domain = input("What domain do you want to use? (Without https:// or http://) | ")
  image = input("What image do you want to use? (You can enter a URL or a local path here). | ")
  previewimage = input("What image do you want to use as a thumbnail? (Only URL) | ")

  def addcard():
    addcard = input("Do you want to add a card? (y or n) | ")
    addcard = addcard.lower()
    if addcard == "y" or addcard == "yes":
      card()
  addcard()

  def addscm():
    addscme = input("Do you want to add a Social-Media Icon? (y or n) | ")
    addscme = addscme.lower()
    if addscme == "y" or addscme == "yes":
      socialmedia()
    else:
      path = os.path.exists("./web/wbsg_resources/temp/sci.txt")
      if path == True:
        f = open("./web/wbsg_resources/temp/sci.txt", "a+")
        f.write("\n            </center>\n    </footer>\n</html>")
  addscm()

  rs1 = open("./web/wbsg_resources/index/part1.txt", "r")
  rs1 = rs1.read()
  rs2 = open("./web/wbsg_resources/index/part2.txt", "r")
  rs2 = rs2.read()
  rs3 = open("./web/wbsg_resources/index/part3.txt", "r")
  rs3 = rs3.read()
  rs4 = open("./web/wbsg_resources/index/part4.txt", "r")
  rs4 = rs4.read()
  rs5 = open("./web/wbsg_resources/index/part5.txt", "r")
  rs5 = rs5.read()
  rs6 = open("./web/wbsg_resources/index/part6.txt", "r")
  rs6 = rs6.read()
  rs7 = open("./web/wbsg_resources/index/part7.txt", "r")
  rs7 = rs7.read()
  rs8 = open("./web/wbsg_resources/index/part8.txt", "r")
  rs8 = rs8.read()
  rs9 = open("./web/wbsg_resources/index/part9.txt", "r")
  rs9 = rs9.read()
  rs10 = open("./web/wbsg_resources/index/part10.txt", "r")
  rs10 = rs10.read()
  partpronouns = open("./web/wbsg_resources/index/partpronouns.txt", "r")
  partpronouns = partpronouns.read()
  css = open("./web/wbsg_resources/index/css.txt", "r")
  css = css.read()

  path = os.path.exists("./web/wbsg_resources/temp/cards.txt")
  if path == False:
    ccards = ""
  elif path == True:
    ccards = open("./web/wbsg_resources/temp/cards.txt", "r")
    ccards = ccards.read()

  path = os.path.exists("./web/wbsg_resources/temp/sci.txt")
  if path == False:
    socialmedias = ""
  elif path == True:
    socialmedias = open("./web/wbsg_resources/temp/sci.txt", "r")
    socialmedias = socialmedias.read()
  index = rs1 + domain + "\" content='" + name + rs2 + description + rs3 + previewimage + rs4 + name + rs5 + image + rs6 + name + rs7 + description + rs8 + pronouns + partpronouns + image + rs9 + ccards + rs10 + socialmedias + "\n	</footer>\n</html>"
  f = open("./web/index.html", "a+")
  f.write(index)
  f.close()
  if os.path.exists("./web/wbsg_resources/temp/cards.txt"):
    os.remove("./web/wbsg_resources/temp/cards.txt")
  if os.path.exists("./web/wbsg_resources/temp/sci.txt"):
    os.remove("./web/wbsg_resources/temp/sci.txt")
  filecss = open("./web/style.css", "a+")
  filecss.write(css)

  shutil.rmtree("./web/wbsg_resources/")

  print('Thanks for using my Python-Script.')
  print('Done!')


if __name__ == '__main__':
    main()
