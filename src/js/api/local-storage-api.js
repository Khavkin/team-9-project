/****************************
 * структура объекта новости
 * {
 *    uri - идентификатор статьи
 *    url - адресс статьи
 *    image - адресс картинки
 *    snipet - краткая новость
 *    newsdate - дата новости
 *    readdate - дата прочтения
 *    section - название категории
 *    isread - прочитана
 *    isfavorite - избранная
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
    newsdate: Date.now(),
    readdate: Date.now(),
    section: 'test',
    isread: false,
    isfavorite: false,
  },
  {
    uri: '12345',
    url: '',
    image: '2222dfd',
    snipet: 'sdlsjdlsldfdfdkj',
    newsdate: Date.now(),
    readdate: Date.now(),
    section: 'test1',
    isread: true,
    isfavorite: false,
  },
  {
    uri: '12345434',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsdate: Date.now(),
    readdate: Date.now(),
    section: 'test',
    isread: false,
    isfavorite: false,
  },
  {
    uri: '1234-234423',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsdate: Date.now(),
    readdate: Date.now(),
    section: 'test',
    isread: false,
    isfavorite: false,
  },
  {
    uri: '1234-989343',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsdate: Date.now(),
    readdate: Date.now(),
    section: 'test',
    isread: false,
    isfavorite: false,
  },
  {
    uri: '1234-423345-234',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsdate: Date.now(),
    readdate: Date.now(),
    section: 'test',
    isread: false,
    isfavorite: false,
  },
  {
    uri: '1234-223433-234323',
    url: '',
    image: '2222',
    snipet: 'sdlsjdlsldkj',
    newsdate: Date.now(),
    readdate: Date.now(),
    section: 'test',
    isread: false,
    isfavorite: false,
  },
];

ls.addToFavorites(news[0]);
ls.addToFavorites(news[1]);
ls.addToFavorites(news[2]);
ls.addToRead(news[2]);
ls.deleteFromFavorites(news[2]);
ls.addToRead(news[3]);
ls.addToRead(news[4]);
ls.addToRead(news[5]);
ls.addToFavorites(news[5]);
ls.deleteFromRead(news[5]);
ls.addToFavorites(news[6]);
ls.addToFavorites(news[7]);

console.log(ls.getFavorites());
console.log(ls.getRead());

ls.setTheme('light');
console.log(ls.getTheme());
 */

const isTest = true;

export default class LocalStorage {
    _storageKey = '';
    _data = { theme: '', news: [] };
    constructor(storageKey) {
        this._storageKey = storageKey;

       // this.hardcore();

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
        //console.log(this._data.news);
        return this._data.news.filter(value => value.isfavorite === true);
    }

    getRead() {
        return this._data.news.filter(value => value.isread === true);
    }

    addToFavorites(newFavorite) {
        // проверить есть ли эта новость со свойством read=true;
        if (!newFavorite) return false;
        const index = this.find(newFavorite);

        if (index === -1) {
            newFavorite.isfavorite = true;
            this._data.news.push(newFavorite);
        } else {
            this._data.news[index].isfavorite = true;
        }
        this.save();
    }

    deleteFromFavorites(toDelete) {
        // 1. найти по значению uri новость в массиве
        if (!toDelete) return false;
        const index = this.find(toDelete);

        // 2. если у новости read=true , то поставить favorite=false. Если read=false удалить новость из массива
        if (index !== -1) {
            if (this._data.news[index].isread) {
                this._data.news[index].isfavorite = false;
            } else {
                this._data.news.splice(index, 1);
            }
            this.save();
        }
        // 3. сохранить сторедж
        // вернуть результат
    }
    addToRead(newReaded) {
        if (!newReaded) return false;
        const index = this.find(newReaded);

        if (index === -1) {
            newReaded.isread = true;
            if (!isTest) newReaded.readdate = Date.now();
            this._data.news.push(newReaded);
        } else {
            this._data.news[index].isread = true;
            if (!isTest) newReaded.readdate = Date.now();
        }
        this.save();
        // проверить есть ли эта новость со свойством read=true;
    }

