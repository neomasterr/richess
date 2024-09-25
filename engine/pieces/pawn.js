import Piece from '../piece';
import image from '/assets/pieces/pawn.svg?raw';

function Pawn(color, x, y, options = {}) {
    Piece.call(this, 'pawn', image, color, x, y, options);

    this.forward = this.color == 'white' ? 'up' : 'down';
}

Pawn.prototype = Object.create(Piece.prototype);
Object.defineProperty(Pawn.prototype, 'constructor', {
    value: Pawn,
    writable: true,
    enumerable: false,
});

Pawn.prototype.attacks = function () {
    const moves = [];

    const forwardLeftCell = this.cell.neighbour(`${this.forward}-left`);
    if (forwardLeftCell) {
        moves.push(forwardLeftCell);
    }

    const forwardRightCell = this.cell.neighbour(`${this.forward}-right`);
    if (forwardRightCell) {
        moves.push(forwardRightCell);
    }

    return moves;
}

Pawn.prototype.moves = function () {
    const moves = [];

    const forwardCell = this.cell.neighbour(this.forward);
    if (forwardCell && forwardCell.empty()) {
        moves.push(forwardCell);
    }

    if (!this.moved) {
        const nextForwardCell = forwardCell.neighbour(this.forward);

        if (nextForwardCell && nextForwardCell.empty()) {
            moves.push(nextForwardCell);
        }
    }

    this.attacks().forEach(cell => {
        if (cell.piece && cell.piece.color != this.color) {
            moves.push(cell);
        }
    });

    // TODO: en passant
    // this.board.lastMoved instanceof Pawn
    // or
    // this.board.log[this.board.log.length - 1].piece instanceof Pawn ...

    return moves;
}

Pawn.make = function (color, x, y, options = {}) {
    return new Pawn(color, x, y, options);
}

export default Pawn
