import * as S from "./styles";
import Button from "../Button";
import { BUTTON_TYPE_CLASSES } from "../Button";
import BodyCards from "../BodyBoxCards";
import { UserAuth } from "../../context/AuthContext";

const BoxBody = () => {
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
        <Button>Criar um jogo</Button>
        <Button>Entrar em um jogo</Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.logout} onClick={handleLogOut}>
          Sair
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default BoxBody;
