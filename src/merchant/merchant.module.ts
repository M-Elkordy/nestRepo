import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { JsonFileRepository } from './merchant.repository';
import { filePath } from 'src/config';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService, { provide: JsonFileRepository, useFactory: () => {
    return new JsonFileRepository(filePath);
  }}]
})
export class MerchantModule {}
