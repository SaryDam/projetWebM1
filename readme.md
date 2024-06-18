## Groupe 7 :

- Creux Damien
- Kus Serhat
- Nelhome Lhukas
- Poveda Amaral Valentin


# Étude de Faisabilité

## Étude du Fonctionnement de NestJS

NestJS est un framework de développement côté serveur pour Node.js, construit avec TypeScript. Il utilise les concepts de la programmation orientée objet, la programmation fonctionnelle et la programmation réactive. Cette section offre une étude détaillée de son fonctionnement, son installation et son architecture modulaire.

### Fonctionnement de NestJS

NestJS repose sur plusieurs concepts clés :

- **Modules** : Ils sont des blocs de construction de l'application Nest. Un module est une classe annotée avec le décorateur `@Module()`.
- **Contrôleurs** : Ils gèrent les requêtes entrantes et renvoient des réponses aux clients. Annotés avec `@Controller()`.
- **Services** : Ils contiennent la logique métier et sont injectables via le décorateur `@Injectable()`.
- **Décorateurs** : Utilisés pour attacher des métadonnées aux classes et fonctions afin de définir les routes, modules, etc.

### Architecture Modulaire de NestJS

L'architecture de NestJS est fortement modulaire, permettant de diviser l'application en plusieurs modules réutilisables. Voici les principaux composants de cette architecture :

- **Modules** : Les modules permettent de regrouper les fonctionnalités liées. Par exemple, un module utilisateur peut contenir les contrôleurs, services, et autres éléments liés aux utilisateurs.
- **Contrôleurs** : Les contrôleurs définissent les routes et gèrent les requêtes HTTP.
- **Services** : Les services contiennent la logique métier et sont injectés dans les contrôleurs ou d'autres services.
- **Middleware** : Les middlewares sont des fonctions qui exécutent une logique avant que les requêtes ne soient traitées par les contrôleurs.

## Analyse de l'Intérêt d'Utiliser GraphQL pour le Développement d'une API

GraphQL est un langage de requête pour les API et un runtime pour exécuter ces requêtes sur vos données existantes. Voici une analyse de ses avantages et inconvénients.

### Avantages de GraphQL

- **Flexibilité des Requêtes** : GraphQL permet aux clients de spécifier exactement quelles données ils ont besoin, réduisant ainsi la surcharge des données renvoyées par le serveur.
- **Une Seule URL** : Contrairement à REST où chaque ressource a une URL distincte, avec GraphQL, une seule URL est utilisée pour toutes les requêtes.
- **Documentation Intégrée** : Les schémas GraphQL servent de documentation vivante et de point de départ pour les explorateurs de requêtes.
- **Évolutivité** : Il est plus facile d'ajouter de nouvelles fonctionnalités et champs sans casser les clients existants.

### Inconvénients de GraphQL

- **Complexité de la Mise en Œuvre** : La mise en place de GraphQL peut être plus complexe que REST, surtout pour les développeurs non familiers avec ce concept.
- **Problèmes de Performance** : Les requêtes trop flexibles peuvent conduire à des requêtes très complexes, impactant potentiellement les performances du serveur.
- **Sécurité** : Une attention particulière doit être portée à la sécurité, notamment pour éviter les requêtes non optimales ou malveillantes.
- **Overfetching et Underfetching** : Bien que GraphQL vise à résoudre ces problèmes, une mauvaise implémentation peut toujours conduire à des requêtes inefficaces.

# Redis

Redis est une base de données NoSQL en mémoire, souvent utilisée comme cache pour améliorer les performances des applications.

- **Vitesse** : Offre des temps de réponse extrêmement rapides grâce au stockage en mémoire.
- **Cache** : Réduit la charge sur la base de données principale en stockant les données fréquemment consultées.
- **Pub/Sub** : Supporte les mécanismes de publication/abonnement pour des notifications en temps réel.

## Avantages de l'Intégration

### 1. Performance Améliorée

- **Cache Efficace** : Utiliser Redis pour mettre en cache les réponses GraphQL améliore considérablement les temps de réponse et réduit la charge sur le serveur de base de données.
- **Requêtes Optimisées** : GraphQL permet de récupérer uniquement les données nécessaires, réduisant la bande passante et les temps de traitement.

### 2. Scalabilité et Flexibilité

- **Modularité de NestJS** : La structure modulaire de NestJS facilite l'extension et la maintenance de l'application.
- **Évolutivité de GraphQL** : Ajouter de nouvelles fonctionnalités sans casser les clients existants est simplifié avec GraphQL.
- **Support de Redis pour le Caching et le Pub/Sub** : Améliore la gestion des états et les notifications en temps réel.

### 3. Développement Simplifié

- **TypeScript et Décorateurs** : NestJS et GraphQL utilisent TypeScript, permettant de bénéficier de la typage statique, de l'auto-complétion et d'une meilleure documentation.
- **Documentation Intégrée de GraphQL** : Simplifie la collaboration entre les équipes front-end et back-end grâce à une documentation interactive.
- **Gestion des Sessions** : Redis peut être utilisé pour stocker des sessions utilisateur, améliorant ainsi la gestion des utilisateurs et les performances de l'application.
