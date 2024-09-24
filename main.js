import './bootstrap'
import './style.scss'

// import.meta.glob([
//     './assets/**',
// ]);

import Game from './engine/game';
import Pawn from './engine/pieces/pawn';
import Knight from './engine/pieces/knight';
import Bishop from './engine/pieces/bishop';
import Rook from './engine/pieces/rook';
import King from './engine/pieces/king';
import Queen from './engine/pieces/queen';

const $app = document.querySelector('#app');
const game = Game.make({
    board: {
        width: 8,
        height: 8,
    },
    pieces: [
        Rook.make('black', 0, 0),
        Knight.make('black', 1, 0),
        Bishop.make('black', 2, 0),
        Queen.make('black', 3, 0),
        King.make('black', 4, 0),
        Bishop.make('black', 5, 0),
        Knight.make('black', 6, 0),
        Rook.make('black', 7, 0),
        Pawn.make('black', 0, 1),
        Pawn.make('black', 1, 1),
        Pawn.make('black', 2, 1),
        Pawn.make('black', 3, 1),
        Pawn.make('black', 4, 1),
        Pawn.make('black', 5, 1),
        Pawn.make('black', 6, 1),
        Pawn.make('black', 7, 1),

        Pawn.make('white', 0, 6),
        Pawn.make('white', 1, 6),
        Pawn.make('white', 2, 6),
        Pawn.make('white', 3, 6),
        Pawn.make('white', 4, 6),
        Pawn.make('white', 5, 6),
        Pawn.make('white', 6, 6),
        Pawn.make('white', 7, 6),
        Rook.make('white', 0, 7),
        Knight.make('white', 1, 7),
        Bishop.make('white', 2, 7),
        Queen.make('white', 3, 7),
        King.make('white', 4, 7),
        Bishop.make('white', 5, 7),
        Knight.make('white', 6, 7),
        Rook.make('white', 7, 7),
    ],
});

$app.appendChild(game.$element);
