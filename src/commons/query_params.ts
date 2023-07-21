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
export interface QueryParams {
  select?: any;
  order?: any;
  take?: number;
  skip?: number;
  cache?: boolean;
}
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
