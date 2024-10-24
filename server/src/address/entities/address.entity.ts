/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/entities/user.entity";


@Schema({timestamps: true})
export class Address extends Document {
    @Prop({
        type: String,
        required: true
    })
    phone: string;

    @Prop({
        type: String,
        required: true
    })
    address: string;

    @Prop({
        type: String,
    })
    address2: string;

    @Prop({
        type: String,
        required: true
    })
    city: string;

    @Prop({
        type: String,
        required: true
    })
    state: string;

    @Prop({
        type: String,
        required: true
    })
    country: string;

    @Prop({
        type: String,
        required: true
    })
    zip: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    })
    user: User;

    @Prop({
        type: Boolean,
        default: true
    })
    status: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address)
