import {HomeStackParamList} from './HomeStack';
import {FavoriteStackParamList} from './FavoriteStack';
import {PostStackParamList} from './PostStack';
import {ProjectStackParamList} from './ProjectsStack';
import {ProfileStackParamList} from './ProfileStack';
import {MainStackParamList} from './MainStack';

export type RootStackParamList = MainStackParamList &
  HomeStackParamList &
  FavoriteStackParamList &
  PostStackParamList &
  ProjectStackParamList &
  ProfileStackParamList;

declare global {
  // Specifying this type is important if you heavily use useNavigation, Link etc. in your app since it'll ensure type-safety.
  // READ MORE: https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