    deleteFromRead(toDelete) {
        if (!toDelete) return false;
        const index = this.find(toDelete);

        // 2. если у новости read=true , то поставить favorite=false. Если read=false удалить новость из массива
        if (index !== -1) {
            if (this._data.news[index].isread) {
                this._data.news[index].isfavorite = false;
            } else {
                this._data.news.splice(index, 1);
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
        //console.log(toFind);
        if (typeof toGet === 'object' && toGet.hasOwnProperty('uri'))
            return this._data.news.findIndex(value => value.uri === toFind.uri);
        else return -1;
    }

    getItem(toGet) {
        if (typeof toGet === 'object' && toGet.hasOwnProperty('uri')) {
            const index = this.find(toGet);
            if (index >= 0) return this._data[index];
            else return null;
        }
    }

    hardcore() {
        const news = [
            {
                uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbeaf6',
                url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
                image: 'https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png',
                snippet:
                    'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
                newsdate: '2023-02-16',
                readdate: '2023-02-20',
                sectionname: 'Technology',
                section: 'technology',
                title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
                isread: true,
                isfavorite: false,
            },
            {
                uri: 'nyt://article/41008f54-e126-5918-901e-c3d8efb033b8',
                url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-transcript.html',
                image: 'https://static01.nyt.com/images/2023/02/16/business/16roose-transcript-01/16roose-transcript-01-mediumThreeByTwo440.jpg',
                snippet:
                    'In a two-hour conversation with our columnist, Microsoft’s new chatbot said it would like to be human, had a desire to be destructive and was in love with the person it was chatting with. Here’s the transcript.',
                newsdate: '2023-02-16',
                readdate: Date.now(),
                sectionname: 'Technology',
                section: 'technology',
                title: 'Bing’s A.I. Chat: ‘I Want to Be Alive. 😈’',
                isread: true,
                isfavorite: true,
            },
            {
                uri: 'nyt://article/139b8fd7-2643-5bf5-bb6d-ccbea8c22013',
                url: 'https://www.nytimes.com/2023/02/16/us/politics/john-fetterman-health.html',
                image: 'https://static01.nyt.com/images/2023/02/10/multimedia/10dc-Fetterman-health_1-fpcq/10dc-Fetterman-health_1-fpcq-mediumThreeByTwo440.jpg',
                snippet:
                    'A spokesman for the first-term senator from Pennsylvania, who had a near-fatal stroke last year, said his depression had grown severe in recent weeks, as he has worked to adjust to life in the Senate.',
                newsdate: '2023-02-16',
                readdate: Date.now(),
                sectionname: 'u.s.',
                section: 'technology',
                title: 'Fetterman Checks In to Hospital for Treatment of Clinical Depression',
                isread: true,
                isfavorite: false,
            },
            {
                uri: 'nyt://article/9b2f4603-bc23-5e02-a0da-1235680624a5',
                url: 'https://www.nytimes.com/2023/02/16/technology/ohio-train-derailment-chernobyl.html',
                image: 'https://static01.nyt.com/images/2023/02/15/multimedia/derailment-01-hmqf/derailment-01-hmqf-mediumThreeByTwo440.jpg',
                snippet:
                    'For many influencers across the political spectrum, claims about the environmental effects of the train derailment have gone far beyond known facts.',
                newsdate: '2023-02-16',
                readdate: '2023-02-16',
                sectionname: 'Technology',
                section: 'technology',
                title: '‘Chernobyl 2.0’? Ohio Train Derailment Spurs Wild Speculation.',
                isread: false,
                isfavorite: true,
            },
            {
                uri: 'nyt://article/b503979a-689b-5220-9db7-d6069f54bd2b',
                url: 'https://www.nytimes.com/2023/02/16/opinion/jk-rowling-transphobia.html',
                image: 'https://static01.nyt.com/images/2023/02/17/opinion/16PAUL_4/16PAUL_4-mediumThreeByTwo440-v3.jpg',
                snippet:
                    'The charge that she’s a transphobe doesn’t square with her actual views.',
                newsdate: '2023-02-16',
                readdate: '2023-02-20',
                sectionname: 'Opinion',
                section: 'opinion',
                title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
                isread: true,
                isfavorite: true,
            },
            {
                uri: 'nyt://article/4d13d8a7-9db8-5cd0-ae18-f22b0c7dd7ec',
                url: 'https://www.nytimes.com/2023/02/16/arts/television/sarah-silverman-newsmax-woke.html',
                image: 'https://static01.nyt.com/images/2023/02/16/arts/16latenight/16latenight-mediumThreeByTwo440.png',
                snippet:
                    '“The Daily Show” guest host Sarah Silverman called Newsmax “basically an even more far-right Fox News — like if your crazy uncle had a crazy uncle.”',
                newsdate: '2023-02-16',
                readdate: Date.now(),
                sectionname: 'Arts',
                section: 'arts',
                title: 'Sarah Silverman Defines ‘Woke’ for Newsmax',
                isread: false,
                isfavorite: false,
            },
            {
                uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbea56',
                url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
                image: 'https://static01.nyt.com/images/2023/02/16/arts/16latenight/16latenight-mediumThreeByTwo440.png',
                snippet:
                    'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
                newsdate: '2023-02-16',
                readdate: Date.now(),
                sectionname: 'Technology',
                section: 'technology',
                title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
                isread: false,
                isfavorite: false,
            },
            {
                uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6ef1dbe4f6',
                url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
                image: 'https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png',
                snippet:
                    'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
                newsdate: '2023-02-16',
                readdate: '2023-02-19',
                sectionname: 'Technology',
                section: 'technology',
                title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
                isread: false,
                isfavorite: false,
            },
            {
                uri: 'nyt://article/dcfd6326-f015-5837-b84b-1f6e44dbeaf6',
                url: 'https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html',
                image: 'https://static01.nyt.com/images/2023/02/16/reader-center/bing-roose-hp/bing-roose-hp-mediumThreeByTwo440-v3.png',
                snippet:
                    'A very strange conversation with the chatbot built into Microsoft’s search engine led to it declaring its love for me.',
                newsdate: '2023-02-16',
                readdate: '2023-02-19',
                sectionname: 'Technology',
                section: 'technology',
                title: 'A Conversation With Bing’s Chatbot Left Me Deeply Unsettled',
                isread: false,
                isfavorite: false,
            },
        ];

        this.addToFavorites(news[0]);
        this.addToFavorites(news[1]);
        this.addToFavorites(news[2]);
        this.addToRead(news[2]);

        this.addToRead(news[3]);
        this.addToRead(news[4]);
        this.addToRead(news[5]);
        this.addToFavorites(news[5]);

        this.addToFavorites(news[6]);
        this.addToFavorites(news[7]);
        this.addToRead(news[8]);
    }

    getTheme() {
        return this._data.theme;
    }

    setTheme(newTheme) {
        this._data.theme = newTheme;
        this.save();
    }
}
