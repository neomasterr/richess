import Piece from '../piece';
import image from '/assets/pieces/knight.svg?raw';

function Knight(color, x, y, options = {}) {
    Piece.call(this, 'knight', image, color, x, y, options);
}

Knight.prototype = Object.create(Piece.prototype);
Object.defineProperty(Knight.prototype, 'constructor', {
    value: Knight,
    writable: true,
    enumerable: false,
});

Knight.prototype.attacks = function () {
    return [
        {direction: 'up', branches: ['left', 'right']},
        {direction: 'right', branches: ['up', 'down']},
        {direction: 'down', branches: ['left', 'right']},
        {direction: 'left', branches: ['down', 'up']},
    ].reduce((moves, pattern) => {
        const forwardCell = this.cell.neighbour(pattern.direction);
        if (!forwardCell) {
            return moves;
        }

        const nextForwardCell = forwardCell.neighbour(pattern.direction);
        if (!nextForwardCell) {
            return moves;
        }

        pattern.branches.forEach(direction => {
            const branchCell = nextForwardCell.neighbour(direction);

            if (branchCell) {
                moves.push(branchCell);
            }
        });

        return moves;
    }, []);
}

Knight.prototype.moves = function () {
    return this.attacks().filter(cell => {
        return (cell.empty() || (cell.piece && cell.piece.color != this.color))
    });
}

Knight.make = function (color, x, y, options = {}) {
    return new Knight(color, x, y, options);
}

export default Knight
