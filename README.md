# Projet P7 parcours Dev Web OpenClassrooms

## "Créez un réseau social d’entreprise"

### Procédure

1. Cloner le projet.
2. Créer une base de données MySQL selon les spécifications du fichier `groupomania_dump.sql`.
3. Créer un fichier `.env` à la racine du dossier `backend/`. Y renseigner les identifiants permettant d'accéder à la base de données sous la forme :   
    ```
    DB_HOST='votre_host'               // par défaut 'localhost'
    DB_USER='votre_identifiant' 
    DB_PASSWORD='votre_mot_de_passe'
    DB_NAME='nom_de_votre_base'        // par défaut 'groupomania'
    ```
4. Par défaut, le serveur est accessible sur le port 3002. Pour personnaliser le port :
   - dans le fichier `.env` créé en backend, ajouter la variable suivante :
    ```
    PORT='votre_port'
    ```
   - créer un fichier `.env` à la racine du dossier `frontend/` et y renseigner la variable suivante :
    ```
    REACT_APP_SERVER_PORT=votre_port
    ```
5. Ajouter une clé de cryptage au fichier `.env` du backend (série de caractères alphanumériques ou mots de passe):
    ```
    SECRET_KEY='votre_clé_de_cryptage_alphanumérique'
    ```
6. Depuis le terminal du dossier `backend/`, exécuter `npm install` puis `npm run build` et enfin `npm start`.
7. Depuis le terminal du dossier `frontend/`, exécuter `npm install` puis `npm run build` et enfin `npx serve -s build`.
8. L'appli est disponible sur `http://localhost:5000`.

***Note*** : l'attribution du rôle de super-administrateur à un utilisateur se fait en accédant directement à la table `users` et en donnant la valeur `2` à la colonne `admin` pour l'utilisateur concerné.