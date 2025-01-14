
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
//console.log(cardTemplate);

// @todo: DOM узлы
let places__container = document.querySelector('.places');
//console.log(places__container);
let place__item = places__container.querySelector('.places__list')
//console.log(place__item);

// @todo: Функция создания карточки
function create__card(template, data, delete__method) {
    const user__places__item = template.querySelector('.places__item').cloneNode(true);
    user__places__item.querySelector('.card__image').src = data.link;
    user__places__item.querySelector('.card__image').alt = data.name;
    user__places__item.querySelector('.card__title').textContent = data.name;
    const button__delete = user__places__item.querySelector('.card__delete-button');
    button__delete.addEventListener('click', function (event) { 
        console.log(event);
        //const deleteItem = button__delete.closest('user__places__item');
        user__places__item.remove(); 
        delete__method();
        //delete__function(user__places__item);
    
    }); 
    return user__places__item;
}
// @todo: Функция удаления карточки
function delete__object() {
    //object.remove();
    console.log('delete object'); 
}

// @todo: Вывести карточки на страницу

place__item.append(create__card(cardTemplate, initialCards[0]), delete__object);
place__item.append(create__card(cardTemplate, initialCards[1]), delete__object);
place__item.append(create__card(cardTemplate, initialCards[2]), delete__object);
place__item.append(create__card(cardTemplate, initialCards[3]), delete__object);