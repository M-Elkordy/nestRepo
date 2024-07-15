import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserObject {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    userName: string;

    @Field()
    fullName: string

    @Field()
    phoneNumber: string;

    @Field(() => [String])
    expireTokens?: string[]
}

@InputType()
export class UserInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    userName: string;

    @Field()
    fullName: string

    @Field()
    phoneNumber: string;
}

@ObjectType()
export class Users {    
    @Field()
    success: boolean;

    @Field(() => [UserObject])
    data: UserObject[]
}

@ObjectType()
export class User {    
    @Field()
    success: boolean;

    @Field(() => UserObject)
    data?: UserObject
}

@InputType()
export class UpdatedUser {
    @Field()
    email?: string;

    @Field()
    password?: string;
}

@InputType()
export class SignInUser {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class SignUpUser {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    passwordConfirmation: string;

    @Field()
    userName: string;

    @Field()
    fullName: string;

    @Field()
    phoneNumber: string;
}

@ObjectType()
export class UserToken {
    @Field()
    success: boolean;

    @Field()
    data: string;
}

@ObjectType()
export class SignOutReturn {
    @Field()
    success: boolean;
}
