import { SET_API_STATUS, SET_DATA } from './actionTypes';
import { Aggregation, Order, Product, Sort } from './types';

export const setApiStatus = (data: number) => ({
  type: SET_API_STATUS,
  payload: data
});

export const setDataList = (page: number, { totalCount, products, aggregations, sorts, title }: { totalCount: number, products: Product[], aggregations: Aggregation[], sorts: Sort[], title: string }, sortBy?: Order, selectedFilter?: string[], isFilter?: boolean) => ({
  type: SET_DATA,
  payload: { page, totalCount, products, sortBy, selectedFilter, aggregations, sorts, title, isFilter },
});

export const clearFilter = (isReset: boolean) => ({
  type: SET_DATA,
  payload: isReset
});

