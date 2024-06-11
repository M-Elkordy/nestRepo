import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";
import { JwtTokenService } from "./jwtToken.service";
const bcrypt = require('bcrypt');

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtTokenService) {}

    async signUp(createdUser: CreateUserDto) {
        const users = await this.usersService.find(createdUser.email);
        if(users.length) throw new BadRequestException("Email Was Found");
        const saltRounds = 10;
        let user: User;
        bcrypt.hash(createdUser.password, saltRounds).then(async function(hash) {
            createdUser.password = hash;
            user = await this.usersService.create(createdUser);
        })
        return user;
    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if(!user) throw new NotFoundException("User Not Found");

        // this.usersService.find(email); should not return array of users because each email 
        // is assigned to one user
        const currentUser = await this.usersService.find(email);

        bcrypt.compare(password, currentUser[0].password).then(function(result: Boolean) {
            if(result !== true) {
                throw new BadRequestException("Incorrect Password");
            }
        });
        return this.jwtService.createJwtToken(currentUser[0]);
    }
} 