import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';

const CustomCollapseText = ({
  label,
  text = '',
  labelStyle = styles.label,
  textStyle = styles.text,
  numberOfLines = 4,
}: {
  label?: string;
  text?: string;
  labelStyle?: any;
  textStyle?: any;
  numberOfLines?: number;
}) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= numberOfLines); //to check the text is more than 4 lines or not
  }, []);

  return (
    <View style={styles.container}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : numberOfLines}
        style={textStyle}>
        {text}
        {'   '}
        {lengthMore ? (
          <Text onPress={toggleNumberOfLines} style={styles.moreText}>
            {textShown ? 'See less' : 'See more'}
          </Text>
        ) : null}
      </Text>
    </View>
  );
};

export default CustomCollapseText;

const styles = StyleSheet.create({
  container: {},
  moreText: {
    color: Colors.PRIMARY,
    fontSize: scale(14),
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
  text: {
    color: Colors.PLACEHOLDER,
    fontSize: scale(14),
    fontFamily: fontFamily.regular,
  },
  label: {
    color: Colors.BLACK_1,
    fontSize: scale(12),
    fontFamily: fontFamily.regular,
    marginBottom: verticalScale(6),
  },
});
