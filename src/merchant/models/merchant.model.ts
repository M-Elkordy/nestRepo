import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Merchant {
    @Field(type => String)
    cif: string;

    @Field()
    industry: string;
    
    @Field()
    phoneNumber: string;
    
    @Field()
    countryCode: string;
    
    @Field()
    commertialName: string;
    
    @Field()
    email: string;
}