import React, { useState, ReactChild, createContext } from 'react';
import { Theme } from '@react-navigation/native';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export type contextType = {
  theme: Theme;
  numOfCol?: number;
  setThemeType: Function;
  setNumOfCol: Function;
  clearAllFilter?: Function;
  setClearAll?: Function;
};
export const AppContext = createContext<contextType>({
  theme: Colors.light,
  setThemeType: () => {},
  setNumOfCol: () => {},
  numOfCol: 2,
  clearAllFilter: () => {},
  setClearAll: () => {}
});

interface Props {
  children: ReactChild;
}
export default (props: Props) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState(colorScheme);
  const [numOfCol, setNumOfCol] = useState(2);
  const { children } = props;
  const [clearAllFilter, setClearAll] = useState(Function);

  return (
    <AppContext.Provider
      value={{
        theme: themeType === 'dark' ? Colors.dark : Colors.light,
        setThemeType,
        numOfCol,
        setNumOfCol,
        clearAllFilter,
        setClearAll
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
