//функция открытия-закрытия модального окна

export function toggleClass(obj,cls) {
    obj.classList.toggle(cls);
}

//закрытие не клик

function hidePopUpByClick(evt) {
    let activePopUp = document.querySelector('.popup_is-opened');
    if (evt.target === activePopUp) {
        toggleClass(evt.target,'popup_is-opened');
        removeClosePopUpOptionalListeners();
    }
}

//закрытие на Esc

function hidePopUpByEsc(evt) {
    if(evt.key === "Escape") {
        document.removeEventListener('keydown', hidePopUpByEsc);
        let activePopUp = document.querySelector('.popup_is-opened');
        toggleClass(activePopUp,'popup_is-opened');
        removeClosePopUpOptionalListeners();
    }
}

//Изменение курсора мыши вне модального окна (в тексте нет, на картинках к ТЗ есть)

function changeMousePointerStyle(evt) {
    let activePopUp = document.querySelector('.popup_is-opened');
    if (evt.target === activePopUp) {
        document.body.style.cursor = 'pointer';
    } else document.body.style.cursor = 'default';
}


export function addClosePopUpOptionalListeners() {
    document.addEventListener('click', hidePopUpByClick);
    document.addEventListener('keydown', hidePopUpByEsc);
    document.addEventListener('mousemove',changeMousePointerStyle);
}

export function removeClosePopUpOptionalListeners() {
    document.removeEventListener('click', hidePopUpByClick);
    document.removeEventListener('keydown', hidePopUpByEsc);
    document.removeEventListener('mousemove',changeMousePointerStyle);
    document.body.style.cursor = 'default';
}