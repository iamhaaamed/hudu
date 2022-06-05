import * as React from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function HuduIconFill({
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
      <G id="Group_345" data-name="Group 345" transform="translate(-321 -20.5)">
        <Rect
          id="Rectangle_6079"
          data-name="Rectangle 6079"
          width="35"
          height="35"
          rx="3"
          transform="translate(321 20.5)"
          fill={backGroundColor}
        />
        <G
          id="Group_343"
          data-name="Group 343"
          transform="translate(-310.16 -405.66)">
          <G
            id="Group_340"
            data-name="Group 340"
            transform="translate(635.922 431.218)">
            <G id="Group_338" data-name="Group 338" transform="translate(0 0)">
              <G id="Group_337" data-name="Group 337">
                <G
                  id="Group_336"
                  data-name="Group 336"
                  transform="translate(0 0.001)">
                  <Path
                    id="Path_30126"
                    data-name="Path 30126"
                    d="M274.01,447.23h-1.722a.366.366,0,0,0-.367.365v4.378a18.042,18.042,0,0,1-3.272.283c-.339,0-.692-.01-1.042-.028a15.626,15.626,0,0,1-2.23-.255V447.6a.366.366,0,0,0-.367-.365h-1.722a.366.366,0,0,0-.367.365v10.669a.367.367,0,0,0,.367.367h1.722a.367.367,0,0,0,.367-.367v-3.791a19.379,19.379,0,0,0,2.23.214c.349.016.7.024,1.042.024a21.862,21.862,0,0,0,3.272-.238v3.791a.367.367,0,0,0,.367.367h1.722a.367.367,0,0,0,.367-.367V447.6A.366.366,0,0,0,274.01,447.23Z"
                    transform="translate(-262.922 -447.23)"
                    fill={fillColor}
                  />
                </G>
                <Path
                  id="Path_30127"
                  data-name="Path 30127"
                  d="M642.593,447.219H640.8a.371.371,0,0,0-.193.055l-.018.01a.5.5,0,0,0-.057.048.4.4,0,0,0-.082.12s0,0,0,0a.378.378,0,0,0-.017.058.374.374,0,0,0-.012.09v8.524c-.054.015-.125.031-.183.045l-.054.013-.11.027a13.784,13.784,0,0,1-2.809.3h-.492a13.781,13.781,0,0,1-2.809-.3l-.11-.027-.054-.013c-.057-.015-.128-.03-.183-.045V447.6a.389.389,0,0,0-.012-.09.394.394,0,0,0-.018-.058s0,0,0,0a.392.392,0,0,0-.082-.12.473.473,0,0,0-.057-.048l-.019-.01a.371.371,0,0,0-.193-.055h-1.79a.381.381,0,0,0-.381.38v9.669a.58.58,0,0,0,.031.183c.11.336.522.651,1.193.914.128.05.265.1.412.145.039.014.082.027.126.04l.044.012c.079.023.16.046.244.068l.047.012q.128.033.261.063l.038.009.152.033c.071.015.144.028.217.042l.037.007a17.208,17.208,0,0,0,3.138.272h.027a17.208,17.208,0,0,0,3.138-.272l.037-.007c.073-.014.146-.027.217-.042l.153-.033.038-.009c.089-.02.176-.041.262-.063l.047-.012c.083-.022.165-.044.244-.068l.044-.012.126-.04q.22-.069.411-.145c.671-.263,1.083-.578,1.193-.914a.585.585,0,0,0,.03-.183V447.6A.381.381,0,0,0,642.593,447.219Z"
                  transform="translate(-617.551 -433.954)"
                  fill={fillColor}
                />
                <Path
                  id="Path_30128"
                  data-name="Path 30128"
                  d="M396.866,447.219H395.16a.354.354,0,0,0-.184.053l-.017.009a.449.449,0,0,0-.054.045.378.378,0,0,0-.078.115s0,0,0,0a.348.348,0,0,0-.016.055.357.357,0,0,0-.012.086v8.125c-.052.015-.12.029-.174.043l-.051.013-.1.026a13.142,13.142,0,0,1-2.677.289h-.469a13.139,13.139,0,0,1-2.677-.289l-.105-.026-.051-.013c-.054-.014-.122-.028-.174-.043v-8.125a.367.367,0,0,0-.011-.086.409.409,0,0,0-.017-.055s0,0,0,0a.379.379,0,0,0-.078-.115.457.457,0,0,0-.054-.045l-.018-.009a.353.353,0,0,0-.184-.053h-1.706a.363.363,0,0,0-.363.362V456.8a.559.559,0,0,0,.029.174c.105.32.5.621,1.137.872.122.048.253.095.392.139.038.013.078.025.12.038l.042.012c.075.022.153.044.233.065l.045.011q.122.031.249.06l.036.009.145.032c.068.014.138.027.207.04l.035.007a16.4,16.4,0,0,0,2.991.259h.025a16.4,16.4,0,0,0,2.991-.259l.035-.007c.069-.013.14-.026.207-.04l.145-.032.036-.009c.085-.019.168-.04.249-.06l.044-.011c.08-.021.157-.042.233-.065l.042-.012.12-.038c.14-.044.27-.091.392-.139.64-.251,1.032-.551,1.137-.872a.556.556,0,0,0,.029-.174v-9.216A.363.363,0,0,0,396.866,447.219Z"
                  transform="translate(-371.807 -447.218)"
                  fill={fillColor}
                />
              </G>
            </G>
            <G
              id="Group_339"
              data-name="Group 339"
              transform="translate(0 13.265)">
              <Path
                id="Path_30129"
                data-name="Path 30129"
                d="M520.2,452.709c0-.064,0-.128-.009-.193,0-.036,0-.072-.008-.107,0-.06-.009-.12-.014-.179,0-.036-.008-.069-.01-.1-.006-.06-.013-.122-.021-.182,0-.03-.008-.06-.012-.091-.008-.065-.019-.131-.029-.195,0-.024-.008-.049-.012-.072-.013-.071-.025-.142-.038-.212,0-.016-.007-.033-.01-.048-.016-.079-.033-.157-.05-.235a.132.132,0,0,1,0-.022c-.025-.1-.05-.2-.079-.3a7.484,7.484,0,0,0-.276-.807l-2.263,2.263-4.2,4.206a.433.433,0,0,1-.6,0l-1.6-1.6-1.694-1.695a.43.43,0,0,1,0-.607l1.056-1.055a.426.426,0,0,1,.3-.126.261.261,0,0,1,.045,0,.414.414,0,0,1,.259.124l.68.678,1.25,1.25,5.427-5.428a3.282,3.282,0,0,0-.621-.436.1.1,0,0,0-.02-.013c-.018-.011-.038-.018-.056-.027l-.018-.009c-.047-.024-.1-.044-.144-.064h0l-.03-.013c-.054-.021-.107-.041-.161-.058l-.011,0c-.058-.018-.115-.034-.172-.049l-.043-.009c-.043-.01-.086-.018-.129-.026l-.059-.009-.122-.014-.053-.005c-.058,0-.117-.007-.174-.007H508.5a.378.378,0,0,0-.376.338v11.048a.382.382,0,0,0,.376.343h7.967c.057,0,.116,0,.174-.008l.053,0c.042,0,.082-.009.122-.016l.059-.009c.043-.007.085-.016.129-.025l.043-.009c.056-.014.114-.03.172-.049l.011,0c.054-.017.107-.036.161-.058a.226.226,0,0,1,.03-.013l.006,0c.049-.019.1-.04.143-.064l.018-.008.056-.028a.172.172,0,0,0,.02-.013,4.057,4.057,0,0,0,1.52-1.527c.008-.009.016-.018.023-.027a6.845,6.845,0,0,0,.7-1.67c.029-.1.055-.2.079-.3a.113.113,0,0,1,0-.022c.017-.077.034-.156.05-.234,0-.016.006-.033.01-.05.013-.069.026-.14.038-.211,0-.025.009-.048.012-.073.01-.064.021-.128.029-.194,0-.03.009-.06.012-.09.008-.06.015-.122.021-.182,0-.036.008-.069.01-.1.005-.06.011-.119.014-.179,0-.036.007-.07.008-.108,0-.064.006-.128.009-.193,0-.032,0-.063.005-.094,0-.1,0-.193,0-.291s0-.194,0-.29C520.205,452.772,520.2,452.741,520.2,452.709Z"
                transform="translate(-508.124 -447.23)"
                fill={fillColor}
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}