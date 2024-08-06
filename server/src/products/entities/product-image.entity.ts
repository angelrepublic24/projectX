/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Product } from "./product.entity";


@Schema({timestamps: true})
export class ProductImage extends Document {

    @Prop({
        type: String
    })
    url: string;

    @Prop({
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId
    })
    product: Product

}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);