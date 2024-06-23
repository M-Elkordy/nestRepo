import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { JsonFileRepository } from './merchant.repository';
import { filePath } from 'src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbRepository } from './merchant.mongodb.repository';
import { DataSource } from './merchant.repository'
import { Merchant, MerchantSchema } from './entities/merchant.schema';

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
    }
  ],
  imports: [
    MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema}])
  ]
})

export class MerchantModule {}
