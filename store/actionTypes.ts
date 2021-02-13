import { SystemState, Product, Aggregation, Sort } from './types';

export const SET_API_STATUS = 'setApiStatus';
export const SET_DATA = 'setData';
export const CLEAR_FILTER = 'clearFilter';
interface setApiStatusAction {
    type: typeof SET_API_STATUS,
    payload: number
}

interface setDataListAction {
    type: typeof SET_DATA,
    payload: { totalCount: number, products: Product[], aggregation: Aggregation[], sortList: Sort[], title: string, sortBy: string, selectedFilter: string[] },
}

interface clearFilterAction {
    type: typeof CLEAR_FILTER,
}


export type ActionTypes = setApiStatusAction | setDataListAction | clearFilterAction;
