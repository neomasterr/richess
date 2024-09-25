import Piece from '../piece';
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

Bishop.make = function (color, x, y, options = {}) {
    return new Bishop(color, x, y, options);
}

export default Bishop
