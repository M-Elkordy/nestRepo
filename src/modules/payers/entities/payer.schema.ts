import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/modules/users/entity/user.schema"; 
import { Merchant } from "../../merchant/entities/merchant.schema";
import { IsEmail } from "class-validator";

export type PayerDocument = HydratedDocument<Payer>

export enum currency {
    EGP = 'EGP',
    USD = 'USD',
    AED = 'AED'
}

@Schema()
export class Payer {
    @Prop({ required: true })
    fullName: String;

    @Prop({ required: true, validate: [ IsEmail, 'Invalid Email' ] })
    email: String;

    @Prop({ required: true, 
        _id: false,
        type: {
            amount: { 
                type: Number, 
                validate: {
                    validator: (val: number) => val > 0,
                    message: 'Amount must be positive'
                }
            },
            currency: { 
                type: String,
                enum: Object.values(currency),
                required: true
            }
        } 
    })
    dept: {
        amount: number;
        currency: string;
    };

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User"})
    userId: User;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' })
    merchantId: Merchant;
}

export const PayerSchema = SchemaFactory.createForClass(Payer);