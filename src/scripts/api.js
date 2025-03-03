//Универсальная функция PATCH/POST/GET
export const apiHandler = (addr,token, mtd, data)  => {
  return fetch(addr, {
    method: mtd,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
