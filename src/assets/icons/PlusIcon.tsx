import * as React from 'react';
import Svg, {G, Line, Circle} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function PlusIcon({
  size = scale(35),
  fillColor = Colors.WHITE,
  strokeColor = Colors.BLACK_3,
  otherColor = Colors.BLACK_3,
}: {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  otherColor?: string;
}) {
  return (
    <Svg
      width={size}
      height={size}
      id="Group_177"
      data-name="Group 177"
      viewBox="0 0 35.149 35.149">
      <G
        id="Ellipse_9"
        data-name="Ellipse 9"
        fill={fillColor}
        stroke={strokeColor}
        stroke-width="1">
        <Circle cx="17.574" cy="17.574" r="17.574" stroke="none" />
        <Circle cx="17.574" cy="17.574" r="17.074" fill="none" />
      </G>
      <G
        id="Group_181"
        data-name="Group 181"
        transform="translate(10.927 10.927)">
        <Line
          id="Line_1"
          data-name="Line 1"
          y2="13.294"
          transform="translate(6.647)"
          fill="none"
          stroke={otherColor}
          stroke-linecap="round"
          stroke-width="1.7"
        />
        <Line
          id="Line_2"
          data-name="Line 2"
          x2="13.294"
          transform="translate(0 6.864)"
          fill="none"
          stroke={otherColor}
          stroke-linecap="round"
          stroke-width="1.7"
        />
      </G>
    </Svg>
  );
}
