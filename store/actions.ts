import { SET_API_STATUS, SET_DATA } from './actionTypes';
import { fetchListService } from '../api-service';

export const setApiStatus = (data: any) => ({
  type: SET_API_STATUS,
  payload: { data }
});

export const setDataList = (data: any) => ({
  type: SET_DATA,
  payload: { data },
});

export const fetchList = () => {
  return (dispatch: any) => {
    return fetchListService(dispatch).then(
      (list) => dispatch(setDataList(list)),
      (error) => {
        // console.error(error);
      }
    );
  };
};
