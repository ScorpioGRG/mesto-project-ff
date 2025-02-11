import "../pages/index.css"; // это под npm
import {
  initialCards,
  createCardObject,
  deleteObjectHandler,
  imageLikeHandler,
} from "./cards.js";
import {
  toggleClass,
  closePopUpByClick, handlePopUpOpen, handlePopUpClose
} from "./modal.js";
// @todo: Темплейт карточки
const getCardTemplate = () => {

  return document
    .querySelector("#card-template")
    .content.querySelector(".places__item");
};
const cardTemplateItem = getCardTemplate();
// @todo: DOM узлы
const placesContainer = document.querySelector(".places");
const placesContainerCardsList = placesContainer.querySelector(".places__list"); //замечание 1
//PR6
//интерактивные элементы на странице, кнопки и попапы
const editOpenBtn = getObjectByUniqType(".profile__edit-button");
const addOpenBtn = getObjectByUniqType(".profile__add-button");
const editPopUp = getObjectByUniqType(".popup_type_edit");
const addPopUp = getObjectByUniqType(".popup_type_new-card");
const addPopUpCloseBtn = addPopUp.querySelector(".popup__close");
const editPopUpCloseBtn = editPopUp.querySelector(".popup__close");
const editProfileForm = document.forms["edit-profile"];
const editProfileFormnNameInput = editProfileForm.name;
const editProfileFormnJobInput = editProfileForm.description;
const currentProfileName = document.querySelector(".profile__title");
const currentProfileJob = document.querySelector(".profile__description");
const popUpImage = getObjectByUniqType(".popup_type_image");
const popUpImageAtributes = popUpImage.querySelector(".popup__image"); //замечание 2
const popUpImageDesc = popUpImage.querySelector(".popup__caption");
const popUpImageCloseBtn = popUpImage.querySelector(".popup__close"); // замечание 3
const addNewPlaceForm = document.forms["new-place"];
const newPlaceUrl = addNewPlaceForm.link;
const newPlaceDescr = addNewPlaceForm["place-name"];
//PR6

//returns the first object with obj
function getObjectByUniqType(obj) {
  const result = document.querySelector(obj);
  return result;
}

function imagePopUpHandler(userImage) {
  popUpImageAtributes.src = userImage.src;
  popUpImageAtributes.alt = userImage.alt; //замечание 4 todo подумать над описанием типа  `Фотография места: ${userImage.alt}`;
  popUpImageDesc.textContent = userImage.alt;
  handlePopUpOpen(popUpImage);
  //toggleClass(popUpImage, "popup_is-opened");
}

//make it anmated
popUpImage.classList.add("popup_is-animated");
editPopUp.classList.add("popup_is-animated");
addPopUp.classList.add("popup_is-animated");

//добавить листенеры на элементы
// открыть Add

addOpenBtn.addEventListener("click", function () {
  if (newPlaceDescr.value !== "" || newPlaceUrl.value !== "") {
    newPlaceDescr.value = "";
    newPlaceUrl.value = "";
  }
  //toggleClass(addPopUp, "popup_is-opened");
  handlePopUpOpen(addPopUp);
  
});

//открыть Edit

editOpenBtn.addEventListener("click", function () {
  editProfileFormnNameInput.value = currentProfileName.textContent;
  editProfileFormnJobInput.value = currentProfileJob.textContent;
  handlePopUpOpen(editPopUp);
  //toggleClass(editPopUp, "popup_is-opened");
});

//сабмит Edit

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  currentProfileName.textContent = editProfileFormnNameInput.value;
  currentProfileJob.textContent = editProfileFormnJobInput.value;
  handlePopUpClose(editPopUp);
  //toggleClass(editPopUp, "popup_is-opened");
});

//закрыть Edit

editPopUpCloseBtn.addEventListener("click", function () {
  handlePopUpClose(editPopUp);
});

popUpImageCloseBtn.addEventListener("click", function () {
  handlePopUpClose(popUpImage);
  //toggleClass(popUpImage, "popup_is-opened");
});

addPopUpCloseBtn.addEventListener("click", function (evt) {
  handlePopUpClose(addPopUp);
  //toggleClass(addPopUp, "popup_is-opened");
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
      createCardObject(
        cardTemplateItem,
        newCard,
        deleteObjectHandler,
        imagePopUpHandler,
        imageLikeHandler
      )
    );
  }
  handlePopUpClose(addPopUp);
  //toggleClass(addPopUp, "popup_is-opened");
});

//click listener load once and never unload
document.addEventListener("click", closePopUpByClick);

//PR6



// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  placesContainerCardsList.append(
    createCardObject(
      cardTemplateItem,
      item,
      deleteObjectHandler,
      imagePopUpHandler,
      imageLikeHandler
    )
  );
});
