/* Как использовать.
 * import Paginator from './paginator.js';
 * const pag = new Paginator({ itemsPerPage: 1, totalItems: 10, [currentPage] }, setup);
 * по умолчанию currentPage =1
 * pag.onClick = page => console.log('button click-', page);
 * pag.reCreate({ itemsPerPage: 1, totalItems: 10, [currentPage] }, setup) - Перестраивает пагинатор на новые параметры.
 *
 * Объект настроек setup:
 *  - centerButtonsCount - Количество видимых кнопок в карусели кнопок
 *  - buttonsCount - Количество кнопок с номерами страниц
 *  - buttonsWidth - ширина кнопок
 *  - margin - отступы между кнопками
 *  - centerButtonsCount - Количество кнопок в карусели кнопок
 *  - onClick - Callback функция, которая вызывается при нажатии на кнопки пагинатора.
 *    Возвращает номер страницы. Можно передать в объект настроек или установить через
 *    свойство объекта класса;
 *   scrollCount - количество кнопок на которое нужно сместить если кнопка крайняя внутри карусели кнопок (первая и последняя всегда на своих местах) или за пределами экрана.
 */
// import './style.css';
export default class Paginator {
    _centerButtonsCount = 5;
    _buttonsCount = 7; // ???
    _scrollCount = 1;
    _selector = '.paginator';
    _carouselWrapperSelector = '.paginator__carousel-wrapper';
    _carouselSelector = '.paginator__carousel';
    _element = null;
    _wrapper = null;
    _carousel = null;
    _pagesCount = 0;
    _buttonWidth = 33;
    _carouselPosition = 0;
    _margin = 8;
    onClick = null; // callback function

    constructor({ itemsPerPage, totalItems, currentPage = 1 }, setup = {}) {
        this._element = document.querySelector(this._selector);
        if (this._element) {
            this._element.addEventListener(
                'click',
                this.handlerOnClick.bind(this)
            );
        } else {
            console.error(`Selector ${this._selector} not found`);
            return;
        }

        this.currentPage = currentPage;
        this._itemsPerPage = itemsPerPage;
        this._totalItems = totalItems;
        this._pagesCount = Math.ceil(totalItems / itemsPerPage);
        this.buttons = []; //new Array(this._buttonsCount);
        this.render();
        if (this._pagesCount) {
            this._wrapper = document.querySelector(
                this._carouselWrapperSelector
            );
            this._carousel = document.querySelector(this._carouselSelector);
            // console.log('wrapper-', this._wrapper);
            if (this._wrapper) {
                this._resizeWrapper();
            } else {
                console.error(
                    `Selector ${this._carouselWrapperSelector} not found`
                );
                return;
            }
        }
    }

    render() {
        if (this._pagesCount < 2) {
            this._element.style.display = 'none';
            return '';
        }
        // let btnNeed = this._pagesCount > this._buttonsCount ? this._buttonsCount : this._pagesCount;
        // let tmp = btnNeed;

        // //const btnTemplate = `<li><button type="button"></button></li>`;
        let markup = '';
        this._element.innerHTML = '';
        // if (this._pagesCount > btnNeed) {
        //   this.buttons[btnNeed - 1] = this._pagesCount;
        //   tmp = btnNeed - 1;
        // }
        for (let i = 0; i < this._pagesCount; i += 1) {
            this.buttons[i] = i + 1;
        }

        markup = this.buttons.map((btn, index, array) => {
            //console.log(btn);
            return `<li><button  class="paginator__button ${
                index + 1 === this.currentPage
                    ? 'paginator__button--current'
                    : ''
            }" type="button" data-page=${index + 1}>${index + 1}</button></li>`;
            //   `<li><button type="button">${pointsCheck(
            //   btn,
            //   index,
            //   array,
            //   this.currentPage
            // )}</button></li>`;
        });
        const first = markup[0];
        const last = markup[markup.length - 1];
        const center =
            this._pagesCount > 2
                ? `<li class="paginator__carousel-wrapper"><ul class="paginator__carousel">${markup
                      .slice(1, markup.length - 1)
                      .join('')}</ul></li>`
                : '';

        markup =
            `<li><button  class="paginator__button paginator__button--prev" data-page="prev" type="button">Prev</button></li>` +
            `${first}` +
            center +
            // `<li class="paginator__carousel-wrapper"><ul class="paginator__carousel">${center}</ul></li>` +
            `${last}` +
            `<li><button class="paginator__button paginator__button--next" data-page="next" type="button">Next</button></li>`;
        //console.dir(markup);
        this._element.insertAdjacentHTML('afterbegin', markup);
    }

