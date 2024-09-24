import Piece from '../piece';
import image from '/assets/pieces/king.svg?raw';

function King(color, x, y, options = {}) {
    Piece.call(this, 'king', image, color, x, y, options);
}

King.make = function (color, x, y, options = {}) {
    return new King(color, x, y, options);
}

export default King
