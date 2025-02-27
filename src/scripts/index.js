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
let ownerID;
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
//получить данные
 const getData =  (addr, token) => {return fetch(addr, {
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then((result) => {
     /* 
     счетчик лайков 
     result.forEach((item) => {
        console.log('likes', item.likes.length);
      });*/



      return new Promise((resolve, reject)=> {
        
        resolve(result);
      });
    }); 
 } 

 let testPerson = {name: 'Родченко', about: 'photographer' };
 let testImage = { name: 'Припять', link: 'https://sun9-58.userapi.com/impg/PKjUPNzRPQmTrSKtOQEvcvzC3A78eMbx0Shs3g/eDaJVNCorTw.jpg?size=1920x1280&quality=96&sign=b494541b54ed059a0b57baab88b58944&type=album'};


 //Рабочая функция, меняет профиль
const patchData = (addr, token, data) => {
  return  fetch(addr, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
   },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((result) => {
    return new Promise((resolve, reject)=> {
      console.log('patch result', result.name);
      resolve(result);
    });
  })
}

const postData = (addr,token, data)  => {
  return  fetch(addr, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
   },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((result) => {
    return new Promise((resolve, reject)=> {
      console.log('post result', result.name);
      resolve(result);
    });
  })
}

//Универсальная функция PATCH/POST @toDO addr,token, mtd - загнать в объект
const sendData = (addr,token, mtd, data)  => {
  return  fetch(addr, {
    method: mtd,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
   },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((result) => {
    return new Promise((resolve, reject)=> {
      console.log('post result', result.name);
      resolve(result);
    });
  })
}


 

 //Установить профиль
 const setProfile = (profileData) => {
  currentProfileName.textContent = profileData.name;
  currentProfileJob.textContent = profileData.about;
  currentProfileImage.style.cssText= 'background-image: url(' + profileData.avatar +')';
  //console.log('background-image:' + userImage);
 }

 

//исполняемый код
intPopUpWindows();

//тестовый вызов смены профиля
//sendData('https://nomoreparties.co/v1/wff-cohort-33/users/me', 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a', 'PATCH', testPerson);


// patchData('https://nomoreparties.co/v1/wff-cohort-33/users/me', 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a', testPerson);

//тестовое добовление карточки
// postData('https://nomoreparties.co/v1/wff-cohort-33/cards', 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a',testImage);

//эта функция инициирует отрисовку из файла - так было в PR6
/*initialCards.forEach((item) => {
  placesContainerCardsList.append(
    createCardObject(cardTemplateItem, item, cardHandlers)
  );
});*/

//PR7
//enableValidation(addNewPlaceForm, null);
enableValidation();

//грузим профиль через промис
getData('https://nomoreparties.co/v1/wff-cohort-33/users/me', 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a')
.then((evt) => {
  console.log('ME', evt._id);
  setProfile(evt);
  return new Promise((resolve, reject)=> {
    resolve(evt._id);
  });


  //ownerID = evt._id;
  }) .then((id) => {

    console.log('id' , id);

//получаем карточки c сервера
getData('https://nomoreparties.co/v1/wff-cohort-33/cards', 'b3ccccd1-a8c7-4152-a066-4b44c9241c5a')
.then((outData) => {
  outData._id = id;
  console.log('out', outData);
  //console.log('link', out[1].link);
  //console.log('name', out[1].name);
  outData.forEach((item) => {
    placesContainerCardsList.append(
      createCardObject(cardTemplateItem, item, cardHandlers)
    );
  });
});
})


//@to-do delete button + promise.all посмотреть
