export const enableValidation = (form, config) => {
  let formInput = form.querySelectorAll('.popup__input');
  console.log(formInput);
  formInput.forEach(input => {
    input.addEventListener('input', (evt) => {
      console.log(evt.target.validity.valid);
      if(!evt.target.validity.valid) {
        evt.target.classList.add('popup__input_error');
      } else {
        evt.target.classList.remove('popup__input_error');
      }
    });
  });

}
/*
export const clearValidation =() => {

}*/

const showInputError = (obj, cls) => {
  obj.classList.add(cls);
}

/*for inspiration
https://practicum.yandex.ru/trainer/fullstack-developer-plus/lesson/a358b3e2-c8ba-4f3c-87f1-61dc2fbcb7af/task/b99b1d1c-88cc-49ad-b51e-48343cfd2bb2/
https://practicum.yandex.ru/trainer/fullstack-developer-plus/lesson/51441fc6-d3f4-4b8b-a4eb-6f8b2da707b3/task/b4ea547b-708c-4dbc-ba6b-fb1001b50c11/



*/