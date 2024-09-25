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

Pawn.make = function (color, x, y, options = {}) {
    return new Pawn(color, x, y, options);
}

export default Pawn
