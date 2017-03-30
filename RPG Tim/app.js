var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/'));

io.sockets.on('connection', function(socket,player){
	socket.on('nouveau_player', function(player) {
        socket.player = player;
        //~ socket.broadcast.emit('nouveau_client', pseudo);
    });
	socket.on('mouvement',function(player1){
		socket.broadcast.emit('mouvement', player1);
	});
});

server.listen(8080);

