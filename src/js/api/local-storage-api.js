export default class LocalStorage {
  _storageKey = '';
  _data = { theme: '', news: [{}] };
  constructor(storageKey) {
    this._storageKey = storageKey;
    _data = load();
  }

  load() {
    const empty = { theme: '', news: [{}] };
    if (this._storageKey) {
      try {
        const tmp = window.localStorage.getItem(this._storageKey);
        return tmp ? tmp : empty;
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
        window.localStorage.setItem(this._storageKey, this._data);
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  }

  getFavorites() {
    return this._data.news.filter(value => value.favorite === true);
  }

  getReaded() {
    return this._data.news.filter(value => value.read === true);
  }

  addToFavorites(value) {
    // проверить есть ли эта новость со свойством read=true;
    //this._data.push(value);
    //this.save();
  }

  deleteFromFavorites(value) {
    // 1. найти по значению uri новость в массиве
    // 2. если у новости read=true , то поставить favorite=false. Если read=false удалить из новость массива
    // 3. сохранить сторедж
    // вернуть результат
  }
  addToReaded(value) {
    // проверить есть ли эта новость со свойством read=true;
    //this._data.push(value);
    //this.save();
  }

  deleteFromReaded(value) {
    // 1. найти по значению uri новость в массиве
    // 2. если у новости read=true , то поставить favorite=false. Если read=false удалить из новость массива
    // 3. сохранить сторедж
    // вернуть результат
  }

  find(value) {
    // возвращает новость и индекс в массиве новостей.
  }
}
