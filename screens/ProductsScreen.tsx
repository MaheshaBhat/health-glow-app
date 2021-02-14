import React, {
  useEffect,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import { useHeaderHeight } from '@react-navigation/stack';
import Constants from 'expo-constants';

import { View, Text } from '../components/Themed';
import { getProducts, getSortFilter, getTotalCount } from '../store/getters';
import { fetchList } from '../api-service';
import ProductItem from '../components/Product';
import layout from '../constants/Layout';
import { AppContext, contextType } from '../context';

const VIEW_HEIGHT = layout.screen.height - Constants.statusBarHeight - 54 - 90;
const CAROUSEL_HEIGHT = VIEW_HEIGHT - VIEW_HEIGHT * 0.02;
const ITEM_HEIGHT = CAROUSEL_HEIGHT / 2;

export default function ProductScreen() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const totalCount = useSelector(getTotalCount);
  const onEndReachedCalledDuringMomentum = useRef(true);
  const { sortBy, selectedFilter } = useSelector(getSortFilter);
  const pageNum = useSelector((state) => state.page);
  const page = useRef(pageNum);
  // const flatListRef = useRef<FlatListProps>(null);

  useEffect(() => {
    onEndReachedCalledDuringMomentum.current = true;
    page.current = 1;
    dispatch(fetchList(page.current, sortBy, []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    page.current = pageNum;
    // if (flatListRef) {
    //   flatListRef.current.scrollsToTop();
    // }
  }, [pageNum]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <ProductItem
        prod={item}
        index={index}
        key={item?.skuId}
        height={ITEM_HEIGHT}
      />
    ),
    []
  );
  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    }),
    []
  );
  const onEndReached = useCallback(
    ({ distanceFromEnd }) => {
      if (
        !onEndReachedCalledDuringMomentum.current &&
        page.current * 20 <= totalCount
      ) {
        page.current += page.current;
        dispatch(fetchList(page.current, sortBy, selectedFilter));
        onEndReachedCalledDuringMomentum.current = true;
      }
    },
    [dispatch, selectedFilter, sortBy, totalCount]
  );

  const { numOfCol } = useContext<contextType>(AppContext);
  return (
    // <SafeAreaView style={styles.flatList}>
    <View style={styles.flatList}>
      <FlatList
        renderItem={renderItem}
        data={products || []}
        key={numOfCol === 2 ? '##' : '#'}
        keyExtractor={(item) => item?.skuId}
        contentContainerStyle={styles.container}
        numColumns={numOfCol}
        scrollEnabled
        horizontal={false}
        getItemLayout={getItemLayout}
        extraData={numOfCol}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.75}
        scrollsToTop={pageNum === 1}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: '1%'
  },
  container: {
    flexGrow: 1,
    // height: '100%',
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    // overflow: 'scroll'
    paddingHorizontal: '1.5%'
  }
});
