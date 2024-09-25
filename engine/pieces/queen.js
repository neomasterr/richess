import Piece from '../piece';
import image from '/assets/pieces/queen.svg?raw';

function Queen(color, x, y, options = {}) {
    Piece.call(this, 'queen', image, color, x, y, options);
}

Queen.prototype = Object.create(Piece.prototype);
Object.defineProperty(Queen.prototype, 'constructor', {
    value: Queen,
    writable: true,
    enumerable: false,
});

Queen.make = function (color, x, y, options = {}) {
    return new Queen(color, x, y, options);
}

export default Queen
