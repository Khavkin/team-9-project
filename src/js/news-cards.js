import {
    mostPopularNews,
    categoryOfNews,
    getSearchArticles,
    limitResults,
} from './api/nytimes-api';

const bodyEl = document.querySelector('[data-name="home"]');

const ulEl = document.querySelector('.list-news-card');

// const btnEl = document.querySelector('.list-news-card__add-favorite');
// btnEl.addEventListener('click', onClickBtn);

// ulEl.addEventListener('click', onClickBtn);

onPageLoadNews();

async function onPageLoadNews() {
    try {
        const news = await mostPopularNews();

        const markup = news.map(news => createMarkup(news)).join('');
        updateNews(markup);
    } catch (error) {
        onError(error);
    }
}

function createMarkup({ abstract, title, updated, nytdsection, url }) {
    return `<li class="list-news-card__item">
  <img src="" alt="" class="list-news-card__img" />
  <h2 class="list-news-card__title">${title}</h2>
  <span class="list-news-card__category">${nytdsection}</span>
  <p class="list-news-card__description">${abstract}</p>
  <button
  type="button"
  class="list-news-card__add-favorite"
  id="btn-favorite"
  data-add="true"
><span class="list-news-card__btn-text">AddFavorite</span>
<svg
      class="list-news-card__add-favorite--svg"
      width="13"
      height="12"
      viewBox="0 0 37 32"
    ><path
        d="M10.67 1.143c-4.819 0-8.768 3.897-8.768 8.688 0 3.665 1.623 12.157 15.004 20.384l.003.002.006.003c.841.511 1.9.511 2.741 0l.015-.008-.006.003c13.382-8.227 15.004-16.719 15.004-20.384 0-4.791-3.949-8.688-8.768-8.688-4.066 0-6.587 2.8-7.616 4.063-1.029-1.262-3.55-4.063-7.616-4.063zm0 2.286c3.378 0 6.701 4.112 6.701 4.112a1.144 1.144 0 0 0 1.828.003l.002-.003s3.323-4.112 6.701-4.112c3.597 0 6.482 2.859 6.482 6.402 0 3.059-1.049 10.524-13.911 18.433a.357.357 0 0 1-.375 0C5.236 20.355 4.187 12.89 4.187 9.831c0-3.543 2.885-6.402 6.482-6.402z"
      /></svg
    >
    <svg
      class="list-news-card__remove-favorite--svg"
      width="13"
      height="12"
      viewBox="0 0 37 32"
    ><path
        d="M8.382 2.286C4.174 2.286.761 5.662.761 9.829c0 3.362 1.335 11.344 14.459 19.413a1.494 1.494 0 0 0 1.565-.004l-.006.004c13.125-8.069 14.459-16.05 14.459-19.413 0-4.167-3.413-7.543-7.621-7.543-4.206 0-7.618 4.571-7.618 4.571s-3.413-4.571-7.618-4.571z"
      /></svg
  >
    
</button>
    <div class="container-news-list__date-read"><span class="list-news-card__newsDate">${updated}</span>
  <a href="${url}" class="list-news-card__link-read-more" target="_blank">Read more</a></div>
</li>`;
}

function updateNews(markup) {
    ulEl.insertAdjacentHTML('beforeend', markup);
}

function onError(error) {
    console.log(error);
}

// const btn = document.getElementById('btn-favorite');
// ulEl.addEventListener('click', onBtnClick);

// function onBtnClick(e) {
//     const svg1 = document.querySelector('.list-news-card__add-favorite--svg');
//     console.log(svg1);
//     const svg2 = document.querySelector(
//         '.list-news-card__remove-favorite--svg'
//     );
//     console.log(svg2);

//     const btnText = document.querySelector('.list-news-card__btn-text');
//     console.log(e.target.dataset.add);
//     if (e.target.dataset.add === 'true') {
//         //Значит новость не добавлена и нужно ее добавить
//         btnText.innerText = 'Delete from Favorite';
//         e.target.dataset.add = false;
//         console.dir(btn);
//         svg1.classList.add('hidden');
//         svg2.classList.remove('hidden');
//     } else {
//         //Значит новость добавлена и нужно ее удалить
//         btnText.innerText = 'Add to Favorite';
//         e.target.dataset.add = true;
//         svg1.classList.remove('hidden');
//         svg2.classList.add('hidden');
//     }
// }

const btn = document.getElementById('btn-favorite');
btn.addEventListener('click', event => {
    const svg1 = document.querySelector('.list-news-card__add-favorite--svg');
    const svg2 = document.querySelector(
        '.list-news-card__remove-favorite--svg'
    );

    const btnText = document.querySelector('.list-news-card__btn-text');
    console.log(btn.dataset.add);
    if (btn.dataset.add === 'true') {
        //Значит новость не добавлена и нужно ее добавить
        btnText.innerText = 'Delete from Favorite';
        btn.dataset.add = false;
        console.dir(btn);
        svg1.classList.add('hidden');
        svg2.classList.remove('hidden');
    } else {
        //Значит новость добавлена и нужно ее удалить
        btnText.innerText = 'Add to Favorite';
        btn.dataset.add = true;
        svg1.classList.remove('hidden');
        svg2.classList.add('hidden');
    }
});
