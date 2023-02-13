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

  @ApiProperty({ example: 'Advance or other', required: false })
  stage: string;
}
