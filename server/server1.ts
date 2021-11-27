import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';

export class ChatServer {
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: socketIO.Server;
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

    private createServer(): void {
        this.server = createServer(this.app);
    } 

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private sockets(): void {
        this.io = socketIO(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log(`Running Server on port ${this.port}`);
        });

        this.io.on('connect', (socket: any) => {
            console.log(`Connected client on port ${this.port}`);
            socket.on('message', (msg: Message) => {
                console.log(`[server](message): ${JSON.stringify(msg)}`)
                this.io.emit('message', msg);
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            })
        })
    }

    public getApp(): express.Application {
        return this.app;
    }
}