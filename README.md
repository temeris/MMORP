# Jeu de Tir Multijoueur

Ce jeu est un jeu de tir multijoueur où les joueurs s'affrontent sur une petite carte.

## Rules

  Vous contrôlez un personnage représenté par un cercle de couleur bleu et un petit cercle noir indiquant la direction dans laquelle vous regardez. Les adversaires eux, apparaîtront en rouge. Vous disposez de 3 points de vies, et vous pouvez tirer sur vos ennemies afin de les éliminer. Le but du jeu est donc de rester en vie tout en éliminant ses adversaires.

## How to play

  Pour se déplacer sur la carte, il faut utliser les touches directionnelles du clavier. La touche espace sert à tirer dans la direction du curseur.
Sur la carte, vous pouvez rammassez des objets qui auront divers effets. Pour se faire, il suffit de macher dessus. Il existe un objet rendant 1 point de vie au joueur qui le rammasse, un autre rendant le joueur immunisé aux tirs pendant quelques secondes.
Marcher sur une vie en ayant toute sa vie n'aura aucun effet sur l'objet, celui ci ne sera pas rammassé. De même, marcher sur une immunité en étant déja invincible laissera l'objet par terre.

### Fonctions implémentées

1. Création de la map
  ..* Génération des objets vie et immunité

2. Personnage
  ..* Choix du pseudo
  ..* Affichage sur la carte.
  ..* Déplacement sur la carte et affichage de la direction.
  ..* Tir.
  ..* Rammassage des objets vies et immunité.
  ..* Collision avec les autres joueurs.
  
  3. Côté multijoueur
    ..* Connexion simultanée de joueurs
    ..* Gestion de la connexion / deconnexion d'un joueur ( Apparition / Dispiration d'un joueur )
    ..* Renvoi les données à tous pour chaque action d'un client
    
  ### Fonction
