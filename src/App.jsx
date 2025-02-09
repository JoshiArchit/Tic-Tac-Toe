import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

import { useState } from "react";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  if (turns.length === 0) {
    return "X";
  }

  return turns[0].player === "X" ? "O" : "X";
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialBoard;

  for (const turn of gameTurns) {
    const { row, col } = turn.square;
    gameBoard[row][col] = turn.player;
  }

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSquare = gameBoard[combination[1].row][combination[1].column]
    const thirdSquare = gameBoard[combination[2].row][combination[2].column]

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      console.log(`${firstSquare} won!`)
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer == "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer == "O"} />
        </ol>

        <GameBoard onSelectSquare={handleSelectSquare} board={GameBoard} />
      </div>
      <div className="log-container">
        <Log turns={gameTurns} />
      </div>
    </>
  );
}

export default App;
