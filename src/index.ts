import cors from 'cors';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { TryDBConnect } from './config/db.config';
import './config/env.config.ts';
import { logInfo } from './utils/logger';

const app: express.Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(cors());


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

app.listen(PORT, () => {
    logInfo(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});