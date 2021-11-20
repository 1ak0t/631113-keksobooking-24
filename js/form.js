import {getData, sendForm} from './server_exchange.js';
import {map, mainPinMarker, makePin, showErrorMessage} from './map.js';
import {MAP_CENTER_LAT, MAP_CENTER_LNG} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_NIGHT_PRICE = 1000000;
const MIN_TIMEOUT = 1;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MinPriceOfType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

let minPrice = 0;
const body = document.body;
const form = document.querySelector('.ad-form');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const capacityOption = capacity.querySelectorAll('option');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const typeAd = form.querySelector('#type');
const price = form.querySelector('#price');
const address = form.querySelector('#address');
const reset = form.querySelector('.ad-form__reset');
const startPricePlaceholder = price.placeholder;
const avatarChoose = form.querySelector('#avatar');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const adImgChoose = form.querySelector('#images');
const adImgPreview = form.querySelector('.ad-form__photo');
const adImgContainer = form.querySelector('.ad-form__photo-container');

const onTitleInput = (evt) => {
  if (evt.target.matches('input[name="title"]')) {
    const inputTitle = evt.target;
    const titleLength = inputTitle.value.length;

    if (titleLength < MIN_TITLE_LENGTH) {
      inputTitle.setCustomValidity(`Еще необходимо ${MIN_TITLE_LENGTH - titleLength} символов`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      inputTitle.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} символов`);
    } else {
      inputTitle.setCustomValidity('');
    }
    inputTitle.reportValidity();
  }
};

const onPriceInput = (evt) => {
  const inputPrice = evt.target;
  if (inputPrice.value > MAX_NIGHT_PRICE) {
    inputPrice.setCustomValidity('Максимальная цена за ночь - 1 000 000');
  } else if (inputPrice.value < minPrice){
    inputPrice.setCustomValidity(`Минимальная цена ${minPrice}`);
  } else {
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
};

const onRoomsChange = (evt) => {
  capacityOption.forEach((option) => option.disabled = true);
  if (evt.target.value === '1') {
    capacityOption[2].disabled = false;
    capacity.value = '1';
  }
  if (evt.target.value === '2') {
    capacityOption[1].disabled = false;
    capacityOption[2].disabled = false;
    capacity.value = '1';
  }
  if (evt.target.value === '3') {
    capacityOption[0].disabled = false;
    capacityOption[1].disabled = false;
    capacityOption[2].disabled = false;
    capacity.value = '1';
  }
  if (evt.target.value === '100') {
    capacityOption[3].disabled = false;
    capacity.value = '0';
  }
};

const onTimeInChange = (evt) => {
  timeOut.value = evt.target.value;
};

const onTimeOutChange = (evt) => {
  timeIn.value = evt.target.value;
};

const onTypeChange = (evt) => {
  minPrice = MinPriceOfType[evt.target.value];
  price.placeholder = minPrice;
  price.min = minPrice;
};

function resetFilterForm() {
  const filterForm = document.querySelector('.map__filters');
  filterForm.reset();
  getData((data) => {
    makePin(data.slice(0, 10));
  }, showErrorMessage);
  mainPinMarker.setLatLng([MAP_CENTER_LAT, MAP_CENTER_LNG]);
  map.setView({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  }, 13);
}

function resetForm() {
  form.reset();
  price.placeholder = startPricePlaceholder;
  price.removeAttribute('min');
  setTimeout(() => address.value = `${MAP_CENTER_LAT} ${MAP_CENTER_LNG}`, MIN_TIMEOUT);
}


form.addEventListener('input', onTitleInput);
price.addEventListener('input', onPriceInput);
rooms.addEventListener('change', onRoomsChange);
timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);
typeAd.addEventListener('change', onTypeChange);
reset.addEventListener('click', () => {
  resetForm();
  resetFilterForm();
});
avatarChoose.addEventListener('change', () => {
  const file = avatarChoose.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});
adImgChoose.addEventListener('change', (evt) => {
  for(let i = 0; i < evt.target.files.length; i++){
    const file = adImgChoose.files[i];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const adImgPreviewClone = adImgPreview.cloneNode();
      adImgPreview.remove();
      const photo = document.createElement('img');
      photo.src = URL.createObjectURL(file);
      photo.style.width = '70px';
      photo.style.height = '70px';
      photo.style.borderRadius = '5px';
      adImgPreviewClone.appendChild(photo);
      adImgContainer.appendChild(adImgPreviewClone);
    }
  }
});

const closeSuccessBlock = (cb) => {
  const modal = document.querySelector('.success');
  window.removeEventListener('keydown', cb);
  modal.remove();
};

const closeErrorBlock = (cb) => {
  const modal = document.querySelector('.error');
  window.removeEventListener('keydown',  cb);
  modal.remove();
};

const keydownEscSuccess = (evt) => {
  if(evt.key === 'Escape') {
    closeSuccessBlock(keydownEscSuccess);
  }
};

const keydownEscError = (evt) => {
  if(evt.key === 'Escape') {
    closeErrorBlock(keydownEscError);
  }
};

function sendFormOk() {
  const successTemplate = document.querySelector('#success').content;
  const successBlock = successTemplate.querySelector('.success');
  const successTemplateClone = successBlock.cloneNode(true);
  body.appendChild(successTemplateClone);
  resetForm();
  resetFilterForm();
  const openedSuccessBlock = document.querySelector('.success');
  openedSuccessBlock.addEventListener('click', closeSuccessBlock);
  window.addEventListener('keydown', keydownEscSuccess);
}

function sendFormError() {
  const errorTemplate = document.querySelector('#error').content;
  const errorBlock = errorTemplate.querySelector('.error');
  const errorTemplateClone = errorBlock.cloneNode(true);
  body.appendChild(errorTemplateClone);
  const openedErrorBlock = document.querySelector('.error');
  const tryAgainButton = openedErrorBlock.querySelector('.error__button');

  tryAgainButton.addEventListener('click', closeErrorBlock);
  openedErrorBlock.addEventListener('click', closeErrorBlock);
  window.addEventListener('keydown', keydownEscError);
}

form.addEventListener('submit' ,(evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendForm(formData, sendFormOk, sendFormError);
});

export {form};
