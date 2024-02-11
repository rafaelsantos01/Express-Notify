import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailService } from './SendEmail.service';
import { RequestDTO } from './dto/SendEmailDTO';

@Controller()
export class SendEmailController {
  constructor(private service: SendEmailService) {}

  @Post('/send/email')
  async handleSendEmail(@Body() data: RequestDTO) {
    const retorno = await this.service.execute(data);

    return retorno;
  }

  @MessagePattern(`${process.env.SEND_EMAIL_TOPIC}`)
  async handleSendEmail2(@Payload() data: RequestDTO) {
    await this.service.execute(data);
  }
}
