import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearFilter } from '../../store/actions';

import Icon from '../Icon';
import { View, Text } from '../Themed';

const FilterHeader = ({ scene }: any) => {
  const { navigation } = scene.descriptor;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Icon
          name="close"
          size={30}
          color="#f57b02"
          onPress={() => navigation.navigate('Root')}
        />
        <Text>Filter By</Text>
        <TouchableOpacity
          onPress={() => navigation.setParams({ selectedFil: [] })}
        >
          <Text style={{ color: '#f57b02' }}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 54,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 8,
    elevation: 0
  }
});
export default FilterHeader;
