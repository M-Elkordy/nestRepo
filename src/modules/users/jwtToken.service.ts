import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserDocument } from './entity/user.schema';

@Injectable()
export class JwtTokenService {
    constructor(private jwtService: JwtService) {}

    async createJwtToken(user: UserDocument) {
        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}