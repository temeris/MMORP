# OneLastManStanding.io

Ce jeu est un jeu de tir multijoueur où les joueurs s'affrontent sur une petite carte.

## But du Jeu

  Vous contrôlez un personnage représenté par un cercle de couleur bleu et un petit cercle noir indiquant la direction dans laquelle vous regardez. Les adversaires eux, apparaîtront en rouge. Vous disposez de 3 points de vies, et vous pouvez tirer sur vos ennemies afin de les éliminer. Le but du jeu est donc de rester en vie tout en éliminant ses adversaires.

## Comment jouer

  Pour se déplacer sur la carte, il faut utliser les touches directionnelles du clavier. La touche espace sert à tirer dans la direction du personnage.

### Fonctions implémentées

* Personnage
    * Choix du pseudo
    * Affichage sur la carte.
    * Déplacement sur la carte et affichage de la direction.
    * Tir.
    * Collision avec les autres joueurs.
    * Santé du joueur
  
 * Côté multijoueur
    * Connexion simultanée de joueurs
    * Gestion de la connexion / deconnexion d'un joueur ( Apparition / Disparition d'un joueur )
    * Renvoi les données à tous pour chaque action d'un client
    
 ### Idée de fonctions que l'on aurait pu implémenter avec plus de temps
 
  Une map contenant des obstacles et des graphismes ( avec des tilesets par exemple ) aurait été appréciée.
  Des objets afin d'améliorer le gameplay: vies, immunités ou encore balles qui tuent instantanément.
  Instaurer un sytème de chargeur pour l'arme ( Par exemple 10 balles par chargeur et possibilité de recharger ) avec un nombre de balles limitées et des caisses de munitions.
  
## Comment installer le jeu

Une fois après avoir récuperé tout les fichiers, ouvrez un terminal et placez-vous dans le répertoire contenant les fichiers du jeu.
Lancez la commande node app.js, cela va démarer le seveur. Ensuite, ouvrez un navigateur web, puis tapez dans le champ url : "localhost:8080".
Vous voila à présent sur le jeu, rentrez votre pseudo et jouez !

### Packages

* express 
* http
* socket.io

## Client VS Serveur

Nous possédons 4 fichiers, index.html, app.js, gameplay.js et test.css.
La page html ne contient que des fonctions réalisées côté client, et app.js ne contient que des fonctions réalisées côté serveur.
Gameplay.js contient des fonctions qui sont utilisées des deux côtés. Nous évitons au maximum d'exécuter du code du côté serveur afin d'éviter les ralentissements et de surcharger le serveur.

La map, les personnages présents sur le jeu ainsi que leur position sont stockés du côté du serveur. Le serveur envoie à chaque client ses données ainsi que la map. Chaque fois qu'un client effectue une action ( tir, déplacement ), il envoie les nouvelles données au serveur via socket.io qui se chargera de modifier les informations et de les envoyer à tous les clients.
Le serveur s'occupe alors de mémoriser toutes les informations reçu et de faire les liaisons entre les différents joueurs, l'affichage se fait du côté client.

## Sources
 http://www.demonixis.net/blog/un-micro-fps-en-javascript-avec-babylonjs/    
 https://www.w3schools.com/    
 https://socket.io/    
