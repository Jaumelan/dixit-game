/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext, useContext, FC, useEffect } from "react";
import {
  GameContextType,
  TurnType,
  PlayContextType,
  UpdateGameSetterType,
} from "../../@types/dixit";
import { useGameContext } from "../GameContext";

const defaultPlayContext = {
  gameSetter: null,
  cards: null,
  sendDiscover: false,
  dixitPlayed: false,
  playing: false,
  playersSelectCards: false,
  playersName: "",
  otherPlayersChose: false,
  discoverCard: false,
  handleSetGame: (data: TurnType[] | null) => {},

  UpdateOtherPlayersGameSetter: (data: {
    email: string;
    cardsPlayed: string;
  }) => {},

  handleSetCards: (data: { username: string; hand: string[] }[]) => {},

  handleUpdateGameSetter: (data: UpdateGameSetterType) => {},

  handleDixitPlayed: (data: boolean) => {},

  handleSetPlaying: (data: boolean) => {},

  handlePlayersSelectCards: (data: boolean) => {},

  handleSetPlayersName: (data: string) => {},
  handleSetSendDiscover: (data: boolean) => {},
  handleOtherPlayersChose: (data: boolean) => {},
  handleUpdateDiscover: (data: { email: string; choosenCard: string }) => {},
};

const PlayContext = createContext<PlayContextType>(defaultPlayContext);

export const PlayContextProvider: FC<GameContextType> = ({ children }) => {
  const [gameSetter, setGameSetter] = useState<TurnType[] | null>(null);
  const [cards, setCards] = useState<
    { username: string; hand: string[] }[] | null
  >(null);
  const { gameData, complete } = useGameContext();
  const [playersName, setPlayersName] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  const [sendDiscover, setSendDiscover] = useState(false);
  const [otherPlayersChose, setOtherPlayersChose] = useState(false);
  const [dixitPlayed, setDixitPlayed] = useState(false);
  const [playersSelectCards, setPlayersSelectCards] = useState<boolean>(false);
  const [discoverCard, setDiscoverCard] = useState<boolean>(false);
  const [everyonePlayed, setEveryonePlayed] = useState<boolean>(false);

  useEffect(() => {
    if (gameData) {
      if(complete) {
      let completePlayContext = true;
      gameData.players.forEach((player) => {
        if (player.username === "") {
          completePlayContext = false;
        }
      });
      if (completePlayContext) {
        const turn = gameData.players.map((player) => ({
          username: player.username,
          email: player.email,
          played: false,
          messages: [],
          cardsPlayed: [],
          choseCard: false,
          choosenCard: "",
          hand: [],
          score: 0,
        }));
        setGameSetter(turn);
        setPlaying(() => true);
      }
    }
  }
  }, [gameData, complete]);

  useEffect(() => {
    if (gameSetter) {
      const count = gameSetter.reduce((acc, player) => {
        if (player.choseCard) {
          acc += 1;
        }
        return acc;
      }, 0);
      if (count === gameSetter.length - 1) {
        setDiscoverCard(true);
      }
    }
  }, [gameSetter]);

  useEffect(() => {
    if (gameSetter) {
      const count = gameSetter.reduce((acc, player) => {
        if (player.choosenCard !== "") {
          acc += 1;
        }
        return acc;
      }, 0);
      if (count === gameSetter.length - 1) {
        setEveryonePlayed(true);
      }
    }
    console.log(" atualiza gamesetter ", gameSetter);
  }, [gameSetter]);

  const handleSetGame = (data: TurnType[] | null) => {
    setGameSetter(data);
  };

  const handleUpdateDiscover = (data: {
    email: string;
    choosenCard: string;
  }) => {
    if (gameSetter) {
      const newGameSetter = gameSetter.map((player) => {
        if (player.email === data.email) {
          return {
            ...player,
            choosenCard: data.choosenCard,
          };
        }
        return player;
      });
      setGameSetter(newGameSetter);
      setSendDiscover(() => true);
    }
  };

  const handleOtherPlayersChose = (data: boolean) => {
    setOtherPlayersChose(data);
  };

  const handleSetSendDiscover = (data: boolean) => {
    setSendDiscover(data);
  };

  const handleSetPlaying = (data: boolean) => {
    setPlaying(data);
  };

  const handleSetPlayersName = (data: string) => {
    setPlayersName(data);
  };

  const handleUpdateGameSetter = (data: UpdateGameSetterType) => {
    if (gameSetter) {
      const newTurn = gameSetter.map((item) => {
        if (item.username === data.username) {
          return {
            ...item,
            cardsPlayed: [...item.cardsPlayed, data.cardsPlayed],
            messages: [...item.messages, data.message],
            played: true,
          };
        }
        return item;
      });
      setGameSetter(newTurn);
      setDixitPlayed(() => true);
    }
  };
  const handlePlayersSelectCards = (data: boolean) => {
    setPlayersSelectCards(data);
  };

  const handleDixitPlayed = (update: boolean) => {
    setDixitPlayed(() => update);
  };

  const handleSetCards = (data: { username: string; hand: string[] }[]) => {
    setCards(data);
  };

  const UpdateOtherPlayersGameSetter = (data: {
    email: string;
    cardsPlayed: string;
  }) => {
    if (gameSetter) {
      const newGameSetter = gameSetter.map((item) => {
        if (item.email === data.email) {
          return {
            ...item,
            cardsPlayed: [...item.cardsPlayed, data.cardsPlayed],
            choseCard: true,
          };
        }
        return item;
      });
      setGameSetter(newGameSetter);
    }

    setOtherPlayersChose(() => true);
  };

  return (
    <PlayContext.Provider
      value={{
        gameSetter,
        handleSetGame,
        handleSetCards,
        cards,
        playing,
        sendDiscover,
        otherPlayersChose,
        playersSelectCards,
        playersName,
        dixitPlayed,
        UpdateOtherPlayersGameSetter,
        handleSetSendDiscover,
        handleUpdateGameSetter,
        handleDixitPlayed,
        handleSetPlaying,
        handlePlayersSelectCards,
        handleSetPlayersName,
        handleOtherPlayersChose,
        discoverCard,
        handleUpdateDiscover,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = () => useContext(PlayContext);
