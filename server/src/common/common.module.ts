/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { MediaModule } from './media/media.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [EnvConfiguration]
        }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        MediaModule
    ],
    providers: [JwtStrategy],
    exports: [JwtStrategy]
})
export class CommonModule {}
