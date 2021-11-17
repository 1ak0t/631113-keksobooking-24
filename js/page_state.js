import {form} from './form.js';

const fieldsets = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const filters = mapFilter.childNodes;

function disablePage() {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  mapFilter.classList.add('ad-form--disabled');
  filters.forEach((fieldset) => {
    fieldset.disabled = true;
  });
}

function activatePage() {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  mapFilter.classList.remove('ad-form--disabled');
  filters.forEach((fieldset) => {
    fieldset.disabled = false;
  });
}

export {disablePage, activatePage};
