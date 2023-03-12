import { paginatorSetup, PAGINATOR_SELECTOR } from '../const';
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
    #maxCenterButtonsCount = 5;
    #centerButtonsCount = 0;
    #buttonsCount = 7; // ???
    #scrollCount = 1;
    #firstCarouselButton = 2;
    #selector = PAGINATOR_SELECTOR; // '.paginator';
    #carouselWrapperSelector = `${this.#selector}__carousel-wrapper`;
    #carouselSelector = `${this.#selector}__carousel`;
    #element = null;
    #wrapper = null;
    #carousel = null;
    #pagesCount = 0;
    #itemsPerPage = 0;
    #totalItems = 0;
    #buttonWidth = 33;
    #carouselPosition = 0;
    #margin = 8;
    #setup = [...paginatorSetup];

    onClick = null; // callback function

    constructor({ itemsPerPage, totalItems, currentPage = 1 }, setup = []) {
        this.#element = document.querySelector(this.#selector);
        if (this.#element) {
            this.#element.addEventListener(
                'click',
                this.handlerOnClick.bind(this)
            );
        } else {
            console.error(`Selector ${this.#selector} not found`);
            return;
        }
        if (setup) {
            (this.#setup = []), (this.#setup = setup), this.#applySetup();
        }

        this.reCreate({ itemsPerPage, totalItems, currentPage }, setup);
        // this.#itemsPerPage = itemsPerPage;

        // this.#totalItems = totalItems;
        // this.#pagesCount = Math.ceil(totalItems / itemsPerPage);
        // this.currentPage =
        //     currentPage > this.#pagesCount ? this.#pagesCount : currentPage;
        // if (this.#pagesCount > 2) {
        //     this.#centerButtonsCount =
        //         this.#pagesCount - 2 > this.#maxCenterButtonsCount
        //             ? this.#maxCenterButtonsCount
        //             : this.#pagesCount - 2;
        // }
        // this.buttons = []; //new Array(this.#buttonsCount);
        // //console.log('constructor');
        // //console.dir(this);
        // this.render();
        // this.#prepare();
    }

    render() {
        console.dir(this);
        if (this.#pagesCount < 2) {
            // Если страниц меньше 2х, то скрыть пагинатор.
            this.#element.style.display = 'none';
            return '';
        } else this.#element.style.display = null;

        let markup = '';
        this.#element.innerHTML = '';

        for (let i = 0; i < this.#pagesCount; i += 1) {
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
                this.#isDotted(btn) ? '...' : btn
            }</button></li>`;
        });
        const first = markup[0];
        const last = markup[markup.length - 1];
        const center =
            this.#pagesCount > 2
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
        this.#element.insertAdjacentHTML('afterbegin', markup);
    }

    handlerOnClick(e) {
        //  console.dir(e.target.dataset);
        //  console.dir(e.target);
        const target = e.target;
        if (target.nodeName === 'BUTTON') {
            if ('page' in target.dataset) {
                this.#processButtonClick(target.dataset.page);
            }
        }
    }

    #processButtonClick(page) {
        //console.log(page);

        switch (page) {
            case 'prev':
                if (this.currentPage === 1) return;
                else {
                    this.#getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );
                    if (this.currentPage === 2) this.#disableButton('prev');

                    this.#enableButton('next');

                    this.currentPage -= 1;
                    const tmp = this.#getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this.#isOuterCarouselButton(tmp)) break; //return;
                    if (!isVisible(tmp, this.#wrapper)) {
                        this.#scrollButtons(1, this.#scrollCount);
                    } else {
                        // console.log('visible');
                    }
                }

                break;
            case 'next':
                //console.dir(this.#getButton(this.currentPage).classList);

                if (this.currentPage === this.#pagesCount) {
                    this.#disableButton('next');
                    return;
                } else {
                    this.#getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );
                    if (this.currentPage === this.#pagesCount - 1)
                        this.#disableButton('next');
                    this.#enableButton('prev');
                    this.currentPage += 1;
                    const tmp = this.#getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this.#isOuterCarouselButton(tmp)) break; // return;
                    if (!isVisible(tmp, this.#wrapper)) {
                        // console.log('hidden');
                        this.#scrollButtons(-1, this.#scrollCount);
                        //  console.log('New pos', isVisible(tmp, this.#wrapper));
                    } else {
                        // console.log('visible');
                    }
                }
                break;
            default:
                if (this.currentPage === page) return;
                else {
                    this.#getButton(this.currentPage).classList.toggle(
                        'paginator__button--current'
                    );

                    this.currentPage = +page;
                    const tmp = this.#getButton(this.currentPage);
                    tmp.classList.toggle('paginator__button--current');
                    if (this.currentPage === 1) {
                        this.#disableButton('prev');
                        this.#enableButton('next');
                    } else if (this.currentPage === this.#pagesCount) {
                        this.#disableButton('next');
                        this.#enableButton('prev');
                    } else {
                        this.#enableButton('next');
                        this.#enableButton('prev');
                    }

                    if (
                        this.currentPage === 1 &&
                        this.#firstCarouselButton !== 0
                    ) {
                        // перемещаем карусель на начало.

                        this.#scrollButtons(1, this.#firstCarouselButton - 2);
                    }
                    if (
                        this.currentPage === this.#pagesCount &&
                        this.#firstCarouselButton !== 0
                    ) {
                        // перемещаем карусель на конец.
                        //                   console.log(this.#firstCarouselButton);
                        this.#scrollButtons(
                            -1,
                            this.#pagesCount -
                                this.#centerButtonsCount -
                                this.#firstCarouselButton
                        );
                    }

                    if (this.#isDotted(this.currentPage))
                        this.currentPage === this.#firstCarouselButton
                            ? this.#scrollButtons(1, 2)
                            : this.#scrollButtons(-1, 2);
                }
        }

        if (this.onClick) this.onClick(this.currentPage);
        //this.reCreate(4, 10, 1);
    }

    #getButton(page) {
        //console.log(`[data-page='${page}]'`);
        return this.#element.querySelector(`[data-page='${page}']`);
    }

    #resizeWrapper() {
        //if (this.#pagesCount > this.#buttonsCount) {
        // const newSize =
        //   this.#pagesCount > 2
        //     ? (this.#pagesCount - 2) * this.#buttonWidth + (this.#pagesCount - 3) * this.#margin
        //     : 0;

        const newSize =
            this.#pagesCount > 2
                ? this.#centerButtonsCount * this.#buttonWidth +
                  (this.#centerButtonsCount - 1) * this.#margin
                : 0;
        // console.log('newSize=', newSize);
        this.#wrapper.style.width = `${newSize}px`;
        // }
    }

    #scrollButtons(direction, count) {
        if (direction < 0)
            count =
                this.#firstCarouselButton + count + this.#centerButtonsCount >
                this.#pagesCount
                    ? this.#pagesCount -
                      (this.#firstCarouselButton +
                          count +
                          this.#centerButtonsCount)
                    : count;
        else count = this.#firstCarouselButton - count < 2 ? 1 : count;
        this.#carouselPosition +=
            direction * (this.#buttonWidth * count + this.#margin * count);
        this.#carousel.style.left = `${this.#carouselPosition}px`;
        // console.log(
        //     'scroll buttons-',
        //     this.#carousel.style.left,
        //     this.#firstCarouselButton
        // );
        this.#repaintDotted(direction, count);
        // console.log(
        //     'scroll buttons-',
        //     this.#carousel.style.left,
        //     this.#firstCarouselButton
        // );
    }

    #isOuterCarouselButton(button) {
        const dataValue = button.dataset.page;
        const outerButtons = ['prev', '1', `${this.#pagesCount}`, 'next'];
        // console.log(outerButtons.indexOf(dataValue), dataValue, [
        //   'prev',
        //   '1',
        //   `${this.#pagesCount}`,
        //   'next',
        // ]);
        return outerButtons.indexOf(dataValue) < 0 ? false : true;
    }

    reCreate({ itemsPerPage, totalItems, currentPage = 1 }, setup = []) {
        // console.log('YEh! You call reCreate, but now it not work');
        // return;

        console.log(
            `paginator reCreate ${itemsPerPage}, ${totalItems}, ${currentPage}`
        );
        console.dir(setup);

        if (setup) {
            (this.#setup = []), (this.#setup = [...setup]), this.#applySetup();
        }

        this.#itemsPerPage = itemsPerPage;
        this.#totalItems = totalItems;
        this.#pagesCount = Math.ceil(this.#totalItems / this.#itemsPerPage);
        this.currentPage =
            currentPage > this.#pagesCount ? this.#pagesCount : currentPage;
        console.log(
            'paginator reCreate pc,mcbc',
            this.#pagesCount,
            this.#maxCenterButtonsCount
        );
        if (this.#pagesCount > 2) {
            this.#centerButtonsCount =
                this.#pagesCount - 2 >= this.#maxCenterButtonsCount
                    ? this.#maxCenterButtonsCount
                    : this.#pagesCount - 2;
        }
        this.buttons = []; //new Array(this.#buttonsCount);
        //console.log('constructor');
        //console.dir(this);
        this.render();
        this.#prepare();
    }

    #isDotted(button) {
        // console.log(
        //     `isDotted button=${button} pagesCount=${
        //         this.#pagesCount
        //     } first Car=${this.#firstCarouselButton} centerBC=${
        //         this.#centerButtonsCount
        //     }`
        // );
        if (button === 2 || button === this.#pagesCount - 1) return false;
        1;
        if (
            button === this.#firstCarouselButton ||
            button === this.#firstCarouselButton + this.#centerButtonsCount - 1
        )
            return true;
    }

    #repaintDotted(direction, count) {
        const fcb = this.#firstCarouselButton;
        let tmpBtn = this.#getButton(fcb);
        tmpBtn.innerHTML = tmpBtn.dataset.page;
        tmpBtn = this.#getButton(fcb + this.#centerButtonsCount - 1);
        tmpBtn.innerHTML = tmpBtn.dataset.page;
        this.#firstCarouselButton += count * -direction;
        if (this.#isDotted(this.#firstCarouselButton)) {
            tmpBtn = this.#getButton(this.#firstCarouselButton);
            tmpBtn.innerHTML = '...';
        }

        // console.log(
        //     'cbuttons',
        //     this.#firstCarouselButton,
        //     this.#firstCarouselButton + this.#centerButtonsCount - 1
        // );
        if (
            this.#isDotted(
                this.#firstCarouselButton + this.#centerButtonsCount - 1
            )
        ) {
            tmpBtn = this.#getButton(
                this.#firstCarouselButton + this.#centerButtonsCount - 1
            );
            tmpBtn.innerHTML = '...';
        }
    }

    #disableButton(button) {
        // button='Prev',1..N,'Next'
        const btn = this.#getButton(button);
        if (btn) btn.disabled = true;
    }
    #enableButton(button) {
        // button='Prev',1..N,'Next'
        const btn = this.#getButton(button);
        if (btn) btn.disabled = false;
    }

    #prepare() {
        if (this.#pagesCount > 2) {
            this.#wrapper = document.querySelector(
                this.#carouselWrapperSelector
            );
            this.#carousel = document.querySelector(this.#carouselSelector);
            // console.log('wrapper-', this.#wrapper);
            if (this.#wrapper) {
                this.#resizeWrapper();
            } else {
                console.error(
                    `Selector ${this.#carouselWrapperSelector} not found`
                );
                return;
            }
            if (
                // Если текущая страница за пределами карусели, то cдвинуть карусель
                this.currentPage > this.buttons[this.#centerButtonsCount] &&
                this.currentPage < this.#pagesCount
            ) {
                this.#scrollButtons(
                    -this.#scrollCount,
                    this.currentPage -
                        this.buttons[this.#centerButtonsCount] +
                        this.#scrollCount -
                        1
                );
            }
        }
        //console.log('currentPage', this.currentPage);
        if (this.currentPage === 1) this.#disableButton('prev');
        if (this.currentPage === this.#pagesCount) this.#disableButton('next');
    }

    #applySetup() {
        const setup = this.#setup;
        console.log('media', setup[getMedia() - 1]);
        if (setup) {
            const dataForCurrentMedia = setup[getMedia() - 1];
            //console.dir(this);
            for (let key in dataForCurrentMedia) {
                switch (key) {
                    case 'maxCenterButtonsCount':
                        this.#maxCenterButtonsCount = dataForCurrentMedia[key];
                        break;
                    case 'buttonWidth':
                        this.#buttonWidth = dataForCurrentMedia[key];
                        break;
                    case 'scrollCount':
                        this.#scrollCount = dataForCurrentMedia[key];
                        break;
                    case 'margin':
                        this.#margin = dataForCurrentMedia[key];
                        break;
                    //maxCenterButtonsCount: 3, buttonWidth: 28, scrollCount: 1, margin: 4
                }
                //     if (this.hasOwnProperty(key)) {

                //         this[key] = dataForCurrentMedia[key];
                //     } else if (this.hasOwnProperty(`#{key}`)) {
                //         console.log(`#{key}`);
                //this[`#{key}`] = dataForCurrentMedia[key];
            }

            //     console.error(
            //         `Invalid key ${key} in setup object of Paginator`
            //     );
            // }
        }
        console.log('applysetup');
        console.dir(this);
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
