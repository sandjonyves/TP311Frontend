<h1 align="center">TP 331  Dockerisé</h1>

<!-- ![Demo App](/public/screenshot-for-readme-1.png)
![Demo App](/public/screenshot-for-readme-2.png)
![Demo App](/public/screenshot-for-readme-3.png) -->


### it is an application for generating school cards : 

-   React
-   Tailwind CSS
-   Recharts
-   Framer Motion

It is completely responsive and can be used for any type of web application.



## Table des matières

- [Pré-requis](#pré-requis)

- [Installation](#installation)

- [Dockerfile ](#dockerfile)

- [Instructions](#instructions)

  - [Construire l'image Docker](#construire-limage-docker)

  - [Lancer le conteneur](#lancer-le-conteneur)







# Writing the complete README.md content to a file



readme_complete_content = """





Ce projet est une application React, dockerisée pour une configuration et un déploiement simples. Le projet utilise Docker pour garantir une installation et un environnement d'exécution cohérents sur toutes les machines.





<!-- - [Structure du Projet](#structure-du-projet)

- [Scripts Disponibles](#scripts-disponibles)

- [Contribuer](#contribuer) -->

- [Licence](#licence)



## Pré-requis



Assurez-vous que vous avez installé Docker sur votre machine. Vous pouvez télécharger Docker depuis [le site officiel de Docker](https://www.docker.com/).



## Installation



1. **Cloner le dépôt :**

   Clonez ce projet dans un répertoire local :

   ```bash

   git clone https://github.com/votre-utilisateur/votre-projet.git

   cd votre-projet


### Run this app locally

```shell
npm install
```

```shell
npm run dev
```


## instructions

## Construire l'image Docker
```shell
docker build -t nom-de-l-image .
```
## lancer-le-conteneur  
```shell
docker run -d -p 3000:3000 nom-de-l-image
```


## dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
