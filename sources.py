import requests
from bs4 import BeautifulSoup
import json
import re
import time
import os
from colorama import Fore, Style

file_path_write = ".\sources.md"
file_path = ".\sources-ref.md"

def info_time(name:str = ""):
    """
    Affiche les informations sur le temps d'exécution.

    Args:
        name (str, optional): Le nom du fichier. Defaults to "".

    Returns:
        str: Les informations sur le temps d'exécution.
    """
    value = []
    if name != "":
        value.append("File " + name)
    value.append("Start at " + time.strftime("%H:%M:%S", time.localtime()) + " in " + time.strftime("%d/%m/%Y", time.localtime()))
    print(Fore.BLUE + "\n".join(value) + Style.RESET_ALL)
    return "\n".join(value)

text = info_time() +"\n"+"# Sources\n\nVoici la liste de tout les documents que j'ai utilise pour faire ce projet. Il y a des sites et des videos. Les sites sont classes par ordre alphabetique et les videos par ordre de duree."

def open_file(path:str):
    """
    Opens a file and returns its content as a string.

    Args:
        path (str): The path to the file.

    Returns:
        str: The content of the file.

    Raises:
        FileNotFoundError: If the file is not found.
    """
    try:
        with open(path, "r", encoding='utf-8') as file:
            return file.read()
    except FileNotFoundError:
        print(Fore.RED + "File not found" +Style.RESET_ALL)
        return False

def extract_sources(content:str):
    """
    Extracts sources from the given content.

    Parameters:
    content (str): The content to extract sources from.

    Returns:
    dict: A dictionary containing the extracted sources.
    """
    sources = {}
    for line in content.splitlines():
        if line.startswith("- ["):
            sources[line.split("](")[1].split(")")[0]] = line.split("](")[0].split("[")[1]
    return sources

def same(sources:list):
    """
    Check if there are any duplicate elements in the given list.

    Args:
        sources (list): The list of elements to check.

    Returns:
        bool: True if there are duplicate elements, False otherwise.
    """
    for source in sources:
        if sources.count(source) > 1:
            return True
    return False

def get_title(soup):
    """
    Extracts the title from the given BeautifulSoup object.

    Parameters:
    soup (BeautifulSoup): The BeautifulSoup object representing the HTML page.

    Returns:
    str: The extracted title.
    """
    try:
        title = soup.title.string.replace('"',"").replace(":","").replace("}","").replace(" - YouTube","")
        return str(title)
    except:
        str_soup = str(soup)
        return str_soup.split("title")[1].replace('"',"").replace(":","").replace("}","").replace("- Youtube", "")

def write_file(path:str, content:str):
    """
    Écrit le contenu spécifié dans le fichier spécifié.

    Args:
        path (str): Le chemin du fichier.
        content (str): Le contenu à écrire dans le fichier.

    Returns:
        bool: True si l'écriture du fichier est réussie, False sinon.
    """
    try:
        with open(path, 'w', encoding='utf-8') as file:
                file.write(content)
        return True
    except FileNotFoundError:
        return False
        
def get_youtube_duration(soup):
    """
    Extracts the duration of a YouTube video from the given BeautifulSoup object.

    Parameters:
    soup (BeautifulSoup): The BeautifulSoup object representing the HTML of the YouTube video page.

    Returns:
    list or None: A list containing the duration of the video in hours, minutes, and seconds [h, m, s].
                  Returns None if the duration tag is not found.
    """
    duration_tag = soup.find('meta', {'itemprop': 'duration'})
    if duration_tag is not None:
        duration = duration_tag["content"].replace("PT","").replace("H",":").replace("M",":").replace("S","").split(":")[0:3]
        duration = [int(i) for i in duration]
        if duration[0] > 60:
            duration.append(duration[1])
            duration[1] = duration[0] % 60
            duration[0] = duration[0] // 60
        return duration
    else:
        return None
    
def string_duration(duration:list):
    """
    Converts a duration list into a formatted string representation.

    Args:
        duration (list): A list containing the duration in hours, minutes, and seconds.

    Returns:
        str: The formatted string representation of the duration.

    Example:
        >>> string_duration([1, 30, 45])
        '1h 30m 45s'
    """
    if duration is not None:
        if len(duration) == 3:
            return str(duration[0])+"h "+str(duration[1])+"m "+str(duration[2])+"s"
        elif len(duration) == 2:
            return str(duration[0])+"m "+str(duration[1])+"s"
        elif len(duration) == 1:
            return str(duration[0])+"s"
    else:
        return None

def get_json_data(soup):
    """
    Extracts JSON data from a BeautifulSoup object.

    Parameters:
    - soup: BeautifulSoup object representing the HTML content.

    Returns:
    - JSON data extracted from the soup object, or None if no JSON data is found.
    """
    scripts = soup.find_all('script')
    for script in scripts:
        if 'ytInitialData' in script.text:
            json_str = re.search(r'var ytInitialData = ({.*?});', script.text).group(1)
            data = json.loads(json_str)
            return data
    return None

