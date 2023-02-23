const refs = {
    pagination: document.querySelector('.pagin'),
};

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
const newsList = document.querySelector('.list-news-card');

refs.pagination.addEventListener('click', onPaginClick);

function onPaginClick(e) {
    let btn = valuePage.curPage;

    if (
        e.target.classList.contains('next-page') ||
        e.target.classList.contains('btn-next')
    ) {
        valuePage.curPage += 1;
    }
    if (
        e.target.classList.contains('prev-page') ||
        e.target.classList.contains('btn-prev')
    ) {
        valuePage.curPage -= 1;
    }
    sliceItems = null;
    if (window.innerWidth < 768) {
        windowWidth = 4;
        wetherPosition = -1;
    }
    if (window.innerWidth > 768 && window.innerWidth < 1280) {
        windowWidth = 7;
        wetherPosition = 0;
    }
    if (window.innerWidth >= 1280) {
        windowWidth = 8;
        wetherPosition = 1;
    }

    window.scrollTo(0, 0);
}

const valuePage = {
    curPage: 1,
    numLinksTwoSide: 1,
    totalPages: 3,
};

pagination();

pg.addEventListener('click', e => {
    const ele = e.target;

    if (ele.dataset.page) {
        const pageNumber = parseInt(e.target.dataset.page, 10);

        valuePage.curPage = pageNumber;
        pagination(valuePage);

        // handleButtonLeft();
        // handleButtonRight();
    }
});

// DYNAMIC PAGINATION?]
function pagination() {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

    const range = delta + 4; // use for handle visible number of links left side

    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;

    let active = '';
    for (let pos = 1; pos <= totalPages; pos++) {
        active = pos === curPage ? 'active' : '';

        // truncate
        if (totalPages >= 2 * range - 1) {
            if (
                numberTruncateLeft > 3 &&
                numberTruncateRight < totalPages - 3 + 1
            ) {
                // truncate 2 side
                if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
                    renderTwoSide += renderPage(pos, active);
                }
            } else {
                // truncate left side or right side
                if (
                    (curPage < range && pos <= range) ||
                    (curPage > totalPages - range &&
                        pos >= totalPages - range + 1) ||
                    pos === totalPages ||
                    pos === 1
                ) {
                    render += renderPage(pos, active);
                } else {
                    countTruncate++;
                    if (countTruncate === 1) render += dot;
                }
            }
        } else {
            // not truncate
            render += renderPage(pos, active);
        }
    }

    if (renderTwoSide) {
        renderTwoSide =
            renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
        pg.innerHTML = renderTwoSide;
    } else {
        pg.innerHTML = render;
    }
}

function renderPage(index, active = '') {
    return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
}

document
    .querySelector('.page-container')
    .addEventListener('click', function (e) {
        handleButton(e.target);
    });

function handleButton(element) {
    if (element.classList.contains('prev-page')) {
        valuePage.curPage--;
        // handleButtonLeft();
        btnNextPg.disabled = false;
        //  btnLastPg.disabled = false;
    } else if (element.classList.contains('next-page')) {
        valuePage.curPage++;
        // handleButtonRight();
        btnPrevPg.disabled = false;
        //  btnFirstPg.disabled = false;
    }
    pagination();
}
// function handleButtonLeft() {
//     if (valuePage.curPage === 1) {
//         btnPrevPg.disabled = true;
//         //  btnFirstPg.disabled = true;
//     } else {
//         btnPrevPg.disabled = false;
//         //  btnFirstPg.disabled = false;
//     }
// }
// function handleButtonRight() {
//     if (valuePage.curPage === valuePage.totalPages) {
//         //  console.log(valuePage.curPage);
//         btnNextPg.disabled = true;
//         //  btnLastPg.disabled = true;
//     } else {
//         btnNextPg.disabled = false;
//         //  btnLastPg.disabled = false;
//     }
// }
//////
