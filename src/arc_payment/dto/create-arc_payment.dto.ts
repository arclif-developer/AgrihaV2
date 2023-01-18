import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsJWT,
  isNotEmpty,
  IsNumber,
  IsEnum,
  IsPhoneNumber,
  Min,
  IsOptional,
  IsArray,
  IsObject,
} from 'class-validator';

export class CreateArcPaymentDto {
  architect_id: any;

  mode_of_payment: string; //online or cash on hand

  type_of_transaction: string; //gpay,UPI id,QR,Account details

  details: []; //description
}
