import statusCodes from '../api-service/status-codes';
import { ActionTypes, SET_API_STATUS, SET_DATA } from './actionTypes';
import { SystemState } from './types';


const initialState: SystemState = {
  apiStatus: statusCodes.notUsed,
  loggedIn: true,
  session: '',
  userName: 'Mahesha',
  products: [],
  totalCount: 0
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
      const { totalCount, products } = action.payload;
      const newProducts = state.products.concat(products);
      return {
        ...state,
        products: newProducts,
        totalCount
      };
    }

    default:
      return state;
  }
}
