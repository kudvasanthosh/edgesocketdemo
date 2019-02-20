require('dotenv').config()
const http = require('http');
var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))
const server = http.createServer(app);
var index = fs.readFileSync(__dirname + '/index.html');
// Socket.io server listens to our app
var io = require('socket.io').listen(server);
const CLOUD_EVENT="door_open";
const eventList = require('./event-list.json');

io.on('connection', function(socket) {
    socket.on('clientmessage', function (data) {
        let message=data;
        socket.emit('logmessage', message);
        if(message.type==CLOUD_EVENT){
            socket.emit('message', message);
        }
        request.post({
            headers: {'content-type' : 'application/json'},
            url:     process.env.CLOUD_URL+'/save-mesage',
            body:    JSON.stringify(message)
          }, function(error, response, body){
            console.log(body);
        }) 
    });
});

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

server.listen(3000);