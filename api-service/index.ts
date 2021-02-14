import { API_URL, getOrder } from '../constants/Config';
import statusCodes from './status-codes';
import { setApiStatus, setDataList } from '../store/actions';
import { Order } from '../store/types';

const getUrl = (page: number, url: string, sortBy?: Order, selectedFilter?: string[]) => {
  let searchParams: string = `${url}&page=${20 * (page - 1)}:20`;
  if (sortBy?.key) {
    searchParams += `&${new URLSearchParams({ 'sort': `${sortBy.key}:${sortBy.order}` }).toString()}`;
  }
  if (selectedFilter?.length) {
    const newfilter = selectedFilter.map((ele) => {
      let str = '';
      if (ele.includes('price')) {
        // eslint-disable-next-line radix
        str = ele.replace('price=', ' ').split('-').map(el => parseInt(el)).join(':');
        return `price=${str}`;
      }
      if (ele.includes('offer')) {
        // eslint-disable-next-line radix
        str = ele.replace('offer=', ' ').split('-').map(el => parseInt(el)).join(':');
        return `offer=${str}`;
      }
      return ele;
    });
    searchParams += `&${newfilter.join('&')}`;
  }
  // console.log(searchParams);
  return searchParams;
};

async function fetchListService(page: number, dispatch: any, sortBy?: Order, selectedFilter?: string[]) {
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

export const fetchList = (page: number, sortBy?: Order, selectedFilter?: string[], isFilter?: boolean, isClear?:boolean) => {
  return (dispatch: any) => {
    return fetchListService(page, dispatch, sortBy, selectedFilter).then(
      (res) => {
        dispatch(setDataList(page, res, sortBy, selectedFilter, isFilter, isClear));
      },
      (error) => {
        // console.error(error);
      }
    ).catch(() => { });
  };
};

