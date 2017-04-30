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
		map[x][y] = player;
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

module.exports.Life = function(map)
{
	var timerLife = setInterval(function(){
		do
		{
			var x = Math.floor(Math.random()*40);
			var y = Math.floor(Math.random()*20);
		}
		while(map[x][y] != 0);
		map[x][y]=2;
		clearInterval(timerLife);
	},3000);
}

function drawLife(x,y)
{
	ctx.beginPath();
	ctx.rect(20*x + 6, 20*y + 6, 8, 8);
	ctx.fillStyle="red";
	ctx.fill();
	ctx.fillStyle="black";
	ctx.stroke();
}

function drawPlayer(player){
	ctx.beginPath();
	ctx.arc(20*player.x + 10, 20*player.y + 10, 9, 0, 2*(Math.PI));
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

function Shot(x,y,direction)
{
	this.x=x;
	this.y=y;
	this.oldx=x;
	this.oldy=y;
	this.direction = direction;
}

function drawShot(shot)
{
	ctx.clearRect(20*shot.oldx + 5, 20*shot.oldy + 5, 10, 10);
	ctx.beginPath();
	ctx.fillStyle="black";
	ctx.arc(20*shot.x + 10, 20*shot.y + 10, 4, 0, 2*(Math.PI));
	ctx.fill();
}

function deleteShot(shot)
{
	ctx.clearRect(20*shot.x + 5, 20*shot.y + 5, 10, 10);
}

function moveShot(shot){
	var x=0,y=0;
	switch(shot.direction)
	{
		case 0: x=-1; break;
		case 1: y=-1; break;
		case 2: x=1; break;
		case 3: y=1; break;
		default: break;
	}
	var inter = setInterval(function(){
		if(!(shot.x + x < 0 || shot.x + x >= 40 || shot.y + y < 0 || shot.y + y >= 20))
		{
			if(dataL.map[shot.x + x][shot.y + y] == 0)
			{
				dataL.map[shot.x][shot.y] = 0;
				shot.oldx = shot.x;
				shot.oldy = shot.y;
				shot.x+=x;
				shot.y+=y;
				dataL.map[shot.x][shot.y] = 1;
				socket.emit('draw_shot',dataL.map,shot);
			}
			else if(dataL.map[shot.x + x][shot.y + y] instanceof Object)
			{
				dataL.map[shot.x][shot.y] = 0;
				socket.emit('delete_shot',dataL.map,shot);
				socket.emit('hit',dataL.map[shot.x + x][shot.y + y].id);
				clearInterval(inter);
			}
			else if(dataL.map[shot.x + x][shot.y + y] == 1)
			{
				dataL.map[shot.x][shot.y] = 0;
				dataL.map[shot.x + x][shot.y + y] = 0;
				socket.emit('delete_shot',dataL.map,shot);
				clearInterval(inter);
			}
		}
		else
		{
			dataL.map[shot.x][shot.y] = 0;
			socket.emit('delete_shot',dataL.map,shot);
			clearInterval(inter);
		}
		socket.emit('modify_map',dataL);
	},20);
};

function createShot(data)
{
	var x=0,y=0;
	switch(data.player.direction)
	{
		case 0: x=-1; break;
		case 1: y=-1; break;
		case 2: x=1; break;
		case 3: y=1; break;
	}
	if(!(data.player.x + x < 0 || data.player.x + x >= 40 || data.player.y + y < 0 || data.player.y + y >= 20))
	{
		if(data.map[data.player.x + x][data.player.y + y] == 0)
		{
			data.map[data.player.x + x][data.player.y + y] = 1;
			var shot = new Shot(data.player.x + x,data.player.y + y,data.player.direction);
			moveShot(shot);
		}
		else if(data.map[data.player.x + x][data.player.y + y] instanceof Object)
		{
			socket.emit('hit',data.map[data.player.x + x][data.player.y + y].id);
		}
		else if(data.map[data.player.x + x][data.player.y + y] == 1)
		{
			data.map[data.player.x + x][data.player.y + y] = 0;
		}
	}	
}
