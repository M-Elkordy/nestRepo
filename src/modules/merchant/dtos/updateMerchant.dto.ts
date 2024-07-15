import { IsString, Length, Equals, IsAlpha, IsNumberString, IsEmail } from "class-validator";


export class UpdateMerchantDto {
    @IsString()
    @Length(8, 8)
    cif?: string;

    @IsString()
    @IsAlpha()
    industry?: string;

    @IsString()
    @IsNumberString()
    @Length(10, 10)
    phoneNumber?: string;

    @IsString()
    @Equals("+20")
    countryCode?: string;

    @IsString()
    @Length(2)
    commercialName?: string;
    
    @IsEmail()
    email?: string;
}