import { API_URL, getOrder } from '../constants/Config';
import statusCodes from './status-codes';
import { setApiStatus, setDataList } from '../store/actions';

const getUrl = (sortBy: string, url: string) => {
  const searchParams: string = `${url}&${new URLSearchParams({ 'sort': getOrder(sortBy) }).toString()}`;
  return searchParams;
};
async function fetchListService(dispatch: any, sortBy: string) {
  let res;
  try {
    let url: string = API_URL;
    if (sortBy) {
      url = getUrl(sortBy, API_URL);
    }
    const result = await fetch(encodeURI(url));
    res = await result.json();
    dispatch(setApiStatus(statusCodes.successful));
  } catch (ex) {
    dispatch(setApiStatus(statusCodes.failed));
  }
  return res?.data;
}

export const fetchList = (sortBy: string) => {
  return (dispatch: any) => {
    return fetchListService(dispatch, sortBy).then(
      (products) => {
        dispatch(setDataList(products, sortBy));
      },
      (error) => {
        // console.error(error);
      }
    ).catch(() => { });
  };
};


