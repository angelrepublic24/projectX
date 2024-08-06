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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    AuthModule, 
    ProductsModule, CategoriesModule, SubCategoriesModule],
 
})
export class AppModule {}
