import React from 'react';
import {FlatList} from 'react-native';
import {Center, FormControl} from 'native-base';
import {CustomImageUploader, ImageBoxViewer} from '~/components';
import {useController} from 'react-hook-form';
import {fontFamily, scale} from '~/utils/style';

export default React.forwardRef(({name}: {name: any}, ref: any) => {
  const {field, fieldState} = useController({name});

  const onDeleteImage = (item: string) => {
    const temp = field.value?.filter(
      (imageElement: any) => imageElement?.imageAddress !== item?.imageAddress,
    );
    field.onChange(temp);
  };

  const onUploadImage = (image: string) => {
    if (field.value) {
      field.onChange([...field.value, {imageAddress: image}]);
    } else {
      field.onChange([{imageAddress: image}]);
    }
  };

  const ListHeaderComponent = () => (
    <Center mx="4">
      <CustomImageUploader onUploadImage={onUploadImage} />
    </Center>
  );

  const renderItem = ({item}: {item: any}) => (
    <Center mr="4">
      <ImageBoxViewer {...{item, onDelete: onDeleteImage}} />
    </Center>
  );

  return (
    <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
      <FlatList
        data={field.value || []}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        keyExtractor={(_, index: number) => `img${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <FormControl.ErrorMessage
        fontSize={scale(13)}
        fontFamily={fontFamily.regular}
        mt="0"
        px="4">
        {fieldState.error?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
});
