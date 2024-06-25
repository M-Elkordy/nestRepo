import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { DataSource } from './user.repository';
import { CreatePayerDto } from './dtos/create-payer.dto';

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

    /************************************* Payers *****************************************/

    createPayer(payer: CreatePayerDto) {
        return this.repo.createPayer(payer);
    }

    getPayers(page: number, limit: number, search?: string) {
        return this.repo.getPayersList(page, limit, search);
    }

    getTotalDept(cif: string, fullName: string) {
        return this.repo.getTotalDept(cif, fullName);
    }
}
