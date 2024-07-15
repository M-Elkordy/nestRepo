import { Module } from '@nestjs/common';
import { PayersService } from './payers.service';
import { PayersResolver } from './payers.resolver';

@Module({
  controllers: [],
  providers: [PayersService, PayersResolver]
})
export class PayersModule {}
