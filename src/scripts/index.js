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
  requestData,
  requestDataNew
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
const editProfileFormNameInput = editProfileForm.name;
const editProfileFormJobInput = editProfileForm.description;
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
  linkProfile: '/users/me',
  linkCards: '/cards',
  linkCardLikes: '/cards/likes/',
  linkProfileAvatar:'/users/me/avatar'
}

const formsValidationDataSet = {
  errorSelector: 'popup__input_error',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabledClass: 'popup__button_disabled',
  formSelector: '.popup__form',
  errorMark: '-error'
}

const handlePopUpImage = (userImage) => {
  popUpImageProp.src = userImage.src;
  popUpImageProp.alt = userImage.alt;
  popUpImageDesc.textContent = userImage.alt;
  handlePopUpOpen(popUpImage);
}

const cardHandlers = {
  deleteButtonHandler: deleteObjectHandler,
  popUpHandler: handlePopUpImage,
  likeHandler: imageLikeHandler,
  webApi: requestData
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
    handlePopUpOpen(addPopUp);
  });
  //Сабмит Add
  addNewPlaceForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';
    if (newPlaceDescr.value !== "" && newPlaceUrl.value !== "") {
      const newCard = {
        name: newPlaceDescr.value,
        link: newPlaceUrl.value,
      };
      requestData(apiDataSet.linkCards, 'POST', newCard)
        .then ((result) => {
          placesContainerCardsList.prepend(
          createCardObject(cardTemplateItem, result, cardHandlers, apiDataSet));
          handlePopUpClose(addPopUp);
          addNewPlaceForm.reset();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          evt.submitter.textContent = 'Сохранить';
        });
      }
  });
  //открыть Edit
  editOpenBtn.addEventListener("click", function () {
    editProfileFormNameInput.value = currentProfileName.textContent;
    editProfileFormJobInput.value = currentProfileJob.textContent;
    clearValidation(editProfileForm, formsValidationDataSet);
    handlePopUpOpen(editPopUp);
  });
  //сабмит Edit
  editProfileForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';
    const profileData = {name: editProfileFormNameInput.value, about: editProfileFormJobInput.value };
    requestData(apiDataSet.linkProfile, 'PATCH', profileData)
    .then((result) => {
      currentProfileName.textContent = result.name;
      currentProfileJob.textContent = result.about;
      handlePopUpClose(editPopUp);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
  });
   //открыть Edit-Avatar
  editAvatarOpenBtn.addEventListener("click", function () {
    console.log('open ava-edit');
    changeAvatarForm.reset();
    clearValidation(changeAvatarForm, formsValidationDataSet);
    handlePopUpOpen(editAvatarPopUp);
  });
  //сабмит Edit-Avatar
  editAvatarPopUp.addEventListener("submit", function (evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';
    const profileAvatar = {avatar: changeAvatarUrl.value };
    requestData(apiDataSet.linkProfileAvatar,'PATCH', profileAvatar)
    .then((result) => {
      currentProfileImage.style.cssText= 'background-image: url(' + result.avatar +')';
      handlePopUpClose(editAvatarPopUp);
      changeAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
  });

}
//установка общих свойств для попапов
const armPopUps = () =>{
  const popUps = document.querySelectorAll('.popup');
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
}

//исполняемый код 

// инициализация элементов
intPopUpWindows();
// инициализация валидации
enableValidation(formsValidationDataSet);
//грузим профиль через промис, отрисовываем профиль и возвращаем Id пользователя
const profile_Id =  requestData(apiDataSet.linkProfile) /*requestDataNew('/cards') requestData(apiDataSet.linkProfile, apiDataSet.authToken)*/
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
const cards = requestData(apiDataSet.linkCards)
.catch((err) =>{
  console.log('Ошибка при загрузке карточек пользователей', err);
});
//собираем промисы профиля и карточек
const allDataReady = [profile_Id, cards];
//рисуем карточки если все промисы выполнены
Promise.all(allDataReady)
.then((dataSet) => {
  apiDataSet.ownerId = dataSet[0]; //записываем свой ИД в набор данных
  dataSet[1].forEach((dataItem) =>{
    placesContainerCardsList.append(
      createCardObject(cardTemplateItem, dataItem, cardHandlers, apiDataSet)
    );
  });
})
.catch((err) => {
  console.log('Произошла ошибка: ', err);
});


