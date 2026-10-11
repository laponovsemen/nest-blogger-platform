import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Name, NameSchema } from './name.schema';
import { HydratedDocument, Model } from 'mongoose';
import { CreateUserDomainDto } from './dto/create-user.domain.dto';

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

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;

  makeDeleted() {
    if (this.deletedAt !== null) {
      throw new Error('User has already been deleted.');
    }
    this.deletedAt = new Date();
  }

  static createUser(
    this: UserModelType,
    dto: CreateUserDomainDto,
  ): UserDocument {
    const user = new this();

    user.login = dto.login;
    user.email = dto.email;
    user.passwordHash = dto.passwordHash;
    user.isEmailConfirmed = false;

    return user;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserModelType = Model<UserDocument> & typeof User;
