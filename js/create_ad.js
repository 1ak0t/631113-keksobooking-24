function createAd(data) {
  const adTemplate = document.querySelector('#card').content;
  const popup = adTemplate.querySelector('article');
  const offerType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель',
  };
  const templateClone = popup.cloneNode(true);
  const templateTitle = templateClone.querySelector('.popup__title');
  const templateAddress = templateClone.querySelector('.popup__text--address');
  const templatePrice = templateClone.querySelector('.popup__text--price');
  const templateType = templateClone.querySelector('.popup__type');
  const templateCapacity = templateClone.querySelector('.popup__text--capacity');
  const templateTime = templateClone.querySelector('.popup__text--time');
  const templateFeatures = templateClone.querySelector('.popup__features');
  const templateDescription = templateClone.querySelector('.popup__description');
  const templatePhotos = templateClone.querySelector('.popup__photos');
  const templateAvatar = templateClone.querySelector('.popup__avatar');

  function isNull (adData, tag) {
    if (!adData) {
      return tag.style.display = 'none';
    }
    return adData;
  }

  templateTitle.textContent = isNull(data.offer.title, templateTitle);
  templateAddress.textContent = isNull(data.offer.address, templateAddress);
  templatePrice.textContent = `${isNull(data.offer.price, templatePrice)} ₽/ночь`;
  templateType.textContent = isNull(offerType[data.offer.type], templateType);
  templateCapacity.textContent = `${isNull(data.offer.rooms, templateCapacity)} комнат для ${isNull(data.offer.guests, templateCapacity)} гостей`;
  templateTime.textContent = `Заезд после ${isNull(data.offer.checkin, templateTime)}, выезд до ${isNull(data.offer.checkout, templateTime)}`;

  templateFeatures.querySelectorAll('li').forEach((el) => {
    const isFeature = data.offer.features.some((feature) => el.classList.contains(`popup__feature--${feature}`));
    if (!isFeature) {
      el.remove();
    }
  });

  templateDescription.textContent = isNull(data.offer.description, templateDescription);

  const imgTag = templatePhotos.querySelector('img');
  imgTag.remove();
  data.offer.photos.forEach((photo) => {
    const photoHTML = imgTag.cloneNode();
    photoHTML.src = photo;
    templatePhotos.append(photoHTML);
  });

  templateAvatar.src = isNull(data.author.avatar, templateAvatar);
  return templateClone;
}


export {createAd};
