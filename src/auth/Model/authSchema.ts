import { Schema, Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Admin extends Document {
    @Prop()
    email: string
    @Prop()
    password:string
}
 export const AdminSchema= SchemaFactory.createForClass(Admin)