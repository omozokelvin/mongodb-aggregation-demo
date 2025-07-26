import {
  PaginationMeta,
  PaginationRequestDto,
} from '@/_lib/dtos/pagination.dto';
import { User, UserStatus } from '@/user/entities/user.entity';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class QueryUserDto extends PaginationRequestDto {
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  signupDate?: Date;
}

export class QueryUserResponseDto {
  meta: PaginationMeta;
  items: User[];
}
