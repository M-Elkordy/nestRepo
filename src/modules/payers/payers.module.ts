import { Module } from '@nestjs/common';
import { PayersController } from './payers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payer, PayerSchema } from './entities/payer.schema';
import { PayersService } from './payers.service';
import { PayersMongoRepository } from './payers.repository';
import { JwtTokenService } from '../users/jwtToken.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UserMongoRepository } from '../users/user.repository';
import { UserSchema, User } from '../users/entity/user.schema';


@Module({
  controllers: [PayersController],
  imports: [
    MongooseModule.forFeature([{ name: Payer.name, schema: PayerSchema }]),
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    PayersService,
    PayersMongoRepository,
    JwtTokenService,
    UsersService,
    {
      provide: 'DataSource',
      useClass: UserMongoRepository
    }
  ]
})
export class PayersModule {}
