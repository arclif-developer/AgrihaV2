import { PartialType } from '@nestjs/swagger';
import { CreateUserPaymentDto } from './create-user_payment.dto';

export class UpdateUserPaymentDto extends PartialType(CreateUserPaymentDto) {}
