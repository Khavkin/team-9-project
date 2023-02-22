import './js/navigation.js';
import './js/api/nytimes-api';
import LocalStorage from './js/api/local-storage-api';
import  {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme} from './js/components/theme_switcher' ;
import * as FakeAPI from './js/api/fake-api';
import './js/components/weather';

const localStorage = new LocalStorage('team-9-project');

refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();

const calendarFild = document.querySelector('.calendar__fild');
const calendarInput = document.querySelector('.calendar__input');
const calendarDays = document.querySelector('.calendar__days');

calendarInput.addEventListener('focus', onCalendarInputFocus);
calendarDays.addEventListener('click', onDaysClick);

function onCalendarInputFocus() {
    calendarFild.classList.add('focus');
    calendarInput.classList.add('focus');
}

function onDaysClick(e) {
    if (e.target.nodeName !== 'LI') return;
    calendarFild.classList.remove('focus');
    calendarInput.classList.remove('focus');
}