    handlerOnClick(e) {
        console.dir(e.target.dataset);
        console.dir(e.target);
        const target = e.target;
        if (target.nodeName === 'BUTTON') {
            if ('page' in target.dataset) {
                this._processButtonClick(target.dataset.page);
            }
        }
    }

    _processButtonClick(page) {
        //console.log(page);

        switch (page) {
            case 'prev':
                if (this.currentPage === 1) return;
                else {
                    this._getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );
                    this.currentPage -= 1;
                    const tmp = this._getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this._isOuterCarouselButton(tmp)) return;
                    if (!isVisible(tmp, this._wrapper)) {
                        this._scrollButtons(1, 1);
                    } else {
                        // console.log('visible');
                    }
                }

                break;
            case 'next':
                //console.dir(this._getButton(this.currentPage).classList);

                if (this.currentPage === this._pagesCount) return;
                else {
                    this._getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );
                    this.currentPage += 1;
                    const tmp = this._getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this._isOuterCarouselButton(tmp)) return;
                    if (!isVisible(tmp, this._wrapper)) {
                        // console.log('hidden');
                        this._scrollButtons(-1, 1);
                        //  console.log('New pos', isVisible(tmp, this._wrapper));
                    } else {
                        // console.log('visible');
                    }
                }
                break;
            default:
                if (this.currentPage === page) return;
                {
                    this._getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );
                    this.currentPage = +page;
                    const tmp = this._getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                }
        }

        if (this.onClick) this.onClick(this.currentPage);
        //this.reCreate(4, 10, 1);
    }

    _getButton(page) {
        //console.log(`[data-page='${page}]'`);
        return this._element.querySelector(`[data-page='${page}']`);
    }

    _resizeWrapper() {
        if (this._pagesCount < this._buttonsCount) {
            // const newSize =
            //   this._pagesCount > 2
            //     ? (this._pagesCount - 2) * this._buttonWidth + (this._pagesCount - 3) * this._margin
            //     : 0;

            const newSize =
                this._pagesCount > 2
                    ? this._centerButtonsCount * this._buttonWidth +
                      (this._pagesCount - 3) * this._margin
                    : 0;
            console.log('newSize=', newSize);
            this._wrapper.style.width = `${newSize}px`;
        }
    }

    _scrollButtons(direction, count) {
        this._carouselPosition +=
            direction * (this._buttonWidth * count + this._margin);
        this._carousel.style.left = `${this._carouselPosition}px`;
        console.log(this._carousel.style.left);
    }

    _isOuterCarouselButton(button) {
        const dataValue = button.dataset.page;
        const outerButtons = ['prev', '1', `${this._pagesCount}`, 'next'];
        // console.log(outerButtons.indexOf(dataValue), dataValue, [
        //   'prev',
        //   '1',
        //   `${this._pagesCount}`,
        //   'next',
        // ]);
        return outerButtons.indexOf(dataValue) < 0 ? false : true;
    }

    reCreate({ itemsPerPage, totalItems, currentPage = 1 }, setup = {}) {
        console.log('YEh! You call reCreate, but now it not work');
        return;

        this.currentPage = currentPage;
        this._itemsPerPage = itemsPerPage;
        this._totalItems = totalItems;
        this._pagesCount = Math.ceil(totalItems / itemsPerPage);
        this.buttons = []; //new Array(this._buttonsCount);
        this.render();
        if (this._pagesCount) {
            this._wrapper = document.querySelector(
                this._carouselWrapperSelector
            );
            this._carousel = document.querySelector(this._carouselSelector);
            // console.log('wrapper-', this._wrapper);
            if (this._wrapper) {
                this._resizeWrapper();
            } else {
                console.error(
                    `Selector ${this._carouselWrapperSelector} not found`
                );
                return;
            }
        }
    }
}

function pointsCheck(value, index, array, currPage) {
    //console.log('pointsCheck', value, index);
    if (index < array.length - 1) {
        //console.log('array[array.length] - value', array[array.length - 1] - value);
        if (array[index + 1] - value === 1) return `${value}`;
        else {
            console.log(value, index, array[index], array.length);
            return `...`;
        }
    } else return value;
}

function isVisible(toCheck, container) {
    const toCheckPos = toCheck.getBoundingClientRect();
    const conntainerPos = container.getBoundingClientRect();
    // console.log(
    //   `btn left=${Math.floor(toCheckPos.left)}, btn right ${Math.floor(
    //     toCheckPos.right
    //   )}\ncont left=${Math.floor(conntainerPos.left)}, cont right ${Math.floor(conntainerPos.right)}`
    // );

    return Math.floor(toCheckPos.right) > Math.floor(conntainerPos.right) ||
        Math.floor(toCheckPos.left) < Math.floor(conntainerPos.left)
        ? false
        : true;
}
