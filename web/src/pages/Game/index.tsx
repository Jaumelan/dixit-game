import { Navbar, GameBody } from "../../components";
import { NAVBAR_TYPE_CLASSES } from "../../components/Navbar";
import * as S from "./styles";

const Game = () => {
  return (
    <S.Container>
      <Navbar navbarType={NAVBAR_TYPE_CLASSES.game} />
      <GameBody />
    </S.Container>
  );
};

export default Game;
