import "../pages/index.css"; // это под npm
import {
  initialCards,
  createCardObject,
  deleteObjectHandler,
  imageLikeHandler,
} from "./cards.js";

import {
  enableValidation,
  startValidation
  //clearValidation
} from "./validation.js"

import {
  handlePopUpOpen,
  handlePopUpClose
} from "./modal.js";

// @todo: Темплейт карточки
const getCardTemplate = () => {
  return document.querySelector("#card-template").content.querySelector(".places__item");
};
const cardTemplateItem = getCardTemplate();
// @todo: DOM узлы
const placesContainer = document.querySelector(".places");
const placesContainerCardsList = placesContainer.querySelector(".places__list"); //замечание 1
const editOpenBtn = document.querySelector(".profile__edit-button");
const addOpenBtn = document.querySelector(".profile__add-button");
const editPopUp = document.querySelector(".popup_type_edit");
const addPopUp = document.querySelector(".popup_type_new-card");
const editProfileForm = document.forms["edit-profile"];
const editProfileFormnNameInput = editProfileForm.name;
const editProfileFormnJobInput = editProfileForm.description;
const currentProfileName = document.querySelector(".profile__title");
const currentProfileJob = document.querySelector(".profile__description");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImageProp = popUpImage.querySelector(".popup__image");
const popUpImageDesc = popUpImage.querySelector(".popup__caption");
const addNewPlaceForm = document.forms["new-place"];
const newPlaceUrl = addNewPlaceForm.link;
const newPlaceDescr = addNewPlaceForm["place-name"];
//PR6
const imagePopUpHandler = (userImage) => {
  popUpImageProp.src = userImage.src;
  popUpImageProp.alt = userImage.alt;
  popUpImageDesc.textContent = userImage.alt;
  handlePopUpOpen(popUpImage);
}

const cardHandlers = {
  deleteButtonHandler: deleteObjectHandler,
  popUpHandler: imagePopUpHandler,
  likeHandler: imageLikeHandler
}

const intPopUpWindows = () => {
  //установить общие свойства модальных окон 
  armPopUps();
  // открыть Add
  addOpenBtn.addEventListener("click", function () {
    if (newPlaceDescr.value !== "" || newPlaceUrl.value !== "") {
      addNewPlaceForm.reset();
    }
    handlePopUpOpen(addPopUp);
  });
  //открыть Edit
  editOpenBtn.addEventListener("click", function () {
    editProfileFormnNameInput.value = currentProfileName.textContent;
    editProfileFormnJobInput.value = currentProfileJob.textContent;
    handlePopUpOpen(editPopUp);
  });
  //сабмит Edit
  editProfileForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    currentProfileName.textContent = editProfileFormnNameInput.value;
    currentProfileJob.textContent = editProfileFormnJobInput.value;
    handlePopUpClose(editPopUp);
  });
  //Сабмит edit
  addNewPlaceForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (newPlaceDescr.value !== "" && newPlaceUrl.value !== "") {
      let newCard = {
        name: newPlaceDescr.value,
        link: newPlaceUrl.value,
      };
      placesContainerCardsList.prepend(
        createCardObject(cardTemplateItem, newCard, cardHandlers)
      );
      addNewPlaceForm.reset(); 
    }
    handlePopUpClose(addPopUp);
  });
}
//установка общих свойств для попапов
const armPopUps = () =>{
  let popUps = document.querySelectorAll('.popup');
  popUps.forEach((item)=> {
    item.classList.add('popup_is-animated');
    item.querySelector('.popup__close').addEventListener("click", function () {
      handlePopUpClose(item);
    });
  });
}
//исполняемый код
intPopUpWindows();

initialCards.forEach((item) => {
  placesContainerCardsList.append(
    createCardObject(cardTemplateItem, item, cardHandlers)
  );
});

//PR7
//enableValidation(addNewPlaceForm, null);
startValidation();