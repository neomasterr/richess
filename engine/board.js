import Cell from './cell';
import King from './pieces/king';
import {createElement} from './utils';

function Board(options = {}) {
    this.options = options;
    this.cells = [];
    this.pieces = [];
    this.$element = createElement(
        `<div class="board"></div>`
    );

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';

    if (this.options.width && this.options.height) {
        for (let y = 0; y < this.options.height; ++y) {
            for (let x = 0; x < this.options.width; ++x) {
                const cell = Cell.make(this, x, y, this.getKeyFromCoords(x, y), this.options.cell);
                this.cells.push(cell);
                this.$element.appendChild(cell.$element);
            }
        }
    }

    // calculating cell neighbours
    this.cells.forEach(cell => {
        cell.neighbours = {
            'up-left': this.getCellFromCoords(cell.x - 1, cell.y - 1),
            'up': this.getCellFromCoords(cell.x, cell.y - 1),
            'up-right': this.getCellFromCoords(cell.x + 1, cell.y - 1),
            'right': this.getCellFromCoords(cell.x + 1, cell.y),
            'down-right': this.getCellFromCoords(cell.x + 1, cell.y + 1),
            'down': this.getCellFromCoords(cell.x, cell.y + 1),
            'down-left': this.getCellFromCoords(cell.x - 1, cell.y + 1),
            'left': this.getCellFromCoords(cell.x - 1, cell.y),
        };
    });
}

Board.prototype.add = function (piece) {
    this.pieces.push(piece);

    piece.enter(this.getCellFromCoords(piece.x, piece.y));

    piece.on('drop', this._onPieceDrop.bind(this, piece));
    piece.on('take', this._onPieceTake.bind(this, piece));
}

Board.prototype.remove = function (piece) {
    this.pieces.splice(this.pieces.indexOf(piece), 1);
    piece.leave();
}

Board.prototype.getKeyFromCoords = function (x, y) {
    return `${this.alphabet[x]}${this.options.height - y}`;
}

Board.prototype.getCoordsFromKey = function (key) {
    let x, y, i = 0;

    while (i < key.length) {
        const code = key.charCodeAt(i);

        if (code >= 97 && code <= 122) {
            x = this.alphabet.indexOf(key[i]) + this.alphabet.length * i;
        } else if (code >= 48 && code <= 57) {
            y = Number(key.slice(i)) - 1;
        } else {
            throw new Error(`Unknown char ${key[i]}`);
        }

        ++i;
    }

    return {x, y};
}

Board.prototype.getCellFromCoords = function (x, y) {
    if (x >= 0 && y >= 0 && x < this.options.width && y < this.options.height) {
        return this.cells[y * this.options.width + x];
    }
}

Board.prototype.getPieceFromCoords = function (x, y) {
    return this.getCellFromCoords(x, y).piece;
}

Board.prototype._onPieceDrop = function (piece, $target) {
    const $cell = $target.closest('.cell');

    if (!$cell) {
        return;
    }

    this.move(piece, this.cells.find(cell => cell.$element == $cell));
}

Board.prototype._onPieceTake = function (piece, victim) {
    // TODO: game log
    this.remove(victim);
}

Board.prototype._onMate = function (color) {
    // TODO: game log
    // TODO: endgame
    console.log('mate for color', color);
}

Board.prototype.move = function (piece, cell) {
    if (!this.canMove(piece, cell)) {
        return false;
    }

    piece.move(cell);

    const matedColor = this.colors.filter(color => color != piece.color).find(color => this.isMate(color));
    if (matedColor) {
        this._onMate(matedColor);
    }
}

Board.prototype.canMove = function (piece, cell) {
    const moves = piece.moves();
    if (!moves.includes(cell)) {
        return false;
    }

    let success = true;

    const lastCell = piece.cell;
    const lastCellPiece = cell.piece;

    piece.move(cell);

    success = !this.kingIsHanging(piece.color);

    // rollback
    piece.move(lastCell);

    if (lastCellPiece) {
        lastCellPiece.move(cell);

        // TODO: piece has been taken on previous piece move, should add it back, but not here and not like this
        this.pieces.push(lastCellPiece);
    }

    return success;
}

Board.prototype.cellUnderAttack = function (cell, color) {
    const cellsUnderAttack = this.pieces.filter(piece => piece.color != color).reduce((attacks, piece) => {
        return attacks.concat(piece.attacks());
    }, []);

    return cellsUnderAttack.includes(cell);
}

Board.prototype.kingIsHanging = function (color) {
    const king = this.pieces.find(piece => piece.color == color && piece instanceof King);

    return this.cellUnderAttack(king.cell, king.color);
}

Board.prototype.isMate = function (color) {
    return !this.pieces.filter(piece => piece.color == color).some(piece => piece.moves().some(cell => this.canMove(piece, cell)));
}

Board.make = function (options = {}) {
    return new Board(options);
}

export default Board
