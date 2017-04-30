var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    
app.use(express.static(__dirname + '/'));

var modules = require("./gameplay.js");

var map = new modules.Map();

var allClients = [];
var immunities = [];

var objects;
//~ modules.Immunity(map);
modules.Life(map);

io.sockets.on('connection', function(socket){
	allClients.push(socket);
	var player = modules.placerPlayer(map);
	player.id=socket.id;
	socket.player = player;
	
	socket.emit('launch',{map,player});
	
	socket.on('reponse',function(playerL){
		player = playerL;
		socket.player = player;
		io.emit('update_screen',player);
	});
	
	socket.on('move',function(data){
		player = data.player;
		socket.player = player;
		map = data.map;
		io.emit('update_map',map);
		io.emit('update_screen',player);
	});
	
	socket.on('update_player',function(data){
		player = data.player;
		socket.player = player;
	});
	
	socket.on('draw_shot',function(mapL,shot){
		map = mapL;
		io.emit('show_shot',shot);
	});
	
	socket.on('player_dead',function(){
		map[player.x][player.y] = 0;
		io.emit('delete_player_from_screen',map,player);
		player = null;
		socket.player = null;
		socket.emit('delete_player_dataL');
	});
	
	socket.on('delete_shot',function(mapL,shot){
		map = mapL;
		io.emit('erase_shot',shot);
	});
	
	socket.on('hit',function(id){
		socket.broadcast.to(id).emit('hit_player');
	});
	
	socket.on('send_update',function(){
		socket.emit('update_my_position',socket.player);
		socket.broadcast.emit('update_my_position_for_others',socket.player);
	});
	
	socket.on('disconnect', function(){
		if(player)
		{
			map[player.x][player.y]=0;
			socket.broadcast.emit('delete_player',map,player);
		}
		var i = allClients.indexOf(socket);
		allClients.splice(i,1);
	});
});

server.listen(8080);

