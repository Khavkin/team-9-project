import LocalStorage from '../api/local-storage-api';
import '../navigation.js';
import icons from '../../images/icons.svg';
import { Theme, refsThemeSwitcher, onCheckboxClick, changeTheme } from '../components/theme_switcher';


refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();


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
          <h2>
          8 tips for passing an online interview that will help you get a job
          </h2>
          <p>
          Before you start looking for a job, it is useful to familiarize yourself with the job prospects offered by these...
          </p>
          </li>
      `;
        })
        .join('');
}
console.dir(localStorage.getFavorites());
