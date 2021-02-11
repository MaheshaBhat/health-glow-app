import {} from './actionTypes';
import statusCodes from '../api-service/status-codes';

const initialState = {
  list: [],
  apiStatus: statusCodes.notUsed,
  user: {}
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    //   case SET_API_STATUS: {
    //     const { data } = action.payload;
    //     return {
    //       ...state,
    //       apiStatus: data,
    //     };
    //   }

    default:
      return state;
  }
}
