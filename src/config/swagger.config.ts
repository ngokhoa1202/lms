import path from 'path';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Learning management system API',
      version: '0.0.1',
      description: 'Typescript Swagger API for a LMS'
    }
  },
  apis: [path.resolve(process.cwd(), 'src', 'routes', '*.ts')]
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);


