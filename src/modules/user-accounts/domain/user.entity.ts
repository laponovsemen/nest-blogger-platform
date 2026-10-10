import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Name, NameSchema } from './name.schema';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  login: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: Boolean, required: true, default: false })
  isEmailConfirmed: boolean;

  @Prop({ type: NameSchema })
  name: Name;

  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;

  makeDeleted() {
    if (this.deletedAt !== null) {
      throw new Error('User has already been deleted.');
    }
  }

  // update(dto) {
  //   if (dto.email !== this.email) {
  //     this.isEmailConfirmed = false;
  //   }
  //   this.email = dto.email;
  // }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserMoelType = Model<UserDocument> & typeof User;
