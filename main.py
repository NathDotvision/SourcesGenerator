from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from sources import open_file
from reportlab.platypus import Image
from reportlab.platypus import Table
import requests
from io import BytesIO
from bs4 import BeautifulSoup

doc = SimpleDocTemplate("sources.pdf", pagesize=letter)
styles = getSampleStyleSheet()
story = []

file_path_write = ".\sources-ref.md"

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
                        print("error in " + image_url)
            link_para = Paragraph(link, styles["BodyText"])

            # Créer un tableau avec l'image, le nom et le lien
            data = [[img,link_para]]
            table = Table(data, colWidths=[40, 400])

            # Ajouter le tableau à l'histoire
            story.append(table)
        elif line.startswith('- ![Thumbnail'):
            # Extraire les informations de l'image et du lien
            image_url = line.split('](')[1].split(')')[0].strip()

            # Télécharger l'image
            response = requests.get(image_url)
            image_data = BytesIO(response.content)

            # Créer une image
            if response.headers['Content-Type'] == 'image/png':
                img = Image(image_data, width=1920/20, height=1080/20)
            else:
                try:
                    response = requests.get(image_url.split("?")[0])
                    #soup = BeautifulSoup(response.text, 'html.parser')
                    image_data = BytesIO(response.content)
                    img = Image(image_data, width=1280/10, height=720/10)
                except:
                    img = ""
                    print("error in " + image_url)
    
            # Créer un tableau avec l'image
            data = [[img]]
            table = Table(data, colWidths=[1280/10])

            # Ajouter le tableau à l'histoire
            story.append(table)
    elif line.startswith('- ['):
            link_text = line.split('[')[1].split(']')[0]
            link_url = line.split('](')[1].split(')')[0]

            # Créer un paragraphe avec le lien
            link = '<link href="' + link_url + '">' + link_text + '</link>'
            para = Paragraph(link, styles["BodyText"])

            # Ajouter le paragraphe à l'histoire
            story.append(para)
    else:
        story.append(Paragraph(line, styles["Normal"]))


# Largeur et hauteur de la page
page_width, page_height = letter

print("Page width:", page_width)
print("Page height:", page_height)

doc.build(story)