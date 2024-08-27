import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections, CollectionSchema } from './Models/collectionSchema';
import { applyRawBodyOnlyTo } from '@golevelup/nestjs-webhooks/lib/webhooks.utilities';
@Module({
  imports:[MongooseModule.forFeature([{name:Collections.name,schema:CollectionSchema}])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.POST,
      path:'/v1/collections/webhook'
        
      })
  }
}
