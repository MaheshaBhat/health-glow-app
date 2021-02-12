import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AppProvider from './context';
import store from './store';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <AppProvider>
            <ActionSheetProvider>
              <>
                <StatusBar />
                <Navigation colorScheme={colorScheme} />
              </>
            </ActionSheetProvider>
          </AppProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
