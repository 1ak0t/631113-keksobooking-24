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

function filterPrice(someOffer, price) {
  if(price === 'low') {
    return someOffer.offer.price < PRICE_TYPE.low;
  } else if(price === 'middle') {
    return someOffer.offer.price > PRICE_TYPE.low && someOffer.offer.price < PRICE_TYPE.middle;
  } else if(price === 'high') {
    return someOffer.offer.price > PRICE_TYPE.middle && someOffer.offer.price < PRICE_TYPE.high;
  }
  return price === 'any';
}

function filterAny(value, typeFilter) {
  return typeFilter === value || typeFilter === 'any';
}

const isFilterFeatures = (features, filterFeatures) => features && filterFeatures.every((feature) => features.some((featureValue) => feature === featureValue));

const filterData = (data) => {
  const type = housingType.value;
  const rooms = housingRooms.value;
  const guests = housingGuests.value;
  const price = housingPrice.value;
  const filteredData = [];

  const getValueCheckboxFeatures = () => {
    const checkboxes = housingFeatures.querySelectorAll('.map__checkbox');
    const featuresValue = [];
    checkboxes.forEach((element) => {
      if (element.checked) {
        featuresValue.push(element.value);
      }
    });
    return featuresValue;
  };

  data.some((offer) => {
    if(filterAny(offer.offer.type, type)
      && filterAny(offer.offer.rooms.toString(), rooms)
      && filterAny(offer.offer.guests.toString(), guests)
      && filterPrice(offer, price)
      && isFilterFeatures(offer.offer.features, getValueCheckboxFeatures())
    ) {
      filteredData.push(offer);
    }
    return filteredData.length === 10;
  });
  makePin(filteredData);
};

const setFilter = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};


export {filterData, setFilter};
