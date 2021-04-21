import { Server } from "socket.io";
import express from "express";
import path from "path";
import * as http from "http";

const app: any = express();

app.use(express.static(path.join(__dirname, 'public/dist')));

app.get('*', (req:any,res:any) =>{
    res.sendFile(path.join(__dirname+'/public/dist/index.html'));
});


const server: any = http.createServer(app);

const io: Server = new Server(server, {
    cors: {
        origin: '*',
    }
});

server.listen(process.env.PORT || 8080, () => {
    console.log("Running server on port %s", process.env.PORT || 8080);
})


let codedb:any = {

}

io.on('connect', (socket: any) => {
    socket.on('join', ({roomId}:any) => {
        socket.join(roomId);
        if (codedb[`${roomId}`]) {
            socket.emit('init', codedb[`${roomId}`])
        } else {
            codedb[`${roomId}`] = ''
        }
    })

    socket.on('changecode', ({code,roomId}:any) => {
        io.to(roomId).emit('newcode', {newCode: code})
        codedb[`${roomId}`] = code
    })
})