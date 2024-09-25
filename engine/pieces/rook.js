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

Rook.make = function (color, x, y, options = {}) {
    return new Rook(color, x, y, options);
}

export default Rook
