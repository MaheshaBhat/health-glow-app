import React, { useContext } from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { AppContext, contextType } from '../context';
// import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
): string {
  const { theme } = useContext<contextType>(AppContext);
  // const themeType = theme.dark ? 'dark' : 'light';
  return theme.colors[colorName];
  // const colorFromProps = props[themeType];
  // if (colorFromProps) {
  //   return colorFromProps;
  // } else {
  //   return Colors[themeType].colors.[colorName] as string;
  // }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultText
      style={[{ color, fontFamily: 'rubik' }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
