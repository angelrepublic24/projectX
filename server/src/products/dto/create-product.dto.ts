/* eslint-disable prettier/prettier */

import { IsArray, IsIn, IsNumber, IsOptional, IsPositive, IsString, MinLength, IsInt } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    brand: string;

    @IsString()
    models: string

    @IsOptional()
    @IsString()
    description: string

    @IsString()
    color: string;

    @IsString({each: true})
    @IsArray()
    size: string;

    @IsIn(['men', 'woman', 'kids', 'unisex'])
    gender: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsInt()
    @IsPositive()
    stock: number

    @IsString()
    category: string

    @IsString()
    subCategory: string

    @IsArray()
    @IsOptional()
    @IsString({
        each: true
    })
    images?: string[];

}
