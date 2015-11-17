'use strict';
var socketio = require('socket.io');
var io = null;
var game = require('../game');

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', game.init);

    return io;
};