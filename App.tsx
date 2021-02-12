import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AppProvider from './context';
import store from './store';
import Loader from './components/Loader';

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
                <Loader />
              </>
            </ActionSheetProvider>
          </AppProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
