import { getSearchArticles } from '../api/nytimes-api';
import { mostPopularNews } from '../api/nytimes-api';
import _debounce from 'debounce';

document.addEventListener('DOMContentLoaded', onChangeResize)

window.addEventListener(
    'resize',
    _debounce(() => {
      onChangeResize();
    }, 100)
);
  


const ulEl = document.querySelector('.list-news-card');
let amountOfElements = 0;
let wetherPosition = 0;



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



function createMarkup({ abstract, title, updated, nytdsection, url, media }) {
  let mediaUrl = "../../images/defaultImg.jpg";
  if (media[0]) {
    mediaUrl = media[0]['media-metadata'][2].url;
  }
  
  return `<li class="list-news-card__item">
  <img src="${mediaUrl}" alt="" class="list-news-card__img" />
  <h2 class="list-news-card__title">${title}</h2>
  <span class="list-news-card__category">${nytdsection}</span>
  <p class="list-news-card__description">${abstract}</p>
  <button
      type="button"
      class="list-news-card__add-favorite"
      data-action="addToFavorite"
    ><span class="news-card__add-favorite--no-active">AddToFavorite<svg class="list-news-card__add-favorite--svg" width="13" height="12" viewBox="0 0 37 32">
    <path d="M10.67 1.143c-4.819 0-8.768 3.897-8.768 8.688 0 3.665 1.623 12.157 15.004 20.384l.003.002.006.003c.841.511 1.9.511 2.741 0l.015-.008-.006.003c13.382-8.227 15.004-16.719 15.004-20.384 0-4.791-3.949-8.688-8.768-8.688-4.066 0-6.587 2.8-7.616 4.063-1.029-1.262-3.55-4.063-7.616-4.063zm0 2.286c3.378 0 6.701 4.112 6.701 4.112a1.144 1.144 0 0 0 1.828.003l.002-.003s3.323-4.112 6.701-4.112c3.597 0 6.482 2.859 6.482 6.402 0 3.059-1.049 10.524-13.911 18.433a.357.357 0 0 1-.375 0C5.236 20.355 4.187 12.89 4.187 9.831c0-3.543 2.885-6.402 6.482-6.402z"/>
  </svg></span><span class="news-card__add-favorite--active hide">RemoveFromFavorite<svg class="list-news-card__add-favorite--svg" width="13" height="12" viewBox="0 0 32 32">
  <path d="M8.382 2.286C4.174 2.286.761 5.662.761 9.829c0 3.362 1.335 11.344 14.459 19.413a1.494 1.494 0 0 0 1.565-.004l-.006.004c13.125-8.069 14.459-16.05 14.459-19.413 0-4.167-3.413-7.543-7.621-7.543-4.206 0-7.618 4.571-7.618 4.571s-3.413-4.571-7.618-4.571z"/>
</svg></span></button>
    <div class="container-news-list__date-read"><span class="list-news-card__newsDate">${updated}</span>
  <a href="${url}" class="list-news-card__link-read-more" target="_blank">Read more</a></div>
</li>`;
}



function updateNews(markup) {
  ulEl.innerHTML = markup;
}


function onError(error) {
  console.log(error);
}



function onChangeResize() { 

  const windowSize = window.innerWidth;
    if (windowSize < 768) {
      amountOfElements = 4;
      wetherPosition = -1;

  }

  if (windowSize >= 768 && window.innerWidth < 1280) {
    amountOfElements = 7;
    wetherPosition = 0;

  };

  if (windowSize >= 1280) {
    amountOfElements = 8;
    wetherPosition = 1;
  }
  

  mostPopularNews().then((data) => {
    onPageLoadNews(data, amountOfElements);
    // getWetherPosition();
  });
};


getSearchArticles().then((data) => {
  console.log('Поиск по запросу', data)
  onPageLoadNews(searchQuery, pageNumber);
});
    

