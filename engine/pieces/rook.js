import Piece from '../piece';
import image from '/assets/pieces/rook.svg?raw';

function Rook(color, x, y, options = {}) {
    Piece.call(this, 'rook', image, color, x, y, options);
}

Rook.make = function (color, x, y, options = {}) {
    return new Rook(color, x, y, options);
}

export default Rook
