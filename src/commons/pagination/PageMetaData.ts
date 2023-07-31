import { ApiProperty } from '@nestjs/swagger';
import { PageMetadataParams } from './utils';

export class PageMetaData {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetadataParams) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / pageOptionsDto.take);
    this.hasPreviousPage = pageOptionsDto.page > 1;
    this.hasNextPage = pageOptionsDto.page < this.pageCount;
  }
}
