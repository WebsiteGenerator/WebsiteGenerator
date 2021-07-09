import os
import re

# Folder
def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

createFolder('./website')
createFolder('./resources/temp')

# About Page:
def about():
  location = input("Where do you live? | ")
  gender = input("What is your Gender? | ")
  birthday = input("When is your Birthday? | ")
  mail = input("What is your E-Mail-Adress? | ")
  print("Your About-Page will be generated automatically within a few seconds.")
  rs1 = open("./resources/about/part1.txt", "r")
  rs1 = rs1.read()
  rs2 = open("./resources/about/part2.txt", "r")
  rs2 = rs2.read()
  rs3 = open("./resources/about/part3.txt", "r")
  rs3 = rs3.read()
  rs4 = open("./resources/about/part4.txt", "r")
  rs4 = rs4.read()
  rs5 = open("./resources/about/part5.txt", "r")
  rs5 = rs5.read()
  rs6 = open("./resources/about/part6.txt", "r")
  rs6 = rs6.read()
  rs7 = open("./resources/about/part7.txt", "r")
  rs7 = rs7.read()
  rs8 = open("./resources/about/part8.txt", "r")
  rs8 = rs8.read()
  rs9 = open("./resources/about/part9.txt", "r")
  rs9 = rs9.read()
  createFolder('./website/about')
  f = open("./website/about/index.html", "a+")
  f.write(rs1 + name + rs2 + description + rs3 + previewimage + rs4 + location + rs5 + gender +  rs6 + birthday + rs7 + mail + rs8 + mail + rs9)
  print('Your About-Page was generated.')
  f.close()

# Cards
def card():
  cname = input('What is the name of the card? | ')
  cdescription = input("What is the description of the card? | ")
  curl = input("What is the URL of the card? | ")
  cimage = input("What is the image of the card? (You can enter a URL or a local path here). | ")
  cframeyn = input("If you want to use a custom Frame enter your code - Else: Enter n or no | ")
  if cframeyn == "n" or cframeyn == "no":
    cframe = "card bg-gray-100 rounded-lg bg-gray-800 hover:shadow-xl p-5 content-around"
  else:
    cframe = cframeyn
  rs1 = open("./resources/cards/part1.txt", "r")
  rs1 = rs1.read()
  rs2 = open("./resources/cards/part2.txt", "r")
  rs2 = rs2.read()
  rs3 = open("./resources/cards/part3.txt", "r")
  rs3 = rs3.read()
  rs4 = open("./resources/cards/part4.txt", "r")
  rs4 = rs4.read()
  rs5 = open("./resources/cards/part5.txt", "r")
  rs5 = rs5.read()
  rs6 = open("./resources/cards/part6.txt", "r")
  rs6 = rs6.read()
  rsurl = open("./resources/cards/parturl.txt", "r")
  rsurl = rsurl.read()
  cpurl = curl.replace('https://','')
  ccard = rs1 + cframe + rsurl + curl + rs2 + cimage + rs3 + cname + rs4 + cdescription + rs5 + cpurl + rs6
  ccards = '\n' + '\n' + ccard
  createFolder('./resources/temp')
  f = open("./resources/temp/cards.txt", "a+")
  f.write(ccards)
  f.close()
  addcard()

def socialmedia():
  sname = input("What is the name of the icon? | ")
  simage = input("What is the image of the icon? (You can enter a URL or a local path here). | ")
  surl = input("What is the URL of the icon? | ")
  icon = "                <img src=\"" + simage + '" class="inline-block rounded-lg w-10 h-10" id=icon_' + sname + '" onclick="window.open(\'' + surl + '\')"> '
  path = os.path.exists("./resources/temp/sci.txt")
  if path == False:
    f = open("./resources/temp/sci.txt", "a+")
    f.write('        <div class="m-10" id="socials">\n            <center>' + "\n" + icon)
    f.close()
  else:
    f = open("./resources/temp/sci.txt", "a")
    f.write("\n" + icon)
    f.close()
  addscm()

name = input("What is your name? | ")
print(f'Thanks! {name} is a really nice name. :D')
description = input("What do you want to use as your description? | ")
domain = input("What domain do you want to use? (Without https:// or http://) | ")
image = input("What image do you want to use? (You can enter a URL or a local path here). | ")
previewimage = input("What image do you want to use as a thumbnail? (Only URL) | ")

aboutyorno = input("Do you want to add an About Me-Page? (y or n) | ")
aboutyorno = aboutyorno.lower()
if aboutyorno == "y" or aboutyorno == "yes":
  about()

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
    path = os.path.exists("./resources/temp/sci.txt")
    if path == True:
      f = open("./resources/temp/sci.txt", "a+")
      f.write("\n            </center>\n    </footer>\n</html>")
addscm()

rs1 = open("./resources/index/part1.txt", "r")
rs1 = rs1.read()
rs2 = open("./resources/index/part2.txt", "r")
rs2 = rs2.read()
rs3 = open("./resources/index/part3.txt", "r")
rs3 = rs3.read()
rs4 = open("./resources/index/part4.txt", "r")
rs4 = rs4.read()
rs5 = open("./resources/index/part5.txt", "r")
rs5 = rs5.read()
rs6 = open("./resources/index/part6.txt", "r")
rs6 = rs6.read()
rs7 = open("./resources/index/part7.txt", "r")
rs7 = rs7.read()
rs8 = open("./resources/index/part8.txt", "r")
rs8 = rs8.read()
rs9 = open("./resources/index/part9.txt", "r")
rs9 = rs9.read()
rs10 = open("./resources/index/part10.txt", "r")
rs10 = rs10.read()

path = os.path.exists("./resources/temp/cards.txt")
if path == False:
  ccards = ""
elif path == True:
  ccards = open("./resources/temp/cards.txt", "r")
  ccards = ccards.read()

path = os.path.exists("./resources/temp/sci.txt")
if path == False:
  socialmedias = ""
elif path == True:
  socialmedias = open("./resources/temp/sci.txt", "r")
  socialmedias = socialmedias.read()
index = rs1 + domain + "\" content='" + description + rs2 + description + rs3 + previewimage + rs4 + name + rs5 + image + rs6 + name + rs7 + description + rs8 + image + rs9 + ccards + rs10 + socialmedias + "\n	</footer>\n</html>"
f = open("./website/index.html", "a+")
f.write(index)
f.close()
if os.path.exists("./resources/temp/cards.txt"):
  os.remove("./resources/temp/cards.txt")
if os.path.exists("./resources/temp/sci.txt"):
  os.remove("./resources/temp/sci.txt")

print('Thanks for using my Python-Script.')
print('Done!')
