/* global console,require */
(function () {
    'use strict';

    var io = require('socket.io')(4000);

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