import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(createdUser: CreateUserDto) {
        const user = this.repo.create(createdUser);
        return this.repo.save(user);
    }

    findOne(id: number) {
        if(!id)
            return null;
        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User Not Found!');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async delete(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User Not Found!');
        }
        return this.repo.remove(user);
    }
}
