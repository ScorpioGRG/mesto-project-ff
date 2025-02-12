
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

export const createCardObject = (template, data, handlers) => {
  const userPlacesItem = template.cloneNode(true);
  const userPlaceImageLikeButton = userPlacesItem.querySelector(".card__like-button");
  const buttonDelete = userPlacesItem.querySelector(".card__delete-button");
  const userPlacesImage = userPlacesItem.querySelector(".card__image");
  userPlacesImage.src = data.link;
  userPlacesImage.alt = data.name;
  userPlacesItem.querySelector(".card__title").textContent = data.name;
  userPlacesImage.addEventListener("click", function (event) {
    handlers.popUpHandler(userPlacesImage);
  });
  userPlaceImageLikeButton.addEventListener("click", function (event) {
    handlers.likeHandler(userPlaceImageLikeButton);
  });
  buttonDelete.addEventListener("click", function (event) {
    handlers.deleteButtonHandler(userPlacesItem);
  });
  return userPlacesItem;
}

// @todo: Функция удаления карточки
export const deleteObjectHandler =  (obj) => {
  obj.remove();
};

// Функция Лайка карточки - переписана, замечание 2
export const imageLikeHandler = (obj) => {
  obj.classList.toggle("card__like-button_is-active");
}
