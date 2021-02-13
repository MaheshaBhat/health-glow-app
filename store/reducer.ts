import statusCodes from '../api-service/status-codes';
import { ActionTypes, CLEAR_FILTER, SET_API_STATUS, SET_DATA } from './actionTypes';
import { SystemState } from './types';


const initialState: SystemState = {
  apiStatus: statusCodes.notUsed,
  loggedIn: true,
  session: '',
  userName: 'Mahesha',
  products: [],
  totalCount: 0,
  sortBy: '',
  selectedFilter: [],
  aggregation: [],
  sortList: [],
  title: ''
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
      const { totalCount, products, aggregation, sortList, title, sortBy, selectedFilter } = action.payload;
      return {
        ...state,
        products,
        aggregation,
        sortList,
        totalCount,
        title,
        sortBy: (sortBy || ''),
        selectedFilter
      };
    }
    case CLEAR_FILTER: {
      return {
        ...state,
        selectedFilter: []
      };
    }

    default:
      return state;
  }
}
