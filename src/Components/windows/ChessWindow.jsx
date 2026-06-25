import BaseWindow from "./BaseWindow";
import ChessGame from "../Games/ChessGame";

function ChessWindow({ onClose, onMinimize }) {
  return (
    <BaseWindow
      title="♟ Chess Game"
      onClose={onClose}
      onMinimize={onMinimize}
      width="520px"
      top="80px"
      left="250px"
    >
      <ChessGame />
    </BaseWindow>
  );
}

export default ChessWindow;
