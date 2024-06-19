import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(3000, () => {
    console.log('🚀 Server ready at: http://localhost:3000/graphql');
  });
}
bootstrap();