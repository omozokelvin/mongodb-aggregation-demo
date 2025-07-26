import {
  PaginationMeta,
  PaginationRequestDto,
} from '@/_lib/dtos/pagination.dto';
import { User, UserStatus } from '@/user/entities/user.entity';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class MatchQueryDto extends PaginationRequestDto {
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  signupDate?: Date;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsString()
  search?: string;
}

export class MatchResponseDto {
  meta: PaginationMeta;
  items: User[];
}
