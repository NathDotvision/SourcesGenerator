import subprocess
import os

def start_services():
    """
    Start the front and back services.

    This function changes the current working directory to the appropriate location
    and launches the terminals to execute the services.

    Args:
        None

    Returns:
        None
    """
    # Obtenir le chemin complet du répertoire courant
    current_path = os.getcwd()
    # if current_path != "d:/SourcesGenerator/app.py":
    #     # ce deplace dans le répertoire du fichier app.py
    #     os.chdir("c:/SourcesGenerator")

    # Définir les commandes pour démarrer les services front et back
    front_cmd = 'start bash -c "cd source-generator && npm i && npm start"'
    back_cmd = 'start bash -c "cd backend && npm i && npm start"'

    # Lancer les terminaux pour exécuter les services
    front = subprocess.Popen(front_cmd, shell=True)
    back = subprocess.Popen(back_cmd, shell=True)
