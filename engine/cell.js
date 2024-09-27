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

Cell.prototype.enter = function (piece) {
    if (!this.$pieceContainer) {
        this.$pieceContainer = createElement(`<div class="piece-container"></div>`);
        this.$element.insertAdjacentElement('afterbegin', this.$pieceContainer);
    }

    this.piece = piece;
    this.$pieceContainer.replaceChildren(piece.$element);
}

Cell.prototype.leave = function () {
    this.piece = null;

    if (this.$pieceContainer) {
        this.$pieceContainer.replaceChildren();
        this.$element.removeChild(this.$pieceContainer).replaceChildren();
        delete this.$pieceContainer;
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
