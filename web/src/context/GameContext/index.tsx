import { useState, createContext, useContext, FC, useEffect } from "react";
import { GameContextType, GameDataType, PLAYERTYPE } from "../../@types/dixit";

type ContextType = {
  gameData: GameDataType | null;
  player: string;
  error: boolean;
  complete: boolean;
  sendData: boolean;
  sendMessSocket: boolean;
  myMessage: { username: string; message: string };
  chatMessages: { username: string; message: string }[];
  handleGameDataSetter: (gameData: GameDataType | null) => void;
  handleSetError: (error: boolean) => void;
  handlePlayerSetter: (player: string) => void;
  handleSetComplete: (complete: boolean) => void;
  handleSendData: (sendData: boolean) => void;
  handleSetMyMessage: (data: { username: string; message: string }) => void;
  handleChatSocket: (sendMessSocket: boolean) => void;
  handleSetChatMessages: (data: { username: string; message: string }) => void;
};

const defaultGameContext = {
  gameData: null,
  player: "NULL",
  error: false,
  complete: false,
  sendData: false,
  sendMessSocket: false,
  myMessage: { username: "", message: "" },
  chatMessages: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleGameDataSetter: (data: GameDataType | null) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleSetError: (error: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handlePlayerSetter: (player: string) => {},

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleSetComplete: (complete: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleSendData: (sendData: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleSetMyMessage: (data: { username: string; message: string }) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleChatSocket: (data: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleSetChatMessages: (data: { username: string; message: string }) => {},
};

const GameContext = createContext<ContextType>(defaultGameContext);

export const GameContextProvider: FC<GameContextType> = ({ children }) => {
  const [error, setError] = useState<boolean>(false);
  const [player, setPlayer] = useState<string>("NULL");
  const [sendData, setSendData] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [sendMessSocket, setSendMessSocket] = useState<boolean>(false);
  const [myMessage, setMyMessage] = useState<{
    username: string;
    message: string;
  }>({ username: "", message: "" });
  const [chatMessages, setChatMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [gameData, setGameData] = useState<GameDataType | null>(
    defaultGameContext.gameData
  );

  const handleGameDataSetter = (data: GameDataType | null) => {
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

  const handleSetChatMessages = (data: {
    username: string;
    message: string;
  }) => {
    setChatMessages((prev) => [...prev, data]);
  };

  const handleSetComplete = (complete: boolean) => {
    setComplete(complete);
  };

  const handleChatSocket = (data: boolean) => {
    setSendMessSocket(data);
  };

  const handleSetMyMessage = (data: { username: string; message: string }) => {
    setMyMessage(data);
    setSendMessSocket(() => true);
  };

  const handleSendData = (sendData: boolean) => {
    setSendData(sendData);
  };

  useEffect(() => {
    console.log("player in context", player);
  }, [player]);

  return (
    <GameContext.Provider
      value={{
        complete,
        sendData,
        gameData,
        sendMessSocket,
        myMessage,
        chatMessages,
        handleGameDataSetter,
        handleSetError,
        error,
        player,
        handlePlayerSetter,
        handleSetComplete,
        handleSendData,
        handleSetMyMessage,
        handleChatSocket,
        handleSetChatMessages,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
