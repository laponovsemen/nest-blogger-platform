import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExtractUserIdFromRequest } from '../guards/decorators/param/extract-userId-from-request.decorator';
import { LocalAuthGuard } from '../guards/local/local-auth.guard';
import { LoginViewDto } from './view-dto/login.view-dto';
import { AuthService } from '../apllication/auth.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/bearer/jwt-auth.guard';
import { MeViewDto } from './view-dto/me.view-dto';
import { AuthQueryRepository } from '../infrastructure/query/auth.query-repository';

@Controller('auth')
export class AuthController {
  constructor(
    private authQueryRepository: AuthQueryRepository,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        loginOrEmail: { type: 'string', example: 'login123' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  login(@ExtractUserIdFromRequest() userId: string): LoginViewDto {
    return this.authService.login(userId);
  }

  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@ExtractUserIdFromRequest() userId: string): Promise<MeViewDto> {
    return this.authQueryRepository.me(userId);
  }
}
