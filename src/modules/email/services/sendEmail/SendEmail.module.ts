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
        host: 'sandbox.smtp.mailtrap.io', //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: 587, // porta
        auth: {
          //dados do usuário e senha
          user: 'bee014123e1fb8',
          pass: '68a618cf9b8840',
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
