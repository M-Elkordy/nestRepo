import { IsEmail, IsString } from "class-validator";


export class SignInUserDto {
    
    @IsEmail({}, {message: 'email'})
    email: string;

    @IsString({ message: 'password'})
    password: string;
}