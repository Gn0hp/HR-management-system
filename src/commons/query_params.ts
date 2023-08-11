/* {
    select: {
      columnName1: true,
      columnName2: true
    },
    order: {
        columnName1: Order.ASC,
        columnName2: Order.DESC
    },
    skip: 0,
    take: 10,
    cache:true
}*/
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Order, PageOptionsDto } from './pagination/PageOptionsDto';

export interface QueryParams {
  select?: any;
  order?: any;
  take?: number;
  skip?: number;
  cache?: boolean;
}
export const CommonQueryParam = () => {
  return applyDecorators(
    ApiQuery({
      name: 'select',
      required: false,
      type: 'string',
      description: 'select a field of object that requesting',
      example: 'select=id,name',
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: Order,
      example: 'sortBy=columnName1:ASC,columnName2:DESC',
    }),
    ApiQuery({
      name: 'take',
      required: false,
      type: 'number',
      example: 'take=10',
    }),
    ApiQuery({
      name: 'skip',
      required: false,
      type: 'number',
      example: 'skip=5',
    }),
    ApiQuery({
      name: 'cache',
      required: false,
      type: 'boolean',
      example: 'cache=true',
    }),
  );
};
// template url: http://<host>:<port>/get?
// select=columnName1,columnName2
// &sortBy=columnName1:ASC,columnName2:DESC
// &take=10&
// skip=0&
// cache=true
export function queryParamBuilder(query: Record<string, any>): QueryParams {
  const select = {};
  const order = {};
  if (query?.select) {
    query?.select.split(',').forEach((item) => {
      select[item] = true;
    });
  }
  if (query?.sortBy) {
    query?.sortBy.split(',').forEach((item) => {
      const [key, value] = item.split(':');
      order[key] = value;
    });
  }
  return {
    select: select || undefined,
    order: order || undefined,
    take: query?.take || undefined,
    skip: query?.skip || undefined,
    cache: query?.cache || undefined,
  };
}

export function parseQuery(query: Record<string, any>): any {
  const filterInQuery = ['select', 'order', 'take', 'skip', 'cache'];
  const result = {};
  for (const key in query) {
    if (
      Object.prototype.hasOwnProperty.call(query, key) &&
      filterInQuery.indexOf(key) === -1
    ) {
      try {
        result[key] = query[key];
      } catch (error) {
        console.log(error);
      }
    }
  }
  return result;
}

export function pageQueryParamBuilder(
  query: Record<string, any>,
): PageOptionsDto {
  return <PageOptionsDto>{
    order: query?.order || undefined,
    page: query?.page || undefined,
    take: query?.take || undefined,
    skip: query?.skip || undefined,
  };
}
