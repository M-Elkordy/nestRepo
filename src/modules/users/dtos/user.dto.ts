import { Expose } from "class-transformer";


export class MerchantDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    passwordConfirmation: string;

    @Expose()
    userName: string;

    @Expose()
    fullName: string;

    @Expose()
    phoneNumber: string;
}