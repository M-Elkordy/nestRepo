import { Injectable } from "@nestjs/common";
import { DataSource } from "./merchant.repository";
import { MerchantDto } from "./dtos/merchant.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant, merchantDocumnet } from "./entities/merchant.schema";


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
        console.log(data);
        await this.merchantModel.create(data);
    };
    
    async updateMerchat(merchantUser: MerchantDto, userCif: string) : Promise<merchantDocumnet[]> {
        await this.merchantModel.findOneAndUpdate({ cif: userCif }, merchantUser);
        return this.getMerchants();
    };

    async deleteMerchant(userCif: string) : Promise<merchantDocumnet[]> {
        await this.merchantModel.findOneAndDelete( { cif: userCif });
        return this.getMerchants();
    };
}