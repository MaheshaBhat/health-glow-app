import { SystemState } from './types';

export const getProducts = (state: SystemState) => state.products;
export const getApiStatus = (state: SystemState) => state.apiStatus;
export const getTotalCount = (state: SystemState) => state.totalCount;
