import {getRandomNumberInt, getRandomNumber} from './randomizer.js';

const ADS_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

function setFeatures () {
  return FEATURES.filter(() => getRandomNumberInt(0,1));
}

const getAdsData = () => {
  let imgNumber = getRandomNumberInt(1,10);
  if (imgNumber < 10) {
    imgNumber = `0${imgNumber}`;
  }
  const lat = getRandomNumber(35.65000,35.70000, 5);
  const lng = getRandomNumber(139.70000,139.80000, 5);
  return {
    author: {avatar: `img/avatars/user${imgNumber}.png`},
    offer: {
      title: 'Beautiful Apartment',
      address: `${lat} ${lng}`,
      price: getRandomNumberInt(3000, 50000),
      type: ADS_TYPE[getRandomNumberInt(0,4)],
      rooms: getRandomNumberInt(1,20),
      guests: getRandomNumberInt(1,20),
      checkin: CHECK_IN_OUT[getRandomNumberInt(0,2)],
      checkout: CHECK_IN_OUT[getRandomNumberInt(0,2)],
      features: setFeatures(),
      description: 'Comfortable, Light, Warm',
      photos: Array.from({length: getRandomNumberInt(1,3)}, () => PHOTOS[getRandomNumberInt(0,2)]),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

export {getAdsData};