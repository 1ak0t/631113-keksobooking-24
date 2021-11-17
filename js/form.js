import {sendForm} from './server_exchange.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_NIGHT_PRICE = 1000000;
let minPrice = 0;

const minPriceOfType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const body = document.querySelector('body');
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

const onTitleChange = (evt) => {
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

const onPriceChange = (evt) => {
  if (evt.target.matches('input[name="price"]')) {
    const inputPrice = evt.target;
    if (inputPrice.value > MAX_NIGHT_PRICE) {
      inputPrice.setCustomValidity('Максимальная цена за ночь - 1 000 000');
    } else if (inputPrice.value < minPrice){
      inputPrice.setCustomValidity(`Минимальная цена ${minPrice}`);
    } else {
      inputPrice.setCustomValidity('');
    }
    inputPrice.reportValidity();
  }
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
  minPrice = minPriceOfType[evt.target.value];
  price.placeholder = minPrice;
  price.min = minPrice;
};

form.addEventListener('input', onTitleChange);
form.addEventListener('input', onPriceChange);
rooms.addEventListener('change', onRoomsChange);
timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);
typeAd.addEventListener('change', onTypeChange);
reset.addEventListener('click', () => {
  form.reset();
  setTimeout(() => {address.value = '35.68339 139.75364';}, 1);
});

const keydownEsc = (evt, closeBlockFunc) => {
  if(evt.key === 'Escape') {
    closeBlockFunc();
  }
};

function sendFormOk() {
  const successTemplate = document.querySelector('#success').content;
  const successBlock = successTemplate.querySelector('.success');
  const successTemplateClone = successBlock.cloneNode(true);
  body.appendChild(successTemplateClone);
  form.reset();
  address.value = '35.68339 139.75364';
  const openedSuccessBlock = document.querySelector('.success');
  const closeSuccessBlock = () => {
    openedSuccessBlock.style.display = 'none';
    window.removeEventListener('keydown', (evt) => keydownEsc(evt));
    successTemplateClone.remove();
  };
  openedSuccessBlock.addEventListener('click', closeSuccessBlock);
  window.addEventListener('keydown', (evt) => keydownEsc(evt, closeSuccessBlock()));
}

function sendFormError() {
  const errorTemplate = document.querySelector('#error').content;
  const errorBlock = errorTemplate.querySelector('.error');
  const errorTemplateClone = errorBlock.cloneNode(true);
  body.appendChild(errorTemplateClone);
  const openedErrorBlock = document.querySelector('.error');
  const tryAgainButton = openedErrorBlock.querySelector('.error__button');
  const closeErrorBlock = () => {
    openedErrorBlock.style.display = 'none';
    window.removeEventListener('keydown', (evt) => keydownEsc(evt));
    errorTemplateClone.remove();
  };
  tryAgainButton.addEventListener('click', closeErrorBlock);
  openedErrorBlock.addEventListener('click', closeErrorBlock);
  window.addEventListener('keydown', (evt) => keydownEsc(evt, closeErrorBlock()));
}

form.addEventListener('submit' ,(evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendForm(formData, sendFormOk, sendFormError);
});

export {form};
