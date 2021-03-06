import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ProductScreen: 'product',
          NotFound: '*',
          Search: 'Search',
          Filter: 'filter',
        }
      },
    }
  }
};
