# Jeu de Tir Multijoueur

Ce jeu est un jeu de tir multijoueur où les joueurs s'affrontent sur une petite carte.

## Rules

  Vous contrôlez un personnage représenté par un cercle de couleur bleu et un petit cercle noir indiquant la direction dans laquelle vous regardez. Les adversaires eux, apparaîtront en rouge. Vous disposez de 3 points de vies, et vous pouvez tirer sur vos ennemies afin de les éliminer. Le but du jeu est donc de rester en vie tout en éliminant ses adversaires.

## Comment jouer

  Pour se déplacer sur la carte, il faut utliser les touches directionnelles du clavier. La touche espace sert à tirer dans la direction du curseur.
Sur la carte, vous pouvez rammassez des objets qui auront divers effets. Pour se faire, il suffit de macher dessus. Il existe un objet rendant 1 point de vie au joueur qui le rammasse, un autre rendant le joueur immunisé aux tirs pendant quelques secondes.
Marcher sur une vie en ayant toute sa vie n'aura aucun effet sur l'objet, celui ci ne sera pas rammassé. De même, marcher sur une immunité en étant déja invincible laissera l'objet par terre.

### Fonctions implémentées

* Création de la map
   * Génération des objets vie et immunité
* Personnage
    * Choix du pseudo
    * Affichage sur la carte.
    * Déplacement sur la carte et affichage de la direction.
    * Tir.
    * Rammassage des objets vies et immunité.
    * Collision avec les autres joueurs.
  
 * Côté multijoueur
    * Connexion simultanée de joueurs
    * Gestion de la connexion / deconnexion d'un joueur ( Apparition / Dispiration d'un joueur )
    * Renvoi les données à tous pour chaque action d'un client
    
 ### Idée de fonctions que l'on aurait pu implémenter avec plus de temps
 
  Une map contenant des obstacles et des graphismes ( avec des tilesets par exemple ) aurait été apprécié.
  D'autres objets afin d'améliorer le gameplay ( pourquoi pas un super Tir qui tirerai de tout les côtés pendant X secondes par exemple )
 Afficher la barre de vie en bas à gauche de l'écran.
  Instaurer un sytème de chargeur pour l'arme ( Par exemple 10 balles par chargeur et possibilité de recharger ) avec un nombre de balles limité et des caisses de munitions.
  
## Comment installer le jeu

Une fois avoir récuperer tout les fichiers, ouvrez un terminal et placez-vous dans le répertoire contenant les fichiers du jeu.
Lancez la commande node app.js, cela va démarrer le seveur. Ensuite, ouvrez un navigateur web, puis tapez dans le champ url : "localhost:8080".
Vous voila à présent sur le jeu, rentrez votre pseudo et jouez !

### Packages

* express 
* http
* socket.io

## Client VS Serveur

Nous possédons 3 fichiers, index.html, app.js et gameplay.js.
La page html ne contient que des fonctions réalisées côté client, et app.js ne contient que des fonctions réalisée côté serveur.
Gameplay.js contient des fonctions qui sont utilisées des deux côtés. Nous évitons au maximum d'exécuter du code du côté serveur afin d'éviter les ralentissements.

La map, les personnages présents sur le jeu ainsi que leur position sont stockés du côté du serveur. Le serveur envoi à chaque client ses données. Chaque fois qu'un client effectue une action ( tir, déplacement ), il envoit les nouvelles données au serveur via socket.io qui se chargera de modifier les informations et de les envoyés à tous les clients.
Le serveur ne s'occupe donc que de mémoriser les coordonnées de chaque joueur et des tirs, l'affichage se fait du côté client.
