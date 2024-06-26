import { Module } from '@nestjs/common';
import { PayersController } from './payers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payer, PayerSchema } from './entities/payer.schema';
import { PayersService } from './payers.service';
import { PayersMongoRepository } from './payers.repository';


@Module({
  controllers: [PayersController],
  imports: [MongooseModule.forFeature([{ name: Payer.name, schema: PayerSchema }])],
  providers: [
    PayersService,
    PayersMongoRepository
  ]
})
export class PayersModule {}
