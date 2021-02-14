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
import { AppContext, contextType } from '../context';
import Icon from '../components/Icon';
import SubHeader from '../components/SubHeader';
import { View } from '../components/Themed';
import FilterScreen from '../screens/FilterScreen';
import FilterHeader from '../components/FilterHeader';
import DrawerContent from '../components/DrawerContent';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';
import Logo from '../components/Logo';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  const { theme } = useContext(AppContext);
  return (
    <NavigationContainer theme={theme}>
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

const HeaderRight = (props: any) => {
  const navigation = useNavigation();

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
        onPress={() => navigation.navigate('Search')}
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
        headerTitle: () => <Logo />,
        // headerTitleStyle: {
        //   color: '#f37920',
        //   fontSize: 30,
        //   width: '85%'
        // },
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
        headerRight: (props) => <HeaderRight {...props} />,
        headerStatusBarHeight: 0
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Root" component={RootNavigator} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Filter"
        component={FilterScreen}
        initialParams={{ reset: false }}
        options={{
          header: (props) => <FilterHeader {...props} />
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
        header: (props) => <SubHeader {...props} />
      }}
      initialRouteName="Products"
    >
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
