import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { DataSource } from './user.repository';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(@Inject("DataSource") private repo: DataSource) { }

    create(createdUser: CreateUserDto) {
        return this.repo.create(createdUser);
    }

    async findOne(id: string) {
        if(!id)
            return null;

        const user = await this.repo.findOneBy(id);
        if(!user)
            throw new NotFoundException('User Not Found!');
        return user;
    }

    find(email: string) {
        return this.repo.find(email);
    }

    async update(id: string, attrs: Partial<UserDto>) {
        const user = await this.findOne(id);
        console.log(user);
        if(!user) {
            throw new NotFoundException('User Not Found!');
        }
        Object.assign(user, attrs);
        return this.repo.updateUser(id, user);
    }

    async delete(id: string) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User Not Found!');
        }
        return this.repo.remove(id);
    }

    async addExpireToken(id: string, token: string) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User Not Found!');
        }
        return this.repo.updateExpireTokenArray(id, token);
    }

    async getExpireTokens(id: string) {
        console.log(id);
        const user = await this.findOne(id);
        return user.expireTokens;
    }
}
