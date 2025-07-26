import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { MatchQueryDto } from '@/user/dto/user.dto';

@Controller('user')
@ApiTags('User Collection')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/seed')
  seed() {
    return this.userService.seed();
  }

  @Get('/match')
  match(@Query() query: MatchQueryDto) {
    return this.userService.match(query);
  }
}
