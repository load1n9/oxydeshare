"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http = __importStar(require("http"));
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public/dist')));
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/public/dist/index.html'));
});
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
server.listen(process.env.PORT || 8080, function () {
    console.log("Running server on port %s", process.env.PORT || 8080);
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
        io.to(roomId).emit('newcode', { newCode: code });
        codedb["" + roomId] = code;
    });
});
