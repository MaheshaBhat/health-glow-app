import statusCodes from '../api-service/status-codes';


enum AverageRating {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5

}
export interface Product {
  brandUrlLink: string,
  categoryName: string,
  categoryUrlLink: string,
  deepLinkUrl: string,
  defaultPrice: 499,
  inWishList: boolean,
  isAvailable: boolean,
  listPrice: number,
  parentCategoryName: string,
  skuAverageRating: AverageRating,
  skuDermatImage?: string,
  skuDermatRating: AverageRating,
  skuDiscPercentage: number,
  skuId: string,
  skuImageUrl: string,
  skuName: string
  skuPromoText?: string,
  skuTag?: string,
  skuUrlLink: string,
  superCategoryName: string,
  tagImageUrlGrid?: string,
  tagImageUrlList?: string,
}

export interface Bucket {
  docCount: number,
  isSelected: boolean,
  key: string,
  showDocCount: boolean,
  text: string,
}
export interface Aggregation {
  buckets: Bucket[],
  isForMultiSelection: boolean,
  name: string,
  text: string,
}
export interface Order {
  text: string, isSelected: boolean, key: string, order: string
}

export interface Sort {
  name: string,
  orders: Order[],
  text: string,
}
export interface SystemState {
  loggedIn: boolean;
  session: string;
  userName: string;
  apiStatus: number;
  products: Product[],
  totalCount: number,
  sortBy: string,
  selectedFilter: string[],
  aggregation: Aggregation[],
  sortList: Sort[],
  title: string
}

