import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { SnsService } from './sns.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TwilioModule.forRoot({
      accountSid: process.env.ACCOUNTSID,
      authToken: process.env.AUTHTOKEN,
    }),
  ],

  providers: [SnsService],
  exports: [SnsService],
})
export class SnsModule {}
