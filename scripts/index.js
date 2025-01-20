
// @todo: Темплейт карточки
const getCardTemplate = () => { return document.querySelector('#card-template').content.querySelector('.places__item'); }
const cardTemplateItem = getCardTemplate();
// @todo: DOM узлы
const placesContainer = document.querySelector('.places');
const placeItem = placesContainer.querySelector('.places__list');

// @todo: Функция создания карточки
function createCardObject(template, data, deleteButtonHandler) {
    const userPlacesItem = template.cloneNode(true);
    const userPlacesImage = userPlacesItem.querySelector('.card__image');
    userPlacesImage.src = data.link;
    userPlacesImage.alt = data.name;
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
    placeItem.append(createCardObject(cardTemplateItem, item, deleteObjectHandler));
  }); 
