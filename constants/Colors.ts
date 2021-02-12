import {
  DefaultTheme,
  DarkTheme,
  Theme
} from '@react-navigation/native';

// const tintColorLight = '#2f95dc';
// const tintColorDark = '#fff';

export type themeType = {
  light: Theme,
  dark: Theme;
}
export default {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: '#000',
      background: '#fff',
    },
    // tint: tintColorLight,
    // tabIconDefault: '#ccc',
    // tabIconSelected: tintColorLight
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      text: '#fff',
      background: '#000',
    },
    // tint: tintColorDark,
    // tabIconDefault: '#ccc',
    // tabIconSelected: tintColorDark
  }
};
