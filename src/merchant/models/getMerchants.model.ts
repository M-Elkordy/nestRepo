import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MerchantData {
    @Field()
    _id: string;

    @Field()
    cif: string;

    @Field()
    industry: string;

    @Field()
    email: string;
    
    @Field()
    commercialName: string;
    
    @Field()
    countryCode: string;
    
    @Field()
    phoneNumber: string;
}

@ObjectType()
export class Merchants {
    @Field()
    success: boolean;

    @Field(() => [MerchantData])
    data: MerchantData[]
}