import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function ProjectsIcon({
  fillColor = Colors.TAB_BAR_ICON,
}: {
  fillColor?: string;
}) {
  return (
    <Svg width="26.864" height="25.655" viewBox="0 0 26.864 25.655">
      <Path
        id="Union_5"
        data-name="Union 5"
        d="M4381,1353.973a3,3,0,0,1-3-3v-14.711a3,3,0,0,1,3-3h20.823a3,3,0,0,1,3,3v14.711a3,3,0,0,1-3,3Zm23.865-19.377h0Zm-3.342-1.87c.012.007-9.955,0-9.955,0l.722-1.728c.21-.354.86-2.678,2.569-2.678h6.662a2.984,2.984,0,0,1,3.344,2.935s0,3.306,0,3.342A3.764,3.764,0,0,0,4401.523,1332.726Z"
        transform="translate(-4378 -1328.318)"
        fill={fillColor}
      />
    </Svg>
  );
}
