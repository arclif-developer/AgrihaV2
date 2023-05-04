import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { registerDto } from '../auth/dto/auth.dto';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { register, registerDocument } from '../schemas/register.schema';

@Injectable()
export class MailService {
  constructor(
    private MailerService: MailerService,
    @InjectModel(register.name, 'AGRIHA_DB')
    private registerModel: Model<registerDocument>,
  ) {}

  // ============== send receipt and welcome mail helper /
  async welcomeMail(userDta: any) {
    try {
      this.MailerService.sendMail({
        to: userDta.email,
        from: 'noreply.arclif@gmail.com',
        subject: 'Welcome to Agriha.',
        template: './welcome.hbs',
        context: {
          name: userDta.name,
        },
      })
        .then((res) => {
          // console.log(res);
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async supportMail(registerDetails) {
    try {
      const date = moment().format('Do MMMM  YYYY');
      const day = moment().format('dddd');
      this.MailerService.sendMail({
        to: 'support.arclif@gmail.com',
        from: 'noreply.arclif@gmail.com',
        subject: 'New registeration',
        template: './newRegister.hbs',
        context: {
          name: registerDetails.name,
          email: registerDetails.email,
          phone: registerDetails.phone,
          role: registerDetails.role,
        },
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    } catch (error) {
      return error;
    }
  }

  async enquiryMail(enquiryDetails) {
    try {
      this.MailerService.sendMail({
        to: 'nikhil.arclif@gmail.com',
        from: 'noreply.arclif@gmail.com',
        subject: 'New Enquiry',
        template: './enquiry.hbs',
        context: {
          username: enquiryDetails.username,
          email: enquiryDetails.email,
          message: enquiryDetails.message,
          phone: enquiryDetails.phone,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, 'public', 'image', 'logo.png'),
            cid: 'logo',
          },
        ],
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    } catch (error) {}
  }

  async projectAdded_mail(projectDta, userDta) {
    try {
      this.MailerService.sendMail({
        to: userDta.registered_id.email,
        from: 'noreply.arclif@gmail.com',
        subject: 'Congratulation',
        template: './projectSuccess.hbs',
        context: {
          name: userDta.registered_id.name,
          projectId: projectDta.project_name,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, 'public', 'image', 'logo.png'),
            cid: 'logo',
          },
        ],
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async notification_mail(registerDta) {
    try {
      const userDta = await this.registerModel.find({});
      const date = moment().format('Do MMMM  YYYY');
      const day = moment().format('dddd');
      const emailList = [];
      await userDta.map((items) => {
        emailList.push({ name: items.name, address: items.email });
      });
      emailList.toString();
      this.MailerService.sendMail({
        to: emailList,
        from: 'noreply.arclif@gmail.com',
        subject: 'Congratulation',
        template: './notification.hbs',
        context: {
          date: date,
          day: day,
        },
      })
        .then((res) => {
          // console.log(res);
          // return res;
        })
        .catch((error) => {
          console.log(error);
          // throw new Error(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async quotationNotification(architectDta, projectDta, quote) {
    try {
      const mailList = [
        'support@arclif.com',
        'bdm@arclif.com',
        'arclifdeveloper.forbdm@gmail.com',
      ];
      const date = moment().format('Do MMMM  YYYY');
      const day = moment().format('dddd');
      this.MailerService.sendMail({
        to: mailList,
        from: 'noreply.arclif@gmail.com',
        subject: 'Architect Added new Quotes',
        template: './quotesNotificaton.hbs',
        context: {
          date: date,
          architectname: `${
            architectDta.registered_id
              ? architectDta.registered_id.name
              : architectDta.firstname + architectDta.lastname
          }`,
          projectcode: projectDta.project_name,
          amount: quote,
          location: projectDta.project_requirements[0].location,
          area: projectDta.project_requirements[0].area,
        },
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    } catch (error) {
      return error;
    }
  }
  async orderNotification(AdminNew_Orders, order_number) {
    try {
      let totalAmount = AdminNew_Orders.reduce((total, order) => {
        return total + order.amount;
      }, 0);
      const date = moment().format('Do MMMM  YYYY');
      const mailList = [
        'developer.arclif@gmail.com',
        'support@arclif.com',
        'arclifdeveloper.forbdm@gmail.com',
      ];
      this.MailerService.sendMail({
        to: mailList,
        from: 'noreply.arclif@gmail.com',
        subject: 'New order arrived',
        template: './orderNotification.hbs',
        context: {
          orders: AdminNew_Orders.map((order) => order.toJSON()),
          total: totalAmount.toFixed(2),
          order_number,
          date,
        },
      })
        .then((res) => {
          // console.log(res);
          // return res;
        })
        .catch((error) => {
          console.log(error);
          // throw new Error(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
