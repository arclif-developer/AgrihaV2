import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas/product.schema';

import {
  ReqProducts,
  ReqProductsSchema,
} from '../../schemas/reqProducts.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema },
        { name: ReqProducts.name, schema: ReqProductsSchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
