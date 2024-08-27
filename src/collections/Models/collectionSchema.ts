import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Items } from 'src/items/Model/itemSchema';
export enum PaymentStatus {
  PENDING = 'PENEDING',
  PAID = 'PAID'
  
}
@Schema({ timestamps: true })
export class Collections extends Document {
  @Prop({ type: Date })
  collectionDate: Date;
  @Prop()
  collectionSlot: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  addressLine1: string;
  @Prop()
  addressLine2: string;
  @Prop()
  country: string;
  @Prop()
  postalCode: string;
  @Prop()
  city: string;
  @Prop()
  description: string;
  @Prop()
  accessInformation: string;
  @Prop({ type: Number })
  totalAmount: number;
  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Items.name }])
  // items: mongoose.Schema.Types.ObjectId[];
  @Prop({ enum: PaymentStatus , default:PaymentStatus.PAID})
  paymentStatus:PaymentStatus
}
export const CollectionSchema = SchemaFactory.createForClass(Collections);
