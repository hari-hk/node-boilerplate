import express, { Request, Response } from 'express';
import { logger, loggerError, loggerInfo, loggerSuccess, loggerWarning } from './utils/logger';

const app = express();
const PORT = 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('success');
});

app.listen(PORT, () => {
    loggerInfo(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
