/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/auth/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-strategy.interface";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ){
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload){
        const {_id} = payload;
        const user = await this.userModel.findOne({_id: _id});
        if(!user)
            throw new UnauthorizedException('Token is not valid');

        if(!user.status)
            throw new UnauthorizedException('User is inactive, talk with an admin ')

        return user;
    }
}