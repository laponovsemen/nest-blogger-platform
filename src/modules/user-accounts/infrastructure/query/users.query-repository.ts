import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { UserModelType } from '../../domain/user.entity';
import { User } from '../../domain/user.entity';
import { UserViewDto } from '../../api/view-dto/users.view-dto';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}

  async getByIdOrNotFoundFail(id: string): Promise<UserViewDto> {
    const user = await this.UserModel.findOne({
      _id: id,
      deletedAt: null,
    }).lean();

    if (!user) throw new NotFoundException('User not found');

    return UserViewDto.mapToView(user);
  }

  async getAll(): Promise<UserViewDto[]> {
    const result = await this.UserModel.find({ deletedAt: null }).lean().exec();

    return result.map((u) => UserViewDto.mapToView(u));
  }
}
