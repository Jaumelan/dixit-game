import * as S from "./styles";
import { FC } from "react";
import Button from "../Button";
import { BUTTON_TYPE_CLASSES } from "../Button";
import BodyCards from "../BodyBoxCards";
import { UserAuth } from "../../context/AuthContext";

type BoxInitialBodyProps = {
  createGameModal: () => void;
  joinGameModal: () => void;
};

const BoxInitialBody: FC<BoxInitialBodyProps> = ({ createGameModal, joinGameModal }) => {
  const { logOut } = UserAuth();

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <S.Container>
      <S.CardsContainer>
        <BodyCards />
      </S.CardsContainer>
      <S.ButtonContainer>
        <Button onClick={createGameModal}>Criar um jogo</Button>
        <Button onClick={joinGameModal} >Entrar em um jogo</Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.logout} onClick={handleLogOut}>
          Sair
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default BoxInitialBody;
