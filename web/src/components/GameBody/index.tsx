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
  const { gameId } = useGameContext();
  const [gameState, setGameState] = useState<GameState>({ LOADING: "LOADING" });
  const [game, setGame] = useState<string | null>(null);

  const getDataMock = () => {
    return { id: gameId };
  };

  useEffect(() => {
    const GetGame = async () => {
      try {
        //const response = await fetch(`http://localhost:3000/games/${gameId}`);
        const { id } = getDataMock();
        //const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setGame(id);
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
      id={game}
      
    />
  );
};

export default GameBody;
