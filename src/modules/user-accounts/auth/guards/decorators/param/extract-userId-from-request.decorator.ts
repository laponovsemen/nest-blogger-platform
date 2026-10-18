import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractUserIdFromRequest = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();

    const userContext = request.user;

    if (!userContext) {
      throw new Error('there is no user in the request object!');
    }

    return userContext.userId;
  },
);
