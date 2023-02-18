import  {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme} from './js/components/theme_switcher' ;
  
refsThemeSwitcher.body.classList.add(Theme.LIGHT);
refsThemeSwitcher.checkboxTheme.addEventListener('change', onCheckboxClick);
changeTheme();