import { useState } from "react";
import BoxInitialBody from "../HomeInitial";
import EnterGameSession from "../EnterGameSession";
import SetGame from "../SetGame";

const BoxBody = () => {
  const [createGame, setCreateGame] = useState(false);
  const [joinGame, setJoinGame] = useState(false);

  const handleCreateGame = () => {
    setCreateGame((prev) => !prev);
  };

  const handleJoinGame = () => {
    setJoinGame((prev) => !prev);
  };

  return createGame ? (
    <SetGame close={handleCreateGame} />
  ) : joinGame ? (
    <div onClick={handleJoinGame}>
      <EnterGameSession />
    </div>
  ) : (
    <BoxInitialBody
      createGameModal={handleCreateGame}
      joinGameModal={handleJoinGame}
    />
  );
};

export default BoxBody;
