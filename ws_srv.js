var WebSocketServer = require('websocket').server;
var arr_conn = new Array();
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(8080, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
	arr_conn.push( connection);
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
    	console.log( message.utf8Data);
    	connection.sendUTF(message.utf8Data);
    	for( var i = 0; i < arr_conn.length; ++i)
    		arr_conn[i].sendUTF(message.utf8Data);
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});