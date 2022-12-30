import createServer from './util/server';
import connect from './util/connect';
import logger from './util/logger';
import swaggerDocs from './util/swagger';

const app = createServer();
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  logger.info(`listening on http://localhost:${PORT}`);
  await connect();
  swaggerDocs(app, Number(PORT));
});
