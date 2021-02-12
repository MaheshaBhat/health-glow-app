import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { View, Text } from '../Themed';
import Icon from '../Icon';
import { AppContext, contextType } from '../../context';

export default function SubHeader({
  scene,
  previous,
  navigation
}: StackHeaderProps) {
  // const { options } = scene.descriptor;
  const { numOfCol, setNumOfCol } = useContext<contextType>(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.subContainerStyle}>
        <Text style={styles.textStyle}>
          {"L'Oreal Paris - "}
          <Text style={[styles.textStyle, { color: '#9b9b9b' }]}>
            {'9 products'}
          </Text>
        </Text>
      </View>
      <View style={styles.subContainerStyle}>
        <TouchableOpacity
          style={[
            styles.cardStyle,
            { width: 40, height: 40, borderColor: '#f8f8f8' }
          ]}
          onPress={() => setNumOfCol(numOfCol === 2 ? 1 : 2)}
        >
          <Ionicons name={'grid-outline'} size={15} color={'#636363'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyle, styles.cardStyle]}>
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
    fontSize: 15,
    color: '#000000'
  },
  btnStyle: {
    height: 40,
    width: 90,
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
