import { Module } from '@nestjs/common';
import { SendEmailController } from './SendEmail.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SendEmailService } from './SendEmail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_EMAIL,
        secure: false,
        port: process.env.PORT_EMAIL,
        auth: {
          user: process.env.USERNAME_EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: '"',
      },
    }),
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'express_notify',
            brokers: [process.env.BROKERS_KAFKA],
          },
        },
      },
    ]),
  ],
  controllers: [SendEmailController],
  providers: [SendEmailService],
})
export class SendEmailModule {}
