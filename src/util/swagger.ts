import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import log from './logger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Graduation Project',
      description: 'This document demonstrates the server APIs and how to send/receive data from them.',
      version,
      contact: {
        name: 'Laith Al-Helwany',
        email: 'laith.helwany@gmail.com',
        url: 'https://www.fb.com/laithhelwany',
        'x-phone': '00963934189422',
      },
    },
    servers:[{
      url: 'https://tajwal2.herokuapp.com',
      description: 'Online Production Server',
    },
    {
      url: 'https://localhost:1337',
      description: 'For local development',
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'User', description: 'User Related Endpoints' },
      { name: 'Business', description: 'Business Related Endpoints' },
      { name: 'BusinessType', description: 'BusinessType Related Endpoints' },
      { name: 'Categories', description: 'Category Related Endpoints' },
      { name: 'Comment', description: 'Comment Related Endpoints' },
      { name: 'Complain', description: 'Complain Related Endpoints' },
      { name: 'Follow', description: 'Follow Related Endpoints' },
      { name: 'Product', description: 'Product Related Endpoints' },
      { name: 'Rate', description: 'Rate Related Endpoints' },
      { name: 'Session', description: 'Session Related Endpoints' },
    ],
    schemes: ['https'],
  },
  apis: ['./src/router/*.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  log.info(`Docs available at http://localhost:${port}/docs`);

  //docs in json fromat
}
export default swaggerDocs;
