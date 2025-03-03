(()=>{"use strict";var e,t=function(e,t,n,o){var r,c,a,u=e.cloneNode(!0),i=u.querySelector(".card__like-button"),l=u.querySelector(".card__like-count"),s=u.querySelector(".card__delete-button"),d=u.querySelector(".card__image"),p=t.owner._id;return d.src=t.link,d.alt=t.name,l.textContent=t.likes.length,u.querySelector(".card__title").textContent=t.name,d.addEventListener("click",(function(e){n.popUpHandler(d)})),i.addEventListener("click",(function(e){n.likeHandler(i,l,o,t,n.webApi)})),p===o.ownerId?s.addEventListener("click",(function(e){n.deleteButtonHandler(u,o,t,n.webApi)})):s.classList.add("popup__button_hidden"),r=t.likes,c=o.ownerId,a=i,r.forEach((function(e){e._id===c&&a.classList.add("card__like-button_is-active")})),u},n=function(e,t,n){var o=e.querySelector("."+t.id+n.errorMark);t.classList.remove(n.errorSelector),o.textContent=""},o=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.buttonDisabledClass),t.removeAttribute("disabled")):(t.classList.add(n.buttonDisabledClass),t.setAttribute("disabled",!0))},r=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(o){n(e,o,t)}));var o=e.querySelector(t.buttonSelector);o.classList.contains(t.buttonDisabledClass)||o.classList.add(t.buttonDisabledClass)},c=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u),e.addEventListener("click",i)},a=function(e){e.classList.contains("popup_is-opened")&&e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u),e.removeEventListener("click",i)},u=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");a(t)}},i=function(e){a(e.target)},l=function(e,t,n,o){return fetch(e,{method:n,headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify(o)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},s=document.querySelector("#card-template").content.querySelector(".places__item"),d=document.querySelector(".places").querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__edit__avatar_button"),f=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_edit"),m=document.querySelector(".popup_type_edit-avatar"),y=document.querySelector(".popup_type_new-card"),b=document.forms["edit-profile"],k=b.name,S=b.description,h=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),L=document.querySelector(".profile__edit__avatar_button"),C=document.querySelector(".popup_type_image"),g=C.querySelector(".popup__image"),E=C.querySelector(".popup__caption"),x=document.forms["new-place"],T=x.link,A=x["place-name"],w=x.querySelector(".popup__button"),P=document.forms["change-avatar"],D=P.link,H={authToken:"b3ccccd1-a8c7-4152-a066-4b44c9241c5a",linkProfile:"https://nomoreparties.co/v1/wff-cohort-33/users/me",linkCards:"https://nomoreparties.co/v1/wff-cohort-33/cards"},M={errorSelector:"popup__input_error",inputSelector:".popup__input",buttonSelector:".popup__button",buttonDisabledClass:"popup__button_disabled",formSelector:".popup__form",errorMark:"-error"},U={deleteButtonHandler:function(e,t,n,o){o(t.linkCards+"/"+n._id,t.authToken,"DELETE").then((function(t){e.remove()})).catch((function(e){console.log(e)}))},popUpHandler:function(e){g.src=e.src,g.alt=e.alt,E.textContent=e.alt,c(C)},likeHandler:function(e,t,n,o,r){var c=n.linkCards+"/likes/"+o._id;e.classList.contains("card__like-button_is-active")?r(c,n.authToken,"DELETE").then((function(n){t.textContent=n.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):r(c,n.authToken,"PUT").then((function(n){console.log("like result",n),t.textContent=n.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))},webApi:l};document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(){a(e)}))})),f.addEventListener("click",(function(){""===A.value&&""===T.value||x.reset(),r(x,M),y.querySelector(".popup__button").textContent="Сохранить",c(y)})),p.addEventListener("click",(function(){k.value=h.textContent,S.value=q.textContent,v.querySelector(".popup__button").textContent="Сохранить",r(b,M),c(v)})),b.addEventListener("submit",(function(e){e.preventDefault(),e.target.querySelector(".popup__button").textContent="Сохранение...";var t={name:k.value,about:S.value};l(H.linkProfile,H.authToken,"PATCH",t).then((function(e){h.textContent=e.name,q.textContent=e.about,a(v)}))})),_.addEventListener("click",(function(){console.log("open ava-edit"),P.reset(),m.querySelector(".popup__button").textContent="Сохранить",r(P,M),c(m)})),m.addEventListener("submit",(function(e){e.preventDefault(),e.target.querySelector(".popup__button").textContent="Сохранение...";var t={avatar:D.value},n=H.linkProfile+"/avatar";l(n,H.authToken,"PATCH",t).then((function(e){console.log("ProfileUpDateAvatar",e),L.style.cssText="background-image: url("+e.avatar+")"})),P.reset(),a(m)})),x.addEventListener("submit",(function(e){if(e.preventDefault(),e.target.querySelector(".popup__button").textContent="Сохранение...",""!==A.value&&""!==T.value){var n={name:A.value,link:T.value};l(H.linkCards,H.authToken,"POST",n).then((function(e){d.prepend(t(s,e,U,H))})).catch((function(e){console.log(e)})),x.reset()}w.classList.add("popup__button_disabled"),a(y)})),e=M,Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),c=e.querySelector(t.buttonSelector);o(r,c,t),r.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,o){t.validity.valid?n(e,t,o):function(e,t,n,o){var r=e.querySelector("."+t.id+n.errorMark);t.classList.add(n.errorSelector),r.textContent=o}(e,t,o,t.dataset.errorMessage)}(e,a,t),o(r,c,t)}))}))}(t,e)}));var j=[l(H.linkProfile,H.authToken).then((function(e){var t;return t=e,h.textContent=t.name,q.textContent=t.about,L.style.cssText="background-image: url("+t.avatar+")",new Promise((function(t,n){t(e._id)}))})).catch((function(e){console.log("Ошибка при загрузке профиля",e)})),l(H.linkCards,H.authToken).catch((function(e){console.log("Ошибка при загрузке карточек пользователей",e)}))];Promise.all(j).then((function(e){H.ownerId=e[0],e[1].forEach((function(e){d.append(t(s,e,U,H))}))}))})();