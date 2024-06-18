# Utiliser l'image officielle Node.js comme image de base
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le contenu du projet dans le répertoire de travail
COPY . .

# Compiler le projet NestJS
RUN npm run build

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
