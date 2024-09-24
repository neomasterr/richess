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
}

Piece.make = function (name, image, color, x, y, options = {}) {
    return new Piece(name, image, color, x, y, options);
}

export default Piece