def title_format(title:str) -> str:
    """
    Format the title by replacing accented characters with non-accented characters.

    Args:
        title (str): The title to be formatted.

    Returns:
        str: The formatted title.
    """
    dict_accent = {"à":"a","â":"a","ä":"a","é":"e","è":"e","ê":"e","ë":"e","î":"i","ï":"i","ô":"o","ö":"o","ù":"u","û":"u","ü":"u","ÿ":"y","ç":"c","œ":"oe","æ":"ae","·":"-","–":"-","#":"","Ã©":"e"}
    # Remplace les accents par des lettres sans accents
    title = title.replace("\n","").replace("\n","").replace("\t", "").replace("\r", "").replace("  ","").replace("  ","")
    title = title.replace("🏃🏽\u200d♀️","")
    for letter in title:
        if letter in dict_accent.keys():
            title = title.replace(letter,dict_accent[letter])
    return title

# Function qui convertie un temps en secondes
def time_to_seconds(time:str) -> int:
    """
    Converts a time string in the format 'hh:mm:ss' to seconds.

    Parameters:
    time (str): The time string to be converted.

    Returns:
    int: The equivalent time in seconds.
    """
    h, m, s = 0, 0, 0
    if 'h' in time:
        h, time = time.split('h')
    if 'm' in time:
        m, time = time.split('m')
    if 's' in time:
        s = time.split('s')[0]
    return int(h) * 3600 + int(m) * 60 + int(s)

def get_image(soup, url):
    """
    Retrieves the images from a given HTML soup and URL.

    Parameters:
    - soup (BeautifulSoup): The HTML soup object.
    - url (str): The URL of the webpage.

    Returns:
    - img (list): A list containing two lists of image URLs. The first list (img[0]) contains image URLs found in the HTML soup, and the second list (img[1]) contains image URLs based on specific conditions.
    """
    img= [[],[]]
    if url != None:
        if "epicgames" in url:
            img[1].append("https://dev.epicgames.com/community/assets/images/favicon-light.png")
        if "sentinel-hub" in url:
            img[1].append("https://docs.sentinel-hub.com/api/latest/static/favicon-0211032a7963283fad24e3b280053c45.ico")
        if "microsoft" in url:
            img[1].append("https://learn.microsoft.com/favicon.ico")
        if "tangrams" in url:
            img[1].append("https://tangrams.readthedocs.io/en/latest/img/favicon.ico")
        if "unrealengine" in url:
            img[1].append("https://d3kjluh73b9h9o.cloudfront.net/optimized/4X/4/f/c/4fc78ce65be09c7e97b60a65447c99c078aca16b_2_32x32.png")
        if "github" in url:
            img[1].append("https://github.githubassets.com/favicons/favicon.png")
        if "mapzen" in url:
            img[1].append("https://www.mapzen.com/assets/common/styleguide/images/favicons/favicon-32x32.png")
        if "isaratech" in url:
            img[1].append("https://i0.wp.com/isaratech.com/wp-content/uploads/2018/09/cropped-Mini-Isara-Tech.png?fit=32%2C32&ssl=1")
        if "registry" in url:
            img[1].append("https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico")
        if "3d-mapper" in url:
            img[1].append("https://3d-mapper.com/wp-content/uploads/2022/09/3d-mapper-fav.png")
        if "sciencedirect" in url:
            img[1].append("https://th.bing.com/th/id/R.342d15c28fcc2096c059a485d59aa097?rik=qq254yYJi11Yuw&pid=ImgRaw&r=0")
    if type(soup) == BeautifulSoup:
        links = soup.find_all('link')
        metas = soup.find_all('meta')
        for link in links:
            if str(link).startswith('<link href="https://i'):
                img[0].append(str(link).split("=")[1].replace('"',"").replace("rel",""))
            if "ico" in str(link):
                ref = str(link).split("=")[1].replace('"',"").replace("rel","")
                if ref != " href" and ref.startswith("http"):
                    img[1].append(ref)
        for meta in metas:
            if 'icon' in str(meta):
                ref = str(meta).split("=")[1].replace('"',"").replace("rel","")
                if ref != " href" and ref.startswith("http"):
                    img[1].append(ref)
    return img


# Ouvre le fichier contenant la liste des liens
sources = open_file(file_path).splitlines()

# Vérifie s'il y a des doublons
if same(sources):
    print(Fore.YELLOW + "There are duplicates in the link list" + Style.RESET_ALL)
    #suprime les liens en double
    sources = list(dict.fromkeys(sources))
    # remplace le fichier par la liste sans doublons
    with open(file_path, "w") as file:
        for source in sources:
            file.write(source+"\n")


# Génère un dictionnaire des liens
real_names = []
dict_urlName = {}
# Sépare les liens des vidéos et des sites
dict_site = {}
dict_video = {}
dict_image = {}

