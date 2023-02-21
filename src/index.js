import './js/navigation.js';
import './js/api/nytimes-api';
import  {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme} from './js/components/theme_switcher' ;
import LocalStorage from './js/api/local-storage-api';
import * as FakeAPI from './js/api/fake-api';
// import  './js/components/weather';

const localStorage = new LocalStorage('team-9-project');

refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();

const calendarFild = document.querySelector('.calendar__fild');
const calendarInput = document.querySelector('.calendar__input');
const calendarDays = document.querySelector('.calendar__days');
const calendarIconUp = document.querySelector('.calendar__icon--up');
const calendarIconDown = document.querySelector('.calendar__icon--down');

calendarInput.addEventListener('focus', onCalendarInputFocus);
calendarDays.addEventListener('click', onDaysClick);
calendarIconUp.addEventListener('click', onButtonUpClick);

function onCalendarInputFocus () {
    calendarFild.classList.add('focus');
    calendarInput.classList.add('focus');
    calendarIconUp.classList.remove('calendar-is-hidden');
    calendarIconDown.classList.add('calendar-is-hidden');
}

function onDaysClick (e) {
    if (e.target.nodeName !== 'LI') return;
    calendarFild.classList.remove('focus');
    calendarInput.classList.remove('focus');
    calendarIconUp.classList.add('calendar-is-hidden');
    calendarIconDown.classList.remove('calendar-is-hidden');
}

function onButtonUpClick () {
    calendarFild.classList.remove('focus');
    calendarInput.classList.remove('focus');
    calendarIconUp.classList.add('calendar-is-hidden');
    calendarIconDown.classList.remove('calendar-is-hidden');
}
