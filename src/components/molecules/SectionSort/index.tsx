import React from 'react';
import {CustomPicker} from '~/components';
import {authStore} from '~/stores';
import {scale} from '~/utils/style';

export default React.forwardRef(({name}: {name: any}, ref: any) => {
  const {isUserLoggedIn} = authStore(state => state);

  const sortData = isUserLoggedIn
    ? [
        {id: 0, title: 'Low to high bids', value: 'LOW_TO_HIGH_BIDS'},
        {id: 1, title: 'High to low bids', value: 'HIGH_TO_LOW_BIDS'},
        {
          id: 2,
          title: 'Closest to current location',
          value: 'CLOSET_TO_CURRENT_LOCATION',
        },
        {id: 3, title: 'My zip code', value: 'MY_ZIP_CODE'},
        {id: 4, title: 'Newest to oldest', value: 'NEWEST_TO_OLDEST'},
        {id: 5, title: 'Oldest to newest', value: 'OLDEST_TO_NEWEST'},
      ]
    : [
        {id: 0, title: 'Low to high bids', value: 'LOW_TO_HIGH_BIDS'},
        {id: 1, title: 'High to low bids', value: 'HIGH_TO_LOW_BIDS'},
        {id: 2, title: 'Newest to oldest', value: 'NEWEST_TO_OLDEST'},
        {id: 3, title: 'Oldest to newest', value: 'OLDEST_TO_NEWEST'},
      ];

  return (
    <CustomPicker
      name={name}
      data={sortData}
      placeholder="Sort"
      width={scale(120)}
      right={0}
      position="absolute"
    />
  );
});
