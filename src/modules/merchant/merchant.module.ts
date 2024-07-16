import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { JsonFileRepository } from './merchant.repository';
import { filePath } from 'src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbRepository } from './merchant.mongodb.repository';
import { Merchant, MerchantSchema } from './entities/merchant.schema';
import { UsersService } from '../users/users.service';
import { JwtTokenService } from '../users/jwtToken.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [MerchantController],
  // providers: [MerchantService, { provide: JsonFileRepository, useFactory: () => {
  //   return new JsonFileRepository(filePath);
  // }}],
  providers: [
    MerchantService,
    {
      provide: "DataSource",
      useClass: MongoDbRepository
    },
    JwtTokenService
  ],
  imports: [
    MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema}]),
    UsersModule
  ]
})

export class MerchantModule {}
