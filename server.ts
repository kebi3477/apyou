import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
const socketList = [];

export default class ChatServer {
    public static readonly PORT:number = 4000;
    private app: express.Application;
    private server: any;
    private io: Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    } 

    private sockets(): void {
        this.io = new Server(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, function() {
            console.log(`Server is running in ${this.port}`);
        })

        this.io.on('connection', (socket: any) => {
            socketList.push(socket);
            console.log(`User Join`);

            socket.on('send', (msg: String) => {
                socketList.forEach((item, i) => {
                    console.log(item.id);
                    if(item != socket) {
                        item.emit('send', msg);
                    }
                })
            })

            socket.on('disconnect', function() {
                socketList.splice(socketList.indexOf(socket), 1);
            })
        })
    }

    public getApp(): express.Application {
        return this.app;
    }
}