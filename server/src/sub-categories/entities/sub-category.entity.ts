/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Category } from "src/categories/entities/category.entity";

@Schema()
export class SubCategory extends Document {

    @Prop({
        unique: true,
    })
    title: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    })
    category: Category
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory)
