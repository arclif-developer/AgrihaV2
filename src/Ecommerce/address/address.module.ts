import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { address, addressSchema } from '../../schemas/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: address.name, schema: addressSchema }],
      'AGRIHA_DB',
    ),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
