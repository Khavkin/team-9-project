import { getSearchArticles } from '../api/nytimes-api';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search-form__input'),
    button: document.querySelector('.search-form__btn'),
    newsList: document.querySelector('.list-news-card'),
    badRequaest: document.querySelector('.bad-request'),
    wether: document.querySelector('.weather'),
    newsBox: document.querySelector('.list-news-card'),
};

const { form, input, button, newsList, badRequaest, wether, newsBox } = refs;
// console.log(newsBox);

let valuePage = {
    curPage: 1,
    numLinksTwoSide: 1,
    totalPages: 100,
};

let page = 1;

form.addEventListener('submit', onFormSumbit);

async function onFormSumbit(e) {
    e.preventDefault();

    const value = input.value;
    const data = await getSearchArticles(value, page);

    if (data.length === 0) {
        newsBox.innerHTML = '';
        badRequaest.style.display = 'block';
    }
    // console.log(value);
    // console.log(data);
}
