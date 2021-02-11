import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text>Products Screen</Text>
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
