import requests
from bs4 import BeautifulSoup
import json
import re

file_path_write = ".\sources-ref.md"
file_path = "./md\sources.md"

text = "# Sources\n\nVoici la liste de tout les documents que j'ai utilise pour faire ce projet. Il y a des sites et des videos. Les sites sont classes par ordre alphabetique et les videos par ordre de duree."

def open_file(path:str):
    try:
        with open(path, "r") as file:
            return file.read()
    except FileNotFoundError:
        return False

def extract_sources(content:str):
    sources = {}
    for line in content.splitlines():
        if line.startswith("- ["):
            sources[line.split("](")[1].split(")")[0]] = line.split("](")[0].split("[")[1]
    return sources

def same(sources:list):
    for source in sources:
        if sources.count(source) > 1:
            return True
    return False

def get_title(soup):
    try:
        title = soup.title.string.replace('"',"").replace(":","").replace("}","").replace(" - YouTube","")
        return str(title)
    except:
        str_soup = str(soup)
        return str_soup.split("title")[1].replace('"',"").replace(":","").replace("}","").replace("- Youtube", "")

def write_file(path:str, content:str):
    try:
        with open(path, "w") as file:
            file.write(content)
        return True
    except FileNotFoundError:
        return False
        
def get_youtube_duration(soup):
    
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
    scripts = soup.find_all('script')
    for script in scripts:
        if 'ytInitialData' in script.text:
            json_str = re.search(r'var ytInitialData = ({.*?});', script.text).group(1)
            data = json.loads(json_str)
            return data
    return None

def title_format(title:str) -> str:
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
    h, m, s = 0, 0, 0
    if 'h' in time:
        h, time = time.split('h')
    if 'm' in time:
        m, time = time.split('m')
    if 's' in time:
        s = time.split('s')[0]
    return int(h) * 3600 + int(m) * 60 + int(s)

def get_image(soup, url):
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
    print("Il y a des doublons dans la liste des liens.")
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




for url in sources:

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
            print("playlist")
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
                    print("error in " + url)
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
text += "\n\n## Sites\n\n"
for url, title in dict_sites2.items():
    if dict_image[url][1] != []:
        text += "- ![Icon]("+dict_image[url][1][0]+") ["+title+"]("+url+")\n"
    else:
        text += "- ["+title+"]("+url+")\n"

text += "\n\n## Videos\n\n"
for url, title in dict_video2.items():
    if dict_image[url][0] != []:
        text += "- ![Thumbnail]("+dict_image[url][0][0]+")\n"
    if dict_image[url][1] != []:
        text += "- ![Icon]("+dict_image[url][1][0]+") ["+title+"]("+url+")\n"
    else:
        text += "- ["+title+"]("+url+")\n"

# Écrit le fichier
write_file(file_path_write, text)