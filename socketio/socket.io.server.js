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
        var name;
        var object = { 
            name: {},
            cardId: data
        }

        if (data == "BDB27BCC") {
            object['name'].th = "แมน";
            object['name'].en = "Man";
        }
        else if (data == "A5B5522F") {
            object['name'].th = "Nat";
            object['name'].en = "Nat";
        }
        else {
            object['name'].th = "none";
            object['name'].en = "none";

        }

        io.sockets.emit('rfid-read', object);
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