import {
    mostPopularNews,
    categoryOfNews,
    getSearchArticles,
    limitResults,
} from './api/nytimes-api';

import LocalStorage from './api/local-storage-api';
import icons from '../images/icons.svg';
import defaultImg from '../images/defaultImg.jpg';

const bodyEl = document.querySelector('[data-name="home"]');
const ulEl = document.querySelector('.list-news-card');
const iconsURL = icons.slice(0, icons.indexOf('?'));

const localStorage = new LocalStorage('team-9-project');

mostPopularNews().then(onPageLoadNews);
// getSearchArticles().then(onPageLoadNews);

async function onPageLoadNews(news, amountOfElements) {
    try {
        const resizeNews = news.slice(0, amountOfElements);
        const markup = resizeNews.map(news => createMarkup(news)).join('');
        console.log(amountOfElements);
        updateNews(markup);
    } catch (error) {
        onError(error);
    }
}
function createMarkup({
    abstract,
    title,
    updated,
    nytdsection,
    url,
    media,
    uri,
}) {
    let mediaUrl = defaultImg;
    if (media[0]) {
        mediaUrl = media[0]['media-metadata'][2].url;
    }
    return `<li class="list-news-card__item" data-uri="${uri}" data-url="${url}" data-snippet="${abstract}" data-title="${title}" data-newsDate="${updated}" data-sectionName="${nytdsection}" data-section="${nytdsection}" data-image="${mediaUrl}">
  <img src="${mediaUrl}" alt="" class="list-news-card__img" />
   <div class='list-news-card__container-title'><h2 class="list-news-card__title">${title}</h2></div>
  <span class="list-news-card__category">${nytdsection}</span>
  <p class="list-news-card__description">${abstract}</p>
  <button
      type="button"
      class="list-news-card__btn-add-favorite"
      data-add="true"
    ><span class="list-news-card__btn-add-favorite--text">Add to favorite</span>
    <svg width="13" height="12" class="list-news-card__add-favorite--svg">
    <use  href="${iconsURL}#icon-favorite" data-favorite class=" color-svg1"></use>
    <use  href="${iconsURL}#icon-favorite-filled" data-favorite class=" color-svg2 hidden"></use>
</svg>
</button>
    <div class="container-news-list__date-read"><span class="list-news-card__news-date ">${updated}</span>
  <a href="${url}" class="list-news-card__link-read-more" target="_blank" data-link='link'>Read more</a></div>
</li>`;
}
function updateNews(markup) {
    ulEl.innerHTML = markup;
}
function onError(error) {
    console.log(error);
}

if (document.getElementById('news-cards') !== null) {
    ulEl.addEventListener('click', onBtnClick);
} else {
    return;
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

        const toSave = { ...parent.dataset, isFavorite: false, isRead: true };

        if (toSave.isFavorite === false) {
            btn.parentNode.setAttribute('data-favorite', 'favorite');
        }

        localStorage.addToFavorites(toSave);
    } else {
        btn.firstElementChild.textContent = 'Add to favorite';
        btn.dataset.add = true;

        btn.classList.remove('btn-position');
        btn.firstElementChild.nextElementSibling.firstElementChild.classList.remove(
            'hidden'
        );
        btn.firstElementChild.nextElementSibling.lastElementChild.classList.add(
            'hidden'
        );
        const parent = e.closest('li');

        const toDel = {
            ...parent.dataset,
            isFavorite: false,
            isRead: false,
        };

        if (toDel.isFavorite === true) {
            btn.parentNode.setAttribute('data-favorite', 'false');
        }
        localStorage.deleteFromFavorites(toDel);
    }
}

ulEl.addEventListener('click', onLinkClick);

function onLinkClick(event) {
    const link = event.target;
    event.preventDefault();

    if (link.dataset.link !== 'link') {
        return;
    }

    const parent = link.closest('li');

    const toSave = { ...parent.dataset, isRead: true };
    if (toSave.isRead === true) {
        link.parentNode.parentNode.setAttribute('data-read', 'read');
        link.parentNode.parentNode.classList.add('opacity');
    }

    localStorage.addToRead(toSave);
}
