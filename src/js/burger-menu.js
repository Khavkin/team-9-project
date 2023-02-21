document.addEventListener("DOMContentLoaded", function() {
  var menuBurger = document.querySelector('.menu-burger__header');
  var navigationList = document.querySelector('.navigation__list');
  var body = document.querySelector('body');
  
  menuBurger.addEventListener('click', function() {
    menuBurger.classList.toggle('open-menu');
    navigationList.classList.toggle('open-menu');
    body.classList.toggle('fixed-page');
  });
});
