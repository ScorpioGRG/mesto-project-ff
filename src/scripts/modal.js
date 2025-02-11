//функция открытия-закрытия модального окна
//issue 1
/* Функция должна быть едина - отвечать за открытие/закрытие любого попапа, соответственно функция должна как минимум принимать в качестве параметра DOM-элемент попапа.
Наилучшим решением будет разбить текущую функцию на две функции*/

export function toggleClass(obj, cls) {
  obj.classList.toggle(cls);
}

export const handlePopUpOpen = (popUpWindow) => {
  popUpWindow.classList.add('popup_is-opened');
  document.addEventListener("keydown", closePopUpByEsc);
}

export const handlePopUpClose = (popUpWindow) => {
  if (popUpWindow.classList.contains('popup_is-opened')) popUpWindow.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopUpByEsc);
}


function closePopUpByEsc(evt) {
  if (evt.key === "Escape") {
    let activePopUpWindow = document.querySelector('.popup_is-opened');
    handlePopUpClose(activePopUpWindow);
  }
}

//закрытие нa клик - issue 2
/* Более оптимальным подходом будет добавление слушателей событий один раз при инициализации приложения.
При такой реализации слушатели устанавливаются единожды при старте приложения, а не при каждом открытии/закрытии попапа, 
что существенно повышает производительность и надежность кода

todo Что делаем - этот листенер грузим один раз*/

export function closePopUpByClick(evt) {  //todo -  rename to closePopUpByClick
  if(evt.target.classList.contains('popup_is-opened')) {
    handlePopUpClose(evt.target);
  }
}

//закрытие на Esc



//Изменение курсора мыши вне модального окна (в тексте нет, на картинках к ТЗ есть)
/*
function changeMousePointerStyle(evt) {
  let activePopUp = document.querySelector(".popup_is-opened");
  if (evt.target === activePopUp) {
    document.body.style.cursor = "pointer";
  } else document.body.style.cursor = "default";
}*/

/*export function addClosePopUpOptionalListeners() {
  document.addEventListener("click", closePopUpByClick);
  document.addEventListener("keydown", hidePopUpByEsc);
  document.addEventListener("mousemove", changeMousePointerStyle);
}

export function removeClosePopUpOptionalListeners() {
  document.removeEventListener("click", closePopUpByClick);
  document.removeEventListener("keydown", hidePopUpByEsc);
  document.removeEventListener("mousemove", changeMousePointerStyle);
  document.body.style.cursor = "default";
}*/
