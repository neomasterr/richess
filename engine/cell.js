import {createElement} from './utils';

function Cell(board, x, y, key, options = {}) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.key = key;
    this.options = options;
    this.neighbours = {};

    this.piece = null;

    this.$element = createElement(
        `<div class="cell${(this.x + this.y) % 2 == 0 ? ' white' : ' black'}">
            <div class="key">${this.key}</div>
        </div>`
    );
}

Cell.prototype.add = function (piece) {
    if (!this.$piece) {
        this.$piece = createElement(`<div class="piece-container"></div>`);
        this.$element.insertAdjacentElement('afterbegin', this.$piece);
    }

    this.piece = piece;
    this.piece.cell = this;
    this.$piece.replaceChildren(piece.$element);
}

Cell.prototype.remove = function () {
    this.piece.cell = null;
    this.piece = null;

    if (this.$piece) {
        this.$piece.replaceChildren();
    }
}

Cell.prototype.empty = function () {
    return !this.piece;
}

Cell.prototype.neighbour = function (direction) {
    return this.neighbours[direction];
}

Cell.make = function (board, x, y, key, options = {}) {
    return new Cell(board, x, y, key, options);
}

export default Cell
