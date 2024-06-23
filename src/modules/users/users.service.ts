import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { DataSource } from './user.repository';

@Injectable()
export class UsersService {
    constructor(@Inject("DataSource") private repo: DataSource) { }

    create(createdUser: CreateUserDto) {
        return this.repo.create(createdUser);
    }

    findOne(id: string) {
        if(!id)
            return null;
        return this.repo.findOneBy(id);
    }

    find(email: string) {
        return this.repo.find(email);
    }

    async update(id: string, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User Not Found!');
        }
        Object.assign(user, attrs);
        return this.repo.updateUser(user);
    }

    async delete(id: string) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User Not Found!');
        }
        return this.repo.remove(id);
    }
}
