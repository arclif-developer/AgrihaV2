import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPaymentDto {
  @ApiProperty({ example: 'project_id', required: true })
  project_id: string;

  @ApiProperty({ example: 'payment_id', required: false })
  payment_id: string;

  @ApiProperty({ example: 'userid', required: false })
  creator: string;

  @ApiProperty({ example: 'pending', required: false })
  status: string;

  @ApiProperty({ example: 7845, required: false })
  total_amount: number;

  @ApiProperty({ example: 5000, required: false })
  balance: Number;

  @ApiProperty({ example: 5000, required: false })
  amount_tobe_paid: Number;

  @ApiProperty({ example: 'Transcation image', required: false })
  transaction_image: string;

  @ApiProperty({ example: '2023-03-21', required: false })
  due_date: Date;

  @ApiProperty({ example: '2023-03-21', required: false })
  bill_date: Date;

  @ApiProperty({ example: 'paywnhgtu12mfg56', required: false })
  transaction_id: Date;

  @ApiProperty({ example: 'Advance or other', required: false })
  stage: string;
}
