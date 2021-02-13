import statusCodes from '../api-service/status-codes';
import { getOrder } from '../constants/Config';
import { ActionTypes, CLEAR_FILTER, SET_API_STATUS, SET_DATA } from './actionTypes';
import { SystemState, Order } from './types';


const initialState: SystemState = {
  apiStatus: statusCodes.notUsed,
  loggedIn: true,
  session: '',
  userName: 'Mahesha',
  products: [],
  totalCount: 0,
  sortBy: { text: '', isSelected: false, key: '', order: '' },
  selectedFilter: [],
  aggregations: [{
    buckets: [],
    isForMultiSelection: false,
    name: '',
    text: '',
  }],
  sorts: [],
  title: '',
  page: 0,
};


// product reducer
export function productReducer(state = initialState, action: ActionTypes): SystemState {
  switch (action.type) {
    case SET_API_STATUS: {
      const data = action.payload;
      return {
        ...state,
        apiStatus: data,
      };
    }
    case SET_DATA: {
      const { page, totalCount, products, sortBy, selectedFilter, aggregations, sorts, title, isFilter } = action.payload;
      if (isFilter) {
        return {
          ...state,
          aggregations: [...(aggregations || [])],
        };
      }
      let mergedProducts = products || [];
      if (page !== 1) {
        const ids = new Set(state.products.map(d => d.skuId));
        mergedProducts = [...state.products, ...products.filter(d => !ids.has(d.skuId))];
      }

      let newSorts = state.sorts;
      if (sorts?.length) {
        newSorts = sorts.map((r) => r.orders).flat();
      }
      return {
        ...state,
        products: mergedProducts,
        aggregations,
        sorts: newSorts,
        totalCount,
        title,
        sortBy,
        selectedFilter,
        page,
      };
    }
    case CLEAR_FILTER: {
      const isReset = action.payload;
      return {
        ...state,
        selectedFilter: [],
      };
    }

    default:
      return state;
  }
}
