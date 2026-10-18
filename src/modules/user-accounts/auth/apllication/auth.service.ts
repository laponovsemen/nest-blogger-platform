import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { CryptoService } from './crypto.service';
import { LoginDto } from './login.dto';
import { UserDocument } from '../../users/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginDto): Promise<UserDocument | null> {
    const { loginOrEmail, password } = dto;

    const user = await this.usersRepository.findByLoginOrEmail(loginOrEmail);

    if (!user) return null;

    const isPasswordValid = await this.cryptoService.checkPassword({
      password,
      hash: user.passwordHash,
    });

    if (!isPasswordValid) return null;

    return user;
  }
}
