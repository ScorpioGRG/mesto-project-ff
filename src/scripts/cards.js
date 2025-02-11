//import {toggleClass} from './modal';
// cards.js - замечание 1
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//PR6 описание функций карточек
// функция создания карточек
//можно лучше При работе с функциями, принимающими большое количество параметров (более 3), рекомендуется использовать объект.
export function createCardObject(
  template,
  data,
  deleteButtonHandler,
  popUpHandler,
  likeHandler
) {
  const userPlacesItem = template.cloneNode(true);
  const userPlaceImageLikeButton =
  userPlacesItem.querySelector(".card__like-button");
  const buttonDelete = userPlacesItem.querySelector(".card__delete-button");
  const userPlacesImage = userPlacesItem.querySelector(".card__image");
  userPlacesImage.src = data.link;
  userPlacesImage.alt = data.name;
  userPlacesItem.querySelector(".card__title").textContent = data.name;
  userPlacesImage.addEventListener("click", function (event) {
    popUpHandler(userPlacesImage);
  });
  userPlaceImageLikeButton.addEventListener("click", function (event) {
    likeHandler(userPlaceImageLikeButton);
  });
  buttonDelete.addEventListener("click", function (event) {
    deleteButtonHandler(userPlacesItem);
  });
  return userPlacesItem;
}

// @todo: Функция удаления карточки
export const deleteObjectHandler = function (object) {
  object.remove();
};

// Функция Лайка карточки - переписана, замечание 2
export function imageLikeHandler(obj) {
  obj.classList.toggle("card__like-button_is-active");
}
