import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class SnsService {
  constructor(public twilioService: TwilioService) {}
  async SmsNotification(msg) {
    try {
      const numbers = ['+919747045972', '+917356550501', '+918089462122'];
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
}
