const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.menu-burger__header');
const closeButton = document.querySelector('.close-modal');

modalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

const themeSwitch = document.querySelector('.theme-switch');

if (window.innerWidth < 767) {
  themeSwitch.style.display = 'none';
}




