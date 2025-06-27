export type PaginationResponse<T> = {
  total: number;
  limit: number;
  offset: number;
  data: T[];
};
