import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantsResolver } from './merchant.resolver';

@Module({
  controllers: [],
  providers: [MerchantService, MerchantsResolver]
})
export class MerchantModule {}
