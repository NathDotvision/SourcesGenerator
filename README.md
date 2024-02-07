# Sources Generator

## Explication

Dans le but de resencée les sources et d'etre purement utile que ça soit pour les developeurs ou même pour les manageurs, ce projet prend la liste des sources (liens) dans le fichiers sources.md et les transforme dans un fichiers md et pdf [sources-ref.md](sources-ref.md) et [sources.pdf](sources.pdf).

## Lancement

ne pas oublier de lancer la commande
```shell
pip install reportlab
pip install requests
pip install beautifulsoup4
pip install subprocess
```
Lancer le fichier main.py


## Optimisation

créer un fichier json avec la dernieres mise a jour des liens
recuperer les derniers liens pour eviter de reprendre tout les liens
creer une base de donnée pour stocker les liens