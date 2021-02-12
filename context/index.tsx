import React, { useState, ReactChild, createContext } from 'react';
import { Theme } from '@react-navigation/native';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export type contextType = {
  theme: Theme;
  numOfCol?: number;
  setThemeType?: Function;
  setNumOfCol: Function;
};
export const AppContext = createContext<contextType>({
  theme: Colors.light,
  setThemeType: () => {},
  setNumOfCol: () => {},
  numOfCol: 2
});

interface Props {
  children: ReactChild;
}
export default (props: Props) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState(colorScheme);
  const [numOfCol, setNumOfCol] = useState(2);
  const { children } = props;

  return (
    <AppContext.Provider
      value={{
        theme: themeType === 'dark' ? Colors.dark : Colors.light,
        setThemeType,
        numOfCol,
        setNumOfCol
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
