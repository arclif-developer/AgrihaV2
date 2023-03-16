/* eslint-disable prefer-const */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as randomstring from 'randomstring';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import e from 'express';
import parsePhoneNumberFromString from 'libphonenumber-js';
import mongoose, { Connection, Model, ObjectId } from 'mongoose';
import {
  testRegister,
  testRegisterDocument,
} from '../schemas/testRegister.schema';
import { MailService } from '../Mailer/mailer.service';
import { OtpReason, Status, accessType } from '../models/Enums';
import { architects, architectsDocument } from '../schemas/architects.schema';
import {
  LoginSession,
  LoginSessionDocument,
} from '../schemas/login_session.schema';
import { Otp, otpDocument } from '../schemas/otp.schema';
import { register, registerDocument } from '../schemas/register.schema';
import { User, UserDocument } from '../schemas/userSchema';
import { DeviceIp } from './auth.model';
import {
  AdminLoginDto,
  architect_loginDto,
  GoogleDto,
  mobileLoginDto,
  registerDto,
  resentDto,
  verifyMobileDto,
} from './dto/auth.dto';
import { otpService } from './otpService';
import { Referral, ReferralDocument } from '../schemas/referral.schema';
import { business, businessDocument } from '../schemas/businessDetails.schema';
import { Wallet, WalletDocument } from '../schemas/wallet.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private otpService: otpService,
    @InjectModel(Otp.name, 'AGRIHA_DB') private otpModel: Model<otpDocument>,
    @InjectModel(register.name, 'AGRIHA_DB')
    private registerModel: Model<registerDocument>,
    @InjectModel(LoginSession.name, 'AGRIHA_DB')
    private sessionModel: Model<LoginSessionDocument>,
    @InjectModel(User.name, 'AGRIHA_DB') private userModel: Model<UserDocument>,
    @InjectModel(architects.name, 'AGRIHA_DB')
    private architectsModel: Model<architectsDocument>,
    @InjectModel(testRegister.name, 'AGRIHA_DB')
    private testRegisterModel: Model<testRegisterDocument>,
    @InjectModel(Referral.name, 'AGRIHA_DB')
    private referralModel: Model<ReferralDocument>,
    @InjectModel(business.name, 'AGRIHA_DB')
    private businessModel: Model<businessDocument>,
    private MailerService: MailService,
    @InjectModel(Wallet.name, 'AGRIHA_DB')
    private walletModel: Model<WalletDocument>,
  ) {}

  // User Registeration
  async register(registerDta: registerDto, deviceDta: DeviceIp) {
    try {
      const Isregistered = await this.registerModel.findOne({
        $and: [{ role: registerDta.role }, { phone: registerDta.phone }],
      });
      if (Isregistered?.status === true) {
        throw new ConflictException('Mobile number Already registered');
      } else if (Isregistered?.status === false) {
        throw new ConflictException('Please try resent otp option');
      }

      let register = {
        phone: registerDta.phone,
        email: registerDta.email,
        name: registerDta.name,
        role: registerDta.role,
        type: accessType.OTP,
      };

      // ADD NEW REGISTER DOCUMENT
      const saveDta = await this.registerModel.create(register);

      // ADD NEW REGISTERED USER LOGIN SESSION
      let session = {
        device: deviceDta.device,
        ip: deviceDta.ip,
        status: Status.ACTIVE,
        reason: OtpReason.REGISTRATION,
        user: saveDta._id,
      };
      this.sessionModel.create(session);

      // CHECK REFERRAL CODE IS VALID
      if (registerDta.referral_code) {
        const IsCode = await this.referralModel.findOne({
          referralCode: registerDta.referral_code,
        });
        let saveRef;
        if (IsCode) {
          const IsreferralUser = await this.referralModel.findOneAndUpdate(
            {
              owner: registerDta.referral_user,
            },
            { $push: { users: { registerId: saveDta._id } } },
          );
          if (!IsreferralUser) {
            saveRef = await this.referralModel.create({
              owner: registerDta.referral_user,
              users: { registerId: saveDta._id },
            });
            await IsCode.update({
              $push: { referredTo: registerDta.referral_user },
            });
          }
        }
      }

      // SENT OTP USING TWILIO
      const response = await this.otpService.TwiliosentOtp(registerDta.phone);
      if (response.status === 'pending') {
        const token = this.jwtService.sign(
          {
            phone: registerDta.phone,
            id: saveDta._id,
          },
          {
            expiresIn: '10m',
          },
        );
        return {
          status: 200,
          message: 'Otp send SuccessFully',
          otpToken: token,
        };
      } else {
        return { status: 401, error: response };
      }
      // }
    } catch (error) {
      return error;
    }
  }

  async verify_register(verifyDta: verifyMobileDto, jwtdata: any) {
    try {
      const id = new mongoose.Types.ObjectId(jwtdata.id);
      const IsregisterDta = await this.registerModel
        .findOne({
          _id: id,
        })
        .exec();
      let verifyOtp = await this.otpService.twilioVerifyOtp(
        verifyDta,
        jwtdata.phone,
      );
      if (verifyOtp.status === 'Otp Matched') {
        IsregisterDta.status = true;
        IsregisterDta.save();
        let responseDta;
        if (IsregisterDta.role == 'user' || IsregisterDta.role == 'general') {
          responseDta = await this.userModel.create({
            registered_id: IsregisterDta._id,
          });
          this.MailerService.welcomeMail(IsregisterDta);
        } else if (IsregisterDta.role == 'architect') {
          responseDta = await this.architectsModel.create({
            registered_id: IsregisterDta._id,
          });
          // this.MailerService.notification_mail(IsregisterDta);
        } else if (IsregisterDta.role === 'business') {
          responseDta = await this.userModel.create({
            registered_id: IsregisterDta._id,
          });
          this.walletModel.create({
            user_id: responseDta._id,
            balance: 1000,
          });
        } else if (IsregisterDta.role === 'contractor') {
          responseDta = await this.userModel.create({
            registered_id: IsregisterDta._id,
          });
          this.walletModel.create({
            user_id: responseDta._id,
            balance: 0,
          });
        }
        this.MailerService.supportMail(IsregisterDta);

        const token = this.jwtService.sign(
          {
            id: responseDta._id,
            role: IsregisterDta.role,
          },
          {
            expiresIn: '29d',
          },
        );
        // REFFERAL CODE DOCUMENT STATUS UPDATE
        await this.referralModel.updateOne(
          { 'users.registerId': IsregisterDta._id },
          { $set: { 'users.$.status': 'approved' } },
        );

        return {
          status: 200,
          message: `${IsregisterDta.role} registeration successfully`,
          role: IsregisterDta.role,
          id: responseDta._id,
          token: token,
        };
      }
    } catch (error) {
      return { status: 401, error: error };
    }
  }

  // User mobile login
  async mobileLogin(dta: mobileLoginDto) {
    try {
      const phone = parseInt(dta.phone);
      const Isphone = await this.registerModel
        .findOne({
          $and: [
            { role: dta.role },
            { phone: phone },
            { type: accessType.OTP },
          ],
        })
        .exec();

      if (Isphone?.status === true) {
        const response = await this.otpService.TwiliosentOtp(dta.phone);
        if (response.status === 'pending') {
          const token = this.jwtService.sign(
            {
              // internationNumber: true,
              reg_id: Isphone._id,
              phone: dta.phone,
              role: dta.role,
            },
            {
              expiresIn: '10m',
            },
          );
          return {
            status: 200,
            token: token,
          };
        }
        // }
      } else if (Isphone?.status === false) {
        throw new UnauthorizedException(
          'Registeration process is not correct.Please register correctly',
        );
      }
      if (!Isphone) {
        throw new NotFoundException('Not registered mobile number');
      }
    } catch (error) {
      return error;
    }
  }

  async veriyLogin(verifyDta: verifyMobileDto, DeviceAndip: DeviceIp, Jwtdta) {
    const Isregister = await this.registerModel.findOne({ _id: Jwtdta.reg_id });
    let userDta;
    if (
      Jwtdta.role == 'user' ||
      Jwtdta.role == 'general' ||
      Jwtdta.role == 'business' ||
      Jwtdta.role == 'contractor'
    ) {
      userDta = await this.userModel.findOne({ registered_id: Jwtdta.reg_id });
    } else if (Jwtdta.role == 'architect') {
      userDta = await this.architectsModel.findOne({
        registered_id: Jwtdta.reg_id,
      });
    }
    if (Isregister) {
      let verifyOtp;
      verifyOtp = await this.otpService.twilioVerifyOtp(
        verifyDta,
        Jwtdta.phone,
      );
      if (verifyOtp.status === 'Otp Matched') {
        let session: Partial<LoginSession>;
        let newSession: LoginSessionDocument;
        session = {
          device: DeviceAndip.device,
          ip: DeviceAndip.ip,
          status: Status.ACTIVE,
          reason: OtpReason.LOGIN,
          user: Isregister._id,
        };
        newSession = new this.sessionModel(session);
        newSession.save();
        const token = this.jwtService.sign(
          {
            id: userDta._id,
            role: Jwtdta.role,
          },
          {
            expiresIn: '29d',
          },
        );
        return {
          status: 200,
          message: `${Jwtdta.role} login successfully`,
          role: Jwtdta.role,
          id: userDta._id,
          token: token,
        };
      } else {
        return { status: 401, message: 'OTP miss match' };
      }
    }
  }

  // googleAuthentication
  async googleLogin(googleDto: GoogleDto, deviceDta: DeviceIp) {
    try {
      const IsRegister = await this.registerModel.findOne({
        $and: [{ type: accessType.GOOGLE }, { email: googleDto.email }],
      });
      if (IsRegister) {
        let userDta;
        if (googleDto.role == 'user') {
          userDta = await this.userModel.findOne({
            registered_id: IsRegister._id,
          });
        } else {
          userDta = await this.architectsModel.findOne({
            registered_id: IsRegister._id,
          });
        }
        let session: Partial<LoginSession>;
        let newSession: LoginSessionDocument;
        session = {
          device: deviceDta.device,
          ip: deviceDta.ip,
          status: Status.ACTIVE,
          reason: OtpReason.LOGIN,
          user: IsRegister._id,
        };
        newSession = new this.sessionModel(session);
        newSession.save();
        const token = this.jwtService.sign({
          id: userDta._id,
        });
        return {
          status: 200,
          message: `${googleDto.role} login successfully`,
          role: googleDto.role,
          id: userDta._id,
          token: token,
        };
      } else {
        let register: Partial<register>;
        let newRegister: registerDocument;
        register = {
          phone: null,
          email: googleDto.email,
          name: googleDto.name,
          role: googleDto.role,
          type: accessType.GOOGLE,
        };
        newRegister = new this.registerModel(register);
        const saveDta = await newRegister.save().catch((error) => {
          if (error.code === 11000) {
            throw new ConflictException('Phone number or email already exit');
          }
          throw new NotAcceptableException('Register Data could not be saved');
        });
        let session: Partial<LoginSession>;
        let newSession: LoginSessionDocument;
        session = {
          device: deviceDta.device,
          ip: deviceDta.ip,
          status: Status.ACTIVE,
          reason: OtpReason.REGISTRATION,
          user: saveDta._id,
        };
        newSession = new this.sessionModel(session);
        newSession.save();
        let responseDta;
        if (saveDta.role == 'user') {
          let user: Partial<User>;
          let newUser: UserDocument;
          user = {
            registered_id: saveDta._id,
            profile_pic: googleDto.profilePic,
          };
          newUser = new this.userModel(user);
          responseDta = await newUser.save();
          this.MailerService.welcomeMail(saveDta);
        } else if (saveDta.role == 'architect') {
          let architect: Partial<architects>;
          let newArchitect: architectsDocument;
          architect = {
            registered_id: saveDta._id,
            profilepic: googleDto.profilePic,
          };
          newArchitect = new this.architectsModel(architect);
          responseDta = await newArchitect.save();
          // this.MailerService.notification_mail(IsregisterDta);
        }
        this.MailerService.supportMail(saveDta);
        const token = this.jwtService.sign({
          id: responseDta._id,
        });
        return {
          status: 200,
          message: `${saveDta.role} registeration successfully`,
          role: saveDta.role,
          id: responseDta._id,
          token: token,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async resent_otp(resent_dta: resentDto) {
    try {
      const IsTry_registeration = await this.registerModel.findOne({
        $and: [{ phone: resent_dta.phone, role: resent_dta.role }],
      });
      if (IsTry_registeration.status === false) {
        const response = await this.otpService.TwiliosentOtp(resent_dta.phone);
        if (response.status === 'pending') {
          const token = this.jwtService.sign(
            {
              phone: resent_dta.phone,
              id: IsTry_registeration._id,
            },
            {
              expiresIn: '10m',
            },
          );
          return {
            status: 200,
            message: 'Otp send SuccessFully',
            otpToken: token,
          };
        } else {
          return { status: 401, error: response };
        }
      }
    } catch (error) {
      return error;
    }
  }

  architect_login(admin_loginDto: AdminLoginDto) {
    try {
      const username = 'ArclifAdmin';
      const password = 'Arclif@123';
      if (
        username === admin_loginDto.username &&
        password === admin_loginDto.password
      ) {
        const token = this.jwtService.sign(
          {
            secret: 'Agriha.arclif@123',
          },
          {
            expiresIn: '29d',
          },
        );
        return { status: 200, token: token };
      } else {
        throw new NotAcceptableException('Invalid username or password');
      }
    } catch (error) {
      return error;
    }
  }

  // Generate Referral code
  async generateReferralCode(generateCodeDTO: any) {
    try {
      // console.log(randomstring.generate(7));
      if (generateCodeDTO.owner) {
        const response = await this.referralModel.create({
          owner: generateCodeDTO.owner,
          referralCode: `ARCLIF-REF-${randomstring.generate(7)}`,
        });
        return { status: 200, data: response };
      }
    } catch (error) {
      return error;
    }
  }

  async getAllReferralDetails() {
    try {
      const resp_data = await this.referralModel
        .find({})
        .populate('users')
        .exec();
      return { status: 200, referralDetails: resp_data };
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }
}
