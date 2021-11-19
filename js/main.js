import {getData} from './server_exchange.js';
import './map.js';
import './form.js';
import {makePin} from './map.js';
import {showErrorMessage} from './map.js';
import {setFilter, filterData} from './filter.js';
import {debounce} from './utils/debounce.js';

getData((data) => {
  makePin(data.slice(0, 10));
  setFilter(debounce(() => filterData(data), 500));
},showErrorMessage);

