const modal = document.querySelector('.modal');
const openMobilBurgerButton = document.querySelector('.header__burger-button');
const closeMobilBurgerButton = document.querySelector('.modal__close-button');

openMobilBurgerButton.addEventListener('click', toggleModal);
closeMobilBurgerButton.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('burger__is-hidden');
}