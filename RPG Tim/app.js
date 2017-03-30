var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/'));

function Player()
{
	this.x;
	this.y;
	this.oldx;
	this.oldy;
	this.newx;
	this.newy;
	this.name;
};

io.sockets.on('connection', function(socket){
	var player = new Player();
	socket.emit('lancement', player);
	socket.on('reponse',function(player,ctx,canvas){
		socket.player = player;
		socket.ctx = ctx;
		socket.canvas = canvas;
	});
	socket.on('init_position_depart',function(player){
		player.x = 10;
		player.y = 10;
		socket.player = player;
		socket.emit('ma_position',player);
		socket.broadcast.emit('position_depart_players',player);
	});
	socket.on('action',function(data){
		player.x = data.x;
		player.y = data.y;
		socket.player = player;
		socket.emit('mouvement_pour_moi', player);
		socket.broadcast.emit('mouvement_pour_autres', player);
		io.sockets.clients().forEach(function (socket) { .. });
	});
});

server.listen(8080);

