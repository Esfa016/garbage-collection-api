import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export enum ItemLabel {
    STANDARD = 'STANDARD',
    ADDITIONAL ='ADDITIONAL'
}
export enum ItemType {
    SINGLE = 'SINGLE',
    VOLUME ='VOLUME'
}

@Schema({ timestamps: true })
export class Items {
    @Prop()
    title: string
    @Prop({type:Number})
    price: number
    @Prop({ enum: ItemLabel, index:true })
    label: ItemLabel
    @Prop({ enum: ItemType, index:true })
    type: ItemType
    @Prop()
    description: string
  
}

export const ItemsSchema = SchemaFactory.createForClass(Items)