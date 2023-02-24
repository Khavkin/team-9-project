//import debounce from 'debounce';
// import debounce from 'lodash.debounce';

import './js/navigation.js';
import './js/api/nytimes-api';
import {
    refsCalendar,
    onCalendarInputFocus,
    onDaysClick,
    onButtonUpClick,
    createCurrentMonth,
    onPrevButtonYear,
    onNextButtonYear,
    onPrevButtonMonth,
    onNextButtonMonth,
} from './js/components/calendar';
import {
    Theme,
    refsThemeSwitcher,
    onCheckboxClick,
    changeTheme,
} from './js/components/theme_switcher';
import LocalStorage from './js/api/local-storage-api';
import * as FakeAPI from './js/api/fake-api';
import './js/components/weather';
import './js/news-cards.js';
import './js/components/categories/categories.js'


const localStorage = new LocalStorage('team-9-project');

refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();

refsCalendar.calendarInput.addEventListener('focus', onCalendarInputFocus);
refsCalendar.calendarDays.addEventListener('click', onDaysClick);
refsCalendar.calendarIconUp.addEventListener('click', onButtonUpClick);
refsCalendar.calendarPrevButtonMonth.addEventListener(
    'click',
    onPrevButtonMonth
);
refsCalendar.calendarNextButtonMonth.addEventListener(
    'click',
    onNextButtonMonth
);
refsCalendar.calendarPrevButtonYear.addEventListener('click', onPrevButtonYear);
refsCalendar.calendarNextButtonYear.addEventListener('click', onNextButtonYear);
createCurrentMonth();
