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
5. Depuis le terminal du dossier `backend/`, exécuter `npm install` puis `npm run build` et enfin `npm start`.
6. Depuis le terminal du dossier `frontend/`, exécuter `npm install` puis `npm run build` et enfin `npx serve -s build`.
7. L'appli est disponible sur `http://localhost:5000`.