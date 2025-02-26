/*export const enableValidation = (form, config) => {
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

}*/

//проверить валидность и вызвать обработчик
const checkValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, /*input.validationMessage*/ input.dataset.errorMessage)
  } else {
    hideInputError(form, input);
  }
}


//подсветить поле и вывести текст
const showInputError = (form, input, errorMessage) => {
  let textErrorDescInput = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_error');
  textErrorDescInput.textContent = errorMessage;
}


//убрать подсветку и заменить текст пустой строкой
const hideInputError = (form, input) => {
  let textErrorDescInput = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_error');
  textErrorDescInput.textContent = '';
}


//найти все инпуты, повесить листенеры с обработчиками
const armFormValidationEventListeners = (form) => {
  let inputsList = Array.from(form.querySelectorAll('.popup__input'));
  let btn = form.querySelector('.popup__button');
  toggleButton(inputsList, btn);
  inputsList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => { 
      checkValidity(form, inputItem);
      toggleButton(inputsList, btn);
    })
  });
}

const checkFormValidity = (inputsList) => {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButton = (inputsList, button) => {
    if (checkFormValidity(inputsList)) { 
      button.classList.add('popup__button_disabled'); 
      button.setAttribute('disabled', true);
    } else {
     button.classList.remove('popup__button_disabled');
     button.removeAttribute('disabled');
    }
}
  


export const enableValidation = () => {
  console.log('startValidation called')
  let formsList = Array.from(document.querySelectorAll(".popup__form"));
  formsList.forEach((formItem) => {
    console.log('startValidation form list', formItem)
    armFormValidationEventListeners(formItem);
  }); 
}

export const resetValidation = (form) => {
  let inputsList = Array.from(form.querySelectorAll('.popup__input'));
  inputsList.forEach((inputItem) => {
    hideInputError(form, inputItem);
  });
}



/*
export const clearValidation =() => {

}*/

/*new_enableValidation = (validationObject) => {
  validationObject.forEach((obj) =>{
    new_armValidation()
  });

} 


*/