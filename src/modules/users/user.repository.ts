import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './entity/user.schema';
import { Model } from 'mongoose';
import { CreatePayerDto } from './dtos/create-payer.dto';
import { Payer, PayerDocument } from './entity/payer.schema';
import { BadRequestException } from '@nestjs/common';


export interface DataSource {
    findOneBy: ( id: string ) => Promise<UserDocument>;
    find: ( email: string ) => Promise<UserDocument[]>;
    create: ( createdUser: CreateUserDto ) => Promise<UserDocument>;
    updateUser: ( user: UserDocument ) => Promise<void>;
    remove: (id: string) => void;
    createPayer: (payer: CreatePayerDto) => Promise<PayerDocument>;
    getPayersList: (page: number, limit: number, search: string) => Promise<Payer[]>;
    getTotalDept: (cif: string, fullName: string) => void;
}

export class UserMongoRepository implements DataSource {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Payer.name) private payerModel: Model<Payer>
    ) { }

    async findOneBy(id: string) : Promise<UserDocument> {
        return await this.userModel.findById(id);
    };

    async find(email: string) : Promise<UserDocument[]> {
        return await this.userModel.find( { email: email });
    };

    async create(createdUser: CreateUserDto) : Promise<UserDocument> {
        try {
            return await this.userModel.create(createdUser);
        } catch (error) {
            return error;
        }
    };

    async updateUser(user: UserDocument) : Promise<void> {
        try {
            await this.userModel.updateOne({ _id: user._id });
        } catch (error) {
            return error;
        }
    };

    async remove(id: string) : Promise<void> {
        await this.userModel.deleteOne({ _id: id });
    };

    /************************************* Payers *****************************************/

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