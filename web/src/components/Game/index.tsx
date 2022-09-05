import { FC, useState, useEffect } from "react";
import Player from "../Player";
import GameCenter from "../GameCenter";
import * as S from "./styles";

/* export type GameType = {
  id: string | null;
}; */

const Game = () => {
  const [waiting, setWaiting] = useState(true);
  const [players, setPlayers] = useState<string[]>(["jogador1", "jogador2"]);

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
