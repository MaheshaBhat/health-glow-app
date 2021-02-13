import { SystemState } from './types';

export const getProducts = (state: SystemState) => state.products;
export const getApiStatus = (state: SystemState) => state.apiStatus;
export const getTotalCount = (state: SystemState) => state.totalCount;
export const getSortBy = (state: SystemState) => state.sortBy;
export const getSelectedFilter = (state: SystemState) => state.selectedFilter;
export const getSortFilter = ({ selectedFilter, sortBy }: SystemState) => ({ selectedFilter, sortBy });
export const getAggregation = (state: SystemState) => state.aggregations;
export const getSortList = (state: SystemState) => state.sorts;
export const getTitle = (state: SystemState) => state.title;

