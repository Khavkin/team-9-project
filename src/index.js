//import debounce from 'debounce';
// import debounce from 'lodash.debounce';

import './js/navigation.js';
import './js/api/nytimes-api';
import {dateForRequest, createCurrentMonth} from './js/components/calendar';
import {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme} from './js/components/theme_switcher';
import LocalStorage from './js/api/local-storage-api';
import * as FakeAPI from './js/api/fake-api';
import './js/components/weather';
import './js/news-cards.js';


const localStorage = new LocalStorage('team-9-project');

refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();
createCurrentMonth();