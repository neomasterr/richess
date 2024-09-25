import Piece from '../piece';
import image from '/assets/pieces/pawn.svg?raw';

function Pawn(color, x, y, options = {}) {
    Piece.call(this, 'pawn', image, color, x, y, options);
}

Pawn.prototype = Object.create(Piece.prototype);
Object.defineProperty(Pawn.prototype, 'constructor', {
    value: Pawn,
    writable: true,
    enumerable: false,
});

Pawn.prototype.moves = function () {
    const moves = [];
    const forward = this.color == 'white' ? 'up' : 'down';

    const forwardCell = this.cell.neighbour(forward);
    if (forwardCell && forwardCell.empty()) {
        moves.push(forwardCell);
    }

    if (!this.moved) {
        const nextForwardCell = forwardCell.neighbour(forward);

        if (nextForwardCell && nextForwardCell.empty()) {
            moves.push(nextForwardCell);
        }
    }

    const forwardLeftCell = this.cell.neighbour(`${forward}-left`);
    if (forwardLeftCell && forwardLeftCell.piece && forwardLeftCell.piece.color != this.color) {
        moves.push(forwardLeftCell);
    }

    const forwardRightCell = this.cell.neighbour(`${forward}-right`);
    if (forwardRightCell && forwardRightCell.piece && forwardRightCell.piece.color != this.color) {
        moves.push(forwardRightCell);
    }

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
