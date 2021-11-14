import {activatePage, disablePage} from './page_state.js';
import {getAdsData} from './utils/data.js';
import {createAd} from './create_ad.js';

const addressInput = document.getElementById('address');

disablePage();

const map = L.map('map-canvas').on('load', () => {
  activatePage();
}).setView({
  lat: 35.683390,
  lng: 139.753637,
}, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.683390,
    lng: 139.753637,
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

const ad = getAdsData();

const pinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pinMarker = L.marker(
  {
    lat: ad.location.lat,
    lng: ad.location.lng,
  },
  {
    icon: pinIcon,
  },
);

pinMarker.addTo(map).bindPopup(createAd(ad));
