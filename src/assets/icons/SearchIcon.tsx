import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function SearchIcon({
  size = scale(24),
  fillColor = Colors.BLACK_3,
  strokeColor = Colors.BLACK_1,
  otherColor = Colors.BLACK_3,
}: {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  otherColor?: string;
}) {
  return (
    <Svg width="15.63" height="15.779" viewBox="0 0 15.63 15.779">
      <Path
        id="Path_396"
        data-name="Path 396"
        d="M31.383,183.948a6.383,6.383,0,0,0,3.71-1.195l3.935,3.935a.943.943,0,0,0,.672.273.951.951,0,0,0,.664-1.61l-3.91-3.918a6.379,6.379,0,1,0-5.072,2.515Zm0-1.378a5.005,5.005,0,1,1,5.005-5.005A5.032,5.032,0,0,1,31.383,182.57Z"
        transform="translate(-25 -171.182)"
        fill={fillColor}
      />
    </Svg>
  );
}
