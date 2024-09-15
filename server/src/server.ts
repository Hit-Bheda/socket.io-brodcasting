import { Server } from "socket.io";
import app from "./app";
import { infoLogger } from "./logger/logger";
import { createServer } from "http";

const port = 3000;

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

io.on('connection', (socket) => {
    infoLogger.info(`New client connected: ${socket.id}`);

    socket.on('message', (message) => {
        infoLogger.info(`Message received: ${message}`);
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        infoLogger.info(`Client disconnected: ${socket.id}`);
    })
})

server.listen(port, () => {
    infoLogger.info(`Server started on port ${port}`);
})