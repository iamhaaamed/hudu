import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function HomeIconFill({
  fillColor = Colors.PRIMARY,
}: {
  fillColor?: string;
}) {
  return (
    <Svg width="26.067" height="22.655" viewBox="0 0 26.067 22.655">
      <Path
        id="Path_42885"
        data-name="Path 42885"
        d="M96.058,49.511a2.025,2.025,0,0,0-.769-1.389L84.638,39.755a2.586,2.586,0,0,0-3.2,0L70.783,48.122a2.041,2.041,0,0,0-.308,2.91,2.071,2.071,0,0,0,2.855.281l.51-.4V59.54a2.318,2.318,0,0,0,2.315,2.315H79.8a.534.534,0,0,0,.535-.534V58.053a2.654,2.654,0,0,1,5.308,0v3.268a.535.535,0,0,0,.535.534h3.738a2.318,2.318,0,0,0,2.315-2.315V50.912l.51.4a2.071,2.071,0,0,0,2.855-.281,2.027,2.027,0,0,0,.46-1.521"
        transform="translate(-70.003 -39.2)"
        fill={fillColor}
        fill-rule="evenodd"
      />
    </Svg>
  );
}
