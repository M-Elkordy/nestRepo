import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './merchant/merchant.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PayersModule } from './payers/payers.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [MerchantModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    PayersModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [config]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
