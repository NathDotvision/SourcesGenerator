# Sources Generator

If you dont speach french, you find the language versions of this file [here](./Version_README/index.md)

## Explication

Dans le but de resencée les sources et d'etre purement utile que ça soit pour les developeurs ou même pour les manageurs.

Pour ce faire nous avons devellopé plusieurs programme qui permet de resencée les sources d'un projet.

### Les fichiers python

Vous avez un fichier (main.py)[./main.py] qui permet de lancer le programme.
Attention tout de meme à :

- ne pas mettre dans e fichiers de reference plus de 100 lignes de sources -> risque de saturé la mémoire
- celui ci est sacrement long à executer

Il vous genérera un fichiers pdf nomé (data.pdf)[./data.pdf] qui contiendra toutes les sources de votre projet avec les logo ainsi que les liens et titres des différentes pages.

#### Lancement

Ne pas oublier de lancer la commandes qui permet d'intaller les dependances.

```shell
pip install -r requirements.txt
```

Lancer le fichier main.py

### L'interface web

Pour lancer l'interface web il vous suffit de lancer le fichier (app.py)[./app.py]

Il se chargera d'intaller les dependances necessaire pour le bon fonctionnement du programme.
A travers un `npm install`

## Etape suivant

- modify database into the website
- log in different account
- implementation of projects in database
- warning attention
- creer nouvel page en pdf bug
- bug de l'import du json
- export all tout type d'exportation

WARNING in [eslint]
src\pages\Home.jsx
Line 7:10: 'Links' is defined but never used

no-unused-vars
Line 17:11: 'json' is assigned a value but never used
