import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import Express from 'express';

const server = Express();
// server.use(cors());
server.get('/health', (req, res) => res.send('ok'));

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('api/v1');
    await app.listen(3000);
}

bootstrap();
