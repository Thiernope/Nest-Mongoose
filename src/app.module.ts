import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cat/cat.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://thiernope:7OiFdGGdCB1lgwl8@development-cluster.funxa.mongodb.net/nestjs-mongoose"), CatModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
