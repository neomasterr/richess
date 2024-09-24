import Board from './board';
import {createElement} from './utils';

function Game(board, options = {}) {
    this.board = board
    this.options = options
    this.$element = createElement(
        `<div class="game">
            <div class="board-container"></div>
        </div>`
    );

    this.$boardContainer = this.$element.querySelector('.board-container');
    this.$boardContainer.appendChild(this.board.$element);

    this.options.pieces.forEach(piece => this.board.add(piece));
}

Game.make = function (options = {}) {
    const board = Board.make(options.board);

    return new Game(board, options);
}

export default Game
