import { SystemState, Product } from './types';

export const SET_API_STATUS = 'setApiStatus';
export const SET_DATA = 'setData';

interface setApiStatusAction {
    type: typeof SET_API_STATUS,
    payload: number
}

interface setDataListAction {
    type: typeof SET_DATA,
    payload: { totalCount: number, products: Product[], sortBy: string },
}


export type ActionTypes = setApiStatusAction | setDataListAction;
