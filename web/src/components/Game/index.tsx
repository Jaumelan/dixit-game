import { FC, useState, useEffect } from "react";
export type GameType = {
  id: string | null;
};

const Game: FC<GameType> = ({ id }) => {
  const [players, setPlayers] = useState<string[]>([]);

  return (
    <div>
      <div>{`Jogo: ${id}`}</div>
      <div>{`Jogadores: ${players}`}</div>
    </div>
  );
};

export default Game;
