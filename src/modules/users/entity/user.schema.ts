import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Merchant } from "../../merchant/entities/merchant.schema";
import { Payer } from "./payer.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, })
    email: String;
    @Prop({ required: true, })
    fullName: String;
    @Prop({ required: true, })
    phoneNumber: String;
    @Prop({ required: true, })
    userName: String;
    @Prop({ required: true, })
    password: String;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payer" }]})
    payer: Payer
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Merchant" })
    merchant: Merchant
}

export const UserSchema = SchemaFactory.createForClass(User);