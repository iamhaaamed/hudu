import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5 screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const screenSize = Math.sqrt(width * height) / 100;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const scaleSpace = (size: number) => {
  ((height / guidelineBaseHeight) * size).toFixed(2);
};
const scaleSpaceW = (size: number) => {
  (width / guidelineBaseWidth) * size;
};

const headerHeight = height > 700 ? verticalScale(40) : verticalScale(20);

const fontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

const fontFamily = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};

export {
  scaleSpace,
  scale,
  verticalScale,
  moderateScale,
  screenSize,
  scaleSpaceW,
  fontWeight,
  fontFamily,
  headerHeight,
};
