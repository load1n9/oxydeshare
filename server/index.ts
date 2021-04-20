import { Server } from "socket.io";

const io: Server = new Server(8080, {
    cors: {
        origin: '*',
    }
});

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
        console.log(`code:${code} room: ${roomId}`)
        io.to(roomId).emit('newcode', {newCode: code})
        codedb[`${roomId}`] = code
    })
})