import dotenv from "dotenv";
import { DataInitializer } from "./data-initializer";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await DataInitializer.init();
  await app.listen(process.env.PORT || 3000, String(process.env.HOST));
}
bootstrap();
