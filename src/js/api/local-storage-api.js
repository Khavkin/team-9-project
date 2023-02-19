/****************************
 * структура объекта новости
 * {
 *    uri - идентификатор статьи
 *    url - адресс статьи
 *    image - адресс картинки
 *    snipet - краткая новость
 *    newsDate - дата новости
 *    readDate - дата прочтения
 *    section - название категории
 *    isRead - прочитана
 *    isFavorite - избранная
 *
 * }
 * 
 * import LocalStorage from './js/api/local-storage-api';

const ls = new LocalStorage('test');
const news = [
  {
    uri: '1234',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsDate: Date.now(),
    readDate: Date.now(),
    section: 'test',
    isRead: false,
    isFavorite: false,
  },
  {
    uri: '12345',
    url: '',
    image: '2222dfd',
    snipet: 'sdlsjdlsldfdfdkj',
    newsDate: Date.now(),
    readDate: Date.now(),
    section: 'test1',
    isRead: true,
    isFavorite: false,
  },
  {
    uri: '12345434',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsDate: Date.now(),
    readDate: Date.now(),
    section: 'test',
    isRead: false,
    isFavorite: false,
  },
  {
    uri: '1234-234423',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsDate: Date.now(),
    readDate: Date.now(),
    section: 'test',
    isRead: false,
    isFavorite: false,
  },
  {
    uri: '1234-989343',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsDate: Date.now(),
    readDate: Date.now(),
    section: 'test',
    isRead: false,
    isFavorite: false,
  },
  {
    uri: '1234-423345-234',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsDate: Date.now(),
    readDate: Date.now(),
    section: 'test',
    isRead: false,
    isFavorite: false,
  },
  {
    uri: '1234-223433-234323',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsDate: Date.now(),
    readDate: Date.now(),
    section: 'test',
    isRead: false,
    isFavorite: false,
  },
];

ls.addToFavorites(news[0]);
ls.addToFavorites(news[1]);
ls.addToFavorites(news[2]);
ls.addToReaded(news[2]);
ls.deleteFromFavorites(news[2]);
ls.addToReaded(news[3]);
ls.addToReaded(news[4]);
ls.addToReaded(news[5]);
ls.addToFavorites(news[5]);
ls.deleteFromReaded(news[5]);
ls.addToFavorites(news[6]);
ls.addToFavorites(news[7]);

console.log(ls.getFavorites());
console.log(ls.getReaded());

ls.setTheme('light');
console.log(ls.getTheme());
 */

export default class LocalStorage {
  _storageKey = '';
  _data = { theme: '', news: [] };
  constructor(storageKey) {
    this._storageKey = storageKey;
    this._data = this.load();
  }

  load() {
    const empty = { theme: '', news: [] };
    if (this._storageKey) {
      try {
        const tmp = window.localStorage.getItem(this._storageKey);
        return tmp ? JSON.parse(tmp) : empty;
      } catch (error) {
        console.error(error);
      }
    }
    return empty;
  }

  save() {
    // console.log(value);
    if (this._storageKey) {
      try {
        window.localStorage.setItem(
          this._storageKey,
          JSON.stringify(this._data)
        );
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  }

  getFavorites() {
    console.log(this._data.news);
    return this._data.news.filter(value => value.isFavorite === true);
  }

  getReaded() {
    return this._data.news.filter(value => value.isRead === true);
  }

  addToFavorites(newFavorite) {
    // проверить есть ли эта новость со свойством read=true;
    if (!newFavorite) return false;
    const index = this.find(newFavorite);

    if (index === -1) {
      newFavorite.isFavorite = true;
      this._data.news.push(newFavorite);
    } else {
      this._data.news[index].isFavorite = true;
    }
    this.save();
  }

  deleteFromFavorites(toDelete) {
    // 1. найти по значению uri новость в массиве
    if (!toDelete) return false;
    const index = this.find(toDelete);

    // 2. если у новости read=true , то поставить favorite=false. Если read=false удалить новость из массива
    if (index !== -1) {
      if (this._data.news[index].isRead) {
        this._data.news[index].isFavorite = false;
      } else {
        this._data.news = this._data.news.splice(index, 1);
      }
      this.save();
    }
    // 3. сохранить сторедж
    // вернуть результат
  }
  addToReaded(newReaded) {
    if (!newReaded) return false;
    const index = this.find(newReaded);

    if (index === -1) {
      newReaded.isRead = true;
      this._data.news.push(newReaded);
    } else {
      this._data.news[index].isRead = true;
    }
    this.save();
    // проверить есть ли эта новость со свойством read=true;
  }

  deleteFromReaded(toDelete) {
    if (!toDelete) return false;
    const index = this.find(toDelete);

    // 2. если у новости read=true , то поставить favorite=false. Если read=false удалить новость из массива
    if (index !== -1) {
      if (this._data.news[index].isRead) {
        this._data.news[index].isFavorite = false;
      } else {
        this._data.news = this._data.news.splice(index, 1);
      }
      this.save();
    }
    // 1. найти по значению uri новость в массиве
    // 2. если у новости read=true , то поставить favorite=false. Если read=false удалить из новость массива
    // 3. сохранить сторедж
    // вернуть результат
  }

  find(toFind) {
    // возвращает индекс в массиве новостей.
    console.log(toFind);
    if (toFind)
      return this._data.news.findIndex(value => value.uri === toFind.uri);
  }

  getTheme() {
    return this._data.theme;
  }

  setTheme(newTheme) {
    this._data.theme = newTheme;
    this.save();
  }
}
