import { getArticleByCategory, categoryOfNews } from '../../api/nytimes-api';
import { onPageLoadNews } from '../../news-cards';

const MOBILE = 1;
const TABLET = 2;
const DESKTOP = 3;
let currentMedia = MOBILE;

const P = [
    { section: 'admin', display_name: 'Admin' },
    { section: 'arts', display_name: 'Arts' },
    { section: 'automobiles', display_name: 'Automobiles' },
    { section: 'books', display_name: 'Books' },
    { section: 'briefing', display_name: 'Briefing' },
    { section: 'business', display_name: 'Business' },
    { section: 'climate', display_name: 'Climate' },
    { section: 'corrections', display_name: 'Corrections' },
    {
        section: encodeURIComponent('crosswords & games'),
        display_name: 'Crosswords \u0026 Games',
    },
    { section: 'education', display_name: 'Education' },
    { section: encodeURIComponent('en español'), display_name: 'En Español' },
    { section: 'fashion', display_name: 'Fashion' },
    { section: 'food', display_name: 'Food' },
    { section: 'guides', display_name: 'Guides' },
    { section: 'health', display_name: 'Health' },
    // { section: 'home \u0026 garden', display_name: 'Home \u0026 Garden' },
    // { section: 'home page', display_name: 'Home Page' },
    // { section: 'job market', display_name: 'Job Market' },
    { section: 'lens', display_name: 'Lens' },
    { section: 'magazine', display_name: 'Magazine' },
    { section: 'movies', display_name: 'Movies' },
    {
        section: encodeURIComponent('multimedia/photos'),
        display_name: 'Multimedia/Photos',
    },
    // { section: 'new york', display_name: 'New York' },
    { section: 'obituaries', display_name: 'Obituaries' },
    { section: 'opinion', display_name: 'Opinion' },
    { section: 'parenting', display_name: 'Parenting' },
    { section: 'podcasts', display_name: 'Podcasts' },
    {
        section: encodeURIComponent('reader center'),
        display_name: 'Reader Center',
    },
    { section: encodeURIComponent('real estate'), display_name: 'Real Estate' },
    { section: 'science', display_name: 'Science' },
    {
        section: encodeURIComponent('smarter living'),
        display_name: 'Smarter Living',
    },
    { section: 'sports', display_name: 'Sports' },
    { section: 'style', display_name: 'Style' },
    {
        section: encodeURIComponent('sunday review'),
        display_name: 'Sunday Review',
    },
    { section: 't brand', display_name: 'T Brand' },
    { section: 't magazine', display_name: 'T Magazine' },
    { section: 'technology', display_name: 'Technology' },
    {
        section: encodeURIComponent('the learning network'),
        display_name: 'The Learning Network',
    },
    { section: encodeURIComponent('the upshot'), display_name: 'The Upshot' },
    { section: encodeURIComponent('the weekly'), display_name: 'The Weekly' },
    { section: 'theater', display_name: 'Theater' },
    {
        section: encodeURIComponent('times insider'),
        display_name: 'Times Insider',
    },
    {
        section: encodeURIComponent('today’s paper'),
        display_name: 'Today’s Paper',
    },
    { section: 'travel', display_name: 'Travel' },
    { section: encodeURIComponent('u.s.'), display_name: 'U.S.' },
    { section: 'universal', display_name: 'Universal' },
    { section: 'video', display_name: 'Video' },
    { section: 'well', display_name: 'Well' },
    { section: 'world', display_name: 'World' },
    { section: encodeURIComponent('your money'), display_name: 'Your Money' },
];

// всі query селектори

const but = document.querySelectorAll('button');

const generalUl = document.querySelector('.categories_ul');

const otherUl = document.querySelector('.special');

const butOther = document.querySelector('.special_but');

const allBut = document.querySelectorAll('.categories_button');

const svg = document.querySelector('.icon');

const display_button = document.querySelector('.display_buttons');

// перемикання прихованого списку
butOther.addEventListener('click', clickOth);

function clickOth() {
    return; // test
    otherUl.classList.toggle('is-hidden');
    svg.classList.toggle('icon-click');
    butOther.classList.toggle('bek-for-other');
}

// рендер кнопок
const buttons = P.map(
    paragraf =>
        `<li> <button type = "button" class ="categories_button display_button " data-section=${paragraf.section}>${paragraf.display_name}</button> </li>`
);

