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
export interface SystemState {
  loggedIn: boolean;
  session: string;
  userName: string;
  apiStatus: number;
  products: Product[],
  totalCount: number
}

