import Piece from '../piece';
import image from '/assets/pieces/pawn.svg?raw';

function Pawn(color, x, y, options = {}) {
    Piece.call(this, 'pawn', image, color, x, y, options);
}

Pawn.make = function (color, x, y, options = {}) {
    return new Pawn(color, x, y, options);
}

export default Pawn
