import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import Express from 'express';
// import expressListRoutes from 'express-list-routes'; // TODO to remove

const server = Express();
// server.use(cors());
server.get('/health', (req, res) => res.send('ok'));

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('api/v2');
    await app.listen(3000);

    // TODO to remove
    // const _server = app.getHttpServer();
    // const router = _server._events.request._router;
    // console.log(expressListRoutes({}, 'API:', router));
}

bootstrap();
