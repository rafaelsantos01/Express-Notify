import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RequestDTO } from './dto/SendEmailDTO';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEmailService {
  constructor(
    private mailerService: MailerService,

    @Inject('EMAIL_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async execute(data: RequestDTO, kafka?: false) {
    try {
      console.log('Sending email...');
      await this.mailerService.sendMail({
        to: process.env.EMAIL_SERVICE,
        from: data.email,
        subject: data.title,
        html: data.content,
      });

      return data;
    } catch (error) {
      if (kafka) {
        this.kafkaClient.emit(`${process.env.SEND_EMAIL_TOPIC_ERROR}`, {
          value: { data, error },
        });
      } else {
        return new Error(error.message);
      }
    }
  }
}
