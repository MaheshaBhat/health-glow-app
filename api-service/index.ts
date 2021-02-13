import { API_URL, getOrder } from '../constants/Config';
import statusCodes from './status-codes';
import { setApiStatus, setDataList } from '../store/actions';

const getUrl = (page: number, url: string, sortBy?: string, selectedFilter?: string[]) => {
  let searchParams: string = `${url}&page=${30 * (page - 1)}:30`;
  if (sortBy) {
    searchParams += `&${new URLSearchParams({ 'sort': getOrder(sortBy) }).toString()}`;
  }
  if (selectedFilter?.length) {
    searchParams += `&${selectedFilter.toString().replace(',', '&')}`;
  }
  // console.log(searchParams);
  return searchParams;
};

async function fetchListService(page: number, dispatch: any, sortBy?: string, selectedFilter?: string[]) {
  let res;
  try {
    dispatch(setApiStatus(statusCodes.requesting));
    const url: string = getUrl(page, API_URL, sortBy, selectedFilter);
    const result = await fetch(encodeURI(url));
    res = await result.json();
    dispatch(setApiStatus(statusCodes.successful));
  } catch (ex) {
    dispatch(setApiStatus(statusCodes.failed));
  }
  return res?.data;
}

export const fetchList = (page: number, sortBy?: string, selectedFilter?: string[]) => {
  return (dispatch: any) => {
    return fetchListService(page, dispatch, sortBy, selectedFilter).then(
      (products) => {
        dispatch(setDataList(products, sortBy, selectedFilter));
      },
      (error) => {
        // console.error(error);
      }
    ).catch(() => { });
  };
};


