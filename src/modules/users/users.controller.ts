import { Body, Controller, Get, Post, Param, Query, Delete, Patch, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards, Request, Req, } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdatedUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CustomUser } from './decorators/custom-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { SignInUserDto } from './dtos/signIn-user.dto';

@Controller('auth')
// @Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }
    
    @Serialize(UserDto)
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.authService.signUp(body);
        return user;
    }
    
    @Post('/signin/signin')
    async signIn(@Body() body: any) {
        const user = await this.authService.signIn(body.email, body.password);
        return user.access_token;
    }
    
    @Serialize(UserDto)
    @Post('/signout')
    @UseGuards(AuthGuard)
    async signOut(@Request() req: any) {
        const token = req.headers['authorization'].split(' ')[1];
        return await this.authService.signOut(token);
    }
    
    @Serialize(UserDto)
    @Get('/:id')
    @UseGuards(AuthGuard)
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
    
    // @Serialize(UserDto)
    @Get()
    @UseGuards(AuthGuard)
    findAllUsers(@Query('email') query: string) {
        console.log(query); 
        return this.usersService.find(query);
    }

    @Serialize(UserDto)
    @Delete('/:id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Serialize(UserDto)
    @Patch('/:id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() body: UpdatedUserDto) {
        return this.usersService.update(id, body);
    }
}