# Vérifie s'il y a des doublons dans le fichier de référence
ref = open_file(file_path_write).splitlines()
for line in ref:
    if line.startswith("- ["):
        url = line.split("](")[1].split(")")[0]
        name = line.split("](")[0].split("[")[1]
        dict_urlName[url] = name
    elif line.startswith("- ![Icon]("):
        url = line.split("](")[2].split(")")[0]
        name = line.split("](")[1].split("[")[1]
        dict_urlName[url] = name


sources_copy = sources.copy()
for url in sources:
    for url2 in dict_urlName.keys():
        if url == url2:
            #suprime l'url dans la liste sources
            sources_copy.remove(url)




for url in sources_copy:

    #url, title in dict_urlName.items()

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    title = get_title(soup)
    title = title_format(title)
    
    real_names.append(title)
    dict_urlName[url] = title


    # trie les liens dans la bonnes catégories
    Url_wihout = url.replace("https://","")
    if Url_wihout.startswith("www."):
        Url_wihout = Url_wihout.replace("www.","")

    if Url_wihout.startswith("youtube.com"):
        if Url_wihout.startswith("youtube.com/playlist"):
            data = get_json_data(soup)
            tab = data['contents']['twoColumnBrowseResultsRenderer']['tabs'][0]
            all_title = []
            all_url = []
            all_thumbnails = []
            for i in range (len(data)-1):
                try:
                    title_data = tab['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['playlistVideoListRenderer']['contents'][i]['playlistVideoRenderer']['title']
                    title = title_data['runs'][0]['text']
                    title = title_format(title)
                    all_title.append(title)
                    navigation_data = tab['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['playlistVideoListRenderer']['contents'][i]['playlistVideoRenderer']['navigationEndpoint']
                    url = navigation_data['commandMetadata']['webCommandMetadata']['url']
                    url = "https://www.youtube.com"+url
                    all_url.append(url)
                    thumbnail_data = tab['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['playlistVideoListRenderer']['contents'][i]['playlistVideoRenderer']['thumbnail']['thumbnails']
                    all_thumbnails.append(thumbnail_data[0]['url'])
                    dict_image[url] = [[all_thumbnails[i]],[]]

                    response = requests.get(url)
                    soup = BeautifulSoup(response.text, 'html.parser')
                    dict_video[url] = title + " ---- " + string_duration(get_youtube_duration(soup))
                    dict_image[url][1] = get_image(soup,Url_wihout)[1]
                except:
                    print(Fore.RED + "error playlist Thumbnail in " + url)
        else:
            dict_video[url] = title + " ---- " + str(string_duration(get_youtube_duration(soup)))
            dict_image[url] = get_image(soup, Url_wihout)
    elif Url_wihout.startswith("youtu.be"):
        dict_video[url] = title + " ---- " + string_duration(get_youtube_duration(soup))
        dict_image[url] = get_image(soup, Url_wihout)
    else:
        dict_site[url] = title
        dict_image[url] = get_image(soup, Url_wihout)

# Trie les sites par ordre alphabétique
dict_site = dict(sorted(dict_site.items(), key=lambda item: item[1]))

# Trie les videos par durée
dict_video = dict(sorted(dict_video.items(), key=lambda item: time_to_seconds(item[1].split(" ---- ")[1])))

dict_sites2 = {}
dict_video2 = {}

doublons_sites = {}
doublons_video = {}

#Verifie qu'il n'y a pas de doublons dans les dictionnaires
if same(list(dict_site.values())):
    #suprime les doublons
    for k,v in dict_site.items():
        if list(dict_site.values()).count(v) == 1:
            dict_sites2[k] = v
        if list(dict_site.values()).count(v) > 1:
            if k not in doublons_sites.keys():
                doublons_sites[k] = [v]
                dict_sites2[k] = v
else:
    dict_sites2 = dict_site
    
if same(list(dict_video.values())):
    #suprime les doublons
    for k,v in dict_video.items():
        if list(dict_video.values()).count(v) == 1:
            dict_video2[k] = v
        if list(dict_video.values()).count(v) > 1:
            for k2,v2 in doublons_video.items():
                if v == v2:
                    dict_video2[k2] = v2
            doublons_video[k] = v
else:
    dict_video2 = dict_video

# Génère le texte
if dict_sites2 != {}: 
    text += "\n\n## Sites\n\n"
    for url, title in dict_sites2.items():
        if dict_image[url][1] != []:
            text += "- ![Icon]("+dict_image[url][1][0]+") ["+title+"]("+url+")\n"
        else:
            text += "- ["+title+"]("+url+")\n"

if dict_video2 != {}:
    text += "\n\n## Videos\n\n"
    for url, title in dict_video2.items():
        if dict_image[url][1] != []:
            text += "- ![Icon]("+dict_image[url][1][0]+") ["+title+"]("+url+")\n"
        else:
            text += "- ["+title+"]("+url+")\n"
        if dict_image[url][0] != []:
            text += "- ![Thumbnail]("+dict_image[url][0][0]+")\n"

# Écrit le fichier
print(Fore.GREEN + "Markdown generated")
write_file(file_path_write, text)
print(Style.RESET_ALL + "")