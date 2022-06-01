import React from 'react';
import {CustomPicker} from '~/components';

const sortData = [
  {id: 0, title: 'Low to high bids', value: 'lth'},
  {id: 1, title: 'High to low bids', value: 'htl'},
  {id: 2, title: 'Closet to current location', value: 'ctc'},
  {id: 3, title: 'My zip code', value: 'mzc'},
  {id: 4, title: 'Newest to oldest', value: 'nto'},
  {id: 5, title: 'Oldest to newest', value: 'otn'},
];

export default React.forwardRef(({name}: {name: any}, ref: any) => {
  return <CustomPicker name={name} data={sortData} placeholder="Sort" />;
});
