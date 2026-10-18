import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const auth = request.headers.authorization;

    const username = this.configService.get<string>('ADMIN_USERNAME');
    const password = this.configService.get<string>('ADMIN_PASSWORD');

    const expectedString =
      'Basic ' +
      Buffer.from(username + ':' + password, 'utf8').toString('base64');

    if (auth !== expectedString) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
