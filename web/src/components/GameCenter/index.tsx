import { FC } from "react";
import { useGameContext } from "../../context/GameContext";
import GameRunning from "../GameRunning";
import * as S from "./styles";

type GameContextType = {
  waiting: boolean;
};

const GameCenter: FC<GameContextType> = ({ waiting }) => {
  const { gameData } = useGameContext();

  return (
    <S.Container>
      {waiting ? (
        <>
          <S.NotificationContainer>
            <S.NotificationText>
              <h3>1/{gameData?.numberOfPlayers} Jogadores Prontos</h3>
            </S.NotificationText>
          </S.NotificationContainer>
          <S.GameContainer>
            <S.GameLoading>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </S.GameLoading>
            <S.Loading>
              Esperando Jogadores<span>.</span>
              <span>.</span>
              <span>.</span>
            </S.Loading>
          </S.GameContainer>
        </>
      ) : (
        <>
          <GameRunning />
        </>
      )}
    </S.Container>
  );
};

export default GameCenter;
