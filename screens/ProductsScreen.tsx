import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch, sha } from 'react-redux';

import { View, Text } from '../components/Themed';
import StyledText from '../components/StyledText';
import { getProducts } from '../store/getters';
import { fetchList } from '../api-service';

export default function ProductScreen() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.totalCount);
  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <StyledText>Products Screen</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
