import { API_URL, getOrder } from '../constants/Config';
import statusCodes from './status-codes';
import { setApiStatus, setDataList } from '../store/actions';

const getUrl = (page: number, url: string, sortBy?: string) => {
  let searchParams: string = `${url}&page=${20 * (page - 1)}:${20 * page}`;
  if (sortBy) {
    searchParams += `&${new URLSearchParams({ 'sort': getOrder(sortBy) }).toString()}`;
  }
  return searchParams;
};
async function fetchListService(page: number, dispatch: any, sortBy?: string) {
  let res;
  try {
    dispatch(setApiStatus(statusCodes.requesting));
    const url: string = getUrl(page, API_URL, sortBy);
    const result = await fetch(encodeURI(url));
    res = await result.json();
    dispatch(setApiStatus(statusCodes.successful));
  } catch (ex) {
    dispatch(setApiStatus(statusCodes.failed));
  }
  return res?.data;
}

export const fetchList = (page: number, sortBy?: string) => {
  return (dispatch: any) => {
    return fetchListService(page, dispatch, sortBy).then(
      (products) => {
        dispatch(setDataList(products, sortBy));
      },
      (error) => {
        // console.error(error);
      }
    ).catch(() => { });
  };
};


