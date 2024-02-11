import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendEmailModule } from './modules/email/services/sendEmail/SendEmail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    SendEmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
