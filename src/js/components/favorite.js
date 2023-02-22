import LocalStorage from '../api/local-storage-api';
import '../navigation.js';

const localStorage = new LocalStorage('team-9-project');

const galleryContainer = document.querySelector('.gallery');
console.log(galleryContainer);

const cardMarkup = createCard(localStorage.getFavorites());
galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);

function createCard(images) {
    return images
        .map(image => {
            return `
        <li class="gallery__item">
          <a class="gallery__link" href="${image.url}">
            <img
              class="gallery__image"
              src="${image.image}"
              alt="${image.title}"
            />
          </a>
        </li>
      `;
        })
        .join('');
}
console.dir(localStorage.getFavorites());
