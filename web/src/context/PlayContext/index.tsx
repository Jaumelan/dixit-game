import { useState, createContext, useContext, FC, useEffect } from "react";
import { GameContextType, TurnType, PlayContextType } from "../../@types/dixit";
import { useGameContext } from "../GameContext";

const defaultPlayContext = {
  turn: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleSetTurn: (data: TurnType[] | null) => {},
};

const PlayContext = createContext<PlayContextType>(defaultPlayContext);

export const PlayContextProvider: FC<GameContextType> = ({ children }) => {
  const [turn, setTurn] = useState<TurnType[] | null>(null);
  const [cards, setCards] = useState<string[]>([]);
  const { gameData } = useGameContext();

  useEffect(() => {
    if (gameData) {
      let complete = true;
      gameData.players.forEach((player) => {
        if (player.username === "") {
          complete = false;
        }
      });
      if (complete) {
        const turn = gameData.players.map((player) => ({
          username: player.username,
          played: false,
          message: "",
          card: "",
        }));
        setTurn(turn);
      }
    }
  }, [gameData]);

  const handleSetTurn = (data: TurnType[] |null) => {
    setTurn(data);
  };

  return (
    <PlayContext.Provider value={{ turn, handleSetTurn }}>
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = () => useContext(PlayContext);
