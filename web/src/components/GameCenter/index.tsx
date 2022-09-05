import { FC } from "react";
import * as S from "./styles";
type GameContextType = {
  waiting: boolean;
};

const GameCenter: FC<GameContextType> = ({ waiting }) => {
  return (
    <S.Container>
      {waiting ? (
        <>
          <S.NotificationContainer>
            <S.NotificationText>
              <h3>1/6 Jogadores Prontos</h3>
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
          <S.NotificationContainer></S.NotificationContainer>
          <S.GameContainer></S.GameContainer>
        </>
      )}
    </S.Container>
  );
};

export default GameCenter;
