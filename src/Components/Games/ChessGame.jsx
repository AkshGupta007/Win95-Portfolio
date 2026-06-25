import { useState } from "react";
import { Chess } from "chess.js";

const icons = {
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
};

function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState(null);

  const board = game.board();

  function getSquare(row, col) {
    const files = "abcdefgh";
    return files[col] + (8 - row);
  }

  function handleClick(row, col) {
    const square = getSquare(row, col);

    console.log("clicked:", square);

    // select
    if (!selected) {
      const piece = game.get(square);

      if (!piece) return;

      setSelected(square);
      console.log("selected:", square);

      return;
    }

    try {
      const copy = new Chess(game.fen());

      console.log("moving:", selected, "to", square);

      copy.move({
        from: selected,
        to: square,
        promotion: "q",
      });

      setGame(copy);
      setSelected(null);
    } catch (err) {
      console.log(err.message);
      setSelected(null);
    }
  }

  return (
    <div>
      <h3>Turn: {game.turn() === "w" ? "White" : "Black"}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8,60px)",
        }}
      >
        {board.map((row, r) =>
          row.map((piece, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              style={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                background: (r + c) % 2 ? "#b58863" : "#f0d9b5",
              }}
            >
              {piece &&
                icons[
                  piece.color === "w" ? piece.type.toUpperCase() : piece.type
                ]}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default ChessGame;
