/* eslint-disable prettier/prettier */

import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/entities/user.entity";
import { Category } from "src/categories/entities/category.entity";
import { SubCategory } from "src/sub-categories/entities/sub-category.entity";
import { ProductImage } from './product-image.entity';

@Schema({timestamps: true})
export class Product extends Document {
    @Prop({
        required: true,
    })
    title: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    })
    category: Category;
    
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    })
    subCategory: SubCategory;

    @Prop({
        required: true,
    })
    brand: string;

    @Prop({
        required: true,
    })
    models: string;

    @Prop({
        required: true,
    })
    color: string;

    @Prop({
        required: true,
        type: [String]
    })
    size: string[]

    @Prop({
        required: true,
        type: [String]
    })
    gender: string;

    description: string;

    @Prop({
        required: true,
        type: Number
    })
    price: number;

    @Prop({
        required: true,
    })
    stock: number;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    user: User;

    @Prop({
        type: [String]
    })
    images: string[]

}

export const ProductSchema = SchemaFactory.createForClass(Product);