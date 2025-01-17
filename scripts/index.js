
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const placesContainer = document.querySelector('.places');
const placeItem = placesContainer.querySelector('.places__list');

// @todo: Функция создания карточки
function createCardObject(template, data, deleteButtonHandler) {
    const userPlacesItem = template.querySelector('.places__item').cloneNode(true);
    userPlacesItem.querySelector('.card__image').src = data.link;
    userPlacesItem.querySelector('.card__image').alt = data.name;
    userPlacesItem.querySelector('.card__title').textContent = data.name;
    const buttonDelete = userPlacesItem.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', function (event) {
        deleteButtonHandler(userPlacesItem);
    }); 
    return userPlacesItem;
}
// @todo: Функция удаления карточки
const deleteObjectHandler = function (object) {
    object.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    placeItem.append(createCardObject(cardTemplate, item, deleteObjectHandler));
  }); 
