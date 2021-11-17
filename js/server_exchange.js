const getData = function getData(onOk, onError) {
  return fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response;
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => onOk(data))
    .catch((error) => onError(error));
};

const sendForm = function sendToServer(formData, onOk, onError) {
  return fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if(!response) {
        onError();
      }
      onOk();
    }).catch(onError);
};

export {getData,sendForm};
