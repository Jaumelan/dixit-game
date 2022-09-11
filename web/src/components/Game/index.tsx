import { useState, useEffect, useRef } from "react";
import Player from "../Player";
import GameCenter from "../GameCenter";
import { useGameContext } from "../../context/GameContext";

import * as S from "./styles";


const Game = () => {
  const [waiting, setWaiting] = useState(true);
  const { gameData } = useGameContext();
  const websocket = useRef<WebSocket | null>(null);
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
    websocket.current = new WebSocket(`ws://localhost:8080`);
    websocket.current.onopen = () => {
      console.log("connected");
    };
    
    websocket.current.onclose = () => {
      console.log("disconnected");
    };
    return () => {
      websocket.current?.close();
    };
  }, []);

  /* const handlePlayers = (players: PlayerType) => {
    gameData?.players?.push(...players);
    setPlayers(gameData?.players || []);
  }; */
/* 
  useEffect(() => {

    websocket.current.onmessage = (e) => {
      if(e.data instanceof Blob) {
        const reader = new FileReader();
        reader.readAsText(e.data);
        reader.onload = () => {
          console.log("reader", reader.result);
        }
      }
    };

    handlePlayers(gameData?.players || []);
    if (gameData?.players?.length === gameData?.numberOfPlayers) {
      setWaiting(false);
    }
  }, [gameData?.players]); */

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
      <S.SideContainer>{`Jogadores: ${gameData?.numberOfPlayers}`}</S.SideContainer>
    </S.Container>
  );
};

export default Game;
