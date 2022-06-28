import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function ProjectsIcon({
  fillColor = Colors.TAB_BAR_ICON,
}: {
  fillColor?: string;
}) {
  return (
    <Svg width="23.813" height="22.655" viewBox="0 0 23.813 22.655">
      <Path
        id="Union_5"
        data-name="Union 5"
        d="M3,22.655a3,3,0,0,1-3-3V7.366a3,3,0,0,1,3-3H20.777a3,3,0,0,1,3,3V19.655a3,3,0,0,1-3,3ZM23.813,5.544h0ZM20.851,3.893c.011.005-8.825,0-8.825,0l.64-1.526C12.852,2.054,13.429,0,14.944,0h5.9a2.641,2.641,0,0,1,2.965,2.592s0,2.92,0,2.951A3.336,3.336,0,0,0,20.851,3.893Z"
        transform="translate(0 0)"
        fill={fillColor}
      />
    </Svg>
  );
}
