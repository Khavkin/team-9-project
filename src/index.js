import './js/navigation.js';
import LocalStorage from './js/api/local-storage-api';
import  {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme} from './js/components/theme_switcher' ;

const localStorage = new LocalStorage('team-9-project');
  
refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();