const insideBut = P.map(
    paragraf =>
        `<li class = "inside_li"> <button type = "button" class ="other_but" data-section=${paragraf.section}>${paragraf.display_name}</button> </li>`
);

// зміна ширини

// let originalWindowWidth = window.innerHeight

//  const isRerenderNeeded = () => {
//   let currentWindowWidth = window.innerWidth

//   console.log(originalWindowWidth,currentWindowWidth);

//   if ((currentWindowWidth < 768 && originalWindowWidth < 768) || (currentWindowWidth >= 768 && originalWindowWidth >= 768)) {
//     return false
//   }
// originalWindowWidth = window.innerWidth

// return true
//  }

//  const renderButtons = (amount) => {
//   const genbut  = buttons.slice(1,amount)
//  }

// const tablet = buttons.slice(1,5)
//const desktop = buttons.slice(1, 7);

//display_button.insertAdjacentHTML('afterbegin', desktop.join(''));

renderButtonsByMedia();

// const renderButtons = (amount) => {
// const genBut = buttons.slice(1,amount)
// }

//  список який прихований

const insideOth = insideBut.slice(7, 19);
otherUl.insertAdjacentHTML('afterbegin', insideOth.join(''));

// функція яка відповідає за зміну кольору кнопок

display_button.addEventListener('click', onTagClick);

function onTagClick(e) {
    return; //test
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    const currentButton = document.querySelector('.click-chang-bac');
    if (currentButton) {
        currentButton.classList.remove('click-chang-bac');
    }
    e.target.classList.add('click-chang-bac');
    let category = e.target.dataset.section;
    getArticleByCategory(category).then(onPageLoadNews);
}

generalUl.addEventListener('click', handlerOnULClick);

function handlerOnULClick(e) {
    e.preventDefault();
    let target = e.target;
    const closest = target.closest('button');
    if (closest && closest.nodeName === 'BUTTON') target = closest;
    if (target.nodeName !== 'BUTTON') {
        return;
    }

    //console.log('Categories on main UL Click ');
    // console.dir(target);
    if ('section' in target.dataset) {
        let category = target.dataset.section;
        getArticleByCategory(category).then(onPageLoadNews);

        if (target.classList.contains('categories_button')) {
            const currentButton = document.querySelector('.click-chang-bac');
            if (currentButton) {
                currentButton.classList.remove('click-chang-bac');
            }
            target.classList.toggle('click-chang-bac');
            if (butOther.classList.contains('bek-for-other')) {
                otherUl.classList.toggle('is-hidden');
                svg.classList.toggle('icon-click');
                butOther.classList.toggle('bek-for-other');
            }
        }

        if (target.classList.contains('other_but')) {
            otherUl.classList.toggle('is-hidden');
            svg.classList.toggle('icon-click');
            butOther.classList.toggle('bek-for-other');
            const currentButton = document.querySelector('.click-chang-bac');
            if (currentButton) {
                currentButton.classList.remove('click-chang-bac');
            }
        }
        //console.log(e.target.dataset.section);
    }

    if (target.classList.contains('special_but')) {
        otherUl.classList.toggle('is-hidden');
        svg.classList.toggle('icon-click');
        butOther.classList.toggle('bek-for-other');
    }
}

window.addEventListener('resize', handlerOnResize);

function handlerOnResize(e) {
    const media = getMedia();
    if (currentMedia !== media) {
        renderButtonsByMedia();
        currentMedia = media;
    }
}

function getMedia() {
    if (
        window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches
    ) {
        return MOBILE;
    } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches
    ) {
        return TABLET;
    } else {
        return DESKTOP;
    }
}

function renderButtonsByMedia() {
    const media = getMedia();
    let toRender = [];

    if (media === TABLET) toRender = buttons.slice(1, 5);
    else if (media === DESKTOP) {
        toRender = buttons.slice(1, 7);
    }
    //console.dir(toRender);
    //console.log(toRender.join(''));
    display_button.innerHTML = '';
    display_button.insertAdjacentHTML('afterbegin', toRender.join(''));
}

window.addEventListener('click', handlerOnWindowClick);
function handlerOnWindowClick(e) {
    const elem = e.target.closest('.categories_ul');
    if (elem === null) {
        // console.log('onWindowClick');
        // console.dir(elem);
        if (butOther.classList.contains('bek-for-other')) {
            otherUl.classList.toggle('is-hidden');
            svg.classList.toggle('icon-click');
            butOther.classList.toggle('bek-for-other');
        }
    }
}
