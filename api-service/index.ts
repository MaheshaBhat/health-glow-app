import { API_URL } from '../constants/Config';
import statusCodes from './status-codes';
import { setApiStatus, setDataList } from '../store/actions';


async function fetchListService(dispatch: any) {
    let res;
    try {
        const result = await fetch(API_URL);
        res = await result.json();
        dispatch(setApiStatus(statusCodes.successful));
    } catch (ex) {
        dispatch(setApiStatus(statusCodes.failed));
    }
    return res?.data;
}

export const fetchList = () => {
    return (dispatch: any) => {
      return fetchListService(dispatch).then(
        (products) => {
          dispatch(setDataList(products));
        },
        (error) => {
          // console.error(error);
        }
      ).catch(() => { });
    };
  };


