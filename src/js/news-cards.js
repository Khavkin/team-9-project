import {
    mostPopularNews,
    categoryOfNews,
    getSearchArticles,
    limitResults,
} from './api/nytimes-api';

import LocalStorage from './api/local-storage-api';
import icons from '../images/icons.svg';
import defaultImg from '../images/defaultImg.jpg';
import { markupWeather } from './components/weather';
import debounce from 'lodash.debounce';

document.addEventListener('DOMContentLoaded', onChangeResize)

window.addEventListener(
    'resize',
    debounce(() => {
      onChangeResize();
    }, 100)
);

const bodyEl = document.querySelector('[data-name="home"]');
const ulEl = document.querySelector('.list-news-card');
const iconsURL = icons.slice(0, icons.indexOf('?'));

let amountOfElements = 0;
let wetherPosition = 0;

const localStorage = new LocalStorage('team-9-project');

// mostPopularNews().then(onPageLoadNews);
// getSearchArticles().then(onPageLoadNews);

async function onPageLoadNews(news, amountOfElements, wetherPosition) {
    try {
        const resizeNews = news.slice(0, amountOfElements);
        const markup = resizeNews.map(news => createMarkup(news));
        markup.splice(wetherPosition, 0, markupWeather()).join(''); 
        updateNews(markup);
    } catch (error) {
        onError(error);
    }
}
function createMarkup({
    abstract,
    title,
    updated,
    updated_date,
    nytdsection,
    section,
    url,
    media,
    multimedia,
    uri,
}) {
    // TODO: Default image doesnt work, need to fix it.
    let mediaUrl = '../../images/defaultImg.jpg';
    if (typeof(media) === 'object' && media[0]) {
        // TODO: Нам це треба? в якому випадку в нас там об*єкт?
        mediaUrl = media[0]['media-metadata'][2].url;
    } else if (typeof (multimedia) === 'object') {
        try { mediaUrl = multimedia[2].url; }
        catch { 
            // Oops, no image. We'll use default image.
         }
    } else if (typeof (media) === 'string') {
        mediaUrl = media;
    }

    const getDataLocalStorage = localStorage.getItem({ uri });

    let useText = `<use  href="${iconsURL}#icon-favorite" data-favorite class=" color-svg1"></use>
    <use  href="${iconsURL}#icon-favorite-filled" data-favorite class=" color-svg2 hidden"></use>`;

    let readLink = '';
    let btnText = 'Add to favorite';
    let btnPosition = '';
    let btDataAdd = 'true';

    if (getDataLocalStorage) {
        if (getDataLocalStorage.isfavorite) {
            useText = `<use  href="${iconsURL}#icon-favorite" data-favorite class=" color-svg1 hidden"></use>
            <use  href="${iconsURL}#icon-favorite-filled" data-favorite class=" color-svg2 "></use>`;
            btnText = 'Remove from favorite';
            btnPosition = 'btn-position-reload-page';
            btDataAdd = 'false';
        }
        if (getDataLocalStorage.isread) {
            readLink = 'opacity';
        }
    }
    return `<li class="list-news-card__item ${readLink}" data-uri="${uri}" " data-url="${url}" data-snippet="${abstract}" data-title="${title}" data-newsDate="${updated}" data-sectionName="${nytdsection}" data-section="${nytdsection}" data-image="${mediaUrl}">
  <img src="${mediaUrl}" alt="" class="list-news-card__img" />
   <div class='list-news-card__container-title'><h2 class="list-news-card__title">${title}</h2></div>
  <span class="list-news-card__category">${nytdsection || section}</span>
  <p class="list-news-card__description">${abstract}</p>
  <button
      type="button"
      class="list-news-card__btn-add-favorite ${btnPosition}"
      data-add="${btDataAdd}"
    ><span class="list-news-card__btn-add-favorite--text">${btnText}</span>
    <svg width="13" height="12" class="list-news-card__add-favorite--svg">
    ${useText}
</svg>
</button>
    <div class="container-news-list__date-read"><span class="list-news-card__news-date ">${updated || updated_date}</span>
  <a href="${url}" class="list-news-card__link-read-more" target="_blank" data-link='link'>Read more</a></div>
</li>`;
}

function updateNews(markup) {
    if (ulEl !== null) {
        ulEl.innerHTML = markup;
    }
}

function onError(error) {
    console.error(error);
}

function onChangeResize() { 

  const windowSize = window.innerWidth;
    if (windowSize < 768) {
      amountOfElements = 4;
      wetherPosition = 0;

  }

  if (windowSize >= 768 && windowSize < 1280) {
    amountOfElements = 7;
    wetherPosition = 1;

  };

  if (windowSize >= 1280) {
    amountOfElements = 8;
    wetherPosition = 2;
  }
  

  mostPopularNews().then((data) => {
    onPageLoadNews(data, amountOfElements, wetherPosition);
  });
};

if (ulEl !== null) {
    ulEl.addEventListener('click', onBtnClick);
}

function onBtnClick(e) {
    e = e.target;

    let btn = e.parentNode;

    if (btn.type !== 'button') {
        return;
    }

    if (btn.dataset.add === 'true') {
        btn.firstElementChild.textContent = 'Remove from favorite';
        btn.dataset.add = false;

        btn.classList.add('btn-position');
        btn.classList.remove('btn-position-reload-page');
        btn.firstElementChild.nextElementSibling.firstElementChild.classList.add(
            'hidden'
        );

        btn.firstElementChild.nextElementSibling.lastElementChild.classList.remove(
            'hidden'
        );

        btn.firstElementChild.nextElementSibling.lastElementChild.classList.add(
            'color-svg2'
        );

        const parent = e.closest('li');

        const toSave = { ...parent.dataset, isfavorite: true, isread: false };

        if (toSave.isFavorite === true) {
            btn.parentNode.setAttribute('data-favorite', 'favorite');
        }

        localStorage.addToFavorites(toSave);
    } else {
        btn.firstElementChild.textContent = 'Add to favorite';
        btn.dataset.add = true;

        btn.classList.remove('btn-position');
        btn.classList.remove('btn-position-reload-page');

        btn.firstElementChild.nextElementSibling.firstElementChild.classList.remove(
            'hidden'
        );
        btn.firstElementChild.nextElementSibling.lastElementChild.classList.add(
            'hidden'
        );
        const parent = e.closest('li');

        const toDel = {
            ...parent.dataset,
            isfavorite: false,
            isread: false,
        };

        if (toDel.isfavorite === false) {
            btn.parentNode.setAttribute('data-favorite', 'false');
        }
        localStorage.deleteFromFavorites(toDel);
    }
}

if (ulEl !== null) {
    ulEl.addEventListener('click', onLinkClick);
}

function onLinkClick(event) {
    const link = event.target;

    if (link.dataset.link !== 'link') {
        return;
    }

    const parent = link.closest('li');

    const toSave = { ...parent.dataset, isread: true };
    if (toSave.isread === true) {
        link.parentNode.parentNode.setAttribute('data-read', 'read');
        link.parentNode.parentNode.classList.add('opacity');
    }

    localStorage.addToRead(toSave);
}

export { createMarkup, onPageLoadNews };
