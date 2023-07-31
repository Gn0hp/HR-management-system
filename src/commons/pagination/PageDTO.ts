import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageMetaData } from './PageMetaData';

export class PageDTO<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: PageMetaData })
  readonly meta: PageMetaData;

  constructor(data: T[], meta: PageMetaData) {
    this.data = data;
    this.meta = meta;
  }
}
