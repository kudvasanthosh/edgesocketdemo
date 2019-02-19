var http = require('http');
var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// NEVER use a Sync function except at start-up!
var index = fs.readFileSync(__dirname + '/index.html');
// Send index.html to all requests
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))
const server = http.createServer(app);

// Socket.io server listens to our app
var io = require('socket.io').listen(server);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
});
app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

server.listen(3000);