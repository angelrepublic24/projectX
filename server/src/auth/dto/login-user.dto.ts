/* eslint-disable prettier/prettier */

import { IsEmail, IsString, Matches, ValidateIf } from "class-validator";

export class LoginUserDto {
    @ValidateIf(o => !o.username)
    @IsEmail()
    email: string;

    @ValidateIf(o => !o.email)
    @IsString()
    username: string;

    @IsString()
    @Matches(
    /(?:(?=.*\d)|(?=.\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}