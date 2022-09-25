/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  useState,
  createContext,
  useContext,
  FC,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  GameContextType,
  TurnType,
  PlayContextType,
  UpdateGameSetterType,
} from "../../@types/dixit";
import { UserAuth } from "../AuthContext";
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
  dixitSwitch: false,
  everyonePlayed: false,
  sendDixitName: false,
  sendScore: true,
  continuePlaying: false,
  constinueSocket: false,
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
  UpdateOtherPlayersWithoutSwitch: (email: string, cardsPlayed: string[]) => {},
  handleSetPlayersName: (data: string) => {},
  handleSetSendDiscover: (data: boolean) => {},
  handleOtherPlayersChose: (data: boolean) => {},
  handleUpdateDiscover: (data: { email: string; choosenCard: string }) => {},
  handleDixitSelection: (data: { email: string; card: string }) => {},
  handleDixitSwitch: (data: boolean) => {},
  handleUpdateDiscoverWithouSwitch: (data: {
    email: string;
    choosenCard: string;
  }) => {},
  handleCloseSendDixitName: () => {},
  handleSetPlayersNameWithoutSocket: (data: string) => {},
  handleUpdateScore: (
    data: { email: string; score: number }[],
    user: string
  ) => {},
  handleSendScore: (data: boolean) => {},
  handleSetDiscoverCard: (data: boolean) => {},
  handleEveryonePlayed: (data: boolean) => {},
  handleContinuePlaying: (data: boolean) => {},
  handleContinueSocket: (data: boolean) => {},
  nextRound: () => {},
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
  const [continuePlaying, setContinuePlaying] = useState(false);
  const [constinueSocket, setContinueSocket] = useState(false);
  //switch to true when dixit played chose card and message
  const [dixitPlayed, setDixitPlayed] = useState(false);
  const [dixitSwitch, setDixitSwitch] = useState(false);
  const [playersSelectCards, setPlayersSelectCards] = useState<boolean>(false);
  const [discoverCard, setDiscoverCard] = useState<boolean>(false);
  const [sendScore, setSendScore] = useState<boolean>(false);
  const [sendDixitName, setSendDixitName] = useState<boolean>(false);
  const [everyonePlayed, setEveryonePlayed] = useState<boolean>(false);
  const { user } = UserAuth();
  const gameSetRef = useRef(gameSetter);

  useEffect(() => {
    if (gameData) {
      if (complete) {
        //check if all players are ready
        let completePlayContext = true;
        gameData.players.forEach((player) => {
          if (player.username === "") {
            completePlayContext = false;
          }
        });

        if (completePlayContext) {
          const gameSet: TurnType[] = [];
          gameData.players.forEach((player, index) => {
            const handPlayer = [];

            for (
              let j = (gameData.cards.length / gameData.players.length) * index;
              j <
              (gameData.cards.length / gameData.players.length) * (index + 1);
              j++
            ) {
              handPlayer.push(gameData.cards[j]);
            }
            const playerData = {
              username: player.username,
              email: player.email,
              played: false,
              messages: [],
              cardsPlayed: [],
              choseCard: false,
              choosenCard: "",
              hand: handPlayer,
              score: 0,
            };
            gameSet.push(playerData);
          });
          handleSetGame(gameSet);
          setPlaying(() => true);
        }
      } else {
        setPlaying(() => false);
      }
    }
  }, [gameData, complete]);

  useEffect(() => {
    EveryoneChoose();
  }, [gameSetter]);

  const EveryoneChoose = useCallback(() => {
    if (gameSetRef.current) {
      const count = gameSetRef.current.reduce((acc, player) => {
        if (player.choseCard) {
          acc += 1;
        }
        return acc;
      }, 0);

      console.log("conta quantos escolheram", count);
      if (count === gameSetRef.current.length - 1) {
        handleSetDiscoverCard(true);
      }
    }
  }, [gameSetRef.current]);

  useEffect(() => {
    console.log(" atualiza gamesetter ", gameSetter);

    if (gameSetter) {
      const count = gameSetter.reduce((acc, player) => {
        if (player.choosenCard !== "") {
          acc += 1;
        }
        return acc;
      }, 0);
      if (count === gameSetter.length - 1) {
        handleEveryonePlayed(true);
        //handleSendScore(true);
      }
    }
  }, [gameSetter]);

  useEffect(() => {
    let count = 0;
    if (everyonePlayed && count ===0) {
      
      handleSendScore(true);
      count += 1;
    } else if (!everyonePlayed) {
      count = 0;
    }

  }, [everyonePlayed]);

  useEffect(() => {
    if (continuePlaying) {
      handleSetPlaying(true);
      handleSetDiscoverCard(false);
      resetEveyonePlayed();
      handleEveryonePlayed(false);
      handlePlayersSelectCards(false);
      handleContinuePlaying(false);
    }
  }, [continuePlaying]);

  const handleSetDiscoverCard = (data: boolean) => {
    setDiscoverCard(data);
  };

  const resetEveyonePlayed = () => {
    if (gameSetRef.current) {
      const newGameSet = gameSetRef.current.map((player) => {
        return {
          ...player,
          choseCard: false,
          choosenCard: "",
        };
      });
      handleSetGame(newGameSet);
    }
  };

  const handleEveryonePlayed = (data: boolean) => {
    setEveryonePlayed(data);
  };

  const handleContinueSocket = (data: boolean) => {
    setContinueSocket(data);
  };

  const handleSetGame = (data: TurnType[] | null) => {
    setGameSetter(data);
    gameSetRef.current = data;
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
      handleSetGame(newGameSetter);
      setSendDiscover(() => true);
    }
  };

  const nextRound = () => {
    if (gameSetter) {
      const newGameSetter = gameSetter.map((player) => {
        return {
          ...player,
          played: false,
          messages: [],
          choseCard: false,
          choosenCard: "",
        };
      });
      handleSetGame(newGameSetter);
      handleSetPlaying(true);
      handleSetDiscoverCard(false);
      resetEveyonePlayed();
      handleEveryonePlayed(false);
      handlePlayersSelectCards(false);
      handleContinuePlaying(false);
    }
  };

  const handleUpdateDiscoverWithouSwitch = (data: {
    email: string;
    choosenCard: string;
  }) => {
    if (user?.email !== data.email) {
      if (gameSetRef.current) {
        const newGameSetter = gameSetRef.current.map((player) => {
          if (player.email === data.email) {
            return {
              ...player,
              choosenCard: data.choosenCard,
            };
          }
          return player;
        });
        handleSetGame(newGameSetter);
      }
    }
  };

  const handleOtherPlayersChose = (data: boolean) => {
    setOtherPlayersChose(data);
  };

  const handleContinuePlaying = (data: boolean) => {
    setContinuePlaying(data);
  };

  const handleSetSendDiscover = (data: boolean) => {
    setSendDiscover(data);
  };

  const handleDixitSwitch = (data: boolean) => {
    setDixitSwitch(data);
  };

  const handleSetPlaying = (data: boolean) => {
    setPlaying(data);
  };

  const handleSetPlayersName = (data: string) => {
    console.log("seta nome do player", data);
    setPlayersName(data);
    setSendDixitName(() => true);
  };

  const handleSetPlayersNameWithoutSocket = (data: string) => {
    console.log("seta nome do player", data);
    setPlayersName(data);
  };

  const handleCloseSendDixitName = () => {
    setSendDixitName(() => false);
  };

  const handleUpdateGameSetter = (data: UpdateGameSetterType) => {
    if (gameSetter) {
      const newTurn = gameSetter.map((item) => {
        if (item.email === data.email) {
          return {
            ...item,
            cardsPlayed: [...item.cardsPlayed, data.cardsPlayed],
            messages: [...item.messages, data.message],
            played: true,
          };
        }
        return item;
      });
      handleSetGame(newTurn);
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

  const handleDixitSelection = (data: { email: string; card: string }) => {
    if (gameSetter) {
      const newGameSetter = gameSetter.map((player) => {
        if (player.email === data.email) {
          return {
            ...player,
            choseCard: true,
            choosenCard: data.card,
          };
        }
        return player;
      });
      handleSetGame(newGameSetter);
      setDixitSwitch(() => true);
    }
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
      handleSetGame(newGameSetter);
      console.log("before switch ", newGameSetter);
    }

    setOtherPlayersChose(() => true);
  };

  const handleUpdateScore = (
    data: { email: string; score: number }[],
    userEmail: string
  ) => {
    console.log("data score", data);
    if (gameSetRef.current) {
      console.log("gameSetRef.current sem score ", gameSetRef.current);
      if (userEmail === user?.email) {
        const newGameSetter = gameSetRef.current.map((item) => {
          const update = data.find(
            (player: { email: string }) => player.email === item.email
          );

          return {
            ...item,
            score: Number(item.score) + Number(update?.score),
          };
        });
        console.log("newGameSetter com scores", newGameSetter);
        handleSetGame(newGameSetter);
        console.log("atualiza score", newGameSetter);
      }
    }
  };

  const UpdateOtherPlayersWithoutSwitch = useCallback(
    (email: string, cardsPlayed: string[]) => {
      if (user?.email !== email) {
        console.log("GameSetter ", gameSetter);
        if (gameSetRef.current) {
          console.log("função without switch");
          const newGameSetter = gameSetRef.current.map((item) => {
            if (item.email === email) {
              return {
                ...item,
                cardsPlayed: [...cardsPlayed],
                choseCard: true,
              };
            }
            return item;
          });
          console.log("newGameSetter", newGameSetter);
          handleSetGame(newGameSetter as TurnType[]);
          //setCheckCardSelected(() => true);
        }
      }
    },
    [gameSetter, user]
  );

  const handleSendScore = (data: boolean) => {
    setSendScore(data);
  };

  return (
    <PlayContext.Provider
      value={{
        gameSetter,
        everyonePlayed,
        handleSetGame,
        handleSetCards,
        cards,
        dixitSwitch,
        sendDixitName,
        playing,
        sendDiscover,
        otherPlayersChose,
        playersSelectCards,
        playersName,
        dixitPlayed,
        continuePlaying,
        constinueSocket,
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
        UpdateOtherPlayersWithoutSwitch,
        handleDixitSelection,
        handleDixitSwitch,
        handleUpdateDiscoverWithouSwitch,
        handleCloseSendDixitName,
        handleSetPlayersNameWithoutSocket,
        handleUpdateScore,
        handleSendScore,
        sendScore,
        handleSetDiscoverCard,
        handleEveryonePlayed,
        handleContinuePlaying,
        handleContinueSocket,
        nextRound,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = () => useContext(PlayContext);
