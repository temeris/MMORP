var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/'));

function Player(x,y)
{
	this.x=x;
	this.y=y;
};

io.sockets.on('connection', function(socket){
	var player = new Player(10,10);
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
	});
	socket.on('move',function(data){
		player.x = data.x;
		player.y = data.y;
		socket.player = player;
		io.emit('ask_update');
	});
	socket.on('send_update',function(){
		io.emit('update_position',socket.player);
	});
	
});

server.listen(8080);

