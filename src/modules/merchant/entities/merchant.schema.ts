import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/entity/user.schema";
import { Payer } from "../../users/entity/payer.schema";

// used to declare some mongoose methods to typescript like (create, save, ...)
export type merchantDocumnet = HydratedDocument<Merchant>;

@Schema()
export class Merchant {
    @Prop({ required: true, unique: true })
    cif: String;
    @Prop({ required: true, })
    industry: String;
    @Prop({ required: true, })
    email: String;
    @Prop({ required: true, })
    commercialName: String;
    @Prop({ required: true, })
    countryCode: String;
    @Prop({ required: true, })
    phoneNumber: String;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    user: User[]
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Payer" })
    payer: Payer
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);