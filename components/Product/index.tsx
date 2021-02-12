import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { AppContext, contextType } from '../../context';

import { Product } from '../../store/types';
import Icon from '../Icon';
import ImageItem from '../Image';
import { View, Text } from '../Themed';

interface Props {
  prod: Product;
  index: number;
  height: number;
  noOfColumns?: number;
}
export default function ProductItem({
  prod,
  index,
  height,
  noOfColumns = 2
}: Props) {
  const [isFavorite, setFavorite] = useState(false);
  const { numOfCol } = useContext<contextType>(AppContext);
  return (
    <View
      style={[
        styles.container,
        {
          height,
          width: numOfCol === 2 ? '50%' : '100%',
          borderLeftWidth: index % 2 === 0 ? 0 : 1
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
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={30}
          color="red"
          onPress={() => setFavorite(!isFavorite)}
        />
      </View>
      <View style={styles.imageStyle}>
        <ImageItem url={prod.skuImageUrl} />
      </View>
      <View style={styles.skuNameStyle}>
        <Text>{prod.skuName}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.priceStyle}>
          <Text style={{ color: '#d0021b' }}>{`₹ ${prod.listPrice}`}</Text>
          <Text
            style={{ color: '#9b9b9b', textDecorationLine: 'line-through' }}
          >
            {`₹ ${prod.defaultPrice}`}
          </Text>
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

      {index % 2 === 1 && index !== 1 && <View style={styles.productSpacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 350,
    borderLeftColor: '#e3e3e3',
    borderLeftWidth: 1,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    padding: '2.5%',
    position: 'relative',
    zIndex: 0
  },
  productSpacer: {
    width: 30,
    height: 20,
    backgroundColor: '#fff',
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
    height: '25%',
    width: '100%'
  },
  footer: {
    height: '10%',
    width: '100%',
    flexDirection: 'row'
  },
  offerTag: {
    backgroundColor: '#d0021b',
    color: '#fff',
    padding: '2%'
  },
  priceStyle: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around'
  },
  ratingStyle: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'flex-end'
  }
});
