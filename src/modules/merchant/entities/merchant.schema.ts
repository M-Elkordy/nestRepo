import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/entity/user.schema";
import { Payer } from "src/modules/payers/entities/payer.schema";
// used to declare some mongoose methods to typescript like (create, save, ...)
export type merchantDocumnet = HydratedDocument<Merchant>;

@Schema()
export class Merchant {
    @Prop({ required: true, unique: true, length: 8 })
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
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Payer" })
    payer: Payer
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);