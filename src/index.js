//import debounce from 'debounce';
// import debounce from 'lodash.debounce';

import './js/navigation.js';
import './js/api/nytimes-api';
import './js/components/search';
import './js/components/theme_switcher';
import './js/components/calendar';
import LocalStorage from './js/api/local-storage-api';
//import * as FakeAPI from './js/api/fake-api';
import './js/components/weather';
import './js/news-cards.js';
import './js/components/categories/categories.js';
// import Paginator from './js/components/paginator-myoda';
import './js/components/app-dispatcher/app-dispatcher';

const localStorage = new LocalStorage('team-9-project');
// const paginator = new Paginator({
//     itemsPerPage: 1,
//     totalItems: 20,
//     currentPage: 1,
// });
