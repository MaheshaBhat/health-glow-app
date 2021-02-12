import { SET_API_STATUS, SET_DATA } from './actionTypes';
import { Product } from './types';

export const setApiStatus = (data: number) => ({
  type: SET_API_STATUS,
  payload: data
});

export const setDataList = ({ totalCount, products }: { totalCount: number, products: Product[] }, sortBy?: string) => ({
  type: SET_DATA,
  payload: { totalCount, products, sortBy },
});

