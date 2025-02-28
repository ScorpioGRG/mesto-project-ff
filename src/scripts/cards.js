
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


//DELETE https://nomoreparties.co/v1/cohortId/cards/cardId 

const findID = (dataSet, field, searchValue) => {
  dataSet.forEach(element => {
    //console.log('likeID', element[field]);
 
   if(element[field] === searchValue) {
    console.log('TRUE');
    return  new Promise ((resolve, reject) => {
      resolve (true);
    }); 
  }
  });
  console.log('false');
  return new Promise ((resolve, reject) => {
    resolve (false);
  }); 
}



export const createCardObject = (template, data, handlers, userID, api) => {
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
    handlers.likeHandler(userPlaceImageLikeButton, userPlaceImageLikeCount, api, data);
  });
  if(userPlaceImageOwner === userID) {
    buttonDelete.addEventListener("click", function (event) {
      //handlers.dataHandler(apiAddress, api.authToken, 'DELETE', null);
      
      //handlers.dataHandler()
     handlers.deleteButtonHandler(userPlacesItem, api, data);
    });
  } else buttonDelete.classList.add("popup__button_hidden");
  //let likeID =  data.likes
  //console.log('data.likes', data.likes);
  //console.log('findID ', findID(data.likes, '_id', userID));
 

  //if(findID(data.likes, '_id', userID)) {
    //console.log('data.likes', data.likes);
   // console.log('IF TRUE');
  
   //findID(data.likes, '_id', userID)
   /*.then ((result) =>{
    if(result) { 
      userPlaceImageLikeButton.classList.add("card__like-button_is-active");
      
    }
    return new Promise ((resolve, reject) => {
      resolve (userPlacesItem);
    }); 
    return userPlacesItem;

   })*/     
  console.log('card created');
  findID(data.likes, '_id', userID);
    return userPlacesItem;
}

// @todo: Функция удаления карточки
export const deleteObjectHandler =  (obj,api,data) => {
  let apiAddress = api.linkCards + '/' + data._id;
  
  fetch(apiAddress, {
    method: 'DELETE',
    headers: {
      authorization: api.authToken
   }
  })
  .then ((result) => { obj.remove();})
  //obj.remove();
}

// Функция Лайка карточки - переписана, замечание 2
export const imageLikeHandler = (obj, likeCount, api, data) => {
  let apiAddress = api.linkCards + '/likes/' +  data._id;
  
  if(obj.classList.contains("card__like-button_is-active")) {
    fetch(apiAddress, {
      method: 'DELETE',
      headers: {
        authorization: api.authToken
     }
    })
    .then(res => res.json())
    .then((result) => {
      likeCount.textContent = result.likes.length;
      obj.classList.toggle("card__like-button_is-active");
    })  
  } else {
    fetch(apiAddress, {
      method: 'PUT',
      headers: {
        authorization: api.authToken
     }
    })
    .then(res => res.json())
    .then((result) =>{
      console.log('like result', result);
      likeCount.textContent = result.likes.length;
      obj.classList.toggle("card__like-button_is-active");
    })
  } 
}
