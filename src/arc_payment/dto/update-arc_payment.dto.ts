import { PartialType } from '@nestjs/swagger';
import { CreateArcPaymentDto } from './create-arc_payment.dto';

export class UpdateArcPaymentDto extends PartialType(CreateArcPaymentDto) {}
