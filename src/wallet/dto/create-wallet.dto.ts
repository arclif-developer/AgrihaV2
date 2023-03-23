import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {}

export class purchaseWalletCoinDto {
  @ApiProperty({ example: 100, required: true })
  amount: string;
}
