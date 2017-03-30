var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/'));

function Player()
{
	this.x;
	this.y;
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
		socket.broadcast.emit('ma position_pour_autres',player);
		//~ socket.broadcast.emit('ma position');
	});
	socket.on('action',function(data){
		player.x = data.x;
		player.y = data.y;
		socket.player = player;
		Object.keys(io.sockets.sockets).forEach(function(id){
			socket.emit('ma_position',player);
			socket.broadcast.emit('ma position_pour_autres',player);
		});
	});
});

server.listen(8080);

