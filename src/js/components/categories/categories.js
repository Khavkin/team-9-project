
import {
  mostPopularNews,
  categoryOfNews,
  getSearchArticles,
  limitResults,
} from '../../api/nytimes-api';

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
    section: 'crosswords \u0026 games',
    display_name: 'Crosswords \u0026 Games',
  },
  { section: 'education', display_name: 'Education' },
  { section: 'en español', display_name: 'En Español' },
  { section: 'fashion', display_name: 'Fashion' },
  { section: 'food', display_name: 'Food' },
  { section: 'guides', display_name: 'Guides' },
  { section: 'health', display_name: 'Health' },
  { section: 'home \u0026 garden', display_name: 'Home \u0026 Garden' },
  { section: 'home page', display_name: 'Home Page' },
  { section: 'job market', display_name: 'Job Market' },
  { section: 'lens', display_name: 'Lens' },
  { section: 'magazine', display_name: 'Magazine' },
  { section: 'movies', display_name: 'Movies' },
  { section: 'multimedia/photos', display_name: 'Multimedia/Photos' },
  { section: 'new york', display_name: 'New York' },
  { section: 'obituaries', display_name: 'Obituaries' },
  { section: 'opinion', display_name: 'Opinion' },
  { section: 'parenting', display_name: 'Parenting' },
  { section: 'podcasts', display_name: 'Podcasts' },
  { section: 'reader center', display_name: 'Reader Center' },
  { section: 'real estate', display_name: 'Real Estate' },
  { section: 'science', display_name: 'Science' },
  { section: 'smarter living', display_name: 'Smarter Living' },
  { section: 'sports', display_name: 'Sports' },
  { section: 'style', display_name: 'Style' },
  { section: 'sunday review', display_name: 'Sunday Review' },
  { section: 't brand', display_name: 'T Brand' },
  { section: 't magazine', display_name: 'T Magazine' },
  { section: 'technology', display_name: 'Technology' },
  { section: 'the learning network', display_name: 'The Learning Network' },
  { section: 'the upshot', display_name: 'The Upshot' },
  { section: 'the weekly', display_name: 'The Weekly' },
  { section: 'theater', display_name: 'Theater' },
  { section: 'times insider', display_name: 'Times Insider' },
  { section: 'today’s paper', display_name: 'Today’s Paper' },
  { section: 'travel', display_name: 'Travel' },
  { section: 'u.s.', display_name: 'U.S.' },
  { section: 'universal', display_name: 'Universal' },
  { section: 'video', display_name: 'Video' },
  { section: 'well', display_name: 'Well' },
  { section: 'world', display_name: 'World' },
  { section: 'your money', display_name: 'Your Money' },
];

// всі query селектори

const but = document.querySelectorAll('button');

const generalUl = document.querySelector('.categories_ul');

const otherUl = document.querySelector('.special');

const butOther = document.querySelector('.special_but');

const allBut = document.querySelectorAll(".categories_button")

const svg = document.querySelector(".icon")

const display_button = document.querySelector(".display_buttons")






// перемикання прихованого списку 
butOther.addEventListener('click', clickOth);

function clickOth() {
  otherUl.classList.toggle('is-hidden');
  svg.classList.toggle("icon-click")
  butOther.classList.toggle("bek-for-other")
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
// console.log(originalWindowWidth);


const desktop = buttons.slice(1, 7);

// const tablet = buttons.slice(1,5)
   
display_button.insertAdjacentHTML('afterbegin', desktop.join(''));
   

// const renderButtons = (amount) => {
// const genBut = buttons.slice(1,amount)
// }



//  список який прихований 

const insideOth = insideBut.slice(7, 19);
otherUl.insertAdjacentHTML('afterbegin', insideOth.join(''));


// функція яка відповідає за зміну кольору кнопок

display_button.addEventListener("click", onTagClick);

function onTagClick (e) {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    const currentButton = document.querySelector('.click-chang-bac');
    if (currentButton) {
      currentButton.classList.remove("click-chang-bac")
    }
    e.target.classList.add('click-chang-bac');
}





  






