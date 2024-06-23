import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constant';
import { JwtTokenService } from './jwtToken.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as UserName, UserSchema } from './entity/user.schema';
import { UserMongoRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' }
    }),
    MongooseModule.forFeature([{ name: UserName.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    JwtTokenService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    },
    {
      provide: 'DataSource',
      useClass: UserMongoRepository
    }
  ]
})
export class UsersModule {}
