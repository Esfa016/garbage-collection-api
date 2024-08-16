import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class OtpCodes extends Document {
    @Prop({ index: true ,type:Number})
    otp: number
    @Prop()
    token: string
}

export const OtpCodeSchema = SchemaFactory.createForClass(OtpCodes)
