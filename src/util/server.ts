import express from 'express';
import routes from '../routes';
import path from 'path';
import cors from 'cors';
import { deserializeUser } from '../middleware/deserializeUser';
function createServer() {
  const app = express();
  app.use(
    cors({
      origin: '*',
      methods: 'GET,PATCH,POST,DELETE',
    })
  );
  app.use(express.static(path.join(__dirname, '..', 'images')));
  app.use(express.static(path.join(__dirname, '..', 'data')));
  app.use(express.json());
  app.use(deserializeUser);
  routes(app);

  return app;
}
export default createServer;
