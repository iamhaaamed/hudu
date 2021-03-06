import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function LocationIcon({
  size = scale(16),
  fillColor = Colors.PRIMARY,
}: {
  size?: number;
  fillColor?: string;
}) {
  return (
    <Svg width="15.625" height="20.805" viewBox="0 0 15.625 20.805">
      <Path
        id="Path_574"
        data-name="Path 574"
        d="M223.413,78.4a7.823,7.823,0,0,0-7.813,7.816c0,2.478,1.327,4.625,2.858,6.657,1,1.322,3.909,5.157,3.909,5.157l2.144-.054s2.859-3.78,3.856-5.1c1.531-2.033,2.858-4.179,2.858-6.657a7.823,7.823,0,0,0-7.813-7.816Zm0,1.3a6.5,6.5,0,0,1,6.511,6.515c0,2.006-1.114,3.911-2.594,5.875-1.269,1.685-2.757,3.4-3.917,5.245-1.159-1.847-2.647-3.56-3.917-5.245-1.48-1.964-2.594-3.869-2.594-5.875a6.5,6.5,0,0,1,6.511-6.515Zm0,2.277a4.228,4.228,0,1,0,4.232,4.228A4.24,4.24,0,0,0,223.413,81.976Zm0,1.3a2.927,2.927,0,1,1-2.93,2.927A2.919,2.919,0,0,1,223.413,83.277Zm-1.046,14.751s.315.541.476.84a.652.652,0,0,0,1.139,0c.161-.3.418-.719.606-1.016.2.02-2.221.176-2.221.176Z"
        transform="translate(-215.6 -78.398)"
        fill={fillColor}
      />
    </Svg>
  );
}
