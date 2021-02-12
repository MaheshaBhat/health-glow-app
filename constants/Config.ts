import layout from './Layout';


export const API_URL = 'https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris&page=0:20';

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


