import { useState, createContext, useContext, FC, useEffect } from "react";
import { GameContextType, TurnType, PlayContextType } from "../../@types/dixit";
import { useGameContext } from "../GameContext";

const defaultPlayContext = {
  turn: null,
  cards: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleSetTurn: (data: TurnType[] | null) => {},

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleSetCards: (data: { username: string; hand: string[] }[]) => {},
};

const PlayContext = createContext<PlayContextType>(defaultPlayContext);

export const PlayContextProvider: FC<GameContextType> = ({ children }) => {
  const [turn, setTurn] = useState<TurnType[] | null>(null);
  const [cards, setCards] =
    useState<{ username: string; hand: string[] }[] | null>(null);
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

  useEffect(() => {
    console.log("cards in context", cards);
  }, [cards]);

  const handleSetTurn = (data: TurnType[] | null) => {
    setTurn(data);
  };

  const handleSetCards = (data: { username: string; hand: string[] }[]) => {
    setCards(data);
  };

  return (
    <PlayContext.Provider
      value={{ turn, handleSetTurn, handleSetCards, cards }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = () => useContext(PlayContext);
