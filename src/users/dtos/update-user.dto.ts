import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdatedUserDto {

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}