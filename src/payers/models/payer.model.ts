import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Dept {
    @Field(() => Int)
    amount: number;

    @Field()
    currency: string;
}

@InputType()
export class DeptInput {
    @Field(() => Int)
    amount: number;

    @Field()
    currency: string;
}

@ObjectType()
export class ReturnedPayer {
    @Field()
    _id: string;

    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field(() => Dept)
    dept: Dept;

    @Field()
    userId: string;

    @Field()
    merchantId: string;
}

@InputType()
export class CreatePayer {
    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    merchantId: string;

    @Field()
    userId: string;

    @Field(() => DeptInput)
    dept: DeptInput;
}

@ObjectType()
export class Payer {
    @Field()
    success: boolean;

    @Field(() => ReturnedPayer)
    data: ReturnedPayer
}

@ObjectType()
export class Payers {
    @Field()
    success: boolean;

    @Field(() => [ReturnedPayer])
    data: ReturnedPayer[]
}

@ObjectType()
export class TotalDept {
    @Field()
    _id: string;

    @Field(() => Int)
    totalDept: number;
}

@ObjectType()
export class TotalDeptReturn {
    @Field()
    success: boolean;

    @Field(() => [TotalDept])
    data: TotalDept[];
}

