import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections, CollectionSchema } from './Models/collectionSchema';

@Module({
  imports:[MongooseModule.forFeature([{name:Collections.name,schema:CollectionSchema}])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
