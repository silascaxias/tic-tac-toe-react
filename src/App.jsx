import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const getActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

const getGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD].map((array) => [...array]);

  for (const turn of gameTurns) {
    const { square, player } = turn;

    gameBoard[square.row][square.col] = player;
  }

  return gameBoard;
};

const getWinner = (gameBoard, players) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
};

const App = () => {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);

  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, players);
  const hasDraw = !winner && gameTurns.length === 9;

  const onClickSquare = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = getActivePlayer(prevGameTurns);

      const updatedGameTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return updatedGameTurns;
    });
  };

  const onReset = () => {
    setGameTurns([]);
  };

  const onPlayerNameChanged = (symbol, name) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: name,
    }));
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onPlayerNameChanged={onPlayerNameChanged}
          />
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onPlayerNameChanged={onPlayerNameChanged}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset={onReset} />}
        <GameBoard onClickSquare={onClickSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
