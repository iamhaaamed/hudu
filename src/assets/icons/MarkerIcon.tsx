import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function MarkerIcon({
  size = scale(16),
  fillColor = Colors.ERROR,
}: {
  size?: number;
  fillColor?: string;
}) {
  return (
    <Svg width="15.559" height="20.029" viewBox="0 0 15.559 20.029">
      <G id="noun-location-1280614" transform="translate(4.168 166.398)">
        <Path
          id="Path_575"
          data-name="Path 575"
          d="M167.4,33.6a7.74,7.74,0,0,0-7.787,7.672c0,2.192,1.331,4.645,2.9,6.886a65.522,65.522,0,0,0,4.891,5.471h0a66.708,66.708,0,0,0,5.135-5.714c1.484-2.163,2.638-4.479,2.638-6.643A7.733,7.733,0,0,0,167.4,33.6Zm0,4.054a3.636,3.636,0,1,1-3.654,3.632A3.633,3.633,0,0,1,167.4,37.656Z"
          transform="translate(-163.778 -200)"
          fill={fillColor}
          fill-rule="evenodd"
        />
      </G>
    </Svg>
  );
}
