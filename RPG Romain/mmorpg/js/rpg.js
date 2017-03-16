var map = new Map("map1");

var joueur = new Personnage("perso1.png",7,14,DIRECTION.HAUT);
map.addPersonnage(joueur);
	
window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width  = map.getLargeur() * 32;
    canvas.height = map.getHauteur() * 32;
    
    // Gestion du clavier
	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;
		switch(key){
			case 38 :
				joueur.deplacer(DIRECTION.HAUT,map);
				break;
			case 37 :
				joueur.deplacer(DIRECTION.GAUCHE,map);
				break;
			case 40 :
				joueur.deplacer(DIRECTION.BAS,map);
				break;
			case 39 :
				joueur.deplacer(DIRECTION.DROITE,map);
				break;
			default :
				return true; // Si la touche ne sert pas, nous n'empechons pas son utilisation normale
		}
		return false; // false permet d'empecher que la touche pressée agisse sur la page
	}

    setInterval(function() {
    map.dessinerMap(ctx);
	}, 40);
}
