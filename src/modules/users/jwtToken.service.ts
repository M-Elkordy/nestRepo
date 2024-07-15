import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserDocument } from './entity/user.schema';

@Injectable()
export class JwtTokenService {
    constructor(private jwtService: JwtService) {}

    async createJwtToken(user: UserDocument) {
        const payload = { id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async extractJwtTokenData(token: string) {
        const tokenDecoded = await this.jwtService.decode(token);
        return tokenDecoded;
    }
}