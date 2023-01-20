import { PartialType } from '@nestjs/swagger';
import { CreateSnDto } from './create-sn.dto';

export class UpdateSnDto extends PartialType(CreateSnDto) {}
