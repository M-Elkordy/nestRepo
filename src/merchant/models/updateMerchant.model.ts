import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateMerchant {
    @Field()
    cif?: string;

    @Field()
    industry?: string;

    @Field()
    email?: string;
    
    @Field()
    commercialName?: string;
    
    @Field()
    countryCode?: string;
    
    @Field()
    phoneNumber?: string;
}