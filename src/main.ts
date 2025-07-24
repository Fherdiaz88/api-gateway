import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Solo levantamos el servidor HTTP
  await app.listen(3000);
  console.log(`🚪 API Gateway escuchando en http://localhost:3000 con transporte ${process.env.TRANSPORT}`);
}
bootstrap();
