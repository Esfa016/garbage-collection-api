import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { EmailsModule } from './emails/emails.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true ,envFilePath:'.env'}),
    MongooseModule.forRoot(process.env.DB_CONN),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    AuthModule,
    ItemsModule,
    EmailsModule,
    CollectionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
