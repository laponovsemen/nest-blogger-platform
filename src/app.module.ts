import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';
import { TestingModule } from './modules/testing/testing.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mongo-hw02'),
    UserAccountsModule,
    BloggersPlatformModule,
    TestingModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
