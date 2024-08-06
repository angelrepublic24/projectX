/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail, IsNotEmpty, IsDate, IsEnum, IsBoolean, IsOptional, MaxLength, Matches, IsArray } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    lName:string;

    @IsEmail()
    email: string

    @IsString()
    @MinLength(1)
    username: string

    @MinLength(6)
    @IsNotEmpty()
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    birth: string;

    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    user_role: string[]

    @IsBoolean()
    @IsOptional()
    status: boolean
}
