import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
