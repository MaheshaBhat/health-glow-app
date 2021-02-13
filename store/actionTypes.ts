import { SystemState, Product, Aggregation, Sort, Order } from './types';

export const SET_API_STATUS = 'setApiStatus';
export const SET_DATA = 'setData';
export const CLEAR_FILTER = 'clearFilter';
interface setApiStatusAction {
    type: typeof SET_API_STATUS,
    payload: number
}

interface setDataListAction {
    type: typeof SET_DATA,
    payload: { page: number, totalCount: number, products: Product[], aggregations: Aggregation[], sorts: Sort[], title: string, sortBy: Order, selectedFilter: string[], isFilter?: boolean },
}

interface clearFilterAction {
    type: typeof CLEAR_FILTER,
    payload: boolean
}


export type ActionTypes = setApiStatusAction | setDataListAction | clearFilterAction;
