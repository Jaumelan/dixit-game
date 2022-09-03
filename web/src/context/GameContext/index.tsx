import { useState, createContext, useContext, FC } from "react";

type GameContextType = {
  children: React.ReactNode;
};

type ContextType = {
  gameId: string | null;
  handleGameSetter: React.Dispatch<React.SetStateAction<string | null>>;
};

const defaultGameContext = {
  gameId: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleGameSetter: () => {},
};

const GameContext = createContext<ContextType>(defaultGameContext);

export const GameContextProvider: FC<GameContextType> = ({ children }) => {
  const [gameId, setGameId] = useState<string | null>(null);

  const handleGameSetter = (id: string) => {
    setGameId(id);
  };

  return (
    <GameContext.Provider value={{ gameId, handleGameSetter }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
