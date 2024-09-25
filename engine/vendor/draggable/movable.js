import Draggable from './draggable';

function Movable($element, options = {}) {
    Draggable.call(this, $element, options);
}

Movable.prototype = Object.create(Draggable.prototype);
Object.defineProperty(Movable.prototype, 'constructor', {
    value: Movable,
    writable: true,
    enumerable: false,
});

Movable.prototype.setOptions = function (options = {}) {
    Draggable.prototype.setOptions.call(this, Object.assign({}, {
        target: {
            opacity: 0.3,
        },
        ghost: {
            zIndex: 100,
        },
    }, options));
}

/**
 * Поднятие элемента.
 *
 * @param {Number} x Смещение по X относительно элемента
 * @param {Number} y Смещение по Y относительно элемента
 *
 * @emit pick(x, y)
 */
Movable.prototype.pick = function (x, y) {
    this.cursor('grabbing');

    this.$ghost = this.$element.cloneNode(true);
    this.$ghost.style.position = 'fixed';
    this.$ghost.style.pointerEvents = 'none';
    this.$ghost.style.zIndex = this.options.ghost.zIndex;

    this.$element.style.pointerEvents = 'none';
    this.$element.insertAdjacentElement('afterend', this.$ghost);
    this.$element.style.opacity = this.options.target.opacity;

    const styles = getComputedStyle(this.$element);

    this.offsetX = parseInt(styles.left, 10) || 0;
    this.offsetY = parseInt(styles.top, 10) || 0;

    Draggable.prototype.pick.call(this, x, y);
}

/**
 * Перемещение элемента.
 *
 * @param {Number} x Смещение по X
 * @param {Number} y Смещение по Y
 *
 * @emit drag(x, y)
 */
Movable.prototype.drag = function (x, y) {
    this.$ghost.style.left = `${this.offsetX + this.pickX - this.$ghost.offsetWidth / 2 + x}px`;
    this.$ghost.style.top = `${this.offsetY + this.pickY - this.$ghost.offsetHeight / 2 + y}px`;

    Draggable.prototype.drag.call(this, x, y);
}

/**
 * Отпускание элемента.
 *
 * @param {HTMLElement} $target Целевой элемент
 *
 * @emit drop($target)
 */
Movable.prototype.drop = function ($target) {
    this.resetCursor();

    this.$element.style.opacity = '';
    this.$element.style.pointerEvents = '';
    this.$ghost.parentElement.removeChild(this.$ghost);
    delete this.$ghost;

    Draggable.prototype.drop.call(this, $target);
}

export default Movable;
