# Étape 1 : Utiliser une image Node.js de base pour la construction
FROM node:18 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans /app
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source de l'application dans /app
COPY . .

# Construire l'application Next.js
RUN npm run build

# Installer les navigateurs nécessaires pour Playwright
RUN npx playwright install --with-deps

# Étape 2 : Utiliser une image Node.js de base pour exécuter l'application
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de build dans /app
COPY --from=builder /app ./

# Installer les dépendances de production uniquement
RUN npm install --only=production

# Assurer que les navigateurs Playwright sont installés
RUN npx playwright install --with-deps

# Exposer le port sur lequel l'application sera accessible
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
