import {templateClone} from './create_ad.js';
import './validation_module.js';
import {disablePage,activatePage} from './page_state.js';

document.querySelector('#map-canvas').appendChild(templateClone);
disablePage();
activatePage();
