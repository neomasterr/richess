import {createElement} from './utils';

function Cell(board, x, y, options = {}) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.index = this.y * this.board.options.width + this.x;
    this.options = options;

    this.piece = null;

    this.$element = createElement(
        `<div class="cell${(this.x + this.y) % 2 == 0 ? ' white' : ' black'}"></div>`
    );
}

Cell.prototype.add = function (piece) {
    this.piece = piece;
    this.$element.replaceChildren(piece.$element);
}

Cell.make = function (board, x, y, options = {}) {
    return new Cell(board, x, y, options);
}

export default Cell
