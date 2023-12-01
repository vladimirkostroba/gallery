import images from "./images.js";

// 

const refs = {
    ul:document.querySelector('#gallery'),
    modal:document.querySelector('.js-modal'),
    modalImg:document.querySelector('.js-img'),
    button:document.querySelector('.js-button'),
}

// 

refs.ul.addEventListener('click', openModal);
refs.button.addEventListener('click', closeModal);

// рендер коллекции
function generationId() {
	images.reduce((acc, el) => {
		el.id = acc;
		return acc + 1;
	}, 1);
}

function galleryHandler(arr,list){
    generationId();
    const galleryMarkup = arr.map(el => {
        return `<li class='gallery__item'>
        <a class="gallery__link" href="${el.original}" >
        <img src="${el.preview}" alt="${el.description}" id="${el.id}"  data-source="${el.original}" class="gallery__image">
      </a>
           </li>`
       }).join('');
       
       list.insertAdjacentHTML("afterbegin",galleryMarkup)
}

galleryHandler(images,refs.ul)

// Открытие модалки


function openModal(e){
    e.preventDefault();

    if(e.target.nodeName !== 'IMG'){
        return
    }

    refs.modal.classList.add('is-open');
    refs.modalImg.src = e.target.dataset.source;
    refs.modalImg.id = e.target.id;


    document.addEventListener('keydown',onEscapeClose);
    document.addEventListener('keydown',scrollingImages);
}

// 

// Закрытие модалки

function closeModal(){
    refs.modalImg.src = ''
    refs.modal.classList.remove('is-open');

    document.removeEventListener('keydown',onEscapeClose);
    document.removeEventListener('keydown',scrollingImages);
}

// Закрытие по Escape

function onEscapeClose(e){
    if(e.code === 'Escape'){
        closeModal()
    }
}

// Пролистывание картинок

function scrollingImages(e){
    let num = Number(refs.modalImg.id);
    
    if(e.code === 'ArrowRight'){
        nextImg(num)
   }

    if(e.code === 'ArrowLeft'){
        prevImg(num)

}
}


function nextImg(num){
   num +=1 ;

   if(num > images.length){
    num = 1
   }

   images.forEach(element => {
    if(element.id === num){
        refs.modalImg.src = element.original;
        refs.modalImg.id = element.id;
        
    }
   });
}



function prevImg(num){
    num -=1 ;

   if(num === 0){
    num = images.length
   }

   images.forEach(element => {
    if(element.id === num){
        refs.modalImg.src = element.original;
        refs.modalImg.id = element.id;
        
    }
   });
}

