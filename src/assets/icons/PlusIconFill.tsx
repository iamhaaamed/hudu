import * as React from 'react';
import Svg, {G, Line, Rect} from 'react-native-svg';
import {Colors} from '~/styles';

export default function PlusIconFill({
  fillColor = Colors.PRIMARY,
}: {
  fillColor?: string;
}) {
  return (
    <Svg width="27" height="27" viewBox="0 0 27 27">
      <G
        id="Group_24052"
        data-name="Group 24052"
        transform="translate(-172.5 -8.5)">
        <Rect
          id="Rectangle_18139"
          data-name="Rectangle 18139"
          width="27"
          height="27"
          rx="4"
          transform="translate(172.5 8.5)"
          fill={fillColor}
        />
        <G
          id="Group_181"
          data-name="Group 181"
          transform="translate(179.353 15.353)">
          <Line
            id="Line_1"
            data-name="Line 1"
            y2="13.294"
            transform="translate(6.647 0)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="1.7"
          />
          <Line
            id="Line_2"
            data-name="Line 2"
            x2="13.294"
            transform="translate(0 6.864)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="1.7"
          />
        </G>
      </G>
    </Svg>
  );
}
