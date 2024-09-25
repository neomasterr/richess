import Piece from '../piece';
import Rook from './rook';
import Bishop from './bishop';
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

Queen.prototype.moves = function () {
    return [...Bishop.prototype.moves.call(this), ...Rook.prototype.moves.call(this)];
}

Queen.make = function (color, x, y, options = {}) {
    return new Queen(color, x, y, options);
}

export default Queen
