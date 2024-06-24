import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";
import { Merchant } from "../../merchant/entities/merchant.schema";

export type PayerDocument = HydratedDocument<Payer>

@Schema()
export class Payer {
    @Prop({ required: true })
    id: Number;

    @Prop({ required: true })
    fullName: String;

    @Prop({ required: true })
    email: String;

    @Prop({ required: true, 
        type: {
            amount: { type: Number },
            currency: { type: String }
        } 
    })
    dept: {
        amount: number;
        currency: string;
    };

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User"})
    userId: mongoose.schema.Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' })
    merchantId: mongoose.schema.Types.ObjectId;
}

export const PayerSchema = SchemaFactory.createForClass(Payer);