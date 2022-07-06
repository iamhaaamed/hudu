import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function HomeIcon({
  fillColor = Colors.TAB_BAR_ICON,
}: {
  fillColor?: string;
}) {
  return (
    <Svg width="32.217" height="28.001" viewBox="0 0 32.217 28.001">
      <Path
        id="Path_42885"
        data-name="Path 42885"
        d="M102.205,51.944a2.5,2.5,0,0,0-.95-1.717L88.091,39.886a3.2,3.2,0,0,0-3.958,0L70.967,50.227a2.522,2.522,0,0,0-.381,3.6,2.56,2.56,0,0,0,3.528.347l.631-.5V64.339A2.864,2.864,0,0,0,77.606,67.2h4.509a.661.661,0,0,0,.661-.66V62.5a3.28,3.28,0,0,1,6.56,0V66.54A.661.661,0,0,0,90,67.2h4.62a2.864,2.864,0,0,0,2.861-2.861V53.675l.631.5a2.56,2.56,0,0,0,3.528-.347,2.505,2.505,0,0,0,.569-1.879"
        transform="translate(-70.003 -39.2)"
        fill={fillColor}
        fill-rule="evenodd"
      />
    </Svg>
  );
}
