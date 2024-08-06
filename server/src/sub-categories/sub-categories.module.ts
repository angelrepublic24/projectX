/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from './entities/sub-category.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: SubCategory.name,
        schema: SubCategorySchema
      }
    ]),
    CategoriesModule, AuthModule
  ],
  exports: [MongooseModule]
})
export class SubCategoriesModule {}
