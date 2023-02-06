import { Module } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { AdminProductController } from './admin-product.controller';

@Module({
  controllers: [AdminProductController],
  providers: [AdminProductService]
})
export class AdminProductModule {}
