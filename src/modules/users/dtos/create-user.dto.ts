import { IsString, IsEmail, Length, Matches, IsNumberString, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @Matches('password')
    passwordConfirmation: string;

    @IsString()
    @Length(4, 12)
    userName: string;

    @IsString()
    fullName: string;

    @IsMobilePhone('ar-EG', { strictMode: false }, { message: 'Invalid phone number', each: true})
    phoneNumber: string;
}