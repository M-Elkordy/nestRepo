import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";
import { JwtTokenService } from "./jwtToken.service";

const bcrypt = require('bcrypt');

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtTokenService) {}

    async signUp(createdUser: CreateUserDto) {
        console.log(createdUser);
        const users = await this.usersService.find(createdUser.email);
        if(users.length) throw new BadRequestException("Email Was Found");
        if (createdUser.password !== createdUser.passwordConfirmation) {
            throw new BadRequestException("Password confirmation does not match password");
        }
        const saltRounds = 10;
        
        const hash = await bcrypt.hash(createdUser.password, saltRounds);
        createdUser.password = hash;
        const user = await this.usersService.create(createdUser);
        return user;
    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if(!user) throw new NotFoundException("User Not Found");

        // this.usersService.find(email); should not return array of users because each email 
        // is assigned to one user.
        const result = await bcrypt.compare(password, user.password);
        
        if(!result) {
            throw new BadRequestException("Incorrect Password");
        }
        const userToken = await this.jwtService.createJwtToken(user); 
        return userToken;
    }

    async signOut(token: string) {
        const user = await this.jwtService.extractJwtTokenData(token);
        const userId = user.id;
        return this.usersService.addExpireToken(userId, token);
    }
} 