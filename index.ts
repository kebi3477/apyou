import ChatServer from './server';
import * as express from 'express';
import db from './server/db';

let app = new ChatServer().getApp();

app.use(express.static(__dirname + '/public'));
db.one("SELECT * FROM users");

export default app;