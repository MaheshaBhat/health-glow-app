import React, { useState, ReactChild, createContext } from 'react';
import { Theme } from '@react-navigation/native';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export type contextType = {
  theme: Theme;
  setThemeType?: Function;
};
export const AppContext = createContext<contextType>({
  theme: Colors.light,
  setThemeType: () => {}
});

interface Props {
  children: ReactChild;
}
export default (props: Props) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState(colorScheme);
  const { children } = props;

  return (
    <AppContext.Provider
      value={{
        theme: themeType === 'dark' ? Colors.dark : Colors.light,
        setThemeType
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
