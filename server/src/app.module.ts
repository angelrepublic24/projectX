/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { EnvConfiguration } from './common/config/app.config';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AddressModule } from './address/address.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration]
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    AuthModule, 
    ProductsModule, CategoriesModule, SubCategoriesModule, CloudinaryModule, AddressModule, OrdersModule],
  providers: [],
 
})
export class AppModule {}
