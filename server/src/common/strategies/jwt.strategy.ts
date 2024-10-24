/* eslint-disable prettier/prettier */
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/auth/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-strategy.interface";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ){
        super({
            secretOrKey: process.env.JWT_SECRET || 'default_secret_key',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
        this.logger.log(`JWT_SECRET: ${process.env.JWT_SECRET}`); // Debugging

    }

    async validate(payload: JwtPayload): Promise<User>{
        const {_id} = payload;
        const user = await this.userModel.findOne({_id: _id});
        if(!user)
            throw new UnauthorizedException('Token is not valid');

        if(!user.status)
            throw new UnauthorizedException('User is inactive, talk with an admin ')

        return user;
    }
}