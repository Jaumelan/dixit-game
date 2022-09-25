import { useState, useEffect } from "react";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import Game from "../Game";
import { GameDataType } from "../../@types/dixit";
import { useGameContext } from "../../context/GameContext";

type GameState = {
  LOADING: "LOADING" | "LOADED" | "ERROR";
};

const GameBody = () => {
  const { gameData, error } = useGameContext();
  const [gameState, setGameState] = useState<GameState>({ LOADING: "LOADING" });
  const [game, setGame] = useState<GameDataType | null>(null);

  useEffect(() => {
    if (error) {
      console.log("error de gamebody", error);
      setGameState({ LOADING: "ERROR" });
    }
  }, [error]);

  useEffect(() => {
    if (gameData) {
      if (gameData.players.length > 0) {
        setGameState({ LOADING: "LOADED" });
        setGame(gameData);
      }
    }
  }, [gameData]);

  if (gameState.LOADING === "LOADING") {
    return <Loading />;
  }

  if (gameState.LOADING === "ERROR") {
    return <ErrorPage />;
  }

  return <Game />;
};

export default GameBody;
