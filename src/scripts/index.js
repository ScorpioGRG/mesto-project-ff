import "../pages/index.css"; // это под npm
import {
  initialCards,
  createCardObject,
  deleteObjectHandler,
  imageLikeHandler,
} from "./cards.js";

import {
  enableValidation,
  resetValidation
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
const placesContainerCardsList = placesContainer.querySelector(".places__list"); 
const editOpenBtn = document.querySelector(".profile__edit-button");
const addOpenBtn = document.querySelector(".profile__add-button");
const editPopUp = document.querySelector(".popup_type_edit");
const addPopUp = document.querySelector(".popup_type_new-card");
const editProfileForm = document.forms["edit-profile"];
const editProfileFormnNameInput = editProfileForm.name;
const editProfileFormnJobInput = editProfileForm.description;
const currentProfileName = document.querySelector(".profile__title");
const currentProfileJob = document.querySelector(".profile__description");
const currentProfileImage = document.querySelector(".profile__image");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImageProp = popUpImage.querySelector(".popup__image");
const popUpImageDesc = popUpImage.querySelector(".popup__caption");
const addNewPlaceForm = document.forms["new-place"];
const newPlaceUrl = addNewPlaceForm.link;
const newPlaceDescr = addNewPlaceForm["place-name"];
const addNewPlaceFormSubmitBtn = addNewPlaceForm.querySelector('.popup__button');
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
    resetValidation(addNewPlaceForm);
    handlePopUpOpen(addPopUp);
  });
  //открыть Edit
  editOpenBtn.addEventListener("click", function () {
    editProfileFormnNameInput.value = currentProfileName.textContent;
    editProfileFormnJobInput.value = currentProfileJob.textContent;
    resetValidation(editProfileForm);
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
    addNewPlaceFormSubmitBtn.classList.add('popup__button_disabled');
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
//игры с АПИ
 const getData = (addr, token) => {  return fetch(addr, {
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    }); 
 } 

 //Установить профиль
 const setProfile = (userName, userDescr, userImage) => {
  currentProfileName.textContent = userName;
  currentProfileJob.textContent = userDescr;
  currentProfileImage.src = userImage;
  currentProfileImage.alt = userName;
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
enableValidation();

getData('https://nomoreparties.co/v1/wff-cohort-33/users/me', 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a');