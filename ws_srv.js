var http = require('http'), WebSocketServer = require('websocket').server, arr_conn = new Array(), arr_userinfo = new Array(), all_ready = false;

function snake()
{
	this.cube = 7,
	this.s1_x = this.s1_y = 7;
	this.ready = false;
	this.body  = new new Array([s1_x, s1_y], [s1_x += cube, s1_y], [s1_x += cube, s1_y], [s1_x += cube, s1_y]);
	this.color = '';
	this.speed = 210;
};

var server = http.createServer(function(request, response) {});
server.listen(8080, function() {});

// create the server
wsServer = new WebSocketServer({    httpServer: server    });

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
	arr_conn.push( connection);
	//arr_userinfo.push( new snake());
	console.log( "connected!")
	connection.sendUTF( "\n您已经与服务器建立了连接，准备好以后选择Ready开始游戏\n");
    connection.on('message', function(message) {
	console.log( message.utf8Data);
	for( var i = 0; i < arr_conn.length; ++i)
		arr_conn[i].sendUTF(message.utf8Data), all_ready &= arr_userinfo[i].ready;
    if (message.type == 'utf8') {
        // process WebSocket message
    }
    
    if( message.utf8Data )
    
   	if( message.utf8Data == 'ready' && all_ready)
   		setTimeout( timer_send, 500);

    });
    connection.on('close', function(connection) {
        // close user connection
    });
});

function timer_send()
{
   	for( var i = 0; i < arr_conn.length; ++i)
	    arr_conn[i].sendUTF(JSON.stringift( arr_userinfo[i]));	
}

