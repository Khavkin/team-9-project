// Plan
//  2.3. sort dates in descending order.
// 7. finish Todos.

import LocalStorage from './api/local-storage-api';
import icons from '../images/icons.svg';
import './navigation.js';
import { Theme, refsThemeSwitcher, onCheckboxClick, changeTheme } from './components/theme_switcher';
import { createMarkup } from './news-cards.js';

refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();

const ls = new LocalStorage("team-9-project");
const readNews = ls.getRead();
const galleryEl = document.querySelector(".read-gallery");

function formatDate(ms) {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function groupByDate(news) {
    const readByDate = new Map();
    for (const newsEntity of news) {
        const formattedReadDate = formatDate(newsEntity.readdate);
        if (readByDate.has(formattedReadDate)) {
            const newsForThisDate = readByDate.get(formattedReadDate);
            newsForThisDate.push(newsEntity);
        } else {
            readByDate.set(formattedReadDate, [newsEntity]);
        }   
    }
    return readByDate;
}

const readNewsGroupedByDate = groupByDate(readNews);

if (readNews.length === 0) {
    galleryEl.innerHTML = 
    `<h2 class="rip-title">Sorry, we haven't found any read news.
    </h2>
    <div class="rip-container container">
    </div>`
} else {
    galleryEl.innerHTML = createMarkupForAllDates(readNewsGroupedByDate);
}

function createMarkupForAllDates(readNewsGroupedByDate) {
    let text = `<ul class="read-gallery__list container">`;
    for (const date of readNewsGroupedByDate.keys()) {
        const markupForOneDate = createMarkupForOneDate(date, readNewsGroupedByDate.get(date));
        text += markupForOneDate;
    }
    text += `</ul>`;
    return text;
}

function createMarkupForOneDate(date, news) {
    const iconupURL = icons.slice(0, icons.indexOf('icon-up'));
    const iconDownURL = icons.slice(0, icons.indexOf('icon-down'));
    let newsList = "";
    for (const newsEntity of news) {
        newsList += createMarkup({
            abstract: newsEntity.snippet,
            title: newsEntity.title,
            updated: formatDate(newsEntity.readdate || 
            newsEntity.newsdate),
            nytdsection: newsEntity.sectionname || newsEntity.section,
            url: newsEntity.url,
            media: newsEntity.image,
            uri: newsEntity.uri
        })
    }
    return `<li class="read-gallery__item">
        <div class="date-span">
        ${date}   
        <span class="read-gallery__iconswrap" data-opened="true">
        <svg class="read-gallery__iconup" width="9" height="14">
            <use href="${iconupURL}#icon-up">
            </use>
        </svg>
        <svg class="read-gallery__icondown" width="9" height="14">
            <use href="${iconDownURL}#icon-down">
            </use>
        </svg>
        </span>
        </div>
        <hr class="read-gallery__divider">
        <ul class="news-list">
            ${newsList}
        </ul>
    </li>`;
}; 
// TODO: refactor function toggle (children and parent elements) because of dependency on DOM tree

function toggleDate(e) {
    e.preventDefault();
    const span = e.currentTarget;
    if (span.dataset.opened === "true") {
        span.children[0].style.display = "none";
        span.children[1].style.display = "inline";
        span.dataset.opened = "false";
        span.parentElement.parentElement.children[2].style.display = "none";
    } else {
        span.children[0].style.display = "inline";
        span.children[1].style.display = "none";
        span.dataset.opened = "true";
        span.parentElement.parentElement.children[2].style.removeProperty('display');
    }
}

const iconsEl = document.getElementsByClassName("read-gallery__iconswrap");
const iconsArr = Array.from(iconsEl);


iconsArr.map((galleryIcon) => galleryIcon.addEventListener("click", toggleDate));

function onError(error) {
  console.error(error);
}
