import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/mydatabase'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
