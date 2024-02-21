import subprocess
import os

# Obtenir le chemin complet du répertoire courant
current_path = os.getcwd()

# Définir les commandes pour démarrer les services front et back
front_cmd = 'start bash -c "cd source-generator && npm i && npm start"'
back_cmd = 'start bash -c "cd backend && npm i && npm start"'

# Lancer les terminaux pour exécuter les services
front = subprocess.Popen(front_cmd, shell=True)
back = subprocess.Popen(back_cmd, shell=True)