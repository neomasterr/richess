import ComponentElement from 'component-element';

function Draggable($element, options = {}) {
    ComponentElement.call(this, $element, options);

    this.picked = false;
    this.pickX = 0;
    this.pickY = 0;

    this._binds = {
        pick:   {event: 'mousedown', handler: this._onPickEvent.bind(this)},
        drop:   {event: 'mouseup',   handler: this._onDropEvent.bind(this)},
        drag:   {event: 'mousemove', handler: this._onDragEvent.bind(this)},
        enter:  {event: 'mouseover', handler: this._onMouseEnterEvent.bind(this)},
        cancel: {event: 'keydown',   handler: this._onKeyDownEvent.bind(this)},
        cancelPick: {event: 'mouseup',   handler: this._onCancelPickEvent.bind(this)},
    };

    this.$element.addEventListener(this._binds.pick.event, this._binds.pick.handler);
}

Draggable.prototype = Object.create(ComponentElement.prototype);
Object.defineProperty(Draggable.prototype, 'constructor', {
    value: Draggable,
    writable: true,
    enumerable: false,
});

Draggable.prototype.setOptions = function (options = {}) {
    ComponentElement.prototype.setOptions.call(this, Object.assign({}, {
        xAxis: true,
        yAxis: true,
        timeout: 0, // задержка при клике до срабатывания перетаскивания
        cursor: {
            grabbing: 'grabbing',
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
Draggable.prototype.pick = function (x, y) {
    this.picked = true;

    this.emit('pick', x, y);
    this._initListeners();
}

/**
 * Отпускание элемента.
 *
 * @param {HTMLElement} $target Целевой элемент
 *
 * @emit drop($target)
 */
Draggable.prototype.drop = function ($target) {
    this.picked = false;

    this.emit('drop', $target);
    this._removeListeners();
}

/**
 * Перемещение элемента.
 *
 * @param {Number} x Смещение по X
 * @param {Number} y Смещение по Y
 *
 * @emit drag(x, y)
 */
Draggable.prototype.drag = function (x, y) {
    this.emit('drag', x, y);
}

/**
 * Перемещение перетаскиваемого элемента над другим.
 *
 * @param {HTMLElement} $target Целевой элемент
 *
 * @param {Number} x Смещение по X
 * @param {Number} y Смещение по Y
 *
 * @emit over($target)
 */
Draggable.prototype.over = function ($target, x, y) {
    this.emit('over', $target, x, y);
}

/**
 * Занесение перетаскиваемого элемента над другим.
 *
 * @param {HTMLElement} $target Целевой элемент
 *
 * @param {Number} x Смещение по X
 * @param {Number} y Смещение по Y
 *
 * @emit enter($target)
 */
Draggable.prototype.enter = function ($target, x, y) {
    this.emit('enter', $target, x, y);
}

/**
 * Отмена перетаскивания.
 * @emit cancel
 */
Draggable.prototype.cancel = function () {
    this.emit('cancel');
    this.drop();
}

Draggable.prototype.initPick = function (e) {
    return this._onPickEvent(e);
}

Draggable.prototype._onPickEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();

    this._initPickListeners();

    clearTimeout(this._pickTimeout);
    this._pickTimeout = setTimeout(() => {
        this._removePickListeners();
        delete this._pickTimeout;

        this.event = e;

        this.pickX = e.pageX;
        this.pickY = e.pageY;

        // так как схватить могли за любую часть элемента, включая дочерние элементы
        // нужно добавить смещение от целевого элемента до корневого
        const targetRect = e.target.getBoundingClientRect();
        const elementRect = this.$element.getBoundingClientRect();

        const deltaX = targetRect.left - elementRect.left;
        const deltaY = targetRect.top - elementRect.top;

        this.cursor(this.options.cursor.grabbing);
        this.pick(e.offsetX + deltaX, e.offsetY + deltaY);
    }, this.options.timeout);
}

Draggable.prototype._onDropEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.event = e;

    this.resetCursor();
    this.drop(e.target);
}

Draggable.prototype._onCancelPickEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();

    this._removePickListeners();

    clearTimeout(this._pickTimeout);
    delete this._pickTimeout;
}

Draggable.prototype._onDragEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();

    cancelAnimationFrame(this._dragAnimationFrame);
    this._dragAnimationFrame = requestAnimationFrame(() => {
        if (!this.picked) {
            return;
        }

        this.event = e;

        this.drag(
            (this.options.xAxis ? e.pageX - this.pickX : 0),
            (this.options.yAxis ? e.pageY - this.pickY : 0)
        );

        this.over(e.target, e.offsetX, e.offsetY);
    });
}

Draggable.prototype._onMouseEnterEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.event = e;

    this.enter(e.target, e.offsetX, e.offsetY);
}

Draggable.prototype._onKeyDownEvent = function (e) {
    if (e.key == 'Escape') {
        e.preventDefault();
        e.stopPropagation();

        this.event = e;

        this.resetCursor();
        this.cancel();
    }
}

Draggable.prototype._initListeners = function () {
    this._removeListeners();

    document.addEventListener(this._binds.drop.event, this._binds.drop.handler);
    document.addEventListener(this._binds.drag.event, this._binds.drag.handler);
    document.addEventListener(this._binds.cancel.event, this._binds.cancel.handler);
    document.addEventListener(this._binds.enter.event, this._binds.enter.handler);
}

Draggable.prototype._removeListeners = function () {
    document.removeEventListener(this._binds.drop.event, this._binds.drop.handler);
    document.removeEventListener(this._binds.drag.event, this._binds.drag.handler);
    document.removeEventListener(this._binds.cancel.event, this._binds.cancel.handler);
    document.removeEventListener(this._binds.enter.event, this._binds.enter.handler);
}

Draggable.prototype._initPickListeners = function () {
    this._removePickListeners();

    document.addEventListener(this._binds.cancelPick.event, this._binds.cancelPick.handler);
}

Draggable.prototype._removePickListeners = function () {
    document.removeEventListener(this._binds.cancelPick.event, this._binds.cancelPick.handler);
}

Draggable.prototype.cursor = function (cursor) {
    const $cursorStyle = document.getElementById('cursor-style') || document.createElement('style');
    $cursorStyle.innerHTML = `*{cursor: ${cursor} !important;}`;
    $cursorStyle.id = 'cursor-style';
    document.head.appendChild($cursorStyle);
}

Draggable.prototype.resetCursor = function () {
    const $cursorStyle = document.getElementById('cursor-style');
    if ($cursorStyle && $cursorStyle.parentElement) {
        $cursorStyle.parentElement.removeChild($cursorStyle);
    }
}

export default Draggable;
