// Plan
// 1. DONE get all read news (getReaded)
//  1.1.Done what is the structure of this data? (array, object etc.). Array of objects Done
//  1.2. DONE do I have everything I need? 
// 2. DONE render of js markup (TODO for 20.02.2023)
//  2.1. DONE reorganize data with the given structure to show on the page as in mock-up
//  2.2. DONE group data by read date.
//  2.3. sort dates in descending order.
// 3. DONE call function made by Dmytro Konovalov (I have to have function arguments he needs)
// 4. Ask Dmytro about storage key for saved news in local storage
// 5. DONE if there are no read news - picture and text We havent found read news.
// 6. drink banana beer and celebrate with Broshe4ku and eat banana bread :)
// 7. finish Todos.

import LocalStorage from './api/local-storage-api';
import icons from '../images/icons.svg';

// // Fake data. 
// // TODO: Remove
// const news = [
//     {
//         uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbeaf6',
//                 url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
//                 image: 'https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png',
//                 snippet:
//                     'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'Technology',
//                 section: 'technology',
//                 title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
//                 isRead: false,
//                 isFavorite: false,
//             },
//             {
//                 uri: 'nyt://article/41008f54-e126-5918-901e-c3d8efb033b8',
//                 url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-transcript.html',
//                 image: 'https://static01.nyt.com/images/2023/02/16/business/16roose-transcript-01/16roose-transcript-01-mediumThreeByTwo440.jpg',
//                 snippet:
//                     'In a two-hour conversation with our columnist, Microsoft’s new chatbot said it would like to be human, had a desire to be destructive and was in love with the person it was chatting with. Here’s the transcript.',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'Technology',
//                 section: 'technology',
//                 title: 'Bing’s A.I. Chat: ‘I Want to Be Alive. 😈’',
//                 isRead: false,
//                 isFavorite: false,
//             },
//             {
//                 uri: 'nyt://article/139b8fd7-2643-5bf5-bb6d-ccbea8c22013',
//                 url: 'https://www.nytimes.com/2023/02/16/us/politics/john-fetterman-health.html',
//                 image: 'https://static01.nyt.com/images/2023/02/10/multimedia/10dc-Fetterman-health_1-fpcq/10dc-Fetterman-health_1-fpcq-mediumThreeByTwo440.jpg',
//                 snippet:
//                     'A spokesman for the first-term senator from Pennsylvania, who had a near-fatal stroke last year, said his depression had grown severe in recent weeks, as he has worked to adjust to life in the Senate.',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'u.s.',
//                 section: 'technology',
//                 title: 'Fetterman Checks In to Hospital for Treatment of Clinical Depression',
//                 isRead: false,
//                 isFavorite: false,
//     },
//             {
//                 uri: 'nyt://article/9b2f4603-bc23-5e02-a0da-1235680624a5',
//                 url: 'https://www.nytimes.com/2023/02/16/technology/ohio-train-derailment-chernobyl.html',
//                 image: 'https://static01.nyt.com/images/2023/02/15/multimedia/derailment-01-hmqf/derailment-01-hmqf-mediumThreeByTwo440.jpg',
//                 snippet:
//                     'For many influencers across the political spectrum, claims about the environmental effects of the train derailment have gone far beyond known facts.',
//                 newsDate: '2023-02-16',
//                 readDate: '',
//                 sectionName: 'Technology',
//                 section: 'technology',
//                 title: '‘Chernobyl 2.0’? Ohio Train Derailment Spurs Wild Speculation.',
//                 isRead: false,
//                 isFavorite: false,
//             },
//             {
//                 uri: 'nyt://article/b503979a-689b-5220-9db7-d6069f54bd2b',
//                 url: 'https://www.nytimes.com/2023/02/16/opinion/jk-rowling-transphobia.html',
//                 image: 'https://static01.nyt.com/images/2023/02/17/opinion/16PAUL_4/16PAUL_4-mediumThreeByTwo440-v3.jpg',
//                 snippet:
//                     'The charge that she’s a transphobe doesn’t square with her actual views.',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'Opinion',
//                 section: 'opinion',
//                 title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
//                 isRead: false,
//                 isFavorite: false,
//             },
//             {
//                 uri: 'nyt://article/4d13d8a7-9db8-5cd0-ae18-f22b0c7dd7ec',
//                 url: 'https://www.nytimes.com/2023/02/16/arts/television/sarah-silverman-newsmax-woke.html',
//                 image: 'https://static01.nyt.com/images/2023/02/16/arts/16latenight/16latenight-mediumThreeByTwo440.png',
//                 snippet:
//                     '“The Daily Show” guest host Sarah Silverman called Newsmax “basically an even more far-right Fox News — like if your crazy uncle had a crazy uncle.”',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'Arts',
//                 section: 'arts',
//                 title: 'Sarah Silverman Defines ‘Woke’ for Newsmax',
//                 isRead: false,
//                 isFavorite: false,
//     },
//             {
//                 uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbea56',
//                 url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
//                 image: 'https://static01.nyt.com/images/2023/02/16/arts/16latenight/16latenight-mediumThreeByTwo440.png',
//                 snippet:
//                     'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'Technology',
//                 section: 'technology',
//                 title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
//                 isRead: false,
//                 isFavorite: false,
//             },
//             {
//                 uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbe4f6',
//                 url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
//                 image: 'https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png',
//                 snippet:
//                     'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'Technology',
//                 section: 'technology',
//                 title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
//                 isRead: false,
//                 isFavorite: false,
//             },
//             {
//                 uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6e44dbeaf6',
//                 url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
//                 image: 'https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png',
//                 snippet:
//                     'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
//                 newsDate: '2023-02-16',
//                 readDate: Date.now(),
//                 sectionName: 'Technology',
//                 section: 'technology',
//                 title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
//                 isRead: false,
//                 isFavorite: false,
//             },
// ];

const ls = new LocalStorage("readNews");
// ls.addToRead(news[0]);
// ls.addToRead(news[3]);
// ls.addToRead(news[5]);
// ls.addToRead(news[7]);
const readNews = ls.getRead();
const galleryEl = document.querySelector(".read-gallery");

function formatDate(ms) {
    // Why is the date not shown properly sometimes?
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function groupByDate(news) {
    const readByDate = new Map();
    for (const newsEntity of news) {
        const formattedReadDate = formatDate(newsEntity.readDate);
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
        newsList += createMarkup({abstract: newsEntity.snippet, title: newsEntity.title, updated: newsEntity.newsDate, nytdsection: newsEntity.sectionName, url: newsEntity.url})
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
        span.parentElement.parentElement.children[2].style.display = "block";
    }
}

const iconsEl = document.getElementsByClassName("read-gallery__iconswrap");
const iconsArr = Array.from(iconsEl);


iconsArr.map((galleryIcon) => galleryIcon.addEventListener("click", toggleDate));


// Function of Dmytro Konovalov

function createMarkup({ abstract, title, updated, nytdsection, url }) {
  return `<li class="list-news-card__item">
  <img src="" alt="" class="list-news-card__img" />
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

function onError(error) {
  console.log(error);
}


