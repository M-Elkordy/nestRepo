import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './merchant/merchant.module';
import { UploadFileController } from './upload-file/upload-file.controller';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { MorganMiddleware } from './middlewares/morgan.middleware';


@Module({
  imports: [MerchantModule, UploadFileModule, UsersModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }), 

  ],
  controllers: [AppController, UploadFileController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consuer: MiddlewareConsumer) {
    consuer.apply(MorganMiddleware).forRoutes('*');
  }
}
