function activateNavigation(pageName) {
    const el = document.querySelector(`.${pageName}`);
    el.classList.add("active");
};

const bodyEl = document.querySelector("body");
const pageName = bodyEl.dataset.name;

activateNavigation(pageName);

