import { PaginationMeta } from '@/_lib/dtos/pagination.dto';
import { User, UserStatus } from '@/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class QueryUserDto {
  @IsInt()
  @Min(10)
  @Max(1000)
  @ApiProperty({
    example: 100,
  })
  @Transform(({ value }) => +value)
  limit: number;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsDate()
  signupDate?: Date;
}

export class QueryUserResponseDto {
  meta: PaginationMeta;
  items: User[];
}
