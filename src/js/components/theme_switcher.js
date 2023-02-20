const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};

const refsThemeSwitcher = {
    body: document.querySelector('body'),
    checkboxTheme: document.querySelector('#theme-switch-toggle'),
};

function onCheckboxClick() {
    refsThemeSwitcher.body.classList.toggle(Theme.DARK);
    refsThemeSwitcher.body.classList.toggle(Theme.LIGHT);
    const currentTheme = refsThemeSwitcher.body.classList.value;
    localStorage.setItem('Theme', currentTheme);
}
  
function changeTheme() {
    const saveTheme = localStorage.getItem('Theme');
    if (saveTheme === Theme.DARK) {
        refsThemeSwitcher.checkboxTheme.checked = 'true';
        onCheckboxClick();
    }
}

export {Theme, refsThemeSwitcher, onCheckboxClick, changeTheme};