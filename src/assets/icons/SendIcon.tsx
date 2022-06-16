import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function SendIcon({
  size = scale(16),
  fillColor = Colors.BLACK_1,
}: {
  size?: number;
  fillColor?: string;
}) {
  return (
    <Svg width="16.5" height="15.526" viewBox="0 0 16.5 15.526">
      <Path
        id="Path_938"
        data-name="Path 938"
        d="M362.934,764H358.5l-1.482-6.117a.507.507,0,0,1-.018-.109.757.757,0,0,1,1.1-.693L372,764l-13.9,6.919a.757.757,0,0,1-1.1-.674.552.552,0,0,1,.025-.145l1.1-3.767"
        transform="translate(-356.25 -756.237)"
        fill="none"
        stroke={fillColor}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
    </Svg>
  );
}
