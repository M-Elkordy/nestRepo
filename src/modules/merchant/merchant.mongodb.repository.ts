import { Injectable } from "@nestjs/common";
import { DataSource } from "./merchant.repository";
import { MerchantDto } from "./dtos/merchant.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant, merchantDocumnet } from "./entities/merchant.schema";
import { UpdateMerchantDto } from "./dtos/updateMerchant.dto";


@Injectable()
export class MongoDbRepository implements DataSource {
    constructor(
        @InjectModel(Merchant.name) private merchantModel: Model<Merchant>
    ) { }

    async getMerchants() : Promise<merchantDocumnet[]> {
        const data = await this.merchantModel.find();
        return data;
    };

    async addMerchant(data: MerchantDto) : Promise<void> {
        await this.merchantModel.create(data);
    };
    
    async updateMerchat(merchantUser: UpdateMerchantDto, userCif: string) : Promise<merchantDocumnet[]> {
        try {
            await this.merchantModel.findOneAndUpdate({ cif: userCif }, merchantUser);
        } catch (error) {
            return error;
        }
        return this.getMerchants();
    };

    async deleteMerchant(userCif: string) : Promise<merchantDocumnet[]> {
        await this.merchantModel.findOneAndDelete( { cif: userCif });
        return this.getMerchants();
    };
}