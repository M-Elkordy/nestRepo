import { InjectModel } from "@nestjs/mongoose";
import { CreatePayerDto } from './dtos/create-payer.dto'; 
import { Payer, PayerDocument } from './entities/payer.schema';
import { Model } from "mongoose";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class PayersMongoRepository {
    
    constructor(@InjectModel(Payer.name) private payerModel: Model<Payer>) {}

    async createPayer(payer: CreatePayerDto): Promise<PayerDocument> {
        try {
            return await this.payerModel.create(payer);
        } catch (error) {
            return error;
        }
    }

    async getPayersList(page: number, limit: number, search: string) : Promise<Payer[]> {
        const payersCount = await this.payerModel.countDocuments();
        const skip = (page - 1) * limit;
        let query = {};
        if(search) {
            query = {
                $or: [
                    { fullName: { $regex: search, $options: 'i' } }, 
                    { email: { $regex: search, $options: 'i' } }
                ]
            }
        }
        if( skip >= payersCount ) {
            throw new BadRequestException("no more payers in this page")
        }
        const data = await this.payerModel.find(query).sort().skip(skip).limit(limit)
        return data;
    }
    
    async getTotalDept(cif: string, fullName: string) {
        return await this.payerModel.aggregate([
            {
                $lookup: {
                    from: 'merchants',
                    localField: 'merchantId',
                    foreignField: '_id',
                    as: 'merchants'
                }
            },
            {
                $match: {
                    'merchants.cif': cif,
                    fullName: new RegExp(fullName, 'i')
                }
            },
            {
                $group: {
                    _id: "$dept.currency",
                    totalDept: { $sum: "$dept.amount" }
                }
            }
        ])
    }
}