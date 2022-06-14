import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function AvatarIcon({
  size = scale(24),
  fillColor = Colors.WHITE,
  strokeColor = Colors.BLACK,
}: {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  otherColor?: string;
}) {
  return (
    <Svg width="99.5" height="99.5" viewBox="0 0 99.5 99.5">
      <G
        id="Group_4925"
        data-name="Group 4925"
        transform="translate(-138.25 -64.25)">
        <Path
          id="Path_1950"
          data-name="Path 1950"
          d="M192,98a49,49,0,1,0,49,49,49.751,49.751,0,0,0-1.462-11.929A48.93,48.93,0,0,0,192,98Z"
          transform="translate(-4 -33)"
          fill={fillColor}
          stroke={strokeColor}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <Path
          id="Path_1951"
          data-name="Path 1951"
          d="M154.128,178.1S165.051,164.149,192,164.149,229.878,178.1,229.878,178.1"
          transform="translate(-4 -33)"
          fill="none"
          stroke={strokeColor}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <Path
          id="Path_1952"
          data-name="Path 1952"
          d="M192,147a14.7,14.7,0,1,0-10.394-4.306A14.7,14.7,0,0,0,192,147Z"
          transform="translate(-4 -33)"
          fill={fillColor}
          stroke={strokeColor}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </G>
    </Svg>
  );
}
