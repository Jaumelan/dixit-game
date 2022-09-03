import { AiOutlineCloseCircle } from "react-icons/ai";
import { FC } from "react";
import * as S from "./styles";

type SetGameProps = {
  close: () => void;
};

const SetGame: FC<SetGameProps> = ({ close }) => {
  return (
    <S.Container>
      <S.TitleContainer>
        <h2>Novo Jogo</h2>
        <AiOutlineCloseCircle size={28} onClick={close} />
      </S.TitleContainer>
      <S.GameRoom>
        <h3>ID da Sala: XXXX</h3>
      </S.GameRoom>
      <S.SettersContainer>
        <S.IndividualSetter>
          <S.PlayerNumberContainer>
            <label>Número do Jogadores</label>
            <input type="number" />
          </S.PlayerNumberContainer>
          <S.PlayerNumberContainer>
            <label>Número do Jogadores</label>
            <input type="number" />
          </S.PlayerNumberContainer>
        </S.IndividualSetter>
        <S.IndividualSetter>
          <S.PlayerNumberContainer>
            <label>Número do Jogadores</label>
            <input type="number" />
          </S.PlayerNumberContainer>
          <S.PlayerNumberContainer>
            <label>Número do Jogadores</label>
            <input type="number" />
          </S.PlayerNumberContainer>
        </S.IndividualSetter>
      </S.SettersContainer>
    </S.Container>
  );
};

export default SetGame;
