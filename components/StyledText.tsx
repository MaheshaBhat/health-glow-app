import * as React from 'react';

import { Text, TextProps } from './Themed';

export default function StyledText(props: TextProps) {
  const { style, children } = props;
  return <Text {...props} style={[style, { fontFamily: 'rubik' }]} >{children}</Text>;
}
