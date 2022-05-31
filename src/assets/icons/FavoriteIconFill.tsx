import * as React from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function FavoriteIconFill({
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
      <G id="Group_346" data-name="Group 346" transform="translate(-93 -20.5)">
        <Rect
          id="Rectangle_6082"
          data-name="Rectangle 6082"
          width="35"
          height="35"
          rx="3"
          transform="translate(93 20.5)"
          fill={backGroundColor}
        />
        <Path
          id="Union_1"
          data-name="Union 1"
          d="M3802.217-7944.668a.838.838,0,0,1-.571-.108,52.186,52.186,0,0,1-9.634-7.163c-.508-.5-.994-1.012-1.45-1.536a6.258,6.258,0,0,1-.677-.685,9.873,9.873,0,0,1-1.033-1.567,10.393,10.393,0,0,1-1.854-5.6c0-.083,0-.167,0-.249,0-.046,0-.091,0-.136a8.885,8.885,0,0,1,.676-3.437c.025-.061.052-.122.078-.182a8.126,8.126,0,0,1,7.2-5.167h0q.151,0,.3,0t.294,0a7.3,7.3,0,0,1,3.345.9,9.252,9.252,0,0,1,3.18,2.709,8.815,8.815,0,0,1,4.769-3.311,5.7,5.7,0,0,1,1.687-.3q.16,0,.319.006t.345-.006c3.473,0,7.957,3.072,7.957,9.169,0,3.4-2.16,6.583-5.013,9.39a42.054,42.054,0,0,1-4.894,4.068,14.245,14.245,0,0,1-1.823,1.261c-.989.657-1.971,1.271-2.915,1.834l-.053.029-.161.126Z"
          transform="translate(-3691.5 7995.715)"
          fill={fillColor}
        />
      </G>
    </Svg>
  );
}
