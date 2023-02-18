function activateNavigation(pageName) {
    const el = document.querySelector(`.${pageName}`);
    el.classList.add("active");
}