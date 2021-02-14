/* eslint-disable no-shadow */
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
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
import { getAggregation, getSortFilter } from '../store/getters';
import { fetchList } from '../api-service';

const equals = function (arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
};

export default function FilterScreen({ navigation }: any) {
  // const resetRef = useRef(route.params as any);
  const { theme } = useContext<contextType>(AppContext);
  const sortFilter = useSelector(getSortFilter);
  const aggregations = useSelector(getAggregation);
  const curIndexRef = useRef(0);
  const [filter, setFilter] = useState<string>(aggregations[0]?.name);
  const multiSelRef = useRef(aggregations[0]?.isForMultiSelection);
  const curSelection = useRef(aggregations[0]?.name);
  const [currentBuckets, setCurrentBucket] = useState(aggregations[0]?.buckets);
  const [selectedFilter, setSelectedFilterItem] = useState<string[]>(
    sortFilter.selectedFilter
  );
  const isClear = useSelector((state) => state.isClear);
  const dispatch = useDispatch();

  const setToDefault = useCallback(
    (selectedFilterArg, currentIndex) => {
      setFilter(aggregations[currentIndex]?.name);
      setCurrentBucket([...aggregations[currentIndex]?.buckets]);
      multiSelRef.current = aggregations[currentIndex]?.isForMultiSelection;
      setSelectedFilterItem([...selectedFilterArg]);
    },
    [aggregations]
  );

  const changeAggregate = useCallback(
    async (isForMultiSelection, name) => {
      multiSelRef.current = isForMultiSelection;
      curSelection.current = name;

      await dispatch(
        fetchList(1, sortFilter.sortBy, selectedFilter, true, false)
      );
    },
    [dispatch, selectedFilter, sortFilter.sortBy]
  );

  // clear all
  // useEffect(() => {
  //   if (resetRef.current) {
  //     curIndexRef.current = 0;
  //     setToDefault([]);
  //     resetRef.current = false;
  //   }
  // }, [resetRef, setToDefault]);

  useEffect(() => {
    if (!isClear) {
      curIndexRef.current = aggregations.findIndex(
        (ag) => ag.name === curSelection.current
      );
      if (curIndexRef.current !== -1) {
        // setFilter(aggregations[curIndexRef.current]?.name);
        // setCurrentBucket([...aggregations[curIndexRef.current]?.buckets]);
        setToDefault(selectedFilter, curIndexRef.current);
      } else {
        setToDefault(selectedFilter, 0);
      }
    } else {
      curIndexRef.current = 0;
      setToDefault([], 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aggregations, navigation, setToDefault, isClear]);

  // on focus set to default values
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () =>
      setToDefault(sortFilter.selectedFilter, 0)
    );
    return unsubscribe;
  }, [navigation, setToDefault, sortFilter.selectedFilter]);

  // useEffect(() => {
  //   async function update() {
  //     // clear all
  //     if (isReset) {
  //       await dispatch(fetchList(1, sortFilter.sortBy, []));
  //       setToDefault([]);
  //     }
  //   }
  //   update();
  // }, [dispatch, isReset, setToDefault, sortFilter.sortBy]);

  return (
    <View style={styles.container}>
      <View style={styles.filterStyle}>
        <View style={styles.leftMenu}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {aggregations?.length &&
              aggregations.map(({ name, text, isForMultiSelection }) => (
                <Pressable
                  key={name}
                  style={[
                    styles.filterItemStyle,
                    filter === name && {
                      backgroundColor: theme.dark ? '#7d7b7b' : '#f5f5f5'
                    }
                  ]}
                  onPress={() => changeAggregate(isForMultiSelection, name)}
                >
                  <Text>{text}</Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {currentBuckets?.length &&
              currentBuckets.map(({ showDocCount, key, text, docCount }, i) => (
                <Pressable
                  key={key}
                  style={[styles.filterContentItemStyle]}
                  onPress={() => {
                    let selected = selectedFilter.slice(0);
                    const val = `${filter}=${key}`;
                    const findIndex = selectedFilter.indexOf(val);
                    if (findIndex !== -1) {
                      selected = [
                        ...selectedFilter.slice(0, findIndex),
                        ...selectedFilter.slice(findIndex + 1)
                      ];
                    } else {
                      // for multi selection remove remaining filter
                      if (!multiSelRef.current) {
                        for (let ind = 0; ind < selected.length; ind++) {
                          if (selected[ind].includes(filter)) {
                            selected = [];
                            break;
                          }
                        }
                      }
                      selected = [...selected, val];
                    }
                    setSelectedFilterItem([...selected]);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '85%',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Text>{text}</Text>
                    {showDocCount && (
                      <View>
                        <Text>{`  (${docCount})`}</Text>
                      </View>
                    )}
                  </View>
                  <Ionicons
                    name={
                      selectedFilter?.length &&
                      selectedFilter.includes(`${filter}=${key}`)
                        ? 'checkbox'
                        : 'checkbox-outline'
                    }
                    color="#f57b02"
                    size={20}
                    style={{ paddingRight: 10 }}
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
          setToDefault([], 0);
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
