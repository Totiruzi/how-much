import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
    Due to e2e tests, we moved the cookie-session middleware and validation pipe to the AppModule.
  */
  // app.use(cookieSession({
  //   keys: ['falala']
  // }));
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  // }));
  await app.listen(3000);
}
bootstrap();
