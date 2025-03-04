
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a',
    'Content-Type': 'application/json',
  }
};

//Универсальная функция PATCH/POST/GET


export const requestData = (addrPrefix, mtd, data)  => {
  return fetch(config.baseUrl + addrPrefix, {
    method: mtd,
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
