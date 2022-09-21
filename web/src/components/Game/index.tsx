import { useState, useEffect, useRef } from "react";
import Player from "../Player";
import { useNavigate } from "react-router-dom";
import { GameCenter, Button, ChatAccordion } from "../../components";
import { UserAuth } from "../../context/AuthContext";
import { useGameContext } from "../../context/GameContext";
import { usePlayContext } from "../../context/PlayContext";
import * as S from "./styles";

const Game = () => {
  const [waiting, setWaiting] = useState(true);
  const [websocketSend, setWebsocketSend] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = UserAuth();

  const {
    gameData,
    handleGameDataSetter,
    player,
    handleSendData,
    handleSetComplete,
    sendData,
    myMessage,
    sendMessSocket,
    handleChatSocket,
    handleSetChatMessages,
  } = useGameContext();
  const websocket = useRef<WebSocket | null>(null);
  const navigate = useNavigate();
  const {
    gameSetter,
    handleDixitPlayed,
    dixitPlayed,
    handlePlayersSelectCards,
    handleSetGame,
    otherPlayersChose,
    sendDiscover,
    handleOtherPlayersChose,
    handleSetSendDiscover,
    UpdateOtherPlayersWithoutSwitch,
    dixitSwitch,
    handleDixitSwitch,
  } = usePlayContext();
  //const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    websocket.current = new WebSocket(`ws://localhost:8081/${gameData?.id}`);
    websocket.current.onopen = () => {
      //console.log("WebSocket connection established em Game");
      setOpen(true);
    };

    websocket.current.onmessage = (event) => {
      const data = event.data;
      if (data instanceof Blob) {
        const reader = new FileReader();
        reader.readAsText(data);
        reader.onload = () => {
          const received = JSON.parse(reader.result as string);
          console.log("from websocket ", received);
        };
      } else {
        const ans = JSON.parse(data);

        if (ans.action === "new-player") {
          console.log("new player websocket received ", ans.data.players);

          handleGameDataSetter({
            ...gameData,
            players: ans.data.players,
          } as any);
          setWebsocketSend(() => true);
        } else if (ans.action === "leave-room") {
          if (ans.message) {
            //console.log(ans.message);
          } else {
            console.log("player left ", ans.data.playersString);
            const players: { username: string; email: string }[] = [];
            ans.data.playersString.split(",").forEach((player: string) => {
              if (player !== ":") {
                const p = player.split(":");
                players.push({ username: p[0], email: p[1] });
              } else {
                players.push({ username: "", email: "" });
              }
            });
            handleGameDataSetter({ ...gameData, players } as any);
          }
        } else if (ans.action === "update-turn") {
          console.log("update turn ", ans.data);
          handleSetGame(ans.data.gameSetter);
          handlePlayersSelectCards(true);
          //handleTurnUpdated(false);
        } else if (ans.action === "update-cards-played") {
          const { email, cardsPlayed } = ans.data;
          //console.log(ans.data);

          UpdateOtherPlayersWithoutSwitch(email, cardsPlayed);
        } else if (ans.action === "discover") {
          handleSetGame(ans.data.gameSetter);
        } else if (ans.action === "chat-message") {
          handleSetChatMessages(ans.data.message);
        }
        //console.log("do websoquete ", ans);
      }
    };
    websocket.current.onclose = () => {
      console.log("closing websocket");
    };
    return () => {
      websocket.current?.close();
    };
  }, []);

  useEffect(() => {
    if (gameData) {
      if (websocketSend) {
        let complete = true;
        gameData.players.forEach((player) => {
          if (player.username === "") {
            complete = false;
          }
        });
        if (complete) {
          setWebsocketSend(() => false);
          setWaiting(false);
          handleSetComplete(true);
        } else {
          handleSetComplete(false);
          setWaiting(true);
        }
      }
    }
  }, [gameData, websocketSend]);

  useEffect(() => {
    if (sendMessSocket) {
      const dataSocket = {
        action: "chat-message",
        payload: {
          id: gameData?.id,
          message: myMessage,
        },
      };
      websocket.current?.send(JSON.stringify(dataSocket));
      handleChatSocket(false);
    }
  }, [sendMessSocket]);

  useEffect(() => {
    if (sendData) {
      if (player === "NEW-PLAYER") {
        //console.log("useEffect new player");
        if (open) {
          if (websocket.current?.readyState === 1) {
            console.log("sending new player websocket");
            const data = {
              action: "new-player",
              payload: {
                players: gameData?.players,
                id: gameData?.id,
              },
            };

            websocket.current?.send(JSON.stringify(data));
            handleSendData(false);
            //setWebsocketSend(true);
          }
        }
      } else if (player === "CREATOR") {
        if (open) {
          //console.log("useEffect creator", websocket.current?.readyState);
          if (websocket.current?.readyState === 1) {
            const data = {
              action: "creator",
              payload: {
                username: user?.username,
                id: gameData?.id,
                email: user?.email,
              },
            };
            //console.log("entering game session");
            websocket.current?.send(JSON.stringify(data));
            handleSendData(false);
          }
        }
      }
    }
  }, [player, open, sendData]);

  useEffect(() => {
    if (dixitSwitch) {
      const data = gameSetter?.find((game) => game.email === user?.email);
      const send = {
        action: "dixit-choose",
        payload: {
          id: gameData?.id,
          email: user?.email,
          choosenCard: data?.cardsPlayed,
        },
      };
      websocket.current?.send(JSON.stringify(send));
      //handleDixitPlayed(false);
      handleDixitSwitch(false);
    }
  }, [dixitSwitch]);

  useEffect(() => {
    if (otherPlayersChose) {
      if (open) {
        if (websocket.current?.readyState === 1) {
          //enviar minha carta para o servidor
          const myCard = gameSetter?.find(
            (p) => p.email === user?.email
          )?.cardsPlayed;

          const data = {
            action: "update-cards-played",
            payload: {
              id: gameData?.id,
              email: user?.email,
              cardsPlayed: myCard,
            },
          };
          websocket.current?.send(JSON.stringify(data));
          //handleOtherPlayersChose(false);
        }
      }
    }
  }, [otherPlayersChose, gameData, open]);

  useEffect(() => {
    if (gameData) {
      if (gameSetter) {
        if (dixitPlayed) {
          websocket.current?.send(
            JSON.stringify({
              action: "update-turn",
              payload: { gameSetter: gameSetter, id: gameData.id },
            })
          );
          console.log("update turn sent");
          handleDixitPlayed(false);
        }
      }
    }
  }, [dixitPlayed, gameSetter]);

  useEffect(() => {
    if (gameData) {
      if (gameSetter) {
        if (sendDiscover) {
          websocket.current?.send(
            JSON.stringify({
              action: "discover",
              payload: { gameSetter: gameSetter, id: gameData.id },
            })
          );
          handleSetSendDiscover(false);
        }
      }
    }
  }, [sendDiscover]);

  const handleLeaveGame = () => {
    const dataSocket = {
      action: "leave-room",
      payload: {
        id: gameData?.id,
        email: user?.email,
      },
    };
    websocket.current?.send(JSON.stringify(dataSocket));
    navigate("/");
  };

  return (
    <S.Container>
      <S.SideContainer>
        <S.PlayersTitle>Jogadores</S.PlayersTitle>
        {gameData?.players.map((player, index) => (
          <Player key={`${index}-${player}`} data={player} index={index} />
        ))}
        {!waiting ? (
          <div>
            <ChatAccordion />
          </div>
        ) : (
          <></>
        )}
      </S.SideContainer>
      <S.CenterContainer>
        <GameCenter waiting={waiting} />
      </S.CenterContainer>
      <S.SideContainer>
        <Button onClick={handleLeaveGame}>Sair do Jogo</Button>
      </S.SideContainer>
    </S.Container>
  );
};

export default Game;
