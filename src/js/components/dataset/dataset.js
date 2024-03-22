import {
    mostPopularNews2,
    categoryOfNews,
    getSearchArticles2,
    limitResults,
    getArticleByCategory2,
} from '../../api/nytimes-api';
import { MAX_NEWS_COUNT } from '../../const';
import { calculateLimit, formatDate } from '../../utils';

//Query types
const POPULAR = 1;
const CATEGORY = 2;
const SEARCH = 3;

export default class Dataset {
    #data = [];
    #numResults = 0;
    #currentQuery = POPULAR;
    #currentCategory = '';
    #currentFilter = '';
    #currentSearchQuery = '';
    #currentSearchPage = 0;
    constructor() {}

    async getMostPopularNews() {
        const result = await mostPopularNews2();
        if (result.status === 'OK') {
            this.#data = [];
            const tmp = result.results.map(
                (
                    {
                        uri,
                        url,
                        section,
                        nytdsection,
                        published_date,
                        updated,
                        abstract,
                        title,
                        media,
                        multimedia,
                    },
                    index
                ) => {
                    const result = {
                        uri,
                        url,
                        sectionname: section,
                        section: nytdsection,
                        newsdate: formatDate(updated || published_date),
                        snippet: abstract,
                        title,
                        isfavorite: false,
                        isread: false,
                    };
                    if (media === null || media.length === 0) result.image = '';
                    else result.image = media[0]['media-metadata'][2].url;
                    return result;
                }
            );
            this.#data.push(...tmp);
            this.#numResults = result.num_results;
        } else {
            console.error(
                `Ошибка при получении популярных новостей (статус-${result.status})`
            );
        }
        this.#currentQuery = POPULAR;
    }

    async getNewsByCategory(category, offset, limit) {
        try {
            const result = await getArticleByCategory2(category, offset, limit);
            if (result.status === 'OK') {
                const tmp = result.results.map(
                    (
                        {
                            uri,
                            url,
                            section,
                            published_date,
                            updated_date,
                            abstract,
                            title,
                            multimedia,
                        },
                        index
                    ) => {
                        const result = {
                            uri,
                            url,
                            sectionname: section,
                            section: category,
                            newsdate: formatDate(
                                published_date || updated_date
                            ),
                            snippet: abstract,
                            title,
                            isfavorite: false,
                            isread: false,
                        };

                        if (multimedia === null || multimedia.length === 0)
                            result.image = '';
                        else
                            result.image =
                                multimedia[multimedia.length - 2].url;
                        return result;
                    }
                );

                if (offset === 0) this.#data = [];
                this.#data.push(...tmp);

                this.#numResults = this.#data.length;
                this.#currentQuery = CATEGORY;
                this.#currentCategory = category;
            }
        } catch (error) {
            console.error(
                `Ошибка ${error} получения новостей по категории ${category} offset=${offset} limit=${limit}`
            );
        }
    }

    async getNewsBySearch(query, page, date) {
        try {
            const result = await getSearchArticles2(query, page, date);
            if (result.status === 'OK') {
                const tmp = result.results.map(
                    (
                        {
                            uri,
                            web_url,
                            section_name,
                            pub_date,
                            abstract,
                            headline,
                            multimedia,
                        },
                        index
                    ) => {
                        const result = {
                            uri,
                            url: web_url,
                            sectionname: section_name,
                            section: section_name,
                            newsdate: formatDate(pub_date),
                            snippet: abstract,
                            title: headline.main ?? '',
                            isfavorite: false,
                            isread: false,
                        };

                        if (multimedia === null || multimedia.length === 0)
                            result.image = '';
                        else
                            result.image =
                                'https://www.nytimes.com/' + multimedia[0].url;
                        return result;
                    }
                );

                if (page === 0) this.#data = [];

                this.#data.push(...tmp);

                this.#numResults = result.num_results;
                this.#currentQuery = SEARCH;
                this.#currentSearchQuery = query;
                this.#currentCategory = '';
                this.#currentSearchPage = page;
                this.#currentFilter = '';
            }
        } catch (error) {
            console.error(
                `Ошибка ${error} получения новостей по запросу ${query} page=${page} date=${date}`
            );
        }
    }

    async getData(startIndex, count) {
        let result = [];
        if (
            startIndex + count <= this.#data.length ||
            (startIndex + count > this.#data.length &&
                this.#data.length === this.getTotalNews())
        ) {
            const data =
                this.#currentFilter !== ''
                    ? this.#data.filter(({ newsdate }) => {
                          return newsdate === this.#currentFilter;
                      })
                    : this.#data;
            result = data.slice(startIndex, startIndex + count);
        } else {
            // можно получить еще

            if (this.#currentQuery === CATEGORY) {
                const offset = this.getDataLength();
                const limit = calculateLimit(startIndex, offset);
                await this.getNewsByCategory(
                    this.#currentCategory,
                    offset,
                    limit
                );
                result = this.#data.slice(startIndex, startIndex + count);
            } else if (this.#currentQuery === SEARCH) {
                await this.getNewsBySearch(
                    this.#currentSearchQuery,
                    this.#currentSearchPage + 1,
                    this.#currentFilter
                );

                result = this.#data.slice(startIndex, startIndex + count);
            }
        }

        return result;
    }

    getTotalNews() {
        let total = 0;
        switch (this.#currentQuery) {
            case POPULAR:
                total =
                    this.#currentFilter !== ''
                        ? this.#data.filter(({ newsdate }) => {
                              return newsdate === this.#currentFilter;
                          }).length
                        : this.#data.length;
                break;
            case CATEGORY:
                total =
                    this.#currentFilter !== ''
                        ? this.#data.filter(({ newsdate }) => {
                              return newsdate === this.#currentFilter;
                          }).length
                        : this.#data.length;
                break;
            case SEARCH:
                total =
                    this.#currentFilter !== ''
                        ? this.#data.filter(({ newsdate }) => {
                              return newsdate === this.#currentFilter;
                          }).length
                        : 10; //this.#numResults; for future develop
                break;
        }
        return total;
    }

    getDataLength() {
        return this.#data.length;
    }

    setFilter(filter) {
        this.#currentFilter = filter;
    }
}
