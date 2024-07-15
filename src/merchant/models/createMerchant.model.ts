import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { MerchantData } from "./getMerchants.model";

@InputType()
export class MerchantInput {
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
export class Merchant {
    @Field()
    success: boolean;

    @Field(() => MerchantData)
    data: MerchantData
}