import {ReactNode} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

declare global {
  type ReactChildren = {
    children?: ReactNode;
  };

  type NavigationProp = NativeStackHeaderProps;
}
