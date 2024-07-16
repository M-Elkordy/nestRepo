import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateMerchant {
    @Field(() => String, { nullable: true })
    cif?: string;
    
    @Field(() => String, { nullable: true })
    industry?: string;
    
    @Field(() => String, { nullable: true })
    email?: string;
    
    @Field(() => String, { nullable: true })
    commercialName?: string;
    
    @Field(() => String, { nullable: true })
    countryCode?: string;
    
    @Field(() => String, { nullable: true })
    phoneNumber?: string;
}

@InputType()
export class UpdateMerchantInput {
    @Field()
    merchantData: UpdateMerchant;

    @Field()
    cif: string;
}