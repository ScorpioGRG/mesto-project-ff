export const handlePopUpOpen = (popUpWindow) => {
  popUpWindow.classList.add('popup_is-opened');
  document.addEventListener("keydown", closePopUpByEsc);
}

export const handlePopUpClose = (popUpWindow) => {
  if (popUpWindow.classList.contains('popup_is-opened')) popUpWindow.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopUpByEsc);
}

const closePopUpByEsc = (evt) => {
  if (evt.key === "Escape") {
    let activePopUpWindow = document.querySelector('.popup_is-opened');
    handlePopUpClose(activePopUpWindow);
  }
}

export const closePopUpByClick = (evt) => {
  if(evt.target.classList.contains('popup_is-opened')) {
    handlePopUpClose(evt.target);
  }
}
