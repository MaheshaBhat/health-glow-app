import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StyledText from '../components/StyledText';

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <StyledText>Products Screen</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
