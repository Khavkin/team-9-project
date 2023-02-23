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

// const cardMarkup = createCard(localStorage.getFavorites());
 const cardMarkup = localStorage.getFavorites().map(data => createFavoriteMarkup(data)).join("");

galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);


function createFavoriteMarkup({
  uri, url, image,snippet,newsdate,readdate,sectionname,section,title,isread,isfavorite,
}) {
  let mediaUrl = '../../images/defaultImg.jpg';
  if (image !=='') {
      mediaUrl = image;
  }
  return `<li class="list-news-card__item" data-uri="${uri}" data-url="${url}" data-snippet="${snippet}" data-title="${title}" data-newsdate="${newsdate}" data-sectionname="${sectionname}" data-section="${section}" data-image="${image}" data-isread="${isread}" data-isfavorite="${isfavorite}" >
<img src="${mediaUrl}" alt="" class="list-news-card__img" />
 <div class='list-news-card__container-title'><h2 class="list-news-card__title">${title}</h2></div>
<span class="list-news-card__category">${sectionname}</span>
<p class="list-news-card__description">${snippet}</p>
<button
    type="button"
    class="list-news-card__btn-add-remove"
    data-add="true"
  ><span class="list-news-card__btn-add-remove--text">Remove from Favorite</span>
  <svg class="list-news-card__add-favorite--svg color-svg1  hidden" width="16" height="16" viewBox="0 0 37 32">
  <path d="M10.67 1.143c-4.819 0-8.768 3.897-8.768 8.688 0 3.665 1.623 12.157 15.004 20.384l.003.002.006.003c.841.511 1.9.511 2.741 0l.015-.008-.006.003c13.382-8.227 15.004-16.719 15.004-20.384 0-4.791-3.949-8.688-8.768-8.688-4.066 0-6.587 2.8-7.616 4.063-1.029-1.262-3.55-4.063-7.616-4.063zm0 2.286c3.378 0 6.701 4.112 6.701 4.112a1.144 1.144 0 0 0 1.828.003l.002-.003s3.323-4.112 6.701-4.112c3.597 0 6.482 2.859 6.482 6.402 0 3.059-1.049 10.524-13.911 18.433a.357.357 0 0 1-.375 0C5.236 20.355 4.187 12.89 4.187 9.831c0-3.543 2.885-6.402 6.482-6.402z"/>
</svg>
<svg class="list-news-card__add-favorite--svg color-svg2" width="13" height="12" viewBox="0 0 32 32">
<path d="M8.382 2.286C4.174 2.286.761 5.662.761 9.829c0 3.362 1.335 11.344 14.459 19.413a1.494 1.494 0 0 0 1.565-.004l-.006.004c13.125-8.069 14.459-16.05 14.459-19.413 0-4.167-3.413-7.543-7.621-7.543-4.206 0-7.618 4.571-7.618 4.571s-3.413-4.571-7.618-4.571z"/>
</svg>
</button>
  <div class="container-news-list__date-read"><span class="list-news-card__newsDate">${newsdate}</span>
<a href="${url}" class="list-news-card__link-read-more" target="_blank" data-link='link'>Read more</a></div>
</li>`;
}


console.dir(localStorage.getFavorites());
