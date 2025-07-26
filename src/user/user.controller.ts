import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User Collection')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/seed')
  seed() {
    return this.userService.seed();
  }
}
