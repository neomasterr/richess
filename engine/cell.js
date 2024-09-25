import {createElement} from './utils';

function Cell(board, x, y, options = {}) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.options = options;

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = `${alphabet[this.x]}${this.y + 1}`;

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

Cell.make = function (board, x, y, options = {}) {
    return new Cell(board, x, y, options);
}

export default Cell
