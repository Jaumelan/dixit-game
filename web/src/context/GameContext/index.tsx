import { useState, createContext, useContext, FC, useEffect } from "react";
import { GameContextType, GameDataType, PLAYERTYPE } from "../../@types/dixit";

type ContextType = {
  gameData: GameDataType | null;
  player: string;
  error: boolean;
  handleGameSetter: (gameData: GameDataType | null) => void;
  handleSetError: (error: boolean) => void;
  handlePlayerSetter: (player: string) => void;
};

const defaultGameContext = {
  gameData: null,
  player: 'NULL',
  error: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleGameSetter: (data: GameDataType | null) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleSetError: (error: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handlePlayerSetter: (player: string) => {},
};

const GameContext = createContext<ContextType>(defaultGameContext);

export const GameContextProvider: FC<GameContextType> = ({ children }) => {
  const [error, setError] = useState<boolean>(false);
  const [player, setPlayer] = useState<string>('NULL');
  const [gameData, setGameData] = useState<GameDataType | null>(
    defaultGameContext.gameData
  );

  const handleGameSetter = (data: GameDataType | null) => {
    console.log("data in context ", data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setGameData(data);
  };

  const handleSetError = (error: boolean) => {
    setError(error);
  };

  const handlePlayerSetter = (player: string) => {
    setPlayer(player);
  };

  useEffect(() => {
    console.log("player in context",  player);
  }, [player]);

  return (
    <GameContext.Provider
      value={{
        gameData,
        handleGameSetter,
        handleSetError,
        error,
        player,
        handlePlayerSetter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
