import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

export class PaginationMeta {
  total: number;
  limit?: number;
}

export class PaginationRequestDto {
  @IsInt()
  @Min(10)
  @Max(2000)
  @ApiProperty({
    example: 100,
  })
  @Transform(({ value }) => +value)
  limit: number;
}

export type SortRecord = Record<string, 1 | -1>;
