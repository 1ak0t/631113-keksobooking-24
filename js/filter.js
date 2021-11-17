import {makePin} from './map.js';

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');

const PRICE_TYPE = {
  low: 10000,
  middle: 50000,
  high: 1000000,
};

const filterData = (data) => {
  const type = housingType.value;
  const rooms = housingRooms.value;
  const guests = housingGuests.value;
  const price = housingPrice.value;
  const features = housingFeatures.querySelectorAll('input');
  let cloneData = data.slice();
  if(type !== 'any') {
    cloneData = cloneData.filter((el) => el.offer.type === type);
  }
  if(rooms !== 'any') {
    cloneData = cloneData.filter((el) => el.offer.rooms.toString() === rooms);
  }

  if(guests !== 'any') {
    cloneData = cloneData.filter((el) => el.offer.guests.toString() === guests);
  }

  if(price === 'low') {
    cloneData = cloneData.filter((el) => el.offer.price < PRICE_TYPE.low);
  } else if(price === 'middle') {
    cloneData = cloneData.filter((el) => (el.offer.price > PRICE_TYPE.low && el.offer.price < PRICE_TYPE.middle));
  } else if(price === 'high') {
    cloneData = cloneData.filter((el) => el.offer.price > PRICE_TYPE.middle && el.offer.price < PRICE_TYPE.high);
  }

  features.forEach((feature) => {
    if(feature.checked) {
      cloneData = cloneData.filter((el) => {
        if(el.offer.features){
          if(el.offer.features.includes(feature.value)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    }
  });
  makePin(cloneData);
};

const setFilter = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};


export {filterData, setFilter};
