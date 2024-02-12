from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from sources import open_file, info_time
from colorama import Fore, Style
from myjson import *
from reportlab.platypus import Image
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors
import requests
from io import BytesIO
from bs4 import BeautifulSoup
import os

doc = SimpleDocTemplate("sources.pdf", pagesize=letter)
styles = getSampleStyleSheet()
story = []
json_data= {}

file_path_write = ".\sources.md"

text = open_file(file_path_write) 
youtube_logo = None

for line in text.splitlines():
    if line.startswith("#"):
        compteur = line.count("#")
        if compteur > 6:
            compteur = 6
        line = line.replace("#", "").strip()
        story.append(Paragraph(line, styles["Heading"+str(compteur)]))
    elif line.startswith('- !['):
        # Extraire les informations de l'image et du lien
        if line.startswith('- ![Icon]('):
            image_url = line.split('](')[1].split(')')[0]
            link_url = line.split('](')[2].split(')')[0]
            link_name = line.split("](")[1].split("[")[1]
            link = '<link href="' + link_url + '">'+link_name+'</link>'

            # Télécharger l'image
            response = requests.get(image_url)
            image_data = BytesIO(response.content)
            

            # Créer une image et un paragraphe avec le lien
            #print(response.headers['Content-Type'])  # Ajoutez cette ligne
            if response.headers['Content-Type'] == 'image/png':
                img = Image(image_data, width=20, height=20)
            else:
                if (link_url.startswith('https://www.yout') or link_url.startswith('https://youtu')):
                    if youtube_logo == None:
                        response = requests.get("https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-1024.png")
                        youtube_logo = BytesIO(response.content)
                    img = Image(youtube_logo, width=20, height=20)
                else :
                    try:
                        response = requests.get(image_url)
                        soup = BeautifulSoup(response.text, 'html.parser')
                        image_data = BytesIO(response.content)
                        img = Image(image_data, width=20, height=20)
                    except:
                        img = ""
                        print(Fore.RED + "error Icon in " + image_url + Style.RESET_ALL)
            link_para = Paragraph(link, styles["BodyText"])

            # Créer un tableau avec l'image, lien
            data = [[img,link_para]]
            table = Table(data, colWidths=[40, 400])

            # Ajouter un style de tableau avec un cadre
            # table.setStyle(TableStyle([
            # ('GRID', (0,0), (-1,-1), 1, colors.black),
            # ]))

            # Ajouter le tableau à l'histoire
            story.append(table)
            json_data[link_name] = {"icon_image": image_url, "link_url": link_url, "link_pdf": link, "type":"link_with_icon"}
        elif line.startswith('- ![Thumbnail'):
            story.pop()
            # Extraire les informations de l'image et du lien
            image_url = line.split('](')[1].split(')')[0].strip()

            # Télécharger l'image
            response = requests.get(image_url)
            image_data = BytesIO(response.content)

            ImageSizeFactor = 30
            ImageSize = [1920/ImageSizeFactor, 1080/ImageSizeFactor]

            # Créer une image
            if response.headers['Content-Type'] == 'image/png':
                img = Image(image_data, width=ImageSize[0], height=ImageSize[1])
            else:
                try:
                    response = requests.get(image_url.split("?")[0])
                    #soup = BeautifulSoup(response.text, 'html.parser')
                    image_data = BytesIO(response.content)
                    img = Image(image_data, width=ImageSize[0], height=ImageSize[1])
                except:
                    img = ""
                    print(Fore.RED + "error Thumbnail in " + image_url + Style.RESET_ALL)
    
            # Créer un tableau avec l'image
            data[0].append(img)
            table = Table(data, colWidths=[40,400-ImageSize[0],ImageSize[0]])

            # Ajouter le tableau à l'histoire
            story.append(table)
            json_data[link_name] = {"icon_image": image_url, "link_url": link_url, "link_pdf": link, "type":"video"}
    elif line.startswith('- ['):
            link_text = line.split('[')[1].split(']')[0]
            link_url = line.split('](')[1].split(')')[0]

            # Créer un paragraphe avec le lien
            link = '<link href="' + link_url + '">' + link_text + '</link>'
            para = Paragraph(link, styles["BodyText"])

            json_data[link_text] = {"icon_image": None, "link_url": link_url, "link_pdf": link, "type":"link_without_icon"}

            # Ajouter le paragraphe à l'histoire
            story.append(para)
    else:
        story.append(Paragraph(line, styles["Normal"]))

# TODO: implementer un fichier json temporaire pour les variables que l'on utilise couramment
# Largeur et hauteur de la page
page_width, page_height = letter
doc.build(story)
print(Fore.GREEN + "Pdf generated")
print(Style.RESET_ALL + "")

if write_json(json_data, "sources.json"):
    print(Fore.GREEN + "JSON generated" + Style.RESET_ALL)
else:
    print(Fore.RED + "Error in Json file" + Style.RESET_ALL)