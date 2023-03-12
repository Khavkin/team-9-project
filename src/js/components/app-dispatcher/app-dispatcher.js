import Paginator from '../paginator-myoda';
import Dataset from '../dataset/dataset';
import GalleryRender from '../gallery-render/gallery-render';
import Spinner from '../spinner/spinner';
import { formatDate, getMedia, getPageStartIndex } from '../../utils';
import { itemsPerPageOnMedia, paginatorSetup } from '../../const';

export default class AppDispatcher {
    #dataset = null;
    #categorySelector = '';
    #categoryElement = null;
    #searchSelector = '';
    #searchElement = null;
    #paginator = null;
    #galleryRender = null;
    #calendarSelector = '';
    #calendarElement = null;
    #spinner = null;
    #currentMedia = getMedia();
    #currentPage = 1;

    constructor({ categorySelector, searchSelector, calendarSelector }) {
        this.#selectElements({
            categorySelector,
            searchSelector,
            calendarSelector,
        });

        this.#dataset = new Dataset();
        this.#galleryRender = new GalleryRender();
        this.#spinner = new Spinner();
        this.#init();
    }

    #selectElements({ categorySelector, searchSelector, calendarSelector }) {
        this.#categorySelector = categorySelector;
        this.#categoryElement = document.querySelector(categorySelector);
        if (!this.#categoryElement) {
            console.error(`Category element ${categorySelector} not found`);
            return;
        }
        this.#categoryElement.addEventListener(
            'click',
            this.#handlerCategoryOnClick.bind(this)
        );

        this.#searchSelector = searchSelector;
        this.#searchElement = document.querySelector(searchSelector);
        if (!this.#searchElement) {
            console.error(`Search element ${searchSelector} not found`);
            return;
        }
        this.#searchElement.addEventListener(
            'submit',
            this.#handlerSearchOnSubmit.bind(this)
        );

        this.#calendarSelector = calendarSelector;
        this.#calendarElement = document.querySelector(calendarSelector);
        if (!this.#calendarElement) {
            console.error(`Calendar element ${calendarSelector} not found`);
            return;
        }
        this.#calendarElement.addEventListener(
            'setdate',
            this.#handlerOnSetDate.bind(this)
        );

        this.#calendarElement.addEventListener('keyup', event =>
            console.log(event)
        );
    }

    async #handlerCategoryOnClick(event) {
        event.preventDefault();
        const itemsPerPage = itemsPerPageOnMedia[getMedia() - 1];
        this.#currentPage = 1;

        let target = event.target;
        const closest = target.closest('button');
        if (closest && closest.nodeName === 'BUTTON') target = closest;
        if (target.nodeName !== 'BUTTON') {
            return;
        }

        if ('section' in target.dataset) {
            const category = target.dataset.section;
            this.#spinner.showSpinner();
            await this.#dataset.getNewsByCategory(category, 0, 500);

            this.#paginator.reCreate(
                {
                    itemsPerPage,
                    totalItems: this.#dataset.getDataLength(), //this.#dataset.getTotalNews(),
                    currentPage: this.#currentPage,
                },
                paginatorSetup
            );

            await this.#galleryRender.showPage(1, itemsPerPage, this.#dataset);

            this.#spinner.hideSpinner();
        }
    }

    async #handlerSearchOnSubmit(event) {
        console.dir(event);
    }

    async #handlerOnSetDate(event) {
        const date = event.target.value;
        console.dir(event.target);
        console.log('value-', event.target.value);
        this.#dataset.setFilter(date);
        console.dir(await this.#dataset.getData(0, 7));
    }

    async #handlerPaginatorOnClick(page) {
        const itemsPerPage = itemsPerPageOnMedia[getMedia() - 1];
        this.#currentPage = page;
        console.log(this);

        this.#spinner.showSpinner();
        await this.#galleryRender.showPage(page, itemsPerPage, this.#dataset);
        this.#spinner.hideSpinner();
    }

    async #init() {
        const itemsPerPage = itemsPerPageOnMedia[getMedia() - 1];

        this.#spinner.showSpinner();
        await this.#dataset.getMostPopularNews();
        console.log(this.#dataset.getTotalNews());

        window.addEventListener(
            'resize',
            this.#handlerOnWindowResize.bind(this)
        );

        this.#paginator = new Paginator(
            {
                itemsPerPage,
                totalItems: this.#dataset.getTotalNews(),
                currentPage: 1,
            },
            paginatorSetup
        );

        this.#paginator.onClick = this.#handlerPaginatorOnClick.bind(this);
        await this.#galleryRender.showPage(1, itemsPerPage, this.#dataset);
        this.#spinner.hideSpinner();
    }

    async #handlerOnWindowResize() {
        const media = getMedia();
        if (this.#currentMedia !== media) {
            let itemsPerPage = itemsPerPageOnMedia[this.#currentMedia - 1];
            const startIndex = getPageStartIndex(
                this.#currentPage,
                itemsPerPage
            );
            itemsPerPage = itemsPerPageOnMedia[media - 1];
            const page = Math.floor(startIndex / itemsPerPage) + 1;
            console.log(startIndex, page, itemsPerPage, media);
            await this.#galleryRender.showPage(
                page,
                itemsPerPage,
                this.#dataset
            );

            this.#paginator.reCreate(
                {
                    currentPage: page,
                    itemsPerPage,
                    totalItems: this.#dataset.getTotalNews(),
                },
                paginatorSetup
            );

            this.#currentMedia = media;
        }
    }
}

new AppDispatcher({
    categorySelector: '.categories_ul',
    searchSelector: '.header__search-form',
    calendarSelector: '.calendar__input',
});
