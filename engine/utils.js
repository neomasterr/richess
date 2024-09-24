export const createElement = function(html) {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', html.trim());
    return template.children.length > 1 ? [...template.children] : template.firstElementChild;
}
