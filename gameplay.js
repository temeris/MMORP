var exports = module.exports = {};

module.exports.Map = function()
{
	var map = new Array;
	for(i=0;i<40;i++)
	{
		map[i]=new Array;
	}
	for(i=0;i<40;i++)
	{
		for(j=0;j<20;j++)
		{
			map[i][j]=0;
		}
	}
	return map;
}

module.exports.placerPlayer = function(map)
{
	if(map)
	{
		do
		{
			var x = Math.floor(Math.random()*40);
			var y = Math.floor(Math.random()*20);
		}
		while(map[x][y] != 0);
		var player = new Player(x,y);
		map[x][y] = 1;
		return player;
	}
}

function Player(x,y)
{
	this.x=x;
	this.y=y;
	this.oldx=x;
	this.oldy=y;
	this.direction=2; // ~ left:0; top:1; right:2; bottom:3;
	this.health=3;
	this.name="";
};

function Immunity()
{
	var immunities = new Array();
}

function drawPlayer(player){
	ctx.beginPath();
	ctx.arc(20*player.x + 10, 20*player.y + 10, 10, 0, 2*(Math.PI));
	ctx.fill();
	ctx.fillStyle="black";
	ctx.stroke();
	ctx.beginPath();
	if(player.direction == 0)
	{
		ctx.arc(20*player.x + 4, 20*player.y + 10, 4, 0, 2*(Math.PI));
	}
	else if(player.direction == 1)
	{
		ctx.arc(20*player.x + 10, 20*player.y + 4, 4, 0, 2*(Math.PI));
	}
	else if(player.direction == 2) 
	{
		ctx.arc(20*player.x + 16, 20*player.y + 10, 4, 0, 2*(Math.PI));
	}
	else if(player.direction == 3)
	{
		ctx.arc(20*player.x + 10, 20*player.y + 16, 4, 0, 2*(Math.PI));
	}
	ctx.fill();
};
	

function Tir(x,y,direction)
{
	this.x=x;
	this.y=y;
	this.direction = direction;
}

function moveTir()
{
	return;
}

//~ canvas.onclick = function(event)
//~ {
	//~ var data = getMousePos(canvas,event);
	//~ createTire(data);
//~ }

//~ function getMousePos(canvas, event)
//~ {
	//~ var rect = canvas.getBoundingClientRect();
	//~ return {
		//~ x: event.clientX - rect.left,
		//~ y: event.clientY - rect.top
	//~ };
//~ }
