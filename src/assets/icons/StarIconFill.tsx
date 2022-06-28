import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function StarIconFill({
  size = scale(14),
  fillColor = Colors.GOLDEN,
}: {
  size?: number;
  fillColor?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32.374 32.373">
      <Path
        id="Path_344"
        data-name="Path 344"
        d="M253.306,306.433a1.1,1.1,0,0,1-1.512-1.279l1.68-10.207-7.129-7.242a1.229,1.229,0,0,1,.573-2.052l9.909-1.5,4.419-9.336a1.014,1.014,0,0,1,1.878,0l4.419,9.336,9.91,1.5a1.225,1.225,0,0,1,.57,2.052l-7.125,7.242,1.68,10.207a1.1,1.1,0,0,1-1.509,1.279l-8.886-4.869-8.88,4.869Z"
        transform="translate(-246 -274.182)"
        fill={fillColor}
      />
    </Svg>
  );
}
