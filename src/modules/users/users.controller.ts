import { Body, Controller, Get, Post, Param, Query, Delete, Patch, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdatedUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MerchantDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CustomUser } from './decorators/custom-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(MerchantDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }

    @Post('signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any ) {
        const user = await this.authService.signUp(body);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/whoami')
    whoAmI(@CustomUser() user: User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
        return "signed out";
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') query: string) {
        return this.usersService.find(query);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        this.usersService.delete(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdatedUserDto) {
        this.usersService.update(parseInt(id), body);
    }
}
