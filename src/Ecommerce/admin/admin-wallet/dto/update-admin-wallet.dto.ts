import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminWalletDto } from './create-admin-wallet.dto';

export class UpdateAdminWalletDto extends PartialType(CreateAdminWalletDto) {}
