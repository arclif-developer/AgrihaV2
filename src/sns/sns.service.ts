import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class SnsService {
  constructor(public twilioService: TwilioService) {}
  async SmsNotification(msg) {
    try {
      const numbers = ['+919747045972'];
      numbers.forEach(async (items) => {
        const response = await this.twilioService.client.messages.create({
          body: msg,
          from: process.env.TWILIO_NUMBER,
          to: `${items}`,
        });
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async whatsAppNotification() {
    try {
      const response = await this.twilioService.client.messages.create({
        from: `whatsapp:${process.env.TWILIO_NUMBER}`,
        body: 'Hello world!',
        to: `whatsapp:+919747045972`,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
