import layout from './Layout';


export const API_URL = 'https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris';

export enum SortConfig {
    Popularity = 'Popularity',
    Discount = 'Discount',
    HighToLow = 'High - Low',
    LowToHigh = 'Low - High',
}

export const getSortBy = (index) => {
    switch (index) {
        case 0: return SortConfig.Popularity;
        case 1: return SortConfig.Discount;
        case 2: return SortConfig.HighToLow;
        case 3: return SortConfig.LowToHigh;
        default: return SortConfig.Popularity;
    }
};

export const getOrder = (type) => {
    switch (type) {
        case SortConfig.Popularity: return 'priority:asc';
        case SortConfig.Discount: return 'discount:desc';
        case SortConfig.HighToLow: return 'price:desc';
        case SortConfig.LowToHigh: return 'price:asc';
        default: return ':asc';
    }
};

export enum FilterType {
    CATEGORY = 'Category',
    BRAND = 'Brand',
    GENDER = 'Gender',
    PRICE = 'Price',
    OFFER = 'Offer',
    SHADE = 'Shade',
    LOOK = 'Look',
    FINISH = 'Finish',
    AVAILABILITY = 'Availability'

}
export const FilterConfig = {
    [FilterType.CATEGORY]: ['Lipstick', 'Hair colours', 'Shampoo'],
    [FilterType.BRAND]: ['loreal-paris'],
    [FilterType.GENDER]: ['Women', 'Unisex', 'Men'],
    [FilterType.PRICE]: ['1:250', '250:500'],
    [FilterType.OFFER]: ['Special Offer'],
    [FilterType.SHADE]: [],
    [FilterType.LOOK]: [],
    [FilterType.FINISH]: [],
    [FilterType.AVAILABILITY]: [],
};


