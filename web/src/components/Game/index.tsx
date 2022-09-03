import { FC } from "react";
export type GameType = {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  game?: string;
};


const Game: FC<GameType> = ({ id }) => {
  return <div>{`Jogo: ${id}`}</div>;
};

export default Game;
