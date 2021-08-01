import cors from 'cors';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { TryDBConnect } from './config/db.config';
import './config/env.config.ts';
import { User } from './entity/User';
import { logger, logInfo } from './utils/logger';

const app: express.Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies

app.use(cors()); // to support CORS

app.use(async (req: Request, res: Response, next) => {
    await TryDBConnect(() => {
        res.json({
            error: 'Database connection error, please try again later',
        });
    }, next);
});

app.get('/', (req: Request, res: Response) => {
    res.send('success')
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        res.send(await User.getAllusers());
    } catch (e) {
        res.send(e)
    }
});


app.post('/user', async (req: Request, res: Response) => {
    try {
        await res.status(200).send(await User.createUser(req.body.email, req.body.password));
    } catch (e) {
        await res.send(e)
    }
});
app.listen(PORT, () => {
    logInfo(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});