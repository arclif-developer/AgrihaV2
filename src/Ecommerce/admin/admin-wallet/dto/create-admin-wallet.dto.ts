import { IsNumber, IsString } from 'class-validator';

export class CreateAdminWalletDto {
  @IsNumber()
  balance: number;

  @IsString()
  role: string;
}
