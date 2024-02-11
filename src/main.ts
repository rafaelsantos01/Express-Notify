import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.BROKERS_KAFKA],
      },
      subscribe: { fromBeginning: true },
      consumer: { groupId: 'express_notify' },
    },
  });

  //app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
