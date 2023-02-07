import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../../../schemas/category.schema';
import {
  subcategory,
  subcategorySchema,
} from '../../../schemas/subcategory.schema';
import { Product, ProductSchema } from '../../../schemas/product.schema';
import {
  sub_subcategory,
  sub_subcategorySchema,
} from '../../../schemas/sub_subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Category.name, schema: CategorySchema },
        { name: subcategory.name, schema: subcategorySchema },
        { name: Product.name, schema: ProductSchema },
        { name: sub_subcategory.name, schema: sub_subcategorySchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class adminProductModule {}
