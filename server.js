//https://stackoverflow.com/questions/66732540/socket-io-cannot-read-property-emit-of-undefined
//https://www.youtube.com/watch?v=DvlyzDZDEq4
//https://peerjs.com/

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);
        // socket.to(roomId).broadcast.emit('user-connected', userId)


        // Automatich -> disconnect
        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
        })
    })
})

server.listen(3000);