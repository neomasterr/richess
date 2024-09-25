import Piece from '../piece';
import King from './king';
import image from '/assets/pieces/bishop.svg?raw';

function Bishop(color, x, y, options = {}) {
    Piece.call(this, 'bishop', image, color, x, y, options);
}

Bishop.prototype = Object.create(Piece.prototype);
Object.defineProperty(Bishop.prototype, 'constructor', {
    value: Bishop,
    writable: true,
    enumerable: false,
});

Bishop.prototype.attacks = function () {
    return ['up-left', 'up-right', 'down-right', 'down-left'].reduce((moves, direction) => {
        let next = this.cell;

        while (next = next.neighbour(direction)) {
            if (next.empty()) {
                moves.push(next);

                continue;
            }

            if (next.piece instanceof King && next.piece.color != this.color) {
                moves.push(next);

                continue;
            }

            if (next.piece.color == this.color) {
                moves.push(next);
            }

            break;
        }

        return moves;
    }, []);
}

Bishop.prototype.moves = function () {
    return ['up-left', 'up-right', 'down-right', 'down-left'].reduce((moves, direction) => {
        let next = this.cell;

        while (next = next.neighbour(direction)) {
            if (next.empty()) {
                moves.push(next);
            } else if (next.piece) {
                if (next.piece.color != this.color) {
                    moves.push(next);
                }

                break;
            }
        }

        return moves;
    }, []);
}

Bishop.make = function (color, x, y, options = {}) {
    return new Bishop(color, x, y, options);
}

export default Bishop
