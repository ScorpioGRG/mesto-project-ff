
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
let places__container = document.querySelector('.places');
let place__item = places__container.querySelector('.places__list')

// @todo: Функция создания карточки
function create__card(template, data, f) {
    const user__places__item = template.querySelector('.places__item').cloneNode(true);
    user__places__item.querySelector('.card__image').src = data.link;
    user__places__item.querySelector('.card__image').alt = data.name;
    user__places__item.querySelector('.card__title').textContent = data.name;
    const button__delete = user__places__item.querySelector('.card__delete-button');
    button__delete.addEventListener('click', function (event) {
        f(user__places__item);
    }); 
    return user__places__item;
}
// @todo: Функция удаления карточки
var delete__object = function (object) {
    object.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    place__item.append(create__card(cardTemplate, item, delete__object));
  }); 
