import images from "./images.js";

// 

const refs = {
    ul:document.querySelector('#gallery'),
}

// рендер коллекции

function galleryHandler(arr,list){

    const galleryMarkup = arr.map(el => {
        return `<li class='gallery__item'>
               <img class='gallery__img' src='${el.preview}' alt='${el.description}'/>
           </li>`
       }).join('');
       
       list.insertAdjacentHTML("afterbegin",galleryMarkup)
}

galleryHandler(images,refs.ul)

