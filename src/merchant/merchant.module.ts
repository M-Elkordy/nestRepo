import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantsResolver } from './merchant.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [MerchantService, MerchantsResolver],
  imports: [ConfigModule]
})
export class MerchantModule {}
