import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

let ADMIN_USERNAME = 'admin';
let ADMIN_PASSWORD = 'qwerty';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;
    const expectedString =
      'Basic ' +
      Buffer.from(ADMIN_USERNAME + ':' + ADMIN_PASSWORD, 'utf8').toString(
        'base64',
      );

    if (auth !== expectedString) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
