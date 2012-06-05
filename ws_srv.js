var http = require('http'), WebSocketServer = require('websocket').server, arr_conn = new Array(), arr_conn_ctrl = new Array(), all_ready = false, all_snake = new Array();

var server = http.createServer(function(request, response) {
});
server.listen(8080, function() {
});

var serverObj = http.createServer(function(request, response) {
});
serverObj.listen(8008, function() {
});

var step = 42, x = y = cube = 7, width = 420, height = 420, xx, yy;

function snake(x, y, direction) {
	this.body = new Array([x, y], [x + cube, y], [x + 2 * cube, y]), this.lastDir = this.current_key = direction;
	this.Move = function() {
		if(parseInt(this.current_key) < 38 || parseInt(this.current_key) > 40)
			return;

		if((this.current_key == "38" && this.lastDir == "40") || (this.current_key == "40" && this.lastDir == "38"))
			return;

		if((this.current_key == "37" && this.lastDir == "39") || (this.current_key == "39" && this.lastDir == "37"))
			return;
		console.log("curKey:" + this.current_key);
		console.log(this.body);
		if(this.current_key == '38')//up
			this.body.push([this.body[this.body.length - 1][0], this.body[this.body.length - 1][1] - cube]), this.lastDir = this.current_key;
		else if(this.current_key == '40')//down
			this.body.push([this.body[this.body.length - 1][0], this.body[this.body.length - 1][1] + cube]), this.lastDir = this.current_key;
		else if(this.current_key == '37')//left
			this.body.push([this.body[this.body.length - 1][0] - cube, this.body[this.body.length - 1][1]]), this.lastDir = this.current_key;
		else if(this.current_key == '39')//right
			this.body.push([this.body[this.body.length - 1][0] + cube, this.body[this.body.length - 1][1]]), this.lastDir = this.current_key;

		this.lastDir = this.current_key;
		if(this.body[this.body.length - 1][0] == xx && this.body[this.body.length - 1][1] == yy) {
			genFood();
		} else {
			this.body.shift();
		}
	}
}

// create the server
ws = new WebSocketServer({
	httpServer : server
});
wsObj = new WebSocketServer({
	httpServer : serverObj
});

function genFood() {
	while(IsDead( xx = Math.round((width / cube) * Math.random()) * cube, yy = Math.round((height / cube) * Math.random()) * cube));
}

function IsDead(head_x, head_y) {
	for(var i = 0; i < all_snake.length; ++i)
		for(var j = 0; j < all_snake[i].body.length - 1; ++j)
			if(head_x == all_snake[i].body[j][0] && head_y == all_snake[i].body[j][1])
				return true;
	return (head_x <= 0 || head_x >= width || head_y <= 0 || head_y >= height) ? true : false;
}

function send_draw_inf() {
	var sendContent = JSON.stringify(all_snake);
	console.log("send:" + sendContent);
	for(var i = 0; i < arr_conn_ctrl.length; ++i) {
		arr_conn_ctrl[i].sendUTF(sendContent);
		arr_conn_ctrl[i].sendUTF("f" + JSON.stringify(new Array([xx, yy])));
		all_snake[i].Move();
	}
	setTimeout(send_draw_inf, 700);
}

wsObj.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	arr_conn_ctrl.push(connection);
	all_snake.push(new snake(x, y += 42, 39));

	connection.on('close', function(connection) {
		// close user connection
		console.log("close");
	});

	connection.on('message', function(msg) {
		console.log('rcv ' + msg.utf8Data);
		for(var i = 0; i < all_snake.length; ++i)
			if(arr_conn_ctrl[i] == connection)
				all_snake[i].current_key = msg.utf8Data;
	});

	if(arr_conn_ctrl.length == 2) {
		genFood();
		//setTimeout( move_ctrl, 200);
		setTimeout(send_draw_inf, 700);
	}
});
// WebSocket server
ws.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	arr_conn.push(connection);
	//arr_userinfo.push( new snake());
	console.log("connected!")
	connection.sendUTF("\n您已经与服务器建立了连接，准备好以后选择Ready开始游戏\n");
	connection.on('message', function(message) {
		console.log(message.utf8Data);
		for(var i = 0; i < arr_conn.length; ++i)
			arr_conn[i].sendUTF(message.utf8Data), all_ready &= arr_userinfo[i].ready;
		if(message.type == 'utf8') {
			// process WebSocket message
		}

		if(message.utf8Data)

			if(message.utf8Data == 'ready' && all_ready)
				setTimeout(timer_send, 500);

	});
	connection.on('close', function(connection) {
		// close user connection
	});
});

function timer_send() {
	for(var i = 0; i < arr_conn.length; ++i)
		arr_conn[i].sendUTF(JSON.stringift(arr_userinfo[i]));
}

