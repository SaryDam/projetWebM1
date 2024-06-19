# Utiliser l'image officielle Node.js 16 comme image de base
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le contenu du projet dans le répertoire de travail
COPY . .

# Construire le projet React
RUN npm run build

# Installer un serveur statique pour servir les fichiers construits
RUN npm install -g serve

# Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Définir la commande pour démarrer l'application
CMD ["serve", "-s", "build"]
