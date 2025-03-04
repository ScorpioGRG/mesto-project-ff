//проверить валидность и вызвать обработчик
const checkValidity = (form, input, valDataSet) => {
  if (!input.validity.valid) {
    showInputError(form, input, valDataSet, /*input.validationMessage*/ input.dataset.errorMessage)
  } else {
    hideInputError(form, input, valDataSet);
  }
}

//подсветить поле и вывести текст
const showInputError = (form, input, valDataSet, errorMessage) => {
  const textErrorDescInput = form.querySelector('.' + input.id + valDataSet.errorMark );
  input.classList.add(valDataSet.errorSelector);
  textErrorDescInput.textContent = errorMessage;
}

//убрать подсветку и заменить текст пустой строкой
const hideInputError = (form, input, valDataSet) => {
  const textErrorDescInput = form.querySelector('.' + input.id + valDataSet.errorMark);
  input.classList.remove(valDataSet.errorSelector);
  textErrorDescInput.textContent = '';
}

//найти все инпуты, повесить листенеры с обработчиками
const armFormValidationEventListeners = (form, valDataSet) => {
  const inputsList = Array.from(form.querySelectorAll(valDataSet.inputSelector));
  const btn = form.querySelector(valDataSet.buttonSelector);
  toggleButton(inputsList, btn, valDataSet);
  inputsList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => { 
      checkValidity(form, inputItem, valDataSet);
      toggleButton(inputsList, btn, valDataSet);
    })
  });
}

//проверка на наличие хотя бы одного невалидного элемента
const checkFormValidity = (inputsList) => {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//переключатель активации кнопки при ошибке
const toggleButton = (inputsList, button, valDataSet) => {
    if (checkFormValidity(inputsList)) { 
      button.classList.add(valDataSet.buttonDisabledClass); 
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(valDataSet.buttonDisabledClass);
      button.removeAttribute('disabled');
    }
}

//подключить валидацию
export const enableValidation = (valDataSet) => {
  const formsList = Array.from(document.querySelectorAll(valDataSet.formSelector));
  formsList.forEach((formItem) => {
    armFormValidationEventListeners(formItem, valDataSet);
  }); 
}

//сбросить результат валидации
export const clearValidation = (form, valDataSet) => {
  const inputsList = Array.from(form.querySelectorAll(valDataSet.inputSelector));
  inputsList.forEach((inputItem) => {
    hideInputError(form, inputItem, valDataSet);
  });
  const submitBtn = form.querySelector(valDataSet.buttonSelector)
  if(!submitBtn.classList.contains(valDataSet.buttonDisabledClass)) {
    submitBtn.classList.add(valDataSet.buttonDisabledClass);
  }
}

