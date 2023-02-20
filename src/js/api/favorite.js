import LocalStorage from './local-storage-api';

console.log(LocalStorage)
const localStorage = new LocalStorage('team-9-project');

const galleryConteiner = document.querySelector('.gallery');
const cardMarkup = createCard(newCard);
galleryConteiner.insertAdjacentHTML('beforeend', cardMarkup);

function createCard(newCard) {
    return newCard
      .map(({  }) => {
        return `
      
        `;
      })
      .join('');
  }
