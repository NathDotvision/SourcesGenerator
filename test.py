import subprocess

def git_diff():
    try:
        # Exécuter la commande git diff
        result = subprocess.run(["git", "diff"], capture_output=True, text=True, check=True)

        # Afficher la sortie de la commande git diff
        return result.stdout

    except subprocess.CalledProcessError as e:
        # Gérer les erreurs si la commande échoue
        print(f"Erreur lors de l'exécution de git diff : {e.stderr}")

# Appeler la fonction git_diff
data = git_diff().splitlines()
print(data)