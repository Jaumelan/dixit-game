import { useState, createContext, useContext, FC } from "react";
import { GameContextType, GameDataType } from "../../@types/dixit";

type ContextType = {
  gameData: GameDataType | null;
  handleGameSetter: (gameData: GameDataType | null) => void;
};

const defaultGameContext = {
  gameData: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleGameSetter: (data: GameDataType | null) => {},
};

const GameContext = createContext<ContextType>(defaultGameContext);

export const GameContextProvider: FC<GameContextType> = ({ children }) => {
  const [gameData, setGameData] = useState<GameDataType | null>(
    defaultGameContext.gameData
  );

  const handleGameSetter = (data: GameDataType | null) => {
    console.log("data in context ", data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setGameData(data);
  };

  return (
    <GameContext.Provider value={{ gameData, handleGameSetter }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
