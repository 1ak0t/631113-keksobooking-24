import {makePin} from './map.js';

const MAX_NUMBER_OF_PINS = 10;
const PriceType = {
  low: 10000,
  middle: 50000,
  high: 1000000,
};

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');

function filterPrice(someOffer, price) {
  if(price === 'low') {
    return someOffer.offer.price < PriceType.low;
  } else if(price === 'middle') {
    return someOffer.offer.price > PriceType.low && someOffer.offer.price < PriceType.middle;
  } else if(price === 'high') {
    return someOffer.offer.price > PriceType.middle && someOffer.offer.price < PriceType.high;
  }
  return price === 'any';
}

function filterAny(value, typeFilter) {
  return typeFilter === value || typeFilter === 'any';
}

function isFilterFeatures(features, filterFeatures) {
  return features && filterFeatures.every((feature) => features.some((featureValue) => feature === featureValue));
}

function filterData(data) {
  const type = housingType.value;
  const rooms = housingRooms.value;
  const guests = housingGuests.value;
  const price = housingPrice.value;
  const filteredData = [];

  function getValueCheckboxFeatures() {
    const checkboxes = housingFeatures.querySelectorAll('.map__checkbox');
    const featuresValues = [];
    checkboxes.forEach((element) => {
      if (element.checked) {
        featuresValues.push(element.value);
      }
    });
    return featuresValues;
  }

  data.some((offer) => {
    if(filterAny(offer.offer.type, type)
      && filterAny(offer.offer.rooms.toString(), rooms)
      && filterAny(offer.offer.guests.toString(), guests)
      && filterPrice(offer, price)
      && isFilterFeatures(offer.offer.features, getValueCheckboxFeatures())
    ) {
      filteredData.push(offer);
    }
    return filteredData.length === MAX_NUMBER_OF_PINS;
  });
  makePin(filteredData);
}

function setFilter(cb) {
  filterForm.addEventListener('change', () => {
    cb();
  });
}


export {filterData, setFilter};
