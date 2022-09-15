import { useState, useEffect, useRef } from "react";
import Player from "../Player";
import { useNavigate } from "react-router-dom";
import { GameCenter, Button } from "../../components";
import { UserAuth } from "../../context/AuthContext";
import { useGameContext } from "../../context/GameContext";
import { PLAYERTYPE, PlayerType } from "../../@types/dixit";

import * as S from "./styles";

const Game = () => {
  const [waiting, setWaiting] = useState(true);
  const [open, setOpen] = useState(false);
  const { user } = UserAuth();
  const { gameData, handleGameSetter, player } = useGameContext();
  const websocket = useRef<WebSocket | null>(null);
  const navigate = useNavigate();
  //const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    if (gameData) {
      let complete = true;
      gameData.players.forEach((player) => {
        if (player.username === "") {
          complete = false;
        }
      });
      if (complete) {
        setWaiting(false);
      }
    }
  }, [gameData]);

  useEffect(() => {
    websocket.current = new WebSocket(`ws://localhost:8081/${gameData?.id}`);
    websocket.current.onopen = () => {
      //console.log("WebSocket connection established em Game");
      setOpen(true);
    };
    /*  websocket.current.onopen = () => {
      const dataSocket = {
        action: "enter-room",
        payload: {
          id: gameData?.id,
          username: user?.username,
        },
      };
      console.log("entering game session");
      websocket.current?.send(JSON.stringify(dataSocket));
    }; */

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
          //console.log("players ", ans.data.players);

          handleGameSetter({ ...gameData, players: ans.data.players } as any);
        } else if (ans.action === "leave-room") {
          if (ans.message) {
            //console.log(ans.message);
          } else {
            const players: { username: string; email: string }[] = [];
            ans.data.playersString.split(",").forEach((player: string) => {
              if (player !== ":") {
                const p = player.split(":");
                players.push({ username: p[0], email: p[1] });
              } else {
                players.push({ username: "", email: "" });
              }
            });
            handleGameSetter({ ...gameData, players } as any);
          }
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
    if (player === "NEW-PLAYER") {
      //console.log("useEffect new player");
      if (open) {
        if (websocket.current?.readyState === 1) {
          //console.log("entrou new player");
          const data = {
            action: "new-player",
            payload: {
              players: gameData?.players,
              id: gameData?.id,
            },
          };

          websocket.current?.send(JSON.stringify(data));
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
        }
      }
    }
  }, [player, open]);

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
