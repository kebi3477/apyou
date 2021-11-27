const express = require('express');
const socket = require('socket.io');
// const upload = require('./multer');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const socketList = [];

app.set('port', process.env.PORT || 4000);

app.use(express.static(__dirname + '/public'));

server.listen(4000, function() {
    console.log("Server is running...");
})

io.on('connection', function(socket) {
    socketList.push(socket);
    console.log(`User Join`);

    socket.on('send', function(msg) {
        socketList.forEach((item, i) => {
            console.log(item.id);
            if(item != socket) {
                item.emit('send', msg);
            }
        })
    })

    socket.on('disconnect', function() {
        socketList.splice(socketList.indexOf(socket), 1);
    })
})