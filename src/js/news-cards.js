import {
    mostPopularNews,
    categoryOfNews,
    getSearchArticles,
    limitResults,
} from './api/nytimes-api';
import icons from '../images/icons.svg';

const iconsURL = icons.slice(0, icons.indexOf('?'));
console.log(iconsURL);

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
  data-add="true" data-favorite
><span class="list-news-card__btn-text" data-favorite>AddFavorite</span>
<svg width="13" height="12" data-favorite>
    <use class="list-news-card__add-favorite--svg" href="${iconsURL}#icon-favorite" data-favorite></use>
    <use class="list-news-card__remove-favorite--svg hidden" href="${iconsURL}#icon-favorite-filled" data-favorite></use>
</svg>

    
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
ulEl.addEventListener('click', onBtnClick);

function onBtnClick(e) {
    console.dir(e.target);
    if ('favorite' in e.target.dataset) {
        const btn = e.target.closest('button');
        console.dir(btn);
        const svg1 = btn.querySelector('.list-news-card__add-favorite--svg');
        console.log(svg1);
        const svg2 = btn.querySelector('.list-news-card__remove-favorite--svg');
        console.log(svg2);
        const btnText = btn.querySelector('.list-news-card__btn-text');
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
        // btnText.innerText = 'Delete from Favorite';
    }

    // const btnText = document.querySelector('.list-news-card__btn-text');
    // //console.log(e.target.dataset.add);
    // if (e.target.dataset.add === 'true') {
    //     //Значит новость не добавлена и нужно ее добавить
    //     btnText.innerText = 'Delete from Favorite';
    //     e.target.dataset.add = false;
    //     console.dir(btn);
    //     svg1.classList.add('hidden');
    //     svg2.classList.remove('hidden');
    // } else {
    //     //Значит новость добавлена и нужно ее удалить
    //     btnText.innerText = 'Add to Favorite';
    //     e.target.dataset.add = true;
    //     svg1.classList.remove('hidden');
    //     svg2.classList.add('hidden');
    // }
}

// const btn = document.getElementById('btn-favorite');
// btn.addEventListener('click', event => {
//     const svg1 = document.querySelector('.list-news-card__add-favorite--svg');
//     const svg2 = document.querySelector(
//         '.list-news-card__remove-favorite--svg'
//     );

//     const btnText = document.querySelector('.list-news-card__btn-text');
//     console.log(btn.dataset.add);
//     if (btn.dataset.add === 'true') {
//         //Значит новость не добавлена и нужно ее добавить
//         btnText.innerText = 'Delete from Favorite';
//         btn.dataset.add = false;
//         console.dir(btn);
//         svg1.classList.add('hidden');
//         svg2.classList.remove('hidden');
//     } else {
//         //Значит новость добавлена и нужно ее удалить
//         btnText.innerText = 'Add to Favorite';
//         btn.dataset.add = true;
//         svg1.classList.remove('hidden');
//         svg2.classList.add('hidden');
//     }
// });
