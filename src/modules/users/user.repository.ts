import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './entity/user.schema';
import { Model } from 'mongoose';


export interface DataSource {
    findOneBy: ( id: string ) => Promise<UserDocument>;
    find: ( email: string ) => Promise<UserDocument[]>;
    create: ( createdUser: CreateUserDto ) => Promise<UserDocument>;
    updateUser: ( user: UserDocument ) => Promise<void>;
    remove: (id: string) => void;
}

export class UserMongoRepository implements DataSource {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
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

}