import { Module } from '@nestjs/common';
import { UsersController } from './users/api/users.controller';
import { UsersService } from './users/application/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/domain/user.entity';
import { UsersRepository } from './users/infrastructure/users.repository';
import { UsersQueryRepository } from './users/infrastructure/query/users.query-repository';
import { AuthController } from './auth/api/auth.controller';
import { AuthQueryRepository } from './auth/infrastructure/query/auth.query-repository';
import { AuthService } from './auth/apllication/auth.service';
import { CryptoService } from './auth/apllication/crypto.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    AuthService,
    AuthQueryRepository,
    CryptoService,
    JwtService,
  ],
})
export class UserAccountsModule {}
