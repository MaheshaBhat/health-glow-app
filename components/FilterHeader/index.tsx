import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '../Icon';
import { View, Text } from '../Themed';
import { fetchList } from '../../api-service';
import { getSortBy } from '../../store/getters';

const FilterHeader = ({ scene }: any) => {
  const { navigation } = scene.descriptor;
  const dispatch = useDispatch();
  const sortBy = useSelector(getSortBy);

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
          onPress={async () => {
            await dispatch(fetchList(1, sortBy, [],false, true));
            navigation.setParams({ reset: true });
          }}
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
