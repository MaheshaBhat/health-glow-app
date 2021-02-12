import React, { useEffect, useCallback, useContext } from 'react';
import { StyleSheet, ScrollView, FlatList, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import { useHeaderHeight } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import { View, Text } from '../components/Themed';
import { getProducts } from '../store/getters';
import { fetchList } from '../api-service';
import ProductItem from '../components/Product';
import layout from '../constants/Layout';
import { AppContext, contextType } from '../context';

const VIEW_HEIGHT = layout.screen.height - Constants.statusBarHeight - 54 - 90;
const CAROUSEL_HEIGHT = VIEW_HEIGHT - VIEW_HEIGHT * 0.03;
const ITEM_HEIGHT = CAROUSEL_HEIGHT / 2;

export default function ProductScreen() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  // console.log(useHeaderHeight());

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

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
        extraData={numOfCol}
      />
      {/* {numOfCol === 1 ? (
        <FlatList
          renderItem={renderItem}
          data={products}
          keyExtractor={(item) => item?.skuId}
          contentContainerStyle={styles.container}
          numColumns={1}
          scrollEnabled
          horizontal={false}
          extraData={numOfCol}
        />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={products}
          keyExtractor={(item) => item?.skuId}
          contentContainerStyle={styles.container}
          numColumns={2}
          scrollEnabled
          horizontal={false}
        />
      )} */}
    </View>
    // </SafeAreaView>
    // <ScrollView contentContainerStyle={styles.container}>
    //   {products.map((prod, i) => (
    //     <ProductItem prod={prod} index={i} key={prod?.skuId} />
    //   ))}
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: '1.5%'
    // marginBottom: '1%'
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
