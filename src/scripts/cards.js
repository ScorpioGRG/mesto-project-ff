import {toggleClass} from './modal';
 
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
    }
];


//PR6 описание функций карточек

// функция создания карточек

export function createCardObject(template, data, deleteButtonHandler, popUpHandler, likeHandler) {
  const userPlacesItem = template.cloneNode(true);
  const userPlacesImage = userPlacesItem.querySelector('.card__image');
  const userPlaceImageLikeButton = userPlacesItem.querySelector('.card__like-button');
  userPlacesImage.src = data.link;
  userPlacesImage.alt = data.name;
  userPlacesItem.querySelector('.card__title').textContent = data.name;
  const buttonDelete = userPlacesItem.querySelector('.card__delete-button');
  userPlacesImage.addEventListener('click',function (event) {
      popUpHandler(userPlacesImage);
  }); 
  userPlaceImageLikeButton.addEventListener('click',function (event) {
      likeHandler(userPlaceImageLikeButton);
  }); 
  buttonDelete.addEventListener('click', function (event) {
      deleteButtonHandler(userPlacesItem);
  }); 
  return userPlacesItem;
}

// @todo: Функция удаления карточки
export const deleteObjectHandler = function (object) {
  object.remove();
}

// Функция Лайка карточки

export function imageLikeHandler(obj) {
  toggleClass(obj, 'card__like-button_is-active');
}