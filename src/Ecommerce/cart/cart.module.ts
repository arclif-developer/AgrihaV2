import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../../schemas/cart.schema';
import { Product, ProductSchema } from '../../schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Cart.name, schema: CartSchema },
        { name: Product.name, schema: ProductSchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
