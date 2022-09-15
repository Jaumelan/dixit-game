import { useState, useEffect } from "react";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import Game from "../Game";
import { GameDataType } from "../../@types/dixit";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

type GameState = {
  LOADING: "LOADING" | "LOADED" | "ERROR";
};

const GameBody = () => {
  const { user } = UserAuth();
  const { gameData, error } = useGameContext();
  const [gameState, setGameState] = useState<GameState>({ LOADING: "LOADING" });
  const [game, setGame] = useState<GameDataType | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  /* const GetGame = async () => {
    

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (data.messages.length === 0) {
        setGameState({ LOADING: "LOADED" });
        setGame(data as GameDataType);
        handleGameSetter(data as GameDataType);
      } else if (data.messages.length > 0) {
        setGameState({ LOADING: "ERROR" });
        enqueueSnackbar(data.messages[0], { variant: "error" });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setGameState({ LOADING: "ERROR" });
    }
  }; */

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
