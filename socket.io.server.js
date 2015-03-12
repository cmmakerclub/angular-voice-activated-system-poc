/* global console,require */
(function () {
    'use strict';

    var io = require('socket.io')(4000);
    var rfid = require("./node-rfid/serial");


    rfid.connect();


    rfid.on("connect", function() {
      console.log("connection"); 
    });

    rfid.on("data", function(data) {
        console.log("DATA: ", data);
        io.sockets.emit('rfid-read', { cardId: data });
    });

    io.sockets.on('connection', function(socket) {
        console.info('client connected id:', socket.conn.id,
                    ' from:', socket.handshake.headers.origin);



        // var user;

        // socket.on('clear', function () {

        //     // socket.broadcast.emit('clear', {
        //     //     order: user.order
        //     // });
        // });
    });

    io.serveClient();


    console.log('Listening on 0.0.0.0:4000 ...');
})();