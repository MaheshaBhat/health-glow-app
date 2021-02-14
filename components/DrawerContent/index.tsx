import React, { useCallback, useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { AppContext, contextType } from '../../context';
import { View, Text } from '../Themed';

const leftMenuConfig = [
  'Home',
  'Shop',
  'Brands',
  'Find Our Store',
  'About H&G',
  'Contact US',
  'Change Theme'
];

export default function DrawerContent({
  navigation
}: DrawerContentComponentProps) {
  const { setThemeType, theme } = useContext<contextType>(AppContext);

  const handleClick = useCallback(
    (index: number) => {
      if (index === 0) {
        navigation.navigate('Home', { screen: 'Home' });
      } else if (index === 1) {
        navigation.navigate('Home', { screen: 'Shop' });
      } else if (index === 2) {
        navigation.navigate('Root');
      } else if (index === 6) {
        setThemeType(theme.dark ? 'light' : 'dark');
      }
    },
    [navigation, setThemeType, theme.dark]
  );
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.loginButtonStyle}>
        <Text>Sign in / Sign up</Text>
      </TouchableOpacity>
      {leftMenuConfig.map((it, i) => (
        <TouchableOpacity
          key={it}
          style={styles.leftMenuBtnStyle}
          onPress={() => handleClick(i)}
        >
          <Text>{it}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginButtonStyle: {
    paddingVertical: '10%',
    backgroundColor: '#f37920',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftMenuBtnStyle: {
    paddingVertical: '6%',
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingLeft: '5%'
  }
});
