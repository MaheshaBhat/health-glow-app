import { SET_API_STATUS, SET_DATA } from './actionTypes';
import { Aggregation, Product, Sort } from './types';

export const setApiStatus = (data: number) => ({
  type: SET_API_STATUS,
  payload: data
});

export const setDataList = ({ totalCount, products, aggregation, sortList, title }: { totalCount: number, products: Product[], aggregation: Aggregation, sortList: Sort, title: string }, sortBy?: string, selectedFilter?: string[]) => ({
  type: SET_DATA,
  payload: { totalCount, products, sortBy, selectedFilter, aggregation, sortList, title },
});

export const clearFilter = () => ({
  type: SET_DATA,
});

