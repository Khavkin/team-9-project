const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.menu-burger__header');
const closeButton = document.querySelector('.close-modal');
const themeSwitch = document.querySelector('.theme-switch');

if (window.innerWidth < 767) themeSwitch.style.display = 'none';

modalButton.addEventListener('click', () => {
    modal.style.top = '0';
});

closeButton.addEventListener('click', () => {
  modal.style.top = '-100%';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});