import * as S from "./styles";

const GameCenter = () => {
  return (
    <S.Container>
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
    </S.Container>
  );
};

export default GameCenter;
