export const handlePopUpOpen = (popUpWindow) => {
  popUpWindow.classList.add('popup_is-opened');
  document.addEventListener("keydown", closePopUpByEsc);
  popUpWindow.addEventListener("click", closePopUpByClick);
}

export const handlePopUpClose = (popUpWindow) => {
  if (popUpWindow.classList.contains('popup_is-opened')) popUpWindow.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopUpByEsc);
  popUpWindow.removeEventListener("click", closePopUpByClick);
}

const closePopUpByEsc = (evt) => {
  if (evt.key === "Escape") {
    let activePopUpWindow = document.querySelector('.popup_is-opened');
    handlePopUpClose(activePopUpWindow);
  }
}

const closePopUpByClick = (evt) => {
    handlePopUpClose(evt.target);
}
