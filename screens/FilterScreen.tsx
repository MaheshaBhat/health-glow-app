import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from '../components/Themed';
import { AppContext, contextType } from '../context';
import { FilterConfig, FilterType } from '../constants/Config';
import { getSortBy, getSortFilter } from '../store/getters';
import { fetchList } from '../api-service';

const filterList = Object.keys(FilterConfig);
const convertString = (filter: string, item: string) => {
  return `filters-${filter
    .toLocaleLowerCase()
    .replace(' ', '_')}:${item.toLocaleLowerCase().replace(' ', '-')}`;
};
export default function FilterScreen({ navigation, route }: any) {
  const { theme } = useContext<contextType>(AppContext);
  const sortFilter = useSelector(getSortFilter);
  const { selectedFil } = route.params as any;
  const [filter, setFilter] = useState<string>(FilterType.CATEGORY);
  const [selectedFilter, setSelectedFilterItem] = useState<string[]>(sortFilter.selectedFilter);
  const dispatch = useDispatch();

  // clear all functionality
  useEffect(() => {
    if (selectedFil !== undefined) {
      setFilter(FilterType.CATEGORY);
      setSelectedFilterItem(selectedFil);
    }
  }, [selectedFil]);

  return (
    <View style={styles.container}>
      <View style={styles.filterStyle}>
        <View style={styles.leftMenu}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {filterList.map((item, i) => (
              <Pressable
                key={item}
                style={[
                  styles.filterItemStyle,
                  filter === item && styles.active
                ]}
                onPress={() => setFilter(item)}
              >
                <Text>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {FilterConfig[filter].map((item, i) => (
              <Pressable
                key={item}
                style={[styles.filterContentItemStyle]}
                onPress={() => {
                  const val = convertString(filter, item);

                  let selected = selectedFilter.slice(0);
                  const findIndex = selectedFilter.indexOf(val);
                  if (findIndex !== -1) {
                    selected = [
                      ...selectedFilter.slice(0, findIndex),
                      ...selectedFilter.slice(findIndex + 1)
                    ];
                  } else {
                    selected = [...selectedFilter, val];
                  }
                  setSelectedFilterItem([...selected]);
                }}
              >
                <Text>{item}</Text>
                <Ionicons
                  name={
                    selectedFilter.includes(convertString(filter, item))
                      ? 'checkbox'
                      : 'checkbox-outline'
                  }
                  color="#f57b02"
                  size={20}
                  style={{ marginRight: 5 }}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={async () => {
          await dispatch(fetchList(1, sortFilter.sortBy, selectedFilter));
          navigation.navigate('Root');
        }}
      >
        <Text style={{ color: theme.colors.background }}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
    borderTopColor: '#dcdcdc',
    borderTopWidth: 1,
    elevation: 15
  },
  filterStyle: { height: '92%', width: '100%', flexDirection: 'row' },
  leftMenu: {
    height: '100%',
    width: '40%',
    flex: 1,
    borderRightColor: '#b4b4b4',
    borderRightWidth: 1
  },
  content: { height: '100%', width: '60%', paddingLeft: '5%' },
  submitContainer: {
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57b02'
  },
  filterItemStyle: {
    // height: 100,
    justifyContent: 'center',
    width: '100%',
    paddingVertical: '12%',
    paddingLeft: '10%'
  },
  active: {
    backgroundColor: '#f5f5f5'
  },
  filterContentItemStyle: {
    flexDirection: 'row',
    paddingVertical: '12%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
