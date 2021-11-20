import {activatePage, disablePage} from './page_state.js';
import {createAd} from './create_ad.js';

const MAP_CENTER_LAT = 35.68339;
const MAP_CENTER_LNG = 139.75364;
const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const PIN_SIZE = [40, 40];
const PIN_ANCHOR = [20, 40];
const addressInput = document.getElementById('address');
const mapTag = document.querySelector('.map__filters-container');

function showErrorMessage(error) {
  const errorBanner = document.createElement('div');
  const errorMessage = document.createElement('h2');
  const errorCode = document.createElement('p');
  errorBanner.classList.add('error-map');
  errorMessage.textContent = 'Что-то пошло не так :=( \n Мы уже работаем над этой проблемой';
  errorCode.textContent = error;
  errorBanner.appendChild(errorMessage);
  errorBanner.appendChild(errorCode);
  mapTag.appendChild(errorBanner);
}

disablePage();

const map = L.map('map-canvas').on('load', () => {
  activatePage();
}).setView({
  lat: MAP_CENTER_LAT,
  lng: MAP_CENTER_LNG,
}, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

addressInput.value = `${mainPinMarker.getLatLng().lat.toFixed(5)} ${mainPinMarker.getLatLng().lng.toFixed(5)}`;

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)} ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);


function makePin(data) {
  markerGroup.clearLayers();
  data
    .forEach((el) => {
      const pinIcon = L.icon({
        iconUrl: './img/pin.svg',
        iconSize: PIN_SIZE,
        iconAnchor: PIN_ANCHOR,
      });
      const pinMarker = L.marker(
        {
          lat: el.location.lat,
          lng: el.location.lng,
        },
        {
          icon: pinIcon,
        },
      );
      pinMarker.addTo(markerGroup).bindPopup(createAd(el));
    });
}
export {makePin,showErrorMessage, mainPinMarker, map, MAP_CENTER_LAT, MAP_CENTER_LNG};

