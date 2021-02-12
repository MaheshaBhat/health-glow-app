import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenObj = Dimensions.get('screen');

export default {
  window: {
    width,
    height
  },
  screen: {
    width: screenObj.width,
    height: screenObj.height,
  },
  isSmallDevice: width < 375
};
