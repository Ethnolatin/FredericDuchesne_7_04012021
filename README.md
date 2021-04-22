# Projet P7 parcours Dev Web OpenClassrooms

## "Créez un réseau social d’entreprise"

### Procédure

1. Cloner le projet.
2. Créer une base de données MySQL selon les spécifications du document `Structure bdd MySQL.pdf`.
3. Créer un fichier `.env` à la racine du dossier `backend/`. Y renseigner les identifiants permettant d'accéder à la base de données sous la forme :   
    `DB_USER = 'votre_identifiant'`   
    `DB_PASSWORD = 'votre_mot_de_passe'`
    Pour personnaliser le nom de la base, ajouter la variable :
    `DB_NAME = 'nom_de_votre_base'`
4. Par défaut, le serveur est lancé sur `localhost:3002`. Pour personnaliser le host et le port :
   - dans le fichier `.env` créé en backend, ajouter les variables suivantes :
    `DB_HOST = 'votre_host'`
    `DB_PORT = 'votre_port'`
   - créer un fichier `.env` à la racine du dossier `frontend/` et y renseigner les variables suivante :
    `REACT_APP_BACK_HOST = votre_host`
    `REACT_APP_BACK_PORT = votre_port`
5. Depuis le terminal du dossier `backend/`, exécuter `npm install` puis `npm start`.
6. Depuis le terminal du dossier `frontend/`, exécuter `npm install` puis `npm start` et enfin `serve -s build`.
7. L'appli est disponible sur `http://localhost:5000`.