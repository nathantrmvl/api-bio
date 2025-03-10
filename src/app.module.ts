import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://al222210657:MiwINmRPxcDGMwpF@bioauth.y4xhe.mongodb.net/?retryWrites=true&w=majority&appName=bioauth'),
    //MongooseModule.forRoot('mongodb://localhost:27017/aplicacion'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}