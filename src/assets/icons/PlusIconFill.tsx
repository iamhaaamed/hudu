import * as React from 'react';
import Svg, {G, Line, Circle, Path} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function PlusIconFill({
  size = scale(45),
  fillColor = Colors.PRIMARY,
  otherColor = Colors.WHITE,
  shadowColor = Colors.TAB_BAR_SHADOW,
}: {
  size?: number;
  fillColor?: string;
  otherColor?: string;
  shadowColor?: string;
}) {
  return (
    <Svg width="45" height="45.2" viewBox="0 0 45 40.5">
      <G id="Group_4925" data-name="Group 4925" transform="translate(-166.574)">
        <G id="Group_177" data-name="Group 177" transform="translate(171.074)">
          <Circle
            id="Ellipse_9"
            data-name="Ellipse 9"
            cx="17.574"
            cy="17.574"
            r="17.574"
            fill={fillColor}
          />
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
        </G>
        <Path
          id="Subtraction_5"
          data-name="Subtraction 5"
          d="M3811.5-7921a22.354,22.354,0,0,1-8.757-1.768,22.421,22.421,0,0,1-7.152-4.822,22.426,22.426,0,0,1-4.822-7.151A22.364,22.364,0,0,1,3789-7943.5a22.512,22.512,0,0,1,.954-6.5h43.093a22.516,22.516,0,0,1,.954,6.5,22.36,22.36,0,0,1-1.768,8.757,22.427,22.427,0,0,1-4.822,7.151,22.428,22.428,0,0,1-7.152,4.822A22.359,22.359,0,0,1,3811.5-7921Z"
          transform="translate(-3622.426 7961.5)"
          fill={shadowColor}
        />
      </G>
    </Svg>
  );
}
