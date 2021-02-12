import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  name: any;
  size: number;
  color: string;
  iconStyle?: StyleProp<TextStyle>;
  isPressable?: boolean;
}

export default ({
  onPress = () => {},
  name = 'menu',
  size = 15,
  color = 'black',
  iconStyle = {},
  isPressable = false
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isPressable}>
      <Ionicons name={name} size={size} color={color} style={iconStyle} />
    </TouchableOpacity>
  );
};
