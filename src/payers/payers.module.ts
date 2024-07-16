import { Module } from '@nestjs/common';
import { PayersService } from './payers.service';
import { PayersResolver } from './payers.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [PayersService, PayersResolver],
  imports: [ConfigModule]
})
export class PayersModule {}
