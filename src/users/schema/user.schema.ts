import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  f_surname: string;

  @Prop({ required: true })
  m_surname: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ required: true })
  type_user: string;

  @Prop({ required: true, unique: true })
  userKey: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  position: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
