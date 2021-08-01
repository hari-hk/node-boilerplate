import express, { Request, Response } from 'express';
import './config/config.ts';
import { loggerInfo, loggerSuccess } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('success');
});

app.listen(PORT, () => {
    loggerInfo(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
