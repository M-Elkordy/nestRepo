import { JwtService } from '@nestjs/jwt';

export class JwtTokenService {
    constructor(private jwtService: JwtService) {}

    async createJwtToken(user) {
        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}