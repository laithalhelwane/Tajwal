/* -------------------------------------------------------------------------- */
/*                                   imports                                  */
/* -------------------------------------------------------------------------- */
import { Express, Request, Response, NextFunction } from 'express';
import userRouter from './router/user.router';
import sessionRouter from './router/session.router';
import healthcheck from './router/health.router';
import businessTypeRouter from './router/businessType.router';
import businessRouter from './router/business.router';
import categoryRouter from './router/category.router';
import productRouter from './router/products.router';
import complainRouter from './router/complain.router';
import commentRouter from './router/comment.router';
import followRouter from './router/follow.router';
import rateRouter from './router/rate.router';
import likeRouter from './router/like.router';
import typeRouter from './router/type.router';
import sizeRouter from './router/size.router';
import recommandationRouter from './router/recommandation.router';
import pImageRouter from './router/pimage.router';
import errorLogger from './middleware/errorLogger';
/* -------------------------------------------------------------------------- */
/*                               Initialize App                               */
/* -------------------------------------------------------------------------- */

function routes(app: Express) {
  app.use(typeRouter);
  app.use(likeRouter);
  app.use(rateRouter);
  app.use(followRouter);
  app.use(commentRouter);
  app.use(complainRouter);
  app.use(productRouter);
  app.use(categoryRouter);
  app.use(businessRouter);
  app.use(businessTypeRouter);
  app.use(userRouter);
  app.use(sessionRouter);
  app.use(sizeRouter);
  app.use(healthcheck);
  app.use(recommandationRouter);
  app.use(pImageRouter);
  app.use(errorLogger);
  // app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  //   console.log('This is the rejected field ->', error.field);
  //   return res.send()
  // });
}
export default routes;
