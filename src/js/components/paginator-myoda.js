import { getMedia } from '../utils';
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

/**
 * TODO
 * 1. Добавить номера крайних кнопок в карусели. - DONE
 * 1.1 Менять текст кнопки если слева или справа есть скрытые кнопки. - DONE
 * 2. Сделать измение пагинатора при изменении размеров экрана.
 * 3. Исправить рисование текущей кнопки, если она за пределами зоны видимости. -DONE
 * 4. Сделать листание на любое количество кнопок.
 */
export default class Paginator {
    _maxCenterButtonsCount = 5;
    _centerButtonsCount = 0;
    _buttonsCount = 7; // ???
    _scrollCount = 1;
    _firstCarouselButton = 2;
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

        this._itemsPerPage = itemsPerPage;
        this._totalItems = totalItems;
        this._pagesCount = Math.ceil(totalItems / itemsPerPage);
        this.currentPage =
            currentPage > this._pagesCount ? this._pagesCount : currentPage;
        if (this._pagesCount > 2) {
            this._centerButtonsCount =
                this._pagesCount - 2 > this._maxCenterButtonsCount
                    ? this._maxCenterButtonsCount
                    : this._pagesCount - 2;
        }
        this.buttons = []; //new Array(this._buttonsCount);
        //console.log('constructor');
        //console.dir(this);
        this.render();
        this._prepare();
    }

    render() {
        // console.dir(this);
        if (this._pagesCount < 2) {
            // Если страниц меньше 2х, то скрыть пагинатор.
            this._element.style.display = 'none';
            return '';
        }

        let markup = '';
        this._element.innerHTML = '';

        for (let i = 0; i < this._pagesCount; i += 1) {
            // Заполнение массива с номерами страниц.
            this.buttons[i] = i + 1;
        }

        markup = this.buttons.map((btn, index, array) => {
            // Формирование разметки под цифровые кнопки
            //console.log(btn);
            return `<li><button  class="paginator__button ${
                index + 1 === this.currentPage
                    ? 'paginator__button--current'
                    : ''
            }" type="button" data-page=${btn} title= "Page ${btn}">${
                this._isDotted(btn) ? '...' : btn
            }</button></li>`;
        });
        const first = markup[0];
        const last = markup[markup.length - 1];
        const center =
            this._pagesCount > 2
                ? `<li class="paginator__carousel-wrapper"><ul class="paginator__carousel">${markup
                      .slice(1, markup.length - 1)
                      .join('')}</ul></li>`
                : ''; // Выделение кнопок под карусель

        markup =
            `<li><button  class="paginator__button paginator__button--prev" data-page="prev" type="button" title="Previous page">Prev</button></li>` +
            `${first}` +
            center +
            `${last}` +
            `<li><button class="paginator__button paginator__button--next" data-page="next" type="button" title="Next page">Next</button></li>`;
        //console.dir(markup);
        this._element.insertAdjacentHTML('afterbegin', markup);
    }

    handlerOnClick(e) {
        //  console.dir(e.target.dataset);
        //  console.dir(e.target);
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
                    if (this.currentPage === 2) this._disableButton('prev');

                    this._enableButton('next');

                    this.currentPage -= 1;
                    const tmp = this._getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this._isOuterCarouselButton(tmp)) return;
                    if (!isVisible(tmp, this._wrapper)) {
                        this._scrollButtons(1, this._scrollCount);
                    } else {
                        // console.log('visible');
                    }
                }

                break;
            case 'next':
                //console.dir(this._getButton(this.currentPage).classList);

                if (this.currentPage === this._pagesCount) {
                    this._disableButton('next');
                    return;
                } else {
                    this._getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );
                    if (this.currentPage === this._pagesCount - 1)
                        this._disableButton('next');
                    this._enableButton('prev');
                    this.currentPage += 1;
                    const tmp = this._getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this._isOuterCarouselButton(tmp)) return;
                    if (!isVisible(tmp, this._wrapper)) {
                        // console.log('hidden');
                        this._scrollButtons(-1, this._scrollCount);
                        //  console.log('New pos', isVisible(tmp, this._wrapper));
                    } else {
                        // console.log('visible');
                    }
                }
                break;
            default:
                if (this.currentPage === page) return;
                else {
                    this._getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );

                    this.currentPage = +page;
                    const tmp = this._getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this.currentPage === 1) {
                        this._disableButton('prev');
                        this._enableButton('next');
                    } else if (this.currentPage === this._pagesCount) {
                        this._disableButton('next');
                        this._enableButton('prev');
                    } else {
                        this._enableButton('next');
                        this._enableButton('prev');
                    }

                    if (
                        this.currentPage === 1 &&
                        this._firstCarouselButton !== 0
                    ) {
                        // перемещаем карусель на начало.

                        this._scrollButtons(1, this._firstCarouselButton - 2);
                    }
                    if (
                        this.currentPage === this._pagesCount &&
                        this._firstCarouselButton !== 0
                    ) {
                        // перемещаем карусель на конец.
                        //                   console.log(this._firstCarouselButton);
                        this._scrollButtons(
                            -1,
                            this._pagesCount -
                                this._centerButtonsCount -
                                this._firstCarouselButton
                        );
                    }

                    if (this._isDotted(this.currentPage))
                        this.currentPage === this._firstCarouselButton
                            ? this._scrollButtons(1, 2)
                            : this._scrollButtons(-1, 2);
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
        //if (this._pagesCount > this._buttonsCount) {
        // const newSize =
        //   this._pagesCount > 2
        //     ? (this._pagesCount - 2) * this._buttonWidth + (this._pagesCount - 3) * this._margin
        //     : 0;

        const newSize =
            this._pagesCount > 2
                ? this._centerButtonsCount * this._buttonWidth +
                  (this._centerButtonsCount - 1) * this._margin
                : 0;
        // console.log('newSize=', newSize);
        this._wrapper.style.width = `${newSize}px`;
        // }
    }

    _scrollButtons(direction, count) {
        if (direction < 0)
            count =
                this._firstCarouselButton + count + this._centerButtonsCount >
                this._pagesCount
                    ? this._pagesCount -
                      (this._firstCarouselButton +
                          count +
                          this._centerButtonsCount)
                    : count;
        else count = this._firstCarouselButton - count < 2 ? 1 : count;
        this._carouselPosition +=
            direction * (this._buttonWidth * count + this._margin * count);
        this._carousel.style.left = `${this._carouselPosition}px`;
        // console.log(
        //     'scroll buttons-',
        //     this._carousel.style.left,
        //     this._firstCarouselButton
        // );
        this._repaintDotted(direction, count);
        // console.log(
        //     'scroll buttons-',
        //     this._carousel.style.left,
        //     this._firstCarouselButton
        // );
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
        // console.log('YEh! You call reCreate, but now it not work');
        // return;

        this._itemsPerPage = itemsPerPage;
        this._totalItems = totalItems;
        this._pagesCount = Math.ceil(totalItems / itemsPerPage);
        this.currentPage =
            currentPage > this._pagesCount ? this._pagesCount : currentPage;
        if (this._pagesCount > 2) {
            this._centerButtonsCount =
                this._pagesCount - 2 > this._maxCenterButtonsCount
                    ? this._maxCenterButtonsCount
                    : this._pagesCount - 2;
        }
        this.buttons = []; //new Array(this._buttonsCount);
        //console.log('constructor');
        //console.dir(this);
        this.render();
        this._prepare();
    }

    _isDotted(button) {
        if (button === 2 || button === this._pagesCount - 1) return false;
        if (
            button === this._firstCarouselButton ||
            button === this._firstCarouselButton + this._centerButtonsCount - 1
        )
            return true;
    }

    _repaintDotted(direction, count) {
        const fcb = this._firstCarouselButton;
        let tmpBtn = this._getButton(fcb);
        tmpBtn.innerHTML = tmpBtn.dataset.page;
        tmpBtn = this._getButton(fcb + this._centerButtonsCount - 1);
        tmpBtn.innerHTML = tmpBtn.dataset.page;
        this._firstCarouselButton += count * -direction;
        if (this._isDotted(this._firstCarouselButton)) {
            tmpBtn = this._getButton(this._firstCarouselButton);
            tmpBtn.innerHTML = '...';
        }

        // console.log(
        //     'cbuttons',
        //     this._firstCarouselButton,
        //     this._firstCarouselButton + this._centerButtonsCount - 1
        // );
        if (
            this._isDotted(
                this._firstCarouselButton + this._centerButtonsCount - 1
            )
        ) {
            tmpBtn = this._getButton(
                this._firstCarouselButton + this._centerButtonsCount - 1
            );
            tmpBtn.innerHTML = '...';
        }
    }

    _disableButton(button) {
        // button='Prev',1..N,'Next'
        const btn = this._getButton(button);
        btn.disabled = true;
    }
    _enableButton(button) {
        // button='Prev',1..N,'Next'
        const btn = this._getButton(button);
        btn.disabled = false;
    }

    _prepare() {
        if (this._pagesCount > 2) {
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
            if (
                // Если текущая страница за пределами карусели, то cдвинуть карусель
                this.currentPage > this.buttons[this._centerButtonsCount] &&
                this.currentPage < this._pagesCount
            ) {
                this._scrollButtons(
                    -this._scrollCount,
                    this.currentPage -
                        this.buttons[this._centerButtonsCount] +
                        this._scrollCount -
                        1
                );
            }
        }
        //console.log('currentPage', this.currentPage);
        if (this.currentPage === 1) this._disableButton('prev');
        if (this.currentPage === this._pagesCount) this._disableButton('next');
    }
}

function pointsCheck(value, index, array, currPage) {
    //console.log('pointsCheck', value, index);
    if (index < array.length - 1) {
        //console.log('array[array.length] - value', array[array.length - 1] - value);
        if (array[index + 1] - value === 1) return `${value}`;
        else {
            // console.log(value, index, array[index], array.length);
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
