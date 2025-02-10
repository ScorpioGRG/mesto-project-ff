import '../pages/index.css';  // это под npm
import { initialCards, createCardObject, deleteObjectHandler, imageLikeHandler } from './cards.js';
import { toggleClass, /*hidePopUpByClick, hidePopUpByEsc, changeMousePointerStyle,*/ addClosePopUpOptionalListeners, removeClosePopUpOptionalListeners } from './modal.js';
// @todo: Темплейт карточки
const getCardTemplate = () => { return document.querySelector('#card-template').content.querySelector('.places__item'); }
const cardTemplateItem = getCardTemplate();
// @todo: DOM узлы
const placesContainer = document.querySelector('.places');
const placeItem = placesContainer.querySelector('.places__list');
//PR6
//интерактивные элементы на странице, кнопки и попапы
const editOpenBtn = getObjectByUniqType('.profile__edit-button');
const addOpenBtn = getObjectByUniqType('.profile__add-button');
const editPopUp = getObjectByUniqType('.popup_type_edit');
const addPopUp = getObjectByUniqType('.popup_type_new-card');
const addPopUpCloseBtn = addPopUp.querySelector('.popup__close');
const editPopUpCloseBtn = editPopUp.querySelector('.popup__close');
const editProfileForm = document.forms["edit-profile"];
const editProfileFormnNameInput = editProfileForm.name;
const editProfileFormnJobInput = editProfileForm.description;
const currentProfileName =  document.querySelector('.profile__title');
const currentProfileJob = document.querySelector('.profile__description');
const popUpImage = getObjectByUniqType('.popup_type_image');
const popUpImageSrc = popUpImage.querySelector('.popup__image');
const popUpImageDesc = popUpImage.querySelector('.popup__caption');
const popUpImageCloseBtn = popUpImage.querySelector('button');
const addNewPlaceForm = document.forms["new-place"];
const newPlaceUrl = addNewPlaceForm.link;
const newPlaceDescr = addNewPlaceForm["place-name"];
//PR6

//returns the first object with obj
function getObjectByUniqType(obj) {
    const result = document.querySelector(obj);
    return(result);
}

function imagePopUpHandler(userImage) {
    popUpImageSrc.src =  userImage.src;
    popUpImageDesc.textContent = userImage.alt;
    addClosePopUpOptionalListeners();
    toggleClass(popUpImage,'popup_is-opened');
}


//make it anmated
popUpImage.classList.add('popup_is-animated');
editPopUp.classList.add('popup_is-animated');
addPopUp.classList.add('popup_is-animated');


//добавить листенеры на элементы
// открыть Add

addOpenBtn.addEventListener('click', function() {
    if ((newPlaceDescr.value !=='')||(newPlaceUrl.value !=='')){
        newPlaceDescr.value = '';
        newPlaceUrl.value = '';
    }
    toggleClass(addPopUp,'popup_is-opened');
    addClosePopUpOptionalListeners();
});

//открыть Edit

editOpenBtn.addEventListener('click', function() {
    addClosePopUpOptionalListeners();
    editProfileFormnNameInput.value = currentProfileName.textContent;
    editProfileFormnJobInput.value = currentProfileJob.textContent;
    toggleClass(editPopUp,'popup_is-opened');
});


//сабмит Edit

editProfileForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    currentProfileName.textContent = editProfileFormnNameInput.value;
    currentProfileJob.textContent = editProfileFormnJobInput.value;
    removeClosePopUpOptionalListeners();
    toggleClass(editPopUp,'popup_is-opened');
});

//закрыть Edit

editPopUpCloseBtn.addEventListener('click', function() {
    removeClosePopUpOptionalListeners();
    toggleClass(editPopUp,'popup_is-opened');
});

popUpImageCloseBtn.addEventListener('click', function(){
    removeClosePopUpOptionalListeners();
    toggleClass(popUpImage,'popup_is-opened');
    });



addPopUpCloseBtn.addEventListener('click', function(evt) {
    removeClosePopUpOptionalListeners();
    toggleClass(addPopUp,'popup_is-opened');
});


//Сабмит edit

addNewPlaceForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    if ((newPlaceDescr.value !=='')&&(newPlaceUrl.value !=='')){
        let newCard = {
        name: newPlaceDescr.value,
        link: newPlaceUrl.value};
        placeItem.prepend(createCardObject(cardTemplateItem, newCard, deleteObjectHandler, imagePopUpHandler, imageLikeHandler));
        }
    removeClosePopUpOptionalListeners();
    toggleClass(addPopUp,'popup_is-opened');
});




//PR6

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    placeItem.append(createCardObject(cardTemplateItem, item, deleteObjectHandler, imagePopUpHandler, imageLikeHandler));
  }); 
