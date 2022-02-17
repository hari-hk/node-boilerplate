import cors from 'cors';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { TryDBConnect } from './config/db.config';
import './config/env.config.ts';
import { User } from './entity/User.entity';
import { logInfo } from './utils/logger';

const app: express.Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(cors()); // to support CORS

app.get('/', (req: Request, res: Response) => {
  res.sendFile('views/landing.html', { root: __dirname });
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    res.send(await User.getAllusers());
  } catch (e) {
    res.send(e);
  }
});
app.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.getUser(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (e) {
    res.send(e);
  }
});

app.post('/user', async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .send(await User.createUser(req.body.email, req.body.password));
  } catch (e) {
    res.send(e);
  }
});
app.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.deleteUser(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send({ error: 'User not found' });
  }
});
app.listen(PORT, async () => {
  await TryDBConnect(() => {
    throw new Error(`Database connection error, please try again later`);
  });
  logInfo(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
