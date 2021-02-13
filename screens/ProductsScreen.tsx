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
import { getProducts, getSortFilter } from '../store/getters';
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
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(true);
  const { sortBy, selectedFilter } = useSelector(getSortFilter);
  // console.log(useHeaderHeight());

  useEffect(() => {
    onEndReachedCalledDuringMomentum.current = true;
    page.current = 1;
    dispatch(fetchList(page.current, sortBy, selectedFilter));
  }, [dispatch, page, selectedFilter, sortBy]);

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
      if (!onEndReachedCalledDuringMomentum.current) {
        page.current += page.current;
        dispatch(fetchList(page.current, sortBy, selectedFilter));
        onEndReachedCalledDuringMomentum.current = true;
      }
    },
    [dispatch, selectedFilter, sortBy]
  );

  const { numOfCol } = useContext<contextType>(AppContext);
  return (
    // <SafeAreaView style={styles.flatList}>
    <View style={styles.flatList}>
      <FlatList
        renderItem={renderItem}
        data={products}
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
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
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
