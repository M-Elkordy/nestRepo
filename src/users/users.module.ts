import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UsersService, UsersResolver],
  imports: [ConfigModule]
})
export class UsersModule {}
