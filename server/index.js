"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var io = new socket_io_1.Server(8080, {
    cors: {
        origin: '*',
    }
});
var codedb = {};
io.on('connect', function (socket) {
    socket.on('join', function (_a) {
        var roomId = _a.roomId;
        socket.join(roomId);
        if (codedb["" + roomId]) {
            socket.emit('init', codedb["" + roomId]);
        }
        else {
            codedb["" + roomId] = '';
        }
    });
    socket.on('changecode', function (_a) {
        var code = _a.code, roomId = _a.roomId;
        console.log("code:" + code + " room: " + roomId);
        io.to(roomId).emit('newcode', { newCode: code });
        codedb["" + roomId] = code;
    });
});
