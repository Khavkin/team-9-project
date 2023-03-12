import { createMarkup2 } from '../../news-cards';
import {
    getMedia,
    normalizeImportFileName,
    getPageStartIndex,
} from '../../utils';
import { itemsPerPageOnMedia } from '../../const';
import { geolocateUpdate } from '../weather';
//import LocalStorage from '../../api/local-storage-api';

export default class GalleryRender {
    #galleryElement = null;
    #weatherPos = [1, 2, 3];

    constructor() {
        this.#galleryElement = document.querySelector('.list-news-card');
    }
    async showPage(page, itemsPerPage, dataset) {
        const index = getPageStartIndex(page, itemsPerPage);
        const data = await dataset.getData(index, itemsPerPage);
        await this.render(data);
    }

    async render(data) {
        try {
            let tmpData = data.map((item, index) => {
                return createMarkup2(item);
            });
            // insert weather widget;
            tmpData = this.#insertWeatherWidget(tmpData);
            const markup = tmpData.join('');

            this.#updateDOM(markup);
            //  if (curPage === 'home') {
            geolocateUpdate();
            //  }
        } catch (error) {
            console.error(error);
            //  onError(error);
        }
    }
    #updateDOM(markup) {
        if (this.#galleryElement !== null) {
            this.#galleryElement.innerHTML = markup;
        }
    }
    #insertWeatherWidget(data) {
        const weatherPosIndex = this.#weatherPos[getMedia() - 1] - 1;

        const weatherMarkup = '<li class="list-news-card__item weather"></li>';
        data.splice(weatherPosIndex, 0, weatherMarkup);

        return data;
    }
}
