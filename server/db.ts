import * as pgPromise from "pg-promise";
const config = require('./config/config.json');
const pgp = pgPromise({});
const db = pgp(config.database);

export default db;