import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class UsersController {
  constructor(
    // private usersService: UsersService,
    // private usersQueryRepository: UsersQueryRepository,
  ) {}

  @Get('me')
  async getById() {}

  // @Post()
  // async createUser(@Body() body: CreateUserInputDto) {
  //   const userId = await this.usersService.createUser(body);
  //
  //   return this.usersQueryRepository.getByIdOrNotFoundFail(userId);
  // }
}
