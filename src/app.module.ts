import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './modules/merchant/merchant.module';
import { UploadFileController } from './upload-file/upload-file.controller';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { Report } from './reports/report.entity';
import { MorganMiddleware } from './middlewares/morgan.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { PayersModule } from './modules/payers/payers.module';
import { PayersService } from './modules/payers/payers.service';


@Module({
  imports: [
    MerchantModule, 
    UploadFileModule, 
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }), 
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'), PayersModule,
  ],
  controllers: [
    AppController, 
    UploadFileController
  ],
  providers: [
    AppService,
    PayersService
  ],
})

export class AppModule implements NestModule {
  configure(consuer: MiddlewareConsumer) {
    consuer.apply(MorganMiddleware).forRoutes('*');
  }
}
