import {
  NavigationContainer,
  useNavigation,
  DrawerActions
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { ColorSchemeName, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import ProductsScreen from '../screens/ProductsScreen';
import LinkingConfiguration from './LinkingConfiguration';

// import Colors, { themeType } from '../constants/Colors';
import { AppContext } from '../context';
import Icon from '../components/Icon';
import SubHeader from '../components/SubHeader';
import { View } from '../components/Themed';
import FilterScreen from '../screens/FilterScreen';
import Header from '../components/Header';
import FilterHeader from '../components/FilterHeader';
import DrawerContent from '../components/DrawerContent';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  const { theme } = useContext(AppContext);
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const HeaderLeft = () => {
  const { dispatch } = useNavigation();
  return (
    <TouchableOpacity onPress={() => dispatch(DrawerActions.toggleDrawer())}>
      <Ionicons
        name={'menu'}
        size={40}
        color={'#636363'}
        style={{ marginLeft: 12 }}
      />
    </TouchableOpacity>
  );
};

const HeaderRight = () => {
  const { dispatch } = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        name={'bookmark-outline'}
        size={30}
        color={'#636363'}
        onPress={() => {}}
        iconStyle={{ marginRight: 5 }}
      />
      <Icon
        name={'search-outline'}
        size={30}
        color={'#636363'}
        onPress={() => {}}
        iconStyle={{ marginRight: 5 }}
      />
      <Icon
        name={'basket-outline'}
        size={30}
        color={'#636363'}
        onPress={() => {}}
        iconStyle={{ marginRight: 15 }}
      />
    </View>
  );
};

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: 'health & glow',
        headerTitleStyle: {
          color: '#f37920',
          fontSize: 30,
          width: '85%'
        },
        headerStyle: {
          elevation: 0,
          // backgroundColor: 'red',
          height: 54,
          width: '100%',
          marginTop: Constants.statusBarHeight,
          paddingTop: 0,
          justifyContent: 'center'
        },
        headerLeft: HeaderLeft,
        headerRight: HeaderRight,
        headerStatusBarHeight: 0
      }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Root" component={RootNavigator} />
      <Drawer.Screen
        name="Filter"
        initialParams={{ selectedFil: [] }}
        component={FilterScreen}
        options={{
          header: FilterHeader
        }}
      />
    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: SubHeader
      }}
    >
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
