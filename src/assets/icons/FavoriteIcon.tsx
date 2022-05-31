import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function FavoriteIcon({
  size = scale(25),
  fillColor = Colors.BLACK_3,
}: {
  size?: number;
  fillColor?: string;
}) {
  return (
    <Svg width="30.155" height="25.843" viewBox="0 0 30.155 25.843">
      <G
        id="noun-love-861872"
        transform="translate(37.909 -3)"
        style="isolation: isolate">
        <Path
          id="Path_465"
          data-name="Path 465"
          d="M156.358,106.4c-3.473,0-7.958,3.073-7.958,9.169,0,3.4,2.161,6.584,5.013,9.39a52.138,52.138,0,0,0,9.633,7.164.84.84,0,0,0,.864,0,52.135,52.135,0,0,0,9.633-7.164c2.852-2.807,5.013-5.989,5.013-9.39,0-6.1-4.485-9.169-7.958-9.169a8.635,8.635,0,0,0-7.12,3.608,8.635,8.635,0,0,0-7.12-3.608Zm0,1.667a7.051,7.051,0,0,1,6.4,3.764.84.84,0,0,0,1.44,0,7.051,7.051,0,0,1,6.4-3.764c2.476,0,6.282,2.211,6.282,7.5,0,2.678-1.818,5.551-4.515,8.205a49.7,49.7,0,0,1-8.886,6.629,49.68,49.68,0,0,1-8.886-6.629c-2.7-2.655-4.515-5.527-4.515-8.205,0-5.291,3.807-7.5,6.282-7.5Z"
          transform="translate(-186.309 -103.4)"
          fill={fillColor}
        />
      </G>
    </Svg>
  );
}
