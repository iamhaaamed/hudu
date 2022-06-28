import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function ProjectsIconFill({
  fillColor = Colors.PRIMARY,
}: {
  fillColor?: string;
}) {
  return (
    <Svg width="23.813" height="22.654" viewBox="0 0 23.813 22.654">
      <Path
        id="Union_5"
        data-name="Union 5"
        d="M4381,1350.973a3,3,0,0,1-3-3v-12.29a3,3,0,0,1,3-3h17.776a3,3,0,0,1,3,3v12.29a3,3,0,0,1-3,3Zm20.813-17.111h0Zm-2.962-1.651c.011.005-8.824,0-8.824,0l.64-1.526c.187-.313.763-2.365,2.278-2.365h5.9a2.641,2.641,0,0,1,2.964,2.592v2.951A3.341,3.341,0,0,0,4398.851,1332.21Z"
        transform="translate(-4378 -1328.318)"
        fill={fillColor}
      />
    </Svg>
  );
}
