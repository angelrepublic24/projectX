/* eslint-disable prettier/prettier */
import { IsString, MinLength } from "class-validator";
import { Category } from "src/categories/entities/category.entity";

export class CreateSubCategoryDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    category: Category
}
