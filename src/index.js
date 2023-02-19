import './js/navigation.js';
import  {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme} from './js/components/theme_switcher' ;
import LocalStorage from './js/api/local-storage-api';
import * as FakeAPI from './js/api/fake-api';

const localStorage = new LocalStorage('team-9-project');

console.dir(FakeAPI.getPopularNews());

refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();

