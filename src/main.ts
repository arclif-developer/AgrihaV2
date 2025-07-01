// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import expressip = require('express-ip');
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'Mailer', 'templates'), {
    prefix: '/templates',
  });
  app.useStaticAssets(join(__dirname, '..', 'Mailer', 'public', 'image'), {
    prefix: '/image',
  });

  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: false, forbidNonWhitelisted: false }),
  // );
  app.use(expressip().getIpInfoMiddleware);
  const config = new DocumentBuilder()
    .setTitle('AGRIHA SERVICE')
    .setDescription('API DOCUMENTATION')
    .setVersion('1.0')
    .addTag('API DOCUMENTATION')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log('Hello world listening on port', port);
  });
  "scripts": {
  "build": "tsc",        // or "vite build" or whatever your project uses
  "start": "node dist/main.js"
}

}
bootstrap();
