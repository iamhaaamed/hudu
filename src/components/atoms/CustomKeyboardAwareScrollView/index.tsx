import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function CustomKeyboardAwareScrollView(props: any) {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps={'handled'}
      enableResetScrollToCoords={false}
      bounces={false}
      {...props}>
      {
        //@ts-ignore
        props.children
      }
    </KeyboardAwareScrollView>
  );
}
