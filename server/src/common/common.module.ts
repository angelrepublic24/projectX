/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [EnvConfiguration]
        }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers: [JwtStrategy],
    exports: [JwtStrategy]
})
export class CommonModule {}
