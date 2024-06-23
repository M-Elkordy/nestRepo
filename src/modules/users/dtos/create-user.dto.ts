import { IsString, IsEmail, Length, Matches, IsNumberString, IsMobilePhone, Equals } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, {message: 'email'})
    email: string;

    @IsString({ message: 'password'})
    password: string;

    // @Matches('password', '', {message: 'confirm'})
    @IsString({ message: 'confirmPaswword'})
    passwordConfirmation: string;

    @IsString({ message: 'username = string' })
    @Length(4, 12, { message: 'username = length'})
    userName: string;

    @IsString({message: 'fullname'}) 
    fullName: string;

    @IsMobilePhone('ar-EG', { strictMode: false }, { message: 'Invalid phone number', each: true})
    phoneNumber: string;
}