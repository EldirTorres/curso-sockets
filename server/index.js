/* Activando express */
var express = require('express');
var app = express();
var server = require('http').Server(app);
/* Ativando Socket.io */
var io = require('socket.io')(server);

/* Cargar html en express */
app.use(express.static('client'));

/* Creando servidor con express */
var port = 6677;
server.listen(port, function () {
    console.log(`Servidor esta funcionando en http://localhost:${port}`);
});

/* Ruta de prueba */
app.get('/prueba', function (req, res) {
    res.status(200).send('Prueba de ruta NodeJS');
});

var messages = [{
    id: 1,
    text: 'Bienvenido',
    nickname: 'Bot - Master JS'
}];

/* Abrir conexion al socket */
io.on('connection',function(socket){
    console.log(`El nodo con IP:  ${socket.handshake.address}  se ha conectado...`);
    socket.emit('messages', messages);

    /* Evento que se encarga de enviar al servidor los mensajes en tiempo real
    mientras el socket este abierto o mientras el server este corriendo */
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages); /* Se emiten a todos los usuarios del chat los mensajes */
    })
});