import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetCurrentUserById } from '../utils';
import { DeviceIp } from './auth.model';
import { AuthService } from './auth.service';
import { DeviceAndip } from './deviceandip.decorator';
import {
  AdminLoginDto,
  architect_loginDto,
  GoogleDto,
  mobileLoginDto,
  registerDto,
  resentDto,
  verifyMobileDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/login')
  handleLogin(
    @Body() googleDto: GoogleDto,
    @DeviceAndip() DeviceAndip: DeviceIp,
  ) {
    return this.authService.googleLogin(googleDto, DeviceAndip);
  }

  @Post('register')
  register(
    @Body() registerDta: registerDto,
    @DeviceAndip() DeviceAndip: DeviceIp,
  ) {
    return this.authService.register(registerDta, DeviceAndip);
  }

  @Post('mobile_login')
  mobile_login(@Body() dta: mobileLoginDto) {
    return this.authService.mobileLogin(dta);
  }

  @Post('verify_login')
  @UseGuards(AuthGuard('jwt'))
  verifyLogin(
    @Body() verifyDta: verifyMobileDto,
    @Req() Jwtdta: Request,
    @DeviceAndip() DeviceAndip: DeviceIp,
  ) {
    return this.authService.veriyLogin(verifyDta, DeviceAndip, Jwtdta.user);
  }

  @Post('verify_mobile')
  @UseGuards(AuthGuard('jwt'))
  verify_register(
    @Body() verifyMobileDta: verifyMobileDto,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.authService.verify_register(verifyMobileDta, Jwtdata);
  }

  @Post('resent_otp')
  resent_otp(@Body() resent_dta: resentDto) {
    return this.authService.resent_otp(resent_dta);
  }

  @Post('admin_login')
  admin_login(@Body() admin_loginDto: AdminLoginDto) {
    return this.authService.architect_login(admin_loginDto);
  }

  @Post('generate_referralCode')
  generate_referralCode(@Body() generateCodeDto: any) {
    return this.authService.generateReferralCode(generateCodeDto);
  }
  @Get('referralDetails')
  getAllReferralDetails() {
    return this.authService.getAllReferralDetails();
  }
  @Get('testMail')
  testMail() {
    return this.authService.testMail();
  }
}
