import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { transcode } from 'buffer';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

   const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);


  // await app.listen(process.env.PORT ?? 3001);
  await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();
