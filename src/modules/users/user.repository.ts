import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './entity/user.schema';
import { Model } from 'mongoose';


export interface DataSource {
    findOneBy: ( id: string ) => Promise<UserDocument>;
    find: ( email: string ) => Promise<UserDocument[]>;
    create: ( createdUser: CreateUserDto ) => Promise<UserDocument>;
    updateUser: ( id: string, user: UserDocument ) => Promise<UserDocument>;
    remove: (id: string) => Promise<UserDocument>;
    updateExpireTokenArray(id: string, token: string): Promise<UserDocument>;
}

export class UserMongoRepository implements DataSource {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async findOneBy(id: string) : Promise<UserDocument> {
        const user = await this.userModel.findById(id);
        return user;
    };

    async find(email: string) : Promise<UserDocument[]> {
        let filter = {};
        if(email)
            filter = { email: email };
        const users = await this.userModel.find( filter );
        return users;
    };

    async create(createdUser: CreateUserDto) : Promise<UserDocument> {
        try {
            return await this.userModel.create(createdUser);
        } catch (error) {
            return error;
        }
    };

    async updateUser(id: string, user: UserDocument) : Promise<UserDocument> {
        try {
            await this.userModel.updateOne({ _id: user._id }, user);
            return await this.findOneBy(id);
        } catch (error) {
            return error;
        }
    };

    async remove(id: string) : Promise<any> {
        return await this.userModel.deleteOne({ _id: id });
    };

    async updateExpireTokenArray(id: string, token: string): Promise<UserDocument> {
        try {
            return this.userModel.findByIdAndUpdate(
                id,
                { $push: { expireTokens: token }},
                { new: true }
            ).exec();
        } catch (error) {
            return error;
        }
    }
}