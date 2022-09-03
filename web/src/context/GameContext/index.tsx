import { useState, createContext, useContext, FC } from "react";

type GameContextType = {
    children: React.ReactNode;
}

const GameContext = createContext({});

export const GameContextProvider: FC<GameContextType> = ({ children }) => {
  const [gameId, setGameId] = useState<number | null>(null);

  const handleGameSetter = (id: number) => {
    setGameId(id);
  };

  return (
    <GameContext.Provider value={{ gameId, handleGameSetter }}>
        {children}
    </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
