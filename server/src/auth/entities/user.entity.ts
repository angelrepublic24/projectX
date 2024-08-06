/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Document } from "mongoose";

@Schema({timestamps: true})
export class User extends Document {

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    lName: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop({
        required: true,
        select: false
    })
    password: string;

    @Prop({
        required: true,
    })
    birth: string;

    @Prop({
        default: ['user'],
    })
    user_role: string[]

    @Prop({
        default: true
    })
    status: boolean


}
 
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function(next){
    if(this.isModified('email') || this.isModified('username')){
        this.email = this.email.toString().trim();
        this.username = this.username.toString().trim();
    }
    next()
})