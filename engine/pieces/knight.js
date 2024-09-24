import Piece from '../piece';
import image from '/assets/pieces/knight.svg?raw';

function Knight(color, x, y, options = {}) {
    Piece.call(this, 'knight', image, color, x, y, options);
}

Knight.make = function (color, x, y, options = {}) {
    return new Knight(color, x, y, options);
}

export default Knight
