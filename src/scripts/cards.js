
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

const setOwnerAttribute = (dataSet, field, searchValue, objToSET, ClassToSet) => {
  dataSet.forEach(element => {
   if(element[field] === searchValue) {
   objToSET.classList.add(ClassToSet);
  }
  });
}

export const createCardObject = (template, data, handlers, api) => {
  const userPlacesItem = template.cloneNode(true);
  const userPlaceImageLikeButton = userPlacesItem.querySelector(".card__like-button");
  const userPlaceImageLikeCount = userPlacesItem.querySelector(".card__like-count");
  const buttonDelete = userPlacesItem.querySelector(".card__delete-button");
  const userPlacesImage = userPlacesItem.querySelector(".card__image");
  const userPlaceImageOwner = data.owner._id;
  userPlacesImage.src = data.link;
  userPlacesImage.alt = data.name;
  userPlaceImageLikeCount.textContent = data.likes.length;
  userPlacesItem.querySelector(".card__title").textContent = data.name;
  userPlacesImage.addEventListener("click", function (event) {
    handlers.popUpHandler(userPlacesImage);
  });
  userPlaceImageLikeButton.addEventListener("click", function (event) {
    handlers.likeHandler(userPlaceImageLikeButton, userPlaceImageLikeCount, api, data, handlers.webApi);
  });
  if(userPlaceImageOwner === api.ownerId) {
    buttonDelete.addEventListener("click", function (event) {
     handlers.deleteButtonHandler(userPlacesItem, api, data, handlers.webApi);
    });
  } else buttonDelete.classList.add("popup__button_hidden");
  setOwnerAttribute(data.likes, '_id', api.ownerId, userPlaceImageLikeButton, 'card__like-button_is-active');
    return userPlacesItem;
}

export const deleteObjectHandler =  (obj,api,data, apiHandler) => {
  let apiAddress = api.linkCards + '/' + data._id;
  apiHandler(apiAddress, api.authToken, 'DELETE')
  .then ((result) => { 
    obj.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

export const imageLikeHandler = (obj, likeCount, api, data, apiHandler) => {
  let apiAddress = api.linkCards + '/likes/' +  data._id;
  if(obj.classList.contains("card__like-button_is-active")) {
   apiHandler(apiAddress, api.authToken, 'DELETE')
    .then((result) => {
      likeCount.textContent = result.likes.length;
      obj.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    apiHandler(apiAddress, api.authToken, 'PUT')
    .then((result) =>{
      console.log('like result', result);
      likeCount.textContent = result.likes.length;
      obj.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
  } 
}
