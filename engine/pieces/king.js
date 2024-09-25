import Piece from '../piece';
import image from '/assets/pieces/king.svg?raw';

function King(color, x, y, options = {}) {
    Piece.call(this, 'king', image, color, x, y, options);
}

King.prototype = Object.create(Piece.prototype);
Object.defineProperty(King.prototype, 'constructor', {
    value: King,
    writable: true,
    enumerable: false,
});

King.prototype.moves = function () {
    return Object.values(this.cell.neighbours).filter(cell => cell && (cell.empty() || (cell.piece && cell.piece.color != this.color)));
}

King.make = function (color, x, y, options = {}) {
    return new King(color, x, y, options);
}

export default King
