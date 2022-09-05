import { FC, useState, useEffect } from "react";
import Player from "../Player";
import GameCenter from "../GameCenter";
import { useGameContext } from "../../context/GameContext";
import * as S from "./styles";

/* export type GameType = {
  id: string | null;
}; */

const Game = () => {
  const [waiting, setWaiting] = useState(true);
  const { gameData } = useGameContext();
  const [players, setPlayers] = useState<string[]>([]);

  const handlePlayers = (players: string[]) => {
    gameData?.players?.push(...players);
    setPlayers(gameData?.players || []);
  };

  useEffect(() => {
    handlePlayers(gameData?.players || []);
    if (gameData?.players?.length === gameData?.numberOfPlayers) {
      setWaiting(false);
    }
  }, [gameData?.players]);

  return (
    <S.Container>
      <S.SideContainer>
        <S.PlayersTitle>Jogadores</S.PlayersTitle>
        {players.map((player) => (
          <Player key={player} />
        ))}
      </S.SideContainer>
      <S.CenterContainer>
        <GameCenter waiting={waiting} />
      </S.CenterContainer>
      <S.SideContainer>{`Jogadores: ${players}`}</S.SideContainer>
    </S.Container>
  );
};

export default Game;
