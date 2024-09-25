import ComponentElement from 'component-element';
import Movable from 'draggable/movable';
import {createElement} from './utils';

function Piece(name, image, color, x, y, options = {}) {
    this.name = name;
    this.image = image;
    this.color = color;
    this.x = x;
    this.y = y;
    this.options = options;
    this.$element = createElement(
        `<div class="piece ${this.name} ${this.color}">
            <div class="image">${image}</div>
        </div>`
    );

    this.movable = new Movable(this.$element, {
        on: {
            drop: ($target) => {
                this.emit('drop', $target);
            },
        },
    });

    ComponentElement.call(this, this.$element);
}

Piece.prototype = Object.create(ComponentElement.prototype);
Object.defineProperty(Piece.prototype, 'constructor', {
    value: Piece,
    writable: true,
    enumerable: false,
});

Piece.make = function (name, image, color, x, y, options = {}) {
    return new Piece(name, image, color, x, y, options);
}

export default Piece
