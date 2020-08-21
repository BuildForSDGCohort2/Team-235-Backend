import dotenv from "dotenv";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle("Andela Cohort Team 235")
  .setDescription("API Documentation For The Soon To Be Decided Project.")
  .setVersion("1.0")
  .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3000);
}
bootstrap();
