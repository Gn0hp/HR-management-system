import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.ASC;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({ minimum: 1, maximum: 30, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(30)
  @IsOptional()
  readonly take: number = 10;

  @ApiPropertyOptional({
    example: 'orderBy=name:ASC,age:DESC',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly orderBy: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
  getOrdersBy(): any {
    const orders = this.orderBy.split(',');
    const result = {};
    for (const order of orders) {
      const [key, value] = order.split(':');
      result[`user.${key}`] = value;
    }
    return result;
  }
}
export interface PageMetadataParams {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
