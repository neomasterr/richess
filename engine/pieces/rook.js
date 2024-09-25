import Piece from '../piece';
import image from '/assets/pieces/rook.svg?raw';

function Rook(color, x, y, options = {}) {
    Piece.call(this, 'rook', image, color, x, y, options);
}

Rook.prototype = Object.create(Piece.prototype);
Object.defineProperty(Rook.prototype, 'constructor', {
    value: Rook,
    writable: true,
    enumerable: false,
});

Rook.prototype.moves = function () {
    return ['up', 'down', 'left', 'right'].reduce((moves, direction) => {
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

Rook.make = function (color, x, y, options = {}) {
    return new Rook(color, x, y, options);
}

export default Rook
