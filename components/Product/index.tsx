import React, { useState, useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { AppContext, contextType } from '../../context';

import { Product } from '../../store/types';
import Icon from '../Icon';
import ImageItem from '../Image';
import { View, Text } from '../Themed';

const bestSellerIcon = require('../../assets/images/bestseller.png');

interface Props {
  prod: Product;
  index: number;
  height: number;
}
export default function ProductItem({ prod, index, height }: Props) {
  const [isFavorite, setFavorite] = useState(prod.inWishList);
  const { numOfCol, theme } = useContext<contextType>(AppContext);
  return (
    <View
      style={[
        styles.container,
        {
          height,
          width: numOfCol === 2 ? '50%' : '100%',
          borderRightWidth: index % 2 === 1 || numOfCol === 1 ? 0 : 1,
          backgroundColor: theme.colors.background
        }
      ]}
    >
      <View style={styles.header}>
        <View>
          {prod.skuDiscPercentage !== 0 && (
            <Text style={styles.offerTag}>
              {`${prod.skuDiscPercentage}% off`}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={bestSellerIcon}
            resizeMode="center"
            style={{ height: 30, width: 30, marginRight: 10 }}
          />
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color="red"
            onPress={() => setFavorite(!isFavorite)}
          />
        </View>
      </View>
      <View style={styles.imageStyle}>
        <ImageItem url={prod.skuImageUrl} />
      </View>
      <View style={styles.skuNameStyle}>
        <Text style={{ fontSize: 13 }} ellipsizeMode="tail">
          {prod.skuName}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.priceStyle}>
          <Text style={{ color: '#d0021b', marginRight: 10 }}>
            {`₹ ${prod.listPrice}`}
          </Text>
          {prod.skuDiscPercentage !== 0 && (
            <Text
              style={{
                color: '#9b9b9b',
                textDecorationLine: 'line-through'
              }}
            >
              {`₹ ${prod.defaultPrice}`}
            </Text>
          )}
        </View>
        <View style={styles.ratingStyle}>
          <Icon
            name={'star'}
            size={15}
            color={'#f57b02'}
            iconStyle={{ paddingHorizontal: 3 }}
            isPressable
          />
          <Text style={{ color: '#f57b02', paddingHorizontal: 3 }}>3</Text>
        </View>
      </View>

      {index % 2 === 1 && numOfCol === 2 && (
        <View
          style={[
            styles.productSpacer,
            { backgroundColor: theme.colors.background }
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 350,
    borderRightColor: '#e3e3e3',
    borderRightWidth: 1,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    padding: '2.5%',
    position: 'relative',
    zIndex: 0
  },
  productSpacer: {
    width: 30,
    height: 20,
    position: 'absolute',
    top: -10,
    left: -15,
    zIndex: 1
  },
  header: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageStyle: {
    height: '55%',
    width: '100%'
  },
  skuNameStyle: {
    height: '27%',
    width: '100%'
  },
  footer: {
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  offerTag: {
    backgroundColor: '#d0021b',
    color: '#fff',
    padding: '2%'
  },
  priceStyle: {
    flexDirection: 'row',
    // width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ratingStyle: {
    flexDirection: 'row',
    // width: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
