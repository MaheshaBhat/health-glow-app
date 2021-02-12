import React, { useContext, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from '../Themed';
import { AppContext, contextType } from '../../context';
import { getSortBy, SortConfig } from '../../constants/Config';
import { fetchList } from '../../api-service';
import { getTotalCount } from '../../store/getters';

export default function SubHeader({
  scene,
  previous,
  navigation
}: StackHeaderProps) {
  // const { options } = scene.descriptor;
  const { numOfCol, setNumOfCol, theme } = useContext<contextType>(AppContext);
  const { showActionSheetWithOptions } = useActionSheet();
  const totalNumOfProducts = useSelector(getTotalCount);
  const dispatch = useDispatch();

  const onOpenActionSheet = useCallback(() => {
    const options = [
      SortConfig.Popularity,
      SortConfig.Discount,
      SortConfig.HighToLow,
      SortConfig.LowToHigh,
      'Close'
    ];
    // const destructiveButtonIndex = 0;
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: 4,
        destructiveColor: 'grey',
        containerStyle: {
          alignItems: 'center',
          backgroundColor: theme.colors.background,
          justifyContent: 'center'
        },
        textStyle: {
          textAlign: 'center',
          color: theme.colors.text,
          width: '100%'
        }
      },
      (sortIndex) => {
        if (sortIndex !== 4) {
          dispatch(fetchList(1, getSortBy(sortIndex)));
        }
      }
    );
  }, [
    dispatch,
    showActionSheetWithOptions,
    theme.colors.background,
    theme.colors.text
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainerStyle}>
        <Text style={styles.textStyle}>
          {"L'Oreal Paris - "}
          <Text style={[styles.textStyle, { color: '#9b9b9b' }]}>
            {`${totalNumOfProducts} products`}
          </Text>
        </Text>
      </View>
      <View style={styles.subContainerStyle}>
        <TouchableOpacity
          style={[styles.cardStyle, { width: 40, height: 40 }]}
          onPress={() => setNumOfCol(numOfCol === 2 ? 1 : 2)}
        >
          <Ionicons name={'grid-outline'} size={15} color={'#636363'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnStyle, styles.cardStyle]}
          onPress={onOpenActionSheet}
        >
          <Text style={styles.textStyle}>{'Sort'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyle, styles.cardStyle]}>
          <Text style={styles.textStyle}>{'Filter'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 8
  },
  subContainerStyle: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 15
  },
  btnStyle: {
    height: 40,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  cardStyle: {
    borderColor: '#b4b4b4',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
