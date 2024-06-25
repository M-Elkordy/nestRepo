import { Module } from '@nestjs/common';
import { PayersController } from './payers.controller';

@Module({
  controllers: [PayersController]
})
export class PayersModule {}
