# Générateur de Sources

## Explication

Dans le but de recenser les sources et d'être utile aussi bien pour les développeurs que pour les gestionnaires.

Pour ce faire, nous avons développé plusieurs programmes qui permettent de recenser les sources d'un projet.

### Les fichiers Python

Vous avez un fichier (main.py)[./main.py] qui permet de lancer le programme.
Attention toutefois à :

- Ne pas dépasser 100 lignes de code dans les fichiers référencés -> risque de saturer la mémoire
- Ce fichier prend énormément de temps à s'exécuter

Il générera un fichier PDF nommé (data.pdf)[./data.pdf] qui contiendra toutes les sources de votre projet avec les logos, les liens et les titres des différentes pages.

#### Lancement

N'oubliez pas de lancer la commande qui permet d'installer les dépendances.

```shell
pip install -r requirements.txt
```

Ensuite, lancez le fichier main.py.

### L'interface web

Pour lancer l'interface web, il vous suffit de lancer le fichier (app.py)[./app.py].

Il se chargera d'installer les dépendances nécessaires au bon fonctionnement du programme via un `npm install`.

## Étapes suivantes

- Modifier la base de données du site web
- Se connecter avec différents comptes
- Implémentation des projets dans la base de données
