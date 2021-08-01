import express, { Request, Response } from 'express';
import "reflect-metadata";
import './config/env.config.ts';
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { loggerError, loggerInfo, loggerSuccess } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('success');
});

app.get('/users', (req: Request, res: Response) => {
    res.send('success');
});

app.listen(PORT, () => {
    console.log("Inserting a new user into the database...", JSON.stringify(process.env.DB_HOST));
    loggerInfo(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});


createConnection().then(async connection => {

    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    // console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    loggerInfo(`Loaded users: ${JSON.stringify(users)}`);
    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => loggerError(error));

