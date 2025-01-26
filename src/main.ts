import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS ayarları güncellendi
  app.enableCors({
    origin: [
      'https://lumflights-client.vercel.app',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  // Port ayarı process.env.PORT'tan gelecek şekilde güncellendi
  await app.listen(process.env.PORT || 3001);
}
bootstrap(); 