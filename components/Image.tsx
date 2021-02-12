import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { View, Text } from './Themed';

interface Props {
  url: string;
}

export default function ImageItem({ url }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: url
        }}
        resizeMode="center"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    flex: 1
  }
});
