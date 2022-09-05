import { useState, useEffect } from "react";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import Game from "../Game";
import { GameDataType } from "../../context/GameContext";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";

type GameState = {
  LOADING: "LOADING" | "LOADED" | "ERROR";
};

const GameBody = () => {
  const { user } = UserAuth();
  const { gameData, handleGameSetter } = useGameContext();
  const [gameState, setGameState] = useState<GameState>({ LOADING: "LOADING" });
  const [game, setGame] = useState<GameDataType | null>(null);

  const getDataMock = () => {
    return {
      id: gameData?.id,
      numberOfPlayers: gameData?.numberOfPlayers,
      timePerTurn: gameData?.timePerTurn,
      players: [user],
    };
  };

  useEffect(() => {
    const GetGame = async () => {
      try {
        //const response = await fetch(`http://localhost:3000/games/${gameId}`);
        const data = getDataMock();
        console.log()
        //const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (data) {
          setGameState({ LOADING: "LOADED" });
          setGame(data as GameDataType);
          handleGameSetter(data as GameDataType);
        }

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

  return <Game />;
};

export default GameBody;
