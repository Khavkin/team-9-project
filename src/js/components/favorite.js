import LocalStorage from '../api/local-storage-api';
import '../navigation.js';


const localStorage = new LocalStorage('team-9-project');

const galleryConteiner = document.querySelector('.gallery');
console.log(galleryConteiner)


const cardMarkup = createCard.LocalStorage;
galleryConteiner.insertAdjacentHTML('beforeend', cardMarkup);

function createCard(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>
      `;
    })
    .join('');
}
  console.dir(localStorage.getFavorites())