import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from "src/modules/users/constants/auth.constant";
import { JwtTokenService } from "src/modules/users/jwtToken.service";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private jwtTokenService: JwtTokenService, private userService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        const data = await this.jwtTokenService.extractJwtTokenData(token);
        const expiredTokens = await this.userService.getExpireTokens(data.id);
        if(expiredTokens && expiredTokens.includes(token)) 
            throw new UnauthorizedException();
        const payload = await this.jwtService.verifyAsync( token, { secret: jwtConstants.secret });
        request['user'] = payload;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}