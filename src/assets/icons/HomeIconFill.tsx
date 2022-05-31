import * as React from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function HomeIconFill({
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
      <G id="Group_347" data-name="Group 347" transform="translate(-20 -20.5)">
        <Rect
          id="Rectangle_6083"
          data-name="Rectangle 6083"
          width="35"
          height="35"
          rx="3"
          transform="translate(20 20.5)"
          fill={backGroundColor}
        />
        <Path
          id="Union_2"
          data-name="Union 2"
          d="M3809.112-7944.666h-18.528a3.758,3.758,0,0,1-2.532-.956,3.1,3.1,0,0,1-1.052-2.3v-13.741a2.99,2.99,0,0,1,.42-1.544,3.414,3.414,0,0,1,1.186-1.17l9.264-5.571a3.833,3.833,0,0,1,1.98-.552,3.835,3.835,0,0,1,1.978.552l9.264,5.571a3.378,3.378,0,0,1,1.186,1.17,2.988,2.988,0,0,1,.42,1.544v13.741a3.1,3.1,0,0,1-1.052,2.3,3.757,3.757,0,0,1-2.532.956Z"
          transform="translate(-3762.5 7995.715)"
          fill={fillColor}
        />
        <Path
          id="Subtraction_4"
          data-name="Subtraction 4"
          d="M3788.25-7957.042H3787v-9.917a3,3,0,0,1,3-3h5a3,3,0,0,1,3,3v9.916h-1.25v-9.429a2,2,0,0,0-2-2h-4.5a2,2,0,0,0-2,2v9.429Z"
          transform="translate(-3755 8008.092)"
          fill="#bbd2f3"
        />
      </G>
    </Svg>
  );
}
