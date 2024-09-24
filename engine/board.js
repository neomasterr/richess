import Cell from './cell';
import {createElement} from './utils';

function Board(options = {}) {
    this.options = options;
    this.cells = [];
    this.pieces = [];
    this.$element = createElement(
        `<div class="board"></div>`
    );

    if (this.options.width && this.options.height) {
        for (let y = 0; y < this.options.width; ++y) {
            for (let x = 0; x < this.options.width; ++x) {
                const cell = Cell.make(this, x, y, this.options.cell);
                this.cells.push(cell);
                this.$element.appendChild(cell.$element);
            }
        }
    }
}

Board.prototype.add = function (piece) {
    this.pieces.push(piece);
    this.getCellFromCoords(piece.x, piece.y).add(piece);
}

Board.prototype.getCellFromCoords = function (x, y) {
    return this.cells[y * this.options.width + x];
}

Board.prototype.getPieceFromCoords = function (x, y) {
    return this.getCellFromCoords(x, y).piece;
}

Board.make = function (options = {}) {
    return new Board(options);
}

export default Board
