import { IsDefined, IsEmail, IsEnum, IsNumber, IsNumberString, IsPositive, IsString, ValidateNested } from "class-validator";
import { currency } from "../entity/payer.schema";
import { Type } from "class-transformer";

class DeptDto {
    @IsNumber({}, { message: 'amount must be number'})
    @IsPositive({ message: 'amount must be positive'})
    @IsDefined({ message: "amount is required"})
    amount: number;

    @IsEnum(currency, { message: `currenct must be one of ${Object.values(currency).join(', ')}`})
    @IsDefined({ message: "currency is required"})
    currency: string;
}

export class CreatePayerDto {
    @IsDefined({ message: "fullName is required"})
    @IsString({ message: 'fullname must be string' })
    fullName: string;

    @IsDefined({ message: "email is required"})
    @IsEmail({}, { message: 'email must be email'})
    email: string;

    @IsDefined({ message: "merchantId is required"})
    @IsString({ message: 'merchantId must be string' })
    merchantId: string;

    @IsDefined({ message: "userId is required"})
    @IsString({ message: 'userId must be string' })
    userId: string;

    @ValidateNested()
    @Type(() => DeptDto)
    @IsDefined({ message: "dept is required"})
    dept: DeptDto
}