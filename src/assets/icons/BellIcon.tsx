import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function BellIcon({
  size = scale(24),
  fillColor = Colors.WHITE,
  strokeColor = Colors.BLACK_1,
  otherColor = Colors.BLACK_3,
}: {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  otherColor?: string;
}) {
  return (
    <Svg width="21.128" height="24.6" viewBox="0 0 21.128 24.6">
      <Path
        id="Vector"
        d="M30.278,34.577v.885a3.538,3.538,0,1,1-7.077,0v-.885m13.03-1.8c-1.42-1.738-2.422-2.622-2.422-7.413,0-4.387-2.24-5.95-4.084-6.709a.985.985,0,0,1-.55-.583A2.68,2.68,0,0,0,26.74,16a2.674,2.674,0,0,0-2.433,2.072.975.975,0,0,1-.55.582c-1.846.76-4.084,2.318-4.084,6.709,0,4.791-1.005,5.675-2.425,7.413a1.115,1.115,0,0,0,.956,1.8H35.281A1.115,1.115,0,0,0,36.232,32.776Z"
        transform="translate(-16.175 -15.2)"
        fill="none"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.6"
      />
    </Svg>
  );
}
