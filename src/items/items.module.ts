import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Items, ItemsSchema } from './Model/itemSchema';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [
    UuidModule,
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
