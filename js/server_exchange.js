const newData = function getData(onOk, onError) {
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

export {newData};
