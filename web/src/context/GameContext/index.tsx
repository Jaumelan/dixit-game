import React, {
  useState,
  createContext,
  useContext,
  FC,
  useEffect,
} from "react";

type GameContextType = {
  children: React.ReactNode;
};

export type GameDataType = {
  id: string;
  players: number;
  timePerTurn: number;
};

type ContextType = {
  gameData: GameDataType | null;
  handleGameSetter: (gameData: GameDataType) => void;
};

const defaultGameContext = {
  gameData: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleGameSetter: () => {},
};

const GameContext = createContext<ContextType>(defaultGameContext);

export const GameContextProvider: FC<GameContextType> = ({ children }) => {
  const [gameData, setGameData] = useState<GameDataType | null>(
    defaultGameContext.gameData
  );

  const handleGameSetter = (data: GameDataType) => {
    console.log("data in context ", data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setGameData(data);
  };

  useEffect(() => {
    console.log("gameId changed", gameData);
  }, [gameData]);

  return (
    <GameContext.Provider value={{ gameData, handleGameSetter }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
