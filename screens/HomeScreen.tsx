import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const Tab = createMaterialTopTabNavigator();

function HomeTab() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}
function ShopTab() {
  return (
    <View style={styles.container}>
      <Text>Shop</Text>
    </View>
  );
}
function StoriesTab() {
  return (
    <View style={styles.container}>
      <Text>Stories</Text>
    </View>
  );
}
function OffersTab() {
  return (
    <View style={styles.container}>
      <Text>Offers</Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Shop" component={ShopTab} />
      <Tab.Screen name="Stories" component={StoriesTab} />
      <Tab.Screen name="Offers" component={OffersTab} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
