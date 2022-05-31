import * as React from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function ProjectsIconFill({
  size = scale(35),
  fillColor = Colors.PRIMARY,
  backGroundColor = Colors.TAB_BAR_SHADOW,
}: {
  size?: number;
  fillColor?: string;
  backGroundColor?: string;
}) {
  return (
    <Svg width="35" height="35" viewBox="0 0 35 35">
      <G id="Group_344" data-name="Group 344" transform="translate(-249 -21.5)">
        <Rect
          id="Rectangle_6085"
          data-name="Rectangle 6085"
          width="35"
          height="35"
          rx="3"
          transform="translate(249 21.5)"
          fill={backGroundColor}
        />
        <Path
          id="Union_3"
          data-name="Union 3"
          d="M4381,1353.092a3,3,0,0,1-3-3v-14a3,3,0,0,1,3-3h20a3,3,0,0,1,3,3v14a3,3,0,0,1-3,3Zm23.041-18.711h0Zm-3.24-1.806c.012.005-9.649,0-9.649,0l.7-1.669c.2-.342.833-2.586,2.49-2.586h6.457a2.888,2.888,0,0,1,3.242,2.834s0,3.194,0,3.227A3.647,3.647,0,0,0,4400.8,1332.575Z"
          transform="translate(-4125 -1302.592)"
          fill={fillColor}
        />
      </G>
    </Svg>
  );
}
