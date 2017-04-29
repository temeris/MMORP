var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    
app.use(express.static(__dirname + '/'));

var modules = require("./gameplay.js");

var map = new modules.Map();

var allClients = [];
var tires = [];
var immune = [];

io.sockets.on('connection', function(socket){
	allClients.push(socket);
	var player = modules.placerPlayer(map);
	
	socket.emit('lancement',{map,player});
	
	socket.on('reponse',function(playerL){
		player = playerL;
		socket.player = player;
		io.emit('update_screen',player);
	});
	
	socket.on('move',function(data){
		player = data.player;
		socket.player = player;
		map = data.map;
		for(i=0;i<40;i++)
		{
			for(j=0;j<20;j++)
			{
				if(map[i][j] != 0)console.log('serveur : i:',i,'j:',j);
			}
		}
		io.emit('update_data',map);
		io.emit('update_screen',player);
	});
	
	socket.on('send_update',function(){
		socket.emit('update_my_position',socket.player);
		socket.broadcast.emit('update_my_position_for_others',socket.player);
	});
	
	socket.on('disconnect', function(){
		console.log('Deconnexion');
		map[socket.player.x][socket.player.y]=0;
		socket.broadcast.emit('delete_player',map,socket.player);
		var i = allClients.indexOf(socket);
		allClients.splice(i,1);
	});
});

server.listen(8080);

