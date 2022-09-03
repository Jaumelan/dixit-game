import { useState, useEffect } from "react";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import Game from "../Game";
import { GameType } from "../Game";
import { useGameContext } from "../../context/GameContext";

type GameState = {
  LOADING: "LOADING" | "LOADED" | "ERROR";
};

const GameBody = () => {
    const { handleGameSetter } = useGameContext();
  const [gameState, setGameState] = useState<GameState>({ LOADING: "LOADING" });
  const [game, setGame] = useState<GameType | null>(null);

  useEffect(() => {
    const GetGame = async () => {
      try {
        const response = await fetch("http://localhost:3000/games/1");
        const data = await response.json();
        setGame(data);
        setGameState({ LOADING: "LOADED" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setGameState({ LOADING: "ERROR" });
      }
    };

    GetGame();
  }, []);

  if (gameState.LOADING === "LOADING") {
    return <Loading />;
  }

  if (gameState.LOADING === "ERROR") {
    return <ErrorPage />;
  }

  return (
    <Game
      id={game?.id}
      name={game?.name}
      description={game?.description}
      image={game?.image}
      game={game?.game}
    />
  );
};

export default GameBody;
