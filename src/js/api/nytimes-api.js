const apiKey = 'api-key=G4nD622lnyF5V3gyZS7dbGHuMUYNgZ8K';
const urlBase = 'https://api.nytimes.com/svc';
const mostPopularNewsUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${apiKey}`;

// Запит на популярні новини
async function mostPopularNews() {
    const articleFetch = await fetch(mostPopularNewsUrl);
    const articles = await articleFetch.json();
    const response = articles.results;
    //   console.log(response);
    return response;
}

// Запит по категоріям
async function categoryOfNews() {
    const categoryList = await fetch(
        `${urlBase}//news/v3/content/section-list.json?${apiKey}`
    );
    const categories = await categoryList.json();
    const response = categories.results;
    //   console.log(response);

    return response;
}

// Запит по кліку на кнопку категорії
async function getArticleByCategory(value) {
    try {
        //let newValue = encodeURIComponent(value);
        let newValue = value;
        const articleFetch = await fetch(
            `${urlBase}/news/v3/content/all/${newValue}.json?${apiKey}`
        );
        const articles = await articleFetch.json();
        let { results } = articles;
        return results;
    } catch (error) {
        console.error(error);
    }
}

// Функція для отримання статей з New York Times за заданим запитом та сторінкою
async function getSearchArticles(searchQuery, pageNumber) {
    let dateForUrl = '';
    try {
        let date = JSON.parse(localStorage.getItem('date'))
            .replace('/', '')
            .replace('/', '');
        dateForUrl = formatDateForUrl(date);
    } catch (error) {
        // Якщо не вдалося отримати дату з локального сховища, то не додаємо її в URL
    }

    const articlesFetch = await fetch(
        `${urlBase}/search/v2/articlesearch.json?q=${searchQuery}&${apiKey}&page=${pageNumber}${dateForUrl}`
    );
    const articles = await articlesFetch.json();

    let { response, errors } = articles;

    if (errors) {
        handleErrors(errors);
        return;
    }

    const sumPage = limitResults(response.meta.hits);
    let { docs } = response;

    console.log(docs);
    console.log(sumPage);

    return docs;
}

/* Службові функції */
// Функція для форматування дати для використання в URL
function formatDateForUrl(date) {
    return `&begin_date=${date}&end_date=${date}`;
}

// Функція для обробки помилок
function handleErrors(errors) {
    alert(JSON.parse(errors));
}

// Функція для обмеження кількості результатів
function limitResults(hits) {
    return Math.min(hits, 1000);
}

export {
    mostPopularNews,
    categoryOfNews,
    getSearchArticles,
    limitResults,
    getArticleByCategory,
    mostPopularNews2,
    getArticleByCategory2,
    getSearchArticles2,
};

//getSearchArticles('ukraine', 1);

async function mostPopularNews2() {
    const articleFetch = await fetch(mostPopularNewsUrl);
    const articles = await articleFetch.json();
    //const response = articles.results;
    const response = {
        results: articles.results,
        status: articles.status,
        num_results: articles.num_results,
    };
    //  console.log(articles);
    return response;
}

// Запит по кліку на кнопку категорії
async function getArticleByCategory2(value, offset = 0, limit = 20) {
    try {
        //let newValue = encodeURIComponent(value);
        let newValue = value;
        // console.log(value, offset, limit);
        const offsetstr = `limit=${limit}&offset=${offset}&`;
        const articleFetch = await fetch(
            `${urlBase}/news/v3/content/all/${newValue}.json?${offsetstr}${apiKey}`
        );
        const articles = await articleFetch.json();
        const response = {
            results: articles.results,
            status: articles.status,
            num_results: articles.num_results,
        };
        //let { results } = articles;
        //console.dir(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function getSearchArticles2(searchQuery, pageNumber, date) {
    let dateForUrl = '';
    // try {
    //     let date = JSON.parse(localStorage.getItem('date'))
    //         .replace('/', '')
    //         .replace('/', '');
    //     dateForUrl = formatDateForUrl(date);
    // } catch (error) {
    //     // Якщо не вдалося отримати дату з локального сховища, то не додаємо її в URL
    // }

    const articlesFetch = await fetch(
        `${urlBase}/search/v2/articlesearch.json?q=${searchQuery}&${apiKey}&page=${pageNumber}${dateForUrl}`
    );
    const articles = await articlesFetch.json();

    let { response, errors } = articles;
    console.dir(response);

    if (errors) {
        handleErrors(errors);
        return;
    }

    const results = {
        results: response.docs,
        status: articles.status,
        num_results: response.meta.hits > 500 ? 500 : response.meta.hits,
    };

    // const sumPage = limitResults(response.meta.hits);
    // let { docs } = response;

    // console.log(docs);
    // console.log(sumPage);

    return results;
}

//getArticleByCategory2('science', 0);
