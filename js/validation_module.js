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

const form = document.querySelector('.ad-form');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const capacityOption = capacity.querySelectorAll('option');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const typeAd = form.querySelector('#type');
const price = form.querySelector('#price');

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

export {form};
