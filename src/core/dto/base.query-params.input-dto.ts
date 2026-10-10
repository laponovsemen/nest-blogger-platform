import { Type } from 'class-transformer';

export class BaseQueryParams {
  @Type(() => Number)
  page: number = 1;
  
  @Type(() => Number)
  pageSize: number = 10;

  sortDirection: SortDirection = SortDirection.Desc;

  calculateSkip() {
    return (this.page - 1) * this.pageSize;
  }
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}
