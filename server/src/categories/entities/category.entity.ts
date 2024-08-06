/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({timestamps: true})
export class Category extends Document {

    @Prop({
        unique: true,
    })
    title: string
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);
