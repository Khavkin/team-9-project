import './js/navigation.js';
import './js/api/nytimes-api';
import  {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme} from './js/components/theme_switcher' ;
import LocalStorage from './js/api/local-storage-api';
import * as FakeAPI from './js/api/fake-api';
import  './js/components/weather';
const localStorage = new LocalStorage('team-9-project');

console.dir(FakeAPI.getPopularNews());
console.dir(FakeAPI.getNewsByCategory());
console.dir(FakeAPI.getNewsBySearch());
console.dir(FakeAPI.getSectionList());

refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();

