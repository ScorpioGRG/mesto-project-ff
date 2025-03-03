import "../pages/index.css"; // это под npm
import {
  createCardObject,
  deleteObjectHandler,
  imageLikeHandler,
} from "./cards.js";

import {
  enableValidation,
  clearValidation
} from "./validation.js"

import {
  handlePopUpOpen,
  handlePopUpClose
} from "./modal.js";

import {
  apiHandler
} from "./api.js";

// @todo: Темплейт карточки
const getCardTemplate = () => {
  return document.querySelector("#card-template").content.querySelector(".places__item");
};
const cardTemplateItem = getCardTemplate();
// @todo: DOM узлы
const placesContainer = document.querySelector(".places");
const placesContainerCardsList = placesContainer.querySelector(".places__list"); 
const editOpenBtn = document.querySelector(".profile__edit-button");
const editAvatarOpenBtn = document.querySelector(".profile__edit__avatar_button");
const addOpenBtn = document.querySelector(".profile__add-button");
const editPopUp = document.querySelector(".popup_type_edit");
const editAvatarPopUp =  document.querySelector(".popup_type_edit-avatar");
const addPopUp = document.querySelector(".popup_type_new-card");
const editProfileForm = document.forms["edit-profile"];
const editProfileFormnNameInput = editProfileForm.name;
const editProfileFormnJobInput = editProfileForm.description;
const currentProfileName = document.querySelector(".profile__title");
const currentProfileJob = document.querySelector(".profile__description");
const currentProfileImage = document.querySelector(".profile__edit__avatar_button");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImageProp = popUpImage.querySelector(".popup__image");
const popUpImageDesc = popUpImage.querySelector(".popup__caption");
const addNewPlaceForm = document.forms["new-place"];
const newPlaceUrl = addNewPlaceForm.link;
const newPlaceDescr = addNewPlaceForm["place-name"];
const addNewPlaceFormSubmitBtn = addNewPlaceForm.querySelector('.popup__button');
const changeAvatarForm = document.forms["change-avatar"];
const changeAvatarUrl = changeAvatarForm.link;

//не const, что бы далее записать сюда свой Id
let apiDataSet = {
  authToken: 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a',
  linkProfile: 'https://nomoreparties.co/v1/wff-cohort-33/users/me',
  linkCards: 'https://nomoreparties.co/v1/wff-cohort-33/cards'
}

const formsValidationDataSet = {
  errorSelector: 'popup__input_error',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabledClass: 'popup__button_disabled',
  formSelector: '.popup__form',
  errorMark: '-error'
}

const imagePopUpHandler = (userImage) => {
  popUpImageProp.src = userImage.src;
  popUpImageProp.alt = userImage.alt;
  popUpImageDesc.textContent = userImage.alt;
  handlePopUpOpen(popUpImage);
}

const cardHandlers = {
  deleteButtonHandler: deleteObjectHandler,
  popUpHandler: imagePopUpHandler,
  likeHandler: imageLikeHandler,
  webApi: apiHandler
}

const intPopUpWindows = () => {
  //установка общих свойств для попапов
  armPopUps();
  // открыть Add
  addOpenBtn.addEventListener("click", function () {
    if (newPlaceDescr.value !== "" || newPlaceUrl.value !== "") {
      addNewPlaceForm.reset();
    }
    clearValidation(addNewPlaceForm, formsValidationDataSet);
    addPopUp.querySelector('.popup__button').textContent = 'Сохранить';
    handlePopUpOpen(addPopUp);
  });
  //открыть Edit
  editOpenBtn.addEventListener("click", function () {
    editProfileFormnNameInput.value = currentProfileName.textContent;
    editProfileFormnJobInput.value = currentProfileJob.textContent;
    let editPopUpSubmBtn = editPopUp.querySelector('.popup__button');
    editPopUpSubmBtn.textContent = 'Сохранить';
    clearValidation(editProfileForm, formsValidationDataSet);
    handlePopUpOpen(editPopUp);
  });
  //сабмит Edit
  editProfileForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
    let profileData = {name: editProfileFormnNameInput.value, about: editProfileFormnJobInput.value };
    apiHandler(apiDataSet.linkProfile, apiDataSet.authToken, 'PATCH', profileData)
    .then((result) => {
      currentProfileName.textContent = result.name;
      currentProfileJob.textContent = result.about;
      handlePopUpClose(editPopUp);
    });
  });
   //открыть Edit-Avatar
  editAvatarOpenBtn.addEventListener("click", function () {
    console.log('open ava-edit');
    changeAvatarForm.reset();
    editAvatarPopUp.querySelector('.popup__button').textContent = 'Сохранить';
    clearValidation(changeAvatarForm, formsValidationDataSet);
    handlePopUpOpen(editAvatarPopUp);
  });
  //сабмит Edit-Avatar
  editAvatarPopUp.addEventListener("submit", function (evt) {
    evt.preventDefault();
    evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
    let profileAvatar = {avatar: changeAvatarUrl.value };
    let avatarLink = apiDataSet.linkProfile + '/avatar';
    apiHandler(avatarLink, apiDataSet.authToken, 'PATCH', profileAvatar)
    .then((result) => {
      console.log('ProfileUpDateAvatar', result);
      currentProfileImage.style.cssText= 'background-image: url(' + result.avatar +')';
    });
    changeAvatarForm.reset();
    handlePopUpClose(editAvatarPopUp);
  });
  //Сабмит add
  addNewPlaceForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
    if (newPlaceDescr.value !== "" && newPlaceUrl.value !== "") {
      let newCard = {
        name: newPlaceDescr.value,
        link: newPlaceUrl.value,
      };
      apiHandler(apiDataSet.linkCards, apiDataSet.authToken, 'POST', newCard)
      .then ((result) => {
          placesContainerCardsList.prepend(
          createCardObject(cardTemplateItem, result, cardHandlers, apiDataSet)
        );
        })
        .catch((err) => {
          console.log(err);
        });
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
 //Установить профиль
const setProfile = (profileData) => {
  currentProfileName.textContent = profileData.name;
  currentProfileJob.textContent = profileData.about;
  currentProfileImage.style.cssText= 'background-image: url(' + profileData.avatar +')';
  //console.log('background-image:' + userImage);
}

//исполняемый код 

// инициализация элементов
intPopUpWindows();
// инициализация валидации
enableValidation(formsValidationDataSet);
//грузим профиль через промис, отрисовываем профиль и возвращаем Id пользователя
let profile_Id = apiHandler(apiDataSet.linkProfile, apiDataSet.authToken)
.then((evt) => {
  setProfile(evt);
  return new Promise((resolve, reject)=> {
    resolve(evt._id);
  });
})
.catch((err) =>{
  console.log('Ошибка при загрузке профиля',err);
});
//грузим данные карточек 
let cards = apiHandler(apiDataSet.linkCards, apiDataSet.authToken)
.catch((err) =>{
  console.log('Ошибка при загрузке карточек пользователей', err);
});
//собираем промисы профиля и карточек
let allDataReady = [profile_Id, cards];
//рисуем карточки если все промисы выполнены
Promise.all(allDataReady)
.then((dataSet) => {
  apiDataSet.ownerId = dataSet[0]; //записываем свой ИД в набор данных
  dataSet[1].forEach((dataItem) =>{
    placesContainerCardsList.append(
      createCardObject(cardTemplateItem, dataItem, cardHandlers, apiDataSet)
    );
  });
});


